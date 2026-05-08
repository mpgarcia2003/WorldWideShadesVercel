import type { ShapeData } from "./types";

/**
 * Pentagon shade page data
 * ───────────────────────────────────────────────────────────────────────────
 * SEO target: "pentagon shades", "pentagon window shades", "custom pentagon
 * blinds", "5-sided window shades", "pentagon window treatments".
 *
 * Historical rank: position 1.2 on `/pages/pentagon-shades` (legacy Shopify URL,
 * 1,270 monthly impressions per Perplexity audit 2026-05-08). Week 1 redirected
 * that URL to /specialty-shapes (generic). Week 2 (this page) gives Google a
 * shape-specific destination so the position 1.2 ranking actually translates
 * to clicks at the original CTR rate (was bleeding to soft-404).
 *
 * Word count target: 2,000+ to demonstrate substantive commercial intent.
 * Content priorities: technical credibility (cutting equipment, measuring),
 * problem framing ("most companies say no"), and pricing transparency
 * ($1,950 starting — significantly under showroom $5K+ for the same shape).
 */
export const PENTAGON_DATA: ShapeData = {
  slug: "pentagon",
  shapeName: "Pentagon",
  shapeNamePlural: "Pentagons",

  meta: {
    title: "Custom Pentagon Window Shades — From $1,950 | World Wide Shades",
    description:
      "Custom shades for pentagon windows. The 5-sided windows other companies refuse. Proprietary precision cutting, 700+ fabrics, made in USA. Ships in 7–10 days.",
    ogImage:
      "https://res.cloudinary.com/dcmlcfynd/image/upload/c_fill,w_1200,h_630,g_auto/v1764895717/Pentagon_cmdrjj.png",
  },

  hero: {
    h1: "Custom Pentagon Window Shades",
    subhead:
      "Five-sided windows are the windows local companies turn away. We don't. Proprietary cutting equipment, a decade of specialty-shape expertise, and 700+ premium fabrics — built to fit your exact pentagon down to ⅛ inch.",
    badge: "Pentagon · 5-Sided · Custom-Fit",
    backgroundImage:
      "https://images.contentstack.io/v3/assets/bltf589e66bcaecd79c/blt309cabd1e83ad611/65c66807f48bc2389d50e43b/social-window-wall-triangle-windows.jpg",
    shapeIconUrl:
      "https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895717/Pentagon_cmdrjj.png",
  },

  stats: [
    { value: "5", label: "Sides Custom-Cut" },
    { value: "From $1,950", label: "Pentagon Pricing" },
    { value: "700+", label: "Fabric Options" },
    { value: "7–10 Days", label: "Ships from USA" },
  ],

  whereFound: {
    headline: "Where Pentagon Windows Show Up",
    intro:
      "Pentagon windows aren't accidental — architects use them deliberately to add character to spaces that would otherwise feel boxy. They're far more common than most homeowners realize, and almost always end up bare for years because nobody can figure out how to cover them.",
    contexts: [
      {
        title: "Front-Entry Sidelights",
        description:
          "Tall, narrow pentagon sidelights flanking a front door are a hallmark of mid-century, Tudor, and contemporary craftsman homes. They flood the foyer with light — and let everyone outside see straight in.",
      },
      {
        title: "Gable & Roof Peaks",
        description:
          "Pentagon-topped windows in vaulted gable ends are common in colonial revivals, A-frames with central peaks, and homes with prominent roof angles. Stunning architecturally, impossible to cover with anything off the shelf.",
      },
      {
        title: "Stairway & Loft Accent Windows",
        description:
          "Decorative pentagons at stairway landings or loft transitions are popular in Mediterranean, Spanish revival, and modern homes designed around natural light. Often paired with tall windows below for dramatic effect.",
      },
      {
        title: "Modern Architectural Glazing",
        description:
          "Custom-built and architect-designed homes increasingly use pentagons in great rooms, primary bedrooms with cathedral ceilings, and home offices to break up large window walls and create visual interest.",
      },
    ],
  },

  problem: {
    headline: "Why Local Companies Refuse Pentagon Windows",
    intro:
      "If you've called a few window-treatment companies and gotten polite no's, you're not crazy. Here's what's actually happening behind the scenes.",
    points: [
      {
        title: "Standard equipment can't cut 5-sided shapes",
        body: "Most shade fabricators use straight-cut tables built for rectangles. Pentagons require precision angle cuts at the apex and both upper sides — three different angles on a single shade. Without specialty equipment, the only option is to outsource (which most shops won't do) or refuse the job.",
      },
      {
        title: "The math is genuinely difficult",
        body: "A pentagon window has 5 sides, 5 angles, and 5 measurements that all have to match. Get one angle wrong and the entire shade is scrap. Most fabricators don't have the templating software or the experienced installers to handle that risk on a single-window order.",
      },
      {
        title: "Showrooms quote $5,000+ to discourage you",
        body: "When a traditional showroom does take the job, they price it as a custom millwork project — $5,000 to $8,000 per window is typical. The pricing is partly real complexity, partly absorbing the risk of a bad cut, and partly just a way to send tire-kickers elsewhere.",
      },
      {
        title: "Lead times stretch to 8–12 weeks",
        body: "Even when a local shop says yes, expect to wait 2–3 months. Specialty shapes are batched into low-priority production runs because they're not the bread-and-butter rectangles that pay the bills. Your pentagons sit bare until the rush season ends.",
      },
    ],
  },

  solution: {
    headline: "How We Make Pentagon Shades Work",
    intro:
      "We invested in proprietary cutting equipment specifically because nobody else would. After a decade of doing nothing but specialty shapes, here's what makes pentagon shades a routine job for us.",
    points: [
      {
        title: "Multi-axis precision cutting",
        body: "Our cutting tables handle compound angles in a single pass — no manual repositioning, no human rounding errors. The result is a pentagon shade where every edge is true to your measurements within ⅛ inch, fabric direction maintained across all 5 sides.",
      },
      {
        title: "Dimensional verification before cutting",
        body: "Every pentagon order goes through a manual measurement review by our team before fabric is touched. We sanity-check angle math against your width and height entries, flag anything that looks like a mis-measure, and reach out before we cut. This is why our remake rate on pentagons is under 2%.",
      },
      {
        title: "All 700+ fabrics, no shape exclusions",
        body: "Some fabricators offer specialty shapes only in a limited handful of fabrics — usually the easiest to cut. We offer the full catalog: blackout, light filtering, solar, all 6 textile mills (Phifer, Texstyle, Mermet, Ferrari, Senbesta, Copaco). Your pentagon doesn't compromise the fabric choice.",
      },
      {
        title: "Made in USA, ships in 7–10 days",
        body: "Pentagon orders go into our regular production queue alongside rectangles. There's no specialty-shape penalty on lead time. Most pentagons ship within 7–10 business days from the day we confirm your measurements.",
      },
    ],
  },

  pricing: {
    headline: "Pentagon Shade Pricing",
    intro:
      "Pentagons are priced based on overall fabric area and finished perimeter — not on \"specialty shape complexity surcharges.\" That means a small decorative pentagon costs less than a large gable-peak pentagon, the way it should.",
    startingPrice: "From $1,950",
    examples: [
      {
        dimensions: 'Small pentagon — 36" × 48"',
        fabric: "Standard light-filtering, manual lift",
        price: "$1,950",
      },
      {
        dimensions: 'Standard pentagon — 48" × 60"',
        fabric: "Premium blackout fabric, manual lift",
        price: "$2,650",
      },
      {
        dimensions: 'Large gable pentagon — 60" × 84"',
        fabric: "Premium blackout, motorized + remote",
        price: "$3,950",
      },
    ],
    note: "All prices include free shipping, hardware, custom precision cutting, and our 100% Fit Guarantee. Final price depends on exact dimensions and fabric — start with our builder for an instant quote.",
  },

  measuring: {
    headline: "How to Measure a Pentagon Window",
    intro:
      "Pentagon measurements look intimidating but they break down into four data points. Most homeowners can do this in 10 minutes with a metal tape measure and a pencil. We review every set of pentagon measurements before cutting, so don't stress about getting it textbook-perfect on the first try.",
    steps: [
      {
        number: 1,
        title: "Measure the maximum width",
        body: "Find the widest horizontal point of the pentagon — this is usually the bottom edge or a horizontal line where the angled sides meet vertical sides. Record it to the nearest ⅛ inch.",
      },
      {
        number: 2,
        title: "Measure the maximum height",
        body: "From the apex (top point) straight down to the bottom edge. This is your peak-to-base measurement. If the pentagon has flat sides on the lower portion, measure to the bottom of the flat section.",
      },
      {
        number: 3,
        title: "Measure each angled side",
        body: "Most pentagons have two angled sides at the top forming the apex. Measure each one separately from the apex point to where it meets the vertical side. These two measurements are usually but not always equal — don't assume.",
      },
      {
        number: 4,
        title: "Note the apex angle (or send a photo)",
        body: "Use a protractor app on your phone, or simply photograph the pentagon straight-on with a tape measure visible for scale. Our team can derive the apex angle from photos if you'd rather skip the protractor.",
      },
      {
        number: 5,
        title: "Measure mounting depth",
        body: "If you want an inside mount (shade sits inside the window frame), measure how deep the frame is — we need at least 2 inches for the shade tube. For outside mounts, just confirm there's wall space above and on each side for brackets.",
      },
    ],
    callout:
      "Submit your measurements through our builder or contact form, and our specialty-shape team will review every dimension before fabric is cut. We will reach out with questions if anything looks off.",
  },

  gallery: {
    headline: "Real Pentagon Installations",
    intro:
      "These are pentagon shades we've shipped to homeowners who'd been told no by 3+ companies before finding us.",
    images: [
      {
        src: "https://worldwideshades.com/cdn/shop/files/4baccbb8-1c69-4698-bac3-bf3aae0e70c6.png?v=1768669731",
        alt: "Pentagon-topped window shade in a contemporary living room",
        caption: "Pentagon — Contemporary Living Room",
      },
      {
        src: "https://worldwideshades.com/cdn/shop/files/ChatGPT_Image_Jan_23_2026_08_18_14_PM.png?v=1769217506",
        alt: "Pentagon window shade in A-frame home gable peak",
        caption: "Pentagon — A-Frame Gable Peak",
      },
      {
        src: "https://worldwideshades.com/cdn/shop/files/hf_20260126_234144_fa5ee37d-7488-4583-ad24-ebde7ab301ef.png?v=1769473636",
        alt: "Pentagon shade in cathedral-ceiling great room",
        caption: "Pentagon — Cathedral Great Room",
      },
      {
        src: "https://worldwideshades.com/cdn/shop/files/hf_20260127_003205_346d99ed-417d-4e16-9a2a-706f84bc8f67.png?v=1769474007",
        alt: "Pentagon sidelight shade beside a front entry",
        caption: "Pentagon — Front Entry Sidelight",
      },
    ],
  },

  faqs: [
    {
      q: "Can you really make custom shades for pentagon windows?",
      a: "Yes. Pentagon shades are one of our standard specialty offerings — we manufacture them weekly using proprietary multi-axis cutting equipment. The full process from order to delivery is typically 7–10 business days, the same as our rectangular shades.",
    },
    {
      q: "How much do pentagon window shades cost?",
      a: "Pentagon shades start at $1,950 for smaller decorative pentagons and range up to roughly $4,500 for large gable-peak pentagons with premium blackout fabric and motorization. Pricing is based on fabric area and shape perimeter — not on specialty complexity surcharges. Local showrooms typically quote $5,000–$8,000 for the same window.",
    },
    {
      q: "Can a pentagon shade actually open and close?",
      a: "Pentagon shades operate as a single unit that opens and closes vertically along the lower rectangular portion. The angled top section remains stationary as a fixed piece. This is the standard way pentagon shades work, and it provides full light control on the operable portion while preserving the architectural detail of the apex.",
    },
    {
      q: "Will the angled portion at the top show light gaps?",
      a: "Not when properly measured and installed. Our pentagons are precision-cut to your exact apex and side angles, and the angled section sits flush against the window frame with no visible gaps. For maximum blackout, we offer optional side channels that eliminate any micro-gaps along the vertical edges.",
    },
    {
      q: "Can pentagon shades be motorized?",
      a: "Yes. Motorization is available on pentagon shades for an additional $250+ depending on configuration. Our rechargeable battery motors are compatible with Alexa, Google Home, Apple HomeKit, SmartThings, and Matter. We strongly recommend motorization for pentagon shades that are out of easy reach (gable peaks, vaulted ceilings).",
    },
    {
      q: "What if I measure my pentagon wrong?",
      a: "We back every shade with a 100% Fit Guarantee. If your shade doesn't fit per our measurement guide, we remake it at no charge. Our team also reviews every pentagon measurement before fabric is cut and will reach out if anything looks off, so most measurement issues are caught before production.",
    },
    {
      q: "How do I know which fabric works best for a pentagon window?",
      a: "Same logic as any other window: blackout for bedrooms, media rooms, and any pentagon you want to fully darken. Light filtering for living rooms, sidelights, and decorative pentagons where you want soft diffused light and daytime privacy. Order up to 10 free fabric swatches to compare in your actual space before deciding.",
    },
    {
      q: "Do you ship pentagon shades nationwide?",
      a: "Yes. We ship pentagon shades to all 50 US states via FedEx, free of charge. Pentagon shades over 60 inches in any direction ship in protective tubes to prevent damage in transit. Most US addresses receive their shipment within 3–5 business days of dispatch.",
    },
  ],

  relatedShapes: [
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
      slug: "hexagon",
      name: "Hexagon Shades",
      description: "Six-sided shades for decorative & accent windows.",
      hasPage: false,
    },
    {
      slug: "arch",
      name: "Arch Shades",
      description: "Half-moon, quarter-round, and full arches.",
      hasPage: false,
    },
    {
      slug: "skylight",
      name: "Skylight Shades",
      description: "Overhead and angled skylight shade systems.",
      hasPage: false,
    },
  ],

  finalCta: {
    headline: "Stop Living With Bare Pentagon Windows",
    subhead:
      "Most homeowners with pentagon windows have lived with them uncovered for years because nobody would build a shade for them. That's the problem we fix. Get a quote in under 5 minutes.",
  },

  jsonLd: {
    lowPrice: 1950,
    highPrice: 4500,
  },
};
