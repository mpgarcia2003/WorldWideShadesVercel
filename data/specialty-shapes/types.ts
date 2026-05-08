/**
 * Specialty shape page data model
 * ───────────────────────────────────────────────────────────────────────────
 * Each shape (pentagon, trapezoid, triangle, hexagon, arch, skylight) gets one
 * data file conforming to this interface. The dynamic route at
 * `app/specialty-shapes/[shape]/page.tsx` renders the data into a template.
 *
 * SEO context: these pages exist to capture commercial-intent shape queries
 * ("pentagon shades", "trapezoid window blinds", "custom triangle shade") that
 * were previously bleeding to a generic `/specialty-shapes` landing or, before
 * Week 1, to a Shopify soft-404. Each page targets ~1,500 words minimum so
 * Google treats it as substantive commercial content rather than a thin
 * doorway. Pentagon (highest GSC rank — pos 1.2 historically) gets ~2,000.
 */

export interface ShapeStat {
  value: string;
  label: string;
}

export interface ContextItem {
  title: string;
  description: string;
}

export interface BulletPoint {
  title: string;
  body: string;
}

export interface PricingExample {
  dimensions: string;
  fabric: string;
  price: string;
}

export interface MeasuringStep {
  number: number;
  title: string;
  body: string;
}

export interface GalleryImage {
  src: string;
  alt: string;
  caption: string;
}

export interface FAQ {
  q: string;
  a: string;
}

export interface RelatedShape {
  slug: string;            // "pentagon" | "trapezoid" | "triangle" | "hexagon" | "arch" | "skylight"
  name: string;            // Display name e.g. "Pentagon Shades"
  description: string;     // 1-line teaser
  hasPage: boolean;        // true if /specialty-shapes/{slug} exists; false → link to /specialty-shapes parent
}

export interface ShapeData {
  // ─── Routing & identity ──────────────────────────────────────────────
  slug: string;                    // "pentagon"
  shapeName: string;               // "Pentagon"
  shapeNamePlural: string;         // "Pentagons"

  // ─── SEO ─────────────────────────────────────────────────────────────
  meta: {
    title: string;                 // <title> — keep < 60 chars where possible
    description: string;           // <meta description> — 140-160 chars sweet spot
    ogImage: string;               // OpenGraph image URL (1200x630)
  };

  // ─── Hero section ────────────────────────────────────────────────────
  hero: {
    h1: string;                    // "Custom Pentagon Window Shades"
    subhead: string;               // 2-line subhead, must include shape name + key value prop
    badge: string;                 // Eyebrow text above H1
    backgroundImage: string;       // Hero bg image URL
    shapeIconUrl?: string;         // Optional small inline visual (e.g. Cloudinary shape icon)
  };

  // ─── Stats bar (always exactly 4) ────────────────────────────────────
  stats: ShapeStat[];

  // ─── "Where you'll find this shape" architectural context ─────────────
  whereFound: {
    headline: string;
    intro: string;
    contexts: ContextItem[];       // 3-4 architectural contexts
  };

  // ─── "The {shape} problem" - why most companies refuse ────────────────
  problem: {
    headline: string;
    intro: string;
    points: BulletPoint[];         // 3-4 problem points
  };

  // ─── "How we build {shape} shades" - solution / our differentiator ────
  solution: {
    headline: string;
    intro: string;
    points: BulletPoint[];         // 3-4 solution points
  };

  // ─── Transparent pricing ─────────────────────────────────────────────
  pricing: {
    headline: string;
    intro: string;
    startingPrice: string;         // "$1,950"
    examples: PricingExample[];    // 2-3 representative examples
    note: string;                  // Disclaimer line (e.g. "Final price depends on size & fabric")
  };

  // ─── How to measure (mini-guide) ─────────────────────────────────────
  measuring: {
    headline: string;
    intro: string;
    steps: MeasuringStep[];        // 4-6 steps
    callout: string;               // 1 line "we'll review your measurements before cutting" reassurance
  };

  // ─── Real installation gallery (optional - not all shapes have photos) ─
  gallery?: {
    headline: string;
    intro: string;
    images: GalleryImage[];
  };

  // ─── Shape-specific FAQs (5-8) ───────────────────────────────────────
  faqs: FAQ[];

  // ─── Related shapes navigation (internal linking) ─────────────────────
  relatedShapes: RelatedShape[];

  // ─── Final CTA section ───────────────────────────────────────────────
  finalCta: {
    headline: string;
    subhead: string;
  };

  // ─── JSON-LD Product schema pricing range ────────────────────────────
  jsonLd: {
    lowPrice: number;
    highPrice: number;
  };
}
