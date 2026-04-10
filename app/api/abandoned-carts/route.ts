import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/client";
import { Resend } from "resend";

export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

function verifyAdmin(req: NextRequest) {
  return req.headers.get("x-admin-password") === process.env.ADMIN_PASSWORD;
}

// POST /api/abandoned-carts — save abandoned cart (public, called from exit intent popup)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const { email, name, phone, cart_data, page, source, total, item_count } = body;

  if (!email) {
    return NextResponse.json({ error: "Email required" }, { status: 400 });
  }

  const supabase = createAdminClient();

  // Check if this email already has an unrecovered abandoned cart in last 24h
  const { data: existing } = await supabase
    .from("abandoned_carts")
    .select("id")
    .eq("email", email.toLowerCase())
    .eq("recovered", false)
    .gte("created_at", new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString())
    .limit(1);

  if (existing && existing.length > 0) {
    // Update existing record with latest cart data
    const { error } = await supabase
      .from("abandoned_carts")
      .update({
        cart_data,
        total: total || 0,
        item_count: item_count || 0,
        page: page || "builder",
        name: name || null,
        phone: phone || null,
        updated_at: new Date().toISOString(),
      })
      .eq("id", existing[0].id);

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });
    return NextResponse.json({ success: true, updated: true });
  }

  // Create new abandoned cart record
  const { error } = await supabase.from("abandoned_carts").insert({
    email: email.toLowerCase(),
    name: name || null,
    phone: phone || null,
    cart_data,
    page: page || "builder",
    source: source || "exit_intent",
    total: total || 0,
    item_count: item_count || 0,
  });

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ success: true }, { status: 201 });
}

// GET /api/abandoned-carts — list all abandoned carts (admin only)
export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const url = new URL(req.url);
  const recovered = url.searchParams.get("recovered");
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = 50;
  const offset = (page - 1) * limit;

  let query = supabase
    .from("abandoned_carts")
    .select("*", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (recovered === "true") query = query.eq("recovered", true);
  if (recovered === "false") query = query.eq("recovered", false);

  const { data, error, count } = await query;
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ carts: data, total: count, page, limit });
}
