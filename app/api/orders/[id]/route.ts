import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/client";
import Stripe from "stripe";

export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: "2025-03-31.basil" as any });

function verifyAdmin(req: NextRequest) {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

// GET /api/orders/[id] — get single order with items + history
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("orders")
    .select("*, order_items(*), order_status_history(*)")
    .eq("id", id)
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 404 });
  }

  // Get customer purchase history by email
  let customerStats = null;
  if (data.email) {
    const { data: customerOrders } = await supabase
      .from("orders")
      .select("id, order_number, total, status, created_at")
      .eq("email", data.email)
      .order("created_at", { ascending: false });

    if (customerOrders) {
      customerStats = {
        total_orders: customerOrders.length,
        total_spent: customerOrders.filter(o => o.status !== "cancelled").reduce((s, o) => s + Number(o.total), 0),
        last_order_date: customerOrders[0]?.created_at || null,
        orders: customerOrders,
      };
    }
  }

  return NextResponse.json({ order: data, customer_stats: customerStats });
}

// PATCH /api/orders/[id] — update order (status, tracking, notes, etc.)
export async function PATCH(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const body = await req.json();
  const supabase = createAdminClient();

  // If status is being updated, also add to history
  if (body.status) {
    await supabase.from("order_status_history").insert({
      order_id: id,
      status: body.status,
      notes: body.status_notes || `Status changed to ${body.status}`,
    });
  }

  // Update the order
  const updateData: any = { updated_at: new Date().toISOString() };
  const allowedFields = [
    "status", "tracking_number", "tracking_url", "estimated_delivery",
    "notes", "shipping_first_name", "shipping_last_name", "shipping_address1",
    "shipping_address2", "shipping_city", "shipping_state", "shipping_zip",
    "email", "phone", "cost", "shipping_cost",
  ];

  for (const field of allowedFields) {
    if (body[field] !== undefined) {
      updateData[field] = body[field];
    }
  }

  // Update order items if provided
  if (body.items) {
    for (const item of body.items) {
      if (item.id) {
        const itemUpdate: any = {};
        const itemFields = [
          "shade_type", "fabric_name", "fabric_id", "width", "width_fraction",
          "height", "height_fraction", "mount_type", "control_type", "motor_power",
          "roll_type", "valance_type", "side_channel_type", "bottom_bar",
          "quantity", "unit_price", "total_price",
        ];
        for (const f of itemFields) {
          if (item[f] !== undefined) itemUpdate[f] = item[f];
        }
        if (Object.keys(itemUpdate).length > 0) {
          await supabase.from("order_items").update(itemUpdate).eq("id", item.id);
        }
      }
    }
  }

  const { data, error } = await supabase
    .from("orders")
    .update(updateData)
    .eq("id", id)
    .select("*, order_items(*), order_status_history(*)")
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ order: data });
}

// DELETE /api/orders/[id] — cancel + refund order
export async function DELETE(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id } = await params;
  const supabase = createAdminClient();
  const url = new URL(req.url);
  const refund = url.searchParams.get("refund") === "true";

  // Get order
  const { data: order, error: fetchError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", id)
    .single();

  if (fetchError || !order) {
    return NextResponse.json({ error: "Order not found" }, { status: 404 });
  }

  // Process Stripe refund if requested
  let refundResult = null;
  if (refund && order.stripe_payment_intent_id) {
    try {
      refundResult = await stripe.refunds.create({
        payment_intent: order.stripe_payment_intent_id,
      });
    } catch (stripeErr: any) {
      return NextResponse.json(
        { error: `Stripe refund failed: ${stripeErr.message}` },
        { status: 500 }
      );
    }
  }

  // Update order status to cancelled
  await supabase
    .from("orders")
    .update({
      status: "cancelled",
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);

  // Add to status history
  await supabase.from("order_status_history").insert({
    order_id: id,
    status: "cancelled",
    notes: refund
      ? `Order cancelled and refunded. Stripe refund: ${refundResult?.id || "N/A"}`
      : "Order cancelled (no refund)",
  });

  return NextResponse.json({
    success: true,
    refund: refundResult ? { id: refundResult.id, status: refundResult.status } : null,
  });
}
