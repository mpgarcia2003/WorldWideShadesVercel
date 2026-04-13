import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

function isAuthed(req: NextRequest): boolean {
  const pw = req.headers.get("x-admin-password");
  const cron = req.headers.get("x-cron-secret");
  return pw === (process.env.ADMIN_PASSWORD || "wws-admin-2026") || cron === process.env.CRON_SECRET;
}

/**
 * POST /api/behavior/analyze
 * Body: { from?: string, to?: string }
 * Pulls sessions for the date range, sends to Claude for analysis, stores result.
 */
export async function POST(req: NextRequest) {
  if (!isAuthed(req)) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return NextResponse.json({ error: "ANTHROPIC_API_KEY not set" }, { status: 500 });

  const body = await req.json().catch(() => ({}));
  const supabase = createAdminClient();

  // Default: previous day
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const from = body.from || yesterday.toISOString().slice(0, 10) + "T00:00:00Z";
  const to = body.to || yesterday.toISOString().slice(0, 10) + "T23:59:59Z";

  // Pull sessions
  const { data: sessions, error: sErr } = await supabase
    .from("behavior_sessions")
    .select("*")
    .gte("started_at", from)
    .lte("started_at", to)
    .order("started_at", { ascending: true })
    .limit(200);

  if (sErr) return NextResponse.json({ error: sErr.message }, { status: 500 });
  if (!sessions || sessions.length === 0) {
    return NextResponse.json({ message: "No sessions found for this date range", sessions: 0 });
  }

  // Pull events for these sessions (batch)
  const sessionIds = sessions.map((s) => s.session_id);
  const { data: allEvents } = await supabase
    .from("behavior_events")
    .select("session_id, event_name, event_data, page, timestamp, step_number, time_on_step_seconds")
    .in("session_id", sessionIds)
    .order("timestamp", { ascending: true });

  // Group events by session
  const eventsBySession: Record<string, any[]> = {};
  for (const ev of allEvents || []) {
    if (!eventsBySession[ev.session_id]) eventsBySession[ev.session_id] = [];
    eventsBySession[ev.session_id].push(ev);
  }

  // Build funnel stats
  const total = sessions.length;
  const funnel = {
    total_sessions: total,
    visited_builder: sessions.filter((s) => (s.furthest_builder_step || 0) >= 1).length,
    step_1_shape: sessions.filter((s) => (s.furthest_builder_step || 0) >= 1).length,
    step_2_dimensions: sessions.filter((s) => (s.furthest_builder_step || 0) >= 2).length,
    step_3_fabric: sessions.filter((s) => (s.furthest_builder_step || 0) >= 3).length,
    step_4_mount: sessions.filter((s) => (s.furthest_builder_step || 0) >= 4).length,
    step_5_control: sessions.filter((s) => (s.furthest_builder_step || 0) >= 5).length,
    reached_cart: sessions.filter((s) => s.reached_cart).length,
    reached_checkout: sessions.filter((s) => s.reached_checkout).length,
    purchased: sessions.filter((s) => s.purchased).length,
  };

  // Build traffic source breakdown
  const sources: Record<string, { count: number; purchased: number; avg_steps: number }> = {};
  for (const s of sessions) {
    const src = s.utm_source || s.gclid ? "google_ads" : s.referrer ? "referral" : "direct";
    if (!sources[src]) sources[src] = { count: 0, purchased: 0, avg_steps: 0 };
    sources[src].count++;
    if (s.purchased) sources[src].purchased++;
    sources[src].avg_steps += s.furthest_builder_step || 0;
  }
  for (const src of Object.values(sources)) {
    src.avg_steps = Math.round((src.avg_steps / src.count) * 10) / 10;
  }

  // Build session summaries for AI (limit detail to keep token count reasonable)
  const sessionSummaries = sessions.slice(0, 100).map((s) => {
    const events = eventsBySession[s.session_id] || [];
    const stepEvents = events.filter((e) => e.event_name === "bh_step_completed");
    const rageClicks = events.filter((e) => e.event_name === "bh_rage_click");
    return {
      visitor: s.visitor_id.slice(0, 8),
      source: s.utm_source || (s.gclid ? "google_ads" : s.referrer ? "referral" : "direct"),
      device: s.device_type,
      landing: s.landing_page,
      duration_sec: s.duration_seconds || 0,
      furthest_step: s.furthest_builder_step || 0,
      steps: stepEvents.map((e) => ({
        step: e.event_data?.step,
        time_sec: e.time_on_step_seconds,
      })),
      reached_cart: s.reached_cart,
      reached_checkout: s.reached_checkout,
      purchased: s.purchased,
      purchase_value: s.purchase_value,
      exit_page: s.exit_page,
      scroll_depth: s.max_scroll_depth,
      rage_clicks: rageClicks.length,
      pages_viewed: s.pages_viewed || 0,
    };
  });

  // Build the AI prompt
  const prompt = `You are a senior conversion optimization analyst for World Wide Shades, a custom roller shade e-commerce company. Users configure shades step-by-step in a builder (shape → dimensions → fabric → mount → control → accessories → review → add to cart).

Here is the data from ${sessions.length} user sessions between ${from.slice(0, 10)} and ${to.slice(0, 10)}:

FUNNEL DATA:
${JSON.stringify(funnel, null, 2)}

TRAFFIC SOURCE BREAKDOWN:
${JSON.stringify(sources, null, 2)}

INDIVIDUAL SESSION SUMMARIES (${sessionSummaries.length} sessions):
${JSON.stringify(sessionSummaries, null, 2)}

Analyze this data and provide:

1. **DROP-OFF ANALYSIS**: Where exactly are users leaving and why? Calculate the drop-off rate between each step. Which step has the biggest leak?

2. **TRAFFIC SOURCE QUALITY**: Which sources bring the highest-intent users? Which sources are wasting money?

3. **BEHAVIORAL PATTERNS**: What patterns do you see in users who purchase vs those who abandon? Look at time per step, rage clicks, scroll depth, pages viewed.

4. **SPECIFIC UX RECOMMENDATIONS**: Based on the data, what exactly should we change? Be specific — "redesign the fabric selection" is not useful; "add a 'Most Popular' filter to fabric selection because users spend ${sessionSummaries.filter(s => s.steps.find(st => st.step === "fabric" && (st.time_sec || 0) > 120)).length > 0 ? 'too long' : 'adequate time'} there" is useful.

5. **A/B TEST IDEAS**: Suggest 3 specific tests ranked by expected impact.

6. **HIGH-INTENT SIGNALS**: What behaviors indicate a user is likely to purchase? What should trigger a discount popup or chat prompt?

Respond in JSON format:
{
  "summary": "2-3 sentence executive summary",
  "biggest_leak": { "step": "...", "drop_off_pct": N, "likely_cause": "..." },
  "drop_offs": [{ "from_step": "...", "to_step": "...", "drop_off_pct": N, "insight": "..." }],
  "traffic_quality": [{ "source": "...", "verdict": "...", "recommendation": "..." }],
  "ux_recommendations": ["specific actionable recommendation 1", "..."],
  "ab_tests": [{ "test": "...", "hypothesis": "...", "expected_impact": "..." }],
  "high_intent_signals": ["signal 1", "..."]
}`;

  // Call Claude API
  try {
    const aiRes = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        messages: [{ role: "user", content: prompt }],
      }),
    });

    const aiData = await aiRes.json();
    const rawText = aiData.content?.[0]?.text || "No analysis returned";

    // Try to parse JSON from response
    let parsed: any = null;
    try {
      const jsonMatch = rawText.match(/\{[\s\S]*\}/);
      if (jsonMatch) parsed = JSON.parse(jsonMatch[0]);
    } catch {}

    // Store insight
    const { data: insight, error: iErr } = await supabase
      .from("behavior_insights")
      .insert({
        analysis_type: body.manual ? "manual" : "daily",
        date_range_start: from,
        date_range_end: to,
        sessions_analyzed: sessions.length,
        insight_text: parsed?.summary || rawText.slice(0, 2000),
        funnel_data: funnel,
        drop_off_points: parsed?.drop_offs || null,
        recommendations: parsed
          ? {
              ux: parsed.ux_recommendations,
              ab_tests: parsed.ab_tests,
              high_intent: parsed.high_intent_signals,
              traffic: parsed.traffic_quality,
              biggest_leak: parsed.biggest_leak,
            }
          : null,
        traffic_breakdown: sources,
      })
      .select()
      .single();

    return NextResponse.json({
      ok: true,
      sessions_analyzed: sessions.length,
      insight_id: insight?.id,
      analysis: parsed || rawText,
    });
  } catch (aiErr: any) {
    console.error("[BH Analyze] AI error:", aiErr);
    return NextResponse.json({ error: "AI analysis failed: " + aiErr.message }, { status: 500 });
  }
}
