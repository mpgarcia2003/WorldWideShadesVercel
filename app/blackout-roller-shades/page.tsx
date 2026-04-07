import type { Metadata } from "next"
import {
  Star,
  AlertTriangle,
  DollarSign,
  Clock,
  Eye,
  Ruler,
  Factory,
  Truck,
  Sparkles,
  Check,
  X,
  Palette,
  Hammer,
  CheckCircle,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Custom Blackout Roller Shades | 100% Light Block, Ships 7 Days — World Wide Shades",
  description:
    "Custom blackout roller shades built to your exact windows. 200+ premium fabrics, factory-direct pricing from $250, 100% fit guarantee. Made in USA, ships in 7 days.",
  openGraph: {
    title: "Custom Blackout Roller Shades | World Wide Shades",
    description:
      "Sleep in complete darkness. Custom-fit blackout shades with 200+ fabrics, shipped in 7 days. Factory-direct pricing from $250.",
    url: "https://worldwideshades.com/blackout-roller-shades",
    siteName: "World Wide Shades",
    type: "website",
    images: [{ url: "https://res.cloudinary.com/dcmlcfynd/image/upload/c_fill,w_1200,h_630,g_auto/v1774397197/blackout-hero-bedroom_wngxnr.png", width: 1200, height: 630, alt: "Custom blackout roller shades in a dark bedroom — World Wide Shades" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Blackout Roller Shades | World Wide Shades",
    description: "Custom blackout roller shades built to your exact windows. 200+ premium fabrics, factory-direct pricing from $250, 100% fit guarantee. Made in USA, ships in 7 days.",
    images: ["https://res.cloudinary.com/dcmlcfynd/image/upload/c_fill,w_1200,h_630,g_auto/v1774397197/blackout-hero-bedroom_wngxnr.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "Custom Blackout Roller Shades",
      description:
        "Custom blackout roller shades built to your exact windows. 200+ premium fabrics, 100% light blocking, factory-direct pricing. Made in USA, ships in 7 days.",
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
          name: "How dark do blackout shades actually get?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our blackout shades block 100% of light when properly installed. The key is a custom fit — shades built to your exact window dimensions with minimal gaps on the sides. With an inside-mount shade and light-blocking side channels, you can achieve near-total darkness.",
          },
        },
        {
          "@type": "Question",
          name: "What if I measure wrong?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We offer a 100% Fit Guarantee. If your shades don't fit due to a measurement error on our measurement guide, we'll remake them at no charge. Our measurement guide is simple and clear, and our team is available to double-check your measurements before production.",
          },
        },
        {
          "@type": "Question",
          name: "Do light-colored blackout fabrics still block all light?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. The blackout layer is woven into the fabric's backing — it has nothing to do with the face color. A white or cream fabric with a blackout backing blocks the same 100% of light as a dark charcoal fabric. You're choosing color for aesthetics, not performance.",
          },
        },
        {
          "@type": "Question",
          name: "How fast do you ship?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We ship in approximately 7 business days from order confirmation. Most traditional custom shade brands take 3–4 weeks. We've streamlined our factory process to get your shades to you faster without sacrificing quality.",
          },
        },
        {
          "@type": "Question",
          name: "Can I get fabric samples first?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. We offer free fabric swatches so you can see and feel the material before committing. Order up to 10 swatches for free — just pay shipping. Use the AI visualizer alongside your swatches to see how colors look in your room.",
          },
        },
        {
          "@type": "Question",
          name: "How is this different from Blinds.com?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We specialize exclusively in roller shades and focus on blackout performance. Our fabrics are sourced from premium European and global mills like Phifer, Ferrari, and Mermet. We manufacture in the USA, offer an AI room visualizer, and price factory-direct without retail markup.",
          },
        },
        {
          "@type": "Question",
          name: "Can I add motorization later?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "In most cases, yes — if you select a motorization-compatible tube size at time of order. We recommend deciding on motorization upfront for the cleanest installation. Our team can advise on retrofit options for existing shades.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer financing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We offer financing through Affirm at checkout. Subject to credit approval. Split your purchase into monthly payments with no hidden fees.",
          },
        },
        {
          "@type": "Question",
          name: "What's your return policy?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Because all shades are custom-made to your specifications, we don't accept returns for buyer's remorse. However, if there's a manufacturing defect or your shades don't fit per our Fit Guarantee, we'll remake or refund at no charge.",
          },
        },
        {
          "@type": "Question",
          name: "Can you do specialty window shapes?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Roller shades work on standard rectangular windows. For arches, triangles, or other specialty shapes, contact our team — we may be able to accommodate with custom fabrication or recommend complementary solutions.",
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
          name: "Blackout Roller Shades",
          item: "https://worldwideshades.com/blackout-roller-shades",
        },
      ],
    },
  ],
}

export default function BlackoutRollerShadesPage() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── 1. HERO ─────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col justify-center items-center text-center text-white overflow-hidden"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-dark/80" />
        {/* Noise texture */}
        <div className="noise-overlay absolute inset-0 pointer-events-none" />

        <div className="relative z-10 container-site section-padding flex flex-col items-center gap-6 px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-sans font-semibold tracking-widest text-warm-gray uppercase">
            100% Light Blocking&nbsp;·&nbsp;Factory Direct&nbsp;·&nbsp;Made in USA
          </div>

          {/* H1 */}
          <h1 className="heading-display font-serif text-white max-w-4xl leading-tight">
            Sleep in{" "}
            <span className="gold-gradient-text">Complete Darkness</span>
          </h1>

          {/* Subtext */}
          <p className="font-sans text-lg md:text-xl text-warm-gray max-w-2xl leading-relaxed">
            Custom blackout shades built to your exact windows. No gaps. No glow. No compromise.
            Premium fabrics, factory-direct pricing, delivered in 7 days.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a
              href="/builder"
              className="inline-block bg-gold text-dark font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200"
            >
              Design Your Blackout Shades
            </a>
            <a
              href="/swatches"
              className="inline-block border border-white/50 text-white font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-white/10 transition-colors duration-200"
            >
              Order Free Swatches
            </a>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm font-sans text-warm-gray">
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
              { number: "100%", label: "Total Blackout" },
              { number: "~7 Days", label: "Order to Blackout" },
              { number: "200+", label: "Blackout Fabrics" },
              { number: "from $250", label: "Factory-Direct Pricing" },
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
      <section className="section-padding">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">
              Why Most "Blackout" Shades Fail
            </h2>
            <p className="font-sans text-warm-gray mt-3 max-w-xl mx-auto">
              Generic shades leave gaps. Showrooms overcharge. We built a better way.
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
                    icon: <AlertTriangle className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />,
                    title: "Light gaps ruin \"blackout\"",
                    body: "Stock shades never fit right — they're sized for standard windows, not yours.",
                  },
                  {
                    icon: <DollarSign className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />,
                    title: "Custom quotes are brutal",
                    body: "$350–500 per window at showrooms — just for the privilege of a quote.",
                  },
                  {
                    icon: <Clock className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />,
                    title: "3–4 week wait times",
                    body: "Most custom brands take forever. Your room sits dark-deprived for a month.",
                  },
                  {
                    icon: <Eye className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />,
                    title: "No way to preview",
                    body: "Buying blind online is risky — colors look different in a room than on a screen.",
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
                    icon: <Ruler className="w-5 h-5 text-gold shrink-0 mt-0.5" />,
                    title: "Built to your exact window",
                    body: "Down to ⅛\". Every shade is made for your specific window — not a range.",
                  },
                  {
                    icon: <Factory className="w-5 h-5 text-gold shrink-0 mt-0.5" />,
                    title: "Factory-direct pricing",
                    body: "No showroom markup. No middleman. You pay manufacturing cost + our margin.",
                  },
                  {
                    icon: <Truck className="w-5 h-5 text-gold shrink-0 mt-0.5" />,
                    title: "Ships in 7 days",
                    body: "Not 3–4 weeks. We've streamlined production so you're not waiting forever.",
                  },
                  {
                    icon: <Sparkles className="w-5 h-5 text-gold shrink-0 mt-0.5" />,
                    title: "AI Room Visualizer",
                    body: "See shades on YOUR window first. Upload a photo, pick a fabric, preview instantly.",
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
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1774311237295-a65a4c1ff38a?auto=format&fit=crop&w=1920&q=80"
                alt="Modern living space with roller shades"
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
                color in your actual room — so you know exactly how it'll look before ordering.
              </p>

              {/* Steps */}
              <ol className="space-y-3 mt-2">
                {[
                  "Upload your room photo",
                  "Choose fabric & color",
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
      <section className="section-padding bg-dark-muted">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-white">Built for Every Room</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">
              Whether you need rest, focus, or cinema-level darkness — we have your room covered.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                badge: "Most Popular",
                badgeColor: "bg-gold text-dark",
                image:
                  "https://images.unsplash.com/photo-1651336259530-362bce65fffe?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Dark bedroom with blackout shades",
                heading: "Bedroom",
                title: "Every Morning Starts the Night Before",
                body: "Complete darkness is the single biggest upgrade you can make to your sleep quality. Our blackout fabrics block 100% of light — sunrise, street lamps, and all. Wake up when you choose.",
                cta: "Build for Bedroom",
              },
              {
                badge: "Parent Favorite",
                badgeColor: "bg-white/20 text-white",
                image:
                  "https://www.curtarra.com/cdn/shop/files/3_6f6083a9-3238-4d54-8e34-a65707da3fef.png?v=1766979384&width=800",
                imageAlt: "Peaceful nursery with blackout shades",
                heading: "Nursery",
                title: "Better Sleep for Them, Better Everything for You",
                body: "Daytime naps are a miracle when the room is truly dark. Our cordless options meet all child safety standards. OEKO-TEX certified fabrics — nothing harmful near your baby.",
                cta: "Build for Nursery",
              },
              {
                badge: "Enthusiast Pick",
                badgeColor: "bg-white/20 text-white",
                image:
                  "https://casaplex.com/wp-content/uploads/2021/12/image3-1024x683.png",
                imageAlt: "Home theater with blackout shades",
                heading: "Media Room",
                title: "Kill the Glare. Keep the Picture.",
                body: "A true zero-light environment transforms your viewing experience. Pair with our motorized option — close everything with Alexa before movie night. No remote hunting, no glare.",
                cta: "Build for Media Room",
              },
            ].map((room) => (
              <div
                key={room.heading}
                className="bg-dark rounded-lg overflow-hidden flex flex-col shadow-lg"
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
                  <h3 className="font-serif text-lg font-bold text-white leading-snug">
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
            "url(https://img.freepik.com/premium-photo/black-fabric-luxury-cloth-texture-pattern-background_293060-5660.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-dark/85" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 container-narrow px-4 text-center">
          <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">
            Premium Textiles
          </p>
          <h2 className="heading-section font-serif text-white mb-4">
            200+ Premium Blackout Fabrics
          </h2>
          <p className="font-sans text-warm-gray text-lg max-w-xl mx-auto mb-10">
            Curated from the world's leading textile mills. Every fabric blocks 100% of light.
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
              From measurement to installation — four simple steps to a perfectly dark room.
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
                body: "200+ premium blackout fabrics. Order free swatches or use the AI visualizer to preview in your room.",
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
                    Traditional Showrooms
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
                    showroom: true,
                    amazon: false,
                  },
                  {
                    label: "Pricing",
                    wws: "from $250",
                    showroom: "$350–500/window",
                    amazon: "Not custom",
                  },
                  {
                    label: "Fabric Selection",
                    wws: "200+",
                    showroom: "30–80",
                    amazon: "10–20",
                  },
                  {
                    label: "Shipping Speed",
                    wws: "~7 Days",
                    showroom: "3–4 Weeks",
                    amazon: "2–5 Days (stock)",
                  },
                  {
                    label: "Free Samples",
                    wws: true,
                    showroom: false,
                    amazon: false,
                  },
                  {
                    label: "Made in USA",
                    wws: true,
                    showroom: "Sometimes",
                    amazon: false,
                  },
                  {
                    label: "Fit Guarantee",
                    wws: true,
                    showroom: false,
                    amazon: false,
                  },
                  {
                    label: "AI Visualizer",
                    wws: true,
                    showroom: false,
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
                      {typeof row.showroom === "boolean" ? (
                        row.showroom ? (
                          <Check className="w-5 h-5 text-warm-gray mx-auto" />
                        ) : (
                          <X className="w-5 h-5 text-red-400 mx-auto" />
                        )
                      ) : (
                        row.showroom
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
                desc: "Perfect for compact spaces that still deserve complete darkness.",
              },
              {
                tier: "Standard Windows",
                range: "$300 – $600",
                popular: true,
                rooms: "Bedrooms, Living Rooms, Nurseries",
                desc: "Our most popular size range. Covers the majority of residential windows.",
              },
              {
                tier: "Large Windows",
                range: "$400 – $900",
                popular: false,
                rooms: "Sliding Doors, Panoramic, Media Rooms",
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
                <p
                  className={`font-sans text-sm mb-5 ${
                    card.popular ? "text-warm-gray" : "text-warm-gray"
                  }`}
                >
                  {card.rooms}
                </p>
                <p
                  className={`font-sans text-sm mb-6 leading-relaxed ${
                    card.popular ? "text-warm-gray" : "text-warm-gray"
                  }`}
                >
                  {card.desc}
                </p>

                <ul className="space-y-2 mb-6">
                  {[
                    "Custom-made to your specs",
                    "100% blackout fabric",
                    "Free shipping",
                    "Hardware included",
                    "100% Fit Guarantee",
                  ].map((f) => (
                    <li key={f} className="flex items-center gap-2 font-sans text-sm">
                      <Check
                        className={`w-4 h-4 shrink-0 ${card.popular ? "text-gold" : "text-gold"}`}
                      />
                      <span className={card.popular ? "text-warm-gray" : "text-warm-gray"}>{f}</span>
                    </li>
                  ))}
                </ul>

                <p
                  className={`font-sans text-xs mb-6 ${
                    card.popular ? "text-warm-gray/70" : "text-warm-gray/70"
                  }`}
                >
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
                name: "Rachel M.",
                location: "Portland, OR",
                room: "Nursery",
                quote:
                  "Quoted $2,400 locally for our nursery. Paid under $700 with World Wide Shades. The blackout is complete — our toddler finally sleeps past 6am.",
              },
              {
                name: "David K.",
                location: "Austin, TX",
                room: "Bedroom",
                quote:
                  "I work nights. Tried everything — curtains, foil, you name it. These are zero light leakage. Like sleeping in a cave. Worth every penny.",
              },
              {
                name: "James T.",
                location: "Denver, CO",
                room: "Home Theater",
                quote:
                  "Legitimately zero light in our theater room. Added the motorized option — close them with Alexa before movie night. Chef's kiss.",
              },
            ].map((review) => (
              <div
                key={review.name}
                className="bg-dark-soft rounded-lg p-7 flex flex-col gap-4"
              >
                {/* Stars */}
                <div className="flex gap-0.5 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-gold text-gold" />
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
              Control your shades with your voice, your phone, or a schedule. Works with your
              existing smart home.
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
              { name: "Push 5 ARC Remote", price: "$50" },
              { name: "Pulse PRO Smart Hub", price: "$185" },
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
      <section className="section-padding bg-dark-muted">
        <div className="container-narrow px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-white">Frequently Asked Questions</h2>
            <p className="font-sans text-warm-gray mt-3">
              Everything you need to know before ordering.
            </p>
          </div>

          <div className="space-y-2">
            {[
              {
                q: "How dark do blackout shades actually get?",
                a: "Our blackout shades block 100% of light when properly installed. The key is a custom fit — shades built to your exact window dimensions with minimal gaps on the sides. With an inside-mount shade and light-blocking side channels, you can achieve near-total darkness. We're talking sleep-through-noon darkness, not just dimming.",
              },
              {
                q: "What if I measure wrong?",
                a: "We offer a 100% Fit Guarantee. If your shades don't fit because of our measurement guide, we'll remake them at no charge. Our guide is simple and clear, and our team is available to double-check your measurements before we go into production. We'd rather catch it early than have you deal with a bad fit.",
              },
              {
                q: "Do light-colored blackout fabrics still block all light?",
                a: "Yes — absolutely. The blackout layer is a separate backing woven into the fabric. It has nothing to do with the face color. A white or cream fabric with a blackout backing blocks the same 100% of light as a dark charcoal. You're choosing face color for aesthetics and your room's decor — not for performance.",
              },
              {
                q: "How fast do you ship?",
                a: "We ship in approximately 7 business days from order confirmation. Most traditional custom shade brands take 3–4 weeks. We've built a streamlined manufacturing process specifically to shorten this window — without cutting corners on quality. You'll get a tracking number and FedEx delivery estimate.",
              },
              {
                q: "Can I get fabric samples first?",
                a: "Absolutely. We offer free fabric swatches so you can see and feel the material in person before committing. Order up to 10 swatches for free — just cover standard shipping. We highly recommend pairing physical swatches with our AI visualizer so you can see how the color reads in your room's actual lighting.",
              },
              {
                q: "How is this different from Blinds.com?",
                a: "We specialize exclusively in roller shades and focus intensely on blackout performance. Our fabrics are sourced from premium mills including Phifer, Ferrari, and Mermet — brands you won't find at mass-market retailers. We manufacture in the USA, offer an AI room visualizer, and price factory-direct without any showroom or retail markup.",
              },
              {
                q: "Can I add motorization later?",
                a: "In most cases, yes — if you selected a motorization-compatible tube size when you originally ordered. We recommend deciding on motorization upfront for the cleanest, most integrated installation. If you're on the fence, go motorization-ready and add the motor when you're ready. Our team can advise on retrofitting existing shades.",
              },
              {
                q: "Do you offer financing?",
                a: "Yes. We offer financing through Affirm at checkout. Split your purchase into monthly payments — 0% APR options may be available depending on your creditworthiness. Subject to credit approval. There are no hidden fees or prepayment penalties.",
              },
              {
                q: "What's your return policy?",
                a: "All shades are custom-made to your exact specifications, so we can't accept returns for buyer's remorse — that's standard for custom window treatments across the industry. However, if there's a manufacturing defect, a quality issue, or your shades don't fit per our Fit Guarantee, we'll remake or refund at no charge. We stand behind every shade we make.",
              },
              {
                q: "Can you do specialty window shapes?",
                a: "Roller shades are designed for standard rectangular windows. For arches, triangles, octagons, or other specialty shapes, contact our team — we can discuss custom fabrication options or recommend complementary treatments that work alongside your roller shades.",
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
            "url(https://plus.unsplash.com/premium_photo-1746888841255-42d2452f6ebe?auto=format&fit=crop&w=1200&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-dark/85" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />

        <div className="relative z-10 container-narrow px-4 flex flex-col items-center gap-6">
          <h2 className="heading-section font-serif text-white max-w-2xl leading-tight">
            Stop Sleeping in a Room That's Never{" "}
            <span className="gold-gradient-text">Fully Dark.</span>
          </h2>
          <p className="font-sans text-warm-gray text-lg max-w-lg">
            True blackout — built to your exact window — in 7 days.
          </p>

          <a
            href="/builder"
            className="inline-block bg-gold text-dark font-sans font-semibold text-base px-10 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200 mt-2"
          >
            Design Your Blackout Shades
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
