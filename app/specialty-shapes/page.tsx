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
  Phone,
  ShieldCheck,
  Wrench,
  Zap,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Specialty Shape Window Shades | Triangle, Trapezoid, Hexagon — World Wide Shades",
  description:
    "Custom shades for triangle, trapezoid, hexagon, pentagon, arch, and skylight windows. The windows other companies can't cover. From $1,950. Made in USA, ships in 7-10 days.",
  openGraph: {
    title: "Specialty Shape Window Shades | World Wide Shades",
    description: "Triangle, trapezoid, hexagon, pentagon, arch, skylight — custom shades for the windows other companies turn away. 100% Fit Guarantee.",
    url: "https://worldwideshades.com/specialty-shapes",
    siteName: "World Wide Shades",
    type: "website",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Product", name: "Custom Specialty Shape Window Shades", description: "Custom shades for triangle, trapezoid, hexagon, pentagon, arch, and skylight windows. Proprietary cutting equipment. From $1,950. Made in USA.", brand: { "@type": "Brand", name: "World Wide Shades" }, offers: { "@type": "AggregateOffer", lowPrice: "1950", priceCurrency: "USD", availability: "https://schema.org/InStock" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "500", bestRating: "5", worstRating: "1" } },
    { "@type": "FAQPage", mainEntity: [
      { "@type": "Question", name: "Can you make shades for triangle windows?", acceptedAnswer: { "@type": "Answer", text: "Yes. We specialize in triangle window shades including right triangles, acute/equilateral triangles, and other angled configurations using proprietary cutting equipment." } },
      { "@type": "Question", name: "What specialty shapes can you manufacture?", acceptedAnswer: { "@type": "Answer", text: "We manufacture shades for 10+ shapes: right triangle (left/right), acute triangle, trapezoid (left/right/flat top), hexagon, pentagon, arch, skylight, and oversized windows up to 24 feet." } },
      { "@type": "Question", name: "Why won't most companies make specialty shape shades?", acceptedAnswer: { "@type": "Answer", text: "Most companies lack specialized cutting equipment for angled shapes. Standard manufacturing uses straight cuts only. We invested in proprietary machines for specialty shapes." } },
      { "@type": "Question", name: "How much do specialty shape shades cost?", acceptedAnswer: { "@type": "Answer", text: "Specialty shapes start from $1,950 — significantly less than the $5,000+ quotes from traditional showrooms. Factory-direct pricing." } },
      { "@type": "Question", name: "How do I measure a triangle or trapezoid window?", acceptedAnswer: { "@type": "Answer", text: "Our builder shows exactly which measurements you need for your specific shape. Our team can also walk you through it and double-check before production." } },
      { "@type": "Question", name: "Can I preview specialty shape shades before ordering?", acceptedAnswer: { "@type": "Answer", text: "Yes. Our AI Room Visualizer works with all specialty shapes and all 700+ fabrics." } },
      { "@type": "Question", name: "What fabrics are available for specialty shapes?", acceptedAnswer: { "@type": "Answer", text: "All 700+ fabrics including blackout, light filtering, and solar from Phifer, Ferrari, Mermet, Texstyle, Senbesta, and Copaco." } },
      { "@type": "Question", name: "Can specialty shapes be motorized?", acceptedAnswer: { "@type": "Answer", text: "Yes. Motorization available from +$250. Especially useful for triangle and skylight windows that are hard to reach." } },
      { "@type": "Question", name: "What if my specialty shade doesn't fit?", acceptedAnswer: { "@type": "Answer", text: "100% Fit Guarantee — if it doesn't fit per our measurement guide, we remake it free. No exceptions." } },
      { "@type": "Question", name: "How long does shipping take?", acceptedAnswer: { "@type": "Answer", text: "Specialty shapes ship in approximately 7-10 business days, significantly faster than the 6-8 week lead times at traditional showrooms." } },
    ] },
    { "@type": "Organization", name: "World Wide Shades LLC", url: "https://worldwideshades.com", telephone: "+18446742716", description: "Factory-direct custom roller shades including specialty shapes. Made in USA." },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://worldwideshades.com" },
      { "@type": "ListItem", position: 2, name: "Specialty Shape Window Shades", item: "https://worldwideshades.com/specialty-shapes" },
    ] },
  ],
}

export default function SpecialtyShapesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ─── 1. HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center text-white overflow-hidden" style={{ backgroundImage: "url(https://sunset.com/wp-content/uploads/living-room-puget-sound-a-frame-artisan-group-pc-poppi-photography.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-dark/82" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 container-site section-padding flex flex-col items-center gap-6 px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-sans font-semibold tracking-widest text-warm-gray uppercase">Triangle&nbsp;·&nbsp;Trapezoid&nbsp;·&nbsp;Hexagon&nbsp;·&nbsp;Pentagon&nbsp;·&nbsp;Arch&nbsp;·&nbsp;Skylight</div>
          <h1 className="heading-display font-serif text-white max-w-4xl leading-tight">The Windows Others <span className="gold-gradient-text">Can&rsquo;t Cover</span></h1>
          <p className="font-sans text-lg md:text-xl text-warm-gray max-w-2xl leading-relaxed">Custom shades for triangle, trapezoid, hexagon, pentagon, arch, and skylight windows. Proprietary cutting equipment. A decade of specialty shape expertise. The company that says yes when everyone else says no.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a href="/builder" className="inline-block bg-gold text-dark font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200">Design Your Specialty Shade</a>
            <a href="/swatches" className="inline-block border border-white/50 text-white font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-white/10 transition-colors duration-200">Order Free Swatches</a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm font-sans text-warm-gray">
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-gold fill-gold" />4.9/5 from 500+ Homeowners</span>
            <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-gold" />Ships ~7–10 Days</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-gold" />100% Fit Guarantee</span>
            <span className="flex items-center gap-1.5"><Factory className="w-4 h-4 text-gold" />Made in USA</span>
          </div>
        </div>
      </section>

      {/* ─── 2. STATS BAR ─── */}
      <section className="bg-dark border-y border-white/10">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[{ number: "10+", label: "Specialty Shapes" }, { number: "700+", label: "Fabric Options" }, { number: "USA", label: "Factory Direct" }, { number: "From $1,950", label: "Specialty Shapes" }].map((stat) => (
              <div key={stat.number + stat.label} className="flex flex-col items-center py-8 px-4 text-center">
                <span className="font-serif text-3xl md:text-4xl font-bold text-gold leading-none">{stat.number}</span>
                <span className="font-sans text-sm text-warm-gray mt-2 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. THE PROBLEM ─── */}
      <section className="section-padding">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">Four Local Companies Said No. Sound Familiar?</h2>
            <p className="font-sans text-warm-gray mt-4 max-w-2xl mx-auto leading-relaxed">If you have triangle, trapezoid, or hexagon windows, you&rsquo;ve heard it all: &ldquo;We don&rsquo;t do that shape.&rdquo; &ldquo;That&rsquo;ll be $5,000+.&rdquo; &ldquo;Lead time is 8 weeks.&rdquo; You&rsquo;re not alone — most window treatment companies refuse specialty shapes because they don&rsquo;t have the equipment.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <AlertTriangle className="w-6 h-6 text-red-400" />, title: "\"We don't do that shape\"", body: "Most companies lack specialty cutting equipment for angled and irregular shapes." },
              { icon: <DollarSign className="w-6 h-6 text-red-400" />, title: "\"$5,000+ per window\"", body: "Showrooms charge a steep premium when they do agree to take on custom shapes." },
              { icon: <Clock className="w-6 h-6 text-red-400" />, title: "\"8-week lead time\"", body: "Specialty shapes take forever at traditional shops. Your windows sit bare for months." },
              { icon: <Eye className="w-6 h-6 text-red-400" />, title: "No way to preview", body: "You can't see what your specialty shade will look like in your room before ordering." },
            ].map((card) => (
              <div key={card.title} className="bg-cream-dark rounded-lg p-6 flex flex-col gap-3 border border-cream-dark">
                <div className="w-10 h-10 rounded-full bg-red-400/10 flex items-center justify-center shrink-0">{card.icon}</div>
                <h3 className="font-serif text-base font-bold text-dark leading-snug">{card.title}</h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. SHAPE CATALOG ─── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">Every Shape. Custom Made.</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-xl mx-auto">We manufacture shades for 10+ specialty shapes. Select your shape to start designing.</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {/* Triangles */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-cream-dark flex flex-col">
              <div className="bg-cream-dark p-6 flex justify-center items-center" style={{ minHeight: "140px" }}>
                <img src="https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895721/Acute_Triangle_tlw47x.png" alt="Acute Triangle window shade shape" className="h-24 w-auto object-contain" />
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">Triangles</p>
                <h3 className="font-serif text-xl font-bold text-dark leading-snug">Triangle Window Shades</h3>
                <ul className="space-y-1.5 font-sans text-sm text-warm-gray">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold shrink-0" />Right Triangle (Left) — From $1,950</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold shrink-0" />Right Triangle (Right) — From $1,950</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold shrink-0" />Acute/Equilateral — From $1,950</li>
                </ul>
                <p className="font-sans text-xs text-warm-gray mt-1"><span className="font-semibold text-dark">Common in:</span> A-frame homes, ski chalets, loft apartments, vaulted ceilings</p>
                <a href="/builder" className="inline-block mt-auto text-center bg-dark text-white font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-dark-soft transition-colors duration-200">Design Triangle Shade</a>
              </div>
            </div>

            {/* Trapezoids */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-cream-dark flex flex-col">
              <div className="bg-cream-dark p-6 flex justify-center items-center" style={{ minHeight: "140px" }}>
                <img src="https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895717/Flat_Top_Trapezoid_left_cazqz3.png" alt="Flat Top Trapezoid window shade shape" className="h-24 w-auto object-contain" />
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">Trapezoids</p>
                <h3 className="font-serif text-xl font-bold text-dark leading-snug">Trapezoid Window Shades</h3>
                <ul className="space-y-1.5 font-sans text-sm text-warm-gray">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold shrink-0" />Trapezoid Left Angle — From $1,950</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold shrink-0" />Trapezoid Right Angle — From $1,950</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold shrink-0" />Flat Top Trapezoid — From $1,950</li>
                </ul>
                <p className="font-sans text-xs text-warm-gray mt-1"><span className="font-semibold text-dark">Common in:</span> Sloped ceilings, cathedral ceilings, loft bedrooms, attic conversions</p>
                <a href="/builder" className="inline-block mt-auto text-center bg-dark text-white font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-dark-soft transition-colors duration-200">Design Trapezoid Shade</a>
              </div>
            </div>

            {/* Hexagons & Pentagons */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-cream-dark flex flex-col">
              <div className="bg-cream-dark p-6 flex justify-center items-center gap-6" style={{ minHeight: "140px" }}>
                <img src="https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895722/Flat_Top_Hexagon_zlqbx3.png" alt="Flat Top Hexagon" className="h-20 w-auto object-contain" />
                <img src="https://res.cloudinary.com/dcmlcfynd/image/upload/v1764895717/Pentagon_cmdrjj.png" alt="Pentagon" className="h-20 w-auto object-contain" />
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">Hexagons &amp; Pentagons</p>
                <h3 className="font-serif text-xl font-bold text-dark leading-snug">Hexagon &amp; Pentagon Shades</h3>
                <ul className="space-y-1.5 font-sans text-sm text-warm-gray">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold shrink-0" />Flat Top Hexagon — From $1,950</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold shrink-0" />Pentagon — From $1,950</li>
                </ul>
                <p className="font-sans text-xs text-warm-gray mt-1"><span className="font-semibold text-dark">Common in:</span> Entryways, bathrooms, stairways, decorative windows</p>
                <a href="/builder" className="inline-block mt-auto text-center bg-dark text-white font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-dark-soft transition-colors duration-200">Design Hexagon Shade</a>
              </div>
            </div>

            {/* Arched */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-cream-dark flex flex-col">
              <div className="p-6 flex flex-col justify-center items-center" style={{ minHeight: "140px", background: "linear-gradient(135deg, #f5f0e8 0%, #ede7da 100%)" }}>
                <svg viewBox="0 0 80 60" className="h-20 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M10 58 L10 30 Q10 8 40 8 Q70 8 70 30 L70 58 Z" stroke="#c8a165" strokeWidth="2.5" fill="#c8a16520" /></svg>
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">Arched Windows</p>
                <h3 className="font-serif text-xl font-bold text-dark leading-snug">Arch Window Shades</h3>
                <ul className="space-y-1.5 font-sans text-sm text-warm-gray">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold shrink-0" />Half-moon arch</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold shrink-0" />Quarter-round arch</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold shrink-0" />Full-arch</li>
                </ul>
                <p className="font-sans text-xs text-warm-gray mt-1"><span className="font-semibold text-dark">Common in:</span> Mediterranean homes, church-style windows, grand entryways</p>
                <a href="/builder" className="inline-block mt-auto text-center bg-dark text-white font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-dark-soft transition-colors duration-200">Design Arch Shade</a>
              </div>
            </div>

            {/* Skylights */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-cream-dark flex flex-col">
              <div className="p-6 flex flex-col justify-center items-center" style={{ minHeight: "140px", background: "linear-gradient(135deg, #f5f0e8 0%, #ede7da 100%)" }}>
                <svg viewBox="0 0 80 60" className="h-20 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="8" y="8" width="64" height="44" rx="3" stroke="#c8a165" strokeWidth="2.5" fill="#c8a16520" /><line x1="8" y1="30" x2="72" y2="30" stroke="#c8a165" strokeWidth="1.5" strokeDasharray="4 3" /><circle cx="40" cy="19" r="4" fill="#c8a165" opacity="0.6" /></svg>
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">Skylights</p>
                <h3 className="font-serif text-xl font-bold text-dark leading-snug">Skylight Shades</h3>
                <ul className="space-y-1.5 font-sans text-sm text-warm-gray">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold shrink-0" />Overhead and angled skylights</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold shrink-0" />Tension-mounted systems</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold shrink-0" />Track-guided systems</li>
                </ul>
                <p className="font-sans text-xs text-warm-gray mt-1"><span className="font-semibold text-dark">Common in:</span> Modern homes, sunrooms, studios, converted lofts</p>
                <a href="/builder" className="inline-block mt-auto text-center bg-dark text-white font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-dark-soft transition-colors duration-200">Design Skylight Shade</a>
              </div>
            </div>

            {/* Large & Oversized */}
            <div className="bg-white rounded-lg overflow-hidden shadow-sm border border-cream-dark flex flex-col">
              <div className="p-6 flex flex-col justify-center items-center" style={{ minHeight: "140px", background: "linear-gradient(135deg, #f5f0e8 0%, #ede7da 100%)" }}>
                <svg viewBox="0 0 80 60" className="h-20 w-auto" fill="none" xmlns="http://www.w3.org/2000/svg"><rect x="4" y="10" width="72" height="40" rx="2" stroke="#c8a165" strokeWidth="2.5" fill="#c8a16520" /><line x1="4" y1="30" x2="76" y2="30" stroke="#c8a165" strokeWidth="1.5" /><line x1="28" y1="10" x2="28" y2="50" stroke="#c8a165" strokeWidth="1" strokeDasharray="3 3" /><line x1="52" y1="10" x2="52" y2="50" stroke="#c8a165" strokeWidth="1" strokeDasharray="3 3" /></svg>
              </div>
              <div className="p-6 flex flex-col gap-3 flex-1">
                <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">Large &amp; Oversized</p>
                <h3 className="font-serif text-xl font-bold text-dark leading-snug">Large &amp; Oversized Shades</h3>
                <ul className="space-y-1.5 font-sans text-sm text-warm-gray">
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold shrink-0" />Floor-to-ceiling and panoramic</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold shrink-0" />Up to 24 feet wide</li>
                  <li className="flex items-center gap-2"><Check className="w-3.5 h-3.5 text-gold shrink-0" />Single-shade or multi-panel</li>
                </ul>
                <p className="font-sans text-xs text-warm-gray mt-1"><span className="font-semibold text-dark">Common in:</span> Modern architecture, great rooms, open-plan living</p>
                <a href="/builder" className="inline-block mt-auto text-center bg-dark text-white font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-dark-soft transition-colors duration-200">Design Oversized Shade</a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 5. AI BUILDER SHOWCASE ─── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img src="https://worldwideshades.com/cdn/shop/files/4baccbb8-1c69-4698-bac3-bf3aae0e70c6.png?v=1768669731" alt="Triangle window shades in a real home" className="w-full h-full object-cover" style={{ minHeight: "380px" }} />
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">AI-Powered</p>
              <h2 className="heading-section font-serif text-white leading-tight">See Your Specialty Shades Before You Buy</h2>
              <p className="font-sans text-warm-gray leading-relaxed">Our Room Visualizer uses AI to show you exactly how your triangle, trapezoid, or hexagon shades will look in your actual room. No more guessing.</p>
              <ul className="space-y-3 mt-2">
                {["Works with all specialty shapes", "Preview all 700+ fabrics", "Camera or upload"].map((item) => (
                  <li key={item} className="flex items-center gap-3 font-sans text-warm-gray"><Check className="w-4 h-4 text-gold shrink-0" />{item}</li>
                ))}
              </ul>
              <a href="/builder" className="inline-block self-start bg-gold text-dark font-sans font-semibold text-sm px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200 mt-2">Try the Room Visualizer</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 6. WHY WWS ─── */}
      <section className="section-padding bg-cream-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">Why World Wide Shades</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">Four pillars that set us apart from every other option.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Wrench className="w-6 h-6 text-gold" />, heading: "Proprietary Equipment", body: "Specialized cutting machines built for angled and irregular shapes. No one else has them." },
              { icon: <Star className="w-6 h-6 text-gold" />, heading: "A Decade of Expertise", body: "Industry veterans who've solved thousands of specialty window challenges." },
              { icon: <DollarSign className="w-6 h-6 text-gold" />, heading: "Factory-Direct Pricing", body: "No showroom markup. $1,950 vs $5,000+ at traditional shops." },
              { icon: <ShieldCheck className="w-6 h-6 text-gold" />, heading: "100% Fit Guarantee", body: "If it doesn't fit, we remake it free. No exceptions. No questions." },
            ].map((p) => (
              <div key={p.heading} className="flex flex-col gap-4 bg-white rounded-lg p-6 shadow-sm border border-cream-dark">
                <div className="w-11 h-11 rounded-full bg-dark flex items-center justify-center shrink-0">{p.icon}</div>
                <h3 className="font-serif text-lg font-bold text-dark">{p.heading}</h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. HOW IT WORKS ─── */}
      <section className="section-padding">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">How It Works</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">From choosing your shape to hanging your shade — four simple steps.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Eye className="w-6 h-6 text-gold" />, step: "01", heading: "Select Your Shape", body: "Choose from 10+ shapes. Our builder shows exactly which measurements you need." },
              { icon: <Palette className="w-6 h-6 text-gold" />, step: "02", heading: "Choose Fabric", body: "700+ options in blackout, light filtering, and solar. Order free swatches first." },
              { icon: <Sparkles className="w-6 h-6 text-gold" />, step: "03", heading: "Preview & Order", body: "AI Room Visualizer shows your shades in your actual room. Enter dimensions and confirm." },
              { icon: <Truck className="w-6 h-6 text-gold" />, step: "04", heading: "Receive & Install", body: "Ships in 7–10 days via FedEx. All hardware included." },
            ].map((s) => (
              <div key={s.step} className="flex flex-col gap-3">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-full bg-dark flex items-center justify-center shrink-0">{s.icon}</div>
                  <span className="font-sans font-bold text-2xl text-dark opacity-25 leading-none">{s.step}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-dark">{s.heading}</h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12"><a href="/builder" className="inline-block bg-gold text-dark font-sans font-semibold text-sm px-10 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200">Start Designing</a></div>
        </div>
      </section>

      {/* ─── 8. REAL INSTALLATIONS ─── */}
      <section className="section-padding bg-dark-muted">
        <div className="container-site px-4">
          <div className="text-center mb-10">
            <h2 className="heading-section font-serif text-white">Real Specialty Shapes. Real Homes.</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">Every one of these was a window someone else said no to.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { src: "https://worldwideshades.com/cdn/shop/files/ChatGPT_Image_Jan_23_2026_08_18_14_PM.png?v=1769217506", alt: "Triangle shades in A-frame home", caption: "Triangle — A-Frame Home" },
              { src: "https://worldwideshades.com/cdn/shop/files/4baccbb8-1c69-4698-bac3-bf3aae0e70c6.png?v=1768669731", alt: "Triangle shades in living room", caption: "Triangle — Loft Living Room" },
              { src: "https://worldwideshades.com/cdn/shop/files/hf_20260126_234144_fa5ee37d-7488-4583-ad24-ebde7ab301ef.png?v=1769473636", alt: "Trapezoid shades installed", caption: "Trapezoid — Cathedral Ceiling" },
              { src: "https://worldwideshades.com/cdn/shop/files/hf_20260127_003205_346d99ed-417d-4e16-9a2a-706f84bc8f67.png?v=1769474007", alt: "Trapezoid shades in home", caption: "Trapezoid — Attic Conversion" },
            ].map((img) => (
              <div key={img.caption} className="rounded-lg overflow-hidden group relative">
                <img src={img.src} alt={img.alt} className="w-full object-cover transition-transform duration-500 group-hover:scale-105" style={{ height: "240px" }} />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
                <p className="absolute bottom-3 left-3 right-3 font-sans text-xs font-semibold text-white">{img.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. COMPARISON TABLE ─── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="text-center mb-10">
            <h2 className="heading-section font-serif text-white">See How We Compare — Honestly</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">No other company covers the full range of specialty shapes at this price point.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full font-sans text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 text-warm-gray font-semibold w-1/4"></th>
                  <th className="py-4 px-4 text-center font-bold text-white bg-dark-soft border-t-2 border-gold rounded-t-sm">World Wide Shades</th>
                  <th className="py-4 px-4 text-center font-semibold text-warm-gray">Local Showrooms</th>
                  <th className="py-4 px-4 text-center font-semibold text-warm-gray">Other Online</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Triangle Shades", wws: true, show: "Rare", online: false },
                  { label: "Trapezoid Shades", wws: true, show: "Rare", online: false },
                  { label: "Hexagon Shades", wws: true, show: false, online: false },
                  { label: "Pentagon Shades", wws: true, show: false, online: false },
                  { label: "Arch Shades", wws: true, show: "Sometimes", online: false },
                  { label: "Pricing", wws: "From $1,950", show: "$5,000+", online: "N/A" },
                  { label: "AI Preview", wws: true, show: false, online: false },
                  { label: "Fit Guarantee", wws: true, show: "Varies", online: false },
                  { label: "Ship Time", wws: "7–10 Days", show: "6–8 Weeks", online: "N/A" },
                ].map((row, i) => {
                  const cell = (val: boolean | string) => val === true ? <Check className="w-5 h-5 text-gold mx-auto" /> : val === false ? <X className="w-5 h-5 text-red-400 mx-auto" /> : <span className="text-warm-gray">{val}</span>
                  return (
                    <tr key={row.label} className={i % 2 === 0 ? "bg-dark-soft/30" : ""}>
                      <td className="py-3.5 px-4 text-warm-gray font-medium">{row.label}</td>
                      <td className="py-3.5 px-4 text-center bg-dark-soft/50">{cell(row.wws)}</td>
                      <td className="py-3.5 px-4 text-center">{cell(row.show)}</td>
                      <td className="py-3.5 px-4 text-center">{cell(row.online)}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── 10. PRICING ─── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">Transparent Pricing</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">No hidden fees. No showroom markup. Factory-direct.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { name: "Standard Roller Shades", price: "From $153", note: "Rectangle windows", features: ["All fabric options", "Custom sizing to ⅛\"", "Inside or outside mount", "100% Fit Guarantee"], highlight: false, cta: "Design Standard Shade" },
              { name: "Specialty Shapes", price: "From $1,950", note: "Triangle, trapezoid, hexagon, pentagon, arch", features: ["All 10+ specialty shapes", "700+ fabric options", "Proprietary precision cutting", "100% Fit Guarantee"], highlight: true, cta: "Design Specialty Shade" },
              { name: "Motorized Upgrade", price: "From +$250", note: "Available on all shapes", features: ["Alexa & Google Home compatible", "Wireless remote included", "Rechargeable battery motor", "Available for all shapes"], highlight: false, cta: "Add Motorization" },
            ].map((tier) => (
              <div key={tier.name} className={`rounded-lg p-8 flex flex-col gap-4 ${tier.highlight ? "bg-dark text-white border-2 border-gold shadow-xl" : "bg-white border border-cream-dark shadow-sm"}`}>
                {tier.highlight && <span className="font-sans text-xs font-bold tracking-widest text-dark bg-gold rounded-full px-3 py-1 self-start uppercase">Most Popular</span>}
                <div>
                  <p className={`font-sans text-xs font-bold tracking-widest uppercase mb-2 ${tier.highlight ? "text-gold" : "text-warm-gray"}`}>{tier.name}</p>
                  <p className={`font-serif text-4xl font-bold ${tier.highlight ? "text-white" : "text-dark"}`}>{tier.price}</p>
                  <p className="font-sans text-sm mt-1 text-warm-gray">{tier.note}</p>
                </div>
                <ul className="space-y-2 flex-1">
                  {tier.features.map((f) => <li key={f} className="flex items-center gap-2 font-sans text-sm"><Check className="w-4 h-4 shrink-0 text-gold" /><span className="text-warm-gray">{f}</span></li>)}
                </ul>
                <a href="/builder" className={`inline-block text-center font-sans font-semibold text-sm px-6 py-3 rounded-sm transition-colors duration-200 mt-2 ${tier.highlight ? "bg-gold text-dark hover:bg-gold-dark" : "bg-dark text-white hover:bg-dark-soft"}`}>{tier.cta}</a>
              </div>
            ))}
          </div>
          <p className="text-center font-sans text-sm text-warm-gray mt-8">All prices include: Custom manufacturing · Free shipping · All hardware · 100% Fit Guarantee</p>
        </div>
      </section>

      {/* ─── 11. REVIEWS ─── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="text-center mb-10">
            <div className="flex justify-center gap-1 mb-4">{[1,2,3,4,5].map((i) => <Star key={i} className="w-5 h-5 text-gold fill-gold" />)}</div>
            <h2 className="heading-section font-serif text-white">Homeowners Who Finally Got a Yes</h2>
            <p className="font-sans text-warm-gray mt-3">4.9/5 from 500+ verified customers</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Sarah M.", location: "Austin, TX", shape: "Triangle", quote: "Four local companies said no to our triangle windows. World Wide Shades said 'no problem.' Perfect fit, beautiful fabric." },
              { name: "Michael R.", location: "Denver, CO", shape: "Trapezoid", quote: "Competitors quoted over $5,000 for our trapezoid windows. World Wide Shades was significantly less — and the quality exceeded our expectations." },
              { name: "Jennifer L.", location: "Seattle, WA", shape: "Hexagon", quote: "I'd given up on covering our hexagon windows. Customer service walked me through measuring step by step. Perfect fit on the first try." },
            ].map((r) => (
              <div key={r.name} className="bg-dark-soft rounded-lg p-7 flex flex-col gap-4 border border-white/10">
                <div className="flex gap-0.5">{[1,2,3,4,5].map((i) => <Star key={i} className="w-4 h-4 text-gold fill-gold" />)}</div>
                <p className="font-sans text-warm-gray leading-relaxed italic flex-1">&ldquo;{r.quote}&rdquo;</p>
                <div><p className="font-sans font-semibold text-white text-sm">{r.name}</p><p className="font-sans text-xs text-warm-gray">{r.location} — {r.shape} Windows</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 12. FAQ ─── */}
      <section className="section-padding">
        <div className="container-narrow px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">Frequently Asked Questions</h2>
            <p className="font-sans text-warm-gray mt-3">Everything you need to know about specialty shape shades.</p>
          </div>
          <div className="space-y-0 divide-y divide-cream-dark border border-cream-dark rounded-lg overflow-hidden">
            {[
              { q: "Can you make shades for triangle windows?", a: "Yes. We specialize in triangle window shades including right triangles (left and right angle), acute/equilateral triangles, and other angled configurations. We use proprietary cutting equipment that most companies don't have. From $1,950." },
              { q: "What specialty shapes can you manufacture?", a: "We manufacture shades for 10+ shapes: right triangle (left/right), acute triangle, trapezoid (left/right/flat top), flat top hexagon, pentagon, arch (half-moon, quarter-round, full-arch), skylights, and oversized windows up to 24 feet wide." },
              { q: "Why won't most companies make specialty shapes?", a: "Most companies lack the specialized cutting equipment. Standard manufacturing uses straight cuts only. We invested in proprietary machines specifically for angled and irregular shapes." },
              { q: "How much do specialty shape shades cost?", a: "From $1,950 — significantly less than the $5,000+ quotes from traditional showrooms. Factory-direct pricing eliminates showroom markup. Motorization from +$250." },
              { q: "How do I measure a triangle or trapezoid window?", a: "Our builder shows exactly which measurements you need for your specific shape — including angles, base width, height at each side, and mounting depth. Our team can walk you through it." },
              { q: "Can I preview specialty shapes before ordering?", a: "Yes. Our AI Room Visualizer works with all specialty shapes and all 700+ fabrics. You can also order free swatches." },
              { q: "What fabrics are available?", a: "All 700+ fabrics including blackout, light filtering, and solar from Phifer, Ferrari, Mermet, Texstyle, Senbesta, and Copaco." },
              { q: "Can specialty shapes be motorized?", a: "Yes. From +$250. Especially practical for triangle and skylight windows that are hard to reach. Compatible with Alexa, Google Home, Apple HomeKit." },
              { q: "What if my shade doesn't fit?", a: "100% Fit Guarantee — if it doesn't fit per our guide, we remake it free. No exceptions. Our team reviews all measurements before production." },
              { q: "How long does shipping take?", a: "7–10 business days via FedEx — significantly faster than the 6–8 week lead times at traditional showrooms." },
            ].map((faq, i) => (
              <details key={i} className="group bg-white">
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none hover:bg-cream transition-colors duration-150">
                  <span className="font-serif text-base font-bold text-dark">{faq.q}</span>
                  <span className="shrink-0 w-5 h-5 rounded-full border border-cream-dark flex items-center justify-center text-dark font-bold text-sm group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="px-6 pb-5 pt-1"><p className="font-sans text-sm text-warm-gray leading-relaxed">{faq.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 13. FINAL CTA ─── */}
      <section className="relative section-padding flex flex-col justify-center items-center text-center text-white overflow-hidden" style={{ backgroundImage: "url(https://images.contentstack.io/v3/assets/bltf589e66bcaecd79c/blt309cabd1e83ad611/65c66807f48bc2389d50e43b/social-window-wall-triangle-windows.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-dark/80" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 container-narrow px-4 flex flex-col items-center gap-6 py-24">
          <h2 className="heading-section font-serif text-white max-w-2xl leading-tight">Ready to Finally <span className="gold-gradient-text">Cover Those Windows?</span></h2>
          <p className="font-sans text-lg text-warm-gray max-w-xl leading-relaxed">Join homeowners nationwide who found a solution for their specialty shape windows.</p>
          <a href="/builder" className="inline-block bg-gold text-dark font-sans font-semibold text-base px-10 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200">Design Your Specialty Shade</a>
          <div className="flex flex-wrap justify-center gap-6 mt-2 text-sm font-sans text-warm-gray">
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-gold fill-gold" />4.9/5 from 500+</span>
            <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-gold" />Ships ~7–10 Days</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-gold" />100% Fit Guarantee</span>
            <span className="flex items-center gap-1.5"><Factory className="w-4 h-4 text-gold" />Made in USA</span>
            <span className="flex items-center gap-1.5"><Phone className="w-4 h-4 text-gold" />(844) 674-2716</span>
          </div>
        </div>
      </section>
    </>
  )
}
