import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/client";
import { sendOrderConfirmation, sendNewOrderAlert } from "@/lib/email/send";

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
      const { data: newCustomer } = await supabase
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
      customerId = newCustomer?.id;
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
    })
    .select()
    .single();

  if (orderError) {
    return NextResponse.json({ error: orderError.message }, { status: 500 });
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
      quantity: item.quantity || 1,
      unit_price: item.unit_price,
      total_price: item.total_price,
    }));

    await supabase.from("order_items").insert(items);
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

  return NextResponse.json({ order, order_number: orderNumber }, { status: 201 });
}
