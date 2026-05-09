import type { ShapeData } from "./types";

/**
 * Skylight shade page data
 * ───────────────────────────────────────────────────────────────────────────
 * SEO target: "skylight shades", "skylight blinds", "skylight window shades",
 * "overhead skylight shades", "VELUX skylight shades", "skylight room
 * darkening shades", "remote control skylight shades".
 *
 * Search context: skylight searches are dominated by VELUX-brand homeowners
 * looking for replacement shades, plus DIYers building sunrooms and modern
 * homes with overhead glazing. Two of the audit's named Shopify blog redirects
 * (in-depth-review-of-skylight-shade-for-skylights and top-picks-for-the-best-
 * skylight-shades-light-control-style) currently route to /blog/skylight-shades-guide
 * as a placeholder; once this page deploys, those redirects update to land here.
 */
export const SKYLIGHT_DATA: ShapeData = {
  slug: "skylight",
  shapeName: "Skylight",
  shapeNamePlural: "Skylights",

  meta: {
    title: "Custom Skylight Shades — Overhead, Angled, Motorized",
    description:
      "Custom shades for skylight windows. Overhead, angled, tension-mounted, track-guided, and motorized configurations. 700+ fabrics, made in USA, ships in 7–10 days.",
    ogImage:
      "https://res.cloudinary.com/dcmlcfynd/image/upload/c_fill,w_1200,h_630,g_auto/v1774397716/lightfilter-hero-living_ka1oae.png",
  },

  hero: {
    h1: "Custom Skylight Window Shades",
    subhead:
      "Overhead glazing flooded your sunroom, kitchen, or primary bedroom with light — and now you need to control it. Skylight shades are different from window shades: gravity works against the fabric, hardware has to hold the shade overhead, and most are out of arm's reach. We make all of it routine.",
    badge: "Skylight · Overhead · Angled · Motorized",
    backgroundImage:
      "https://worldwideshades.com/cdn/shop/files/hf_20260126_234144_fa5ee37d-7488-4583-ad24-ebde7ab301ef.png?v=1769473636",
  },

  stats: [
    { value: "4 Mount Types", label: "Tension, Track, Cassette, Roller" },
    { value: "From $1,950", label: "Skylight Pricing" },
    { value: "700+", label: "Fabric Options" },
    { value: "7–10 Days", label: "Ships from USA" },
  ],

  whereFound: {
    headline: "Where Skylights Show Up",
    intro:
      "Skylights have become standard in modern home design — but the shade industry has been slow to follow. Most homeowners with skylights live without coverage for years because the shade-buying process for overhead glazing is fundamentally different from windows.",
    contexts: [
      {
        title: "Modern & Mid-Century Homes",
        description:
          "Skylights are practically standard equipment in modern and mid-century-modern home design. They're typically positioned over kitchens, bathrooms, hallways, and primary bedrooms — exactly the rooms where light control matters most.",
      },
      {
        title: "Sunrooms & Conservatories",
        description:
          "Sunroom additions almost always include overhead glazing, sometimes covering the entire ceiling. Without shades, sunrooms become unusable in summer due to heat gain and unusable for relaxation due to glare.",
      },
      {
        title: "Loft Conversions & Vaulted Ceilings",
        description:
          "Converted attics with vaulted ceilings frequently use angled skylights along the roof slope. These angled skylights are particularly hard to cover because the shade has to hold itself against gravity at an angle.",
      },
      {
        title: "Kitchens & Bathrooms with Overhead Light",
        description:
          "Kitchens and primary bathrooms are increasingly designed with skylights for natural daylight. Glare on prep surfaces, screen glare on TVs in kitchen sitting areas, and morning sun in bathrooms make light control essential.",
      },
    ],
  },

  problem: {
    headline: "Why Skylight Shades Are Different",
    intro:
      "Skylights present a fundamentally different problem than window shades. Most shade companies don't have a clear offering for them, and the ones that do typically only support one mounting system.",
    points: [
      {
        title: "Gravity works against the shade",
        body: "On a window, the shade hangs down and gravity helps. On a skylight, the shade has to be held overhead — gravity works against it, requiring tension systems, track guides, or cassette enclosures to keep the fabric taut and aligned.",
      },
      {
        title: "Most are out of reach",
        body: "Skylights are typically 8–14 feet overhead. A manual pull-cord shade is impractical at that height — you'd need a long pole, a hook, or a step ladder every time you wanted to operate it. Motorization isn't a luxury for skylights, it's basically a requirement for daily usability.",
      },
      {
        title: "VELUX-brand replacement market is locked in",
        body: "Most skylights in US homes are VELUX-brand units, and VELUX has its own captive shade product line at premium pricing. Aftermarket alternatives exist but are hard to find. We make custom shades that fit VELUX skylights at materially lower prices.",
      },
    ],
  },

  solution: {
    headline: "How We Build Skylight Shades",
    intro:
      "Skylight shades are one of our specialty offerings with multiple mounting configurations engineered specifically for overhead applications.",
    points: [
      {
        title: "Four mounting systems for different applications",
        body: "Tension-mounted (fabric stretched between two side rails — best for flat skylights up to ~36\" wide), track-guided (fabric runs in side tracks for larger or angled skylights), cassette (fabric retracts into a housing at one end — cleanest aesthetic for fixed installations), and roller (motor-driven retraction for skylights that need full open/close).",
        },
      {
        title: "Motorized as standard for overhead skylights",
        body: "Skylights over 8 feet up are practically always motorized — manual operation just isn't usable at that height. Our rechargeable battery motors are compatible with Alexa, Google Home, Apple HomeKit, SmartThings, and Matter. Schedule shades to close at sunrise so the bedroom stays dark, open at sunset to let starlight in.",
      },
      {
        title: "VELUX-compatible custom builds",
        body: "We custom-build skylight shades to match VELUX dimensions (FS, FK, FCM and other model series) at a fraction of VELUX's own shade pricing. If you have a VELUX, send us the model number printed on the side of the unit and we'll build a fit-matched shade.",
      },
      {
        title: "All 700+ fabrics, including blackout for bedrooms",
        body: "Skylight shades use the full fabric catalog. Bedroom skylights almost always want blackout — early-morning sun coming through an overhead skylight is one of the worst sleep disruptors in modern home design. Living-area skylights typically pair best with light-filtering or solar fabrics that take the heat-gain edge off without darkening the space.",
      },
    ],
  },

  pricing: {
    headline: "Skylight Shade Pricing",
    intro:
      "Skylight shades are priced higher than rectangular window shades because of the specialty mounting hardware, but lower than VELUX's captive shade pricing for the same dimensions.",
    startingPrice: "From $1,950",
    examples: [
      {
        dimensions: 'Small skylight — 24" × 36" (e.g. VELUX FS 304)',
        fabric: "Standard light-filtering, tension-mounted, manual pole",
        price: "$1,950",
      },
      {
        dimensions: 'Standard skylight — 36" × 48" (e.g. VELUX FK 06)',
        fabric: "Premium light-filtering, track-guided, motorized",
        price: "$3,150",
      },
      {
        dimensions: 'Large skylight — 48" × 60" overhead bedroom',
        fabric: "Premium blackout, cassette + motorized + remote",
        price: "$4,650",
      },
    ],
    note: "All prices include free shipping, hardware, custom precision cutting, and our 100% Fit Guarantee. Motorization is included on the larger configurations and recommended for any skylight over 8 feet up.",
  },

  measuring: {
    headline: "How to Measure a Skylight",
    intro:
      "Skylights are typically rectangular, so measuring is simpler than the angled specialty shapes — but you'll need to safely access the skylight to measure, which sometimes means a step stool or pole-mounted measuring tape.",
    steps: [
      {
        number: 1,
        title: "Find your VELUX model number (if applicable)",
        body: "Most VELUX skylights have a model number printed on a label on the side of the unit, visible from inside. If you can read it (e.g. \"FS 304,\" \"FK 06,\" \"FCM 4646\"), send it to us — we have the dimensions for every VELUX model and can build a fit-matched shade without you measuring.",
      },
      {
        number: 2,
        title: "Measure the inside-frame width and height",
        body: "If you don't have a model number, measure the inside-frame opening of the skylight. Width and height to the nearest ⅛ inch. Inside-mount shades sit inside the frame; outside-mount shades cover the frame and surrounding ceiling.",
      },
      {
        number: 3,
        title: "Note the skylight orientation",
        body: "Flat skylight (parallel to the ceiling, common in flat-roof homes) vs angled skylight (tilted along a sloped roofline, common in vaulted-ceiling homes and converted attics). Photograph the skylight from below for our records — angled skylights need different mounting hardware than flat ones.",
      },
      {
        number: 4,
        title: "Measure mounting depth and clearance",
        body: "How deep is the skylight well? How much clearance is there between the glass and the ceiling? This determines which of our four mounting systems is right for your skylight. Send a photo of the skylight viewed from below if you're unsure — our team will spec the right mounting approach.",
      },
    ],
    callout:
      "Skylight measurements are the most measurement-critical of any specialty shape because the shade has to be held overhead with no margin for slippage. Send your model number, dimensions, and a photo through our builder or contact form — we review every skylight order before fabric is cut.",
  },

  faqs: [
    {
      q: "Can you make custom shades for VELUX skylights?",
      a: "Yes. We build VELUX-compatible custom shades for all major VELUX model series (FS, FK, FCM, GPL, GGL, etc.). Send us the model number printed on the side of your skylight and we'll match the dimensions exactly. Our pricing is materially lower than VELUX's own captive shade products at equivalent quality.",
    },
    {
      q: "How much do skylight shades cost?",
      a: "Skylight shades start at $1,950 for smaller manually-operated configurations and range up to roughly $5,000+ for large motorized blackout skylights with cassette housings. The premium over standard window shades reflects the specialty overhead mounting hardware. VELUX's own shades typically run 30–50% higher for equivalent specs.",
    },
    {
      q: "Do I need a motorized skylight shade?",
      a: "For skylights more than ~8 feet up, motorization is practically a requirement — manual operation with a pole or hook isn't sustainable as a daily routine. For skylights in reach (e.g. some loft conversions where the slope brings them down to head height), manual operation is fine. We default to motorized recommendations for overhead skylights.",
    },
    {
      q: "What's the difference between tension-mounted, track-guided, and cassette?",
      a: "Tension-mounted: fabric stretched between two side rails — simplest and cheapest, best for smaller flat skylights. Track-guided: fabric runs in side tracks for support — better for larger or angled skylights where tension alone isn't enough. Cassette: fabric retracts into a small housing at one end — cleanest aesthetic, best for skylights you want to close fully out of sight when not in use.",
    },
    {
      q: "Can skylight shades be operated with Alexa or Google Home?",
      a: "Yes. Our motorized skylight shades use rechargeable battery motors that integrate with Alexa, Google Home, Apple HomeKit, SmartThings, and Matter. The most popular setup is a sunrise/sunset schedule — the bedroom skylight closes automatically before dawn so morning light doesn't wake you, and opens at sunset to let starlight or moonlight through.",
    },
    {
      q: "Will the shade actually block all the light?",
      a: "With blackout fabric and proper mounting, yes — overhead skylight blackout is achievable but requires either a cassette enclosure or side tracks to seal the edges. Tension-mounted blackout works for moderate light reduction but will leak at the edges. For 100% blackout (bedroom requirement), choose cassette or track-guided.",
    },
    {
      q: "How is the motorized shade powered?",
      a: "Rechargeable battery motors — no wiring required, no holes drilled into your ceiling, no electrician needed. Battery life is typically 6–12 months between charges depending on usage. Recharging is via a USB charger; the battery slides out of the motor for charging at a convenient outlet.",
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
  ],

  finalCta: {
    headline: "Cover Your Skylights",
    subhead:
      "If you've been living with bare overhead glazing because the VELUX-brand shades were too expensive or the local installers wouldn't quote you, that's exactly the problem we exist to solve. Get a quote in under 5 minutes.",
  },

  jsonLd: {
    lowPrice: 1950,
    highPrice: 5000,
  },
};
