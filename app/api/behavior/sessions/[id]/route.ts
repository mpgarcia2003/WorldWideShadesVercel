import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

function isAuthed(req: NextRequest): boolean {
  return req.headers.get("x-admin-password") === (process.env.ADMIN_PASSWORD || "wws-admin-2026");
}

/** GET /api/behavior/sessions/[id] — single session with all events */
export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await params;
  const supabase = createAdminClient();

  const { data: session, error: sErr } = await supabase
    .from("behavior_sessions")
    .select("*")
    .eq("session_id", id)
    .single();

  if (sErr || !session) return NextResponse.json({ error: "Session not found" }, { status: 404 });

  const { data: events, error: eErr } = await supabase
    .from("behavior_events")
    .select("*")
    .eq("session_id", id)
    .order("timestamp", { ascending: true });

  return NextResponse.json({ session, events: events || [] });
}
