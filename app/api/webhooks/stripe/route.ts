/**
 * /api/webhooks/stripe — Stripe webhook handler (PRIMARY order finalization path)
 * ──────────────────────────────────────────────────────────────────────────
 * Listens for payment_intent.succeeded and finalizes the corresponding
 * pending order in the database. This is the SOURCE OF TRUTH for order
 * creation as of 2026-05-09.
 *
 * RELIABILITY: Stripe retries failed webhooks (5xx response) with
 * exponential backoff for up to 3 days. This makes the webhook resilient
 * to transient DB errors, brief Vercel outages, and Resend hiccups —
 * unlike the previous browser-side flow which had no retry mechanism.
 *
 * IDEMPOTENCY: lib/orders/finalize.ts uses an atomic UPDATE that only
 * succeeds for the first caller to flip a pending order. Subsequent
 * webhook deliveries (Stripe occasionally sends duplicates) and the
 * /api/orders POST fallback all see the finalized state and no-op.
 *
 * SECURITY: Stripe signs every webhook with a secret (STRIPE_WEBHOOK_SECRET).
 * We verify the signature before processing. Without a valid signature,
 * the request is rejected.
 *
 * SETUP (Stripe Dashboard → Developers → Webhooks):
 *   - Endpoint URL: https://www.worldwideshades.com/api/webhooks/stripe
 *   - Events to listen for:
 *       payment_intent.succeeded     ← REQUIRED for order finalization
 *       payment_intent.payment_failed (optional — logging only)
 *   - Sign secret stored in Vercel env: STRIPE_WEBHOOK_SECRET
 *
 * RESPONSE CODES:
 *   200 → event received and processed (or intentionally skipped)
 *   400 → bad signature or malformed body (Stripe will not retry)
 *   500 → transient processing error (Stripe WILL retry up to 3 days)
 */

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { finalizePendingOrder } from "@/lib/orders/finalize";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16" as any,
});

const WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: NextRequest) {
  const body = await req.text();
  const sig = req.headers.get("stripe-signature");

  if (!sig) {
    console.error("[Stripe Webhook] Missing stripe-signature header");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  // ─── Verify signature ────────────────────────────────────────────────
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, sig, WEBHOOK_SECRET);
  } catch (err: any) {
    console.error("[Stripe Webhook] Signature verification failed:", err.message);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // ─── Handle payment_intent.succeeded (PRIMARY path) ──────────────────
  if (event.type === "payment_intent.succeeded") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    const metadata = paymentIntent.metadata || {};

    console.log(
      `[Stripe Webhook] payment_intent.succeeded received: ${paymentIntent.id} ($${(paymentIntent.amount / 100).toFixed(2)})`
    );

    // Skip non-WWS PaymentIntents. The order_source tag is set in
    // /api/checkout when WE create a PaymentIntent. PaymentIntents created
    // via Stripe Invoices, manual Dashboard charges, or other systems
    // won't have it and shouldn't trigger order creation here.
    if (metadata.order_source !== "worldwideshades.com") {
      console.log(
        `[Stripe Webhook] Skipping non-WWS PaymentIntent ${paymentIntent.id} (order_source=${metadata.order_source || "none"})`
      );
      return NextResponse.json({ received: true, skipped: true, reason: "not a WWS order" });
    }

    try {
      const result = await finalizePendingOrder(paymentIntent);

      if (result.success) {
        if (result.alreadyFinalized) {
          console.log(
            `[Stripe Webhook] Order ${result.order?.order_number} already finalized — webhook is idempotent ✓`
          );
        } else {
          console.log(`[Stripe Webhook] ✅ Finalized order ${result.order?.order_number}`);
        }
        return NextResponse.json({ received: true, finalized: true, order_number: result.order?.order_number });
      }

      // Finalization failed. Decide whether to retry or accept.
      // - "No pending order found" → permanent failure (data isn't there).
      //   Return 200 so Stripe doesn't retry forever. Log loudly for admin.
      // - Other errors (DB connection, etc.) → transient. Return 500 so
      //   Stripe retries with exponential backoff.
      if (result.error === "No pending order found for this PaymentIntent") {
        console.error(
          `[Stripe Webhook] PERMANENT FAILURE: ${paymentIntent.id} succeeded but no pending order exists. ` +
            `Customer was charged but order data is missing. Manual reconstruction required.`
        );
        return NextResponse.json(
          { received: true, finalized: false, reason: "no_pending_order", error: result.error },
          { status: 200 } // ← 200 to stop Stripe retries (data isn't there)
        );
      }

      console.error(`[Stripe Webhook] Transient failure for ${paymentIntent.id}: ${result.error}. Stripe will retry.`);
      return NextResponse.json(
        { received: true, finalized: false, error: result.error },
        { status: 500 } // ← 500 triggers Stripe retry
      );
    } catch (err: any) {
      // Catch-all for unexpected exceptions (network errors, env issues).
      // Treat as transient — return 500 so Stripe retries.
      console.error(`[Stripe Webhook] Unhandled exception finalizing ${paymentIntent.id}:`, {
        error_message: err?.message || String(err),
        stack: err?.stack,
      });
      return NextResponse.json({ error: "Internal error" }, { status: 500 });
    }
  }

  // ─── Handle payment_intent.payment_failed (logging only for now) ─────
  if (event.type === "payment_intent.payment_failed") {
    const paymentIntent = event.data.object as Stripe.PaymentIntent;
    console.error(
      `[Stripe Webhook] Payment failed: ${paymentIntent.id} — ${paymentIntent.last_payment_error?.message}`
    );
    // Future enhancement: mark the corresponding pending order as 'cancelled'
    // so it doesn't pollute the orders table forever.
  }

  // ─── Acknowledge other event types ───────────────────────────────────
  // Stripe will keep retrying any event that doesn't return 2xx. Always
  // ack unknown/unhandled events to keep the webhook queue clean.
  return NextResponse.json({ received: true });
}
