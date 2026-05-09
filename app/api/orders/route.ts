/**
 * /api/orders — order creation + admin listing
 * ──────────────────────────────────────────────────────────────────────────
 * SCHEMA DEPENDENCY: This route INSERTs into `orders` and `order_items` in
 * the production Supabase project (`tptisikpbmqvllfhjdch`). Every column
 * referenced below MUST exist in production with matching type/nullability,
 * or the INSERT will return 400 and this endpoint will respond 500.
 *
 * The 2026-05-09 incident — silently dropped orders for ~6 days — was caused
 * by `freight_charge`, `freight_shipping`, and `cassette_fabric_insert`
 * being added to this code without a corresponding Supabase migration. The
 * route returned 500, the browser swallowed it, customers saw a fake
 * success screen, and the orders never saved.
 *
 * RULES going forward:
 *   1. If you add a column reference here, add the matching ALTER TABLE in
 *      Supabase BEFORE deploying.
 *   2. `lib/supabase/schema.sql` should mirror production. If it doesn't,
 *      production is the source of truth — update the .sql file to match.
 *   3. NEVER silently swallow Supabase errors. Always `console.error` the
 *      full error object before returning 5xx — Vercel logs the body of
 *      console.error but NOT the response body of an outbound REST call,
 *      so without explicit logging, root-causing failures takes hours.
 *   4. The Stripe webhook (app/api/webhooks/stripe/route.ts) currently only
 *      fires GA4 tracking — it does NOT create orders. The order creation
 *      pipeline depends entirely on the browser's POST here succeeding. A
 *      future hardening should move INSERTs into the webhook for delivery
 *      guarantees (Stripe retries up to 3 days; browsers do not retry).
 */
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/client";
import { sendOrderConfirmation, sendNewOrderAlert } from "@/lib/email/send";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16" as any,
});

export const dynamic = 'force-dynamic';

function verifyAdmin(req: NextRequest) {
  const auth = req.headers.get("x-admin-password");
  if (auth !== process.env.ADMIN_PASSWORD) {
    return false;
  }
  return true;
}

// GET /api/orders — list all orders (admin)
export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const search = url.searchParams.get("search");
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "50");
  const offset = (page - 1) * limit;

  let query = supabase
    .from("orders")
    .select("*, order_items(*), order_status_history(*)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (status && status !== "all") {
    query = query.eq("status", status);
  }

  if (search) {
    query = query.or(
      `order_number.ilike.%${search}%,email.ilike.%${search}%,shipping_first_name.ilike.%${search}%,shipping_last_name.ilike.%${search}%`
    );
  }

  const { data, error, count } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ orders: data, total: count, page, limit });
}

// POST /api/orders — create new order (from checkout)
export async function POST(req: NextRequest) {
  const body = await req.json();

  // Security: verify the Stripe PaymentIntent actually succeeded.
  // Without this, anyone could POST to /api/orders and create fake orders.
  const piId = body.stripe_payment_intent_id;
  if (!piId || typeof piId !== 'string' || !piId.startsWith('pi_')) {
    return NextResponse.json({ error: "Missing or invalid payment intent" }, { status: 400 });
  }

  try {
    const paymentIntent = await stripe.paymentIntents.retrieve(piId);
    if (paymentIntent.status !== 'succeeded') {
      return NextResponse.json({ error: "Payment not confirmed" }, { status: 402 });
    }
  } catch (err: any) {
    console.error("[Orders API] Stripe verification failed:", err.message);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Generate order number
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const { count } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .gte("created_at", now.toISOString().slice(0, 10));
  const seq = String((count || 0) + 1).padStart(4, "0");
  const orderNumber = `WWS-${dateStr}-${seq}`;

  // Create customer if doesn't exist
  let customerId = null;
  if (body.email) {
    const { data: existing } = await supabase
      .from("customers")
      .select("id")
      .eq("email", body.email)
      .single();

    if (existing) {
      customerId = existing.id;
    } else {
      const { data: newCustomer, error: customerError } = await supabase
        .from("customers")
        .insert({
          email: body.email,
          first_name: body.shipping_first_name || "",
          last_name: body.shipping_last_name || "",
          phone: body.phone || "",
          address_line1: body.shipping_address1,
          city: body.shipping_city,
          state: body.shipping_state,
          zip: body.shipping_zip,
        })
        .select("id")
        .single();
      // Don't fail the order if the customer insert fails — orders.customer_id
      // is nullable, so the order will still save with customer_id = null and
      // the customer record can be backfilled later via the email field.
      // But we log the failure so it doesn't disappear silently.
      if (customerError) {
        console.error("[Orders API] Customer insert failed (continuing without customer_id):", {
          error_message: customerError.message,
          error_code: customerError.code,
          error_details: customerError.details,
          email: body.email,
          pi: piId,
        });
      }
      customerId = newCustomer?.id ?? null;
    }
  }

  // Create order
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      order_number: orderNumber,
      customer_id: customerId,
      email: body.email,
      status: "received",
      subtotal: body.subtotal,
      discount: body.discount || 0,
      tax: body.tax || 0,
      shipping: body.shipping || 0,
      total: body.total,
      promo_code: body.promo_code,
      stripe_payment_intent_id: body.stripe_payment_intent_id,
      stripe_charge_id: body.stripe_charge_id,
      shipping_first_name: body.shipping_first_name,
      shipping_last_name: body.shipping_last_name,
      shipping_address1: body.shipping_address1,
      shipping_address2: body.shipping_address2,
      shipping_city: body.shipping_city,
      shipping_state: body.shipping_state,
      shipping_zip: body.shipping_zip,
      estimated_delivery: body.estimated_delivery,
      notes: body.notes,
      sale_savings: body.sale_savings || 0,
      retail_total: body.retail_total || 0,
      sale_percent: body.sale_percent || 0,
      freight_charge: body.freight_charge || 0,
    })
    .select()
    .single();

  if (orderError) {
    // Log the full Supabase error so root cause is visible in Vercel logs.
    // The 2026-05-09 incident took an hour to diagnose because this branch
    // returned 500 with the message in JSON but never console.error'd the
    // error object — the actual cause ("column 'freight_charge' of relation
    // 'orders' does not exist") was invisible in Vercel runtime logs.
    console.error("[Orders API] Order insert failed:", {
      error_message: orderError.message,
      error_code: orderError.code,
      error_details: orderError.details,
      error_hint: orderError.hint,
      order_number: orderNumber,
      pi: piId,
      body_keys: Object.keys(body),
    });
    return NextResponse.json(
      { error: orderError.message, code: orderError.code, hint: orderError.hint },
      { status: 500 }
    );
  }

  // Create order items
  if (body.items?.length) {
    const items = body.items.map((item: any) => ({
      order_id: order.id,
      shade_type: item.shade_type || "Custom Roller Shade",
      shape: item.shape || "Standard",
      fabric_name: item.fabric_name,
      fabric_id: item.fabric_id,
      width: item.width,
      width_fraction: item.width_fraction,
      height: item.height,
      height_fraction: item.height_fraction,
      custom_dims: item.custom_dims,
      mount_type: item.mount_type,
      control_type: item.control_type,
      motor_power: item.motor_power,
      roll_type: item.roll_type,
      bottom_bar: item.bottom_bar,
      valance_type: item.valance_type,
      side_channel_type: item.side_channel_type,
      motorized_controller: item.motorized_controller || false,
      motorized_hub: item.motorized_hub || false,
      motorized_charger: item.motorized_charger || false,
      sun_sensor: item.sun_sensor || false,
      cassette_fabric_insert: item.cassette_fabric_insert || false,
      freight_shipping: item.freight_shipping || false,
      quantity: item.quantity || 1,
      unit_price: item.unit_price,
      total_price: item.total_price,
    }));

    const { error: itemsError } = await supabase.from("order_items").insert(items);
    if (itemsError) {
      // Items insert failed but the order header is already committed. Don't
      // return 5xx (would mislead the browser into retrying and double-billing
      // or duplicating headers). Log loudly so the admin can manually patch
      // the order_items rows from the body data captured here.
      console.error("[Orders API] Order items insert failed (order header committed, items missing):", {
        error_message: itemsError.message,
        error_code: itemsError.code,
        error_details: itemsError.details,
        error_hint: itemsError.hint,
        order_id: order.id,
        order_number: orderNumber,
        item_count: items.length,
      });
    }
  }

  // Initial status history entry
  await supabase.from("order_status_history").insert({
    order_id: order.id,
    status: "received",
    notes: "Order placed",
  });

  // Send emails (await to ensure they complete before function exits)
  const orderItems = body.items || [];
  try {
    await Promise.all([
      sendOrderConfirmation(order, orderItems),
      sendNewOrderAlert(order, orderItems),
    ]);
  } catch (emailErr) {
    console.error("Email send error:", emailErr);
  }

  // Mark any abandoned carts from this email as recovered
  try {
    await supabase
      .from("abandoned_carts")
      .update({ recovered: true, recovery_order_id: order.id, updated_at: new Date().toISOString() })
      .eq("email", (body.email || "").toLowerCase())
      .eq("recovered", false);
  } catch {}

  // Server-side GA4 purchase now handled by Stripe webhook (app/api/webhooks/stripe/route.ts)
  // Removed from here to avoid duplicate purchase events

  return NextResponse.json({ order, order_number: orderNumber }, { status: 201 });
}
