import type { Metadata } from "next"
import {
  Star,
  Moon,
  Sunrise,
  Users,
  Thermometer,
  Ruler,
  Layers,
  Zap,
  Palette,
  Hammer,
  CheckCircle,
  Check,
  X,
  Truck,
  Factory,
  Sparkles,
  Phone,
  Upload,
  Eye,
  BedDouble,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Blackout Shades for Bedrooms | Sleep in Complete Darkness — World Wide Shades",
  description: "Custom blackout shades for bedrooms. 100% light blocking, custom-fit to your exact windows. 200+ fabrics from $250. Motorized option available. Ships in 7 days.",
  openGraph: {
    title: "Blackout Shades for Bedrooms | World Wide Shades",
    description: "Transform your bedroom into a sleep sanctuary. Custom blackout shades that block 100% of light. Factory-direct from $250.",
    url: "https://worldwideshades.com/rooms/bedroom",
    siteName: "World Wide Shades",
    type: "website",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Product", name: "Blackout Shades for Bedrooms", description: "Custom blackout shades for bedrooms. 100% light blocking, precision-cut to your exact windows. 200+ premium fabrics. Made in USA, ships in 7 days.", brand: { "@type": "Brand", name: "World Wide Shades" }, offers: { "@type": "AggregateOffer", lowPrice: "250", highPrice: "900", priceCurrency: "USD", availability: "https://schema.org/InStock" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "500", bestRating: "5", worstRating: "1" } },
    { "@type": "FAQPage", mainEntity: [
      { "@type": "Question", name: "How dark do blackout shades actually make a bedroom?", acceptedAnswer: { "@type": "Answer", text: "Our blackout shades achieve true pitch-black darkness when custom-fit to your exact window dimensions. Combined with optional side-channel light blockers, you get a bedroom that's dark at any time of day." } },
      { "@type": "Question", name: "Will light-colored blackout fabrics still block all light?", acceptedAnswer: { "@type": "Answer", text: "Yes. The blackout performance comes from a multi-layer backing — it has nothing to do with the face color. White blocks the same 100% of light as charcoal." } },
      { "@type": "Question", name: "Can I wake up to natural light with blackout shades?", acceptedAnswer: { "@type": "Answer", text: "Yes — with our motorized option. Schedule shades to open gradually at your alarm time. Works with Alexa, Google Home, Apple HomeKit." } },
      { "@type": "Question", name: "What about light gaps around the edges?", acceptedAnswer: { "@type": "Answer", text: "Our shades are cut to your exact dimensions. Optional side channels eliminate the thin light lines on each edge for true zero-light blackout." } },
      { "@type": "Question", name: "Can I get fabric samples?", acceptedAnswer: { "@type": "Answer", text: "Yes — up to 10 free swatches. Pair with our AI room visualizer to see how colors look in your bedroom." } },
      { "@type": "Question", name: "How long does installation take?", acceptedAnswer: { "@type": "Answer", text: "15-20 minutes per shade. 4 screws, all hardware included. No special tools needed." } },
      { "@type": "Question", name: "Do blackout shades help with noise?", acceptedAnswer: { "@type": "Answer", text: "Heavier blackout fabrics provide modest noise reduction, particularly from street traffic." } },
      { "@type": "Question", name: "Can blackout shades reduce my energy bill?", acceptedAnswer: { "@type": "Answer", text: "Yes. They can reduce solar heat gain by up to 77% and heat loss by up to 40%." } },
    ] },
    { "@type": "Organization", name: "World Wide Shades LLC", url: "https://worldwideshades.com", telephone: "+18446742716" },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://worldwideshades.com" },
      { "@type": "ListItem", position: 2, name: "Blackout Shades", item: "https://worldwideshades.com/blackout-roller-shades" },
      { "@type": "ListItem", position: 3, name: "Bedrooms", item: "https://worldwideshades.com/rooms/bedroom" },
    ] },
  ],
}

export default function BedroomShadesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ─── 1. HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center text-white overflow-hidden" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1616594039964-ae9021a400a0?auto=format&fit=crop&w=1920&q=80)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-dark/85" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 container-site section-padding flex flex-col items-center gap-6 px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-sans font-semibold tracking-widest text-warm-gray uppercase">100% Blackout&nbsp;·&nbsp;Custom-Fit&nbsp;·&nbsp;Made in USA</div>
          <h1 className="heading-display font-serif text-white max-w-4xl leading-tight">Transform Your Bedroom Into a <span className="gold-gradient-text">Sleep Sanctuary</span></h1>
          <p className="font-sans text-lg md:text-xl text-warm-gray max-w-2xl leading-relaxed">Custom blackout shades that block 100% of light. No gaps. No glow. Just deep, uninterrupted sleep — every single night.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a href="/builder" className="inline-block bg-gold text-dark font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200">Design Your Bedroom Shades</a>
            <a href="/swatches" className="inline-block border border-white/50 text-white font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-white/10 transition-colors duration-200">Order Free Swatches</a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm font-sans text-warm-gray">
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-gold fill-gold" />4.9/5 from 500+ Homeowners</span>
            <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-gold" />Ships in ~7 Days</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-gold" />100% Fit Guarantee</span>
            <span className="flex items-center gap-1.5"><Factory className="w-4 h-4 text-gold" />Made in USA</span>
          </div>
        </div>
      </section>

      {/* ─── 2. STATS BAR ─── */}
      <section className="bg-dark border-y border-white/10">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[{ number: "100%", label: "Light Blocked" }, { number: "~7 Days", label: "Delivered" }, { number: "200+", label: "Blackout Fabrics" }, { number: "$250+", label: "Factory-Direct" }].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-8 px-4 text-center">
                <span className="font-serif text-3xl md:text-4xl font-bold text-gold leading-none">{stat.number}</span>
                <span className="font-sans text-sm text-warm-gray mt-2 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. SLEEP PROBLEM ─── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">The Problem</p>
            <h2 className="heading-section font-serif text-white">Your Bedroom Is Sabotaging Your Sleep</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-xl mx-auto">Light is the single biggest disruptor of deep sleep — and most windows let it in.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Moon className="w-6 h-6 text-gold" />, title: "Street Lights Bleeding Through", body: "Curtains and cheap blinds leave light gaps around every edge. Even a sliver suppresses melatonin." },
              { icon: <Sunrise className="w-6 h-6 text-gold" />, title: "Early Sunrise Waking You Up", body: "Even 30 minutes of lost sleep compounds into chronic fatigue. East-facing bedrooms are bright by 6am." },
              { icon: <Users className="w-6 h-6 text-gold" />, title: "Partner's Different Schedule", body: "One person needs to sleep while the other reads or works. Every light source becomes conflict." },
              { icon: <Thermometer className="w-6 h-6 text-gold" />, title: "Overheating from Sunlight", body: "Direct sun turns your bedroom into a greenhouse by mid-morning. Heat disrupts sleep cycles." },
            ].map((card) => (
              <div key={card.title} className="bg-dark-soft rounded-lg p-7 flex flex-col gap-4 border border-white/10">
                <div className="w-11 h-11 rounded-full bg-dark border border-gold/30 flex items-center justify-center shrink-0">{card.icon}</div>
                <h3 className="font-serif text-base font-bold text-white leading-snug">{card.title}</h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. THE SOLUTION ─── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">The Fix</p>
            <h2 className="heading-section font-serif text-dark">What True Blackout Actually Looks Like</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-2xl mx-auto leading-relaxed">Most &quot;blackout&quot; shades still leak light. Ours are precision-cut to your exact measurements — down to ⅛ inch. Zero light leakage.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Layers className="w-6 h-6 text-gold" />, title: "100% Light Blocked", body: "Multi-layer blackout fabric, not \"room darkening.\" True blackout at every hour." },
              { icon: <Ruler className="w-6 h-6 text-gold" />, title: "Custom-Fit Precision", body: "Built to your exact window. No light gaps around edges. Precision down to ⅛ inch." },
              { icon: <Zap className="w-6 h-6 text-gold" />, title: "Whisper-Quiet Motorized", body: "Schedule shades to open with your alarm. Fall asleep in darkness. Wake to gradual sunlight." },
              { icon: <Palette className="w-6 h-6 text-gold" />, title: "200+ Premium Fabrics", body: "Colors from deep charcoal to soft white. Every single one blocks 100% of light." },
            ].map((card) => (
              <div key={card.title} className="bg-white rounded-lg p-7 flex flex-col gap-4 border border-cream-dark shadow-sm">
                <div className="w-11 h-11 rounded-full bg-dark flex items-center justify-center shrink-0">{card.icon}</div>
                <h3 className="font-serif text-base font-bold text-dark leading-snug">{card.title}</h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. SLEEP SCIENCE ─── */}
      <section className="section-padding bg-cream-dark">
        <div className="container-narrow px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">Sleep Science</p>
            <h2 className="heading-section font-serif text-dark">The Science of Better Sleep</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-xl mx-auto">The data is clear: light in your bedroom is costing you sleep, health, and years of your life.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              { stat: "50%", citation: "National Sleep Foundation", body: "Light exposure during sleep suppresses melatonin production by up to 50%." },
              { stat: "17%", citation: "Northwestern Medicine", body: "Even dim light during sleep increases the risk of obesity, diabetes, and heart disease by 17%." },
              { stat: "36%", citation: "Journal of Clinical Sleep Medicine", body: "Blackout conditions can improve sleep efficiency by 36% and reduce time to fall asleep by 14 minutes." },
            ].map((item) => (
              <div key={item.stat} className="bg-white rounded-lg p-8 flex flex-col gap-3 border border-cream-dark shadow-sm">
                <span className="font-serif text-5xl font-bold text-gold leading-none">{item.stat}</span>
                <p className="font-sans text-sm text-dark leading-relaxed">{item.body}</p>
                <p className="font-sans text-xs text-warm-gray mt-auto">— {item.citation}</p>
              </div>
            ))}
          </div>
          <div className="bg-dark rounded-lg p-8 text-center border border-white/10">
            <p className="font-serif text-xl md:text-2xl font-bold text-white leading-snug">&quot;Your bedroom should be a cave. <span className="gold-gradient-text">Blackout shades make it one.</span>&quot;</p>
          </div>
        </div>
      </section>

      {/* ─── 6. AI BUILDER ─── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img src="https://worldwideshades.com/cdn/shop/files/bedroom-dark-gray-blackout-roller-shade.png?v=1754081688" alt="Dark gray blackout roller shade in bedroom" className="w-full h-full object-cover" style={{ minHeight: "380px" }} />
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">AI-Powered Visualizer</p>
              <h2 className="heading-section font-serif text-white leading-tight">See Your Bedroom Shades Before You Buy</h2>
              <p className="font-sans text-warm-gray leading-relaxed">Upload a photo of your bedroom window. Our AI room visualizer renders your chosen blackout fabric in your actual space — so you know exactly how it&apos;ll look before placing your order.</p>
              <ol className="space-y-3 mt-2">
                {[{ icon: <Upload className="w-4 h-4 text-dark" />, label: "Upload bedroom photo" }, { icon: <Palette className="w-4 h-4 text-dark" />, label: "Choose blackout fabric" }, { icon: <Eye className="w-4 h-4 text-dark" />, label: "See the preview instantly" }].map((step, i) => (
                  <li key={step.label} className="flex items-center gap-3 font-sans text-white"><span className="w-7 h-7 rounded-full bg-gold text-dark font-bold text-sm flex items-center justify-center shrink-0">{i + 1}</span>{step.label}</li>
                ))}
              </ol>
              <a href="/builder" className="inline-block self-start bg-gold text-dark font-sans font-semibold text-sm px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200 mt-2">Try the AI Visualizer</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. BEDROOM SCENARIOS ─── */}
      <section className="section-padding bg-dark-muted">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-white">Every Bedroom. Every Need.</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">Whether it&apos;s your master suite, a guest room, or a smart bedroom setup — we have the right blackout solution.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { badge: "Most Popular", badgeColor: "bg-gold text-dark", image: "https://plus.unsplash.com/premium_photo-1748021658655-60eabdabc6de?auto=format&fit=crop&w=1200&q=80", imageAlt: "Warm luxury master bedroom", heading: "Master Bedroom", title: "Your Sleep Foundation", body: "Every morning starts the night before. Complete darkness for the deepest, most restorative sleep.", cta: "Design for Master Bedroom" },
              { badge: "Host Favorite", badgeColor: "bg-white/20 text-white", image: "https://plus.unsplash.com/premium_photo-1746888841255-42d2452f6ebe?auto=format&fit=crop&w=1200&q=80", imageAlt: "Dark elegant guest bedroom", heading: "Guest Bedroom", title: "Impress Every Guest", body: "Hotel-quality blackout. A light-tight room that makes guests ask \"where did you get those shades?\"", cta: "Design for Guest Bedroom" },
              { badge: "Tech Favorite", badgeColor: "bg-white/20 text-white", image: "https://worldwideshades.com/cdn/shop/files/cozy-bedroom-blackout-motorized-shades-voice-control-energy-savings.png?v=1754079402", imageAlt: "Cozy bedroom with motorized blackout shades", heading: "Motorized Bedroom", title: "Wake Up to Sunlight", body: "Schedule shades to open gradually with sunrise. Natural light alarm that feels like waking up on vacation.", cta: "Design a Motorized Setup" },
            ].map((room) => (
              <div key={room.heading} className="bg-dark rounded-lg overflow-hidden flex flex-col shadow-lg">
                <div className="relative"><img src={room.image} alt={room.imageAlt} className="w-full h-52 object-cover" /><span className={`absolute top-3 left-3 font-sans text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${room.badgeColor}`}>{room.badge}</span></div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">{room.heading}</p>
                  <h3 className="font-serif text-lg font-bold text-white leading-snug">{room.title}</h3>
                  <p className="font-sans text-sm text-warm-gray leading-relaxed flex-1">{room.body}</p>
                  <a href="/builder" className="inline-block mt-2 text-center border border-gold text-gold font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-gold hover:text-dark transition-colors duration-200">{room.cta}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. HOW IT WORKS ─── */}
      <section className="section-padding bg-cream-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">How It Works</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">From measurement to perfect darkness — four simple steps.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Ruler className="w-6 h-6 text-gold" />, step: "01", heading: "Measure Your Window", body: "Use our simple guide. Inside or outside mount. Takes 5 minutes and we'll double-check your numbers." },
              { icon: <Palette className="w-6 h-6 text-gold" />, step: "02", heading: "Pick Blackout Fabric", body: "200+ premium blackout fabrics. Order free swatches or use the AI visualizer to preview." },
              { icon: <Hammer className="w-6 h-6 text-gold" />, step: "03", heading: "We Build It", body: "Precision-manufactured in the USA. Quality-checked, carefully packaged, shipped via FedEx in ~7 days." },
              { icon: <CheckCircle className="w-6 h-6 text-gold" />, step: "04", heading: "Easy Install", body: "4 screws. 15 minutes. All hardware included. 100% Fit Guarantee — if it doesn't fit, we remake it." },
            ].map((s) => (
              <div key={s.step} className="flex flex-col gap-3">
                <div className="flex items-center gap-3 mb-1"><div className="w-10 h-10 rounded-full bg-dark flex items-center justify-center shrink-0">{s.icon}</div><span className="font-sans font-bold text-2xl text-dark-muted opacity-40 leading-none">{s.step}</span></div>
                <h3 className="font-serif text-lg font-bold text-dark">{s.heading}</h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12"><a href="/builder" className="inline-block bg-gold text-dark font-sans font-semibold text-sm px-10 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200">Start Designing</a></div>
        </div>
      </section>

      {/* ─── 9. COMPARISON TABLE ─── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="text-center mb-10">
            <h2 className="heading-section font-serif text-white">See How We Compare — Honestly</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full font-sans text-sm border-collapse">
              <thead><tr>
                <th className="text-left py-4 px-4 text-warm-gray font-semibold w-1/4"></th>
                <th className="py-4 px-4 text-center font-bold text-white bg-dark-soft border-t-2 border-gold rounded-t-sm">World Wide Shades</th>
                <th className="py-4 px-4 text-center font-semibold text-warm-gray">Traditional Showrooms</th>
                <th className="py-4 px-4 text-center font-semibold text-warm-gray">Amazon / Stock</th>
              </tr></thead>
              <tbody>
                {[
                  { label: "Custom Sizing", wws: true, show: true, amz: false },
                  { label: "100% Blackout", wws: true, show: "Sometimes", amz: false },
                  { label: "Fabric Options", wws: "200+", show: "30–80", amz: "10–20" },
                  { label: "Shipping", wws: "~7 Days", show: "3–4 Weeks", amz: "2–5 Days (stock)" },
                  { label: "Fit Guarantee", wws: true, show: false, amz: false },
                  { label: "AI Preview", wws: true, show: false, amz: false },
                  { label: "Motorized Option", wws: true, show: true, amz: false },
                  { label: "Price", wws: "from $250", show: "$350–500/window", amz: "Not custom" },
                ].map((row, i) => {
                  const cell = (v: boolean | string) => v === true ? <Check className="w-5 h-5 text-gold mx-auto" /> : v === false ? <X className="w-5 h-5 text-red-400 mx-auto" /> : v
                  return (
                    <tr key={row.label} className={i % 2 === 0 ? "bg-dark-muted/30" : ""}>
                      <td className="py-3 px-4 text-warm-gray font-medium">{row.label}</td>
                      <td className="py-3 px-4 text-center bg-dark-soft text-gold font-semibold">{cell(row.wws)}</td>
                      <td className="py-3 px-4 text-center text-warm-gray">{cell(row.show)}</td>
                      <td className="py-3 px-4 text-center text-warm-gray">{cell(row.amz)}</td>
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
            <h2 className="heading-section font-serif text-dark">Simple, Factory-Direct Pricing</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-xl mx-auto">No showroom markup. Real pricing, upfront — for every bedroom size.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { tier: "Small", range: "$250 – $350", popular: false, rooms: "Side windows, bathrooms", desc: "Compact windows that still deserve complete darkness." },
              { tier: "Standard", range: "$300 – $600", popular: true, rooms: "Master bedroom, guest rooms", desc: "Our most popular size range. Maximum blackout impact." },
              { tier: "Large", range: "$400 – $900", popular: false, rooms: "Floor-to-ceiling, panoramic", desc: "Big windows demand precision. Same blackout performance at scale." },
            ].map((card) => (
              <div key={card.tier} className={`relative flex flex-col rounded-lg border p-8 shadow-md ${card.popular ? "border-gold bg-dark text-white" : "border-cream-dark bg-white text-dark"}`}>
                {card.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-dark font-sans font-bold text-xs uppercase tracking-widest px-4 py-1 rounded-full">Most Popular</span>}
                <p className={`font-sans text-xs font-bold tracking-widest uppercase mb-2 ${card.popular ? "text-gold" : "text-warm-gray"}`}>{card.tier}</p>
                <p className={`font-serif text-4xl font-bold mb-1 ${card.popular ? "text-white" : "text-dark"}`}>{card.range}</p>
                <p className="font-sans text-sm text-warm-gray mb-5">{card.rooms}</p>
                <p className="font-sans text-sm text-warm-gray mb-6 leading-relaxed">{card.desc}</p>
                <ul className="space-y-2 mb-6">
                  {["Custom-made to your exact specs", "100% blackout fabric", "Free shipping", "All hardware included", "100% Fit Guarantee"].map((f) => (
                    <li key={f} className="flex items-center gap-2 font-sans text-sm"><Check className="w-4 h-4 text-gold shrink-0" /><span className="text-warm-gray">{f}</span></li>
                  ))}
                </ul>
                <p className="font-sans text-xs text-warm-gray/70 mb-6">Motorized upgrade available</p>
                <a href="/builder" className={`block text-center font-sans font-semibold text-sm px-6 py-3 rounded-sm transition-colors duration-200 mt-auto ${card.popular ? "bg-gold text-dark hover:bg-gold-dark" : "bg-dark text-white hover:bg-dark-soft"}`}>Get Your Exact Price</a>
              </div>
            ))}
          </div>
          <p className="text-center font-sans text-sm text-warm-gray mt-8">Financing available with Affirm at checkout.</p>
        </div>
      </section>

      {/* ─── 11. REVIEWS ─── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-2">Customer Reviews</p>
            <h2 className="heading-section font-serif text-white">4.9/5 from 500+ Verified Homeowners</h2>
            <div className="flex justify-center gap-1 mt-3">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-gold fill-gold" />)}</div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "David K.", location: "Austin, TX", room: "Bedroom", quote: "I work nights. Tried everything — curtains, foil, you name it. These are zero light leakage. Like sleeping in a cave. Best investment I've made for my health." },
              { name: "Rachel M.", location: "Portland, OR", room: "Master Bedroom", quote: "Our east-facing bedroom was unbearable by 6am. Now it's pitch black until we want it not to be. The motorized option is a game-changer." },
              { name: "Marcus & Lisa T.", location: "Chicago, IL", room: "Bedroom", quote: "We have different schedules. I'm up at 5am, she sleeps until 7. The motorized shades let me leave quietly in a dark room without disturbing her." },
            ].map((review) => (
              <div key={review.name} className="bg-dark-soft rounded-lg p-7 flex flex-col gap-4">
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-gold fill-gold" />)}</div>
                <p className="font-sans text-warm-gray leading-relaxed text-sm">&ldquo;{review.quote}&rdquo;</p>
                <div className="flex items-center justify-between mt-auto pt-2 border-t border-white/10">
                  <div><p className="font-sans font-semibold text-white text-sm">{review.name}</p><p className="font-sans text-xs text-warm-gray">{review.location} · {review.room}</p></div>
                  <span className="font-sans text-xs font-bold uppercase tracking-widest text-gold border border-gold/40 rounded-full px-3 py-1">Verified Buyer</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 12. FAQ ─── */}
      <section className="section-padding bg-dark-muted">
        <div className="container-narrow px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-white">Frequently Asked Questions</h2>
            <p className="font-sans text-warm-gray mt-3">Everything you need to know before ordering bedroom blackout shades.</p>
          </div>
          <div className="space-y-2">
            {[
              { q: "How dark do blackout shades actually make a bedroom?", a: "Our blackout shades achieve true pitch-black darkness when custom-fit to your exact window dimensions. With optional side channels, you can sleep at noon and not know it." },
              { q: "Will light-colored fabrics still block all light?", a: "Yes. The blackout backing is a separate layer — face color doesn't affect performance. White blocks the same 100% as charcoal." },
              { q: "Can I wake up to natural light with blackout shades?", a: "Yes — with motorization. Schedule shades to open gradually at your alarm time. Works with Alexa, Google Home, Apple HomeKit." },
              { q: "What about light gaps around the edges?", a: "Our shades are cut to your exact dimensions. Optional side channels eliminate the remaining thin lines for true zero-light blackout." },
              { q: "Can I get fabric samples?", a: "Yes — up to 10 free swatches. Pair with our AI room visualizer to see how colors look in your bedroom." },
              { q: "How long does installation take?", a: "15-20 minutes per shade. 4 screws, all hardware included. No special tools needed." },
              { q: "Do blackout shades help with noise?", a: "Heavier blackout fabrics provide modest noise reduction, particularly from street traffic." },
              { q: "Can blackout shades reduce my energy bill?", a: "Yes. They can reduce solar heat gain by up to 77% and heat loss by up to 40%." },
            ].map((faq, i) => (
              <details key={i} className="group bg-dark rounded-lg border border-white/10 overflow-hidden">
                <summary className="flex justify-between items-center gap-4 px-6 py-5 cursor-pointer list-none font-sans font-semibold text-white text-sm hover:text-gold transition-colors duration-200">
                  {faq.q}
                  <span className="shrink-0 text-gold text-xl font-light group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="px-6 pb-5"><p className="font-sans text-sm text-warm-gray leading-relaxed">{faq.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 13. FINAL CTA ─── */}
      <section className="relative section-padding flex flex-col items-center justify-center text-center overflow-hidden" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1560185893-a55cbc8c57e8?auto=format&fit=crop&w=800&q=80)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-dark/88" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 container-narrow px-4 flex flex-col items-center gap-6">
          <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">Sleep Better Tonight</p>
          <h2 className="heading-section font-serif text-white max-w-2xl leading-tight"><span className="gold-gradient-text">Tonight Could Be the Best Sleep of Your Life.</span></h2>
          <p className="font-sans text-warm-gray text-lg max-w-lg">Custom blackout shades. Built for your bedroom. Delivered in 7 days.</p>
          <a href="/builder" className="inline-block bg-gold text-dark font-sans font-semibold text-base px-10 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200 mt-2">Design Your Bedroom Shades</a>
          <div className="flex flex-wrap justify-center gap-6 text-sm font-sans text-warm-gray mt-2">
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-gold" />100% Fit Guarantee</span>
            <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-gold" />Ships in ~7 Days</span>
            <span className="flex items-center gap-1.5"><Check className="w-4 h-4 text-gold" />Free Shipping</span>
            <span className="flex items-center gap-1.5"><Factory className="w-4 h-4 text-gold" />Made in USA</span>
          </div>
          <p className="font-sans text-warm-gray/70 text-sm mt-2">Questions? Call us at <a href="tel:+18446742716" className="text-gold hover:underline">(844) 674-2716</a></p>
        </div>
      </section>
    </>
  )
}
