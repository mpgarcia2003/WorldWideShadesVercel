import { NextRequest, NextResponse } from "next/server";

/**
 * Server-Side Cookie Mirroring Middleware
 * =======================================
 * Extends Google Ads and GA4 attribution on Safari/iOS beyond ITP's 7-day limit.
 *
 * Problem: Safari ITP caps JavaScript-set cookies at 7 days. The Conversion Linker
 * (GTM) and GA4 (gtag.js) set _gcl_aw and _ga via JavaScript, so on Safari they
 * expire after 7 days. Users who click an ad and return after 8+ days lose attribution.
 *
 * Solution: This middleware creates server-set "shadow" cookies (_wws_gcl, _wws_ga)
 * via HTTP Set-Cookie headers, which Safari honors for their full lifetime (90 days / 2 years).
 * When the JS-set originals expire on Safari, the middleware restores them from the shadows.
 *
 * Flow:
 *   Day 1: User clicks ad → ?gclid=xxx in URL
 *     → Middleware sets _wws_gcl (server-set, 90 days) ← ITP can't touch this
 *     → Conversion Linker sets _gcl_aw (JS-set, 7 days on Safari)
 *
 *   Day 8+: User returns (Safari deleted _gcl_aw)
 *     → Middleware reads _wws_gcl (still alive!) → restores _gcl_aw via Set-Cookie
 *     → Conversion Linker reads restored _gcl_aw → attributes conversion to original ad click
 *
 * Same pattern for _ga (GA4 client_id) → ensures returning users keep the same
 * GA4 identity across sessions, even on Safari.
 */

const NINETY_DAYS = 90 * 24 * 60 * 60; // seconds
const TWO_YEARS = 730 * 24 * 60 * 60;

const COOKIE_BASE = {
  path: "/",
  sameSite: "lax" as const,
  secure: true,
  // httpOnly: false — GTM/gtag.js must be able to read _gcl_aw and _ga
};

export function middleware(request: NextRequest) {
  const response = NextResponse.next();
  const url = request.nextUrl;

  // ─── 1. GCLID → _gcl_aw (Google Ads attribution) ─────────────────────

  const gclid = url.searchParams.get("gclid");

  if (gclid) {
    // First visit from Google Ad — persist gclid in a server-set shadow cookie.
    // The Conversion Linker will also set _gcl_aw via JavaScript (which ITP caps at 7 days).
    // Our shadow cookie (_wws_gcl) survives the full 90 days because it's server-set.
    const timestamp = Math.floor(Date.now() / 1000);
    response.cookies.set("_wws_gcl", `${timestamp}.${gclid}`, {
      ...COOKIE_BASE,
      maxAge: NINETY_DAYS,
    });
  } else {
    // Return visit (no gclid in URL).
    // Check if _gcl_aw has expired (ITP killed it) but our shadow is still alive.
    const existingGclAw = request.cookies.get("_gcl_aw");
    const savedGcl = request.cookies.get("_wws_gcl");

    if (!existingGclAw?.value && savedGcl?.value) {
      // Safari deleted _gcl_aw after 7 days, but _wws_gcl survives.
      // Restore _gcl_aw so the Conversion Linker can read it.
      const [ts, ...gclidParts] = savedGcl.value.split(".");
      const restoredGclid = gclidParts.join(".");
      if (ts && restoredGclid) {
        response.cookies.set("_gcl_aw", `GCL.${ts}.${restoredGclid}`, {
          ...COOKIE_BASE,
          maxAge: NINETY_DAYS,
        });
      }
    }

    // Keep the shadow cookie alive (refresh expiry on every visit)
    if (savedGcl?.value) {
      response.cookies.set("_wws_gcl", savedGcl.value, {
        ...COOKIE_BASE,
        maxAge: NINETY_DAYS,
      });
    }
  }

  // ─── 2. FBCLID (Meta Ads — future-proofing) ──────────────────────────

  const fbclid = url.searchParams.get("fbclid");
  if (fbclid) {
    response.cookies.set("_wws_fbc", `${Math.floor(Date.now() / 1000)}.${fbclid}`, {
      ...COOKIE_BASE,
      maxAge: NINETY_DAYS,
    });
  } else {
    const savedFbc = request.cookies.get("_wws_fbc");
    if (savedFbc?.value) {
      response.cookies.set("_wws_fbc", savedFbc.value, {
        ...COOKIE_BASE,
        maxAge: NINETY_DAYS,
      });
    }
  }

  // ─── 3. GA4 Client ID (_ga) ───────────────────────────────────────────

  const existingGa = request.cookies.get("_ga");
  const savedGa = request.cookies.get("_wws_ga");

  if (existingGa?.value) {
    // _ga exists — create/refresh our server-set shadow copy
    response.cookies.set("_wws_ga", existingGa.value, {
      ...COOKIE_BASE,
      maxAge: TWO_YEARS,
    });
  } else if (savedGa?.value) {
    // _ga expired (ITP) but shadow survives — restore it so GA4 uses the same client_id
    response.cookies.set("_ga", savedGa.value, {
      ...COOKIE_BASE,
      maxAge: TWO_YEARS,
    });
  }

  // ─── 4. GA4 Container Cookie (_ga_<CONTAINER>) ────────────────────────
  // For G-1RHH50R34P, the container cookie is _ga_1RHH50R34P

  const gaContainer = request.cookies.get("_ga_1RHH50R34P");
  const savedContainer = request.cookies.get("_wws_ga_c");

  if (gaContainer?.value) {
    response.cookies.set("_wws_ga_c", gaContainer.value, {
      ...COOKIE_BASE,
      maxAge: TWO_YEARS,
    });
  } else if (savedContainer?.value) {
    response.cookies.set("_ga_1RHH50R34P", savedContainer.value, {
      ...COOKIE_BASE,
      maxAge: TWO_YEARS,
    });
  }

  // ─── 5. UTM Parameters (for Supabase order attribution) ───────────────
  // Persist first-touch UTMs server-side so they survive across sessions

  const utmSource = url.searchParams.get("utm_source");
  const utmMedium = url.searchParams.get("utm_medium");
  const utmCampaign = url.searchParams.get("utm_campaign");

  if (utmSource) {
    response.cookies.set("_wws_utm", JSON.stringify({
      source: utmSource,
      medium: utmMedium || "",
      campaign: utmCampaign || "",
      term: url.searchParams.get("utm_term") || "",
      content: url.searchParams.get("utm_content") || "",
      ts: Math.floor(Date.now() / 1000),
    }), {
      ...COOKIE_BASE,
      maxAge: NINETY_DAYS,
    });
  } else {
    // Refresh existing UTM cookie on return visits
    const savedUtm = request.cookies.get("_wws_utm");
    if (savedUtm?.value) {
      response.cookies.set("_wws_utm", savedUtm.value, {
        ...COOKIE_BASE,
        maxAge: NINETY_DAYS,
      });
    }
  }

  return response;
}

// Only run on page navigations — skip API routes, static assets, and Next.js internals
export const config = {
  matcher: [
    "/((?!api|_next/static|_next/image|favicon\\.ico|robots\\.txt|sitemap\\.xml|guides|public|.*\\..*).*)",
  ],
};
