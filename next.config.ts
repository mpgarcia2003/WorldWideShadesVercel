import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Map env vars so existing builder code (process.env.API_KEY) works unchanged
  env: {
    API_KEY: process.env.GEMINI_API_KEY || "",
    GEMINI_API_KEY: process.env.GEMINI_API_KEY || "",
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "cdn.shopify.com" },
    ],
  },
  // Suppress warnings for packages that reference Node.js modules in client bundles
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      };
    }
    return config;
  },

  // ===== HTTP HEADERS =====
  async headers() {
    return [
      // Site-wide security headers
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "SAMEORIGIN" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
        ],
      },
      // Tell Google not to index Next.js build artifacts. Without this, Vercel's
      // hash-suffixed asset URLs (e.g. /_next/static/css/xyz.css?dpl=dpl_abc)
      // appear in GSC's "Crawled - currently not indexed" report on every
      // deployment, creating noise that masks real indexation problems. The
      // 2026-05-08 SEO audit found 83 of 119 such URLs were build noise.
      {
        source: "/_next/static/:path*",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
      // Same reason - Next.js's auto-generated favicon route shows up in GSC.
      {
        source: "/icon",
        headers: [{ key: "X-Robots-Tag", value: "noindex" }],
      },
    ];
  },

  // ===== REDIRECTS =====
  // Migration debt cleanup. Before this map existed, every legacy Shopify URL
  // Google had memorized (/pages/* and /blogs/news/*) was rendering the
  // not-found.tsx component with HTTP 200 - a soft-404. The audit found
  // /pages/pentagon-shades (1,270 monthly impressions, position 1.2) was
  // among them, bleeding ~10,000+ recoverable impressions per month.
  //
  // Strategy:
  //   1. Specific 308s where a direct replacement exists
  //   2. Specific 308s to closest available alternate where no exact match exists
  //   3. Catch-all 308s for unmapped slugs (better than 404 - preserves
  //      PageRank flow for backlinks we don't know about)
  //
  // The apex->www 308 is also here so every URL canonicalizes consistently.
  // Vercel domain settings already do an apex->www redirect at the edge but
  // emit a 307 (temporary). 308 (permanent) tells Google "consolidate
  // signals to www permanently" and is honored faster.
  //
  // PATH-TO-REGEXP NOTE: Wildcard parameters like ":slug*" must occupy their
  // OWN URL segment - they cannot be glued to a static prefix within a
  // segment. So "/blogs/news/triangle-:slug*" is INVALID and throws
  // "Can not repeat 'slug' without a prefix and suffix" at build time.
  // Instead, we use exact-match URLs for known specific paths and let the
  // catch-all "/blogs/news/:slug*" handle anything else.
  async redirects() {
    return [
      // ===== Apex -> www (308 permanent) =====
      // Forces canonicalization to www. Without this, sitemap (apex) +
      // canonicals (apex) + actual serving host (www) were all inconsistent,
      // generating "Page with redirect" entries in GSC for every sitemap URL.
      {
        source: "/:path*",
        has: [{ type: "host", value: "worldwideshades.com" }],
        destination: "https://www.worldwideshades.com/:path*",
        permanent: true,
      },

      // ===== Legacy Shopify /pages/* redirects =====
      // Specific maps (in priority order - first match wins).
      // Top-impression URLs from GSC 90-day report.
      { source: "/pages/pentagon-shades", destination: "/specialty-shapes", permanent: true },
      { source: "/pages/hexagon-shades", destination: "/specialty-shapes", permanent: true },
      { source: "/pages/exterior-shades", destination: "/specialty-shapes", permanent: true },
      { source: "/pages/custom-roller-shades", destination: "/blackout-roller-shades", permanent: true },
      { source: "/pages/builder", destination: "/builder", permanent: true },
      { source: "/pages/installation-guide", destination: "/installation-guide", permanent: true },
      { source: "/pages/installation", destination: "/installation-guide", permanent: true },
      { source: "/pages/measuring-guide", destination: "/measuring-guide", permanent: true },
      { source: "/pages/measuring", destination: "/measuring-guide", permanent: true },
      { source: "/pages/faq", destination: "/faq", permanent: true },
      { source: "/pages/contact", destination: "/contact", permanent: true },
      { source: "/pages/contact-us", destination: "/contact", permanent: true },
      { source: "/pages/about", destination: "/", permanent: true },
      { source: "/pages/about-us", destination: "/", permanent: true },
      { source: "/pages/swatches", destination: "/swatches", permanent: true },
      { source: "/pages/free-swatches", destination: "/swatches", permanent: true },
      { source: "/pages/returns", destination: "/returns", permanent: true },
      { source: "/pages/track-order", destination: "/track-order", permanent: true },

      // Old theme/template artifacts. Shopify themes generate test pages with
      // names like "home-page-tester". GSC has been finding these. Send to home.
      { source: "/pages/home-page", destination: "/", permanent: true },
      { source: "/pages/home-page-tester", destination: "/", permanent: true },

      // Catch-all for any /pages/* slug we haven't mapped above. Sends to
      // /specialty-shapes (the most likely match for "custom shape" intent
      // these legacy URLs typically captured). Better than 404 - preserves
      // any backlink equity into a relevant destination.
      // ":slug*" is in its own URL segment here, which path-to-regexp accepts.
      { source: "/pages/:slug*", destination: "/specialty-shapes", permanent: true },

      // ===== Legacy Shopify /blogs/news/* redirects (exact matches) =====
      // High-impression URLs from the audit. These are the specific old
      // Shopify article slugs we know existed. Each maps to the closest
      // /blog/* article we currently have, or to a closely related landing.

      // Triangle / trapezoid / specialty shapes
      // (No /specialty-shapes/[shape] pages built yet - that's Week 2 work.
      // For now we redirect to the arched-window blog post as the closest
      // topical match. When shape pages launch, update these destinations.)
      {
        source: "/blogs/news/top-custom-shades-for-trapezoid-windows-enhance-your-space",
        destination: "/blog/arched-window-shade-solutions",
        permanent: true,
      },
      {
        source: "/blogs/news/the-complete-guide-to-angled-window-shades-solutions-for-triangular-windows",
        destination: "/blog/arched-window-shade-solutions",
        permanent: true,
      },
      {
        source: "/blogs/news/triangle-window-shades-custom-solutions-for-unique-shaped-windows",
        destination: "/blog/arched-window-shade-solutions",
        permanent: true,
      },
      {
        source: "/blogs/news/best-window-shades-for-triangle-windows-find-your-perfect-fit",
        destination: "/blog/arched-window-shade-solutions",
        permanent: true,
      },

      // Skylight
      {
        source: "/blogs/news/in-depth-review-of-skylight-shade-for-skylights",
        destination: "/blog/skylight-shades-guide",
        permanent: true,
      },
      {
        source: "/blogs/news/top-picks-for-the-best-skylight-shades-light-control-style",
        destination: "/blog/skylight-shades-guide",
        permanent: true,
      },

      // Cathedral / sloped ceiling
      {
        source: "/blogs/news/cathedral-ceiling-window-treatments-custom-shades-curtains-amp-smart-options",
        destination: "/blog/shades-for-floor-to-ceiling-windows",
        permanent: true,
      },
      {
        source: "/blogs/news/window-treatments-sloped-ceiling-custom-shade-ideas-amp-solutions",
        destination: "/blog/shades-for-floor-to-ceiling-windows",
        permanent: true,
      },

      // Blackout (highest-impression article in the audit at 2,020/mo)
      {
        source: "/blogs/news/the-best-blackout-window-shades-of-2025-enhance-your-sleep-quality",
        destination: "/blog/best-fabric-blackout-shades",
        permanent: true,
      },

      // Smart / motorized (1,091/mo per audit)
      {
        source: "/blogs/news/smart-shades-alexa-complete-guide-to-voice-controlled-window-treatments",
        destination: "/blog/motorized-shades-alexa-google-home",
        permanent: true,
      },

      // Light filtering
      {
        source: "/blogs/news/top-light-filtering-shades-for-style-and-privacy",
        destination: "/blog/light-filtering-shades-guide",
        permanent: true,
      },

      // Child-safe
      {
        source: "/blogs/news/top-child-safe-window-covering-options-for-families",
        destination: "/blog/child-safe-window-treatments",
        permanent: true,
      },

      // Catch-all - anything else under /blogs/news/* sends to /blog index.
      // ":slug*" is in its own URL segment here, which path-to-regexp accepts.
      // Better than 404 because Google can re-discover relevant content from
      // the index page, and any backlinks aggregate to the blog landing.
      { source: "/blogs/news/:slug*", destination: "/blog", permanent: true },
      { source: "/blogs/news", destination: "/blog", permanent: true },

      // ===== Shopify feed crawl waste =====
      // Atom feeds Google can't index but kept crawling. Send to relevant
      // index pages so any consumer (RSS readers, scrapers) gets something
      // useful instead of 404.
      { source: "/blogs/news.atom", destination: "/blog", permanent: true },
      { source: "/collections/all.atom", destination: "/", permanent: true },

      // ===== Empty product stub =====
      // /products/ with trailing slash - nothing there.
      { source: "/products", destination: "/blackout-roller-shades", permanent: true },
      { source: "/products/", destination: "/blackout-roller-shades", permanent: true },
    ];
  },
};

export default nextConfig;
