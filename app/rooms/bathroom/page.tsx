import type { Metadata } from "next"
import {
  Star,
  EyeOff,
  Droplets,
  Ruler,
  Frown,
  Shield,
  Maximize,
  Sparkles,
  CheckCircle,
  Factory,
  Truck,
  Palette,
  Hammer,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Custom Shades for Bathrooms | Privacy + Moisture Resistant — World Wide Shades",
  description: "Custom bathroom shades with moisture-resistant fabrics. Complete privacy without sacrificing light. Custom-fit from $250. Free shipping. Made in USA.",
  openGraph: {
    title: "Custom Shades for Bathrooms | World Wide Shades",
    description: "Custom bathroom shades with moisture-resistant fabrics. Complete privacy without sacrificing light. Custom-fit from $250.",
    url: "https://worldwideshades.com/rooms/bathroom",
    siteName: "World Wide Shades",
    type: "website",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Product", name: "Custom Bathroom Shades", description: "Custom bathroom shades with moisture-resistant fabrics. Complete privacy without sacrificing natural light. Made in USA.", brand: { "@type": "Brand", name: "World Wide Shades" }, offers: { "@type": "AggregateOffer", lowPrice: "250", highPrice: "700", priceCurrency: "USD", availability: "https://schema.org/InStock" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "412", bestRating: "5", worstRating: "1" } },
    { "@type": "FAQPage", mainEntity: [
      { "@type": "Question", name: "Are these shades safe for humid bathrooms?", acceptedAnswer: { "@type": "Answer", text: "Yes. We use Phifer and Ferrari fabrics engineered for high-humidity environments. Won't warp, mold, or peel." } },
      { "@type": "Question", name: "Will light filtering shades give me enough privacy?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. They block outside views entirely while allowing soft diffused light through." } },
      { "@type": "Question", name: "What about windows above the tub or shower?", acceptedAnswer: { "@type": "Answer", text: "Our specialty. Custom-cut for small or awkward windows. Moisture-resistant fabrics ideal for high-humidity locations." } },
      { "@type": "Question", name: "How do I clean bathroom roller shades?", acceptedAnswer: { "@type": "Answer", text: "Wipe with a damp cloth or mild soap and water. No special products needed." } },
      { "@type": "Question", name: "What fabrics are best for high-humidity rooms?", acceptedAnswer: { "@type": "Answer", text: "Phifer and Ferrari — engineered for moisture resistance, easy to clean, won't warp or degrade." } },
      { "@type": "Question", name: "Can I get a shade for a small or odd-shaped window?", acceptedAnswer: { "@type": "Answer", text: "Yes — custom-cut to your exact measurements, down to 1/8 inch." } },
      { "@type": "Question", name: "Do you offer blackout for bathrooms?", acceptedAnswer: { "@type": "Answer", text: "Yes. Ideal for ground-floor bathrooms facing the street. Light filtering is more popular for most bathrooms." } },
    ] },
    { "@type": "Organization", name: "World Wide Shades LLC", url: "https://worldwideshades.com", telephone: "+18446742716" },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://worldwideshades.com" },
      { "@type": "ListItem", position: 2, name: "Bathroom Shades", item: "https://worldwideshades.com/rooms/bathroom" },
    ] },
  ],
}

export default function BathroomShadesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ─── 1. HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center text-white overflow-hidden" style={{ backgroundImage: "url(https://www.theshadestore.com/blog/wp-content/uploads/the-shade-store-flat-roman-shade-nate-berkus-lisbon-woven-bronze-bathroom-window-privacy-tranquil-bathroom-hero-2023-montauk-950x630px.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(12,12,12,0.78) 0%, rgba(30,22,10,0.82) 100%)" }} />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 container-site section-padding flex flex-col items-center gap-6 px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-sans font-semibold tracking-widest text-warm-gray uppercase">Moisture Resistant&nbsp;·&nbsp;Privacy First&nbsp;·&nbsp;Custom-Fit</div>
          <h1 className="heading-display font-serif text-white max-w-4xl leading-tight">Privacy Without <span className="gold-gradient-text">Sacrificing Light</span></h1>
          <p className="font-sans text-lg md:text-xl text-warm-gray max-w-2xl leading-relaxed">Custom bathroom shades that give you complete privacy while keeping your space bright and beautiful. Moisture-resistant fabrics. Custom-fit for any window size.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a href="/builder" className="inline-block bg-gold text-dark font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200">Design Your Bathroom Shades</a>
            <a href="/swatches" className="inline-block border border-white/50 text-white font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-white/10 transition-colors duration-200">Order Free Swatches</a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm font-sans text-warm-gray">
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-gold fill-gold" />4.9/5 · 400+ Homeowners</span>
            <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-gold" />Ships ~7 Days</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-gold" />100% Fit Guarantee</span>
            <span className="flex items-center gap-1.5"><Factory className="w-4 h-4 text-gold" />Made in USA</span>
          </div>
        </div>
      </section>

      {/* ─── 2. STATS BAR ─── */}
      <section className="bg-dark border-y border-white/10">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[{ number: "100%", label: "Privacy" }, { number: "479+", label: "Light Filtering Fabrics" }, { number: "Moisture", label: "Resistant" }, { number: "$250+", label: "Starting Price" }].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-8 px-4 text-center">
                <span className="font-serif text-3xl md:text-4xl font-bold text-gold leading-none">{stat.number}</span>
                <span className="font-sans text-sm text-warm-gray mt-2 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. BATHROOM PROBLEM ─── */}
      <section className="section-padding">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">Your Bathroom Deserves Better Than Frosted Glass</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <EyeOff className="w-6 h-6 text-red-400" />, title: "No privacy", body: "Bare windows next to the shower. You've been \"meaning to fix that\" for months." },
              { icon: <Droplets className="w-6 h-6 text-red-400" />, title: "Moisture damage", body: "Regular fabric shades warp, mold, and peel in humid bathrooms." },
              { icon: <Ruler className="w-6 h-6 text-red-400" />, title: "Weird window sizes", body: "Bathroom windows are never standard. Stock blinds never fit right." },
              { icon: <Frown className="w-6 h-6 text-red-400" />, title: "Looks like an afterthought", body: "A beautiful bathroom with a $12 blind from Home Depot? No." },
            ].map((p) => (
              <div key={p.title} className="bg-cream rounded-lg p-7 flex flex-col gap-4 border border-cream-dark">
                <div className="w-11 h-11 rounded-full bg-red-50 flex items-center justify-center shrink-0">{p.icon}</div>
                <h3 className="font-serif text-lg font-bold text-dark leading-snug">{p.title}</h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. THE SOLUTION ─── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">The Fix</p>
            <h2 className="heading-section font-serif text-white">Everything a Bathroom Window Needs</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Shield className="w-6 h-6 text-gold" />, title: "Complete Privacy", body: "Light filtering that blocks outside views while keeping your bathroom bright." },
              { icon: <Droplets className="w-6 h-6 text-gold" />, title: "Moisture-Resistant Fabrics", body: "Phifer and Ferrari fabrics engineered for high-humidity. No warping, no mold." },
              { icon: <Maximize className="w-6 h-6 text-gold" />, title: "Any Size Window", body: "Small sidelights, odd-shaped, above-tub — custom-cut to your exact measurement." },
              { icon: <Sparkles className="w-6 h-6 text-gold" />, title: "Spa-Worthy Design", body: "Premium fabrics in whites, creams, linens. Your bathroom should feel like a retreat." },
            ].map((s) => (
              <div key={s.title} className="bg-dark-soft rounded-lg p-7 flex flex-col gap-4 border border-white/10">
                <div className="w-11 h-11 rounded-full bg-white/10 flex items-center justify-center shrink-0">{s.icon}</div>
                <h3 className="font-serif text-lg font-bold text-white leading-snug">{s.title}</h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. LF VS BLACKOUT ─── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">Which Is Right for You?</p>
            <h2 className="heading-section font-serif text-dark">Light Filtering vs. Blackout for Bathrooms</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">Both offer complete privacy. The difference is how much light you want.</p>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="relative bg-white rounded-lg overflow-hidden shadow-sm border-2 border-gold">
              <div className="absolute top-5 right-5"><span className="bg-gold text-dark font-sans text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full">Recommended</span></div>
              <div className="p-8 md:p-10">
                <div className="w-12 h-12 rounded-full bg-gold/15 flex items-center justify-center mb-5"><Sparkles className="w-6 h-6 text-gold" /></div>
                <h3 className="font-serif text-2xl font-bold text-dark mb-3">Light Filtering</h3>
                <p className="font-sans text-sm font-semibold text-gold uppercase tracking-widest mb-4">Best choice for most bathrooms</p>
                <p className="font-sans text-warm-gray leading-relaxed mb-6">Soft, diffused light creates a spa-like ambiance while blocking all outside views. Keeps your bathroom feeling open, airy, and naturally lit.</p>
                <ul className="space-y-2.5">
                  {["Complete privacy — no outside visibility", "Soft, diffused natural light", "Spa-like, serene ambiance", "Available in 479+ fabric options"].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 font-sans text-sm text-dark"><CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="overflow-hidden"><img src="https://www.theshadestore.com/blog/wp-content/uploads/the-shade-store-flat-roman-shade-sunbrella-vitela-ivory-bathroom-window-privacy-neutral-classic-bathroom-content-2019-brooklyn-600x400px.jpg" alt="Light filtering shade in elegant bathroom" className="w-full h-52 object-cover" /></div>
            </div>
            <div className="bg-dark rounded-lg overflow-hidden shadow-sm border border-white/10">
              <div className="p-8 md:p-10">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center mb-5"><Shield className="w-6 h-6 text-gold" /></div>
                <h3 className="font-serif text-2xl font-bold text-white mb-3">Blackout</h3>
                <p className="font-sans text-sm font-semibold text-warm-gray uppercase tracking-widest mb-4">Maximum light control</p>
                <p className="font-sans text-warm-gray leading-relaxed mb-6">Ideal for ground-floor units or windows facing neighbors. Total privacy, total darkness when lowered.</p>
                <ul className="space-y-2.5">
                  {["100% light blocking", "Complete privacy, day or night", "Ground-floor and street-facing solution", "Same moisture-resistant fabrics"].map((item) => (
                    <li key={item} className="flex items-start gap-2.5 font-sans text-sm text-white"><CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />{item}</li>
                  ))}
                </ul>
              </div>
              <div className="overflow-hidden"><img src="https://normanusa.com/app/uploads/2023/06/1200-x-900-Inserts-BestBathroom-12-1024x768.jpg" alt="Blackout shade in bathroom" className="w-full h-52 object-cover" /></div>
            </div>
          </div>
          <div className="text-center mt-10"><a href="/builder" className="inline-block bg-dark text-white font-sans font-semibold text-sm px-10 py-4 rounded-sm hover:bg-dark-soft transition-colors duration-200">Find Your Perfect Option</a></div>
        </div>
      </section>

      {/* ─── 6. BATHROOM SCENARIOS ─── */}
      <section className="section-padding bg-dark-muted">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-white">Every Bathroom, Covered</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { badge: "Most Popular", badgeColor: "bg-gold text-dark", image: "https://www.theshadestore.com/blog/wp-content/uploads/the-shade-store-cascade-roman-shade-luxe-linen-optic-white-bathroom-window-privacy-tranquil-bathroom-content-2022-east-hampton-950x550px.jpg", imageAlt: "Master bathroom with serene shades", heading: "Master Bathroom", title: "Your Private Retreat", body: "Spa-like ambiance. Soft natural light. Complete privacy even with windows next to the shower or tub." },
              { badge: "Guest Impression", badgeColor: "bg-white/20 text-white", image: "https://lirp.cdn-website.com/bd370df3/dms3rep/multi/opt/window-treatments-that-offer-privacy-and-light-640w.jpg", imageAlt: "Powder room with custom shade", heading: "Powder Room / Half Bath", title: "The Guest Impression", body: "Small windows, big impact. Custom-fit shade elevates the entire space. Typically $250–350." },
              { badge: "Privacy First", badgeColor: "bg-white/20 text-white", image: "https://www.skylinewindowcoverings.com/wp-content/uploads/2025/07/pirouette-shades-bathroom-window-shades-above-tub-skyline-window-coverings-768x384.jpg", imageAlt: "Ground floor bathroom shade", heading: "Ground Floor Bathroom", title: "Street-Facing Privacy", body: "Blackout for complete peace of mind. Zero visibility from outside. Sleep easy, shower easy." },
            ].map((s) => (
              <div key={s.heading} className="bg-dark rounded-lg overflow-hidden flex flex-col shadow-lg">
                <div className="relative"><img src={s.image} alt={s.imageAlt} className="w-full h-52 object-cover" /><span className={`absolute top-3 left-3 font-sans text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${s.badgeColor}`}>{s.badge}</span></div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">{s.heading}</p>
                  <h3 className="font-serif text-lg font-bold text-white leading-snug">{s.title}</h3>
                  <p className="font-sans text-sm text-warm-gray leading-relaxed flex-1">{s.body}</p>
                  <a href="/builder" className="inline-block mt-2 text-center border border-gold text-gold font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-gold hover:text-dark transition-colors duration-200">Design for This Space</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 7. MOISTURE & DURABILITY ─── */}
      <section className="section-padding relative overflow-hidden" style={{ backgroundImage: "url(https://img.freepik.com/premium-photo/black-fabric-luxury-cloth-texture-pattern-background_293060-5660.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-dark/88" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">Built to Last</p>
            <h2 className="heading-section font-serif text-white">Engineered for Humidity</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {[
              { icon: <Droplets className="w-6 h-6 text-gold" />, title: "Moisture-Resistant Fabrics", body: "Phifer and Ferrari fabrics engineered for high-humidity. No warping, no mold, no peeling — even in steam-filled bathrooms." },
              { icon: <Sparkles className="w-6 h-6 text-gold" />, title: "Easy to Clean", body: "Just wipe with a damp cloth. No special products, no dry cleaning. Quick wipe for regular maintenance." },
              { icon: <Shield className="w-6 h-6 text-gold" />, title: "UV-Stabilized", body: "Won't yellow or degrade from sun and steam. Looks as good in five years as day one." },
            ].map((f) => (
              <div key={f.title} className="flex flex-col gap-4">
                <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">{f.icon}</div>
                <h3 className="font-serif text-xl font-bold text-white">{f.title}</h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{f.body}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-12">
            {["Phifer", "Ferrari", "Texstyle", "Mermet", "Senbesta"].map((brand) => (
              <span key={brand} className="font-sans font-semibold text-sm text-white border border-white/25 rounded-sm px-5 py-2.5 hover:border-gold hover:text-gold transition-colors duration-200">{brand}</span>
            ))}
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
              { icon: <Ruler className="w-6 h-6 text-gold" />, step: "01", heading: "Measure Your Window", body: "Works for small sidelights, above-tub panels, and oddly-sized windows. Takes 5 minutes." },
              { icon: <Palette className="w-6 h-6 text-gold" />, step: "02", heading: "Pick Your Fabric", body: "479+ light filtering and blackout fabrics. Order free swatches to see and feel first." },
              { icon: <Hammer className="w-6 h-6 text-gold" />, step: "03", heading: "We Build It", body: "Custom-cut in the USA. Quality-checked and shipped in ~7 days via FedEx." },
              { icon: <CheckCircle className="w-6 h-6 text-gold" />, step: "04", heading: "Easy Install", body: "4 screws. 15 minutes. All hardware included. 100% Fit Guarantee." },
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

      {/* ─── 9. PRICING ─── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="text-center mb-4">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">Transparent Pricing</p>
            <h2 className="heading-section font-serif text-white">Bathrooms Are the Most Affordable Room to Cover</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-xl mx-auto">Small windows mean lower cost. Most bathroom shades start at $250.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6 mt-12">
            {[
              { tier: "Small Bathroom Windows", price: "$250–$350", highlight: true, uses: "Sidelights, above-toilet, half-bath", note: "Most bathroom shades fall here", features: ["Sidelights & narrow windows", "Above-toilet windows", "Powder room / half-bath", "Light filtering or blackout", "Full custom-cut to size"] },
              { tier: "Standard Windows", price: "$300–$500", highlight: false, uses: "Above-tub, shower-adjacent", note: "Standard bathroom window size", features: ["Above-tub panels", "Shower-adjacent windows", "Standard-sized openings", "Light filtering or blackout", "Full custom-cut to size"] },
              { tier: "Large / Specialty", price: "$400–$700", highlight: false, uses: "Panoramic, floor-to-ceiling", note: "Larger or specialty installs", features: ["Panoramic bathroom windows", "Floor-to-ceiling glass", "Wide custom panels", "Specialty configurations", "Full custom-cut to size"] },
            ].map((tier) => (
              <div key={tier.tier} className={`rounded-lg overflow-hidden flex flex-col ${tier.highlight ? "border-2 border-gold bg-dark-soft shadow-xl" : "border border-white/10 bg-dark-soft"}`}>
                <div className={`p-7 flex-1 flex flex-col gap-4 ${tier.highlight ? "pt-8" : ""}`}>
                  <span className={`self-start font-sans text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full ${tier.highlight ? "bg-gold text-dark" : "bg-white/10 text-warm-gray"}`}>{tier.highlight ? "Most Popular" : tier.tier === "Standard Windows" ? "Common" : "Custom"}</span>
                  <div><h3 className="font-serif text-xl font-bold text-white leading-snug">{tier.tier}</h3><p className="font-sans text-xs text-warm-gray mt-1">{tier.uses}</p></div>
                  <div><span className="font-serif text-4xl font-bold text-gold">{tier.price}</span><p className="font-sans text-xs text-warm-gray mt-1 italic">{tier.note}</p></div>
                  <ul className="space-y-2.5 mt-2 flex-1">
                    {tier.features.map((f) => <li key={f} className="flex items-start gap-2.5 font-sans text-sm text-warm-gray"><CheckCircle className="w-4 h-4 text-gold shrink-0 mt-0.5" />{f}</li>)}
                  </ul>
                </div>
                <div className="px-7 pb-7"><a href="/builder" className={`block text-center font-sans font-semibold text-sm px-6 py-3.5 rounded-sm transition-colors duration-200 ${tier.highlight ? "bg-gold text-dark hover:bg-gold-dark" : "border border-white/30 text-white hover:border-gold hover:text-gold"}`}>Design Your Shade</a></div>
              </div>
            ))}
          </div>
          <p className="text-center font-sans text-sm text-warm-gray mt-8">All prices include free shipping. 100% Fit Guarantee on every order.</p>
        </div>
      </section>

      {/* ─── 10. REVIEWS ─── */}
      <section className="section-padding bg-dark-muted">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-1 mb-3">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-gold fill-gold" />)}</div>
            <h2 className="heading-section font-serif text-white">What Homeowners Are Saying</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Emily R.", location: "Austin, TX", review: "Our master bath window is right next to the shower. These light filtering shades give us complete privacy but the room still feels bright and airy.", image: "https://images.unsplash.com/photo-1613545325268-9265e1609167?auto=format&fit=crop&w=800&q=80" },
              { name: "Tom & Maria G.", location: "Phoenix, AZ", review: "Ground floor condo, bathroom faces the sidewalk. Went with blackout — zero visibility from outside. The moisture-resistant fabric is perfect.", image: "https://ecosmartshades.com/wp-content/uploads/Coulisse-Cordless-Light-Filtering-Bathroom-800.jpg" },
              { name: "Jessica L.", location: "Seattle, WA", review: "Tiny powder room window that nothing off-the-shelf fit. Custom-cut to our exact size. It looks like it was always meant to be there.", image: "https://www.theshadestore.com/blog/wp-content/uploads/the-shade-store-flat-roman-shade-nate-berkus-lisbon-woven-bronze-bathroom-window-privacy-tranquil-bathroom-hero-2023-montauk-950x630px.jpg" },
            ].map((r) => (
              <div key={r.name} className="bg-dark rounded-lg overflow-hidden flex flex-col shadow-lg">
                <div className="overflow-hidden"><img src={r.image} alt={`Bathroom shade — ${r.name}`} className="w-full h-44 object-cover" /></div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-gold fill-gold" />)}</div>
                  <p className="font-sans text-sm text-warm-gray leading-relaxed italic flex-1">&ldquo;{r.review}&rdquo;</p>
                  <div className="pt-2 border-t border-white/10"><p className="font-sans font-semibold text-white text-sm">{r.name}</p><p className="font-sans text-xs text-warm-gray">{r.location}</p></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 11. FAQ ─── */}
      <section className="section-padding bg-cream">
        <div className="container-narrow px-4 mx-auto">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">Bathroom Shade Questions, Answered</h2>
          </div>
          <div className="space-y-0 divide-y divide-cream-dark border border-cream-dark rounded-lg overflow-hidden">
            {[
              { q: "Are these shades safe for humid bathrooms?", a: "Yes. We use Phifer and Ferrari fabrics engineered for high-humidity. They won't warp, mold, or peel from steam and moisture." },
              { q: "Will light filtering shades give me enough privacy?", a: "Absolutely. They block outside views entirely while allowing soft, diffused light. From outside, all you see is a soft glow — not shapes or silhouettes." },
              { q: "Can I see through from outside?", a: "No. Light filtering fabrics block outside views completely when closed. No shapes, silhouettes, or movement visible." },
              { q: "What about windows above the tub or shower?", a: "Our specialty. Custom-cut for small or awkward windows. Moisture-resistant fabrics ideal for this location." },
              { q: "How do I clean bathroom roller shades?", a: "Wipe with a damp cloth or mild soap and water. No special products needed." },
              { q: "What fabrics are best for high-humidity rooms?", a: "Phifer and Ferrari — engineered for moisture resistance, easy to clean, won't degrade." },
              { q: "Can I get a shade for a small or odd-shaped window?", a: "Yes — custom-cut to your exact measurements, down to 1/8 inch. We cut to your spec, not standard sizes." },
              { q: "Do you offer blackout for bathrooms?", a: "Yes. Ideal for ground-floor bathrooms facing the street. Light filtering is more popular for most bathrooms." },
            ].map((item, i) => (
              <details key={i} className="group bg-white">
                <summary className="flex items-center justify-between cursor-pointer px-6 py-5 font-sans font-semibold text-dark text-sm gap-4 hover:bg-cream/60 transition-colors duration-150 select-none list-none">
                  {item.q}
                  <span className="shrink-0 w-5 h-5 rounded-full border border-cream-dark flex items-center justify-center text-gold font-bold text-lg leading-none transition-transform duration-200 group-open:rotate-45">+</span>
                </summary>
                <div className="px-6 pb-5 pt-1 font-sans text-sm text-warm-gray leading-relaxed">{item.a}</div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 12. FINAL CTA ─── */}
      <section className="relative section-padding flex flex-col justify-center items-center text-center overflow-hidden" style={{ backgroundImage: "url(https://www.theshadestore.com/blog/wp-content/uploads/the-shade-store-cascade-roman-shade-luxe-linen-optic-white-bathroom-window-privacy-tranquil-bathroom-content-2022-east-hampton-950x550px.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0" style={{ background: "linear-gradient(to bottom, rgba(12,12,12,0.80) 0%, rgba(30,22,10,0.86) 100%)" }} />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 container-narrow px-4 flex flex-col items-center gap-6 py-12">
          <h2 className="heading-section font-serif max-w-2xl leading-tight"><span className="gold-gradient-text">Your Bathroom Deserves Privacy That Looks Beautiful.</span></h2>
          <p className="font-sans text-lg text-warm-gray max-w-xl leading-relaxed">Custom-fit shades, moisture-resistant fabrics, complete privacy from $250. Ships in ~7 days. Made in the USA.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a href="/builder" className="inline-block bg-gold text-dark font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200">Design Your Bathroom Shades</a>
            <a href="/swatches" className="inline-block border border-white/50 text-white font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-white/10 transition-colors duration-200">Order Free Swatches</a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm font-sans text-warm-gray">
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-gold fill-gold" />4.9/5 · 400+ Reviews</span>
            <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-gold" />Ships ~7 Days</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-gold" />100% Fit Guarantee</span>
            <span className="flex items-center gap-1.5"><Factory className="w-4 h-4 text-gold" />Made in USA</span>
          </div>
          <p className="font-sans text-sm text-warm-gray mt-2">Questions? Call us: <a href="tel:+18446742716" className="text-gold hover:text-gold-dark transition-colors duration-150">(844) 674-2716</a></p>
        </div>
      </section>
    </>
  )
}
