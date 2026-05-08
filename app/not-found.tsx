import type { Metadata } from "next";
import Link from "next/link";
import { CTAButton } from "@/components/shared/CTAButton";

/**
 * 404 / Not Found page
 * ──────────────────────────────────────────────────────────────────────────
 * Per-route metadata override that sets robots: { index: false, follow: true }.
 *
 * Why this matters: the root layout's metadata sets `robots: { index: true,
 * follow: true }` as the site-wide default. Without this override, Next.js
 * inherits that index:true onto the not-found page, producing a SOFT-404:
 * the page returns HTTP 404 (correct) but emits <meta robots="index, follow">,
 * which Google treats as conflicting and historically erred toward keeping the
 * URL in the index. The audit (2026-05-08) flagged this on /pages/* and
 * /blogs/news/* legacy URLs from the old Shopify storefront — Google had
 * 119 URLs in "crawled — currently not indexed" partially due to this.
 *
 * follow:true is intentional — we still want PageRank to flow OUT of the 404
 * page through the "Go Home" / "Design a Shade" CTAs to legitimate destinations.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: true },
  title: "Page Not Found",
};

export default function NotFound() {
  return (
    <section className="section-padding bg-white">
      <div className="container-site text-center max-w-xl mx-auto">
        <span className="block heading-display text-8xl text-gold/30 mb-4">404</span>
        <h1 className="heading-display text-3xl text-dark mb-3">Page Not Found</h1>
        <p className="text-warm-gray mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <CTAButton href="/" label="Go Home" trackingLocation="404" variant="primary" />
          <CTAButton href="/builder" label="Design a Shade" trackingLocation="404" variant="outline" />
        </div>
      </div>
    </section>
  );
}
