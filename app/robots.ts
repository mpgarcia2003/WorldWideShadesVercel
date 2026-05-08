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
 */
export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          // User-state — never indexable
          "/api/",
          "/account/",
          "/checkout/",
          "/cart/",
          "/order-confirmation/",
          "/track-order/",
          "/admin/",
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
