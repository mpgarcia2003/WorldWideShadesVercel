/**
 * /api/orders/init — pre-payment pending order creation
 * ──────────────────────────────────────────────────────────────────────────
 * Called from /checkout AFTER the user clicks "Place Order" but BEFORE
 * stripe.confirmPayment() runs. Creates a pending order row in the DB so
 * that the Stripe webhook (or browser fallback) can finalize it after
 * payment_intent.succeeded fires.
 *
 * WHY THIS EXISTS:
 *   The previous architecture put order creation INSIDE the browser's
 *   post-confirmPayment flow. If Stripe required 3D Secure step-up auth, the
 *   browser would redirect to the bank's auth page, then back to
 *   /order-confirmation. The original /checkout page's JS was unloaded
 *   during the redirect and never ran the "save order" code. Result:
 *   customer charged, no order saved, no email sent.
 *
 *   By creating the pending order here (server-side, before payment), the
 *   data is durable in the DB regardless of what happens to the browser.
 *   The Stripe webhook then finalizes server-to-server, bypassing the
 *   browser entirely. See lib/orders/finalize.ts for the finalization logic.
 *
 * IDEMPOTENCY:
 *   If the same PaymentIntent is initialized twice (e.g., double-click on
 *   "Place Order"), the second call returns the existing pending order
 *   without creating a duplicate. Enforced at the application layer here
 *   AND at the DB layer via the unique partial index on
 *   stripe_payment_intent_id (see migrations/2026-05-09).
 *
 * SECURITY:
 *   This endpoint creates a pending order before any payment is confirmed.
 *   Anyone could POST here. The pending order has no value (no fulfillment
 *   happens until status='received'), but it does pollute the orders table.
 *   We accept this trade-off because:
 *     - The pending row gets cleaned up if abandoned (cron, future)
 *     - The amount is verified server-side at the PaymentIntent level
 *     - The order_number is sequential, so a leak of pending orders just
 *       creates gaps in the sequence (no security impact)
 *
 *   We do NOT verify the cart total against any source of truth here —
 *   that's enforced by Stripe (the PaymentIntent amount is what gets
 *   charged regardless of what we put in the order row). However the
 *   webhook re-verifies the order data is consistent with paymentIntent.amount.
 */

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/client";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16" as any,
});

export const dynamic = "force-dynamic";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { stripe_payment_intent_id, ga_client_id, ...orderData } = body;

  // ─── Validate the PaymentIntent ID ───────────────────────────────────
  if (
    !stripe_payment_intent_id ||
    typeof stripe_payment_intent_id !== "string" ||
    !stripe_payment_intent_id.startsWith("pi_")
  ) {
    return NextResponse.json({ error: "Invalid stripe_payment_intent_id" }, { status: 400 });
  }

  // ─── Validate required fields ────────────────────────────────────────
  // Bare minimum to create a recoverable order. Match the orders table
  // NOT NULL constraints exactly.
  if (!orderData.email) {
    return NextResponse.json({ error: "email is required" }, { status: 400 });
  }
  if (typeof orderData.subtotal !== "number" || typeof orderData.total !== "number") {
    return NextResponse.json(
      { error: "subtotal and total are required and must be numbers" },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  // ─── Idempotency: short-circuit if a pending order already exists ────
  // Handles double-click on "Place Order" or browser network retries.
  // Faster than catching the unique-constraint violation in the INSERT below.
  {
    const { data: existing } = await supabase
      .from("orders")
      .select("id, order_number, status")
      .eq("stripe_payment_intent_id", stripe_payment_intent_id)
      .maybeSingle();

    if (existing) {
      return NextResponse.json({
        pending_order_id: existing.id,
        order_number: existing.order_number,
        status: existing.status,
        already_existed: true,
      });
    }
  }

  // ─── Create-or-find customer record ──────────────────────────────────
  // customer_id is nullable on orders, so failure here is non-fatal.
  let customerId: string | null = null;
  try {
    const { data: existingCustomer } = await supabase
      .from("customers")
      .select("id")
      .eq("email", orderData.email)
      .maybeSingle();

    if (existingCustomer) {
      customerId = existingCustomer.id;
    } else {
      const { data: newCustomer, error: customerError } = await supabase
        .from("customers")
        .insert({
          email: orderData.email,
          first_name: orderData.shipping_first_name || "",
          last_name: orderData.shipping_last_name || "",
          phone: orderData.phone || "",
          address_line1: orderData.shipping_address1,
          city: orderData.shipping_city,
          state: orderData.shipping_state,
          zip: orderData.shipping_zip,
        })
        .select("id")
        .single();

      if (customerError) {
        console.error("[Orders Init] Customer insert failed (continuing without customer_id):", {
          error_message: customerError.message,
          email: orderData.email,
          pi: stripe_payment_intent_id,
        });
      } else {
        customerId = newCustomer?.id ?? null;
      }
    }
  } catch (err: any) {
    console.error("[Orders Init] Unhandled error in customer lookup/create:", err?.message);
    // Continue — customer_id stays null
  }

  // ─── Generate order number (sequential per day) ──────────────────────
  // NOTE: this counts existing orders today INCLUDING pending ones, so
  // abandoned pending orders create gaps in the sequence. Acceptable
  // trade-off — the alternative (assigning order_number only at finalize)
  // requires a non-NULL placeholder which complicates the schema.
  const now = new Date();
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, "");
  const { count } = await supabase
    .from("orders")
    .select("*", { count: "exact", head: true })
    .gte("created_at", now.toISOString().slice(0, 10));
  const seq = String((count || 0) + 1).padStart(4, "0");
  const orderNumber = `WWS-${dateStr}-${seq}`;

  // ─── Create the pending order ────────────────────────────────────────
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      order_number: orderNumber,
      customer_id: customerId,
      email: orderData.email,
      status: "pending", // ← finalize() flips this to 'received' on webhook
      subtotal: orderData.subtotal,
      discount: orderData.discount || 0,
      tax: orderData.tax || 0,
      shipping: orderData.shipping || 0,
      total: orderData.total,
      promo_code: orderData.promo_code,
      stripe_payment_intent_id: stripe_payment_intent_id,
      // stripe_charge_id is set at finalize time (it doesn't exist until charge fires)
      shipping_first_name: orderData.shipping_first_name,
      shipping_last_name: orderData.shipping_last_name,
      shipping_address1: orderData.shipping_address1,
      shipping_address2: orderData.shipping_address2,
      shipping_city: orderData.shipping_city,
      shipping_state: orderData.shipping_state,
      shipping_zip: orderData.shipping_zip,
      phone: orderData.phone,
      estimated_delivery: orderData.estimated_delivery,
      notes: orderData.notes,
      sale_savings: orderData.sale_savings || 0,
      retail_total: orderData.retail_total || 0,
      sale_percent: orderData.sale_percent || 0,
      freight_charge: orderData.freight_charge || 0,
    })
    .select()
    .single();

  if (orderError) {
    // The unique partial index on stripe_payment_intent_id may have caught
    // a concurrent INSERT for the same PI (double-click race that beat the
    // SELECT above). Re-fetch and return the existing row.
    if (orderError.code === "23505" /* unique_violation */) {
      const { data: existing } = await supabase
        .from("orders")
        .select("id, order_number, status")
        .eq("stripe_payment_intent_id", stripe_payment_intent_id)
        .maybeSingle();
      if (existing) {
        return NextResponse.json({
          pending_order_id: existing.id,
          order_number: existing.order_number,
          status: existing.status,
          already_existed: true,
        });
      }
    }

    console.error("[Orders Init] Pending order insert failed:", {
      error_message: orderError.message,
      error_code: orderError.code,
      error_details: orderError.details,
      error_hint: orderError.hint,
      order_number: orderNumber,
      pi: stripe_payment_intent_id,
      body_keys: Object.keys(body),
    });
    return NextResponse.json(
      { error: orderError.message, code: orderError.code, hint: orderError.hint },
      { status: 500 }
    );
  }

  // ─── Insert order_items ─────────────────────────────────────────────
  if (Array.isArray(orderData.items) && orderData.items.length > 0) {
    const items = orderData.items.map((item: any) => ({
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
      custom_fracs: item.custom_fracs,
      dimensions_text: item.dimensions_text,
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
      // Order header is committed but items missing. Loud log so admin can
      // patch from the request body. Do NOT fail the request — the customer
      // is about to pay, and we'd rather have a partially-saved order than
      // block payment over a recoverable issue.
      console.error("[Orders Init] Items insert failed (header committed, items missing):", {
        error_message: itemsError.message,
        error_code: itemsError.code,
        error_details: itemsError.details,
        order_id: order.id,
        order_number: orderNumber,
        item_count: items.length,
      });
    }
  }

  // ─── Initial status_history entry ────────────────────────────────────
  await supabase.from("order_status_history").insert({
    order_id: order.id,
    status: "pending",
    notes: "Order created, awaiting payment confirmation",
  });

  // ─── Attach pending_order_id to PaymentIntent metadata ──────────────
  // The webhook will read this to locate the pending order. Non-fatal if
  // it fails — finalize() falls back to looking up by stripe_payment_intent_id.
  try {
    await stripe.paymentIntents.update(stripe_payment_intent_id, {
      metadata: {
        order_source: "worldwideshades.com",
        pending_order_id: order.id,
        order_number: orderNumber,
        ga_client_id: ga_client_id || "",
      },
    });
  } catch (stripeErr: any) {
    console.error("[Orders Init] Stripe metadata update failed (continuing — finalize has fallback):", {
      error_message: stripeErr?.message,
      pi: stripe_payment_intent_id,
      pending_order_id: order.id,
    });
  }

  return NextResponse.json({
    pending_order_id: order.id,
    order_number: orderNumber,
    status: "pending",
  });
}
