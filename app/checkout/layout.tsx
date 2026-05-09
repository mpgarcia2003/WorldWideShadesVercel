import type { Metadata } from "next";

/**
 * Checkout route metadata
 * ──────────────────────────────────────────────────────────────────────────
 * /checkout is the Stripe-backed payment flow. Client component (uses
 * Stripe Elements which require browser APIs), so metadata can't live on
 * the page itself. This sibling layout.tsx supplies the server-side
 * noindex/nofollow directive.
 *
 * Indexing this page would be actively harmful — search-result snippets
 * would expose checkout content (form labels, payment method names, error
 * states) and erode trust. robots.txt blocks the crawl; the meta robots
 * tag here ensures the page is dropped from the index even if Googlebot
 * reaches it via a backlink or canonical reference.
 */
export const metadata: Metadata = {
  title: "Checkout",
  robots: { index: false, follow: false },
};

export default function CheckoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
