import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/client";

export const dynamic = 'force-dynamic';

function verifyAdmin(req: NextRequest) {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

// GET /api/customers — list all customers with order stats
export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const url = new URL(req.url);
  const search = url.searchParams.get("search");

  // Get all orders grouped by email
  let query = supabase
    .from("orders")
    .select("id, order_number, email, total, status, shipping_first_name, shipping_last_name, shipping_address1, shipping_address2, shipping_city, shipping_state, shipping_zip, phone, created_at")
    .order("created_at", { ascending: false });

  if (search) {
    query = query.or(
      `email.ilike.%${search}%,shipping_first_name.ilike.%${search}%,shipping_last_name.ilike.%${search}%,phone.ilike.%${search}%,shipping_city.ilike.%${search}%`
    );
  }

  const { data: orders, error } = await query;

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  // Group orders by email to build customer profiles
  const customerMap = new Map<string, any>();

  for (const order of orders || []) {
    const email = order.email?.toLowerCase();
    if (!email) continue;

    if (!customerMap.has(email)) {
      customerMap.set(email, {
        email,
        first_name: order.shipping_first_name || "",
        last_name: order.shipping_last_name || "",
        phone: order.phone || "",
        address1: order.shipping_address1 || "",
        address2: order.shipping_address2 || "",
        city: order.shipping_city || "",
        state: order.shipping_state || "",
        zip: order.shipping_zip || "",
        total_orders: 0,
        total_spent: 0,
        first_order_date: order.created_at,
        last_order_date: order.created_at,
        orders: [],
      });
    }

    const customer = customerMap.get(email)!;
    customer.total_orders++;
    if (order.status !== "cancelled") {
      customer.total_spent += Number(order.total);
    }
    // Update name/phone/address if empty (use most recent non-empty)
    if (!customer.first_name && order.shipping_first_name) customer.first_name = order.shipping_first_name;
    if (!customer.last_name && order.shipping_last_name) customer.last_name = order.shipping_last_name;
    if (!customer.phone && order.phone) customer.phone = order.phone;
    if (!customer.address1 && order.shipping_address1) {
      customer.address1 = order.shipping_address1;
      customer.address2 = order.shipping_address2 || "";
      customer.city = order.shipping_city || "";
      customer.state = order.shipping_state || "";
      customer.zip = order.shipping_zip || "";
    }
    // Track first/last order dates
    if (new Date(order.created_at) < new Date(customer.first_order_date)) {
      customer.first_order_date = order.created_at;
    }
    if (new Date(order.created_at) > new Date(customer.last_order_date)) {
      customer.last_order_date = order.created_at;
    }
    customer.orders.push({
      id: order.id,
      order_number: order.order_number,
      total: order.total,
      status: order.status,
      created_at: order.created_at,
    });
  }

  const customers = Array.from(customerMap.values()).sort(
    (a, b) => new Date(b.last_order_date).getTime() - new Date(a.last_order_date).getTime()
  );

  return NextResponse.json({ customers, total: customers.length });
}
