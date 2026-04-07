import type { Metadata } from "next"
import {
  Star,
  Truck,
  CheckCircle,
  Moon,
  ShieldCheck,
  Leaf,
  Ruler,
  Baby,
  Sunrise,
  ShieldOff,
  AlertTriangle,
  Sparkles,
  Phone,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Blackout Shades for Nurseries | Cordless, OEKO-TEX Safe — World Wide Shades",
  description: "Custom blackout shades designed for nurseries. 100% light blocking, cordless for child safety, OEKO-TEX certified fabrics. Better sleep for baby, better everything for you.",
  openGraph: {
    title: "Blackout Shades for Nurseries | World Wide Shades",
    description: "Better sleep for baby, better everything for you. Cordless blackout shades with OEKO-TEX certified fabrics. Custom-fit from $250.",
    url: "https://worldwideshades.com/rooms/nursery",
    siteName: "World Wide Shades",
    type: "website",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Product", name: "Blackout Shades for Nurseries", description: "Custom blackout shades for nurseries. 100% light blocking, cordless, OEKO-TEX certified. Made in USA, ships in 7 days.", brand: { "@type": "Brand", name: "World Wide Shades" }, offers: { "@type": "AggregateOffer", lowPrice: "250", highPrice: "900", priceCurrency: "USD", availability: "https://schema.org/InStock" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "500", bestRating: "5", worstRating: "1" } },
    { "@type": "FAQPage", mainEntity: [
      { "@type": "Question", name: "Are these shades safe for a nursery?", acceptedAnswer: { "@type": "Answer", text: "Yes. Every nursery shade is cordless by default. Meets all CPSC and WCMA child safety standards." } },
      { "@type": "Question", name: "Are the fabrics tested for harmful substances?", acceptedAnswer: { "@type": "Answer", text: "Yes. OEKO-TEX Standard 100 certified — tested for 100+ harmful substances." } },
      { "@type": "Question", name: "Why do babies need complete darkness?", acceptedAnswer: { "@type": "Answer", text: "Darkness triggers melatonin production. Even small light suppresses melatonin by up to 50%. Babies cycle through light sleep every 30-45 minutes." } },
      { "@type": "Question", name: "Will blackout shades help with daytime naps?", acceptedAnswer: { "@type": "Answer", text: "Absolutely. True blackout signals sleep time regardless of what's happening outside." } },
      { "@type": "Question", name: "Can I open shades without entering the nursery?", acceptedAnswer: { "@type": "Answer", text: "Yes — with motorized upgrade. Control from phone app, voice assistant, or wall switch." } },
      { "@type": "Question", name: "What colors are best for a nursery?", acceptedAnswer: { "@type": "Answer", text: "Neutral tones like white, ivory, linen, and soft gray. Blackout performance is identical regardless of color." } },
      { "@type": "Question", name: "How do I measure nursery windows?", acceptedAnswer: { "@type": "Answer", text: "5-minute guide. We recommend outside-mount for nurseries to maximize blackout coverage." } },
      { "@type": "Question", name: "What if the shades don't fit?", acceptedAnswer: { "@type": "Answer", text: "100% Fit Guarantee. We remake at no charge if they don't fit per our guide." } },
      { "@type": "Question", name: "Can I add motorization later?", acceptedAnswer: { "@type": "Answer", text: "Yes, if you select a motorization-compatible tube at order time." } },
      { "@type": "Question", name: "Do you offer samples?", acceptedAnswer: { "@type": "Answer", text: "Yes — up to 10 free swatches. Pair with our AI visualizer to preview in your nursery." } },
    ] },
    { "@type": "Organization", name: "World Wide Shades LLC", url: "https://worldwideshades.com", telephone: "+18446742716" },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://worldwideshades.com" },
      { "@type": "ListItem", position: 2, name: "Blackout Shades", item: "https://worldwideshades.com/blackout-roller-shades" },
      { "@type": "ListItem", position: 3, name: "Nursery Shades", item: "https://worldwideshades.com/rooms/nursery" },
    ] },
  ],
}

export default function NurseryShadesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ─── 1. HERO — warm cream overlay, not dark ─── */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center overflow-hidden" style={{ backgroundImage: "url(https://www.southingtonpainting.com/uploads/images/October-blog-1-photo-cream-nursery.jpeg)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0" style={{ background: "rgba(255,251,244,0.82)" }} />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 container-site section-padding flex flex-col items-center gap-6 px-4">
          <div className="inline-flex items-center gap-2 bg-gold/15 border border-gold/30 rounded-full px-4 py-1.5 text-xs font-sans font-semibold tracking-widest text-gold-dark uppercase">Cordless&nbsp;·&nbsp;OEKO-TEX Certified&nbsp;·&nbsp;Child Safe</div>
          <h1 className="heading-display font-serif text-dark max-w-4xl leading-tight">Better Sleep for Baby, <span className="gold-gradient-text">Better Everything for You</span></h1>
          <p className="font-sans text-lg md:text-xl text-warm-gray max-w-2xl leading-relaxed">Custom blackout shades designed for nurseries. 100% light blocking for daytime naps and early bedtimes. Cordless for safety. OEKO-TEX certified fabrics. Delivered in 7 days.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a href="/builder" className="inline-block bg-gold text-dark font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200">Design Your Nursery Shades</a>
            <a href="/swatches" className="inline-block border border-dark/40 text-dark font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-dark/5 transition-colors duration-200">Order Free Swatches</a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm font-sans text-warm-gray">
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-gold fill-gold" />4.9/5 from 500+ Parents</span>
            <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-gold" />Ships in ~7 Days</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-gold" />100% Fit Guarantee</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-gold" />Made in USA</span>
          </div>
        </div>
      </section>

      {/* ─── 2. STATS BAR ─── */}
      <section className="bg-dark border-y border-white/10">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[{ number: "100%", label: "Light Blocked" }, { number: "Cordless", label: "Child Safe" }, { number: "OEKO-TEX", label: "Certified Safe" }, { number: "~7 Days", label: "Delivered" }].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-8 px-4 text-center">
                <span className="font-serif text-3xl md:text-4xl font-bold text-gold leading-none">{stat.number}</span>
                <span className="font-sans text-sm text-warm-gray mt-2 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. PARENT PROBLEM ─── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">You&apos;re Exhausted. We Get It.</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-2xl mx-auto leading-relaxed">Short naps. Early wake-ups. Light streaming in at 5am. You&apos;ve tried blackout curtains from Amazon. You&apos;ve tried taping cardboard to the window. Nothing works because nothing fits right.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Baby className="w-6 h-6 text-gold" />, title: "45-Minute Naps", body: "Light leaks wake baby after one sleep cycle. You need 2-hour naps for development. And your sanity." },
              { icon: <Sunrise className="w-6 h-6 text-gold" />, title: "5am Wake-Ups", body: "Summer sunrise at 5:15am. Baby's internal clock follows the light. Every. Single. Morning." },
              { icon: <ShieldOff className="w-6 h-6 text-gold" />, title: "Curtains That Don't Work", body: "Amazon blackout curtains leave gaps around every edge. \"Blackout\" in name only." },
              { icon: <AlertTriangle className="w-6 h-6 text-gold" />, title: "Safety Concerns", body: "Corded blinds are the #1 window hazard for children under 6. Not worth the risk." },
            ].map((card) => (
              <div key={card.title} className="bg-white border border-cream-dark rounded-lg p-6 flex flex-col gap-3 shadow-sm">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">{card.icon}</div>
                <h3 className="font-serif text-lg font-bold text-dark leading-snug">{card.title}</h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. THE SOLUTION ─── */}
      <section className="section-padding">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">Darkness That Actually Works — And Is Actually Safe</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-xl mx-auto">Built from the ground up for parents who need the real thing.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Moon className="w-6 h-6 text-gold" />, title: "100% Light Blocked", body: "True blackout, not \"room darkening.\" Even during the brightest summer day." },
              { icon: <ShieldCheck className="w-6 h-6 text-gold" />, title: "Cordless by Default", body: "No cords, no chains, no hazards. Every nursery shade ships cordless as standard." },
              { icon: <Leaf className="w-6 h-6 text-gold" />, title: "OEKO-TEX Certified", body: "Independently tested for harmful substances. Safe for your baby's room air quality." },
              { icon: <Ruler className="w-6 h-6 text-gold" />, title: "Custom-Fit, No Gaps", body: "Built to your exact window measurements. No light leaks around the edges. Period." },
            ].map((card) => (
              <div key={card.title} className="bg-cream border border-cream-dark rounded-lg p-6 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-full bg-dark flex items-center justify-center shrink-0">{card.icon}</div>
                <h3 className="font-serif text-lg font-bold text-dark leading-snug">{card.title}</h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. SLEEP SCIENCE ─── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">Why Darkness Matters for Your Baby</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-xl mx-auto">This isn&apos;t a sales pitch — it&apos;s pediatric sleep science.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 mb-10">
            {[
              { source: "American Academy of Pediatrics", title: "Melatonin Production", body: "Babies need darkness to produce melatonin. Even small amounts of light suppress melatonin by up to 50%. A truly dark room isn't a luxury — it's a physiological requirement." },
              { source: "National Sleep Foundation", title: "Sleep Cycles", body: "Babies cycle through light sleep every 30–45 minutes. If the room isn't dark enough, they wake up instead of transitioning to the next cycle. That's the difference between a 45-minute nap and a 2-hour nap." },
              { source: "Cleveland Clinic", title: "Circadian Rhythm", body: "Consistent darkness helps babies develop a healthy circadian rhythm — their internal clock. This is especially important in the first year." },
            ].map((item) => (
              <div key={item.title} className="bg-white border border-cream-dark rounded-lg p-8 flex flex-col gap-3 shadow-sm">
                <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">{item.source}</p>
                <h3 className="font-serif text-xl font-bold text-dark">{item.title}</h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="bg-gold/10 border border-gold/30 rounded-lg p-6 text-center max-w-2xl mx-auto">
            <p className="font-serif text-xl font-bold text-dark leading-snug">&quot;The #1 thing pediatric sleep consultants recommend? A completely dark room.&quot;</p>
          </div>
        </div>
      </section>

      {/* ─── 6. SAFETY ─── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">Child Safety First</p>
            <h2 className="heading-section font-serif text-white">Safety Isn&apos;t an Add-On. It&apos;s Built In.</h2>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <ShieldCheck className="w-6 h-6 text-gold" />, title: "Cordless Operation", body: "Standard on every shade. Meets all CPSC and WCMA child safety standards." },
              { icon: <Leaf className="w-6 h-6 text-gold" />, title: "OEKO-TEX Standard 100", body: "Tested for 100+ harmful substances. Safe for baby's environment." },
              { icon: <CheckCircle className="w-6 h-6 text-gold" />, title: "GREENGUARD Gold Eligible", body: "Low VOC emissions. Healthier indoor air quality." },
              { icon: <ShieldCheck className="w-6 h-6 text-gold" />, title: "Secure Mounting", body: "Professional-grade brackets. Cannot be pulled down by a curious toddler." },
            ].map((card) => (
              <div key={card.title} className="bg-dark-soft border border-white/10 rounded-lg p-6 flex flex-col gap-3">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center shrink-0">{card.icon}</div>
                <h3 className="font-serif text-lg font-bold text-white leading-snug">{card.title}</h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-12 rounded-lg overflow-hidden shadow-xl max-w-3xl mx-auto">
            <img src="https://3blindmiceusa.com/wp-content/uploads/2019/10/Child-Safety-Cordless-Blinds-Shutters-California-1024x684.jpg.webp" alt="Child-safe cordless nursery shades" className="w-full h-64 object-cover" />
          </div>
        </div>
      </section>

      {/* ─── 7. AI BUILDER ─── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img src="https://images.surferseo.art/fc1d887a-ce8f-49b7-9966-ec582a152556.png" alt="Modern nursery with blackout roller shades" className="w-full h-full object-cover" style={{ minHeight: "380px" }} />
            </div>
            <div className="flex flex-col gap-5">
              <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">AI-Powered Visualizer</p>
              <h2 className="heading-section font-serif text-dark leading-tight">Preview Your Nursery Shades Before You Buy</h2>
              <p className="font-sans text-warm-gray leading-relaxed">Upload a photo of your nursery window. Our AI renders your chosen fabric in the actual room — match to your crib, rug, and wall color before ordering.</p>
              <ol className="space-y-3 mt-2">
                {["Upload your nursery photo", "Choose a baby-safe fabric color", "See the preview instantly"].map((step, i) => (
                  <li key={step} className="flex items-center gap-3 font-sans text-dark"><span className="w-7 h-7 rounded-full bg-gold text-dark font-bold text-sm flex items-center justify-center shrink-0">{i + 1}</span>{step}</li>
                ))}
              </ol>
              <a href="/builder" className="inline-block self-start bg-dark text-white font-sans font-semibold text-sm px-8 py-4 rounded-sm hover:bg-dark-soft transition-colors duration-200 mt-2">Try the AI Visualizer</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 8. NURSERY SCENARIOS ─── */}
      <section className="section-padding">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">Every Stage, Covered</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">From the newborn days to the toddler years — our shades grow with your family.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { badge: "Ages 0–6 Months", image: "https://graceoaksdesigns.com/wp-content/uploads/2022/03/IMG_7468-2.jpg", imageAlt: "Minimal calm newborn nursery", heading: "Newborn Nursery", title: "The First 6 Months", body: "Daytime naps are your lifeline. True blackout means longer naps, more predictable schedules, and a calmer baby." },
              { badge: "Ages 1–3 Years", image: "https://cdn.shopify.com/s/files/1/0283/0227/8795/files/ivory-milan-with-glider-plus-6.jpg?v=1727290979", imageAlt: "Beige toddler room nursery", heading: "Toddler Room", title: "The Transition", body: "Moving from crib to big-kid bed? Blackout shades keep the room dark so your toddler stays in bed instead of greeting you at 5am." },
              { badge: "Dual Purpose", image: "https://cdn.outrank.so/8f57bbcc-2c06-4c66-bdb4-8759c8eea125/12acc672-0d36-4807-910b-a93afb2d7559.jpg", imageAlt: "Nursery double duty room", heading: "Shared Nursery/Guest", title: "Double Duty", body: "A room that works for baby now and guests later. Motorized option lets you schedule shades from the hallway." },
            ].map((room) => (
              <div key={room.heading} className="bg-cream border border-cream-dark rounded-lg overflow-hidden flex flex-col shadow-sm">
                <div className="relative"><img src={room.image} alt={room.imageAlt} className="w-full h-52 object-cover" /><span className="absolute top-3 left-3 font-sans text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-gold text-dark">{room.badge}</span></div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">{room.heading}</p>
                  <h3 className="font-serif text-lg font-bold text-dark leading-snug">{room.title}</h3>
                  <p className="font-sans text-sm text-warm-gray leading-relaxed flex-1">{room.body}</p>
                  <a href="/builder" className="inline-block mt-2 text-center border border-dark text-dark font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-dark hover:text-white transition-colors duration-200">Design Now</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 9. HOW IT WORKS ─── */}
      <section className="section-padding bg-cream-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">How It Works</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">From your window to your nursery — four simple steps to better sleep.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Ruler className="w-6 h-6 text-gold" />, step: "01", heading: "Measure Your Window", body: "Our guide takes 5 minutes. We recommend outside-mount for nurseries to maximize blackout coverage." },
              { icon: <Leaf className="w-6 h-6 text-gold" />, step: "02", heading: "Choose Baby-Safe Fabric", body: "Browse OEKO-TEX certified fabrics in neutral nursery tones. Order free swatches or use the AI visualizer." },
              { icon: <Sparkles className="w-6 h-6 text-gold" />, step: "03", heading: "We Build It", body: "Made in the USA, cordless by default. Quality-checked and carefully packaged. Ships in ~7 days." },
              { icon: <CheckCircle className="w-6 h-6 text-gold" />, step: "04", heading: "Easy Install", body: "4 screws, 15 minutes, all hardware included. 100% Fit Guarantee." },
            ].map((s) => (
              <div key={s.step} className="flex flex-col gap-3">
                <div className="flex items-center gap-3 mb-1"><div className="w-10 h-10 rounded-full bg-dark flex items-center justify-center shrink-0">{s.icon}</div><span className="font-sans font-bold text-2xl text-dark opacity-20 leading-none">{s.step}</span></div>
                <h3 className="font-serif text-lg font-bold text-dark">{s.heading}</h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12"><a href="/builder" className="inline-block bg-gold text-dark font-sans font-semibold text-sm px-10 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200">Start Designing</a></div>
        </div>
      </section>

      {/* ─── 10. PRICING ─── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">Transparent Pricing</p>
            <h2 className="heading-section font-serif text-white">Factory-Direct. No Showroom Markup.</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { size: "Small", range: "$250–$350", description: "Nursery windows, sidelights", popular: false },
              { size: "Standard", range: "$300–$600", description: "Full nursery windows — most common", popular: true },
              { size: "Large", range: "$400–$900", description: "Large or panoramic nursery windows", popular: false },
            ].map((tier) => (
              <div key={tier.size} className={`rounded-lg p-8 flex flex-col gap-4 text-center ${tier.popular ? "bg-gold/10 border-2 border-gold" : "bg-dark-soft border border-white/10"}`}>
                {tier.popular && <span className="font-sans text-xs font-bold tracking-widest text-gold uppercase">Most Popular</span>}
                <h3 className="font-serif text-2xl font-bold text-white">{tier.size}</h3>
                <p className="font-serif text-3xl font-bold text-gold">{tier.range}</p>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{tier.description}</p>
                <a href="/builder" className={`inline-block mt-2 font-sans font-semibold text-sm px-6 py-3 rounded-sm transition-colors duration-200 ${tier.popular ? "bg-gold text-dark hover:bg-gold-dark" : "border border-white/30 text-white hover:bg-white/10"}`}>Get a Quote</a>
              </div>
            ))}
          </div>
          <div className="mt-8 bg-dark-soft border border-gold/20 rounded-lg p-6 text-center max-w-2xl mx-auto">
            <p className="font-sans text-sm text-warm-gray"><span className="font-semibold text-white">Motorized upgrade: from +$250.</span> Control from the hallway — no door creaking, no waking baby.</p>
          </div>
        </div>
      </section>

      {/* ─── 11. REVIEWS ─── */}
      <section className="section-padding bg-dark-muted">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">Parent Reviews</p>
            <h2 className="heading-section font-serif text-white">What Parents Are Saying</h2>
            <div className="flex items-center justify-center gap-1 mt-4">{[...Array(5)].map((_, i) => <Star key={i} className="w-5 h-5 text-gold fill-gold" />)}<span className="font-sans text-sm text-warm-gray ml-2">4.9/5 from 500+ parents</span></div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Rachel M.", location: "Portland, OR", review: "Our toddler was waking at 5:30am every morning. We installed these and she immediately started sleeping until 7am. It's been 4 months and it's still working. Life-changing." },
              { name: "Jason & Emily W.", location: "Denver, CO", review: "We tried THREE different Amazon blackout curtains. All had light gaps. These are custom-fit and truly zero light. Our son's naps went from 30 minutes to 2 hours." },
              { name: "Priya N.", location: "San Francisco, CA", review: "The cordless feature was non-negotiable for us. Beautiful shades, perfect blackout, and I never worry about cord safety. We added motorized so we can close them from the hallway." },
            ].map((review) => (
              <div key={review.name} className="bg-dark border border-white/10 rounded-lg p-7 flex flex-col gap-4">
                <div className="flex gap-0.5">{[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-gold fill-gold" />)}</div>
                <p className="font-sans text-warm-gray leading-relaxed text-sm">&ldquo;{review.review}&rdquo;</p>
                <div className="mt-auto pt-2 border-t border-white/10"><p className="font-sans font-semibold text-white text-sm">{review.name}</p><p className="font-sans text-xs text-warm-gray">{review.location}</p></div>
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
            <p className="font-sans text-warm-gray mt-3">Everything parents ask before ordering nursery shades.</p>
          </div>
          <div className="space-y-4">
            {[
              { q: "Are these shades safe for a nursery?", a: "Yes. Every nursery shade is cordless by default — no cords, no chains, no hazards. Meets all CPSC and WCMA child safety standards." },
              { q: "Are the fabrics tested for harmful substances?", a: "Yes. OEKO-TEX Standard 100 certified — independently tested for 100+ harmful substances including formaldehyde, heavy metals, and pesticides." },
              { q: "Why do babies need complete darkness?", a: "Darkness triggers melatonin production. Even small light suppresses melatonin by up to 50%. A dark room helps babies transition between sleep cycles instead of waking every 30-45 minutes." },
              { q: "Will blackout shades help with daytime naps?", a: "Absolutely. True blackout — meaning no light leaks around edges — signals sleep time regardless of what's happening outside." },
              { q: "Can I open shades without entering the nursery?", a: "Yes — with motorized upgrade. Control from phone app, voice assistant, or wall switch. No creaky door opening." },
              { q: "What colors are best for a nursery?", a: "Neutral tones — white, ivory, linen, soft gray. Blackout performance is identical regardless of fabric color." },
              { q: "How do I measure nursery windows?", a: "5-minute guide. We recommend outside-mount for nurseries to maximize coverage. Our team reviews measurements before production." },
              { q: "What if the shades don't fit?", a: "100% Fit Guarantee. We remake at no charge if they don't fit per our guide. No arguing, no fine print." },
              { q: "Can I add motorization later?", a: "Yes — if you select a motorization-compatible tube at order time. We recommend deciding upfront for cleanest install." },
              { q: "Do you offer samples?", a: "Yes! Up to 10 free swatches. We strongly recommend this for nurseries so you can see colors in the room's actual light." },
            ].map((item, i) => (
              <details key={i} className="bg-white border border-cream-dark rounded-lg group">
                <summary className="flex items-center justify-between px-6 py-5 cursor-pointer font-sans font-semibold text-dark text-sm list-none gap-4">
                  {item.q}
                  <span className="shrink-0 w-5 h-5 rounded-full border border-cream-dark flex items-center justify-center text-warm-gray font-bold text-lg leading-none group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="px-6 pb-5"><p className="font-sans text-sm text-warm-gray leading-relaxed">{item.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 13. FINAL CTA — warm cream overlay ─── */}
      <section className="relative section-padding flex flex-col justify-center items-center text-center overflow-hidden" style={{ backgroundImage: "url(https://www.tlcinteriors.com.au/wp-content/uploads/2020/09/bohemian-nursery-with-blonde-timber-crib-and-sheer-curtains-gender-neutral-colours.jpg)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0" style={{ background: "rgba(255,251,244,0.88)" }} />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 container-narrow px-4 flex flex-col items-center gap-6">
          <h2 className="heading-section font-serif text-dark">Better Sleep Starts <span className="gold-gradient-text">Tonight.</span></h2>
          <p className="font-sans text-warm-gray text-lg max-w-xl leading-relaxed">Custom blackout shades for your nursery. Cordless. Certified safe. Delivered in 7 days.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a href="/builder" className="inline-block bg-gold text-dark font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200">Design Your Nursery Shades</a>
            <a href="/swatches" className="inline-block border border-dark/40 text-dark font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-dark/5 transition-colors duration-200">Order Free Swatches</a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm font-sans text-warm-gray">
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-gold fill-gold" />4.9/5 from 500+ Parents</span>
            <span className="flex items-center gap-1.5"><ShieldCheck className="w-4 h-4 text-gold" />Cordless · OEKO-TEX Safe</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-gold" />100% Fit Guarantee</span>
          </div>
          <p className="font-sans text-sm text-warm-gray mt-2 flex items-center gap-2"><Phone className="w-4 h-4 text-gold" />Questions? Call us: <a href="tel:+18446742716" className="font-semibold text-dark hover:text-gold transition-colors">(844) 674-2716</a></p>
        </div>
      </section>
    </>
  )
}
