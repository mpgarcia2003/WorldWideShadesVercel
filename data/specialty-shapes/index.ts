import type { ShapeData } from "./types";
import { PENTAGON_DATA } from "./pentagon";
import { TRAPEZOID_DATA } from "./trapezoid";
import { TRIANGLE_DATA } from "./triangle";
import { HEXAGON_DATA } from "./hexagon";
import { ARCH_DATA } from "./arch";
import { SKYLIGHT_DATA } from "./skylight";

/**
 * Specialty shape data registry
 * ───────────────────────────────────────────────────────────────────────────
 * Single source of truth for which shapes have dedicated pages and what data
 * each page renders. The dynamic route at `app/specialty-shapes/[shape]/page.tsx`
 * uses this for `generateStaticParams` (build-time route generation) and for
 * looking up the data for each page.
 *
 * To add a new shape page later:
 *   1. Create `data/specialty-shapes/{shape}.ts` with {SHAPE}_DATA conforming
 *      to ShapeData
 *   2. Import it here and add to SHAPES_REGISTRY
 *   3. (Sitemap auto-updates via SHAPE_SLUGS — no further config required)
 *   4. (Dynamic route auto-builds the new shape — no further config required)
 *   5. Update the relatedShapes arrays in existing shape data files to include
 *      the new shape with hasPage: true
 *   6. Update parent `app/specialty-shapes/page.tsx` shape-card link if there's
 *      a card for the new shape that previously pointed to /builder
 *   7. Update `next.config.ts` redirects pointing at /specialty-shapes to
 *      /specialty-shapes/{shape} where appropriate
 */
export const SHAPES_REGISTRY: Record<string, ShapeData> = {
  pentagon: PENTAGON_DATA,
  trapezoid: TRAPEZOID_DATA,
  triangle: TRIANGLE_DATA,
  hexagon: HEXAGON_DATA,
  arch: ARCH_DATA,
  skylight: SKYLIGHT_DATA,
};

/** All shape slugs that have dedicated pages. Used by generateStaticParams. */
export const SHAPE_SLUGS = Object.keys(SHAPES_REGISTRY);

/** Lookup by slug. Returns null if no page exists for the slug. */
export function getShapeData(slug: string): ShapeData | null {
  return SHAPES_REGISTRY[slug] ?? null;
}
