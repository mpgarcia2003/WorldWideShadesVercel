import type { Metadata } from "next"
import {
  Star,
  Mic,
  Clock,
  BatteryCharging,
  Layers,
  Check,
  X,
  Truck,
  Factory,
  CheckCircle,
  Wifi,
  Phone,
} from "lucide-react"

export const metadata: Metadata = {
  title: "Motorized Roller Shades | Voice Control, Smart Home — World Wide Shades",
  description:
    "Upgrade any custom shade to motorized. Works with Alexa, Google Home, Apple HomeKit. Rechargeable battery, no wiring. From +$250. Ships in 7 days. Made in USA.",
  openGraph: {
    title: "Motorized Roller Shades | World Wide Shades",
    description:
      "Your shades, on command. Motorized custom shades with voice control, scheduling, and app control. No wiring needed.",
    url: "https://worldwideshades.com/motorized-shades",
    siteName: "World Wide Shades",
    type: "website",
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    { "@type": "Product", name: "Motorized Roller Shades", description: "Upgrade any custom shade to motorized. Works with Alexa, Google Home, Apple HomeKit, and 9+ smart home platforms. Rechargeable battery, no wiring needed. From +$250. Made in USA, ships in 7 days.", brand: { "@type": "Brand", name: "World Wide Shades" }, offers: { "@type": "AggregateOffer", lowPrice: "250", highPrice: "1200", priceCurrency: "USD", availability: "https://schema.org/InStock" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "500", bestRating: "5", worstRating: "1" } },
    { "@type": "FAQPage", mainEntity: [
      { "@type": "Question", name: "How does the motorized upgrade work?", acceptedAnswer: { "@type": "Answer", text: "When you build your custom shade, simply select 'motorized' as your operation type. We install a whisper-quiet rechargeable battery motor inside the shade tube." } },
      { "@type": "Question", name: "Do I need an electrician for installation?", acceptedAnswer: { "@type": "Answer", text: "No. Our motorized shades use a rechargeable battery motor — no hardwiring required. Installation is 4 screws, 15 minutes. Charges via USB-C." } },
      { "@type": "Question", name: "How long does the rechargeable battery last?", acceptedAnswer: { "@type": "Answer", text: "Approximately 6+ months under typical use (3–5 cycles per day). Low-battery notification via the Automate app. Charges in about 4 hours." } },
      { "@type": "Question", name: "What voice assistants are compatible?", acceptedAnswer: { "@type": "Answer", text: "Amazon Alexa, Google Home, Apple HomeKit (Siri), Samsung SmartThings, Control4, Crestron, Savant, and any Matter-compatible platform — 9+ platforms total." } },
      { "@type": "Question", name: "Can I motorize specialty shape shades?", acceptedAnswer: { "@type": "Answer", text: "Yes. The motor is integrated into the shade tube and works regardless of fabric or shape." } },
      { "@type": "Question", name: "How many shades can one hub control?", acceptedAnswer: { "@type": "Answer", text: "The Pulse PRO Smart Hub can control up to 30 individual motorized shades, organized into groups, rooms, or scenes." } },
      { "@type": "Question", name: "What happens during a power outage?", acceptedAnswer: { "@type": "Answer", text: "Our motors are battery-powered and continue to function normally during outages." } },
      { "@type": "Question", name: "Can I add motorization to an existing shade later?", acceptedAnswer: { "@type": "Answer", text: "In most cases, yes — if your shade was built with a motorization-compatible tube. We recommend selecting motorization at time of order." } },
      { "@type": "Question", name: "How loud is the motor?", acceptedAnswer: { "@type": "Answer", text: "Whisper-quiet — rated at less than 35dB, quieter than a library." } },
      { "@type": "Question", name: "What's included with the motorized upgrade?", acceptedAnswer: { "@type": "Answer", text: "Rechargeable battery motor, mounting hardware, USB-C charging cable, and Automate Shades app access. Hub, remote, and sun sensor available as add-ons." } },
    ] },
    { "@type": "Organization", name: "World Wide Shades LLC", url: "https://worldwideshades.com", telephone: "+18446742716", description: "Factory-direct custom roller shades. Made in USA." },
    { "@type": "BreadcrumbList", itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://worldwideshades.com" },
      { "@type": "ListItem", position: 2, name: "Motorized Roller Shades", item: "https://worldwideshades.com/motorized-shades" },
    ] },
  ],
}

export default function MotorizedRollerShadesPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ─── 1. HERO ─── */}
      <section className="relative min-h-screen flex flex-col justify-center items-center text-center text-white overflow-hidden" style={{ backgroundImage: "url(https://worldwideshades.com/cdn/shop/files/penthouse-blackout-shades-with-tablet.png?v=1754080088)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-dark/80" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 container-site section-padding flex flex-col items-center gap-6 px-4">
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-sans font-semibold tracking-widest text-warm-gray uppercase">Voice Controlled&nbsp;·&nbsp;App Enabled&nbsp;·&nbsp;Rechargeable</div>
          <h1 className="heading-display font-serif text-white max-w-4xl leading-tight">Your Shades, <span className="gold-gradient-text">On Command</span></h1>
          <p className="font-sans text-lg md:text-xl text-warm-gray max-w-2xl leading-relaxed">Upgrade any custom shade to motorized. Whisper-quiet motors with voice control, scheduling, and app control. Rechargeable battery — no electrician needed.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a href="/builder" className="inline-block bg-gold text-dark font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200">Build Your Motorized Shade</a>
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
            {[{ number: "9+", label: "Smart Home Platforms" }, { number: "~7 Days", label: "Order to Installed" }, { number: "700+", label: "Fabric Options" }, { number: "From +$250", label: "Motorized Upgrade" }].map((stat) => (
              <div key={stat.label} className="flex flex-col items-center py-8 px-4 text-center">
                <span className="font-serif text-3xl md:text-4xl font-bold text-gold leading-none">{stat.number}</span>
                <span className="font-sans text-sm text-warm-gray mt-2 uppercase tracking-wider">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. WHY MOTORIZE ─── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">Why Motorize</p>
            <h2 className="heading-section font-serif text-dark">The Upgrade Your Home Has Been Waiting For</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-xl mx-auto">Manual chains are obsolete. Here&apos;s what motorization changes.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { icon: <Mic className="w-6 h-6 text-gold" />, heading: "Voice Control", body: "\"Hey Alexa, close my shades.\" One command. Done. Works with Alexa, Google, Siri." },
              { icon: <Clock className="w-6 h-6 text-gold" />, heading: "Scheduled Automation", body: "Shades that know your routine. Open at sunrise, close at sunset. Set it once." },
              { icon: <BatteryCharging className="w-6 h-6 text-gold" />, heading: "No Wiring Needed", body: "Rechargeable battery motor. USB-C charging. No electrician, no holes in walls." },
              { icon: <Layers className="w-6 h-6 text-gold" />, heading: "Works on Any Shade", body: "Blackout, light filtering, solar. Standard and specialty shapes. Every fabric." },
            ].map((card) => (
              <div key={card.heading} className="bg-white rounded-lg p-6 flex flex-col gap-4 shadow-sm border border-cream-dark">
                <div className="w-12 h-12 rounded-full bg-dark flex items-center justify-center shrink-0">{card.icon}</div>
                <h3 className="font-serif text-lg font-bold text-dark leading-snug">{card.heading}</h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. SMART HOME ECOSYSTEM ─── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="text-center mb-10">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">Smart Home Compatible</p>
            <h2 className="heading-section font-serif text-white">Works With Everything You Already Own</h2>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mb-10">
            {["Amazon Alexa", "Google Home", "Apple HomeKit", "Apple Siri", "Samsung SmartThings", "Matter Compatible", "Control4", "Crestron", "Savant"].map((platform) => (
              <span key={platform} className="font-sans font-semibold text-sm text-white border border-white/25 rounded-sm px-5 py-2.5 hover:border-gold hover:text-gold transition-colors duration-200">{platform}</span>
            ))}
          </div>
          <div className="max-w-2xl mx-auto text-center mb-10">
            <p className="font-sans text-warm-gray text-lg leading-relaxed">One hub connects all your shades. Control individually or in groups. Create scenes like &ldquo;Movie Night&rdquo; or &ldquo;Good Morning&rdquo; that move multiple shades at once.</p>
          </div>
          <div className="text-center"><a href="/builder" className="inline-block bg-gold text-dark font-sans font-semibold text-sm px-10 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200">Build Your Motorized Shade</a></div>
        </div>
      </section>

      {/* ─── 5. ACCESSORIES ─── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">The Ecosystem</p>
            <h2 className="heading-section font-serif text-dark">Everything You Need, Nothing You Don&rsquo;t</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-xl mx-auto">Build out your smart shade setup with the accessories that fit your lifestyle.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5">
            {[
              { image: "https://res.cloudinary.com/dcmlcfynd/image/upload/v1765304892/Push-5-1_huhfuk.png", imageAlt: "Push 5 ARC Remote Control", name: "Push 5 ARC Remote", price: "$50", msrp: "$63", tag: "Remote", body: "Control from anywhere in the room. 5-channel, controls up to 5 shades." },
              { image: "https://res.cloudinary.com/dcmlcfynd/image/upload/v1765304892/Pulse-2_nepvfj.png", imageAlt: "Pulse PRO Smart Hub", name: "Pulse PRO Smart Hub", price: "$185", msrp: "$231", tag: "Hub", body: "The brain of your smart shades. Connects to WiFi, enables voice control and app." },
              { image: "https://res.cloudinary.com/dcmlcfynd/image/upload/v1765304892/motorised-blinds-automate-pulse-2-app-smarter-controls-for-climate-and-light-management-us_eg7ffg.png", imageAlt: "Automate Shades App", name: "Automate Shades App", price: "FREE WITH HUB", msrp: null, tag: "App", body: "Control all shades from your phone. Create schedules, scenes, and groups." },
              { image: "https://res.cloudinary.com/dcmlcfynd/image/upload/v1767828127/SunSensor_yk4he7.avif", imageAlt: "Sun Sensor", name: "Sun Sensor", price: "$150", msrp: "$188", tag: "Sensor", body: "Automatic light response. Shades close when it's bright, open when it's cloudy." },
              { image: "https://res.cloudinary.com/dcmlcfynd/image/upload/v1767978103/rowley-automate-slim-drapery-motor-cable-mt03-0301-069007_o8lbi5.webp", imageAlt: "Motor Charger USB-C", name: "Motor Charger (USB-C)", price: "$50", msrp: "$63", tag: "Accessory", body: "Keep motors powered. Quick-charge via USB-C." },
            ].map((product) => (
              <div key={product.name} className="bg-white rounded-lg overflow-hidden flex flex-col shadow-sm border border-cream-dark">
                <div className="relative bg-cream-dark">
                  <img src={product.image} alt={product.imageAlt} className="w-full h-48 object-contain p-4" />
                  <span className="absolute top-3 left-3 font-sans text-xs font-bold uppercase tracking-widest bg-dark text-gold px-2.5 py-1 rounded-full">{product.tag}</span>
                </div>
                <div className="p-5 flex flex-col gap-2 flex-1">
                  <h3 className="font-serif text-base font-bold text-dark leading-snug">{product.name}</h3>
                  <p className="font-sans text-sm text-warm-gray leading-relaxed flex-1">{product.body}</p>
                  <div className="flex items-baseline gap-2 mt-2">
                    <span className="font-sans font-bold text-lg text-dark">{product.price}</span>
                    {product.msrp && <span className="font-sans text-sm text-warm-gray line-through">{product.msrp}</span>}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 6. HOW IT WORKS ─── */}
      <section className="section-padding bg-dark-muted">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">The Process</p>
            <h2 className="heading-section font-serif text-white">How It Works</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">From order to voice-controlled in four simple steps.</p>
          </div>
          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              { icon: <Layers className="w-6 h-6 text-gold" />, step: "01", heading: "Choose Your Shade", body: "Pick fabric, size, and mount type. Any shade can be motorized — blackout, solar, light filtering." },
              { icon: <BatteryCharging className="w-6 h-6 text-gold" />, step: "02", heading: "Add Motorization", body: "Select motor type (rechargeable or hardwired) during checkout. We build it in." },
              { icon: <Wifi className="w-6 h-6 text-gold" />, step: "03", heading: "Connect Your Hub", body: "Plug in the Pulse PRO hub. Connect to WiFi. Link to your smart home in minutes." },
              { icon: <Mic className="w-6 h-6 text-gold" />, step: "04", heading: "Control Everything", body: "Voice, app, remote, schedule, or sun sensor. Your shades, your way." },
            ].map((s) => (
              <div key={s.step} className="flex flex-col gap-3">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-full bg-dark flex items-center justify-center shrink-0">{s.icon}</div>
                  <span className="font-sans font-bold text-2xl text-warm-gray opacity-40 leading-none">{s.step}</span>
                </div>
                <h3 className="font-serif text-lg font-bold text-white">{s.heading}</h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{s.body}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-12"><a href="/builder" className="inline-block bg-gold text-dark font-sans font-semibold text-sm px-10 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200">Start Building</a></div>
        </div>
      </section>

      {/* ─── 7. USE CASES ─── */}
      <section className="section-padding">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">Room by Room</p>
            <h2 className="heading-section font-serif text-dark">Built for Every Room</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">Motorized shades transform how every space in your home functions.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { image: "https://worldwideshades.com/cdn/shop/files/cozy-bedroom-blackout-motorized-shades-voice-control-energy-savings.png?v=1754079402", imageAlt: "Cozy bedroom with motorized shades", room: "Bedrooms", body: "Wake up to natural light. Schedule shades to open gradually with sunrise. Fall asleep in complete darkness." },
              { image: "https://worldwideshades.com/cdn/shop/files/living-room-white-blackout-roller-shade.png?v=1754081490", imageAlt: "Living room with white roller shade", room: "Living Rooms", body: "One voice command dims the room for movie night. Another opens everything for morning light." },
              { image: "https://worldwideshades.com/cdn/shop/files/blackout-roller-shade-office-smart-control.png?v=1754080327", imageAlt: "Home office with smart shade control", room: "Home Office", body: "Shades that adjust with the sun. No more glare on your screen. No more getting up to fix the blinds." },
            ].map((room) => (
              <div key={room.room} className="bg-dark rounded-lg overflow-hidden flex flex-col shadow-lg">
                <div className="relative"><img src={room.image} alt={room.imageAlt} className="w-full h-56 object-cover" /></div>
                <div className="p-6 flex flex-col gap-3 flex-1">
                  <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">{room.room}</p>
                  <p className="font-sans text-base text-warm-gray leading-relaxed flex-1">{room.body}</p>
                  <a href="/builder" className="inline-block mt-2 text-center border border-gold text-gold font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-gold hover:text-dark transition-colors duration-200">Build for {room.room}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 8. BEFORE/AFTER ─── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img src="https://worldwideshades.com/cdn/shop/files/before-after-motorized-blackout-shade-installation.png?v=1754081131" alt="Before and after motorized blackout shade installation" className="w-full h-full object-cover" style={{ minHeight: "380px" }} />
            </div>
            <div className="flex flex-col gap-6">
              <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">The Upgrade</p>
              <h2 className="heading-section font-serif text-dark leading-tight">The Upgrade That Changes Everything</h2>
              <div className="space-y-5">
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-red-100 flex items-center justify-center shrink-0 mt-0.5"><X className="w-4 h-4 text-red-500" /></div>
                  <div><p className="font-sans font-semibold text-dark text-sm mb-1">Before</p><p className="font-sans text-sm text-warm-gray leading-relaxed">Manual chain. Getting up every time. Forgetting to close them.</p></div>
                </div>
                <div className="flex gap-4 items-start">
                  <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center shrink-0 mt-0.5"><Check className="w-4 h-4 text-gold" /></div>
                  <div><p className="font-sans font-semibold text-dark text-sm mb-1">After</p><p className="font-sans text-sm text-warm-gray leading-relaxed">Voice controlled. Scheduled. Automatic. <em>&ldquo;Hey Alexa, close the bedroom shades.&rdquo;</em></p></div>
                </div>
              </div>
              <a href="/builder" className="inline-block self-start bg-dark text-white font-sans font-semibold text-sm px-8 py-4 rounded-sm hover:bg-dark-soft transition-colors duration-200 mt-2">Make the Upgrade</a>
            </div>
          </div>
        </div>
      </section>

      {/* ─── 9. COMPARISON TABLE ─── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="text-center mb-10">
            <h2 className="heading-section font-serif text-white">See How We Compare — Honestly</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">We stack up against the competition on every dimension that matters.</p>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full font-sans text-sm border-collapse">
              <thead>
                <tr>
                  <th className="text-left py-4 px-4 text-warm-gray font-semibold w-1/4"></th>
                  <th className="py-4 px-4 text-center font-bold text-white bg-dark-soft border-t-2 border-gold rounded-t-sm">WWS Motorized</th>
                  <th className="py-4 px-4 text-center font-semibold text-warm-gray">DIY Smart Blinds (Amazon)</th>
                  <th className="py-4 px-4 text-center font-semibold text-warm-gray">Hunter Douglas PowerView</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { label: "Custom Sizing", wws: true, diy: false, hd: true },
                  { label: "Voice Platforms", wws: "9+", diy: "2–3", hd: "3" },
                  { label: "Battery Life", wws: "6+ months", diy: "Varies", hd: "1–2 years" },
                  { label: "Fabric Options", wws: "700+", diy: "Limited", hd: "400+" },
                  { label: "Shipping", wws: "~7 Days", diy: "2–5 Days", hd: "3–4 Weeks" },
                  { label: "Price", wws: "From +$250", diy: "$80–150", hd: "From +$600" },
                  { label: "Fit Guarantee", wws: true, diy: false, hd: false },
                  { label: "Hub Required", wws: "Optional", diy: "Varies", hd: "Yes" },
                ].map((row) => (
                  <tr key={row.label} className="border-t border-white/10 hover:bg-white/5 transition-colors">
                    <td className="py-4 px-4 font-semibold text-warm-gray">{row.label}</td>
                    <td className="py-4 px-4 text-center bg-dark-soft font-semibold text-white">{row.wws === true ? <Check className="w-5 h-5 text-gold mx-auto" /> : row.wws === false ? <X className="w-5 h-5 text-red-400 mx-auto" /> : row.wws}</td>
                    <td className="py-4 px-4 text-center text-warm-gray">{row.diy === true ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : row.diy === false ? <X className="w-5 h-5 text-red-400 mx-auto" /> : row.diy}</td>
                    <td className="py-4 px-4 text-center text-warm-gray">{row.hd === true ? <Check className="w-5 h-5 text-green-400 mx-auto" /> : row.hd === false ? <X className="w-5 h-5 text-red-400 mx-auto" /> : row.hd}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── 10. PRICING KITS ─── */}
      <section className="section-padding bg-cream-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">Transparent Pricing</p>
            <h2 className="heading-section font-serif text-dark">Choose the Kit That Fits Your Life</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">Start with just the motor, or build out the full smart home experience.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {[
              { name: "Motor Upgrade", price: "From +$250", description: "Added to any custom shade", includes: ["Rechargeable battery motor", "Mounting hardware", "USB-C charger"], featured: false },
              { name: "Essential Kit", price: "From +$300", description: "Motor + Remote", includes: ["Rechargeable battery motor", "Push 5 ARC Remote", "USB-C charger"], featured: false },
              { name: "Smart Home Kit", price: "From +$435", description: "Motor + Hub + App", includes: ["Rechargeable battery motor", "Pulse PRO Smart Hub", "Automate Shades App", "USB-C charger"], featured: true },
              { name: "Full Automation", price: "From +$585", description: "Motor + Hub + Sun Sensor", includes: ["Rechargeable battery motor", "Pulse PRO Smart Hub", "Sun Sensor", "Automate Shades App", "USB-C charger"], featured: false },
            ].map((kit) => (
              <div key={kit.name} className={`rounded-lg overflow-hidden flex flex-col shadow-sm ${kit.featured ? "bg-dark border-2 border-gold" : "bg-white border border-cream-dark"}`}>
                {kit.featured && <div className="bg-gold text-dark text-center font-sans font-bold text-xs tracking-widest uppercase py-2">Most Popular</div>}
                <div className="p-6 flex flex-col gap-4 flex-1">
                  <div>
                    <h3 className={`font-serif text-lg font-bold leading-snug ${kit.featured ? "text-white" : "text-dark"}`}>{kit.name}</h3>
                    <p className="font-sans text-xs mt-1 text-warm-gray">{kit.description}</p>
                  </div>
                  <div className={`font-serif text-2xl font-bold ${kit.featured ? "text-gold" : "text-dark"}`}>{kit.price}</div>
                  <ul className="space-y-2 flex-1">
                    {kit.includes.map((item) => (
                      <li key={item} className="flex items-start gap-2"><Check className="w-4 h-4 shrink-0 mt-0.5 text-gold" /><span className="font-sans text-sm text-warm-gray">{item}</span></li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
          <p className="text-center font-sans text-sm text-warm-gray mb-8">All kits include: Rechargeable motor, mounting hardware, USB-C charger</p>
          <div className="text-center"><a href="/builder" className="inline-block bg-gold text-dark font-sans font-semibold text-base px-10 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200">Get Your Exact Price</a></div>
        </div>
      </section>

      {/* ─── 11. REVIEWS ─── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">Customer Reviews</p>
            <h2 className="heading-section font-serif text-white">Homeowners Who Made the Switch</h2>
            <div className="flex items-center justify-center gap-2 mt-4">
              {Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-5 h-5 text-gold fill-gold" />)}
              <span className="font-sans text-warm-gray text-sm ml-1">4.9 from 500+ reviews</span>
            </div>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "James T.", location: "Denver, CO", quote: "'Close the bedroom shades' — that's all I say. The motor is whisper-quiet. My wife didn't even know they were motorized until I told her." },
              { name: "Amanda P.", location: "Scottsdale, AZ", quote: "We have 8 motorized shades on one hub. 'Movie night' closes all the living room shades at once. The sun sensor is genius — they close automatically when it gets bright." },
              { name: "David K.", location: "Austin, TX", quote: "I was worried about installation. Took 20 minutes per shade, no wiring. The USB-C charging lasts 6+ months. Best home upgrade we've made." },
            ].map((review) => (
              <div key={review.name} className="bg-dark-soft rounded-lg p-6 flex flex-col gap-4">
                <div className="flex gap-0.5">{Array.from({ length: 5 }).map((_, i) => <Star key={i} className="w-4 h-4 text-gold fill-gold" />)}</div>
                <p className="font-sans text-warm-gray leading-relaxed text-sm flex-1">&ldquo;{review.quote}&rdquo;</p>
                <div><p className="font-sans font-semibold text-white text-sm">{review.name}</p><p className="font-sans text-warm-gray text-xs">{review.location}</p></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 12. FAQ ─── */}
      <section className="section-padding">
        <div className="container-narrow px-4">
          <div className="text-center mb-10">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">Got Questions</p>
            <h2 className="heading-section font-serif text-dark">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-0 divide-y divide-cream-dark border border-cream-dark rounded-lg overflow-hidden">
            {[
              { q: "How does the motorized upgrade work?", a: "When you build your custom shade, simply select 'motorized' as your operation type. We install a whisper-quiet rechargeable battery motor inside the shade tube. The motor connects to our Automate ecosystem, giving you voice, app, remote, and schedule control right out of the box." },
              { q: "Do I need an electrician for installation?", a: "No. Our motorized shades use a rechargeable battery motor — there's no hardwiring required. Installation is the same as a standard shade: 4 screws, 15 minutes. The motor charges via USB-C, just like your phone." },
              { q: "How long does the rechargeable battery last?", a: "The rechargeable battery lasts approximately 6+ months under typical use (3–5 cycles per day). When it's time to charge, a low-battery notification is sent to the Automate app. Charging takes about 4 hours via the included USB-C cable." },
              { q: "What voice assistants are compatible?", a: "Our motorized shades work with Amazon Alexa, Google Home, Apple HomeKit (Siri), Samsung SmartThings, Control4, Crestron, Savant, and any Matter-compatible platform — 9+ smart home platforms in total." },
              { q: "Can I motorize specialty shape shades?", a: "Yes. The motor is integrated into the shade tube and works regardless of the fabric or shape. Blackout, light filtering, solar, and most specialty configurations can all be motorized." },
              { q: "How many shades can one hub control?", a: "The Pulse PRO Smart Hub can control up to 30 individual motorized shades. You can organize them into groups, rooms, or scenes. One hub is typically sufficient for an entire home." },
              { q: "What happens during a power outage?", a: "Because our motors are battery-powered, they continue to function normally during a power outage. You can still control shades via the remote or by manually moving the shade." },
              { q: "Can I add motorization to an existing shade later?", a: "In most cases, yes — if your existing shade was built with a motorization-compatible tube. We recommend selecting motorization at time of order for the cleanest result." },
              { q: "How loud is the motor?", a: "Our motors are whisper-quiet — rated at less than 35dB, which is quieter than a library. Most customers are surprised by how quiet it is." },
              { q: "What's included with the motorized upgrade?", a: "Every motorized shade includes: rechargeable battery motor, mounting hardware, USB-C charging cable, and access to the Automate Shades app. Hub, remote, and sun sensor are available as add-ons or in bundled kits." },
            ].map((faq, i) => (
              <details key={i} className="group bg-white">
                <summary className="flex items-center justify-between gap-4 cursor-pointer px-6 py-5 font-sans font-semibold text-dark text-sm hover:bg-cream transition-colors duration-200 list-none">
                  <span>{faq.q}</span>
                  <span className="text-gold font-bold text-xl leading-none shrink-0 group-open:rotate-45 transition-transform duration-200">+</span>
                </summary>
                <div className="px-6 pb-5 pt-0"><p className="font-sans text-sm text-warm-gray leading-relaxed">{faq.a}</p></div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 13. FINAL CTA ─── */}
      <section className="relative section-padding flex flex-col justify-center items-center text-center text-white overflow-hidden" style={{ backgroundImage: "url(https://worldwideshades.com/cdn/shop/files/cozy-bedroom-blackout-motorized-shades-voice-control-energy-savings.png?v=1754079402)", backgroundSize: "cover", backgroundPosition: "center" }}>
        <div className="absolute inset-0 bg-dark/85" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 container-narrow px-4 flex flex-col items-center gap-6">
          <h2 className="heading-section font-serif text-white max-w-3xl leading-tight">Stop Getting Up to <span className="gold-gradient-text">Adjust Your Shades.</span></h2>
          <p className="font-sans text-lg text-warm-gray max-w-xl leading-relaxed">Motorized. Voice controlled. Scheduled. Built for your exact windows.</p>
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a href="/builder" className="inline-block bg-gold text-dark font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200">Build Your Motorized Shade</a>
          </div>
          <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm font-sans text-warm-gray">
            <span className="flex items-center gap-1.5"><Star className="w-4 h-4 text-gold fill-gold" />4.9/5 from 500+ Homeowners</span>
            <span className="flex items-center gap-1.5"><Truck className="w-4 h-4 text-gold" />Ships in ~7 Days</span>
            <span className="flex items-center gap-1.5"><CheckCircle className="w-4 h-4 text-gold" />100% Fit Guarantee</span>
            <span className="flex items-center gap-1.5"><Factory className="w-4 h-4 text-gold" />Made in USA</span>
          </div>
          <a href="tel:+18446742716" className="flex items-center gap-2 font-sans text-sm text-warm-gray hover:text-gold transition-colors mt-2"><Phone className="w-4 h-4" />Questions? Call us: (844) 674-2716</a>
        </div>
      </section>
    </>
  )
}
