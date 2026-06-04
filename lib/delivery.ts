/**
 * lib/delivery.ts — Single source of truth for delivery estimates & copy.
 * ──────────────────────────────────────────────────────────────────────────
 * Business rules (set 2026-06-04):
 *   • Standard shades  → 7–10 business days
 *   • Specialty shapes → ~4 weeks (≈20 business days)
 *
 * Everything that shows a delivery time — the builder, checkout, the order
 * confirmation page, marketing trust strips — imports from here so the numbers
 * can never drift out of sync again (which is what produced the stale
 * "April 14–18" chip). Change the constants below and every surface updates.
 */

// Business-day windows (counted from order date, excluding Sat/Sun).
export const DELIVERY_STANDARD_MIN_DAYS = 7;
export const DELIVERY_STANDARD_MAX_DAYS = 10;
// 4 weeks expressed as business days (4 × 5).
export const DELIVERY_SPECIALTY_BUSINESS_DAYS = 20;

// Short labels (no dates) for trust strips and marketing copy.
export const DELIVERY_LABEL_STANDARD = `${DELIVERY_STANDARD_MIN_DAYS}–${DELIVERY_STANDARD_MAX_DAYS} business days`;
export const DELIVERY_LABEL_SPECIALTY = "~4 weeks";
// Combined phrasing for surfaces that cover both product types (e.g. homepage).
export const DELIVERY_LABEL_GENERIC = `${DELIVERY_LABEL_STANDARD} (${DELIVERY_LABEL_SPECIALTY} for specialty shapes)`;

/** Add N business days (skipping weekends) to a date. Pure; does not mutate input. */
export function addBusinessDays(start: Date, days: number): Date {
  const d = new Date(start.getTime());
  let added = 0;
  while (added < days) {
    d.setDate(d.getDate() + 1);
    const day = d.getDay();
    if (day !== 0 && day !== 6) added++;
  }
  return d;
}

/** "7–10 business days" or "~4 weeks". */
export function deliveryLabel(isSpecialty: boolean): string {
  return isSpecialty ? DELIVERY_LABEL_SPECIALTY : DELIVERY_LABEL_STANDARD;
}

const MD: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };

/**
 * Full estimated-delivery string stored on the order and shown to customers.
 *   Standard  → "Jun 15 – Jun 18, 2026"
 *   Specialty → "~4 weeks (around Jul 2, 2026)"
 */
export function getDeliveryEstimate(isSpecialty: boolean, from: Date = new Date()): string {
  if (isSpecialty) {
    const eta = addBusinessDays(from, DELIVERY_SPECIALTY_BUSINESS_DAYS);
    return `~4 weeks (around ${eta.toLocaleDateString("en-US", MD)}, ${eta.getFullYear()})`;
  }
  const start = addBusinessDays(from, DELIVERY_STANDARD_MIN_DAYS);
  const end = addBusinessDays(from, DELIVERY_STANDARD_MAX_DAYS);
  return `${start.toLocaleDateString("en-US", MD)} – ${end.toLocaleDateString("en-US", MD)}, ${end.getFullYear()}`;
}

/**
 * Single short "arrives by" date for the builder's sticky bar / right rail.
 *   Standard  → latest day of the window (today + 10 business days), e.g. "Jun 18"
 *   Specialty → the ~4-week date (today + 20 business days), e.g. "Jul 2"
 */
export function getArrivesBy(isSpecialty: boolean, from: Date = new Date()): string {
  const eta = addBusinessDays(from, isSpecialty ? DELIVERY_SPECIALTY_BUSINESS_DAYS : DELIVERY_STANDARD_MAX_DAYS);
  return eta.toLocaleDateString("en-US", MD);
}

/** True if any cart item / config is a specialty shape (anything other than "Standard"). */
export function hasSpecialtyShape(items: Array<{ shape?: string } | undefined | null>): boolean {
  return items.some((it) => !!it && !!it.shape && it.shape !== "Standard");
}
