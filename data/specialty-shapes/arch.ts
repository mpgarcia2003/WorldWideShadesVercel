import type { ShapeData } from "./types";

/**
 * Arch shade page data
 * ───────────────────────────────────────────────────────────────────────────
 * SEO target: "arch shades", "arch window shades", "half moon shades",
 * "arched window blinds", "quarter round shades", "eyebrow window shades",
 * "Palladian window shades".
 *
 * Search context: arched windows are extremely common in Mediterranean,
 * Tudor, traditional, and Palladian architecture — but mass-market shade
 * companies refuse them because the curved cuts require fabric that flexes
 * to a curve, which is structurally different from the angular cuts on
 * pentagons/trapezoids/triangles. Our existing /blog/arched-window-shade-solutions
 * post ranks for arched intent; this dedicated page now becomes the
 * commercial-intent destination it should have been.
 */
export const ARCH_DATA: ShapeData = {
  slug: "arch",
  shapeName: "Arch",
  shapeNamePlural: "Arches",

  meta: {
    title: "Custom Arch Window Shades — Half-Moon, Quarter-Round, Full-Arch",
    description:
      "Custom shades for arched windows. Half-moon, quarter-round, full-arch, and Palladian configurations. Curved precision cutting, 700+ fabrics, made in USA.",
    ogImage:
      "https://res.cloudinary.com/dcmlcfynd/image/upload/c_fill,w_1200,h_630,g_auto/v1774397716/lightfilter-hero-living_ka1oae.png",
  },

  hero: {
    h1: "Custom Arch Window Shades",
    subhead:
      "Half-moon, quarter-round, full-arch, eyebrow, Palladian — arched windows are stunning architecturally and notoriously difficult to cover. We've made custom arch shades a routine job: precision-cut curves, full fabric selection, no specialty surcharge.",
    badge: "Arch · Half-Moon · Quarter-Round · Full",
    backgroundImage:
      "https://worldwideshades.com/cdn/shop/files/4baccbb8-1c69-4698-bac3-bf3aae0e70c6.png?v=1768669731",
  },

  stats: [
    { value: "5+ Variants", label: "Half, Quarter, Full, Eyebrow" },
    { value: "From $1,950", label: "Arch Pricing" },
    { value: "700+", label: "Fabric Options" },
    { value: "7–10 Days", label: "Ships from USA" },
  ],

  whereFound: {
    headline: "Where Arched Windows Show Up",
    intro:
      "Arched windows are one of the most architecturally significant shapes in residential design — they're deliberate statements that signal craftsmanship, history, or grandeur. They're also one of the most common windows to live with bare for years because every shade company says no.",
    contexts: [
      {
        title: "Mediterranean & Spanish Revival Homes",
        description:
          "Half-moon and full-arch windows are signature features of Mediterranean and Spanish-revival architecture. They're typically positioned high on walls or above standard windows, providing soft natural light without sacrificing the design intent of the room.",
      },
      {
        title: "Traditional & Colonial Revival",
        description:
          "Palladian windows — a tall central window flanked by shorter side windows, all topped with arches — are hallmarks of colonial revival, Georgian, and traditional homes. The arch portion is the architectural focal point and the hardest part to cover.",
      },
      {
        title: "Tudor & Gothic Revival",
        description:
          "Eyebrow arches (shallow, elongated arches) and pointed Gothic arches appear in Tudor revival and Gothic-revival homes. These are particularly hard for standard shade companies because the arch isn't a simple semicircle.",
      },
      {
        title: "Cathedral Ceilings & Grand Entryways",
        description:
          "Full arches and Roman arches appear above grand entries and in cathedral-ceiling great rooms. They flood the space with light — and create privacy and heat-gain problems that homeowners typically resign themselves to until they discover that custom arch shades exist.",
      },
    ],
  },

  problem: {
    headline: "Why Arched Windows Are So Hard to Cover",
    intro:
      "Arched windows present a different challenge than angled-cut shapes like pentagons or triangles. The curved edge requires fabric that follows a curve, not just a series of straight cuts.",
    points: [
      {
        title: "Curves require flexible cutting equipment",
        body: "Standard shade fabricators have straight-cut tables. Cutting a curve requires either a specialty curved-cut machine or skilled hand-finishing — both of which most shade companies don't have. Without the right equipment, the shade either won't fit the curve or will have a rough finished edge.",
      },
      {
        title: "The fabric must follow the curve cleanly",
        body: "Even after the fabric is cut to the right shape, mounting it so that the curved edge sits flush against the window frame without gaps or buckling is a separate engineering challenge. This is why arch shades are usually built as fixed-panel or sunburst configurations rather than operable rollers.",
      },
      {
        title: "Showrooms quote $5,000–$10,000 for arches",
        body: "When traditional showrooms do quote arched windows, the pricing reflects both the genuine complexity and a substantial \"we don't really want this job\" premium. Most homeowners walk away and live with bare arches as a result.",
      },
    ],
  },

  solution: {
    headline: "How We Make Arch Shades",
    intro:
      "Arches are one of the most common specialty configurations we make. Our process is purpose-built for curves.",
    points: [
      {
        title: "Curved-cut precision equipment",
        body: "Our cutting tables handle curved profiles as a routine operation. The arch portion of your shade is cut to your exact radius and curve profile, fabric direction maintained, edges clean enough to sit flush against the window frame without hand-finishing.",
      },
      {
        title: "Five+ arch variants, all standard",
        body: "Half-moon (180° arch sitting on a flat base), quarter-round (90° arch with one vertical side and one horizontal side), full-arch (rectangle below + arch on top — the most common configuration), eyebrow (shallow elongated arch), and Palladian (center arch flanked by side windows). All standard configurations for us.",
      },
      {
        title: "Sunburst and fixed-panel arches",
        body: "Most arch shades are built as either fixed light-blocking panels (the simplest configuration) or sunburst pleated shades (where pleats radiate from the center of the arch outward, creating a fan effect). Both are full-coverage solutions. For arches that sit on top of a rectangular section, the rectangular section can roll up while the arch above stays fixed.",
      },
      {
        title: "All 700+ fabrics, no shape exclusions",
        body: "Arch shades use the full fabric catalog. Mediterranean and Spanish-revival arches typically pair best with light-filtering fabrics in warm whites or natural linen tones. Bedroom arches usually want blackout. Order free swatches to compare in your space.",
      },
    ],
  },

  pricing: {
    headline: "Arch Shade Pricing",
    intro:
      "Arches are priced on overall fabric area plus a small surcharge for the curved cut. There's no \"radius surcharge\" — a tight quarter-round costs the same as a wide half-moon at the same fabric area.",
    startingPrice: "From $1,950",
    examples: [
      {
        dimensions: 'Quarter-round arch — 36" × 36"',
        fabric: "Standard light-filtering, fixed panel",
        price: "$1,950",
      },
      {
        dimensions: 'Half-moon arch — 60" × 30"',
        fabric: "Premium light-filtering, fixed panel",
        price: "$2,450",
      },
      {
        dimensions: 'Large full-arch — 72" × 72" total (rect + arch)',
        fabric: "Premium blackout, motorized rect + fixed arch",
        price: "$4,250",
      },
    ],
    note: "All prices include free shipping, hardware, custom precision cutting, and our 100% Fit Guarantee. Final price depends on dimensions, arch profile, and fabric — start with our builder for an instant quote.",
  },

  measuring: {
    headline: "How to Measure an Arch Window",
    intro:
      "Arch measurements need a few more data points than rectangular windows because we need to know the curve. A standard tape measure and a phone protractor app handle most arches in 10 minutes.",
    steps: [
      {
        number: 1,
        title: "Measure the maximum width (chord)",
        body: "The widest horizontal point of the arch — for a half-moon, this is the diameter (the flat bottom edge). For a full-arch, this is the width of the rectangular section below the arch.",
      },
      {
        number: 2,
        title: "Measure the height at the center (rise)",
        body: "From the bottom edge straight up to the highest point of the arch. For a half-moon, the rise equals the radius (half the width). For a wider eyebrow arch, the rise is much smaller relative to the width.",
      },
      {
        number: 3,
        title: "Identify your arch type",
        body: "Half-moon (180° symmetric arch on flat base, rise = ½ width), quarter-round (90° arch with one vertical and one horizontal edge), full-arch (rectangle below + arch on top), eyebrow (shallow elongated arch where rise is much less than ½ width), or Palladian (center arch with flanking side windows). Photograph the window straight-on if you're unsure.",
      },
      {
        number: 4,
        title: "Measure mounting depth",
        body: "Arch shades mount with custom brackets sized to your window's frame. Measure the depth of the window frame for inside mounts, or the wall clearance for outside mounts. Send photos of the frame and surrounding wall — we'll spec the right hardware.",
      },
    ],
    callout:
      "Arches are the shape we ask for the most photos on — a clean straight-on photo with a tape measure visible for scale lets our team verify the curve profile, which is the most measurement-critical aspect of an arch shade.",
  },

  faqs: [
    {
      q: "Can you really make custom shades for arched windows?",
      a: "Yes. Arch shades are one of our standard specialty offerings — we manufacture them weekly using curved-cut precision equipment. Most arch shade orders ship within 7–10 business days from the day we confirm your measurements.",
    },
    {
      q: "How much do arch window shades cost?",
      a: "Arch shades start at $1,950 for smaller quarter-rounds and range up to roughly $5,000+ for large full-arches with premium blackout fabric and motorized rectangular sections. Local showrooms typically quote $5,000–$10,000 for the same windows.",
    },
    {
      q: "What's the difference between a half-moon and a full-arch?",
      a: "A half-moon is just the arch portion — a semi-circle sitting on a flat bottom. A full-arch is a rectangle with an arch on top, like a window with rounded corners on the upper portion. Half-moons are typically decorative-only; full-arches are full window units that include both the arch and a normal rectangular section below.",
    },
    {
      q: "Do arch shades open and close?",
      a: "Pure arches (half-moon, quarter-round, sunburst) are fixed light-blocking panels — they don't roll up because the curved geometry doesn't allow for normal roller mechanics. For full-arches (rectangle + arch on top), the rectangular section operates as a normal roller shade while the arch above stays as a permanent fixed panel.",
    },
    {
      q: "What is a sunburst arch shade?",
      a: "A sunburst is a special arch configuration where the fabric is pleated radially — the pleats fan out from a center point at the bottom of the arch up to the curved top edge. This creates a striking visual effect that emphasizes the arch shape rather than hiding it. Sunbursts are popular in Mediterranean and traditional homes where the arch is meant to be a focal point.",
    },
    {
      q: "Can arch shades be motorized?",
      a: "The rectangular portion of a full-arch can be motorized as a standard roller shade for an additional $250+. Pure arches (half-moon, quarter-round, sunburst) are fixed panels and don't motorize, but they're typically high enough on walls that direct access isn't needed anyway.",
    },
    {
      q: "Will my arch shade match the rectangular shade below it?",
      a: "Yes. We make full-arch shades from a single coordinated fabric run so the arch section and the rectangular section below are identical fabric, identical color batch, identical opacity. Adjacent windows in the same room can also be matched at the same time if you order them together.",
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
      slug: "skylight",
      name: "Skylight Shades",
      description: "Overhead and angled skylight shade systems.",
      hasPage: true,
    },
  ],

  finalCta: {
    headline: "Cover Your Arched Windows",
    subhead:
      "Mediterranean, Tudor, Palladian, traditional — whatever architectural style your arches define, we've built shades for it. Get a quote in under 5 minutes.",
  },

  jsonLd: {
    lowPrice: 1950,
    highPrice: 5000,
  },
};
