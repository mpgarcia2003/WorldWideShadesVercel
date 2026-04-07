import type { Metadata } from "next"
import {
  Star,
  Sun,
  Eye,
  ShieldAlert,
  Ruler,
  Sparkles,
  EyeOff,
  Shield,
  Truck,
  Factory,
  Check,
  X,
  Palette,
  Hammer,
  CheckCircle,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Custom Light Filtering Roller Shades | Soft Natural Light, Ships 7 Days — World Wide Shades",
  description:
    "Custom light filtering roller shades that soften harsh sunlight without blocking your view. 479 premium fabrics, factory-direct from $250, 100% fit guarantee. Made in USA, ships in 7 days.",
  openGraph: {
    title: "Custom Light Filtering Roller Shades | World Wide Shades",
    description:
      "Stop fighting harsh sunlight. Custom light filtering shades with 479 fabrics, shipped in 7 days. Factory-direct pricing from $250.",
    url: "https://worldwideshades.com/light-filtering-shades",
    siteName: "World Wide Shades",
    type: "website",
    images: [{ url: "https://res.cloudinary.com/dcmlcfynd/image/upload/c_fill,w_1200,h_630,g_auto/v1774397716/lightfilter-hero-living_ka1oae.png", width: 1200, height: 630, alt: "Custom light filtering roller shades in a bright living room — World Wide Shades" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Light Filtering Roller Shades | World Wide Shades",
    description: "Custom light filtering roller shades that soften harsh sunlight without blocking your view. 479 premium fabrics, factory-direct from $250.",
    images: ["https://res.cloudinary.com/dcmlcfynd/image/upload/c_fill,w_1200,h_630,g_auto/v1774397716/lightfilter-hero-living_ka1oae.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "Custom Light Filtering Roller Shades",
      description:
        "Custom light filtering roller shades that soften harsh sunlight without blocking your view. 479 premium fabrics, factory-direct pricing. Made in USA, ships in 7 days.",
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
          name: "What's the difference between light filtering and blackout?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Light filtering shades soften and diffuse incoming sunlight — they reduce glare and harsh direct sun while still allowing a warm, ambient glow into the room. Blackout shades block 100% of all light. Light filtering is ideal for living rooms, dining rooms, and offices where you want privacy and glare control without plunging the room into darkness.",
          },
        },
        {
          "@type": "Question",
          name: "Can people see through light filtering shades from outside?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "During the day, no — light filtering shades provide excellent daytime privacy. The fabric diffuses light so that people outside cannot see clearly into your home. At night, when interior lights are on and it's dark outside, visibility reverses. For nighttime privacy, we recommend pairing with a blackout shade or choosing a denser light filtering opacity.",
          },
        },
        {
          "@type": "Question",
          name: "What if I measure wrong?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We offer a 100% Fit Guarantee. If your shades don't fit because of our measurement guide, we'll remake them at no charge. Our simple measurement guide walks you through inside or outside mount measurements, and our team is available to review your measurements before production begins.",
          },
        },
        {
          "@type": "Question",
          name: "How fast do you ship?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We ship in approximately 7 business days from order confirmation. Most traditional custom shade brands take 3–4 weeks. We've streamlined our factory process so your shades arrive quickly without sacrificing quality. You'll receive a tracking number and FedEx delivery estimate.",
          },
        },
        {
          "@type": "Question",
          name: "Can I get fabric samples first?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. We offer free fabric swatches so you can see and feel the material before committing. Order up to 10 swatches for free — just cover standard shipping. We strongly recommend pairing physical swatches with our AI visualizer to see how the fabric filters light in your specific room.",
          },
        },
        {
          "@type": "Question",
          name: "What are the best fabrics for light filtering?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our most popular light filtering fabrics come from Phifer, Mermet, and Texstyle — premium mills known for their open-weave sheers and linen blends. For maximum diffusion with soft warmth, we recommend a 3–5% openness factor. For more privacy and glare control, a 1–3% openness is ideal. Our free swatches let you compare in person.",
          },
        },
        {
          "@type": "Question",
          name: "Do light filtering shades help with energy efficiency?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Light filtering shades block a significant portion of solar heat gain — typically 40–70% depending on the fabric's solar reflectance. This reduces the load on your air conditioning in summer while still allowing diffused natural light. In winter, they help insulate windows while maintaining a bright, airy feel.",
          },
        },
        {
          "@type": "Question",
          name: "Can I add motorization?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — motorization is available for all light filtering roller shades. Control them via voice (Alexa, Google Home, Apple HomeKit), smartphone app, or a simple remote. You can also set sun-triggered schedules to automatically lower shades during peak sunlight hours. We recommend deciding on motorization at time of order for the cleanest installation.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer financing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We offer financing through Affirm at checkout. Split your purchase into monthly payments — 0% APR options may be available depending on creditworthiness. Subject to credit approval. No hidden fees or prepayment penalties.",
          },
        },
        {
          "@type": "Question",
          name: "Are light filtering roller shades worth it?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. Light filtering roller shades are one of the highest-impact upgrades you can make to a living room, dining room, or office. They eliminate blinding glare, reduce heat, preserve furniture from UV damage, and create a warm, polished atmosphere — all while maintaining your connection to natural light and outdoor views. Custom-fit versions look dramatically better than stock sizes.",
          },
        },
        {
          "@type": "Question",
          name: "How much do custom light filtering shades cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our custom light filtering roller shades start at $250 for smaller windows (bathrooms, offices, sidelights) and range up to $900 for large windows, sliding doors, and panoramic installations. Standard living room and dining room windows typically fall in the $300–$600 range. All prices include custom fabrication, premium fabric, free shipping, and hardware.",
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
          name: "Light Filtering Roller Shades",
          item: "https://worldwideshades.com/light-filtering-shades",
        },
      ],
    },
  ],
}

export default function LightFilteringRollerShadesPage() {
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
            "url(https://images.unsplash.com/photo-1754613307941-029aa358987e?auto=format&fit=crop&w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Warm light overlay — airy, not dark */}
        <div className="absolute inset-0 bg-cream/70" />
        {/* Noise texture */}
        <div className="noise-overlay absolute inset-0 pointer-events-none" />

        <div className="relative z-10 container-site section-padding flex flex-col items-center gap-6 px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/70 border border-gold/30 rounded-full px-4 py-1.5 text-xs font-sans font-semibold tracking-widest text-gold-dark uppercase">
            Soft Natural Light&nbsp;·&nbsp;Factory Direct&nbsp;·&nbsp;Made in USA
          </div>

          {/* H1 */}
          <h1 className="heading-display font-serif text-dark max-w-4xl leading-tight">
            Stop Fighting{" "}
            <span className="gold-gradient-text">Harsh Sunlight</span>
          </h1>

          {/* Subtext */}
          <p className="font-sans text-lg md:text-xl text-dark/70 max-w-2xl leading-relaxed">
            Custom light filtering shades that soften harsh sunlight into a warm, beautiful glow —
            without blocking your view. 479 premium fabrics, factory-direct pricing, delivered in 7 days.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a
              href="/builder"
              className="inline-block bg-gold text-dark font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200"
            >
              Design Your Light Filtering Shades
            </a>
            <a
              href="/swatches"
              className="inline-block border border-gold/60 text-dark font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-gold/10 transition-colors duration-200"
            >
              Order Free Swatches
            </a>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm font-sans text-dark/70">
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-gold fill-gold" />
              4.9/5 from 500+ Homeowners
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-gold" />
              Ships in ~7 Days
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
              { number: "479", label: "Premium Fabrics" },
              { number: "~7 Days", label: "Order to Installed" },
              { number: "6", label: "Premium Fabric Brands" },
              { number: "$250+", label: "Factory-Direct Pricing" },
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

      {/* ─── 3. PROBLEM → SOLUTION ───────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">
              Why Your Windows Are Working Against You
            </h2>
            <p className="font-sans text-warm-gray mt-3 max-w-xl mx-auto">
              Bare windows and cheap blinds create real problems. Here's what's happening — and how we fix it.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-0 rounded-lg overflow-hidden shadow-xl">
            {/* Problems */}
            <div className="bg-dark p-8 md:p-12">
              <p className="font-sans text-xs font-bold tracking-widest text-warm-gray uppercase mb-6">
                The Problem
              </p>
              <ul className="space-y-6">
                {[
                  {
                    icon: <Sun className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />,
                    title: "Blinding glare all day",
                    body: "Direct sunlight heats your room, washes out screens, and makes spaces uncomfortable.",
                  },
                  {
                    icon: <Eye className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />,
                    title: "Zero daytime privacy",
                    body: "Bare windows mean neighbors can see everything — no matter the time of day.",
                  },
                  {
                    icon: <ShieldAlert className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />,
                    title: "Furniture is fading",
                    body: "UV rays are quietly destroying your furniture, floors, and artwork day after day.",
                  },
                  {
                    icon: <Ruler className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />,
                    title: "Stock sizes look cheap",
                    body: "Big-box shades sag, gap, and look like afterthoughts instead of design decisions.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    {item.icon}
                    <div>
                      <p className="font-sans font-semibold text-white text-sm">{item.title}</p>
                      <p className="font-sans text-sm text-warm-gray mt-0.5">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Solutions */}
            <div className="bg-dark-soft p-8 md:p-12">
              <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-6">
                The Fix
              </p>
              <ul className="space-y-6">
                {[
                  {
                    icon: <Sparkles className="w-5 h-5 text-gold shrink-0 mt-0.5" />,
                    title: "Soft, diffused light",
                    body: "Transforms harsh sunlight into a warm, even glow that makes every room feel designed.",
                  },
                  {
                    icon: <EyeOff className="w-5 h-5 text-gold shrink-0 mt-0.5" />,
                    title: "Daytime privacy preserved",
                    body: "See the outdoors clearly — they can't see you. Perfect balance of openness and privacy.",
                  },
                  {
                    icon: <Shield className="w-5 h-5 text-gold shrink-0 mt-0.5" />,
                    title: "UV protection built in",
                    body: "Blocks harmful UV rays that fade furniture, floors, and artwork — without darkening your room.",
                  },
                  {
                    icon: <Ruler className="w-5 h-5 text-gold shrink-0 mt-0.5" />,
                    title: "Custom-fit perfection",
                    body: "Built to your exact window dimensions, down to ⅛\". No gaps, no sagging, no guessing.",
                  },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    {item.icon}
                    <div>
                      <p className="font-sans font-semibold text-white text-sm">{item.title}</p>
                      <p className="font-sans text-sm text-warm-gray mt-0.5">{item.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. AI BUILDER SHOWCASE ──────────────────────────── */}
      <section className="section-padding bg-cream-dark">
        <div className="container-site px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1613545325268-9265e1609167?auto=format&fit=crop&w=800&q=80"
                alt="Modern living space with large windows and light filtering shades"
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
                See Your Shades Before You Buy
              </h2>
              <p className="font-sans text-warm-gray leading-relaxed">
                Upload a photo of your window. Our AI visualizer renders your chosen fabric and
                color in your actual room — see exactly how light filters through before you order.
              </p>

              {/* Steps */}
              <ol className="space-y-3 mt-2">
                {[
                  "Upload room photo",
                  "Choose fabric & opacity",
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

      {/* ─── 5. ROOM USE CASES ───────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">Built for Every Room</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">
              Whether you're brightening a living room, perfecting a dining ambiance, or ending screen glare —
              we have your room covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                badge: "Most Popular",
                badgeColor: "bg-gold text-dark",
                image:
                  "https://images.unsplash.com/photo-1617597190828-1bf579d485ee?auto=format&fit=crop&w=1200&q=80",
                imageAlt: "Bright living room with light filtering shades",
                heading: "Living Room",
                title: "Warm, Inviting Atmosphere",
                body: "Soft natural light that eliminates harsh glare while preserving views. The room feels open, airy, and designed — not like you're trying to hide from the sun.",
                cta: "Build for Living Room",
              },
              {
                badge: "Designer Favorite",
                badgeColor: "bg-dark/10 text-dark",
                image:
                  "https://images.unsplash.com/photo-1623658423238-8307df454e11?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Dining room with soft natural light",
                heading: "Dining Room",
                title: "Beautiful Light, Every Meal",
                body: "Morning coffee to dinner parties. Light filtering shades create the perfect ambiance for every occasion — warm, flattering, and always comfortable.",
                cta: "Build for Dining Room",
              },
              {
                badge: "Productivity Pick",
                badgeColor: "bg-dark/10 text-dark",
                image:
                  "https://images.unsplash.com/photo-1774311237295-a65a4c1ff38a?auto=format&fit=crop&w=1920&q=80",
                imageAlt: "Bright home office with light filtering shades",
                heading: "Home Office",
                title: "Reduce Glare, Not Light",
                body: "Eliminate screen glare and eye strain without working in the dark. Stay productive with balanced, diffused light that keeps your space bright all day.",
                cta: "Build for Home Office",
              },
            ].map((room) => (
              <div
                key={room.heading}
                className="bg-white rounded-lg overflow-hidden flex flex-col shadow-md border border-cream-dark"
              >
                <div className="relative">
                  <img
                    src={room.image}
                    alt={room.imageAlt}
                    className="w-full h-52 object-cover"
                  />
                  <span
                    className={`absolute top-3 left-3 font-sans text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${room.badgeColor}`}
                  >
                    {room.badge}
                  </span>
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">
                    {room.heading}
                  </p>
                  <h3 className="font-serif text-lg font-bold text-dark leading-snug">
                    {room.title}
                  </h3>
                  <p className="font-sans text-sm text-warm-gray leading-relaxed flex-1">
                    {room.body}
                  </p>
                  <a
                    href="/builder"
                    className="inline-block mt-2 text-center border border-gold text-gold font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-gold hover:text-dark transition-colors duration-200"
                  >
                    {room.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. FABRIC SHOWCASE ──────────────────────────────── */}
      <section
        className="section-padding relative overflow-hidden"
        style={{
          backgroundImage:
            "url(https://plus.unsplash.com/premium_photo-1673548917043-9facc637bf37?auto=format&fit=crop&w=1200&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-dark/80" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 container-narrow px-4 text-center">
          <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">
            Premium Textiles
          </p>
          <h2 className="heading-section font-serif text-white mb-4">
            479 Premium Light Filtering Fabrics
          </h2>
          <p className="font-sans text-warm-gray text-lg max-w-xl mx-auto mb-10">
            Curated from the world's leading textile mills. Sheers, linens, weaves — in every color.
          </p>

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

          <a
            href="/swatches"
            className="inline-block bg-gold text-dark font-sans font-semibold text-sm px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200"
          >
            Order Free Swatches
          </a>
        </div>
      </section>

      {/* ─── 7. HOW IT WORKS ─────────────────────────────────── */}
      <section className="section-padding bg-cream-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">How It Works</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">
              From measurement to installation — four simple steps to a perfectly lit room.
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
                body: "479 premium light filtering fabrics. Order free swatches or use the AI visualizer to preview in your room.",
              },
              {
                icon: <Hammer className="w-6 h-6 text-gold" />,
                step: "03",
                heading: "We Build It",
                body: "Manufactured in the USA. Quality-checked and packaged carefully. Ships in ~7 days via FedEx.",
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

      {/* ─── 8. COMPARISON TABLE ─────────────────────────────── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="text-center mb-10">
            <h2 className="heading-section font-serif text-white">
              See How We Compare — Honestly
            </h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">
              We're not afraid to stack us up against the competition. Here's the truth.
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
                    Amazon / Big Box
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
                    label: "Pricing",
                    wws: "from $250",
                    shade: "$350–600/window",
                    amazon: "Not custom",
                  },
                  {
                    label: "Fabric Selection",
                    wws: "479",
                    shade: "80+",
                    amazon: "5–15",
                  },
                  {
                    label: "Shipping Speed",
                    wws: "~7 Days",
                    shade: "3–4 Weeks",
                    amazon: "2–3 Days (stock)",
                  },
                  {
                    label: "Free Samples",
                    wws: true,
                    shade: true,
                    amazon: false,
                  },
                  {
                    label: "Made in USA",
                    wws: true,
                    shade: "Sometimes",
                    amazon: false,
                  },
                  {
                    label: "Fit Guarantee",
                    wws: true,
                    shade: false,
                    amazon: false,
                  },
                  {
                    label: "AI Visualizer",
                    wws: true,
                    shade: false,
                    amazon: false,
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

      {/* ─── 9. PRICING ──────────────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">Simple, Factory-Direct Pricing</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-xl mx-auto">
              No showroom markup. No quote process. Real pricing, upfront.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tier: "Small Windows",
                range: "$250 – $350",
                popular: false,
                rooms: "Bathrooms, Home Offices, Sidelights",
                desc: "Perfect for compact spaces that still deserve beautiful, filtered light.",
              },
              {
                tier: "Standard Windows",
                range: "$300 – $600",
                popular: true,
                rooms: "Living Rooms, Dining Rooms, Kitchens",
                desc: "Our most popular size range. Covers the majority of residential windows.",
              },
              {
                tier: "Large Windows",
                range: "$400 – $900",
                popular: false,
                rooms: "Sliding Doors, Panoramic, Open Concept",
                desc: "Big windows demand precision. We deliver the same quality at scale.",
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
                <p className="font-sans text-sm mb-5 text-warm-gray">{card.rooms}</p>
                <p className="font-sans text-sm mb-6 leading-relaxed text-warm-gray">{card.desc}</p>

                <ul className="space-y-2 mb-6">
                  {[
                    "Custom-made to your specs",
                    "Premium light filtering fabric",
                    "Free shipping",
                    "Hardware included",
                    "100% Fit Guarantee",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2 font-sans text-sm">
                      <Check className="w-4 h-4 shrink-0 text-gold" />
                      <span className="text-warm-gray">{f}</span>
                    </li>
                  ))}
                </ul>

                <p className="font-sans text-xs mb-6 text-warm-gray/70">
                  Motorized upgrade available
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

          <p className="text-center font-sans text-sm text-warm-gray mt-8">
            Financing available with Affirm at checkout. Subject to credit approval.
          </p>
        </div>
      </section>

      {/* ─── 10. REVIEWS ─────────────────────────────────────── */}
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
                name: "Sarah M.",
                location: "Austin, TX",
                room: "Living Room",
                quote:
                  "The light in our living room is completely transformed. No more blinding glare, but the room is still bright and airy. Exactly what we wanted.",
              },
              {
                name: "Michael T.",
                location: "Denver, CO",
                room: "Home Office",
                quote:
                  "I can finally work without squinting at my screen. The light filtering effect is perfect — soft, even light all day. And they shipped in 5 days.",
              },
              {
                name: "Jennifer & Mark R.",
                location: "Charlotte, NC",
                room: "Kitchen & Dining",
                quote:
                  "We ordered for three rooms. The AI visualizer was dead-on accurate. The fabric quality exceeded our expectations.",
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

      {/* ─── 11. MOTORIZATION / SMART HOME ───────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-2">
              Motorization
            </p>
            <h2 className="heading-section font-serif text-dark">
              Make It Smart. Add Motorization.
            </h2>
            <p className="font-sans text-warm-gray mt-3 max-w-xl mx-auto">
              Control your shades with your voice, your phone, or a schedule. Set them to lower
              automatically during peak sunlight hours.
            </p>
          </div>

          {/* Smart home badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {["Alexa", "Google Home", "Apple HomeKit", "SmartThings", "Matter"].map((brand) => (
              <span
                key={brand}
                className="font-sans font-semibold text-sm text-dark border border-cream-dark rounded-sm px-5 py-2.5 bg-white shadow-sm"
              >
                {brand}
              </span>
            ))}
          </div>

          {/* Accessories */}
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4 mb-10">
            {[
              { name: "Remote", price: "$50" },
              { name: "Smart Hub", price: "$185" },
              { name: "Sun Sensor", price: "$150" },
              { name: "Motor Charger", price: "$50" },
            ].map((item) => (
              <div
                key={item.name}
                className="bg-white rounded-lg border border-cream-dark p-5 text-center shadow-sm"
              >
                <p className="font-sans font-semibold text-dark text-sm">{item.name}</p>
                <p className="font-serif text-2xl font-bold text-gold mt-2">{item.price}</p>
              </div>
            ))}
          </div>

          <div className="text-center">
            <a
              href="/builder"
              className="inline-block bg-dark text-white font-sans font-semibold text-sm px-10 py-4 rounded-sm hover:bg-dark-soft transition-colors duration-200"
            >
              Build Your Motorized Shade
            </a>
          </div>
        </div>
      </section>

      {/* ─── 12. FAQ ─────────────────────────────────────────── */}
      <section className="section-padding bg-cream-dark">
        <div className="container-narrow px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">Frequently Asked Questions</h2>
            <p className="font-sans text-warm-gray mt-3">
              Everything you need to know before ordering.
            </p>
          </div>

          <div className="space-y-2">
            {[
              {
                q: "What's the difference between light filtering and blackout?",
                a: "Light filtering shades soften and diffuse incoming sunlight — they reduce glare and harsh direct sun while still allowing a warm, ambient glow into the room. Blackout shades block 100% of all light. Light filtering is ideal for living rooms, dining rooms, and offices where you want privacy and glare control without plunging the room into darkness.",
              },
              {
                q: "Can people see through light filtering shades from outside?",
                a: "During the day, no — light filtering shades provide excellent daytime privacy. The fabric diffuses light so that people outside cannot see clearly into your home. At night, when interior lights are on and it's dark outside, visibility reverses. For nighttime privacy, we recommend pairing with a blackout shade or choosing a denser light filtering opacity.",
              },
              {
                q: "What if I measure wrong?",
                a: "We offer a 100% Fit Guarantee. If your shades don't fit because of our measurement guide, we'll remake them at no charge. Our simple measurement guide walks you through inside or outside mount measurements, and our team is available to review your measurements before production begins.",
              },
              {
                q: "How fast do you ship?",
                a: "We ship in approximately 7 business days from order confirmation. Most traditional custom shade brands take 3–4 weeks. We've built a streamlined manufacturing process specifically to shorten this window — without cutting corners on quality. You'll get a tracking number and FedEx delivery estimate.",
              },
              {
                q: "Can I get fabric samples first?",
                a: "Absolutely. We offer free fabric swatches so you can see and feel the material in person before committing. Order up to 10 swatches for free — just cover standard shipping. We strongly recommend pairing physical swatches with our AI visualizer to see how the fabric filters light in your specific room.",
              },
              {
                q: "What are the best fabrics for light filtering?",
                a: "Our most popular light filtering fabrics come from Phifer, Mermet, and Texstyle — premium mills known for their open-weave sheers and linen blends. For maximum diffusion with soft warmth, we recommend a 3–5% openness factor. For more privacy and glare control, a 1–3% openness is ideal. Our free swatches let you compare in person.",
              },
              {
                q: "Do light filtering shades help with energy efficiency?",
                a: "Yes. Light filtering shades block a significant portion of solar heat gain — typically 40–70% depending on the fabric's solar reflectance. This reduces the load on your air conditioning in summer while still allowing diffused natural light. In winter, they help insulate windows while maintaining a bright, airy feel.",
              },
              {
                q: "Can I add motorization?",
                a: "Yes — motorization is available for all light filtering roller shades. Control them via voice (Alexa, Google Home, Apple HomeKit), smartphone app, or a simple remote. You can also set sun-triggered schedules to automatically lower shades during peak sunlight hours. We recommend deciding on motorization at time of order for the cleanest installation.",
              },
              {
                q: "Do you offer financing?",
                a: "Yes. We offer financing through Affirm at checkout. Split your purchase into monthly payments — 0% APR options may be available depending on creditworthiness. Subject to credit approval. No hidden fees or prepayment penalties.",
              },
              {
                q: "Are light filtering roller shades worth it?",
                a: "Absolutely. Light filtering roller shades are one of the highest-impact upgrades you can make to a living room, dining room, or office. They eliminate blinding glare, reduce heat, preserve furniture from UV damage, and create a warm, polished atmosphere — all while maintaining your connection to natural light and outdoor views. Custom-fit versions look dramatically better than stock sizes.",
              },
              {
                q: "How much do custom light filtering shades cost?",
                a: "Our custom light filtering roller shades start at $250 for smaller windows (bathrooms, offices, sidelights) and range up to $900 for large windows, sliding doors, and panoramic installations. Standard living room and dining room windows typically fall in the $300–$600 range. All prices include custom fabrication, premium fabric, free shipping, and hardware.",
              },
            ].map((faq, i) => (
              <details
                key={i}
                className="group bg-white rounded-lg border border-cream-dark overflow-hidden shadow-sm"
              >
                <summary className="flex justify-between items-center gap-4 px-6 py-5 cursor-pointer list-none font-sans font-semibold text-dark text-sm hover:text-gold transition-colors duration-200">
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
        {/* Warm light overlay */}
        <div className="absolute inset-0 bg-cream/75" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />

        <div className="relative z-10 container-narrow px-4 flex flex-col items-center gap-6">
          <h2 className="heading-section font-serif text-dark max-w-2xl leading-tight">
            Stop Squinting. Stop Overheating.{" "}
            <span className="gold-gradient-text">Start Enjoying Your Space.</span>
          </h2>
          <p className="font-sans text-dark/70 text-lg max-w-lg">
            Custom light filtering shades — built to your exact window — in 7 days.
          </p>

          <a
            href="/builder"
            className="inline-block bg-gold text-dark font-sans font-semibold text-base px-10 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200 mt-2"
          >
            Design Your Light Filtering Shades
          </a>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-6 text-sm font-sans text-dark/70 mt-2">
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

          <p className="font-sans text-dark/60 text-sm mt-2">
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
