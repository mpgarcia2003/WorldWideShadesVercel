// ============================================================
// data.ts — All editable content for the Blackout Sales Page
// ============================================================

export const CTA_URLS = {
  builder: "/builder?type=blackout",
  swatches: "/swatches",
  motorized: "/motorized-shades",
  phone: "tel:+18446742716",
} as const;

export const PHONE = "(844) 674-2716";
export const PHONE_HREF = "tel:+18446742716";

export const IMAGES = {
  heroBg: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1776277846/photo-1616594039964-ae9021a400a0_o7co15.jpg",
  heroBgMobile: "https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_400/v1776277846/photo-1616594039964-ae9021a400a0_o7co15.jpg",
  heroBgOg: "https://res.cloudinary.com/dcmlcfynd/image/upload/c_fill,w_1200,h_630,g_auto/v1776277846/photo-1616594039964-ae9021a400a0_o7co15.jpg",
} as const;

// ── Hero ──
export const HERO = {
  eyebrow: "Custom Blackout Roller Shades · Made to Measure · Ships in ~7 Days",
  h1: "Custom Blackout Roller Shades — Built to Your Exact Window",
  subheadline: "100% light blocking. No gaps. No glow. Get instant pricing in minutes. Delivered in ~7 days.",
  deliveryLine: "Delivered in ~7 days (not 3–4 weeks like showrooms)",
  priceOriginal: "$290",
  priceNow: "From $145",
  saleBadge: "Spring Sale — Up to 50% Off — Ends April 30",
  primaryCTA: "Get Your Exact Price →",
  secondaryCTA: "Call (844) 674-2716",
  guaranteeLine: "100% Fit Guarantee — Remade free if it doesn't fit",
};

export const TRUST_PILLS = [
  { label: "⭐ 4.9/5 from 500+ Homeowners" },
  { label: "🚚 Free Shipping" },
  { label: "✓ 100% Fit Guarantee" },
  { label: "🏭 Factory Direct · Made in USA" },
];

// ── How It Works ──
export const STEPS = [
  { number: "01", title: "Enter Your Window Size", description: "Width and height — we build to ⅛\" precision" },
  { number: "02", title: "Choose Your Fabric", description: "200+ premium blackout options. Free swatches available." },
  { number: "03", title: "See Your Exact Price", description: "Instant pricing. No hidden fees. No showroom quotes." },
  { number: "04", title: "Ships in ~7 Business Days", description: "Built to order in USA. Free FedEx shipping to your door." },
];

// ── Pricing ──
export const PRICING = {
  heading: "Real Pricing for Custom Blackout Roller Shades",
  subheading: "Factory-direct. No middleman markup. No commissioned salespeople. Up to 50% off this spring.",
  cta: "Get Your Exact Price →",
  cards: [
    {
      title: "Small Windows",
      price: "$145 – $250",
      description: "Bathrooms, sidelights, home offices",
      features: [
        "Custom-fit to your window",
        "100% blackout fabric",
        "Free shipping + hardware included",
      ],
    },
    {
      title: "Standard Windows",
      price: "$150 – $300",
      description: "Bedrooms, living rooms, nurseries. Most orders.",
      features: [
        "Custom-fit to your window",
        "100% blackout fabric",
        "Free shipping + hardware included",
        "Motorized upgrade available",
      ],
      highlighted: true,
      badge: "Most Popular",
    },
    {
      title: "Add-Ons",
      price: null,
      description: "Customize your order:",
      features: [],
      addOns: [
        { name: "Motorized", price: "+$250" },
        { name: "Side channels", price: "+$15/ft" },
        { name: "Smart Hub", price: "+$185" },
        { name: "Motor Charger", price: "+$50" },
      ],
    },
  ],
};

// ── Intent Filter ──
export const INTENT_FILTER = {
  heading: "Is This Right For You?",
  forYou: {
    title: "Perfect if you…",
    items: [
      "Own your home and want premium window treatments",
      "Have non-standard or oversized windows",
      "Need total darkness for sleep, nurseries, or media rooms",
      "Want motorized or smart-home integration",
      "Value factory-direct pricing without showroom markup",
    ],
  },
  notForYou: {
    title: "Not the best fit if you…",
    items: [
      "Need a temporary or disposable blackout solution",
      "Are looking for the cheapest option under $50",
      "Want standard sizes off the shelf today",
      "Just need curtains or drapes",
    ],
  },
  cta: "I'm Ready — Get My Price →",
};

// ── Reviews ──
export const REVIEWS = [
  { stars: 5, quote: "Zero light leakage. Like sleeping in a cave. Best investment for my health.", author: "David K.", location: "Austin, TX" },
  { stars: 5, quote: "Quoted $2,400 locally for our nursery. Paid under $700 with World Wide Shades. Our toddler finally sleeps past 6am.", author: "Rachel M.", location: "Portland, OR" },
  { stars: 5, quote: "Motorized shades + Alexa = movie night on command. Legitimately zero light in our theater room.", author: "James T.", location: "Denver, CO" },
];

// ── Room Use Cases ──
export const ROOMS = [
  { badge: "Most Popular", title: "Bedrooms", description: "Complete darkness for the deepest sleep. Block sunrise, street lights, and all ambient light.", cta: "Build for Bedroom →" },
  { badge: "Parent Favorite", title: "Nurseries", description: "Daytime naps in true darkness. Cordless for child safety. OEKO-TEX certified fabrics.", cta: "Build for Nursery →" },
  { badge: "Enthusiast Pick", title: "Media Rooms", description: "Zero-glare for cinema-quality viewing. Pair with motorization — close everything with Alexa.", cta: "Build for Media Room →" },
];

// ── Blackout Difference ──
export const BLACKOUT_DIFFERENCE = {
  heading: "Most \"Blackout\" Shades Still Leak Light",
  subheading: "The difference between \"room darkening\" and true blackout is precision fit.",
  without: [
    "Stock sizes leave ¼\" gaps around every edge",
    "Light bleeds in at top, bottom, and sides",
    "\"Room darkening\" blocks 85-95% — not 100%",
  ],
  with: [
    "Precision-cut to your exact window — down to ⅛\"",
    "Zero light leakage. Zero gaps. Zero compromise.",
    "100% blackout. Not 95%. Not \"room darkening.\" 100%.",
    "Add side channels for absolute darkness: +$15/ft",
  ],
};

// ── Side Channels ──
export const SIDE_CHANNELS = {
  heading: "Without Side Channels, It's Not Real Blackout",
  body: "Every blackout shade has a weak point: the edges. Light bleeds around the sides where the shade meets the window frame. Side channels seal that gap completely.",
  withoutPct: "~95%",
  withoutNote: "Light bleeds around all 4 edges. Visible glow. Not true blackout.",
  withPct: "100%",
  withNote: "Sealed on all sides. Zero light leakage. Total darkness.",
  features: [
    "U-shaped aluminum tracks mount to each side of the window frame",
    "Shade fabric slides inside the channels as it rolls up and down",
    "Creates a complete seal — no light can enter from the sides or bottom",
    "Available in white, black, or bronze to match your window trim",
  ],
  price: "+$15/ft",
  priceNote: "Most windows = $30–$45 per shade",
  cta: "Build With Side Channels →",
};

// ── Urgency ──
export const URGENCY = {
  heading: "Limited Daily Production — Order Today, Ships This Week",
  body: "Every shade is built to your exact specs in our USA facility. Daily production capacity is limited. Orders placed today ship in approximately 5-7 business days.",
  note: "Once today's slots fill, the next batch ships tomorrow.",
  cta: "Secure Your Production Slot →",
};

// ── Comparison ──
export const COMPARISON = {
  heading: "Why People Choose Us Over Showrooms & Amazon",
  rows: [
    { feature: "Custom fit", ours: "Built to your exact window — to ⅛\"", theirs: "Stock sizes with gaps" },
    { feature: "Pricing", ours: "From $145 (50% off)", theirs: "$400–$800 with markup" },
    { feature: "Delivery", ours: "~7 days, FedEx", theirs: "3-4 weeks or next-day (stock)" },
    { feature: "Guarantee", ours: "100% Fit — remade free", theirs: "Return hassles" },
    { feature: "AI Preview", ours: "See it in your room first", theirs: "Guess and hope" },
    { feature: "Fabrics", ours: "200+ premium blackout", theirs: "5-30 options" },
    { feature: "Free Swatches", ours: "✓", theirs: "Sometimes" },
  ],
};

// ── Motorization ──
export const MOTORIZATION = {
  heading: "Make It Smart — Add Motorization",
  body: "Rechargeable battery. No wiring. Voice control. Schedule your shades to open with sunrise. Whisper-quiet Somfy motors.",
  price: "+$250",
  cta: "Add Motorized to Your Order →",
  badges: ["Alexa", "Google Home", "Apple HomeKit", "SmartThings", "Matter"],
};

// ── FAQs ──
export const FAQS = [
  { question: "How much do custom blackout roller shades cost?", answer: "Most orders: $145–$300 with our Spring Sale (50% off). Large/panoramic: $200–$450. Motorized: add $250. Side channels: +$15/ft. All prices include free shipping and our 100% Fit Guarantee." },
  { question: "How do I know it will fit my window?", answer: "100% Fit Guarantee. If it doesn't fit, we remake it free. No questions asked." },
  { question: "What's the difference between blackout and room darkening?", answer: "Room darkening blocks 85-95% of light. Our blackout fabrics block 100% — completely opaque. With side channels added, you get absolute zero light leakage." },
  { question: "How fast do you ship?", answer: "Approximately 7 business days from order to your door. Made in USA, ships free via FedEx." },
  { question: "Can I see what it looks like in my room first?", answer: "Yes. Our AI Room Visualizer lets you upload a photo of your window and preview your chosen fabric and color rendered in your actual room." },
  { question: "Do you offer fabric samples?", answer: "Yes. Order up to 10 free swatches delivered to your door." },
  { question: "Do light-colored blackout fabrics still block all light?", answer: "Yes. The blackout layer is a separate backing woven into the fabric. A white fabric blocks the same 100% of light as a dark charcoal." },
];

// ── Final CTA ──
export const FINAL_CTA = {
  heading: "Get Your Custom Blackout Shades in Minutes",
  body: "Enter your window size and get your exact price instantly. No sales calls. No showroom appointments.",
  cta: "Start Your Order →",
  riskKiller: "100% Fit Guarantee — If it doesn't fit, we remake it free. No questions.",
  trustItems: ["100% Fit Guarantee", "Free Shipping", "Made in USA", "~7 Day Delivery"],
};
