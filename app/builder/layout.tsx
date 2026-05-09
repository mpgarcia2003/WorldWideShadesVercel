import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";

/**
 * Builder route metadata
 * ──────────────────────────────────────────────────────────────────────────
 * /builder is the configurator (a "use client" component) and emits an
 * unbounded number of URL permutations like /builder?shape=pentagon&color=...
 * Two SEO problems flow from this:
 *   1) Crawl waste — Googlebot can find configurator URLs via internal links
 *      and burn crawl budget on near-duplicate pages. (Mitigated already by
 *      the `Disallow: /builder?` rule in robots.ts.)
 *   2) Index pollution — if Google reaches a parameterized URL via a
 *      backlink (or had it indexed before robots.txt was tightened),
 *      robots.txt won't pull it back out of the index.
 *
 * The fix here is the canonical: every parameterized variant declares
 * `https://www.worldwideshades.com/builder` as its canonical URL. Google
 * treats this as a strong hint to consolidate signals onto the bare
 * /builder page and drop param permutations from the index over time.
 *
 * Why this lives in layout.tsx, not page.tsx: the page is a client
 * component (uses LanguageProvider, hooks, etc.) and can't export
 * server metadata. layout.tsx can. Layouts in App Router can't access
 * searchParams either, so we can't conditionally noindex on params from
 * here — but a stable canonical achieves the same SEO outcome without
 * the architectural refactor.
 */
export const metadata: Metadata = generatePageMetadata({
  title: "Design Your Custom Shade — Visual Shade Builder",
  description: "Design custom roller shades in minutes with our visual configurator. Choose from 700+ fabrics, set your dimensions, add motorization.",
  path: "/builder",
});

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
