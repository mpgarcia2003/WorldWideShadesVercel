import type { Metadata } from "next";

/**
 * Cart route metadata
 * ──────────────────────────────────────────────────────────────────────────
 * /cart is a client-rendered user-state page (the page.tsx is "use client",
 * which can't export metadata directly). This sibling layout.tsx exists
 * solely to declare the page's metadata, in particular the noindex/nofollow
 * robots directive.
 *
 * Why noindex matters even with robots.txt: robots.txt blocks CRAWLING but
 * does not prevent INDEXING if Google reaches the URL via a backlink. The
 * authoritative way to keep a URL out of the index is the page-level
 * meta robots tag emitted from the server-rendered HTML. Pairing this
 * with the robots.txt Disallow rules (which now match both /cart and /cart/
 * trailing-slash variants) is belt-and-suspenders.
 *
 * We also intentionally do NOT add a canonical here — there is nothing
 * canonical about a user-state page.
 */
export const metadata: Metadata = {
  title: "Your Cart",
  robots: { index: false, follow: false },
};

export default function CartLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
