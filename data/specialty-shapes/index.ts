import type { ShapeData } from "./types";
import { PENTAGON_DATA } from "./pentagon";
import { TRAPEZOID_DATA } from "./trapezoid";
import { TRIANGLE_DATA } from "./triangle";

/**
 * Specialty shape data registry
 * ───────────────────────────────────────────────────────────────────────────
 * Single source of truth for which shapes have dedicated pages and what data
 * each page renders. The dynamic route at `app/specialty-shapes/[shape]/page.tsx`
 * uses this for `generateStaticParams` (build-time route generation) and for
 * looking up the data for each page.
 *
 * To add a new shape page (e.g. hexagon in Session 3):
 *   1. Create `data/specialty-shapes/hexagon.ts` with HEXAGON_DATA conforming
 *      to ShapeData
 *   2. Import it here and add to SHAPES_REGISTRY
 *   3. Update the relatedShapes arrays in existing shape data files to set
 *      hasPage: true for hexagon
 *   4. Update parent `app/specialty-shapes/page.tsx` shape-card link to
 *      /specialty-shapes/hexagon
 *   5. Update `app/sitemap.ts` to include the new URL
 *   6. Update `next.config.ts` redirects pointing at /specialty-shapes to
 *      /specialty-shapes/hexagon if appropriate
 *
 * The dynamic [shape] page will automatically be statically generated for any
 * slug present in this registry — no further routing config needed.
 */
export const SHAPES_REGISTRY: Record<string, ShapeData> = {
  pentagon: PENTAGON_DATA,
  trapezoid: TRAPEZOID_DATA,
  triangle: TRIANGLE_DATA,
};

/** All shape slugs that have dedicated pages. Used by generateStaticParams. */
export const SHAPE_SLUGS = Object.keys(SHAPES_REGISTRY);

/** Lookup by slug. Returns null if no page exists for the slug. */
export function getShapeData(slug: string): ShapeData | null {
  return SHAPES_REGISTRY[slug] ?? null;
}
