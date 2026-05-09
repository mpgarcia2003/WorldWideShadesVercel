import type { Metadata } from "next";

/**
 * Account route metadata
 * ──────────────────────────────────────────────────────────────────────────
 * /account is a Supabase-auth dashboard rendered as a client component.
 * Customer order history, email, and account state live here — none of it
 * should ever appear in search results.
 *
 * Same architectural pattern as /cart and /checkout: the page.tsx is
 * "use client" so it can't export metadata directly; this sibling
 * layout.tsx provides the server-side noindex/nofollow directive that
 * tells Googlebot (and other crawlers) to drop the URL from the index
 * even if reached via backlink. The robots.txt Disallow rule covers crawl
 * waste; this covers indexation.
 *
 * Note: subroutes (/account/login, /account/register) inherit this layout
 * and therefore inherit the noindex. That's the intended behavior — we
 * don't want auth screens indexed either.
 */
export const metadata: Metadata = {
  title: "Your Account",
  robots: { index: false, follow: false },
};

export default function AccountLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
