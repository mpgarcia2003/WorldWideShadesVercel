import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/client";

export const dynamic = 'force-dynamic';

// POST /api/orders/lookup — public order lookup by order# + email
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
    .select("id, order_number, status, total, estimated_delivery, tracking_number, tracking_url, created_at, order_items(shade_type, fabric_name, width, height, quantity, unit_price, total_price), order_status_history(status, notes, created_at)")
    .eq("order_number", order_number.toUpperCase())
    .eq("email", email.toLowerCase())
    .single();

  if (error || !data) {
    return NextResponse.json(
      { error: "Order not found. Please check your order number and email." },
      { status: 404 }
    );
  }

  return NextResponse.json({ order: data });
}
