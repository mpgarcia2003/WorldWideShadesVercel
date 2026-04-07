import type { Metadata } from "next"
import {
  Star,
  Sun,
  Eye,
  ShieldOff,
  Truck,
  Factory,
  CheckCircle,
  Ruler,
  Palette,
  Hammer,
  Check,
  X,
  Armchair,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Custom Shades for Living Rooms | Light Filtering & Blackout — World Wide Shades",
  description:
    "Custom living room shades in 700+ fabrics. Light filtering for soft glow, blackout for movie nights. Factory-direct from $250. Ships in 7 days. Made in USA.",
  openGraph: {
    title: "Custom Shades for Living Rooms | World Wide Shades",
    description:
      "Your living room sets the tone for your entire home. Custom shades in 700+ fabrics — light filtering, blackout, or motorized. Factory-direct from $250.",
    url: "https://worldwideshades.com/rooms/living-room",
    siteName: "World Wide Shades",
    type: "website",
    images: [{ url: "https://res.cloudinary.com/dcmlcfynd/image/upload/c_fill,w_1200,h_630,g_auto/v1774397716/lightfilter-hero-living_ka1oae.png", width: 1200, height: 630, alt: "Custom shades for living rooms — World Wide Shades" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Shades for Living Rooms | World Wide Shades",
    description: "Your living room sets the tone for your entire home. Custom shades in 700+ fabrics — light filtering, blackout, or motorized. Factory-direct from $250.",
    images: ["https://res.cloudinary.com/dcmlcfynd/image/upload/c_fill,w_1200,h_630,g_auto/v1774397716/lightfilter-hero-living_ka1oae.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "Custom Living Room Shades",
      description:
        "Custom living room shades in 700+ fabrics. Light filtering for soft glow, blackout for movie nights. Factory-direct pricing. Made in USA, ships in 7 days.",
      brand: {
        "@type": "Brand",
        name: "World Wide Shades",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "250",
        highPrice: "900",
        priceCurrency: "USD",
        availability: "https://schema.org/InStock",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        reviewCount: "500",
        bestRating: "5",
        worstRating: "1",
      },
    },
    {
      "@type": "FAQPage",
      mainEntity: [
        {
          "@type": "Question",
          name: "Should I choose light filtering or blackout for my living room?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "It depends how you use the room. If you live in the space during the day — reading, entertaining, working — light filtering is usually the better choice. It softens harsh glare while keeping the room bright and airy. If your living room doubles as a media room or home theater, blackout gives you complete light control for movie night. Many homeowners do both: light filtering on the main windows and blackout on the media wall.",
          },
        },
        {
          "@type": "Question",
          name: "Can I mix light filtering and blackout shades in one room?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely — and it's a very common approach. A typical living room might have light filtering shades on the front windows (for that warm, diffused glow during the day) and a blackout shade on the media wall behind the TV. You can use the same fabric color across both shade types so the room looks cohesive even with different opacity levels.",
          },
        },
        {
          "@type": "Question",
          name: "What fabrics look best in a living room?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "For living rooms, linen-look textures, woven neutrals, and natural tones tend to read as 'designed' rather than functional. Our most popular living room fabrics are in the warm white, cream, greige, and soft gray range — colors that complement virtually any decor. Textured weaves from Texstyle and Phifer are particularly popular. Order free swatches to see how colors look in your actual lighting before you commit.",
          },
        },
        {
          "@type": "Question",
          name: "Can you do floor-to-ceiling or panoramic windows?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We build shades for large-format windows including floor-to-ceiling panels, sliding glass doors, and panoramic openings. Oversized windows are priced in our Large Windows tier ($400–$900). For extremely wide spans, we can split across two shades with a shared bracket for a seamless look. Motorization is strongly recommended for large windows — raising a 9-foot shade by hand every day gets old quickly.",
          },
        },
        {
          "@type": "Question",
          name: "Will shades help with my energy bill?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, measurably. Light filtering shades reduce solar heat gain by blocking UV rays while still admitting visible light. On south and west-facing windows especially, this can reduce cooling load in summer. Blackout fabrics provide an additional thermal layer. Exact savings depend on your climate, window size, and HVAC system — but custom-fit shades always outperform stock options because there are no gaps for heat to leak through.",
          },
        },
        {
          "@type": "Question",
          name: "How do I match shades across an open-concept space?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "The simplest approach is to pick one fabric and one color for all windows in your open-concept living/dining area. Even if some windows have different sizes or orientations, using the same fabric creates a cohesive, designed look. Use our AI visualizer to preview how the fabric reads across the whole space. If you want different opacity levels in different zones, choosing the same face color across both light filtering and blackout will keep the look unified.",
          },
        },
        {
          "@type": "Question",
          name: "Can I get motorized for all my living room windows?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes, and it's one of the most popular upgrades for living rooms. Motorized shades let you control the entire room with a single voice command or app tap — perfect for managing light across multiple windows simultaneously. Our motors are compatible with Alexa, Google Home, Apple HomeKit, and SmartThings. Motorization starts at +$250 per shade. For large rooms with many windows, we recommend the Pulse PRO Smart Hub for grouped control.",
          },
        },
        {
          "@type": "Question",
          name: "What if my windows are different sizes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Every shade is built to your exact window dimensions — down to ⅛ inch. Having windows of different sizes is completely normal and causes no issues. You measure each window individually, enter the dimensions in our builder, and each shade is manufactured to spec. There's no penalty or upcharge for having a mix of window sizes in the same order.",
          },
        },
      ],
    },
    {
      "@type": "Organization",
      name: "World Wide Shades LLC",
      url: "https://worldwideshades.com",
      telephone: "+18446742716",
      description: "Factory-direct custom roller shades. Made in USA.",
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        {
          "@type": "ListItem",
          position: 1,
          name: "Home",
          item: "https://worldwideshades.com",
        },
        {
          "@type": "ListItem",
          position: 2,
          name: "Roller Shades",
          item: "https://worldwideshades.com",
        },
        {
          "@type": "ListItem",
          position: 3,
          name: "Living Room Shades",
          item: "https://worldwideshades.com/rooms/living-room",
        },
      ],
    },
  ],
}

export default function LivingRoomShadesPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── 1. HERO ─────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden"
        style={{
          backgroundImage:
            "url(https://plus.unsplash.com/premium_photo-1661902934269-17eaf4b04f9f?auto=format&fit=crop&w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Warm cream overlay — bright, airy, NOT dark */}
        <div className="absolute inset-0 bg-cream/70" />
        {/* Noise texture */}
        <div className="noise-overlay absolute inset-0 pointer-events-none" />

        <div className="relative z-10 container-site section-padding flex flex-col items-center gap-6 px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-dark/10 border border-dark/20 rounded-full px-4 py-1.5 text-xs font-sans font-semibold tracking-widest text-dark uppercase">
            Light Filtering&nbsp;·&nbsp;Blackout&nbsp;·&nbsp;Motorized
          </div>

          {/* H1 */}
          <h1 className="heading-display font-serif text-dark max-w-4xl leading-tight">
            The Room Everyone Sees{" "}
            <span className="gold-gradient-text">Deserves Better Shades</span>
          </h1>

          {/* Subtext */}
          <p className="font-sans text-lg md:text-xl text-dark/70 max-w-2xl leading-relaxed">
            Your living room sets the tone for your entire home. Custom shades that control light
            beautifully, protect your furniture, and look like they were chosen by a designer.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a
              href="/builder"
              className="inline-block bg-gold text-dark font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200"
            >
              Design Your Living Room Shades
            </a>
            <a
              href="/swatches"
              className="inline-block border border-dark/40 text-dark font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-dark/10 transition-colors duration-200"
            >
              Order Free Swatches
            </a>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm font-sans text-dark/60">
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-gold fill-gold" />
              4.9/5 Rating
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-gold" />
              Ships ~7 Days
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-gold" />
              100% Fit Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <Factory className="w-4 h-4 text-gold" />
              Made in USA
            </span>
          </div>
        </div>
      </section>

      {/* ─── 2. STATS BAR ────────────────────────────────────── */}
      <section className="bg-dark border-y border-white/10">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { number: "700+", label: "Premium Fabrics" },
              { number: "~7 Days", label: "Delivered" },
              { number: "$250+", label: "Factory-Direct" },
              { number: "USA", label: "Made Here" },
            ].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-8 px-4 text-center">
                <span className="font-serif text-3xl md:text-4xl font-bold text-gold leading-none">
                  {stat.number}
                </span>
                <span className="font-sans text-sm text-warm-gray mt-2 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. THE LIVING ROOM PROBLEM ──────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">
              Your Living Room Deserves More Than &ldquo;Good Enough&rdquo;
            </h2>
            <p className="font-sans text-warm-gray mt-3 max-w-xl mx-auto">
              The most visible room in your home — and most shades in it are an afterthought.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: <Sun className="w-6 h-6 text-gold" />,
                title: "Harsh Afternoon Glare",
                body: "Sun turns your living room into a greenhouse. Guests squint. You can't see the TV.",
              },
              {
                icon: <Armchair className="w-6 h-6 text-gold" />,
                title: "Fading Furniture",
                body: "UV rays silently destroying your sofa, rug, hardwood, and artwork every single day.",
              },
              {
                icon: <Eye className="w-6 h-6 text-gold" />,
                title: "No Privacy After Dark",
                body: "When lights are on inside, your living room becomes a fishbowl for the whole street.",
              },
              {
                icon: <ShieldOff className="w-6 h-6 text-gold" />,
                title: "Stock Shades Look Cheap",
                body: "Ill-fitting blinds from Amazon or Home Depot cheapen the entire room instantly.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white rounded-lg border border-cream-dark p-7 flex flex-col gap-3 shadow-sm"
              >
                <div className="w-11 h-11 rounded-full bg-cream-dark flex items-center justify-center shrink-0">
                  {item.icon}
                </div>
                <h3 className="font-serif text-base font-bold text-dark leading-snug">
                  {item.title}
                </h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. LIGHT FILTERING VS BLACKOUT ──────────────────── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">
              Choose Your Vibe
            </p>
            <h2 className="heading-section font-serif text-white">
              Light Filtering vs Blackout
            </h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">
              Both are available in 700+ fabrics. Your living room, your call.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 mb-8">
            {/* Light Filtering Card */}
            <div className="bg-cream rounded-lg overflow-hidden shadow-xl flex flex-col">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1774311237295-a65a4c1ff38a?auto=format&fit=crop&w=1200&q=80"
                  alt="Bright living room with light filtering shades"
                  className="w-full h-56 object-cover"
                />
                <span className="absolute top-3 left-3 bg-gold text-dark font-sans text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full">
                  Most Popular for Living Rooms
                </span>
              </div>
              <div className="p-8 flex flex-col gap-4 flex-1">
                <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">
                  Light Filtering
                </p>
                <h3 className="font-serif text-2xl font-bold text-dark leading-snug">
                  Soft, Diffused Glow
                </h3>
                <p className="font-sans text-warm-gray leading-relaxed text-sm flex-1">
                  Preserves your views. Reduces glare without killing the light. Blocks UV rays to
                  protect furniture and art. The choice for living rooms that are lived in during
                  the day — bright, airy, and beautifully designed.
                </p>
                <ul className="space-y-2">
                  {[
                    "Diffuses harsh sunlight",
                    "Maintains outside views",
                    "UV protection for furniture",
                    "479+ fabric options",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2 font-sans text-sm text-dark">
                      <Check className="w-4 h-4 text-gold shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/builder"
                  className="inline-block mt-2 text-center bg-dark text-white font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-dark-soft transition-colors duration-200"
                >
                  Build Light Filtering Shades
                </a>
              </div>
            </div>

            {/* Blackout Card */}
            <div className="bg-dark-soft rounded-lg overflow-hidden shadow-xl flex flex-col">
              <div className="relative">
                <img
                  src="https://images.unsplash.com/photo-1609423433459-a65b330ef5da?auto=format&fit=crop&w=800&q=80"
                  alt="Living room with blackout shades for movie night"
                  className="w-full h-56 object-cover"
                />
                <span className="absolute top-3 left-3 bg-white/20 text-white font-sans text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full border border-white/30">
                  Media Room Favorite
                </span>
              </div>
              <div className="p-8 flex flex-col gap-4 flex-1">
                <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">
                  Blackout
                </p>
                <h3 className="font-serif text-2xl font-bold text-white leading-snug">
                  Total Darkness. On Demand.
                </h3>
                <p className="font-sans text-warm-gray leading-relaxed text-sm flex-1">
                  Complete light control for movie nights. Home theater vibes. 100% light blocking.
                  The choice for living rooms that double as media rooms — and for anyone who wants
                  a true cinematic experience at home.
                </p>
                <ul className="space-y-2">
                  {[
                    "100% light blocking",
                    "Cinema-quality darkness",
                    "Motorized voice control",
                    "200+ fabric options",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2 font-sans text-sm text-white">
                      <Check className="w-4 h-4 text-gold shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="/builder"
                  className="inline-block mt-2 text-center border border-gold text-gold font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-gold hover:text-dark transition-colors duration-200"
                >
                  Build Blackout Shades
                </a>
              </div>
            </div>
          </div>

          <p className="text-center font-sans text-warm-gray text-sm">
            Not sure?{" "}
            <a href="/swatches" className="text-gold hover:underline font-semibold">
              Order free swatches of both
            </a>{" "}
            and see them in your room before you decide.
          </p>
        </div>
      </section>

      {/* ─── 5. DESIGN SHOWCASE ──────────────────────────────── */}
      <section className="section-padding bg-cream-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">
              Design Showcase
            </p>
            <h2 className="heading-section font-serif text-dark">
              Every Living Room. One Solution.
            </h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">
              See how custom shades transform the three most common living room types.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                badge: "Open Concept",
                badgeColor: "bg-gold text-dark",
                image:
                  "https://images.unsplash.com/photo-1718030463382-896949a8d53a?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Open concept living and dining space with large windows",
                label: "Open Concept Living/Dining",
                title: "One Shade, Unified Design",
                body: "Large windows, open floor plans. Matching shades across your entire space create a cohesive, designed look — not a mix of mismatched treatments from different shopping trips.",
              },
              {
                badge: "Entertainment",
                badgeColor: "bg-white/20 text-white border border-white/30",
                image:
                  "https://images.unsplash.com/photo-1638885930125-85350348d266?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Entertainment living room with motorized shades",
                label: "Entertainment Living Room",
                title: "Movie Night, On Demand",
                body: "Light filtering during the day. Blackout for movie night. Motorized lets you switch the whole room to cinema mode with a single voice command — no remotes, no fumbling.",
              },
              {
                badge: "Formal",
                badgeColor: "bg-white/20 text-white border border-white/30",
                image:
                  "https://images.unsplash.com/photo-1613545325268-9265e1609167?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Formal living room with premium fabric shades",
                label: "Formal Living Room",
                title: "The First Impression",
                body: "Premium linen textures, woven neutrals, designer colors that complement your decor. The living room is where shades stop being functional and start being a design choice.",
              },
            ].map((scenario) => (
              <div
                key={scenario.label}
                className="bg-dark rounded-lg overflow-hidden flex flex-col shadow-lg"
              >
                <div className="relative">
                  <img
                    src={scenario.image}
                    alt={scenario.imageAlt}
                    className="w-full h-52 object-cover"
                  />
                  <span
                    className={`absolute top-3 left-3 font-sans text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${scenario.badgeColor}`}
                  >
                    {scenario.badge}
                  </span>
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">
                    {scenario.label}
                  </p>
                  <h3 className="font-serif text-lg font-bold text-white leading-snug">
                    {scenario.title}
                  </h3>
                  <p className="font-sans text-sm text-warm-gray leading-relaxed flex-1">
                    {scenario.body}
                  </p>
                  <a
                    href="/builder"
                    className="inline-block mt-2 text-center border border-gold text-gold font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-gold hover:text-dark transition-colors duration-200"
                  >
                    Design This Look
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. AI BUILDER ───────────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://worldwideshades.com/cdn/shop/files/living-room-white-blackout-roller-shade.png?v=1754081490"
                alt="Living room with white roller shade"
                className="w-full h-full object-cover"
                style={{ minHeight: "380px" }}
              />
            </div>

            {/* Text */}
            <div className="flex flex-col gap-5">
              <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">
                AI-Powered
              </p>
              <h2 className="heading-section font-serif text-dark leading-tight">
                Preview Your Living Room Shades Before You Commit
              </h2>
              <p className="font-sans text-warm-gray leading-relaxed">
                Upload a photo of your living room. Our AI visualizer renders your chosen fabric
                and color in your actual space — so you can see exactly how it looks before
                ordering. No guessing. No surprises.
              </p>

              {/* Steps */}
              <ol className="space-y-3 mt-2">
                {[
                  "Upload your living room photo",
                  "Choose fabric, opacity & color",
                  "See the preview instantly",
                ].map((step, i) => (
                  <li key={step} className="flex items-center gap-3 font-sans text-dark">
                    <span className="w-7 h-7 rounded-full bg-gold text-dark font-bold text-sm flex items-center justify-center shrink-0">
                      {i + 1}
                    </span>
                    {step}
                  </li>
                ))}
              </ol>

              <a
                href="/builder"
                className="inline-block self-start bg-dark text-white font-sans font-semibold text-sm px-8 py-4 rounded-sm hover:bg-dark-soft transition-colors duration-200 mt-2"
              >
                Try the AI Visualizer
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. FABRIC OPTIONS ───────────────────────────────── */}
      <section
        className="section-padding relative overflow-hidden"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/premium-photo/black-fabric-luxury-cloth-texture-pattern-background_293060-5660.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-dark/85" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">
              Premium Textiles
            </p>
            <h2 className="heading-section font-serif text-white mb-4">
              700+ Fabrics. Your Living Room, Your Style.
            </h2>
            <p className="font-sans text-warm-gray text-lg max-w-xl mx-auto">
              Curated from the world&rsquo;s leading textile mills. Every fabric made to your exact
              window dimensions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                type: "Light Filtering",
                count: "479 options",
                desc: "Soft, diffused glow. Reduces glare, preserves views, blocks UV. The living room standard.",
              },
              {
                type: "Blackout",
                count: "200+ options",
                desc: "Total light control. Same designer fabrics with a light-blocking backing for movie nights.",
              },
              {
                type: "Solar / Screen",
                count: "UV blocking",
                desc: "View-through daytime privacy. See out, block UV, reduce heat gain without losing the view.",
              },
            ].map((cat) => (
              <div
                key={cat.type}
                className="bg-dark/60 border border-white/15 rounded-lg p-7 flex flex-col gap-3 backdrop-blur-sm"
              >
                <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">
                  {cat.type}
                </p>
                <p className="font-serif text-2xl font-bold text-white">{cat.count}</p>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{cat.desc}</p>
              </div>
            ))}
          </div>

          {/* Brand names */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Texstyle", "Phifer", "Ferrari", "Mermet", "Senbesta", "Copaco"].map((brand) => (
              <span
                key={brand}
                className="font-sans font-semibold text-sm text-white border border-white/25 rounded-sm px-5 py-2.5 hover:border-gold hover:text-gold transition-colors duration-200"
              >
                {brand}
              </span>
            ))}
          </div>

          <div className="text-center">
            <a
              href="/swatches"
              className="inline-block bg-gold text-dark font-sans font-semibold text-sm px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200"
            >
              Order Free Swatches
            </a>
          </div>
        </div>
      </section>

      {/* ─── 8. HOW IT WORKS ─────────────────────────────────── */}
      <section className="section-padding bg-cream-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">How It Works</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">
              From measurement to a room you&rsquo;re proud of — four simple steps.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Ruler className="w-6 h-6 text-gold" />,
                step: "01",
                heading: "Measure Your Window",
                body: "Use our simple guide. Inside or outside mount — we've got you covered. Takes 5 minutes.",
              },
              {
                icon: <Palette className="w-6 h-6 text-gold" />,
                step: "02",
                heading: "Pick Your Fabric",
                body: "700+ fabrics. Light filtering, blackout, or solar. Order free swatches or use the AI visualizer.",
              },
              {
                icon: <Hammer className="w-6 h-6 text-gold" />,
                step: "03",
                heading: "We Build It",
                body: "Manufactured in the USA to your exact dimensions. Quality-checked and ships in ~7 days via FedEx.",
              },
              {
                icon: <CheckCircle className="w-6 h-6 text-gold" />,
                step: "04",
                heading: "Easy Install",
                body: "4 screws. 15 minutes. All hardware included. 100% Fit Guarantee — if it doesn't fit, we remake it.",
              },
            ].map((s) => (
              <div key={s.step} className="flex flex-col gap-3">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-full bg-dark flex items-center justify-center shrink-0">
                    {s.icon}
                  </div>
                  <span className="font-sans font-bold text-2xl text-dark-muted opacity-40 leading-none">
                    {s.step}
                  </span>
                </div>
                <h3 className="font-serif text-lg font-bold text-dark">{s.heading}</h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <a
              href="/builder"
              className="inline-block bg-gold text-dark font-sans font-semibold text-sm px-10 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200"
            >
              Start Designing
            </a>
          </div>
        </div>
      </section>

      {/* ─── 9. COMPARISON TABLE ─────────────────────────────── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="text-center mb-10">
            <h2 className="heading-section font-serif text-white">
              See How We Compare — Honestly
            </h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">
              We&rsquo;re not afraid to stack up against the competition. Here&rsquo;s the truth.
            </p>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full font-sans text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 text-warm-gray font-semibold w-1/4"></th>
                  <th className="py-4 px-4 text-center font-bold text-white bg-dark-soft border-t-2 border-gold rounded-t-sm">
                    World Wide Shades
                  </th>
                  <th className="py-4 px-4 text-center font-semibold text-warm-gray">
                    The Shade Store
                  </th>
                  <th className="py-4 px-4 text-center font-semibold text-warm-gray">
                    Amazon / Stock
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  {
                    label: "Custom Sizing",
                    wws: true,
                    shade: true,
                    amazon: false,
                  },
                  {
                    label: "Fabric Selection",
                    wws: "700+",
                    shade: "100–150",
                    amazon: "10–20",
                  },
                  {
                    label: "Shipping Speed",
                    wws: "~7 Days",
                    shade: "3–4 Weeks",
                    amazon: "2–5 Days (stock)",
                  },
                  {
                    label: "AI Preview",
                    wws: true,
                    shade: false,
                    amazon: false,
                  },
                  {
                    label: "Made in USA",
                    wws: true,
                    shade: "Partial",
                    amazon: false,
                  },
                  {
                    label: "Fit Guarantee",
                    wws: true,
                    shade: false,
                    amazon: false,
                  },
                  {
                    label: "Motorized Available",
                    wws: true,
                    shade: true,
                    amazon: "Limited",
                  },
                ].map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-dark-muted/30" : ""}
                  >
                    <td className="py-3 px-4 text-warm-gray font-medium">{row.label}</td>
                    <td className="py-3 px-4 text-center bg-dark-soft text-gold font-semibold">
                      {typeof row.wws === "boolean" ? (
                        row.wws ? (
                          <Check className="w-5 h-5 text-gold mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 mx-auto" />
                        )
                      ) : (
                        row.wws
                      )}
                    </td>
                    <td className="py-3 px-4 text-center text-warm-gray">
                      {typeof row.shade === "boolean" ? (
                        row.shade ? (
                          <Check className="w-5 h-5 text-warm-gray mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 mx-auto" />
                        )
                      ) : (
                        row.shade
                      )}
                    </td>
                    <td className="py-3 px-4 text-center text-warm-gray">
                      {typeof row.amazon === "boolean" ? (
                        row.amazon ? (
                          <Check className="w-5 h-5 text-warm-gray mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 mx-auto" />
                        )
                      ) : (
                        row.amazon
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── 10. PRICING ─────────────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">Simple, Factory-Direct Pricing</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-xl mx-auto">
              No showroom markup. No quote process. Real pricing, upfront.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {[
              {
                tier: "Small Windows",
                range: "$250 – $350",
                popular: false,
                rooms: "Side windows, accent windows",
                desc: "Perfect for smaller accent windows that still deserve designer treatment.",
                note: null,
              },
              {
                tier: "Standard Windows",
                range: "$300 – $600",
                popular: true,
                rooms: "Standard living room windows",
                desc: "Our most popular size range. Covers the majority of residential living room windows.",
                note: "Most Popular",
              },
              {
                tier: "Large Windows",
                range: "$400 – $900",
                popular: false,
                rooms: "Floor-to-ceiling, sliding doors, panoramic",
                desc: "Perfect for open concept spaces. Big windows demand precision — we deliver it at scale.",
                note: "Perfect for Open Concept",
              },
            ].map((card) => (
              <div
                key={card.tier}
                className={`relative flex flex-col rounded-lg border p-8 shadow-md ${
                  card.popular
                    ? "border-gold bg-dark text-white"
                    : "border-cream-dark bg-white text-dark"
                }`}
              >
                {card.popular && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-dark font-sans font-bold text-xs uppercase tracking-widest px-4 py-1 rounded-full">
                    Most Popular
                  </span>
                )}
                {!card.popular && card.note && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-dark text-white font-sans font-bold text-xs uppercase tracking-widest px-4 py-1 rounded-full">
                    {card.note}
                  </span>
                )}
                <p
                  className={`font-sans text-xs font-bold tracking-widest uppercase mb-2 ${
                    card.popular ? "text-gold" : "text-warm-gray"
                  }`}
                >
                  {card.tier}
                </p>
                <p
                  className={`font-serif text-4xl font-bold mb-1 ${
                    card.popular ? "text-white" : "text-dark"
                  }`}
                >
                  {card.range}
                </p>
                <p className="font-sans text-sm text-warm-gray mb-5">{card.rooms}</p>
                <p className="font-sans text-sm text-warm-gray mb-6 leading-relaxed">{card.desc}</p>

                <ul className="space-y-2 mb-6">
                  {[
                    "Custom-made to your specs",
                    "Light filtering or blackout",
                    "Free shipping",
                    "Hardware included",
                    "100% Fit Guarantee",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2 font-sans text-sm">
                      <Check
                        className={`w-4 h-4 shrink-0 ${card.popular ? "text-gold" : "text-gold"}`}
                      />
                      <span className="text-warm-gray">{f}</span>
                    </li>
                  ))}
                </ul>

                <p className="font-sans text-xs text-warm-gray/70 mb-6">
                  Motorized upgrade from +$250
                </p>

                <a
                  href="/builder"
                  className={`block text-center font-sans font-semibold text-sm px-6 py-3 rounded-sm transition-colors duration-200 mt-auto ${
                    card.popular
                      ? "bg-gold text-dark hover:bg-gold-dark"
                      : "bg-dark text-white hover:bg-dark-soft"
                  }`}
                >
                  Get Your Exact Price
                </a>
              </div>
            ))}
          </div>

          <p className="text-center font-sans text-sm text-warm-gray">
            Financing available with Affirm at checkout. Subject to credit approval.
          </p>
        </div>
      </section>

      {/* ─── 11. REVIEWS ─────────────────────────────────────── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-2">
              Customer Reviews
            </p>
            <h2 className="heading-section font-serif text-white">
              4.9/5 from 500+ Verified Homeowners
            </h2>
            <div className="flex justify-center gap-1 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gold fill-gold" />
              ))}
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Amanda & Steve P.",
                location: "Nashville, TN",
                room: "Living Room",
                quote:
                  "Our open-concept living room has 8 windows. We ordered light filtering for all of them — the room looks like it belongs in a magazine. Warm, even light all day.",
              },
              {
                name: "Chris D.",
                location: "Miami, FL",
                room: "Media Room",
                quote:
                  "I went with blackout for our media wall and light filtering for the rest. The motorized option means I can switch the whole room to movie mode with one voice command.",
              },
              {
                name: "Lauren K.",
                location: "San Diego, CA",
                room: "Living Room",
                quote:
                  "The AI visualizer sold me. I uploaded a photo of our living room and could see exactly how each fabric looked. The shades arrived in 6 days. Flawless.",
              },
            ].map((review) => (
              <div
                key={review.name}
                className="bg-dark-soft rounded-lg p-7 flex flex-col gap-4"
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>

                <p className="font-sans text-warm-gray leading-relaxed text-sm">
                  &ldquo;{review.quote}&rdquo;
                </p>

                <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
                  <div>
                    <p className="font-sans font-semibold text-white text-sm">{review.name}</p>
                    <p className="font-sans text-xs text-warm-gray">
                      {review.location} · {review.room}
                    </p>
                  </div>
                  <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold border border-gold/40 rounded-full px-3 py-1">
                    Verified Buyer
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 12. FAQ ─────────────────────────────────────────── */}
      <section className="section-padding bg-dark-muted">
        <div className="container-narrow px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-white">Frequently Asked Questions</h2>
            <p className="font-sans text-warm-gray mt-3">
              Everything you need to know before ordering living room shades.
            </p>
          </div>

          <div className="space-y-2">
            {[
              {
                q: "Should I choose light filtering or blackout for my living room?",
                a: "It depends how you use the room. If you live in the space during the day — reading, entertaining, working from home — light filtering is usually the better choice. It softens harsh glare while keeping the room bright and airy. If your living room doubles as a media room or home theater, blackout gives you complete light control for movie night. Many homeowners do both: light filtering on the main windows and blackout on the media wall.",
              },
              {
                q: "Can I mix light filtering and blackout shades in one room?",
                a: "Absolutely — and it's a very common approach. A typical living room might have light filtering shades on the front windows and a blackout shade on the media wall behind the TV. Use the same fabric color across both shade types and the room looks cohesive even with different opacity levels. Our AI visualizer lets you preview this exact combination.",
              },
              {
                q: "What fabrics look best in a living room?",
                a: "For living rooms, linen-look textures, woven neutrals, and natural tones read as 'designed' rather than just functional. Our most popular living room fabrics are in the warm white, cream, greige, and soft gray range — colors that complement virtually any decor. Textured weaves from Texstyle and Phifer are particularly popular. Order free swatches to see how colors look in your actual lighting before you commit.",
              },
              {
                q: "Can you do floor-to-ceiling or panoramic windows?",
                a: "Yes. We build shades for large-format windows including floor-to-ceiling panels, sliding glass doors, and panoramic openings. These fall in our Large Windows tier ($400–$900). For extremely wide spans, we can split across two shades with a shared bracket for a seamless look. Motorization is strongly recommended for large windows — raising a 9-foot shade by hand every day gets old quickly.",
              },
              {
                q: "Will shades help with my energy bill?",
                a: "Yes, measurably. Light filtering shades reduce solar heat gain by blocking UV rays while still admitting visible light. On south and west-facing windows especially, this can significantly reduce cooling load in summer. Blackout fabrics provide an additional thermal barrier. Custom-fit shades always outperform stock options because there are no gaps for heat to leak through.",
              },
              {
                q: "How do I match shades across an open-concept space?",
                a: "The simplest approach is to pick one fabric and one color for all windows in your open-concept living/dining area. Even if windows have different sizes or orientations, using the same fabric creates a cohesive, designed look. Use our AI visualizer to preview how the fabric reads across the whole space. If you want different opacity levels in different zones, choosing the same face color across both light filtering and blackout keeps the look unified.",
              },
              {
                q: "Can I get motorized for all my living room windows?",
                a: "Yes, and it's one of the most popular upgrades for living rooms. Motorized shades let you control the entire room with a single voice command or app tap — perfect for managing light across multiple windows simultaneously. Our motors are compatible with Alexa, Google Home, Apple HomeKit, and SmartThings. Motorization starts at +$250 per shade.",
              },
              {
                q: "What if my windows are different sizes?",
                a: "Every shade is built to your exact window dimensions — down to ⅛ inch. Having windows of different sizes is completely normal and causes no issues. You measure each window individually, enter the dimensions in our builder, and each shade is manufactured to spec. There's no penalty or upcharge for a mix of window sizes in the same order.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-dark rounded-lg border border-white/10 overflow-hidden"
              >
                <summary className="flex justify-between items-center gap-4 px-6 py-5 cursor-pointer list-none font-sans font-semibold text-white text-sm hover:text-gold transition-colors duration-200">
                  {faq.q}
                  <span className="shrink-0 text-gold text-xl font-light group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5">
                  <p className="font-sans text-sm text-warm-gray leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 13. FINAL CTA ───────────────────────────────────── */}
      <section
        className="relative section-padding flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage:
            "url(https://plus.unsplash.com/premium_photo-1661922983577-f9c532b9f888?auto=format&fit=crop&w=1200&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-dark/80" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />

        <div className="relative z-10 container-narrow px-4 flex flex-col items-center gap-6">
          <h2 className="heading-section font-serif text-white max-w-2xl leading-tight">
            <span className="gold-gradient-text">Your Living Room Sets the Tone.</span>
          </h2>
          <p className="font-sans text-warm-gray text-xl max-w-lg">
            Make it unforgettable.
          </p>
          <p className="font-sans text-warm-gray text-base max-w-xl">
            Custom shades built to your exact windows — beautiful light, protected furniture, and a
            room that looks designed. Factory-direct in 7 days.
          </p>

          <a
            href="/builder"
            className="inline-block bg-gold text-dark font-sans font-semibold text-base px-10 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200 mt-2"
          >
            Design Your Living Room Shades
          </a>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-sans text-warm-gray mt-2">
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-gold" />
              100% Fit Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-gold" />
              ~7 Days
            </span>
            <span className="flex items-center gap-1.5">
              <Check className="w-4 h-4 text-gold" />
              Free Shipping
            </span>
            <span className="flex items-center gap-1.5">
              <Factory className="w-4 h-4 text-gold" />
              Made in USA
            </span>
          </div>

          <p className="font-sans text-warm-gray/70 text-sm mt-2">
            Questions? Call us at{" "}
            <a
              href="tel:+18446742716"
              className="text-gold hover:underline"
            >
              (844) 674-2716
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
