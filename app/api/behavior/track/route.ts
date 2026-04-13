import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

/**
 * POST /api/behavior/track
 * Receives two payload types:
 *   1. { type: "session_start", ... } — creates a session row
 *   2. { type: "events", events: [...] } — inserts events + updates session
 *
 * INDEPENDENT from GTM/GA4/Google Ads — zero dataLayer contact.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const supabase = createAdminClient();

    if (body.type === "session_start") {
      const { error } = await supabase.from("behavior_sessions").upsert(
        {
          visitor_id: body.visitor_id,
          session_id: body.session_id,
          landing_page: body.landing_page || "",
          referrer: body.referrer || "",
          utm_source: body.utm_source || null,
          utm_medium: body.utm_medium || null,
          utm_campaign: body.utm_campaign || null,
          utm_content: body.utm_content || null,
          utm_term: body.utm_term || null,
          gclid: body.gclid || null,
          device_type: body.device_type || "unknown",
          browser: body.browser || "unknown",
          screen_width: body.screen_width || 0,
          started_at: new Date().toISOString(),
        },
        { onConflict: "session_id" }
      );

      if (error) {
        console.error("[BH Track] Session error:", error.message);
        return NextResponse.json({ error: error.message }, { status: 500 });
      }
      return NextResponse.json({ ok: true, type: "session" });
    }

    if (body.type === "events" && Array.isArray(body.events)) {
      const sessionId = body.session_id;
      const events = body.events;
      if (!sessionId || events.length === 0) {
        return NextResponse.json({ ok: true, type: "empty" });
      }

      // Insert events
      const rows = events.map((e: any) => ({
        session_id: sessionId,
        event_name: e.event_name,
        event_data: e.event_data || {},
        page: e.page || "",
        timestamp: e.timestamp || new Date().toISOString(),
        step_number: e.step_number || null,
        time_on_step_seconds: e.time_on_step_seconds || null,
      }));

      const { error: evError } = await supabase.from("behavior_events").insert(rows);
      if (evError) {
        console.error("[BH Track] Events error:", evError.message);
        return NextResponse.json({ error: evError.message }, { status: 500 });
      }

      // Update session summary
      // Always recalculate duration from session start to now
      const { data: currentSession } = await supabase
        .from("behavior_sessions")
        .select("started_at, furthest_builder_step, rage_click_count, pages_viewed")
        .eq("session_id", sessionId)
        .single();

      const startedAt = currentSession?.started_at ? new Date(currentSession.started_at).getTime() : Date.now();
      const updates: Record<string, any> = {
        ended_at: new Date().toISOString(),
        duration_seconds: Math.round((Date.now() - startedAt) / 1000),
      };
      
      // Carry forward existing values so we don't lose them
      let currentFurthest = currentSession?.furthest_builder_step || 0;
      let currentRageClicks = currentSession?.rage_click_count || 0;
      let currentPages = currentSession?.pages_viewed || 0;

      for (const e of events) {
        if (e.event_name === "bh_step_completed") {
          const stepNum = e.step_number || 0;
          if (stepNum > currentFurthest) {
            currentFurthest = stepNum;
            updates.furthest_builder_step = stepNum;
          }
        }
        if (e.event_name === "bh_session_end") {
          updates.max_scroll_depth = e.event_data?.max_scroll_depth || 0;
          updates.exit_page = e.event_data?.exit_page || "";
        }
        if (e.event_name === "bh_rage_click") {
          currentRageClicks++;
          updates.rage_click_count = currentRageClicks;
        }
        if (e.event_name === "bh_page_view") {
          currentPages++;
          updates.pages_viewed = currentPages;
        }
      }

      // Check funnel milestones from page URLs
      const pages = events.map((e: any) => e.page).filter(Boolean);
      if (pages.some((p: string) => p.includes("/cart"))) updates.reached_cart = true;
      if (pages.some((p: string) => p.includes("/checkout"))) updates.reached_checkout = true;

      await supabase
        .from("behavior_sessions")
        .update(updates)
        .eq("session_id", sessionId);

      return NextResponse.json({ ok: true, type: "events", count: events.length });
    }

    return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
  } catch (err: any) {
    console.error("[BH Track] Error:", err);
    return NextResponse.json({ error: "Internal error" }, { status: 500 });
  }
}
