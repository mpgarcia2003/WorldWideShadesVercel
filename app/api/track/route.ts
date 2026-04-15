import { NextRequest, NextResponse } from "next/server";

/**
 * First-party tracking backup route
 * Receives add_to_cart and begin_checkout events from the browser,
 * forwards to GA4 via Measurement Protocol.
 * 
 * Because this runs on worldwideshades.com/api/track,
 * ad blockers cannot distinguish it from normal site requests.
 */

const GA4_MEASUREMENT_ID = "G-1RHH50R34P";
const ALLOWED_EVENTS = ["add_to_cart", "begin_checkout"];

export async function POST(req: NextRequest) {
  const apiSecret = process.env.GA4_MEASUREMENT_SECRET;
  if (!apiSecret) {
    return NextResponse.json({ ok: false, error: "GA4 secret not configured" }, { status: 500 });
  }

  try {
    const body = await req.json();
    const { event_name, client_id, params } = body;

    // Validate
    if (!event_name || !ALLOWED_EVENTS.includes(event_name)) {
      return NextResponse.json({ ok: false, error: "Invalid event" }, { status: 400 });
    }

    if (!client_id) {
      return NextResponse.json({ ok: false, error: "Missing client_id" }, { status: 400 });
    }

    // Forward to GA4 Measurement Protocol
    const url = `https://www.google-analytics.com/mp/collect?measurement_id=${GA4_MEASUREMENT_ID}&api_secret=${apiSecret}`;

    const payload = {
      client_id,
      non_personalized_ads: false,
      events: [
        {
          name: event_name,
          params: {
            ...params,
            event_source: "first_party_backup",
          },
        },
      ],
    };

    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      return NextResponse.json({ ok: true });
    } else {
      console.error(`[Track API] GA4 MP failed (${res.status})`);
      return NextResponse.json({ ok: false }, { status: 502 });
    }
  } catch (err) {
    console.error("[Track API] Error:", err);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
