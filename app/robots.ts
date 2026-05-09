import type { MetadataRoute } from "next";
import { SITE } from "@/lib/constants";

/**
 * robots.txt
 * ──────────────────────────────────────────────────────────────────────────
 * - Disallow user-state and admin paths from crawl
 * - Disallow Shopify-style faceted-nav and feed param crawl traps that
 *   the audit flagged as wasting crawl budget on the legacy backend
 * - Sitemap declared with the canonical www host (was apex; switched to
 *   eliminate apex/www inconsistency)
 *
 * IMPORTANT — trailing-slash matching: per Google's robots.txt spec, the
 * pattern `Disallow: /cart/` matches `/cart/` and `/cart/anything` but does
 * NOT match `/cart` (no trailing slash). The Perplexity 2026-05-08 recheck
 * caught that our actual URLs are `/cart`, `/account`, `/checkout` (no
 * slash) and Googlebot was crawling them despite the trailing-slash rule.
 *
 * Fix: list both variants for every user-state path. Belt-and-suspenders
 * with the per-route `noindex` metadata in app/{cart,account,checkout}/
 * layout.tsx — robots.txt blocks crawling, the meta tag prevents indexing
 * even if reached via backlink.
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // User-state — never indexable. Both with and without trailing
          // slash so Googlebot honors the directive regardless of how the
          // URL is written in any backlink it encounters.
          "/api/",
          "/account",
          "/account/",
          "/checkout",
          "/checkout/",
          "/cart",
          "/cart/",
          "/order-confirmation",
          "/order-confirmation/",
          "/track-order",
          "/track-order/",
          "/admin/",
          "/recover",
          "/recover/",
          // Builder configurator state — endless URL variations with same content
          "/builder?",
          // Shopify-style faceted nav / variant params (legacy crawl traps)
          "/*?sort_by=",
          "/*?filter*",
          "/*?variant=",
          "/*?typeofshade=",
          "/*&sort_by=",
          "/*&filter*",
          // Atom feeds Google can't index
          "/*.atom$",
        ],
      },
    ],
    sitemap: `https://${SITE.domain}/sitemap.xml`,
  };
}
