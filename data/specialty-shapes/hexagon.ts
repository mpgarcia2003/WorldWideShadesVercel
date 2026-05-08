import type { ShapeData } from "./types";

/**
 * Hexagon shade page data
 * ───────────────────────────────────────────────────────────────────────────
 * SEO target: "hexagon shades", "hexagon window shades", "6-sided window
 * shades", "hexagonal window blinds", "flat top hexagon shades".
 *
 * Search context: hexagon windows are the rarest of the common specialty
 * shapes — usually decorative accents (bathroom, sidelights, mid-century
 * accents) rather than primary windows. Lower search volume than pentagon,
 * but extremely high commercial intent — anyone searching "hexagon window
 * shades" almost certainly has a hexagon window they need covered. Position
 * 0 in GSC for /pages/hexagon-shades on legacy Shopify URL.
 */
export const HEXAGON_DATA: ShapeData = {
  slug: "hexagon",
  shapeName: "Hexagon",
  shapeNamePlural: "Hexagons",

  meta: {
    title: "Custom Hexagon Window Shades — From $1,950 | World Wide Shades",
    description:
      "Custom shades for hexagon and flat-top hexagon windows. The 6-sided windows other companies refuse. Proprietary precision cutting, 700+ fabrics, made in USA.",
    ogImage:
      "https://res.cloudinary.com/dcmlcfynd/image/upload/c_fill,w_1200,h_630,g_auto/v1764895722/Flat_Top_Hexagon_zlqbx3.png",
  },

  hero: {
    h1: "Custom Hexagon Window Shades",
    subhead:
      "Six-sided windows are uncommon enough that most shade companies have never made one. We make them weekly. Standard hexagon, flat-top hexagon, asymmetric hexagons — all custom-cut to your measurements with proprietary equipment.",
    badge: "Hexagon · 6-Sided · Custom-Fit",
    backgroundImage:
      "https://worldwideshades.com/cdn/shop/files/hf_20260127_003205_346d99ed-417d-4e16-9a2a-706f84bc8f67.png?v=1769474007",
    shapeIconUrl:
      "https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895722/Flat_Top_Hexagon_zlqbx3.png",
  },

  stats: [
    { value: "6", label: "Sides Custom-Cut" },
    { value: "From $1,950", label: "Hexagon Pricing" },
    { value: "700+", label: "Fabric Options" },
    { value: "7–10 Days", label: "Ships from USA" },
  ],

  whereFound: {
    headline: "Where Hexagon Windows Show Up",
    intro:
      "Hexagon windows are deliberate architectural choices — nobody puts a hexagon in by accident. They show up most often as decorative accents in homes designed with character in mind, and they almost always end up bare because nobody can find a shade that fits.",
    contexts: [
      {
        title: "Decorative Bathroom & Powder Room Windows",
        description:
          "Hexagon windows are popular as accent features in primary bathrooms and powder rooms — the privacy of a small high window combined with the visual interest of a non-standard shape. Common in modern, mid-century, and craftsman-style homes.",
      },
      {
        title: "Mid-Century Modern Accent Panels",
        description:
          "Mid-century modern homes from the 1950s–70s often feature hexagon clerestory windows above standard windows or as decorative panels in entryway walls. Restoration and renovation projects bring these back into focus.",
      },
      {
        title: "Loft & Studio Conversions",
        description:
          "Converted lofts and modern studio spaces use hexagon windows to break up large wall areas and add visual rhythm. Common in industrial conversions, modern barn homes, and contemporary urban lofts.",
      },
      {
        title: "Front-Entry Decorative Sidelights",
        description:
          "Tall hexagon sidelights flanking a front door appear in some Mediterranean and contemporary craftsman home designs. They flood the entryway with light and create an immediate architectural statement.",
      },
    ],
  },

  problem: {
    headline: "Why Hexagon Windows Stay Bare",
    intro:
      "Hexagons are the second-rarest of the common specialty shapes (after pentagons) — and most shade companies have simply never figured out how to make them.",
    points: [
      {
        title: "Six precision cuts on a single shade",
        body: "A regular hexagon has six sides, six 120° angles, and six measurements. A flat-top hexagon has four angled cuts plus a flat top and bottom. Either way, that's significantly more cutting precision than the equipment most shade companies own.",
      },
      {
        title: "Hexagons are mostly fixed-panel",
        body: "Pure hexagons can't roll up — there's no rectangular section for the fabric to wind around. Most hexagon shades are built as fixed light-blocking panels. Shade companies that define themselves by operable shades genuinely don't know how to fabricate fixed shaped panels and refuse the job.",
      },
      {
        title: "Showrooms quote $4,000–$7,000 to discourage you",
        body: "When traditional showrooms do quote hexagons, the pricing reflects the complexity plus a substantial \"we don't really want this job\" premium. The result is sticker shock that sends most homeowners away to live with bare windows.",
      },
    ],
  },

  solution: {
    headline: "How We Build Hexagon Shades",
    intro:
      "Hexagons are routine for us. Six cuts is no harder than four cuts when you have the right equipment.",
    points: [
      {
        title: "Multi-axis precision cutting",
        body: "Our cutting equipment handles all six angle cuts in a single pass with the apex points landing exactly where they should. The result is a hexagon shade with every edge true to your measurements within ⅛ inch, fabric direction maintained across all six sides.",
      },
      {
        title: "Two hexagon variants, both standard",
        body: "Regular hexagon (6 equal sides, 120° angles between each) and flat-top hexagon (flat top and bottom edges, 4 angled sides) are both standard variants we make weekly. Asymmetric or irregular hexagons can also be built to spec — send measurements and a photo.",
      },
      {
        title: "Fixed-panel design optimized for shape",
        body: "Hexagon shades are built as fixed light-blocking panels — they don't roll up but they're also not removable. They sit permanently in the window, providing full light control, UV protection, and energy efficiency at the same opacity as your fabric choice. For motorization, see the FAQ below.",
      },
      {
        title: "All 700+ fabrics, no shape exclusions",
        body: "Hexagon shades use the full fabric catalog with no restrictions. Decorative bathroom hexagons typically pair best with light-filtering fabrics for soft diffused light and daytime privacy. Bedroom or media room hexagons want blackout. Order free swatches to compare in your space.",
      },
    ],
  },

  pricing: {
    headline: "Hexagon Shade Pricing",
    intro:
      "Hexagons are priced on overall fabric area plus a small surcharge for the multi-angle cut. Both regular and flat-top hexagons are priced the same — there's no premium for one configuration over the other.",
    startingPrice: "From $1,950",
    examples: [
      {
        dimensions: 'Small decorative hexagon — 24" × 28"',
        fabric: "Standard light-filtering, fixed panel",
        price: "$1,950",
      },
      {
        dimensions: 'Standard hexagon — 36" × 42"',
        fabric: "Premium light-filtering, fixed panel",
        price: "$2,650",
      },
      {
        dimensions: 'Large flat-top hexagon — 60" × 48"',
        fabric: "Premium blackout, fixed panel",
        price: "$3,650",
      },
    ],
    note: "All prices include free shipping, hardware, custom precision cutting, and our 100% Fit Guarantee. Final price depends on dimensions and fabric — start with our builder for an instant quote.",
  },

  measuring: {
    headline: "How to Measure a Hexagon Window",
    intro:
      "Hexagon measurements are simpler than they look. For a regular hexagon you need the maximum width and height. For a flat-top hexagon, you need a few extra dimensions. A standard tape measure and 10 minutes is all you need.",
    steps: [
      {
        number: 1,
        title: "Measure the maximum width",
        body: "The widest horizontal point of the hexagon. For a regular hexagon, this is the distance between the two side-most points. For a flat-top hexagon, this is the bottom (or top — they should match) edge. Record to the nearest ⅛ inch.",
      },
      {
        number: 2,
        title: "Measure the maximum height",
        body: "The tallest vertical dimension, point-to-point or apex-to-base. For a regular hexagon, that's the distance between the top and bottom points. For a flat-top hexagon, it's the distance between the flat top and flat bottom.",
      },
      {
        number: 3,
        title: "Identify your hexagon type",
        body: "Regular hexagon (6 equal sides, points at top and bottom) vs flat-top hexagon (flat top and bottom edges, 4 angled sides). Photograph the window straight-on if you're unsure — our team can identify the variant from a clean photo.",
      },
      {
        number: 4,
        title: "Measure mounting depth",
        body: "Hexagon shades mount with custom brackets sized to your window. Measure the depth of the window frame for inside mounts, or the wall clearance for outside mounts. Send photos of the window frame and surrounding wall — we'll spec the right hardware for your install.",
      },
    ],
    callout:
      "Send your measurements through our builder or contact form. Our specialty-shape team reviews every hexagon order before fabric is cut — we'll reach out if anything looks off.",
  },

  faqs: [
    {
      q: "Can you really make custom shades for hexagon windows?",
      a: "Yes. Hexagon shades are a standard specialty offering — we manufacture them weekly using proprietary multi-axis cutting equipment. Most hexagon shade orders ship within 7–10 business days from the day we confirm your measurements.",
    },
    {
      q: "How much do hexagon window shades cost?",
      a: "Hexagon shades start at $1,950 for smaller decorative hexagons and range up to roughly $4,000 for large flat-top hexagons with premium blackout fabric. Local showrooms typically quote $4,000–$7,000 for the same windows.",
    },
    {
      q: "What's the difference between a regular hexagon and a flat-top hexagon?",
      a: "A regular hexagon has 6 equal sides with points at the top and bottom — the classic honeycomb shape rotated 90°. A flat-top hexagon has a flat top edge, a flat bottom edge, and four angled sides — sometimes called an \"elongated hexagon\" or \"horizontal hexagon.\" We make both variants as standard.",
    },
    {
      q: "Do hexagon shades open and close?",
      a: "Hexagon shades are fixed (non-operable) panels — pure hexagons physically can't roll up because there's no rectangular section for the fabric to wind around. The fabric provides full light control, UV protection, and energy efficiency at your chosen opacity.",
    },
    {
      q: "Can hexagon shades be removed for cleaning?",
      a: "Yes. Hexagon shades use a magnetic or clip-mount system that lets you remove the fabric panel for cleaning while keeping the frame and brackets installed. Most homeowners clean them once or twice a year with a damp cloth or mild soap solution.",
    },
    {
      q: "What if my hexagon isn't a standard regular or flat-top shape?",
      a: "We build to spec. If your hexagon has irregular proportions or unusual angles, send measurements and a straight-on photo and our team will quote it. Asymmetric hexagons are uncommon but not unheard of.",
    },
    {
      q: "Do you ship hexagon shades nationwide?",
      a: "Yes. We ship hexagon shades to all 50 US states via FedEx, free of charge. Hexagon shades over 48 inches in any direction ship in protective tubes to prevent damage in transit.",
    },
  ],

  relatedShapes: [
    {
      slug: "pentagon",
      name: "Pentagon Shades",
      description: "5-sided shades for sidelights & gable peaks.",
      hasPage: true,
    },
    {
      slug: "trapezoid",
      name: "Trapezoid Shades",
      description: "4-sided shades for sloped ceilings and angled tops.",
      hasPage: true,
    },
    {
      slug: "triangle",
      name: "Triangle Shades",
      description: "Right and acute triangle shades for A-frames.",
      hasPage: true,
    },
    {
      slug: "arch",
      name: "Arch Shades",
      description: "Half-moon, quarter-round, and full arches.",
      hasPage: true,
    },
    {
      slug: "skylight",
      name: "Skylight Shades",
      description: "Overhead and angled skylight shade systems.",
      hasPage: true,
    },
  ],

  finalCta: {
    headline: "Cover Your Hexagon Windows",
    subhead:
      "If your decorative hexagon windows have been bare for years because nobody could build a shade for them, that's exactly the problem we exist to solve. Get a quote in under 5 minutes.",
  },

  jsonLd: {
    lowPrice: 1950,
    highPrice: 4000,
  },
};
