export interface LandingPageData {
  slug: string;
  meta: { title: string; description: string };
  hero: { headline: string; subheadline: string; ctaLabel: string; ctaHref: string; secondaryCtaLabel?: string; secondaryCtaHref?: string; backgroundImage: string; badge?: string };
  trustBar: { metric: string; label: string }[];
  valueProps: { headline: string; description: string; items: { icon: string; title: string; description: string }[] };
  useCases: { headline: string; description: string; rooms: { name: string; image: string; description: string }[] };
  fabricShowcase: { headline: string; description: string; categories: { name: string; swatch: string; description: string }[] };
  howItWorks: { headline: string; steps: { number: number; title: string; description: string; icon: string }[] };
  accessories?: { headline: string; items: { name: string; price: string; description: string; image: string }[] };
  testimonials: { headline: string; items: { name: string; location: string; rating: number; text: string; product: string }[] };
  faqs: { question: string; answer: string }[];
  finalCta: { headline: string; subheadline: string; ctaLabel: string; ctaHref: string };
  jsonLd: { lowPrice: number; highPrice: number };
}

const SHARED_TRUST = [
  { metric: "700+", label: "Premium Fabrics" },
  { metric: "4.8★", label: "Customer Rating" },
  { metric: "Free", label: "Shipping & Samples" },
  { metric: "100%", label: "Custom Made" },
];

const SHARED_HOW = {
  headline: "Custom Shades in 3 Easy Steps",
  steps: [
    { number: 1, title: "Design It", description: "Choose your fabric, color, and features using our visual shade builder. See a live preview before you order.", icon: "Palette" },
    { number: 2, title: "We Build It", description: "Your shade is precision-cut and assembled in our facility. Quality-checked before it ships — free.", icon: "Ruler" },
    { number: 3, title: "Install It", description: "Mount your new shade in minutes with our included hardware and step-by-step guide.", icon: "Wrench" },
  ],
};

const SHARED_TESTIMONIALS = {
  headline: "What Our Customers Say",
  items: [
    { name: "Sarah M.", location: "Austin, TX", rating: 5, text: "These blackout shades completely transformed our nursery. Baby sleeps through the night now and we couldn't be happier with the quality.", product: "Blackout Roller Shade" },
    { name: "James R.", location: "Denver, CO", rating: 5, text: "The motorized upgrade was worth every penny. I control all my shades from my phone now. Installation was surprisingly easy too.", product: "Motorized Blackout Shade" },
    { name: "Maria L.", location: "Miami, FL", rating: 5, text: "I ordered light filtering shades for my living room and the fabric quality is incredible. Way better than the big box store options.", product: "Light Filtering Shade" },
    { name: "David K.", location: "Seattle, WA", rating: 5, text: "Had an unusual hexagonal window and World Wide Shades was the only company that could do a custom shape. Fit was perfect.", product: "Specialty Shape Shade" },
  ],
};

const SHARED_CTA = { headline: "Ready to Transform Your Windows?", subheadline: "Design your custom shades in minutes. Free shipping. Free samples. 100% satisfaction guaranteed.", ctaLabel: "Start Designing", ctaHref: "/builder" };

export const BLACKOUT_PAGE: LandingPageData = {
  slug: "blackout-roller-shades",
  meta: { title: "Custom Blackout Roller Shades — 700+ Fabrics, Free Shipping", description: "Block 100% of light with custom blackout roller shades. 700+ premium fabrics, motorized options, free shipping. Average price $300." },
  hero: { headline: "Total Darkness.\nTotal Control.", subheadline: "Custom blackout roller shades that block 100% of light. 700+ premium fabrics, motorized options available. Avg. price $300.", ctaLabel: "Design Your Shade", ctaHref: "/builder", secondaryCtaLabel: "Order Free Swatches", secondaryCtaHref: "/swatches", backgroundImage: "/images/hero-blackout.jpg", badge: "Easter Sale — 40% Off" },
  trustBar: SHARED_TRUST,
  valueProps: { headline: "Why Choose Our Blackout Shades?", description: "Engineered for complete light control with premium materials that last.", items: [
    { icon: "Moon", title: "100% Light Blocking", description: "Our triple-layer blackout fabric blocks every ray of light. Perfect for bedrooms, nurseries, and home theaters." },
    { icon: "Thermometer", title: "Energy Efficient", description: "Insulating fabric reduces heat transfer through windows by up to 45%, lowering your energy bills year-round." },
    { icon: "Shield", title: "UV Protection", description: "Blocks 99.9% of UV rays, protecting your furniture, floors, and artwork from sun damage and fading." },
    { icon: "Volume2", title: "Noise Reduction", description: "Dense blackout fabric dampens outside noise, creating a quieter, more peaceful interior environment." },
  ]},
  useCases: { headline: "Perfect for Every Room", description: "See how blackout shades transform spaces throughout your home.", rooms: [
    { name: "Bedroom", image: "/images/room-bedroom.jpg", description: "Create the ideal sleep environment with total darkness, any time of day." },
    { name: "Nursery", image: "/images/room-nursery.jpg", description: "Help your baby sleep better and longer with complete light control." },
    { name: "Home Theater", image: "/images/room-theater.jpg", description: "Eliminate glare and reflections for a true cinematic experience." },
    { name: "Home Office", image: "/images/room-office.jpg", description: "Reduce screen glare and control light for better focus during video calls." },
  ]},
  fabricShowcase: { headline: "700+ Blackout Fabrics", description: "From crisp whites to deep charcoals, textured weaves to smooth solids.", categories: [
    { name: "Classic Solids", swatch: "/images/swatch-solid.jpg", description: "Clean, timeless colors in smooth blackout fabric" },
    { name: "Textured Weaves", swatch: "/images/swatch-textured.jpg", description: "Subtle patterns that add visual depth and warmth" },
    { name: "Linen Look", swatch: "/images/swatch-linen.jpg", description: "Natural linen texture with full blackout performance" },
    { name: "Bold Colors", swatch: "/images/swatch-bold.jpg", description: "Make a statement with rich, saturated hues" },
  ]},
  howItWorks: SHARED_HOW,
  accessories: { headline: "Upgrade Your Shades", items: [
    { name: "Motorized Upgrade", price: "from $250", description: "Raise and lower with a remote, app, or voice. Works with Alexa, Google Home, and HomeKit.", image: "/images/motor.jpg" },
    { name: "Smart Hub", price: "$185", description: "Connect all your motorized shades to WiFi for app control and smart home integration.", image: "/images/hub.jpg" },
    { name: "Motor Charger", price: "$50", description: "Rechargeable battery charger for motorized shades. One charge lasts up to 6 months.", image: "/images/charger.jpg" },
    { name: "Side Channels", price: "$15/ft", description: "Light-blocking side tracks for complete edge-to-edge blackout performance.", image: "/images/side-channels.jpg" },
  ]},
  testimonials: SHARED_TESTIMONIALS,
  faqs: [
    { question: "How much do custom blackout roller shades cost?", answer: "Our custom blackout shades average $300 per window. Price depends on window size, fabric, and upgrades like motorization. We're currently running our Easter Sale with 40% off all shades." },
    { question: "Do blackout shades really block 100% of light?", answer: "Yes. Our blackout fabrics are tested and certified to block 100% of incoming light. For maximum blackout at edges, we recommend adding side channels." },
    { question: "How do I measure my windows?", answer: "We provide a detailed measuring guide. For inside mount, measure width and height at three points and use the smallest measurement. For outside mount, add 1.5 inches on each side." },
    { question: "Can I get motorized blackout shades?", answer: "Absolutely. Any shade can be upgraded with a rechargeable motor that works with our Smart Hub for app control and integrates with Alexa, Google Home, and Apple HomeKit." },
    { question: "How long does shipping take?", answer: "Custom shades ship free within 7–10 business days. We precision-cut and assemble each shade to your exact measurements before quality-checking and shipping." },
    { question: "What if my shade doesn't fit?", answer: "We stand behind our product with a 100% satisfaction guarantee. If there's a fit issue, contact us and we'll make it right." },
  ],
  finalCta: SHARED_CTA,
  jsonLd: { lowPrice: 89, highPrice: 899 },
};

export const LIGHT_FILTERING_PAGE: LandingPageData = {
  slug: "light-filtering-shades",
  meta: { title: "Custom Light Filtering Shades — Soft Glow, Full Privacy", description: "Let natural light in while maintaining full privacy. Custom light filtering roller shades in 500+ fabrics. Free shipping." },
  hero: { headline: "Soft Light.\nFull Privacy.", subheadline: "Custom light filtering shades that create a warm, natural glow while keeping your space private. 500+ fabrics available.", ctaLabel: "Design Your Shade", ctaHref: "/builder", secondaryCtaLabel: "Order Free Swatches", secondaryCtaHref: "/swatches", backgroundImage: "/images/hero-lightfiltering.jpg", badge: "Easter Sale — 40% Off" },
  trustBar: SHARED_TRUST,
  valueProps: { headline: "Why Choose Light Filtering Shades?", description: "The perfect balance of natural light and daytime privacy.", items: [
    { icon: "Sun", title: "Natural Daylight", description: "Enjoy soft, diffused sunlight that fills your room with warmth without the harsh glare." },
    { icon: "Eye", title: "Daytime Privacy", description: "Block outside views while your room stays bright and inviting." },
    { icon: "Shield", title: "UV Protection", description: "Filters 95%+ of harmful UV rays, protecting your interiors from fading." },
    { icon: "Sparkles", title: "Designer Aesthetic", description: "Elevate your space with fabrics that add texture, warmth, and sophistication." },
  ]},
  useCases: { headline: "Beautiful in Any Space", description: "Light filtering shades enhance the natural beauty of every room.", rooms: [
    { name: "Living Room", image: "/images/room-living-lf.jpg", description: "Create a warm, inviting atmosphere with soft filtered sunlight." },
    { name: "Kitchen", image: "/images/room-kitchen.jpg", description: "Let morning light pour in while keeping the neighbors out." },
    { name: "Dining Room", image: "/images/room-dining.jpg", description: "Set the mood for any meal with perfectly diffused natural light." },
    { name: "Bathroom", image: "/images/room-bath-lf.jpg", description: "Maintain privacy without sacrificing brightness in smaller spaces." },
  ]},
  fabricShowcase: { headline: "500+ Light Filtering Fabrics", description: "Sheer to semi-opaque. Neutral tones to vibrant accents.", categories: [
    { name: "Sheer Elegance", swatch: "/images/swatch-sheer.jpg", description: "Ultra-light fabrics for maximum natural light diffusion" },
    { name: "Woven Naturals", swatch: "/images/swatch-woven.jpg", description: "Bamboo and jute-inspired textures with organic warmth" },
    { name: "Semi-Opaque", swatch: "/images/swatch-semiopaque.jpg", description: "More privacy with a soft, frosted-glass effect" },
    { name: "Color Pop", swatch: "/images/swatch-colorpop.jpg", description: "Add personality with on-trend colors that glow beautifully" },
  ]},
  howItWorks: SHARED_HOW,
  testimonials: SHARED_TESTIMONIALS,
  faqs: [
    { question: "What's the difference between light filtering and blackout?", answer: "Light filtering shades softly diffuse natural light for a warm glow while providing daytime privacy. Blackout shades block 100% of light. Many customers pair both — light filtering in living areas and blackout in bedrooms." },
    { question: "Can I see through light filtering shades from outside?", answer: "During the day, light filtering shades provide excellent privacy. At night with interior lights on, silhouettes may be visible. For nighttime privacy, pair with blackout shades or choose a heavier semi-opaque fabric." },
    { question: "Do light filtering shades come in motorized?", answer: "Yes. All shades, including light filtering, can be upgraded with a rechargeable motor for remote, app, or voice control." },
    { question: "Are light filtering shades good for plants?", answer: "Light filtering shades are excellent for indoor plants. They diffuse harsh direct sunlight while letting through enough ambient light for most houseplants to thrive." },
  ],
  finalCta: SHARED_CTA,
  jsonLd: { lowPrice: 79, highPrice: 799 },
};

export const SPECIALTY_SHAPES_PAGE: LandingPageData = {
  slug: "specialty-shapes",
  meta: { title: "Custom Specialty Shape Blinds — Triangles, Arches, Hexagons & More", description: "Window shades for any shape. Triangles, trapezoids, arches, hexagons, and more. Custom-measured, custom-built. Free shipping." },
  hero: { headline: "Any Shape.\nPerfect Fit.", subheadline: "Triangles, arches, hexagons, and everything in between. We build custom shades for windows other companies can't handle.", ctaLabel: "Get a Custom Quote", ctaHref: "/contact", secondaryCtaLabel: "See Our Shapes", secondaryCtaHref: "#shapes", backgroundImage: "/images/hero-specialty.jpg", badge: "Easter Sale — 40% Off" },
  trustBar: [{ metric: "20+", label: "Window Shapes" }, { metric: "4.8★", label: "Customer Rating" }, { metric: "Free", label: "Shipping Nationwide" }, { metric: "100%", label: "Custom Fabricated" }],
  valueProps: { headline: "Specialty Windows Deserve Specialty Shades", description: "Standard shades don't fit non-standard windows. We solve that.", items: [
    { icon: "Triangle", title: "Any Geometric Shape", description: "Triangles, trapezoids, pentagons, hexagons — if your window has a shape, we can shade it." },
    { icon: "Maximize2", title: "Precision Measured", description: "Every specialty shade is precision-cut to your exact dimensions. No gaps, no overlap." },
    { icon: "Palette", title: "Full Fabric Selection", description: "Choose from the same 700+ fabrics as our standard shades. Blackout or light filtering." },
    { icon: "Zap", title: "Motorized Available", description: "Even specialty shapes can be motorized for push-button control." },
  ]},
  useCases: { headline: "Shapes We Cover", description: "We've built custom shades for virtually every window shape imaginable.", rooms: [
    { name: "Triangle Windows", image: "/images/shape-triangle.jpg", description: "A-frame, gable, and angled windows in any pitch." },
    { name: "Arch Windows", image: "/images/shape-arch.jpg", description: "Half-round, quarter-round, and full arch windows." },
    { name: "Trapezoid Windows", image: "/images/shape-trapezoid.jpg", description: "Angled tops or bottoms for sloped ceilings and lofts." },
    { name: "Hexagon & Octagon", image: "/images/shape-hexagon.jpg", description: "Multi-sided decorative windows with a perfect-fit shade." },
  ]},
  fabricShowcase: { headline: "Full Fabric Selection for Every Shape", description: "All 700+ fabrics are available for specialty shapes.", categories: [
    { name: "Blackout", swatch: "/images/swatch-solid.jpg", description: "Total darkness even in unusually-shaped windows" },
    { name: "Light Filtering", swatch: "/images/swatch-sheer.jpg", description: "Soft diffused light for decorative windows" },
    { name: "Textured", swatch: "/images/swatch-textured.jpg", description: "Add visual interest to statement windows" },
    { name: "Bold", swatch: "/images/swatch-bold.jpg", description: "Make your specialty window the focal point" },
  ]},
  howItWorks: { headline: "How Custom Shapes Work", steps: [
    { number: 1, title: "Submit Your Shape", description: "Send us your window dimensions or photos. Our team will create a custom template and quote.", icon: "Camera" },
    { number: 2, title: "We Fabricate", description: "Your shade is precision-cut to your exact template using CNC equipment for a flawless fit.", icon: "Ruler" },
    { number: 3, title: "Install & Enjoy", description: "We include all mounting hardware and instructions specific to your window shape.", icon: "Wrench" },
  ]},
  testimonials: SHARED_TESTIMONIALS,
  faqs: [
    { question: "How do I get a quote for a specialty shape?", answer: "Contact us with your window measurements and/or photos. We'll create a custom template and provide a quote within 1–2 business days." },
    { question: "What shapes can you make?", answer: "Triangles, trapezoids, pentagons, hexagons, octagons, arches (half, quarter, full), circles, and virtually any other geometric shape." },
    { question: "Do specialty shapes cost more?", answer: "Specialty shapes are priced based on fabric area and shape complexity. They typically start around 20–30% above standard rectangular pricing." },
    { question: "Can specialty shapes be motorized?", answer: "Many specialty shapes can be motorized, depending on the shape and mounting configuration. Contact us to discuss your specific window." },
  ],
  finalCta: { headline: "Have an Unusual Window?", subheadline: "Send us your measurements or a photo and we'll create a custom solution.", ctaLabel: "Get a Custom Quote", ctaHref: "/contact" },
  jsonLd: { lowPrice: 129, highPrice: 1299 },
};

export const LANDING_PAGES: Record<string, LandingPageData> = {
  "blackout-roller-shades": BLACKOUT_PAGE,
  "light-filtering-shades": LIGHT_FILTERING_PAGE,
  "specialty-shapes": SPECIALTY_SHAPES_PAGE,
};
