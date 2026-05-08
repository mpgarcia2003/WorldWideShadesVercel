import { NextRequest, NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/client";

export const dynamic = "force-dynamic";

/**
 * Server-side promo code validation
 * ───────────────────────────────────────────────────────────
 * Why this lives on the server (not the client):
 *
 *   1. Code list is no longer exposed in the JS bundle. A client-side array
 *      meant anyone with DevTools could read every active code.
 *   2. minOrder, expiration, and first-order rules cannot be bypassed by
 *      editing JS in the browser console.
 *   3. First-order eligibility requires querying Supabase for prior orders by
 *      email — only safe to do server-side with service-role key.
 *
 * NOTE: Promo codes are still hardcoded here for v1 simplicity (matches what
 * was in the client). To upgrade to a managed list:
 *   - Create `promo_codes` table in Supabase (code, type, value, min_order,
 *     starts_at, ends_at, max_uses, used_count, first_order_only, active)
 *   - Replace PROMO_CODES with `await supabase.from('promo_codes').select(...)`
 *   - Increment used_count on successful application (transactional)
 */

interface PromoCode {
  code: string;
  type: "percent" | "flat";
  value: number;          // percent (10 = 10%) or flat dollar amount
  minOrder: number;       // minimum cart subtotal in dollars
  label: string;          // display label shown to user
  active: boolean;        // master kill switch
  startsAt?: string;      // ISO date — code becomes valid on/after this date
  endsAt?: string;        // ISO date — code expires on/after this date
  firstOrderOnly?: boolean; // true → only valid for customers with no prior orders
}

const PROMO_CODES: PromoCode[] = [
  { code: "COMEBACK10", type: "percent", value: 10, minOrder: 0, label: "10% Off — Welcome Back", active: true },
  { code: "SHADE10",    type: "flat",    value: 50, minOrder: 100, label: "$50 Off", active: true },
  { code: "SAVE15",     type: "percent", value: 15, minOrder: 300, label: "15% Off", active: true },
  { code: "FIRST20",    type: "percent", value: 20, minOrder: 200, label: "20% Off — First Order", active: true, firstOrderOnly: true },
];

interface ValidateRequest {
  code?: string;
  subtotal?: number;       // cart subtotal in dollars
  email?: string;          // optional — required only for first-order codes
}

interface ValidateResponse {
  valid: boolean;
  discount?: number;       // dollar amount to subtract from subtotal
  label?: string;          // display label for the applied promo
  error?: string;          // human-readable error if invalid
}

export async function POST(req: NextRequest) {
  let body: ValidateRequest;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json<ValidateResponse>({ valid: false, error: "Invalid request" }, { status: 400 });
  }

  const code = (body.code || "").trim();
  const subtotal = Number(body.subtotal || 0);
  const email = (body.email || "").trim().toLowerCase();

  // Basic input validation
  if (!code) {
    return NextResponse.json<ValidateResponse>({ valid: false, error: "Enter a promo code" });
  }
  if (!Number.isFinite(subtotal) || subtotal < 0) {
    return NextResponse.json<ValidateResponse>({ valid: false, error: "Invalid order amount" });
  }

  // Look up the code (case-insensitive). Failed lookups are intentionally vague
  // so attackers can't enumerate code names (e.g. learning that "WELCOME20" exists
  // because we said "expired" instead of "invalid").
  const promo = PROMO_CODES.find((p) => p.code.toUpperCase() === code.toUpperCase());
  if (!promo || !promo.active) {
    return NextResponse.json<ValidateResponse>({ valid: false, error: "Invalid promo code" });
  }

  // Date window check (optional fields — skipped if not set)
  const now = Date.now();
  if (promo.startsAt && now < new Date(promo.startsAt).getTime()) {
    return NextResponse.json<ValidateResponse>({ valid: false, error: "This code is not yet active" });
  }
  if (promo.endsAt && now > new Date(promo.endsAt).getTime()) {
    return NextResponse.json<ValidateResponse>({ valid: false, error: "This code has expired" });
  }

  // Minimum-order check
  if (subtotal < promo.minOrder) {
    return NextResponse.json<ValidateResponse>({
      valid: false,
      error: `Minimum order $${promo.minOrder.toFixed(0)} required`,
    });
  }

  // First-order-only check — query Supabase for prior orders by this email.
  // If email is missing, we can't verify — reject the code rather than allow
  // anonymous bypass.
  if (promo.firstOrderOnly) {
    if (!email) {
      return NextResponse.json<ValidateResponse>({
        valid: false,
        error: "Enter your email above to use this first-order code",
      });
    }

    try {
      const supabase = createAdminClient();
      const { count, error } = await supabase
        .from("orders")
        .select("id", { count: "exact", head: true })
        .eq("email", email);

      if (error) {
        // If Supabase fails, fail closed (reject) rather than open (allow bypass).
        console.error("[Promo Validate] Supabase lookup failed:", error.message);
        return NextResponse.json<ValidateResponse>({
          valid: false,
          error: "Could not verify eligibility. Please try again.",
        });
      }

      if ((count || 0) > 0) {
        return NextResponse.json<ValidateResponse>({
          valid: false,
          error: "This code is for first-time customers only",
        });
      }
    } catch (err: any) {
      console.error("[Promo Validate] Supabase exception:", err.message);
      return NextResponse.json<ValidateResponse>({
        valid: false,
        error: "Could not verify eligibility. Please try again.",
      });
    }
  }

  // All checks passed — calculate discount and return.
  // Round to 2 decimal places to avoid floating-point pennies (e.g. 19.999...).
  const rawDiscount = promo.type === "percent" ? subtotal * (promo.value / 100) : promo.value;
  const discount = Math.min(Math.round(rawDiscount * 100) / 100, subtotal);

  return NextResponse.json<ValidateResponse>({
    valid: true,
    discount,
    label: promo.label,
  });
}
