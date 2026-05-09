/**
 * /api/orders/lookup — public order lookup endpoints
 * ──────────────────────────────────────────────────────────────────────────
 * Three modes:
 *
 *   GET ?pi=pi_xxx
 *     Used by /order-confirmation to fetch the freshly-paid order.
 *     Returns minimal data (no PII beyond what the customer already
 *     provided). Used immediately after checkout — may return 404 briefly
 *     if the webhook hasn't finalized yet, in which case the page polls.
 *
 *   GET ?email=foo@bar.com
 *     Used by /account to list a logged-in user's order history.
 *     Returns minimal per-order summary, no items.
 *
 *   POST { order_number, email }
 *     Used by /track-order to look up an order by number+email match.
 *     Acts as a soft authentication: knowing both fields proves the user
 *     placed the order (or has access to the confirmation email).
 */

import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

// ─── GET ?pi=... or ?email=... ──────────────────────────────────────────
export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const pi = url.searchParams.get("pi");
  const email = url.searchParams.get("email");

  const supabase = createAdminClient();

  // Mode A: lookup by PaymentIntent (used by /order-confirmation)
  if (pi) {
    if (!pi.startsWith("pi_")) {
      return NextResponse.json({ error: "Invalid pi format" }, { status: 400 });
    }

    const { data, error } = await supabase
      .from("orders")
      .select(
        `
        id, order_number, status, subtotal, discount, sale_savings, retail_total,
        sale_percent, freight_charge, shipping, tax, total,
        promo_code, estimated_delivery, created_at,
        email, shipping_first_name, shipping_last_name,
        shipping_address1, shipping_address2, shipping_city, shipping_state, shipping_zip,
        order_items (
          id, shade_type, shape, fabric_name, fabric_id,
          width, width_fraction, height, height_fraction,
          mount_type, control_type, motor_power, roll_type, valance_type,
          quantity, unit_price, total_price
        )
      `
      )
      .eq("stripe_payment_intent_id", pi)
      .maybeSingle();

    if (error) {
      console.error("[Lookup] Error fetching by PI:", error);
      return NextResponse.json({ error: "Lookup failed" }, { status: 500 });
    }

    if (!data) {
      // No order yet — webhook may not have written the row, OR /api/orders/init
      // wasn't called (data genuinely missing). The /order-confirmation page
      // distinguishes these by polling: if the row appears within 30 seconds,
      // it was a webhook delay. Otherwise, true loss.
      return NextResponse.json({ error: "Not found" }, { status: 404 });
    }

    return NextResponse.json({ order: data });
  }

  // Mode B: lookup by email (used by /account)
  if (email) {
    const { data, error } = await supabase
      .from("orders")
      .select("id, order_number, status, total, estimated_delivery, created_at, order_items(id)")
      .eq("email", email.toLowerCase())
      .neq("status", "pending") // hide in-flight pending from the customer's order list
      .order("created_at", { ascending: false })
      .limit(50);

    if (error) {
      console.error("[Lookup] Error fetching by email:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({ orders: data || [] });
  }

  return NextResponse.json({ error: "Provide ?pi= or ?email=" }, { status: 400 });
}

// ─── POST { order_number, email } — public order lookup by number + email ──
export async function POST(req: NextRequest) {
  const { order_number, email } = await req.json();

  if (!order_number || !email) {
    return NextResponse.json(
      { error: "Order number and email are required" },
      { status: 400 }
    );
  }

  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("orders")
    .select(
      "id, order_number, status, subtotal, discount, sale_savings, total, estimated_delivery, tracking_number, tracking_url, created_at, order_items(shade_type, fabric_name, width, width_fraction, height, height_fraction, mount_type, control_type, motor_power, roll_type, valance_type, quantity, unit_price, total_price), order_status_history(status, notes, created_at)"
    )
    .eq("order_number", order_number.toUpperCase())
    .eq("email", email.toLowerCase())
    .neq("status", "pending") // pending orders aren't trackable yet
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "Order not found. Please check your order number and email." },
      { status: 404 }
    );
  }

  return NextResponse.json({ order: data });
}
