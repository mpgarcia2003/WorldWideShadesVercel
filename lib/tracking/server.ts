/**
 * Server-Side GA4 Measurement Protocol
 * Sends purchase conversion directly from the server - bypasses ad blockers.
 * 
 * Setup: Add GA4_MEASUREMENT_SECRET to your .env.local and Vercel env vars.
 * Get it from: GA4 Admin > Data Streams > your stream > Measurement Protocol API secrets > Create
 */

const GA4_MEASUREMENT_ID = "G-1RHH50R34P";

interface ServerPurchaseData {
  transactionId: string;
  value: number;
  currency?: string;
  tax?: number;
  shipping?: number;
  coupon?: string;
  items: Array<{
    item_id: string;
    item_name: string;
    price: number;
    quantity: number;
  }>;
  userEmail?: string;
  clientId?: string; // Real GA4 client_id from browser for attribution stitching
}

export async function trackServerPurchase(data: ServerPurchaseData) {
  const apiSecret = process.env.GA4_MEASUREMENT_SECRET;
  if (!apiSecret) {
    console.warn("[Server Tracking] GA4_MEASUREMENT_SECRET not set - skipping server-side purchase event");
    return;
  }

  // CRITICAL for GA4 dedup: without a real browser client_id, the server event
  // won't share session with the browser event, causing double-counted purchases.
  // If no clientId, skip server event — browser event will be the source of truth.
  if (!data.clientId) {
    console.warn(`[Server Tracking] No browser client_id for ${data.transactionId} — skipping server event to avoid dedup mismatch. Browser event will handle tracking.`);
    return;
  }

  const url = `https://www.google-analytics.com/mp/collect?measurement_id=${GA4_MEASUREMENT_ID}&api_secret=${apiSecret}`;

  const clientId = data.clientId;

  const payload = {
    client_id: clientId,
    non_personalized_ads: false,
    events: [
      {
        name: "purchase",
        params: {
          transaction_id: data.transactionId,
          value: data.value,
          currency: data.currency || "USD",
          tax: data.tax || 0,
          shipping: data.shipping || 0,
          coupon: data.coupon || "",
          items: data.items,
        },
      },
    ],
    ...(data.userEmail && {
      user_properties: {
        email: { value: data.userEmail.trim().toLowerCase() },
      },
    }),
  };

  try {
    const res = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      console.log(`[Server Tracking] Purchase sent: ${data.transactionId} - $${data.value}`);
    } else {
      console.error(`[Server Tracking] Failed (${res.status}): ${await res.text()}`);
    }
  } catch (err) {
    console.error("[Server Tracking] Error:", err);
  }
}
