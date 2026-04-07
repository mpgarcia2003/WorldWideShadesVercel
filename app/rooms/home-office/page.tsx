import type { Metadata } from "next"
import {
  Star,
  Monitor,
  Video,
  Eye,
  Thermometer,
  DollarSign,
  Clock,
  Ruler,
  Factory,
  Truck,
  Sparkles,
  Check,
  X,
  Palette,
  Hammer,
  CheckCircle,
  Zap,
  Sun,
  ChevronDown,
  Phone,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Custom Shades for Home Offices | Reduce Glare, Boost Focus — World Wide Shades",
  description: "Custom home office shades that eliminate screen glare and reduce eye strain. Light filtering for soft focus, motorized for convenience. From $250. Ships in 7 days.",
  openGraph: {
    title: "Custom Shades for Home Offices | World Wide Shades",
    description: "Custom home office shades that eliminate screen glare and reduce eye strain. Light filtering for soft focus, motorized for convenience. From $250. Ships in 7 days.",
    url: "https://worldwideshades.com/rooms/home-office",
    siteName: "World Wide Shades",
    type: "website",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Product", name: "Custom Shades for Home Offices", description: "Custom home office shades that eliminate screen glare and reduce eye strain. Factory-direct from $250. Ships in 7 days.", brand: { "@type": "Brand", name: "World Wide Shades" }, offers: { "@type": "AggregateOffer", lowPrice: "250", highPrice: "900", priceCurrency: "USD", availability: "https://schema.org/InStock" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "500", bestRating: "5", worstRating: "1" } },
    { "@type": "FAQPage", mainEntity: [
      { "@type": "Question", name: "Should I get light filtering or blackout for my home office?", acceptedAnswer: { "@type": "Answer", text: "Light filtering is recommended for most offices. Blackout is best for video editing or presentations. Many do a dual setup." } },
      { "@type": "Question", name: "Will light filtering shades reduce screen glare?", acceptedAnswer: { "@type": "Answer", text: "Yes. They transform direct sunlight into diffused ambient light, eliminating directional glare on monitors." } },
      { "@type": "Question", name: "Do these shades help with video call lighting?", acceptedAnswer: { "@type": "Answer", text: "Significantly. They even out room light, creating soft, flattering illumination on camera." } },
      { "@type": "Question", name: "Can shades reduce my energy bill?", acceptedAnswer: { "@type": "Answer", text: "Yes. Solar and light filtering shades block up to 78% of solar heat gain." } },
      { "@type": "Question", name: "Can I automate shades throughout the day?", acceptedAnswer: { "@type": "Answer", text: "Yes. Motorized shades integrate with Alexa, Google Home, Apple HomeKit for scheduled automation." } },
      { "@type": "Question", name: "What colors work best for a home office?", acceptedAnswer: { "@type": "Answer", text: "Neutral, warm tones — whites, linens, warm grays. Lighter shades create cleaner video call backgrounds." } },
      { "@type": "Question", name: "Can I get free fabric samples?", acceptedAnswer: { "@type": "Answer", text: "Yes — up to 10 free swatches. Just pay shipping." } },
      { "@type": "Question", name: "How do I measure my office window?", acceptedAnswer: { "@type": "Answer", text: "5-minute guide with three measurements each direction. 100% Fit Guarantee included." } },
    ] },
    { "@type": "Organization", name: "World Wide Shades LLC", url: "https://worldwideshades.com", telephone: "+18446742716" },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://worldwideshades.com" },
      { "@type": "ListItem", position: 2, name: "Home Office Shades", item: "https://worldwideshades.com/rooms/home-office" },
    ] },
  ],
}

export default function HomeOfficeShades() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ─── 1. HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center text-white overflow-hidden" style={{ backgroundImage: "url(https://images.unsplash.com/photo-1774311237295-a65a4c1ff38a?auto=format&fit=crop&w=1920&q=80)", backgroundSize: "cover", backgroundPosition: "center top" }}>
        <div className="absolute inset-0 bg-dark/70" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(135deg, rgba(200,161,101,0.08) 0%, rgba(12,12,12,0.0) 60%)" }} />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 container-site section-padding flex flex-col items-center gap-6 px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-sans font-semibold tracking-widest text-warm-gray uppercase">Reduce Glare&nbsp;·&nbsp;Boost Focus&nbsp;·&nbsp;Work Smarter</div>
          <h1 className="heading-display font-serif text-white max-w-4xl leading-tight">Your Best Work Happens in <span className="gold-gradient-text">The Right Light</span></h1>
          <p className="font-sans text-lg md:text-xl text-warm-gray max-w-2xl leading-relaxed">Custom shades that eliminate screen glare, reduce eye strain, and keep your home office comfortable all day. Light filtering for soft focus. Blackout for presentations.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a href="/builder" className="inline-block bg-gold text-dark font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200">Design Your Office Shades</a>
            <a href="/swatches" className="inline-block border border-white/50 text-white font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-white/10 transition-colors duration-200">Order Free Swatches</a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm font-sans text-warm-gray">
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-gold fill-gold" />4.9/5 · 500+ WFH Professionals</span>
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
            {[{ number: "700+", label: "Fabrics" }, { number: "~7 Days", label: "Delivered" }, { number: "50%+", label: "UV Blocked" }, { number: "$250+", label: "Factory-Direct" }].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-8 px-4 text-center">
                <span className="font-serif text-3xl md:text-4xl font-bold text-gold leading-none">{stat.number}</span>
                <span className="font-sans text-sm text-warm-gray mt-2 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. WFH PROBLEM ─── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">Working From Home Shouldn&apos;t Mean Fighting the Sun</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-xl mx-auto">The wrong light doesn&apos;t just ruin your mood — it costs you hours of productive work every day.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-0 rounded-lg overflow-hidden shadow-xl">
            <div className="relative min-h-64 md:min-h-0">
              <img src="https://cdn.outrank.so/9c5f69eb-4d1e-4677-8502-3f8db0bae8a7/f374d32b-73da-44ff-9839-06b1ec2ea41f.jpg" alt="Screen glare in home office" className="w-full h-full object-cover" style={{ minHeight: "340px" }} />
              <div className="absolute inset-0 bg-dark/40" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-sans text-xs font-bold tracking-widest text-gold uppercase">Sound Familiar?</span>
                <p className="font-serif text-white text-xl font-bold mt-1 leading-snug">Repositioning your desk every hour to escape the glare.</p>
              </div>
            </div>
            <div className="bg-dark p-8 md:p-12">
              <p className="font-sans text-xs font-bold tracking-widest text-warm-gray uppercase mb-6">The WFH Light Problem</p>
              <ul className="space-y-7">
                {[
                  { icon: <Monitor className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />, title: "Screen glare kills productivity", body: "Direct sun on your monitor means squinting, headaches, and repositioning your desk every hour." },
                  { icon: <Video className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />, title: "Video call distractions", body: "Blown-out backgrounds, harsh shadows, constantly adjusting blinds mid-meeting." },
                  { icon: <Eye className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />, title: "Eye strain by 3pm", body: "Uneven, harsh lighting causes digital eye strain. 65% of WFH workers report it." },
                  { icon: <Thermometer className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />, title: "Office overheating", body: "West-facing windows turn your office into a sauna every afternoon." },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">{item.icon}<div><p className="font-sans font-semibold text-white text-sm">{item.title}</p><p className="font-sans text-sm text-warm-gray mt-0.5">{item.body}</p></div></li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 4. THE SOLUTION ─── */}
      <section className="section-padding bg-cream-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">The Fix</p>
            <h2 className="heading-section font-serif text-dark">The Right Shades Change Everything</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Sun className="w-7 h-7 text-gold" />, heading: "Diffused, Even Light", body: "Transforms harsh directional sun into soft, ambient light across the entire room." },
              { icon: <Monitor className="w-7 h-7 text-gold" />, heading: "Glare-Free Screen", body: "Work on any monitor without squinting. No more repositioning your desk." },
              { icon: <Video className="w-7 h-7 text-gold" />, heading: "Professional Video Calls", body: "Soft, even lighting. Clean background. No more adjusting blinds mid-meeting." },
              { icon: <Thermometer className="w-7 h-7 text-gold" />, heading: "Cooler, More Comfortable", body: "Reduce solar heat gain by up to 50%. Lower energy bills. A room you can focus in." },
            ].map((card) => (
              <div key={card.heading} className="bg-white rounded-lg p-6 flex flex-col gap-4 shadow-sm border border-cream-dark">
                <div className="w-12 h-12 rounded-full bg-dark flex items-center justify-center shrink-0">{card.icon}</div>
                <h3 className="font-serif text-base font-bold text-dark leading-snug">{card.heading}</h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. RECOMMENDED SETUPS ─── */}
      <section className="section-padding bg-dark-muted">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">Choose Your Setup</p>
            <h2 className="heading-section font-serif text-white">Which Office Shade Is Right for You?</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { badge: "Recommended", badgeColor: "bg-gold text-dark", image: "https://www.theshutterstore.com/Images/2024/February/james-mcdonald-3d4sSUChunA-unsplash.jpg", imageAlt: "Home office with light filtering shades", eyebrow: "Light Filtering", heading: "The Ideal WFH Shade", body: "Soft, diffused light all day. No screen glare but your office stays bright and energized.", cta: "Build Light Filtering Shades" },
              { badge: "Screen-Intensive Work", badgeColor: "bg-white/20 text-white", image: "https://worldwideshades.com/cdn/shop/files/ultrarealistic-home-office-black-blackout-roller-shade.png?v=1754082156", imageAlt: "Home office with blackout shades", eyebrow: "Blackout", heading: "For Presentations & Focus", body: "Complete darkness for video editing, screen-intensive work, and client presentations.", cta: "Build Blackout Shades" },
              { badge: "Best of Both", badgeColor: "bg-white/20 text-white", image: "https://worldwideshades.com/cdn/shop/files/blackout-roller-shade-office-smart-control.png?v=1754080327", imageAlt: "Motorized smart office shades", eyebrow: "Dual Setup", heading: "Best of Both", body: "Light filtering for daily work. Add motorized blackout for presentations. Switch with a voice command.", cta: "Design Your Dual Setup" },
            ].map((room) => (
              <div key={room.eyebrow} className="bg-dark rounded-lg overflow-hidden flex flex-col shadow-lg">
                <div className="relative"><img src={room.image} alt={room.imageAlt} className="w-full h-52 object-cover" /><span className={`absolute top-3 left-3 font-sans text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${room.badgeColor}`}>{room.badge}</span></div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">{room.eyebrow}</p>
                  <h3 className="font-serif text-lg font-bold text-white leading-snug">{room.heading}</h3>
                  <p className="font-sans text-sm text-warm-gray leading-relaxed flex-1">{room.body}</p>
                  <a href="/builder" className="inline-block mt-2 text-center border border-gold text-gold font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-gold hover:text-dark transition-colors duration-200">{room.cta}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. AI BUILDER ─── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img src="https://cdn.shopify.com/s/files/1/0678/5089/5675/files/office_curtain3.png?v=1764916656" alt="Beautiful home office with custom shades" className="w-full h-full object-cover" style={{ minHeight: "380px" }} />
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">AI-Powered</p>
              <h2 className="heading-section font-serif text-dark leading-tight">Preview Your Office Shades Before You Buy</h2>
              <p className="font-sans text-warm-gray leading-relaxed">Upload a photo of your office window. Our AI visualizer renders your chosen fabric and color in your actual room — so you know exactly how it&apos;ll look before ordering.</p>
              <ol className="space-y-3 mt-2">
                {["Upload your office photo", "Choose fabric & opacity level", "See the glare-reduction preview instantly"].map((step, i) => (
                  <li key={step} className="flex items-center gap-3 font-sans text-dark"><span className="w-7 h-7 rounded-full bg-gold text-dark font-bold text-sm flex items-center justify-center shrink-0">{i + 1}</span>{step}</li>
                ))}
              </ol>
              <a href="/builder" className="inline-block self-start bg-dark text-white font-sans font-semibold text-sm px-8 py-4 rounded-sm hover:bg-dark-soft transition-colors duration-200 mt-2">Try the AI Visualizer</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 7. PRODUCTIVITY DATA ─── */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundImage: "url(https://img.freepik.com/premium-photo/black-fabric-luxury-cloth-texture-pattern-background_293060-5660.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-dark/90" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">Data-Backed</p>
            <h2 className="heading-section font-serif text-white">The Numbers Don&apos;t Lie</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              { stat: "+15%", statSub: "Productivity", quote: "Proper lighting increases productivity by 15% and reduces errors by 28%.", source: "Cornell University study" },
              { stat: "65%", statSub: "Affected", quote: "65% of remote workers report eye strain from improper lighting in their home workspace.", source: "American Optometric Association" },
              { stat: "78%", statSub: "Heat Reduction", quote: "Solar shades reduce solar heat gain by up to 78%, directly lowering air conditioning costs.", source: "DOE estimates" },
            ].map((item) => (
              <div key={item.stat} className="bg-dark-soft border border-white/10 rounded-lg p-8 flex flex-col gap-4">
                <div><span className="font-serif text-5xl font-bold text-gold leading-none">{item.stat}</span><span className="font-sans text-sm text-warm-gray ml-2 uppercase tracking-widest">{item.statSub}</span></div>
                <p className="font-sans text-white text-sm leading-relaxed">&quot;{item.quote}&quot;</p>
                <p className="font-sans text-xs text-warm-gray uppercase tracking-wider">— {item.source}</p>
              </div>
            ))}
          </div>
          <div className="border border-gold/30 rounded-lg p-8 text-center max-w-2xl mx-auto bg-gold/5">
            <p className="font-serif text-xl md:text-2xl text-white font-bold leading-snug">&quot;The right shades aren&apos;t a luxury. <span className="gold-gradient-text">They&apos;re a productivity tool.</span>&quot;</p>
          </div>
        </div>
      </section>

      {/* ─── 8. HOW IT WORKS ─── */}
      <section className="section-padding bg-cream-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">How It Works</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Ruler className="w-6 h-6 text-gold" />, step: "01", heading: "Measure Your Window", body: "5-minute guide. Inside or outside mount. We double-check before production." },
              { icon: <Palette className="w-6 h-6 text-gold" />, step: "02", heading: "Pick Your Fabric", body: "700+ fabrics including light filtering, solar, and blackout. Free swatches or AI preview." },
              { icon: <Hammer className="w-6 h-6 text-gold" />, step: "03", heading: "We Build It", body: "Manufactured in the USA to your exact dimensions. Ships in ~7 days via FedEx." },
              { icon: <CheckCircle className="w-6 h-6 text-gold" />, step: "04", heading: "Easy Install", body: "4 screws. 15 minutes. All hardware included. 100% Fit Guarantee." },
            ].map((s) => (
              <div key={s.step} className="flex flex-col gap-3">
                <div className="flex items-center gap-3 mb-1"><div className="w-10 h-10 rounded-full bg-dark flex items-center justify-center shrink-0">{s.icon}</div><span className="font-sans font-bold text-2xl text-dark opacity-25 leading-none">{s.step}</span></div>
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
            <h2 className="heading-section font-serif text-white">How We Compare — Honestly</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full font-sans text-sm border-collapse">
              <thead><tr>
                <th className="text-left py-4 px-4 text-warm-gray font-semibold w-1/4"></th>
                <th className="py-4 px-4 text-center font-bold text-white bg-dark-soft border-t-2 border-gold rounded-t-sm">World Wide Shades</th>
                <th className="py-4 px-4 text-center font-semibold text-warm-gray">The Shade Store</th>
                <th className="py-4 px-4 text-center font-semibold text-warm-gray">Amazon / Stock</th>
              </tr></thead>
              <tbody>
                {[
                  { label: "Custom Sizing", wws: true, ss: true, amz: false },
                  { label: "Pricing", wws: "from $250", ss: "$350–600/window", amz: "Not custom" },
                  { label: "Fabric Selection", wws: "700+", ss: "100–200", amz: "10–30" },
                  { label: "Shipping Speed", wws: "~7 Days", ss: "3–4 Weeks", amz: "2–5 Days (stock)" },
                  { label: "Free Samples", wws: true, ss: false, amz: false },
                  { label: "Made in USA", wws: true, ss: "Sometimes", amz: false },
                  { label: "Fit Guarantee", wws: true, ss: false, amz: false },
                  { label: "AI Visualizer", wws: true, ss: false, amz: false },
                  { label: "Motorization", wws: true, ss: true, amz: "Limited" },
                ].map((row, i) => {
                  const cell = (v: boolean | string, highlight = false) => typeof v === "boolean" ? (v ? <Check className={`w-4 h-4 ${highlight ? "text-gold" : "text-gold"} mx-auto`} /> : <X className="w-4 h-4 text-red-400 mx-auto" />) : <span className={`font-sans text-sm ${highlight ? "text-white font-semibold" : "text-warm-gray"}`}>{v}</span>
                  return (
                    <tr key={row.label} className={i % 2 === 0 ? "bg-dark-muted/30" : ""}>
                      <td className="py-3.5 px-4 text-warm-gray font-medium">{row.label}</td>
                      <td className="py-3.5 px-4 text-center bg-dark-soft">{cell(row.wws, true)}</td>
                      <td className="py-3.5 px-4 text-center">{cell(row.ss)}</td>
                      <td className="py-3.5 px-4 text-center">{cell(row.amz)}</td>
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
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">Factory-Direct Pricing</p>
            <h2 className="heading-section font-serif text-dark">No Showroom Markup. No Surprises.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { size: "Small", price: "$250 – $350", label: "Side Windows, Small Offices", description: "Perfect for single-window offices.", features: ["Up to 36\" wide", "Inside or outside mount", "Light filtering or blackout", "All hardware included"], popular: false },
              { size: "Standard", price: "$300 – $600", label: "Standard Office Windows", description: "Our most popular size. Fits the vast majority of home office windows.", features: ["36\" – 72\" wide", "700+ fabrics available", "Light filtering or blackout", "Motorization available"], popular: true },
              { size: "Large", price: "$400 – $900", label: "Panoramic, Home Studio", description: "For wide windows, home studios, and panoramic views.", features: ["72\"+ wide", "Premium fabric options", "Light filtering or blackout", "Motorization recommended"], popular: false },
            ].map((tier) => (
              <div key={tier.size} className={`rounded-lg p-8 flex flex-col gap-4 ${tier.popular ? "bg-dark text-white shadow-xl border-2 border-gold" : "bg-white border border-cream-dark shadow-sm"}`}>
                {tier.popular && <span className="font-sans text-xs font-bold tracking-widest text-dark bg-gold rounded-full px-3 py-1 self-start uppercase">Most Popular</span>}
                <div>
                  <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-1">{tier.size}</p>
                  <p className={`font-sans text-xs mb-2 ${tier.popular ? "text-warm-gray" : "text-warm-gray"}`}>{tier.label}</p>
                  <span className={`font-serif text-3xl font-bold ${tier.popular ? "text-white" : "text-dark"}`}>{tier.price}</span>
                </div>
                <p className="font-sans text-sm leading-relaxed text-warm-gray">{tier.description}</p>
                <ul className="space-y-2 flex-1">
                  {tier.features.map((f) => <li key={f} className="flex items-center gap-2 font-sans text-sm"><Check className="w-4 h-4 shrink-0 text-gold" /><span className={tier.popular ? "text-white" : "text-dark"}>{f}</span></li>)}
                </ul>
                <a href="/builder" className={`inline-block text-center font-sans font-semibold text-sm px-6 py-3 rounded-sm transition-colors duration-200 mt-2 ${tier.popular ? "bg-gold text-dark hover:bg-gold-dark" : "border border-dark text-dark hover:bg-dark hover:text-white"}`}>Design Now</a>
              </div>
            ))}
          </div>
          <div className="bg-dark rounded-lg p-6 flex flex-col md:flex-row items-center gap-4 md:gap-8 max-w-2xl mx-auto text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0"><Zap className="w-6 h-6 text-gold" /></div>
            <div className="flex-1">
              <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-1">Add-On</p>
              <p className="font-serif text-lg font-bold text-white">Motorization from +$250</p>
              <p className="font-sans text-sm text-warm-gray mt-1">Alexa, Google Home, Apple HomeKit. Set schedules. Voice commands. The ultimate WFH upgrade.</p>
            </div>
            <a href="/builder" className="shrink-0 inline-block border border-gold text-gold font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-gold hover:text-dark transition-colors duration-200">Add Motorization</a>
          </div>
        </div>
      </section>

      {/* ─── 11. REVIEWS ─── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-1 mb-4">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-gold fill-gold" />)}</div>
            <h2 className="heading-section font-serif text-white">WFH Professionals Love Their Shades</h2>
            <p className="font-sans text-warm-gray mt-3">4.9/5 from 500+ homeowners.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Michael T.", location: "Denver, CO", review: "I can finally work without squinting at my screen. The light filtering effect is perfect — soft, even light all day. And they shipped in 5 days.", detail: "Light Filtering · West-Facing Office" },
              { name: "Sarah K.", location: "Portland, OR", review: "My video calls look so much better now. Soft, even lighting instead of blown-out windows behind me. My coworkers noticed immediately.", detail: "Light Filtering · South-Facing Office" },
              { name: "Ryan M.", location: "Austin, TX", review: "West-facing home office was unbearable by 2pm. Light filtering shades dropped the temperature noticeably. I barely need AC now.", detail: "Light Filtering · West-Facing Office" },
            ].map((r) => (
              <div key={r.name} className="bg-dark-soft border border-white/10 rounded-lg p-7 flex flex-col gap-4">
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-gold fill-gold" />)}</div>
                <p className="font-sans text-white text-sm leading-relaxed flex-1">&ldquo;{r.review}&rdquo;</p>
                <div><p className="font-sans font-semibold text-white text-sm">{r.name}</p><p className="font-sans text-xs text-warm-gray">{r.location}</p><p className="font-sans text-xs text-gold mt-1 uppercase tracking-wider">{r.detail}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 12. FAQ ─── */}
      <section className="section-padding bg-cream">
        <div className="container-narrow px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-0 divide-y divide-cream-dark border border-cream-dark rounded-lg overflow-hidden">
            {[
              { q: "Should I get light filtering or blackout?", a: "Light filtering is recommended for most offices. It diffuses harsh sunlight into soft, even ambient light. Blackout is best for video editing or presentations. Many professionals do a dual setup." },
              { q: "Will light filtering shades reduce screen glare?", a: "Yes. They transform direct sunlight into diffused ambient light, eliminating the directional glare that causes squinting and eye strain." },
              { q: "Do these shades help with video call lighting?", a: "Significantly. They even out the light in your room, creating soft, flattering illumination on camera instead of harsh backlighting." },
              { q: "Can shades reduce my energy bill?", a: "Yes. Solar and light filtering shades block up to 78% of solar heat gain — especially impactful for west-facing offices." },
              { q: "Can I automate shades throughout the day?", a: "Yes. Motorized shades integrate with Alexa, Google Home, Apple HomeKit. Program them to lower when morning sun hits your east-facing window." },
              { q: "What colors work best for a home office?", a: "Neutral, warm tones — whites, linens, warm grays. Lighter shades create cleaner video call backgrounds." },
              { q: "Can I get free fabric samples?", a: "Yes — up to 10 free swatches. Seeing samples in your actual office lighting is the best way to choose." },
              { q: "How do I measure my office window?", a: "5-minute guide, three measurements each direction. 100% Fit Guarantee — if they don't fit per our guide, we remake free." },
            ].map((faq, i) => (
              <details key={i} className="group bg-white">
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-sans font-semibold text-dark text-sm hover:bg-cream transition-colors duration-150">
                  {faq.q}
                  <ChevronDown className="w-4 h-4 text-gold shrink-0 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-5"><p className="font-sans text-sm text-warm-gray leading-relaxed">{faq.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 13. FINAL CTA ─── */}
      <section className="relative section-padding flex flex-col items-center text-center text-white overflow-hidden" style={{ backgroundImage: "url(https://www.windowmakeoverinc.com/wp-content/uploads/2025/01/home-office-600x350.png)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-dark/82" />
        <div className="absolute inset-0 pointer-events-none" style={{ background: "linear-gradient(to bottom, rgba(200,161,101,0.05) 0%, rgba(12,12,12,0.0) 100%)" }} />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 container-narrow px-4 flex flex-col items-center gap-6">
          <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">Ready to Work Better?</p>
          <h2 className="heading-section font-serif text-white max-w-2xl leading-tight">Work Smarter. <span className="gold-gradient-text">Not Squintier.</span></h2>
          <p className="font-sans text-warm-gray text-lg max-w-xl leading-relaxed">Custom home office shades, built to your exact windows. Glare-free screens. Better video calls. Cooler afternoons. Ships in 7 days.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a href="/builder" className="inline-block bg-gold text-dark font-sans font-semibold text-base px-10 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200">Design Your Office Shades</a>
            <a href="/swatches" className="inline-block border border-white/50 text-white font-sans font-semibold text-base px-10 py-4 rounded-sm hover:bg-white/10 transition-colors duration-200">Order Free Swatches</a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm font-sans text-warm-gray">
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-gold fill-gold" />4.9/5 · 500+ Reviews</span>
            <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-gold" />Ships in ~7 Days</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-gold" />100% Fit Guarantee</span>
            <span className="flex items-center gap-1.5"><Factory className="w-4 h-4 text-gold" />Made in USA</span>
          </div>
          <a href="tel:+18446742716" className="flex items-center gap-2 font-sans text-sm text-warm-gray hover:text-gold transition-colors duration-200 mt-2"><Phone className="w-4 h-4" />Questions? Call (844) 674-2716</a>
        </div>
      </section>
    </>
  )
}
