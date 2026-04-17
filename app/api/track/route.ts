import { NextRequest, NextResponse } from "next/server";

/**
 * DEPRECATED — This route is no longer called by any client code.
 * 
 * It was originally a first-party Measurement Protocol backup for add_to_cart
 * and begin_checkout events. It was removed because:
 *   - begin_checkout is a PRIMARY bidding conversion in Google Ads
 *   - Dual-sending (browser GTM + server MP) double-counted the event
 *   - Google has no documented dedup for begin_checkout (unlike purchase)
 *   - This corrupted Smart Bidding optimization
 * 
 * DO NOT re-enable this for any event that is imported into Google Ads
 * as a primary or secondary conversion action.
 * 
 * If you need server-side event tracking in the future, use a separate
 * event name that is NOT imported into Google Ads for bidding.
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
