import type { ShapeData } from "./types";

/**
 * Trapezoid shade page data
 * ───────────────────────────────────────────────────────────────────────────
 * SEO target: "trapezoid shades", "trapezoid window shades", "angled top
 * window shades", "sloped ceiling window shades", "cathedral ceiling shades",
 * "attic window shades".
 *
 * Search context: trapezoid window queries are heavily commercial
 * ("custom trapezoid blinds", "shade for sloped window") and skew toward
 * homeowners with cathedral ceilings, attic conversions, and A-frame wings —
 * all populations that have typically been told "we don't do that shape" by
 * local retailers. The audit redirect map for trapezoid blog URLs (4 distinct
 * Shopify slugs) currently routes to /blog/arched-window-shade-solutions as
 * a placeholder; once this page deploys, those redirects update to land here.
 */
export const TRAPEZOID_DATA: ShapeData = {
  slug: "trapezoid",
  shapeName: "Trapezoid",
  shapeNamePlural: "Trapezoids",

  meta: {
    title: "Custom Trapezoid Window Shades — From $1,950",
    description:
      "Custom shades for trapezoid windows. The angled-top windows in cathedral ceilings, A-frames, and lofts. Proprietary precision cutting, 700+ fabrics, made in USA.",
    ogImage:
      "https://res.cloudinary.com/dcmlcfynd/image/upload/c_fill,w_1200,h_630,g_auto/v1764895717/Flat_Top_Trapezoid_left_cazqz3.png",
  },

  hero: {
    h1: "Custom Trapezoid Window Shades",
    subhead:
      "Cathedral ceilings, A-frame wings, attic conversions, mid-century lofts — the angled-top windows that make these spaces beautiful are also the ones nobody wants to cover. We do, with proprietary precision cutting and a decade of trapezoid expertise.",
    badge: "Trapezoid · Angled Top · Custom-Fit",
    backgroundImage:
      "https://worldwideshades.com/cdn/shop/files/hf_20260126_234144_fa5ee37d-7488-4583-ad24-ebde7ab301ef.png?v=1769473636",
    shapeIconUrl:
      "https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895717/Flat_Top_Trapezoid_left_cazqz3.png",
  },

  stats: [
    { value: "3 Variants", label: "Left, Right, Flat Top" },
    { value: "From $1,950", label: "Trapezoid Pricing" },
    { value: "700+", label: "Fabric Options" },
    { value: "7–10 Days", label: "Ships from USA" },
  ],

  whereFound: {
    headline: "Where Trapezoid Windows Show Up",
    intro:
      "Trapezoid windows are the calling card of any home with a roofline that isn't flat. They turn dead attic space into a primary bedroom, give cathedral great rooms their drama, and are the entire reason A-frame architecture became iconic — but they're also the windows most homeowners give up on covering.",
    contexts: [
      {
        title: "Cathedral Ceilings & Great Rooms",
        description:
          "Trapezoids are practically standard in any room with a vaulted or cathedral ceiling. The angled top follows the roofline; the flat bottom sits on the rectangular portion. They flood the room with light — and let the morning sun cook your couch by 9am if uncovered.",
      },
      {
        title: "Attic & Loft Conversions",
        description:
          "Converted attics almost always have trapezoid (or pure triangle) windows where the sloped roof meets the wall. Without proper shades, attic-conversion bedrooms become unusable in summer due to heat gain and unusable for sleep due to morning light.",
      },
      {
        title: "A-Frame & Mountain-Modern Homes",
        description:
          "A-frame homes, ski chalets, and mountain-modern designs use stacked trapezoids running up the wing walls. The combination of trapezoids over rectangles is what gives these homes their dramatic glazing — and creates 8+ feet of bare glass with no easy shading solution.",
      },
      {
        title: "Mid-Century & Contemporary Architecture",
        description:
          "Mid-century modern homes from the 1950s–70s often feature trapezoid clerestory windows above standard windows. Contemporary architects love them for the same reason: they break up large window walls and let light pour in from a non-obvious angle.",
      },
    ],
  },

  problem: {
    headline: "Why Most Companies Won't Make Trapezoid Shades",
    intro:
      "Trapezoid windows are the second-most-refused shape in the industry (after triangles). Here's why so many homeowners hear no.",
    points: [
      {
        title: "The angled top requires a beveled cut",
        body: "A trapezoid shade isn't a rectangle with a corner missing — it's a single shaped piece with a precise top angle that has to match your window's slope. Standard fabricators cut at 90° only. Without specialty equipment, the angled cut has to be done by hand, which is slow and error-prone.",
      },
      {
        title: "The shade has to roll past an angled edge",
        body: "On an operable trapezoid, the shade has to lift and lower along the angled top edge without binding or gapping. That requires custom-engineered hardware (specialty roller tubes, angled mounting brackets) that most shade companies don't stock. Many shops will only quote 'fixed' trapezoid panels that don't actually open and close.",
      },
      {
        title: "Each trapezoid needs its own template",
        body: "There's no standard trapezoid size. Every cathedral ceiling and attic conversion has slightly different angles. That means every trapezoid shade is a true one-off — no templating shortcuts, no pre-cut stock. For volume-driven shops, that's not worth their time.",
      },
      {
        title: "Showroom pricing reflects the hassle",
        body: "Local showrooms that do quote trapezoids typically come in at $4,000–$7,000 per window. Some of that is real complexity, some is risk premium, but most of it is the showroom's lack of equipment forcing them to outsource to a specialty fabricator at retail markup.",
      },
    ],
  },

  solution: {
    headline: "How We Build Trapezoid Shades",
    intro:
      "Trapezoids are one of the three most common specialty shapes we make. Our process is purpose-built for them.",
    points: [
      {
        title: "Beveled-edge precision cutting",
        body: "Our cutting tables handle angled edges as a routine operation. The top edge of your trapezoid is cut to your exact slope angle, fabric direction maintained, no hand-finishing required. The result is a clean, true-to-spec edge that sits flush against the window frame.",
      },
      {
        title: "Trapezoid-specific operable hardware",
        body: "We stock angled roller tubes and beveled mounting brackets specifically for trapezoid configurations. That means your trapezoid shade actually opens and closes — the lower rectangular portion lifts, the angled top stays as a permanent fixed-panel section. Same operation as a regular roller shade, just with the upper section permanently in place.",
      },
      {
        title: "Three trapezoid variants, all standard",
        body: "Left-angle (slope rises left to right), right-angle (slope rises right to left), and flat-top (parallel top and bottom but non-parallel sides). All three are routine for us. If your trapezoid has a more unusual configuration, send a photo and we'll build to spec.",
      },
      {
        title: "All 700+ fabrics available",
        body: "Trapezoid shades use the full fabric catalog with no restrictions. Cathedral-ceiling great rooms typically pair best with light filtering or solar fabrics that take the heat-gain edge off without darkening the space. Attic-conversion bedrooms typically want blackout. We help you decide via free swatches.",
      },
    ],
  },

  pricing: {
    headline: "Trapezoid Shade Pricing",
    intro:
      "Trapezoids are priced on overall fabric area plus a small surcharge for the angled cut. There's no \"slope angle\" upcharge — a 30° slope costs the same as a 60° slope at the same dimensions.",
    startingPrice: "From $1,950",
    examples: [
      {
        dimensions: 'Small trapezoid — 36" base × 48" height',
        fabric: "Standard light-filtering, manual lift",
        price: "$1,950",
      },
      {
        dimensions: 'Cathedral trapezoid — 60" base × 72" height',
        fabric: "Premium blackout, manual lift",
        price: "$2,950",
      },
      {
        dimensions: 'Large attic trapezoid — 72" base × 96" height',
        fabric: "Premium blackout, motorized + remote",
        price: "$4,150",
      },
    ],
    note: "All prices include free shipping, hardware, custom precision cutting, and our 100% Fit Guarantee. Final price depends on dimensions, slope, and fabric — start with our builder for an instant quote.",
  },

  measuring: {
    headline: "How to Measure a Trapezoid Window",
    intro:
      "Trapezoid measurements are easier than they look. You're recording 5 numbers: two widths, two heights, and one angle. Most trapezoids can be measured in 10 minutes with a standard tape measure and a phone protractor app.",
    steps: [
      {
        number: 1,
        title: "Measure the bottom (longer) width",
        body: "The bottom edge is the wider of the two parallel edges. Measure it horizontally to the nearest ⅛ inch. This is the maximum width of your finished shade.",
      },
      {
        number: 2,
        title: "Measure the top (shorter) width",
        body: "If your trapezoid has a flat top (rather than meeting at a point), measure that flat top edge. If your trapezoid is a true ramp shape with a point on one side, the top width is 0 — note that and skip to step 3.",
      },
      {
        number: 3,
        title: "Measure both side heights",
        body: "Measure the height on the tall side and the short side separately, vertically. The difference between these two measurements is what creates your slope.",
      },
      {
        number: 4,
        title: "Identify the slope direction",
        body: "Stand facing the window. Note which side is taller — left or right. This is the difference between a left-angle trapezoid and a right-angle trapezoid. Photograph the window straight-on for our records if you're unsure.",
      },
      {
        number: 5,
        title: "Note the slope angle (or send a photo)",
        body: "Use a phone protractor app on the angled edge for precision, or simply photograph the window straight-on with a tape measure visible. Our team can derive the slope angle from a clean photo if you'd rather skip the measurement.",
      },
      {
        number: 6,
        title: "Measure mounting depth",
        body: "Inside mount needs at least 2 inches of frame depth for the roller tube. Outside mount needs ~3 inches of clearance above and on the sides for brackets. If you're unsure, send photos and we'll advise.",
      },
    ],
    callout:
      "Send your measurements through our builder or contact form. Our specialty-shape team reviews every trapezoid order before cutting fabric — we'll reach out if anything looks off.",
  },

  gallery: {
    headline: "Real Trapezoid Installations",
    intro:
      "Trapezoid shades we've shipped to homeowners with cathedral ceilings, attic conversions, and A-frame wings.",
    images: [
      {
        src: "https://worldwideshades.com/cdn/shop/files/hf_20260126_234144_fa5ee37d-7488-4583-ad24-ebde7ab301ef.png?v=1769473636",
        alt: "Trapezoid window shades in cathedral ceiling",
        caption: "Trapezoid — Cathedral Ceiling",
      },
      {
        src: "https://worldwideshades.com/cdn/shop/files/hf_20260127_003205_346d99ed-417d-4e16-9a2a-706f84bc8f67.png?v=1769474007",
        alt: "Trapezoid shades in attic conversion bedroom",
        caption: "Trapezoid — Attic Conversion",
      },
      {
        src: "https://worldwideshades.com/cdn/shop/files/ChatGPT_Image_Jan_23_2026_08_18_14_PM.png?v=1769217506",
        alt: "Trapezoid shade in A-frame loft",
        caption: "Trapezoid — A-Frame Wing",
      },
      {
        src: "https://worldwideshades.com/cdn/shop/files/4baccbb8-1c69-4698-bac3-bf3aae0e70c6.png?v=1768669731",
        alt: "Trapezoid shade in mid-century modern living room",
        caption: "Trapezoid — Mid-Century Modern",
      },
    ],
  },

  faqs: [
    {
      q: "Can you make custom shades for trapezoid windows?",
      a: "Yes. Trapezoid shades are one of our three most common specialty shapes — we manufacture them weekly using proprietary beveled-edge cutting equipment. The full process from order to delivery is typically 7–10 business days, the same as our rectangular shades.",
    },
    {
      q: "Will my trapezoid shade actually open and close?",
      a: "Yes — for the rectangular portion. Our trapezoid shades are built so the lower rectangular section operates as a normal roller shade (manual or motorized), while the angled triangular section at the top remains as a permanent fixed-panel piece. This is the standard way trapezoid shades work and gives you full light control on the operable portion.",
    },
    {
      q: "How much do trapezoid shades cost?",
      a: "Trapezoid shades start at $1,950 for smaller windows and range up to roughly $5,000 for large cathedral or attic configurations with premium blackout fabric and motorization. Local showrooms typically quote $4,000–$7,000 for the same windows. Our pricing is based on fabric area plus a small surcharge for the beveled cut — there's no slope-angle upcharge.",
    },
    {
      q: "What's the difference between a left-angle and right-angle trapezoid?",
      a: "Stand facing the window. If the tall side is on your left and it slopes down to the right, that's a left-angle trapezoid (the shade's left side is the long side). If the tall side is on your right, it's a right-angle trapezoid. We make both as standard variants — just specify which one you have when ordering.",
    },
    {
      q: "Can trapezoid shades be motorized?",
      a: "Yes. Motorization is available for an additional $250+ depending on configuration. Our rechargeable battery motors are compatible with Alexa, Google Home, Apple HomeKit, SmartThings, and Matter. Motorization is especially valuable on cathedral-ceiling trapezoids that are out of easy reach.",
    },
    {
      q: "Will the angled portion at the top let light in?",
      a: "The angled section is a fabric panel — it blocks light at the same opacity as the operable section. Our trapezoid shades are precision-cut to your exact slope angle, so the upper edge sits flush against the window frame with no visible gaps. For maximum blackout, optional side channels eliminate any micro-gaps along the vertical edges.",
    },
    {
      q: "What if I get the slope angle wrong?",
      a: "We back every shade with a 100% Fit Guarantee. If your shade doesn't fit per our measurement guide, we remake it at no charge. Our team also reviews every trapezoid measurement before fabric is cut and will reach out with questions if anything looks off — most measurement issues are caught before production starts.",
    },
    {
      q: "Do trapezoid shades work for attic conversion bedrooms?",
      a: "Trapezoid shades are practically purpose-built for attic conversion bedrooms. The angled top follows the roofline, the flat bottom sits at the wall, and you get true blackout for sleep without compromising the architectural drama of the space. Pair with motorization for shades you can lower from your phone before bed.",
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
      slug: "triangle",
      name: "Triangle Shades",
      description: "Right and acute triangle shades for A-frames.",
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
    headline: "Cover the Trapezoid Windows Other Companies Won't",
    subhead:
      "If your cathedral ceiling, attic conversion, or A-frame has been bare for years because nobody could build the shade, that's exactly the problem we solve. Get a quote in under 5 minutes.",
  },

  jsonLd: {
    lowPrice: 1950,
    highPrice: 5000,
  },
};
