/**
 * lib/orders/finalize.ts
 * ──────────────────────────────────────────────────────────────────────────
 * Shared, idempotent order finalization logic. Called by:
 *   1. The Stripe webhook (app/api/webhooks/stripe/route.ts) — primary path
 *   2. The /api/orders POST endpoint (browser fallback for transient webhook delays)
 *
 * RELIABILITY GUARANTEES:
 *   - Atomic: only one caller wins the race between webhook and browser
 *     fallback. PostgreSQL UPDATE ... WHERE status='pending' is atomic per row.
 *   - Idempotent: safe to call multiple times. Second+ calls observe the
 *     finalized state and no-op (no duplicate emails, no double tracking).
 *   - Safe under Stripe webhook retries (Stripe retries up to 3 days on 5xx).
 *
 * THE STATE MACHINE:
 *   pending  ──[finalizePendingOrder()]──▶  received
 *      │
 *      └──[payment_intent.payment_failed]──▶  cancelled  (TODO: not yet wired)
 *
 * INPUT:
 *   - paymentIntent: a SUCCEEDED Stripe PaymentIntent
 *
 * SIDE EFFECTS (only on the winning call):
 *   - UPDATE orders SET status='received', stripe_charge_id=...
 *   - INSERT order_status_history (status='received', notes=...)
 *   - UPDATE abandoned_carts SET recovered=true (best effort)
 *   - sendOrderConfirmation() to customer
 *   - sendNewOrderAlert() to admin
 *   - trackServerPurchase() to GA4 Measurement Protocol
 *
 * NON-WINNING CALLS (already finalized):
 *   - Return { success: true, order, alreadyFinalized: true } with no side effects
 */

import { createAdminClient } from "@/lib/supabase/client";
import { sendOrderConfirmation, sendNewOrderAlert } from "@/lib/email/send";
import { trackServerPurchase } from "@/lib/tracking/server";
import type Stripe from "stripe";

interface FinalizeResult {
  success: boolean;
  order?: any;
  alreadyFinalized?: boolean;
  error?: string;
}

export async function finalizePendingOrder(
  paymentIntent: Stripe.PaymentIntent
): Promise<FinalizeResult> {
  const supabase = createAdminClient();
  const piId = paymentIntent.id;
  const metadata = paymentIntent.metadata || {};
  const gaClientId = metadata.ga_client_id || undefined;

  // ─── Step 1: Locate the pending order ─────────────────────────────────
  // Primary lookup: pending_order_id from PaymentIntent metadata (set by
  // /api/orders/init when the user clicked "Place Order"). This is the
  // fast path — direct primary-key lookup.
  //
  // Fallback lookup: stripe_payment_intent_id column. Covers the case where
  // metadata.update from /init failed (Stripe API error) but the DB row was
  // still committed. Belt-and-suspenders.
  let pendingOrderId: string | null = metadata.pending_order_id || null;

  if (!pendingOrderId) {
    const { data: byPI } = await supabase
      .from("orders")
      .select("id, status")
      .eq("stripe_payment_intent_id", piId)
      .maybeSingle();
    if (byPI) {
      pendingOrderId = byPI.id;
      console.log(
        `[finalize] PI ${piId}: pending_order_id missing from metadata, recovered via stripe_payment_intent_id lookup → ${pendingOrderId}`
      );
    }
  }

  if (!pendingOrderId) {
    // No pending order anywhere. This means /api/orders/init was never called
    // for this PaymentIntent. The order data we'd need to create from scratch
    // (cart items, shipping address, etc.) is NOT in PaymentIntent metadata
    // by design (Stripe metadata size limits). Without it, we cannot recover
    // the order automatically — admin needs to manually reconstruct.
    //
    // We return success=false so the webhook returns 200 (don't retry — data
    // genuinely isn't there), but log loudly for admin visibility.
    console.error(
      `[finalize] No pending order found for PI ${piId}. Payment was successful but order data is missing. ` +
        `The customer was charged but cannot be served automatically. Admin must reconstruct from Stripe Dashboard.`
    );
    return { success: false, error: "No pending order found for this PaymentIntent" };
  }

  // ─── Step 2: Atomic state transition ──────────────────────────────────
  // The .eq("status", "pending") filter in the UPDATE is the linchpin of
  // idempotency. Postgres UPDATE is atomic per row — only one concurrent
  // caller can observe status='pending' and flip it to 'received'.
  //
  // If the row was already finalized (by the webhook, then browser POST
  // races and tries again), this UPDATE returns 0 rows affected. The
  // .single() call surfaces that as an error (PGRST116 — row not found),
  // and we fall through to the "already finalized" branch.
  const stripeChargeId = (paymentIntent as any).latest_charge as string | undefined;

  const { data: updated, error: updateError } = await supabase
    .from("orders")
    .update({
      status: "received",
      stripe_payment_intent_id: piId,
      stripe_charge_id: stripeChargeId || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", pendingOrderId)
    .eq("status", "pending") // ← idempotency guard: only the winner mutates
    .select("*, order_items(*)")
    .single();

  if (updateError || !updated) {
    // Either the row doesn't exist OR it's already been finalized.
    // Fetch the current state to distinguish these cases.
    const { data: existing, error: lookupError } = await supabase
      .from("orders")
      .select("*, order_items(*)")
      .eq("id", pendingOrderId)
      .maybeSingle();

    if (lookupError) {
      console.error(`[finalize] Lookup failed for ${pendingOrderId}:`, lookupError);
      return { success: false, error: lookupError.message };
    }

    if (!existing) {
      console.error(`[finalize] Pending order ${pendingOrderId} disappeared between init and finalize`);
      return { success: false, error: "Pending order not found" };
    }

    if (existing.status === "pending") {
      // Race we shouldn't lose: row exists, is pending, but UPDATE didn't match.
      // Most likely cause: an exotic data type mismatch on the WHERE clause.
      // Surface as an error so it's visible.
      console.error(
        `[finalize] Order ${pendingOrderId} is pending but UPDATE matched 0 rows. Investigate.`,
        { updateError: updateError?.message }
      );
      return { success: false, error: "Atomic update failed unexpectedly" };
    }

    // Order is already in a non-pending state — this is the expected
    // idempotent "already finalized" outcome. No emails, no tracking.
    console.log(
      `[finalize] Order ${existing.order_number} (${pendingOrderId}) already finalized (status=${existing.status}) — webhook is idempotent ✓`
    );
    return { success: true, order: existing, alreadyFinalized: true };
  }

  // ─── Step 3: We won the race. Run the side effects. ───────────────────
  console.log(
    `[finalize] Won race for ${updated.order_number} (pi=${piId}). Running side effects.`
  );

  // 3a. Status history entry — records the transition for the admin timeline
  await supabase.from("order_status_history").insert({
    order_id: updated.id,
    status: "received",
    notes: "Order placed (payment confirmed via webhook)",
  });

  // 3b. Mark abandoned carts as recovered (best-effort, non-blocking)
  try {
    if (updated.email) {
      await supabase
        .from("abandoned_carts")
        .update({
          recovered: true,
          recovery_order_id: updated.id,
          updated_at: new Date().toISOString(),
        })
        .eq("email", updated.email.toLowerCase())
        .eq("recovered", false);
    }
  } catch (err) {
    // The abandoned_carts table may not exist in all environments — silent ignore.
  }

  // 3c. Send emails (customer confirmation + admin alert).
  // Non-fatal if either fails — log loudly but don't roll back the order.
  // The order is already finalized; the customer can be re-emailed manually
  // from the admin if needed.
  const orderItems = updated.order_items || [];
  try {
    await Promise.all([
      sendOrderConfirmation(updated, orderItems),
      sendNewOrderAlert(updated, orderItems),
    ]);
    console.log(`[finalize] Emails sent for ${updated.order_number}`);
  } catch (emailErr: any) {
    console.error(`[finalize] Email send failed for ${updated.order_number}:`, {
      error_message: emailErr?.message || String(emailErr),
      stack: emailErr?.stack,
    });
  }

  // 3d. Server-side GA4 purchase event.
  // CRITICAL for analytics dedup: transaction_id MUST be paymentIntent.id
  // (matches what the browser fires via gtag). GA4 dedupes by transaction_id.
  try {
    await trackServerPurchase({
      transactionId: piId,
      value: paymentIntent.amount / 100,
      currency: paymentIntent.currency.toUpperCase(),
      tax: Number(updated.tax) || 0,
      shipping: Number(updated.shipping) || 0,
      coupon: updated.promo_code || "",
      clientId: gaClientId,
      userEmail: updated.email,
      items: orderItems.map((item: any) => ({
        item_id: item.fabric_id || "shade",
        item_name: item.shade_type || "Custom Roller Shade",
        price: Number(item.unit_price) || 0,
        quantity: item.quantity || 1,
      })),
    });
  } catch (trackErr) {
    console.error(`[finalize] Server tracking failed for ${updated.order_number}:`, trackErr);
  }

  console.log(`[finalize] Successfully finalized ${updated.order_number} (pi=${piId})`);
  return { success: true, order: updated, alreadyFinalized: false };
}
