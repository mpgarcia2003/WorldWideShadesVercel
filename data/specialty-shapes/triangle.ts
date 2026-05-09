import type { ShapeData } from "./types";

/**
 * Triangle shade page data
 * ───────────────────────────────────────────────────────────────────────────
 * SEO target: "triangle shades", "triangle window shades", "A-frame window
 * shades", "gable window shades", "triangular window blinds", "right triangle
 * window shades".
 *
 * Search context: triangle window queries are dominated by frustrated A-frame
 * homeowners who've been told no by every local company. The 4 audit-named
 * Shopify blog URLs around triangle/trapezoid currently route to
 * /blog/arched-window-shade-solutions as a placeholder; once this page deploys,
 * triangle-specific redirects can land here. Triangles are widely searched as
 * "I have an A-frame and nobody will cover my windows" — high commercial intent.
 */
export const TRIANGLE_DATA: ShapeData = {
  slug: "triangle",
  shapeName: "Triangle",
  shapeNamePlural: "Triangles",

  meta: {
    title: "Custom Triangle Window Shades — From $1,950",
    description:
      "Custom shades for triangle windows. A-frames, gable peaks, vaulted ceilings — the windows other companies refuse. Proprietary precision cutting, 700+ fabrics.",
    ogImage:
      "https://res.cloudinary.com/dcmlcfynd/image/upload/c_fill,w_1200,h_630,g_auto/v1764895721/Acute_Triangle_tlw47x.png",
  },

  hero: {
    h1: "Custom Triangle Window Shades",
    subhead:
      "If you have triangle windows and four local companies have already told you no, you're in the right place. We build custom shades for right triangles, acute triangles, and gable peaks — the most-refused shape in the industry. Made in USA, ships in 7–10 days.",
    badge: "Triangle · Right & Acute · Custom-Fit",
    backgroundImage:
      "https://worldwideshades.com/cdn/shop/files/ChatGPT_Image_Jan_23_2026_08_18_14_PM.png?v=1769217506",
    shapeIconUrl:
      "https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895721/Acute_Triangle_tlw47x.png",
  },

  stats: [
    { value: "3 Variants", label: "Right L, Right R, Acute" },
    { value: "From $1,950", label: "Triangle Pricing" },
    { value: "700+", label: "Fabric Options" },
    { value: "7–10 Days", label: "Ships from USA" },
  ],

  whereFound: {
    headline: "Where Triangle Windows Show Up",
    intro:
      "Triangle windows are the architectural feature people fall in love with at first sight and curse every morning when the sun comes up. They're the defining detail of A-frame homes, the dramatic peak of any gable, and the reason mountain-modern architecture exists.",
    contexts: [
      {
        title: "A-Frame Homes & Ski Chalets",
        description:
          "Triangle windows ARE A-frame architecture. The entire front wall is typically a single massive triangle, sometimes with rectangular and trapezoidal pieces below. They flood the space with light and views — and turn the home into a greenhouse if uncovered.",
      },
      {
        title: "Gable-Peak & Cathedral Ceilings",
        description:
          "Almost any home with a vaulted ceiling has a triangle window where the gable peaks. Common in colonial revivals, contemporary craftsman homes, modern farmhouses, and homes built around 'great room' floor plans.",
      },
      {
        title: "Mountain-Modern Architecture",
        description:
          "Mountain homes from Colorado to the Pacific Northwest use stacked triangles, double-triangles, and triangle-over-rectangle compositions to capture mountain views. The result is glazing that's beautiful but absolutely impossible to cover with off-the-shelf solutions.",
      },
      {
        title: "Loft Conversions & Vaulted Spaces",
        description:
          "Converted lofts, refurbished barns, and modern vaulted ceilings frequently use triangle clerestory windows above standard windows. Beautiful for daylight; brutal for sleep, glare, and afternoon heat.",
      },
    ],
  },

  problem: {
    headline: "Why Triangle Windows Are the Most-Refused Shape",
    intro:
      "Of all the specialty shapes, triangles get refused most often. Here's why most companies won't take the job.",
    points: [
      {
        title: "Two angled cuts in a single shade",
        body: "A triangle requires precise angle cuts on two sides simultaneously, meeting at a sharp apex. Most fabricators have equipment built for one straight cut at a time. Doing two angled cuts that meet cleanly at a point is genuinely difficult without specialty equipment, and a 1° error leaves a visible gap.",
      },
      {
        title: "Triangle shades are mostly fixed-panel by necessity",
        body: "Pure triangles can't roll up — there's no rectangular section for the fabric to wind around. That means triangle shades are typically built as fixed (non-operable) light-blocking panels, and most shade companies define themselves by operable shades. They genuinely don't know how to fabricate non-operable shaped panels.",
      },
      {
        title: "Each triangle is a custom template",
        body: "There's no standard A-frame size and no standard gable peak. Every triangle window is its own template with its own apex angle and base measurements. For volume-driven shade companies that profit on standardized rectangles, custom templating makes triangles genuinely unprofitable.",
      },
      {
        title: "Showroom pricing is openly punitive",
        body: "Local showrooms that do quote triangles routinely come in at $5,000–$10,000 per window. The pricing isn't entirely unreasonable given the complexity — but it's also a signal that the showroom doesn't actually want the job. They quote high enough to make most customers walk.",
      },
    ],
  },

  solution: {
    headline: "How We Build Triangle Shades",
    intro:
      "Triangles are one of the three most common specialty shapes we make. After a decade of fabricating nothing but specialty shapes, here's what makes triangles routine for us.",
    points: [
      {
        title: "Two-angle precision cutting in a single pass",
        body: "Our cutting equipment handles compound angle cuts as a routine operation. Both angled sides of your triangle are cut in a single pass with the apex point landing exactly where it should — no manual repositioning, no rounding errors. The result is a triangle shade that fits flush on all three sides.",
      },
      {
        title: "Three triangle variants, all standard",
        body: "Right triangle (left): 90° angle at bottom-left, slopes up to the right. Right triangle (right): 90° angle at bottom-right, slopes up to the left. Acute/equilateral triangle: centered apex with two equal sloped sides — the classic A-frame and gable shape. We make all three weekly.",
      },
      {
        title: "Fixed-panel triangle shades, designed for the shape",
        body: "Triangle shades are built as fixed light-blocking panels — they don't roll up, but they're also not removable. They sit permanently in your triangle window, providing full light control, UV protection, and energy efficiency at the same opacity as your fabric choice. For motorization, see the FAQ below — we have an answer.",
      },
      {
        title: "All 700+ fabrics, no shape exclusions",
        body: "Triangle shades use the full fabric catalog. A-frames typically pair best with light-filtering fabric in warm whites or linen tones (preserves the dramatic vibe while killing solar heat gain). Bedroom triangles want blackout. Order free swatches to compare in your space before deciding.",
      },
    ],
  },

  pricing: {
    headline: "Triangle Shade Pricing",
    intro:
      "Triangle shades are priced on overall fabric area — same logic as rectangles. There's a small surcharge for the two-angle cut, but no separate \"specialty shape\" tax. Showrooms typically quote $5,000–$10,000 for the same triangle.",
    startingPrice: "From $1,950",
    examples: [
      {
        dimensions: 'Small gable triangle — 36" base × 36" apex height',
        fabric: "Standard light-filtering, fixed panel",
        price: "$1,950",
      },
      {
        dimensions: 'Standard A-frame triangle — 60" base × 60" apex height',
        fabric: "Premium light-filtering, fixed panel",
        price: "$2,850",
      },
      {
        dimensions: 'Large triangle — 96" base × 96" apex height',
        fabric: "Premium blackout, fixed panel",
        price: "$4,250",
      },
    ],
    note: "All prices include free shipping, hardware, custom precision cutting, and our 100% Fit Guarantee. Final price depends on dimensions and fabric — start with our builder for an instant quote.",
  },

  measuring: {
    headline: "How to Measure a Triangle Window",
    intro:
      "Triangle measurements are simpler than they look — three numbers if your triangle is symmetric (acute / equilateral), four if it's a right triangle. A standard tape measure and 10 minutes is all you need.",
    steps: [
      {
        number: 1,
        title: "Measure the base width",
        body: "The base is the horizontal bottom edge of your triangle. Measure it horizontally to the nearest ⅛ inch. This is the longest dimension on most triangle windows.",
      },
      {
        number: 2,
        title: "Measure the apex height",
        body: "The height from the base up to the apex (top point). Measure straight up vertically — for asymmetric (right) triangles, measure straight up from the right-angle corner.",
      },
      {
        number: 3,
        title: "Identify your triangle type",
        body: "Right triangle (left): 90° angle at bottom-left, vertical left side. Right triangle (right): 90° angle at bottom-right, vertical right side. Acute / equilateral: centered apex, both sides slope inward equally. Photograph the window straight-on if you're unsure.",
      },
      {
        number: 4,
        title: "Measure each angled side (if asymmetric)",
        body: "For right triangles, the long sloped side has a specific length you should measure separately — apex point to the bottom corner that's NOT the right-angle corner. For acute/equilateral triangles, both sloped sides should be the same length and you can measure just one.",
      },
      {
        number: 5,
        title: "Note the apex angle (or send a photo)",
        body: "Use a phone protractor app on the apex angle, or photograph the window straight-on with a tape measure visible for scale. Our team can derive the apex angle from a clean photo.",
      },
      {
        number: 6,
        title: "Measure mounting depth",
        body: "Triangle shades mount with custom brackets sized to your window. Measure the depth of the window frame for inside mounts, or the wall clearance for outside mounts. Send photos of the window frame and surrounding wall — we'll spec the right hardware for your install.",
      },
    ],
    callout:
      "Triangle measurements are the most important to get right because the apex point has zero margin for error. Send your measurements through our builder or contact form, and our specialty-shape team will review every dimension before fabric is cut.",
  },

  gallery: {
    headline: "Real Triangle Installations",
    intro:
      "Triangle shades we've shipped to homeowners with A-frames, gable peaks, and cathedral ceilings.",
    images: [
      {
        src: "https://worldwideshades.com/cdn/shop/files/ChatGPT_Image_Jan_23_2026_08_18_14_PM.png?v=1769217506",
        alt: "Triangle window shades in A-frame home",
        caption: "Triangle — A-Frame Home",
      },
      {
        src: "https://worldwideshades.com/cdn/shop/files/4baccbb8-1c69-4698-bac3-bf3aae0e70c6.png?v=1768669731",
        alt: "Triangle window shade in loft living room",
        caption: "Triangle — Loft Living Room",
      },
      {
        src: "https://worldwideshades.com/cdn/shop/files/hf_20260126_234144_fa5ee37d-7488-4583-ad24-ebde7ab301ef.png?v=1769473636",
        alt: "Triangle gable shade in cathedral ceiling",
        caption: "Triangle — Cathedral Gable Peak",
      },
      {
        src: "https://worldwideshades.com/cdn/shop/files/hf_20260127_003205_346d99ed-417d-4e16-9a2a-706f84bc8f67.png?v=1769474007",
        alt: "Triangle shade in mountain-modern living room",
        caption: "Triangle — Mountain-Modern",
      },
    ],
  },

  faqs: [
    {
      q: "Can you really make custom shades for triangle windows?",
      a: "Yes. Triangle shades are one of our three most common specialty shapes — we manufacture them weekly using proprietary two-angle cutting equipment. Most triangle shade orders ship within 7–10 business days from the day we confirm your measurements.",
    },
    {
      q: "Do triangle shades open and close?",
      a: "Most triangle shades are fixed (non-operable) panels — pure triangles physically can't roll up because there's no rectangular section for the fabric to wind around. The fabric itself provides full light control, UV protection, and energy efficiency at your chosen opacity. If your 'triangle' is actually a triangle stacked on top of a rectangle, the rectangular portion below is operable as a normal roller shade — see our trapezoid page for that configuration.",
    },
    {
      q: "How much do triangle window shades cost?",
      a: "Triangle shades start at $1,950 for smaller gable peaks and range up to roughly $5,000 for large A-frame triangles with premium blackout fabric. Local showrooms typically quote $5,000–$10,000 for the same triangles. Our pricing is based on fabric area plus a small surcharge for the two-angle cut.",
    },
    {
      q: "What if my triangle isn't a standard right or acute shape?",
      a: "We build to spec. If your triangle has unusual angles (scalene triangles with three different angles, irregular gables, etc.), send measurements and a straight-on photo and our team will quote it. We've done thousands of triangles — we've seen most variations.",
    },
    {
      q: "Can triangle shades be motorized?",
      a: "Most pure triangle shades are fixed panels and don't motorize. However, if your triangle is part of a stacked configuration (triangle on top, rectangle below), the rectangle below can be motorized while the triangle remains fixed. We also offer custom motorized roller systems for some triangle configurations on request — contact us with your specific window for a quote.",
    },
    {
      q: "Do triangle shades block light effectively?",
      a: "Yes. The fabric blocks light at the same opacity as our standard roller shades — blackout fabrics block 100% of light, light filtering diffuses it, solar fabrics block UV while allowing visibility. Our triangle shades are precision-cut to match your window angles, sitting flush against the frame with no visible gaps. For maximum blackout on bedroom triangles, we offer optional side-edge sealing.",
    },
    {
      q: "Can a triangle shade be removed for cleaning?",
      a: "Yes. Triangle shades use a magnetic or clip-mount system that lets you remove the fabric panel for cleaning while keeping the frame and brackets installed. Most homeowners clean them once or twice a year with a damp cloth or mild soap solution.",
    },
    {
      q: "What if my triangle window is huge — can you still make a shade?",
      a: "Yes. We've built triangle shades up to roughly 144 inches (12 feet) on the longest side. For very large triangles (think double-height A-frame fronts), we can split the triangle into two or three coordinated panels with hidden seams for a continuous look. Send your dimensions and we'll spec the right approach.",
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
      slug: "hexagon",
      name: "Hexagon Shades",
      description: "Six-sided shades for decorative & accent windows.",
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
    headline: "Finally Cover Your Triangle Windows",
    subhead:
      "If you've spent years staring at bare triangle glass because nobody would build a shade, that's exactly the problem we exist to solve. Get a quote in under 5 minutes.",
  },

  jsonLd: {
    lowPrice: 1950,
    highPrice: 5000,
  },
};
