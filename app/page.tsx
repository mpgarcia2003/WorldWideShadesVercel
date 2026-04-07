import type { Metadata } from "next"
import {
  Star,
  Truck,
  Factory,
  CheckCircle,
  Palette,
  Sparkles,
  Ruler,
  Smartphone,
  Check,
  Phone,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Custom Roller Shades | AI-Powered Shade Builder — World Wide Shades",
  description:
    "Design custom roller shades with our AI-powered builder. 700+ premium fabrics, blackout & light filtering, specialty shapes. Factory-direct from $153. Free shipping. Made in USA.",
  openGraph: {
    title: "Custom Roller Shades | World Wide Shades",
    description:
      "Design your perfect shade in minutes. Preview 700+ fabrics on your actual window with our AI builder. Factory-direct pricing, free shipping, made in USA.",
    url: "https://worldwideshades.com",
    siteName: "World Wide Shades",
    type: "website",
    images: [{ url: "https://res.cloudinary.com/dcmlcfynd/image/upload/c_fill,w_1200,h_630,g_auto/v1774397716/lightfilter-hero-living_ka1oae.png", width: 1200, height: 630, alt: "Custom roller shades in a modern living room — World Wide Shades" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Roller Shades | World Wide Shades",
    description: "Design your perfect shade in minutes. Preview 700+ fabrics on your actual window with our AI builder. Factory-direct pricing, free shipping, made in USA.",
    images: ["https://res.cloudinary.com/dcmlcfynd/image/upload/c_fill,w_1200,h_630,g_auto/v1774397716/lightfilter-hero-living_ka1oae.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      name: "World Wide Shades LLC",
      url: "https://worldwideshades.com",
      telephone: "+18446742716",
      address: {
        "@type": "PostalAddress",
        addressCountry: "US",
      },
      description:
        "Factory-direct custom roller shades. AI-powered shade builder. Made in USA.",
    },
    {
      "@type": "WebSite",
      url: "https://worldwideshades.com",
      name: "World Wide Shades",
      potentialAction: {
        "@type": "SearchAction",
        target: {
          "@type": "EntryPoint",
          urlTemplate: "https://worldwideshades.com/search?q={search_term_string}",
        },
        "query-input": "required name=search_term_string",
      },
    },
    {
      "@type": "Product",
      name: "Custom Roller Shades",
      description:
        "Custom roller shades built to your exact windows. 700+ premium fabrics, blackout & light filtering, specialty shapes. Factory-direct pricing. Made in USA, ships in 7 days.",
      brand: {
        "@type": "Brand",
        name: "World Wide Shades",
      },
      offers: {
        "@type": "AggregateOffer",
        lowPrice: "153",
        highPrice: "1950",
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
          name: "What types of window shades does World Wide Shades offer?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "World Wide Shades offers custom blackout roller shades, light filtering roller shades, solar shades, and specialty shape shades for triangle, trapezoid, hexagon, pentagon, arch, and skylight windows. All shades are custom-cut to your exact window dimensions. We also offer motorized upgrades compatible with Alexa, Google Home, and Apple HomeKit.",
          },
        },
        {
          "@type": "Question",
          name: "How does the AI Room Visualizer work?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our AI Room Visualizer lets you upload a photo of your window and preview any of our 700+ fabrics rendered directly into your room. Simply upload your photo in the shade builder, choose your fabric and color, and see an instant preview. This way you know exactly how your shades will look before you order — no guessing from swatches alone.",
          },
        },
        {
          "@type": "Question",
          name: "How much do custom roller shades cost?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Standard custom roller shades start from $153. Specialty shape shades (triangle, trapezoid, hexagon, etc.) start from $1,950. Motorized upgrades start from an additional $250. All prices are factory-direct with no showroom markup, and include free shipping and a 100% Fit Guarantee.",
          },
        },
        {
          "@type": "Question",
          name: "How long does shipping take?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We ship in approximately 7 business days from order confirmation via FedEx. Most traditional custom shade companies take 3–4 weeks. We've streamlined our manufacturing process to deliver faster without compromising quality.",
          },
        },
        {
          "@type": "Question",
          name: "What if my shades don't fit?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "We offer a 100% Fit Guarantee. If your shades don't fit according to our measurement guide, we'll remake them at no charge. Our measurement instructions are clear and simple, and our team is available to verify your measurements before production begins.",
          },
        },
        {
          "@type": "Question",
          name: "Can you make shades for triangle or trapezoid windows?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes — specialty shapes are one of our core competencies. We manufacture custom shades for triangle, trapezoid, hexagon, pentagon, arch, and skylight windows using proprietary cutting equipment. These are the windows most companies turn away. Specialty shape shades start from $1,950.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer fabric samples?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. We offer free fabric swatches from our 700+ fabric collection — feel the quality before you commit. Order up to 10 swatches and receive them in 3–5 days. We recommend pairing physical swatches with our AI Room Visualizer to see how colors look in your actual room.",
          },
        },
        {
          "@type": "Question",
          name: "Can I add motorization to any shade?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Motorization is available on most of our roller shade options for an additional fee starting at $250. Our rechargeable motors require no wiring and work with Alexa, Google Home, Apple HomeKit, SmartThings, and Matter. We recommend selecting motorization at the time of order for the cleanest installation.",
          },
        },
        {
          "@type": "Question",
          name: "How is World Wide Shades different from Blinds.com or The Shade Store?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Three key differences: First, our AI-powered shade builder lets you preview your actual window with any of our 700+ fabrics before buying — a capability no major competitor offers. Second, we specialize in specialty shapes (triangle, trapezoid, hexagon) that most companies decline. Third, we manufacture factory-direct in the USA — no showroom markup, no retail premium. You get premium quality at a fair, transparent price.",
          },
        },
        {
          "@type": "Question",
          name: "Do you offer financing?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. We offer financing through Affirm at checkout. Split your purchase into monthly payments — 0% APR options may be available subject to credit approval. There are no hidden fees or prepayment penalties.",
          },
        },
      ],
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
      ],
    },
  ],
}

export default function HomepagePage() {
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
          <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-full px-5 py-1.5 text-xs font-sans font-bold tracking-widest text-gold uppercase">
            40% OFF&nbsp;·&nbsp;LIMITED TIME
          </div>

          {/* H1 */}
          <h1 className="heading-display font-serif text-white max-w-4xl leading-tight">
            Design Your{" "}
            <span className="gold-gradient-text">Perfect Shade</span>
            {" "}in Minutes
          </h1>

          {/* Subtext */}
          <p className="font-sans text-lg md:text-xl text-warm-gray max-w-2xl leading-relaxed">
            Our AI-powered shade builder lets you preview 700+ fabrics on your actual window. Custom-cut, motorized options, free shipping.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a
              href="/builder"
              className="inline-block bg-gold text-dark font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200"
            >
              Open the Shade Builder
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
              Free Shipping Always
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

      {/* ─── 2. TRUST BAR ────────────────────────────────────── */}
      <section className="bg-dark border-y border-white/10">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-5 divide-x divide-white/10">
            {[
              { icon: <Palette className="w-4 h-4 text-gold" />, label: "700+ Fabrics" },
              { icon: <Truck className="w-4 h-4 text-gold" />, label: "Ships in 7 Days" },
              { icon: <Check className="w-4 h-4 text-gold" />, label: "Free Shipping" },
              { icon: <Factory className="w-4 h-4 text-gold" />, label: "Made in USA" },
              { icon: <CheckCircle className="w-4 h-4 text-gold" />, label: "100% Satisfaction" },
            ].map((item) => (
              <div key={item.label} className="flex items-center justify-center gap-2 py-5 px-4 text-center">
                {item.icon}
                <span className="font-sans text-sm text-warm-gray uppercase tracking-wider">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. CATEGORY CARDS ───────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">
              Our Products
            </p>
            <h2 className="heading-section font-serif text-dark">
              Find Your Perfect Shade
            </h2>
            <p className="font-sans text-warm-gray mt-3 max-w-xl mx-auto">
              From complete darkness to soft diffused light — and windows every other company turns away.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                badge: "40% Off",
                badgeColor: "bg-gold text-dark",
                image: "https://images.unsplash.com/photo-1651336259530-362bce65fffe?auto=format&fit=crop&w=800&q=80",
                imageAlt: "Dark bedroom with blackout roller shades",
                heading: "Blackout Shades",
                body: "Complete darkness for bedrooms, nurseries, and media rooms. 100% light blocking.",
                cta: "Explore Blackout →",
                href: "/blackout-roller-shades",
              },
              {
                badge: "40% Off",
                badgeColor: "bg-gold text-dark",
                image: "https://ecosmartshades.com/wp-content/uploads/Roller-White-Living-Room-800.jpg",
                imageAlt: "Bright living room with light filtering roller shades",
                heading: "Light Filtering Shades",
                body: "Soft, diffused natural light. Privacy without darkness.",
                cta: "Explore Light Filtering →",
                href: "/light-filtering-shades",
              },
              {
                badge: "From $1,950",
                badgeColor: "bg-dark text-white",
                image: "https://sunset.com/wp-content/uploads/living-room-puget-sound-a-frame-artisan-group-pc-poppi-photography.jpg",
                imageAlt: "A-frame triangle window with specialty shade",
                heading: "Specialty Shapes",
                body: "Triangle, trapezoid, hexagon, arch. The windows other companies can't cover.",
                cta: "Explore Shapes →",
                href: "/builder",
              },
            ].map((card) => (
              <div
                key={card.heading}
                className="group bg-white rounded-lg overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 flex flex-col"
              >
                <div className="relative overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.imageAlt}
                    className="w-full h-64 object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <span
                    className={`absolute top-3 left-3 font-sans text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${card.badgeColor}`}
                  >
                    {card.badge}
                  </span>
                </div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <h3 className="font-serif text-xl font-bold text-dark">{card.heading}</h3>
                  <p className="font-sans text-sm text-warm-gray leading-relaxed flex-1">{card.body}</p>
                  <a
                    href={card.href}
                    className="inline-block self-start font-sans font-semibold text-sm text-gold hover:text-gold-dark transition-colors duration-200 mt-1"
                  >
                    {card.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. AI BUILDER SHOWCASE ──────────────────────────── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text */}
            <div className="flex flex-col gap-5">
              <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">
                AI-Powered Shade Builder
              </p>
              <h2 className="heading-section font-serif text-white leading-tight">
                See Your Shades Before You Buy
              </h2>
              <p className="font-sans text-warm-gray leading-relaxed">
                Upload a photo of your window. Our AI visualizer renders your chosen fabric and color in your actual room — so you know exactly how it'll look before you order.
              </p>

              {/* Bullet points */}
              <ul className="space-y-4 mt-2">
                {[
                  { icon: <Ruler className="w-5 h-5 text-gold shrink-0" />, text: "Upload your window photo" },
                  { icon: <Palette className="w-5 h-5 text-gold shrink-0" />, text: "Preview 700+ fabrics in real time" },
                  { icon: <Sparkles className="w-5 h-5 text-gold shrink-0" />, text: "Get your exact price instantly" },
                ].map((item) => (
                  <li key={item.text} className="flex items-center gap-3 font-sans text-warm-gray">
                    {item.icon}
                    <span>{item.text}</span>
                  </li>
                ))}
              </ul>

              <a
                href="/builder"
                className="inline-block self-start bg-gold text-dark font-sans font-semibold text-sm px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200 mt-2"
              >
                Try the AI Shade Builder — It's Free
              </a>
            </div>

            {/* Image */}
            <div className="rounded-lg overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1774311237295-a65a4c1ff38a?auto=format&fit=crop&w=1920&q=80"
                alt="Modern living space with roller shades and natural light"
                className="w-full h-full object-cover"
                style={{ minHeight: "420px" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. SOCIAL PROOF ─────────────────────────────────── */}
      <section className="section-padding bg-dark-soft">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-2">
              Customer Reviews
            </p>
            <h2 className="heading-section font-serif text-white">
              500+ Homeowners Trust World Wide Shades
            </h2>
            <div className="flex justify-center items-center gap-2 mt-3">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gold fill-gold" />
              ))}
              <span className="font-sans text-warm-gray text-sm ml-2">4.9 / 5</span>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Sarah M.",
                location: "Austin, TX",
                quote:
                  "Four local companies said no to our triangle windows. World Wide Shades said 'no problem.' Perfect fit, beautiful fabric.",
              },
              {
                name: "Michael R.",
                location: "Denver, CO",
                quote:
                  "Competitors quoted over $5,000 for our trapezoid windows. World Wide Shades was significantly less — and the quality exceeded our expectations.",
              },
              {
                name: "Jennifer L.",
                location: "Seattle, WA",
                quote:
                  "I'd given up on covering our hexagon windows. Customer service walked me through measuring step by step. Perfect fit on the first try.",
              },
            ].map((review) => (
              <div
                key={review.name}
                className="bg-dark rounded-lg p-7 flex flex-col gap-4"
              >
                {/* Stars */}
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>

                <p className="font-sans text-warm-gray leading-relaxed text-sm flex-1">
                  &ldquo;{review.quote}&rdquo;
                </p>

                <div className="flex items-center justify-between pt-2 border-t border-white/10">
                  <div>
                    <p className="font-sans font-semibold text-white text-sm">{review.name}</p>
                    <p className="font-sans text-xs text-warm-gray">{review.location}</p>
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

      {/* ─── 6. HOW IT WORKS ─────────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">
              Custom Shades in 4 Easy Steps
            </h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">
              From your first measurement to a perfectly installed shade — simpler than you think.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Ruler className="w-6 h-6 text-gold" />,
                step: "01",
                heading: "Choose Your Shape",
                body: "Standard rectangles to specialty shapes. Our builder shows exactly which measurements you need.",
              },
              {
                icon: <Palette className="w-6 h-6 text-gold" />,
                step: "02",
                heading: "Pick Your Fabric",
                body: "Browse 700+ options in blackout, light filtering, and solar. Order free swatches first.",
              },
              {
                icon: <Sparkles className="w-6 h-6 text-gold" />,
                step: "03",
                heading: "Preview & Order",
                body: "Use our AI Room Visualizer to see your shades in your actual room. Enter dimensions and checkout.",
              },
              {
                icon: <CheckCircle className="w-6 h-6 text-gold" />,
                step: "04",
                heading: "Receive & Install",
                body: "Ships in 7 days via FedEx. 4 screws, 15 minutes. Hardware included.",
              },
            ].map((s) => (
              <div key={s.step} className="flex flex-col gap-3">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-full bg-dark flex items-center justify-center shrink-0">
                    {s.icon}
                  </div>
                  <span className="font-sans font-bold text-2xl text-dark opacity-20 leading-none">
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
              Start Designing →
            </a>
          </div>
        </div>
      </section>

      {/* ─── 7. WHY WORLD WIDE SHADES ────────────────────────── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-2">
              Why Choose Us
            </p>
            <h2 className="heading-section font-serif text-white">
              Why World Wide Shades
            </h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">
              We built the custom shade experience that the industry never bothered to.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Factory className="w-7 h-7 text-gold" />,
                heading: "Factory-Direct Pricing",
                body: "No middlemen, no showroom markup. Premium quality at a fair price. Save up to 50% vs retail.",
              },
              {
                icon: <Palette className="w-7 h-7 text-gold" />,
                heading: "700+ Premium Fabrics",
                body: "From crisp solids to textured weaves. Blackout, light filtering, and solar. Free swatches.",
              },
              {
                icon: <Smartphone className="w-7 h-7 text-gold" />,
                heading: "Motorized & Smart Home",
                body: "Works with Alexa, Google Home, Apple HomeKit. Rechargeable motor, no wiring.",
              },
              {
                icon: <Truck className="w-7 h-7 text-gold" />,
                heading: "Free Shipping, Always",
                body: "Custom-cut, quality-checked, delivered to your door via FedEx in ~7 days.",
              },
            ].map((pillar) => (
              <div key={pillar.heading} className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-dark-soft flex items-center justify-center shrink-0">
                  {pillar.icon}
                </div>
                <h3 className="font-serif text-lg font-bold text-white">{pillar.heading}</h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{pillar.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. PRICING TRANSPARENCY ─────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">
              Factory-Direct Pricing. No Surprises.
            </h2>
            <p className="font-sans text-warm-gray mt-3 max-w-xl mx-auto">
              Save up to 50% vs. retail stores. Every shade custom-made.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tier: "Standard Roller Shades",
                price: "From $153",
                popular: false,
                desc: "Blackout, light filtering, solar",
                features: [
                  "Custom-made to your exact specs",
                  "700+ fabric options",
                  "Free shipping",
                  "Hardware included",
                  "100% Fit Guarantee",
                ],
              },
              {
                tier: "Specialty Shapes",
                price: "From $1,950",
                popular: true,
                desc: "Triangle, trapezoid, hexagon, pentagon",
                features: [
                  "Proprietary precision cutting",
                  "All shape types covered",
                  "Free shipping",
                  "Hardware included",
                  "100% Fit Guarantee",
                ],
              },
              {
                tier: "Motorized Upgrade",
                price: "From +$250",
                popular: false,
                desc: "Alexa, Google, HomeKit compatible",
                features: [
                  "Rechargeable motor",
                  "No wiring required",
                  "Voice & app control",
                  "Schedule automation",
                  "Works with any shade",
                ],
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
                  {card.price}
                </p>
                <p className="font-sans text-sm text-warm-gray mb-6">{card.desc}</p>

                <ul className="space-y-2 mb-6 flex-1">
                  {card.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 font-sans text-sm">
                      <Check className="w-4 h-4 shrink-0 text-gold" />
                      <span className="text-warm-gray">{f}</span>
                    </li>
                  ))}
                </ul>

                <a
                  href="/builder"
                  className={`block text-center font-sans font-semibold text-sm px-6 py-3 rounded-sm transition-colors duration-200 mt-auto ${
                    card.popular
                      ? "bg-gold text-dark hover:bg-gold-dark"
                      : "bg-dark text-white hover:bg-dark-soft"
                  }`}
                >
                  Get Your Exact Price →
                </a>
              </div>
            ))}
          </div>

          <p className="text-center font-sans text-sm text-warm-gray mt-8">
            All prices include: Custom sizing, free shipping, hardware, 100% Fit Guarantee. Financing available with Affirm.
          </p>
        </div>
      </section>

      {/* ─── 9. SPECIALTY SHAPES SPOTLIGHT ──────────────────── */}
      <section
        className="relative section-padding overflow-hidden"
        style={{
          backgroundImage:
            "url(https://images.contentstack.io/v3/assets/bltf589e66bcaecd79c/blt309cabd1e83ad611/65c66807f48bc2389d50e43b/social-window-wall-triangle-windows.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-dark/88" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />

        <div className="relative z-10 container-narrow px-4 text-center">
          <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">
            The Windows Others Can't Cover
          </p>
          <h2 className="heading-section font-serif text-white mb-4">
            Specialty Shape Experts
          </h2>
          <p className="font-sans text-warm-gray text-lg max-w-xl mx-auto mb-10 leading-relaxed">
            Triangle, trapezoid, hexagon, pentagon, arch, skylight — we manufacture custom shades for the windows other companies turn away. Proprietary cutting equipment. A decade of expertise.
          </p>

          {/* Shape grid */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Triangle", "Trapezoid", "Hexagon", "Pentagon", "Arch", "Skylight"].map((shape) => (
              <span
                key={shape}
                className="font-sans font-semibold text-sm text-white border border-white/25 rounded-sm px-5 py-2.5 hover:border-gold hover:text-gold transition-colors duration-200"
              >
                {shape}
              </span>
            ))}
          </div>

          <a
            href="/builder"
            className="inline-block bg-gold text-dark font-sans font-semibold text-sm px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200"
          >
            Design Your Specialty Shade →
          </a>
        </div>
      </section>

      {/* ─── 10. MOTORIZATION ────────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-10">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-2">
              Motorization
            </p>
            <h2 className="heading-section font-serif text-dark">
              Upgrade Any Shade to Motorized
            </h2>
            <p className="font-sans text-warm-gray mt-3 max-w-xl mx-auto leading-relaxed">
              Rechargeable motor. No wiring needed. Voice control with Alexa, Google Home, and Apple HomeKit. Schedule your shades to open and close automatically.
            </p>
          </div>

          {/* Smart home badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Alexa", "Google Home", "Apple HomeKit", "SmartThings", "Matter"].map((brand) => (
              <span
                key={brand}
                className="font-sans font-semibold text-sm text-dark border border-cream-dark rounded-sm px-5 py-2.5 bg-white shadow-sm"
              >
                {brand}
              </span>
            ))}
          </div>

          <div className="text-center">
            <a
              href="/builder"
              className="inline-block bg-dark text-white font-sans font-semibold text-sm px-10 py-4 rounded-sm hover:bg-dark-soft transition-colors duration-200"
            >
              Explore Motorized Options
            </a>
          </div>
        </div>
      </section>

      {/* ─── 11. FREE SWATCHES CTA ───────────────────────────── */}
      <section
        className="relative section-padding flex flex-col items-center justify-center text-center overflow-hidden"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/premium-photo/black-fabric-luxury-cloth-texture-pattern-background_293060-5660.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-dark/85" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />

        <div className="relative z-10 container-narrow px-4 flex flex-col items-center gap-5">
          <h2 className="heading-section font-serif text-white max-w-2xl leading-tight">
            Not Sure About Your Fabric?
          </h2>
          <p className="font-serif text-2xl text-gold">
            We'll Send Swatches Free.
          </p>
          <p className="font-sans text-warm-gray text-lg max-w-lg leading-relaxed">
            Pick up to 10 swatches from our 700+ fabric collection. Delivered in 3–5 days. Feel the quality before you buy.
          </p>
          <a
            href="/swatches"
            className="inline-block bg-gold text-dark font-sans font-semibold text-base px-10 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200 mt-2"
          >
            Order Free Swatches
          </a>
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
                q: "What types of window shades does World Wide Shades offer?",
                a: "World Wide Shades offers custom blackout roller shades, light filtering roller shades, solar shades, and specialty shape shades for triangle, trapezoid, hexagon, pentagon, arch, and skylight windows. All shades are custom-cut to your exact dimensions. Motorized upgrades are available on most styles, compatible with Alexa, Google Home, and Apple HomeKit.",
              },
              {
                q: "How does the AI Room Visualizer work?",
                a: "Our AI Room Visualizer lets you upload a photo of your window and instantly preview any of our 700+ fabrics rendered directly in your room. Simply open the shade builder, upload your photo, choose your fabric and color, and see the result. This way you know exactly how your shades will look before you order — no surprises, no guessing.",
              },
              {
                q: "How much do custom roller shades cost?",
                a: "Standard custom roller shades start from $153. Specialty shape shades (triangle, trapezoid, hexagon, etc.) start from $1,950. Motorized upgrades start from an additional $250. All prices include free shipping, custom sizing, hardware, and our 100% Fit Guarantee. We're factory-direct — no showroom markup.",
              },
              {
                q: "How long does shipping take?",
                a: "We ship in approximately 7 business days from order confirmation via FedEx. Most traditional custom shade companies take 3–4 weeks. We've streamlined our manufacturing process to deliver faster without cutting corners on quality. You'll receive a tracking number and delivery estimate.",
              },
              {
                q: "What if my shades don't fit?",
                a: "We stand behind every shade we make with a 100% Fit Guarantee. If your shades don't fit according to our measurement guide, we'll remake them at no charge. Our measurement instructions are simple and clear, and our team is available to review your measurements before production begins. We'd rather get it right upfront.",
              },
              {
                q: "Can you make shades for triangle or trapezoid windows?",
                a: "Yes — specialty shapes are one of our core competencies. We manufacture custom shades for triangle, trapezoid, hexagon, pentagon, arch, and skylight windows using proprietary cutting equipment and a decade of expertise. These are the windows most companies turn away. Specialty shape shades start from $1,950. Open our builder to get started.",
              },
              {
                q: "Do you offer fabric samples?",
                a: "Absolutely. We offer free fabric swatches from our 700+ collection — pick up to 10 and receive them in 3–5 days. Feel the quality before you buy. We recommend pairing physical swatches with our AI Room Visualizer to see how colors look in your actual room's lighting before ordering.",
              },
              {
                q: "Can I add motorization to any shade?",
                a: "Motorization is available on most of our roller shade styles for an additional fee starting at $250. Our rechargeable motors require no wiring and are compatible with Alexa, Google Home, Apple HomeKit, SmartThings, and Matter. We recommend selecting motorization at the time of order for the cleanest installation.",
              },
              {
                q: "How is World Wide Shades different from Blinds.com or The Shade Store?",
                a: "Three key advantages: First, our AI-powered shade builder lets you preview your exact window with any of our 700+ fabrics before buying — no competitor offers this. Second, we specialize in specialty shapes (triangle, trapezoid, hexagon) that most companies decline entirely. Third, we manufacture factory-direct in the USA — no retail or showroom markup. Premium quality at a genuinely fair price.",
              },
              {
                q: "Do you offer financing?",
                a: "Yes. We offer financing through Affirm at checkout. Split your purchase into monthly payments — 0% APR options may be available subject to credit approval. There are no hidden fees or prepayment penalties. Select Affirm at checkout to see your options.",
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
            "url(https://plus.unsplash.com/premium_photo-1681487169724-1bd4997294ad?auto=format&fit=crop&w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-dark/85" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />

        <div className="relative z-10 container-narrow px-4 flex flex-col items-center gap-6">
          <h2 className="heading-section font-serif text-white max-w-2xl leading-tight">
            Your Windows Deserve{" "}
            <span className="gold-gradient-text">Better.</span>
          </h2>
          <p className="font-sans text-warm-gray text-lg max-w-lg">
            Custom shades. Designed by you. Built by us. Delivered in 7 days.
          </p>

          <a
            href="/builder"
            className="inline-block bg-gold text-dark font-sans font-semibold text-base px-10 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200 mt-2"
          >
            Open the Shade Builder
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
              className="text-gold hover:underline inline-flex items-center gap-1"
            >
              <Phone className="w-3.5 h-3.5" />
              (844) 674-2716
            </a>
          </p>
        </div>
      </section>
    </>
  )
}
