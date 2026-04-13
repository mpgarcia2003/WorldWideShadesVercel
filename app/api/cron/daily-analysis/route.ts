import { NextRequest, NextResponse } from "next/server";

export const dynamic = "force-dynamic";

/**
 * GET /api/cron/daily-analysis
 * Runs daily at 7am EST (0 12 * * * UTC) via Vercel cron.
 * Triggers AI analysis for the previous day's sessions.
 */
export async function GET(req: NextRequest) {
  // Verify cron secret
  const authHeader = req.headers.get("authorization");
  const cronSecret = process.env.CRON_SECRET;
  if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Calculate yesterday's date range
  const now = new Date();
  const yesterday = new Date(now);
  yesterday.setDate(yesterday.getDate() - 1);
  const from = yesterday.toISOString().slice(0, 10) + "T00:00:00Z";
  const to = yesterday.toISOString().slice(0, 10) + "T23:59:59Z";

  try {
    // Call the analyze endpoint internally
    const baseUrl = process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3001";

    const res = await fetch(`${baseUrl}/api/behavior/analyze`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-cron-secret": process.env.CRON_SECRET || "",
      },
      body: JSON.stringify({ from, to }),
    });

    const result = await res.json();

    console.log(`[Daily Analysis] Analyzed ${result.sessions_analyzed || 0} sessions for ${from.slice(0, 10)}`);

    return NextResponse.json({
      ok: true,
      date: from.slice(0, 10),
      sessions_analyzed: result.sessions_analyzed || 0,
      insight_id: result.insight_id,
    });
  } catch (err: any) {
    console.error("[Daily Analysis] Error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
