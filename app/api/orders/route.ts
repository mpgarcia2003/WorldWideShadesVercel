/**
 * /api/orders — admin listing (GET) + idempotent finalization fallback (POST)
 * ──────────────────────────────────────────────────────────────────────────
 * As of 2026-05-09, order creation is webhook-driven. The flow is:
 *
 *   1. Browser POSTs to /api/orders/init  → creates pending order in DB
 *   2. Browser calls stripe.confirmPayment()
 *   3. Stripe sends payment_intent.succeeded → /api/webhooks/stripe finalizes
 *
 * The POST handler in THIS file is now the fallback path. It exists to
 * cover the rare case where the webhook is delayed (Stripe outage,
 * misconfigured endpoint) but the browser successfully completed payment.
 * In that case the browser can call this endpoint with the pi_xxx and we
 * finalize the order via the same shared logic. If the webhook beat us,
 * this is an idempotent no-op.
 *
 * The /checkout page no longer calls this in the happy path. Kept for
 * backward compat (e.g., in-flight checkouts during a deploy) and as a
 * defense-in-depth fallback.
 *
 * SCHEMA DEPENDENCY: This route's columns are documented in
 * lib/supabase/schema.sql, last verified against production 2026-05-09.
 * Production is at project tptisikpbmqvllfhjdch. If this file references
 * columns that aren't in prod, INSERTs will return 400 → 500 and orders
 * will be silently dropped, as happened on 2026-05-08 with `freight_charge`.
 * NEVER skip running ALTER TABLE in Supabase before deploying schema-touching
 * code changes.
 */
import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/client";
import { finalizePendingOrder } from "@/lib/orders/finalize";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16" as any,
});

export const dynamic = "force-dynamic";

function verifyAdmin(req: NextRequest) {
  const auth = req.headers.get("x-admin-password");
  if (auth !== process.env.ADMIN_PASSWORD) {
    return false;
  }
  return true;
}

// ─── GET /api/orders — list all orders (admin) ──────────────────────────
export async function GET(req: NextRequest) {
  if (!verifyAdmin(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  const url = new URL(req.url);
  const status = url.searchParams.get("status");
  const includePending = url.searchParams.get("include_pending") === "true";
  const search = url.searchParams.get("search");
  const page = parseInt(url.searchParams.get("page") || "1");
  const limit = parseInt(url.searchParams.get("limit") || "50");
  const offset = (page - 1) * limit;

  let query = supabase
    .from("orders")
    .select("*, order_items(*), order_status_history(*)", { count: "exact" })
    .order("created_at", { ascending: false })
    .range(offset, offset + limit - 1);

  if (status && status !== "all") {
    query = query.eq("status", status);
  } else if (!includePending) {
    // Default behavior: hide pending orders from the admin list. Pending
    // orders are mid-checkout (between /init and finalize) or abandoned.
    // Surface them only when explicitly requested via ?include_pending=true.
    query = query.neq("status", "pending");
  }

  if (search) {
    query = query.or(
      `order_number.ilike.%${search}%,email.ilike.%${search}%,shipping_first_name.ilike.%${search}%,shipping_last_name.ilike.%${search}%`
    );
  }

  const { data, error, count } = await query;

  if (error) {
    console.error("[Orders API GET] Query failed:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ orders: data, total: count, page, limit });
}

// ─── POST /api/orders — finalization fallback ──────────────────────────
//
// Thin wrapper around finalizePendingOrder(). Verifies the PaymentIntent
// is actually succeeded (anti-spam — prevents arbitrary order finalization),
// then delegates to the shared idempotent finalization logic.
//
// EXPECTED CALLERS:
//   - Browser /checkout page (legacy fallback path; no longer the primary)
//   - Manual recovery scripts (with proper x-admin-password header? Optional)
//
// EXPECTED RESPONSES:
//   201 → order finalized fresh (this caller won the race)
//   200 → order already finalized (webhook beat us — idempotent no-op)
//   400 → invalid PaymentIntent ID format
//   402 → PaymentIntent not yet succeeded (browser is fast, Stripe is async)
//   500 → finalization failed (DB error, etc.)
export async function POST(req: NextRequest) {
  const body = await req.json();
  const piId = body.stripe_payment_intent_id;

  if (!piId || typeof piId !== "string" || !piId.startsWith("pi_")) {
    return NextResponse.json(
      { error: "Missing or invalid stripe_payment_intent_id" },
      { status: 400 }
    );
  }

  // Verify the PaymentIntent is succeeded by re-fetching from Stripe.
  // This prevents an attacker from POSTing arbitrary pi_xxx to finalize
  // orders that didn't actually pay. The pi must be one we created
  // (order_source=worldwideshades.com) AND in succeeded status.
  let paymentIntent: Stripe.PaymentIntent;
  try {
    paymentIntent = await stripe.paymentIntents.retrieve(piId);
  } catch (err: any) {
    console.error("[Orders API POST] Stripe retrieve failed:", err.message);
    return NextResponse.json({ error: "Payment verification failed" }, { status: 400 });
  }

  if (paymentIntent.status !== "succeeded") {
    return NextResponse.json(
      { error: `Payment not yet confirmed (status=${paymentIntent.status})` },
      { status: 402 }
    );
  }

  if ((paymentIntent.metadata || {}).order_source !== "worldwideshades.com") {
    return NextResponse.json(
      { error: "PaymentIntent is not from this store" },
      { status: 400 }
    );
  }

  // Delegate to shared idempotent finalization logic.
  const result = await finalizePendingOrder(paymentIntent);

  if (!result.success) {
    return NextResponse.json({ error: result.error }, { status: 500 });
  }

  return NextResponse.json(
    {
      order: result.order,
      order_number: result.order?.order_number,
      already_finalized: result.alreadyFinalized || false,
    },
    { status: result.alreadyFinalized ? 200 : 201 }
  );
}
