import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

function isAuthed(req: NextRequest): boolean {
  return req.headers.get("x-admin-password") === (process.env.ADMIN_PASSWORD || "wws-admin-2026");
}

/** GET /api/behavior/sessions — list sessions for dashboard */
export async function GET(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const url = new URL(req.url);
  const limit = parseInt(url.searchParams.get("limit") || "50", 10);
  const offset = parseInt(url.searchParams.get("offset") || "0", 10);
  const source = url.searchParams.get("source"); // utm_source filter
  const device = url.searchParams.get("device"); // device_type filter
  const dateFrom = url.searchParams.get("from"); // ISO date
  const dateTo = url.searchParams.get("to"); // ISO date

  const supabase = createAdminClient();

  let query = supabase
    .from("behavior_sessions")
    .select("*", { count: "exact" })
    .order("started_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (source) query = query.eq("utm_source", source);
  if (device) query = query.eq("device_type", device);
  if (dateFrom) query = query.gte("started_at", dateFrom);
  if (dateTo) query = query.lte("started_at", dateTo);

  const { data, error, count } = await query;

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  // Also get funnel summary
  const { data: allSessions } = await supabase
    .from("behavior_sessions")
    .select("furthest_builder_step, reached_cart, reached_checkout, purchased, utm_source, device_type")
    .gte("started_at", dateFrom || "2020-01-01")
    .lte("started_at", dateTo || "2099-12-31");

  const total = allSessions?.length || 0;
  const funnel = {
    total_sessions: total,
    visited_builder: allSessions?.filter((s) => (s.furthest_builder_step || 0) >= 1).length || 0,
    step_1_shape: allSessions?.filter((s) => (s.furthest_builder_step || 0) >= 1).length || 0,
    step_2_dimensions: allSessions?.filter((s) => (s.furthest_builder_step || 0) >= 2).length || 0,
    step_3_fabric: allSessions?.filter((s) => (s.furthest_builder_step || 0) >= 3).length || 0,
    step_4_mount: allSessions?.filter((s) => (s.furthest_builder_step || 0) >= 4).length || 0,
    step_5_control: allSessions?.filter((s) => (s.furthest_builder_step || 0) >= 5).length || 0,
    reached_cart: allSessions?.filter((s) => s.reached_cart).length || 0,
    reached_checkout: allSessions?.filter((s) => s.reached_checkout).length || 0,
    purchased: allSessions?.filter((s) => s.purchased).length || 0,
  };

  return NextResponse.json({ sessions: data, total: count, funnel });
}
