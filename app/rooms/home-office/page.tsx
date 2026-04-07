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
  description:
    "Custom home office shades that eliminate screen glare and reduce eye strain. Light filtering for soft focus, motorized for convenience. From $250. Ships in 7 days.",
  openGraph: {
    title: "Custom Shades for Home Offices | World Wide Shades",
    description:
      "Custom home office shades that eliminate screen glare and reduce eye strain. Light filtering for soft focus, motorized for convenience. From $250. Ships in 7 days.",
    url: "https://worldwideshades.com/rooms/home-office",
    siteName: "World Wide Shades",
    type: "website",
    images: [{ url: "https://res.cloudinary.com/dcmlcfynd/image/upload/c_fill,w_1200,h_630,g_auto/v1774397716/lightfilter-hero-living_ka1oae.png", width: 1200, height: 630, alt: "Custom shades for living rooms — World Wide Shades" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Shades for Home Offices | World Wide Shades",
    description: "Custom home office shades that eliminate screen glare and reduce eye strain. Light filtering for soft focus, motorized for convenience. From $250. Ships in 7 days.",
    images: ["https://res.cloudinary.com/dcmlcfynd/image/upload/c_fill,w_1200,h_630,g_auto/v1774397716/lightfilter-hero-living_ka1oae.png"],
  },
}

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "Custom Shades for Home Offices",
      description:
        "Custom home office shades that eliminate screen glare and reduce eye strain. Light filtering for soft focus, motorized for convenience. Factory-direct pricing from $250. Ships in 7 days.",
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
          name: "Should I get light filtering or blackout for my home office?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Light filtering is the top recommendation for most home offices. It diffuses harsh sunlight into soft, even ambient light — eliminating screen glare while keeping your workspace bright and energized. Blackout is best if you do video editing, screen-intensive presentations, or prefer total light control. Many serious WFH professionals opt for a dual setup: light filtering for daily use, motorized blackout for client calls and presentations.",
          },
        },
        {
          "@type": "Question",
          name: "Will light filtering shades reduce screen glare?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Light filtering shades transform direct, harsh sunlight into diffused ambient light. This eliminates the directional glare that causes squinting and eye strain on monitors. They don't block light entirely — they redistribute it evenly across the room so there are no harsh bright spots hitting your screen.",
          },
        },
        {
          "@type": "Question",
          name: "Do these shades help with video call lighting?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Significantly. Blown-out windows behind you create harsh backlighting that makes you look like a silhouette on video calls. Light filtering shades even out the light in your room, creating a soft, flattering look on camera. Many of our customers report that their coworkers noticed the improvement immediately.",
          },
        },
        {
          "@type": "Question",
          name: "Can shades reduce my energy bill?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Solar and light filtering shades block a significant portion of solar heat gain — up to 78% depending on the fabric openness factor. This is especially impactful for west-facing home offices that turn into saunas every afternoon. Lower heat gain means your AC runs less, which translates directly to lower energy bills.",
          },
        },
        {
          "@type": "Question",
          name: "Can I automate shades to adjust throughout the day?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Yes. Our motorized shades integrate with Alexa, Google Home, Apple HomeKit, and most smart home platforms. You can program them to lower automatically when the morning sun hits your east-facing window, or raise them for natural light during your afternoon slump. Automation is one of the biggest quality-of-life upgrades for WFH professionals.",
          },
        },
        {
          "@type": "Question",
          name: "What colors work best for a home office?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Neutral, warm tones — whites, linens, warm grays — are the most popular for home offices because they blend with professional backgrounds and don't dominate the room visually. For video calls, lighter shades behind you create a cleaner, more professional look. Use our AI visualizer to preview colors in your actual space before ordering.",
          },
        },
        {
          "@type": "Question",
          name: "Can I get free fabric samples?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Absolutely. We offer free fabric swatches so you can see and feel the material before committing. Order up to 10 swatches for free — just pay shipping. Seeing a sample in your actual office lighting is the best way to choose the right fabric.",
          },
        },
        {
          "@type": "Question",
          name: "How do I measure my office window?",
          acceptedAnswer: {
            "@type": "Answer",
            text: "Our measurement guide walks you through it step by step in about 5 minutes. You'll need a metal tape measure and take three measurements (top, middle, bottom for width; left, center, right for height) to account for any window irregularities. We also offer a 100% Fit Guarantee — if your shades don't fit per our guide, we remake them at no charge.",
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
          name: "Shades for Home Offices",
          item: "https://worldwideshades.com/rooms/home-office",
        },
      ],
    },
  ],
}

export default function HomeOfficeShades() {
  return (
    <>
      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── 1. HERO ──────────────────────────────────────────── */}
      <section
        className="relative min-h-screen flex flex-col justify-center items-center text-center text-white overflow-hidden"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1774311237295-a65a4c1ff38a?auto=format&fit=crop&w=1920&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center top",
        }}
      >
        {/* Warm cream-tinted overlay — lighter than blackout page for the "clean/bright" office feel */}
        <div className="absolute inset-0 bg-dark/70" />
        {/* Warm tint layer */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(135deg, rgba(200,161,101,0.08) 0%, rgba(12,12,12,0.0) 60%)" }}
        />
        {/* Noise texture */}
        <div className="noise-overlay absolute inset-0 pointer-events-none" />

        <div className="relative z-10 container-site section-padding flex flex-col items-center gap-6 px-4">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-sans font-semibold tracking-widest text-warm-gray uppercase">
            Reduce Glare&nbsp;·&nbsp;Boost Focus&nbsp;·&nbsp;Work Smarter
          </div>

          {/* H1 */}
          <h1 className="heading-display font-serif text-white max-w-4xl leading-tight">
            Your Best Work Happens in{" "}
            <span className="gold-gradient-text">The Right Light</span>
          </h1>

          {/* Subtext */}
          <p className="font-sans text-lg md:text-xl text-warm-gray max-w-2xl leading-relaxed">
            Custom shades that eliminate screen glare, reduce eye strain, and keep your home office
            comfortable all day. Light filtering for soft focus. Blackout for presentations.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a
              href="/builder"
              className="inline-block bg-gold text-dark font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200"
            >
              Design Your Office Shades
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
              4.9/5 · 500+ WFH Professionals
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

      {/* ─── 2. STATS BAR ─────────────────────────────────────── */}
      <section className="bg-dark border-y border-white/10">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {[
              { number: "700+", label: "Fabrics" },
              { number: "~7 Days", label: "Delivered" },
              { number: "50%+", label: "UV Blocked" },
              { number: "$250+", label: "Factory-Direct" },
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

      {/* ─── 3. THE WFH PROBLEM ───────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">
              Working From Home Shouldn't Mean Fighting the Sun
            </h2>
            <p className="font-sans text-warm-gray mt-3 max-w-xl mx-auto">
              The wrong light doesn't just ruin your mood — it costs you hours of productive work
              every single day.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-0 rounded-lg overflow-hidden shadow-xl">
            {/* Left: image column */}
            <div className="relative min-h-64 md:min-h-0">
              <img
                src="https://cdn.outrank.so/9c5f69eb-4d1e-4677-8502-3f8db0bae8a7/f374d32b-73da-44ff-9839-06b1ec2ea41f.jpg"
                alt="Screen glare in home office"
                className="w-full h-full object-cover"
                style={{ minHeight: "340px" }}
              />
              <div className="absolute inset-0 bg-dark/40" />
              <div className="absolute bottom-6 left-6 right-6">
                <span className="font-sans text-xs font-bold tracking-widest text-gold uppercase">
                  Sound Familiar?
                </span>
                <p className="font-serif text-white text-xl font-bold mt-1 leading-snug">
                  Repositioning your desk every hour to escape the glare.
                </p>
              </div>
            </div>

            {/* Right: problems list */}
            <div className="bg-dark p-8 md:p-12">
              <p className="font-sans text-xs font-bold tracking-widest text-warm-gray uppercase mb-6">
                The WFH Light Problem
              </p>
              <ul className="space-y-7">
                {[
                  {
                    icon: <Monitor className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />,
                    title: "Screen glare kills productivity",
                    body: "Direct sun on your monitor means squinting, headaches, and repositioning your desk every hour. No focus survives a glare attack.",
                  },
                  {
                    icon: <Video className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />,
                    title: "Video call distractions",
                    body: "Blown-out backgrounds, harsh shadows, constantly adjusting blinds mid-meeting. Your coworkers see a silhouette, not a professional.",
                  },
                  {
                    icon: <Eye className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />,
                    title: "Eye strain by 3pm",
                    body: "Uneven, harsh lighting causes digital eye strain. 65% of WFH workers report it — and it's almost entirely preventable.",
                  },
                  {
                    icon: <Thermometer className="w-5 h-5 text-red-400 shrink-0 mt-0.5" />,
                    title: "Office overheating",
                    body: "West-facing windows turn your office into a sauna every afternoon. You run AC on max, your focus craters, and your energy bill climbs.",
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

      {/* ─── 4. THE SOLUTION ──────────────────────────────────── */}
      <section className="section-padding bg-cream-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">
              The Fix
            </p>
            <h2 className="heading-section font-serif text-dark">
              The Right Shades Change Everything
            </h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">
              Properly fitted, high-quality shades transform your office from a battle zone into a
              high-performance workspace.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
            {[
              {
                icon: <Sun className="w-7 h-7 text-gold" />,
                heading: "Diffused, Even Light",
                body: "Transforms harsh directional sun into soft, ambient light across the entire room. No more hot spots.",
              },
              {
                icon: <Monitor className="w-7 h-7 text-gold" />,
                heading: "Glare-Free Screen",
                body: "Work on any monitor without squinting. No more repositioning your desk. Your eyes thank you by 3pm.",
              },
              {
                icon: <Video className="w-7 h-7 text-gold" />,
                heading: "Professional Video Calls",
                body: "Soft, even lighting. Clean background. No more \"sorry, let me close my blinds\" mid-meeting.",
              },
              {
                icon: <Thermometer className="w-7 h-7 text-gold" />,
                heading: "Cooler, More Comfortable",
                body: "Reduce solar heat gain by up to 50%. Lower energy bills. A room you can actually focus in.",
              },
            ].map((card) => (
              <div
                key={card.heading}
                className="bg-white rounded-lg p-6 flex flex-col gap-4 shadow-sm border border-cream-dark"
              >
                <div className="w-12 h-12 rounded-full bg-dark flex items-center justify-center shrink-0">
                  {card.icon}
                </div>
                <h3 className="font-serif text-base font-bold text-dark leading-snug">
                  {card.heading}
                </h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. RECOMMENDED SETUPS ────────────────────────────── */}
      <section className="section-padding bg-dark-muted">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">
              Choose Your Setup
            </p>
            <h2 className="heading-section font-serif text-white">
              Which Office Shade Is Right for You?
            </h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">
              Not all home offices are the same. Here are the three setups WFH professionals swear
              by.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                badge: "Recommended",
                badgeColor: "bg-gold text-dark",
                image: "https://www.theshutterstore.com/Images/2024/February/james-mcdonald-3d4sSUChunA-unsplash.jpg",
                imageAlt: "Home office with light filtering shades and soft diffused light",
                eyebrow: "Light Filtering",
                heading: "The Ideal WFH Shade",
                body: "Soft, diffused light all day. No screen glare but your office stays bright and energized. Recommended for east, west, and south-facing windows.",
                cta: "Build Light Filtering Shades",
              },
              {
                badge: "Screen-Intensive Work",
                badgeColor: "bg-white/20 text-white",
                image: "https://worldwideshades.com/cdn/shop/files/ultrarealistic-home-office-black-blackout-roller-shade.png?v=1754082156",
                imageAlt: "Home office with blackout shades for presentations",
                eyebrow: "Blackout",
                heading: "For Presentations & Focus",
                body: "Complete darkness for video editing, screen-intensive work, and client presentations. Some WFH workers prefer total light control at all times.",
                cta: "Build Blackout Shades",
              },
              {
                badge: "Best of Both",
                badgeColor: "bg-white/20 text-white",
                image: "https://worldwideshades.com/cdn/shop/files/blackout-roller-shade-office-smart-control.png?v=1754080327",
                imageAlt: "Motorized smart office shades dual setup",
                eyebrow: "Dual Setup",
                heading: "Best of Both",
                body: "Light filtering for daily work. Add motorized blackout for client presentations. Switch with a voice command. The setup serious WFH professionals choose.",
                cta: "Design Your Dual Setup",
              },
            ].map((room) => (
              <div
                key={room.eyebrow}
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
                    {room.eyebrow}
                  </p>
                  <h3 className="font-serif text-lg font-bold text-white leading-snug">
                    {room.heading}
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

      {/* ─── 6. AI BUILDER ────────────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Image */}
            <div className="rounded-lg overflow-hidden shadow-xl">
              <img
                src="https://cdn.shopify.com/s/files/1/0678/5089/5675/files/office_curtain3.png?v=1764916656"
                alt="Beautiful home office with custom shades"
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
                Preview Your Office Shades Before You Buy
              </h2>
              <p className="font-sans text-warm-gray leading-relaxed">
                Upload a photo of your office window. Our AI visualizer renders your chosen fabric
                and color in your actual room — so you know exactly how it'll look before ordering.
                No more guessing. No more returns.
              </p>

              {/* Steps */}
              <ol className="space-y-3 mt-2">
                {[
                  "Upload your office photo",
                  "Choose fabric & opacity level",
                  "See the glare-reduction preview instantly",
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

      {/* ─── 7. PRODUCTIVITY DATA SECTION ────────────────────── */}
      <section
        className="section-padding relative overflow-hidden"
        style={{
          backgroundImage:
            "url(https://img.freepik.com/premium-photo/black-fabric-luxury-cloth-texture-pattern-background_293060-5660.jpg)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-dark/90" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />
        <div className="relative z-10 container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">
              Data-Backed
            </p>
            <h2 className="heading-section font-serif text-white">The Numbers Don't Lie</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">
              This isn't interior design advice. It's performance optimization.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                stat: "+15%",
                statSub: "Productivity",
                quote:
                  "Proper lighting increases productivity by 15% and reduces errors by 28%.",
                source: "Cornell University study",
              },
              {
                stat: "65%",
                statSub: "Affected",
                quote:
                  "65% of remote workers report eye strain from improper lighting in their home workspace.",
                source: "American Optometric Association",
              },
              {
                stat: "78%",
                statSub: "Heat Reduction",
                quote:
                  "Solar shades reduce solar heat gain by up to 78%, directly lowering air conditioning costs.",
                source: "DOE estimates",
              },
            ].map((item) => (
              <div
                key={item.stat}
                className="bg-dark-soft border border-white/10 rounded-lg p-8 flex flex-col gap-4"
              >
                <div>
                  <span className="font-serif text-5xl font-bold text-gold leading-none">
                    {item.stat}
                  </span>
                  <span className="font-sans text-sm text-warm-gray ml-2 uppercase tracking-widest">
                    {item.statSub}
                  </span>
                </div>
                <p className="font-sans text-white text-sm leading-relaxed">"{item.quote}"</p>
                <p className="font-sans text-xs text-warm-gray uppercase tracking-wider">
                  — {item.source}
                </p>
              </div>
            ))}
          </div>

          {/* Callout */}
          <div className="border border-gold/30 rounded-lg p-8 text-center max-w-2xl mx-auto bg-gold/5">
            <p className="font-serif text-xl md:text-2xl text-white font-bold leading-snug">
              "The right shades aren't a luxury.{" "}
              <span className="gold-gradient-text">They're a productivity tool.</span>"
            </p>
          </div>
        </div>
      </section>

      {/* ─── 8. HOW IT WORKS ──────────────────────────────────── */}
      <section className="section-padding bg-cream-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">How It Works</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">
              From measurement to glare-free mornings — four simple steps.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-8">
            {[
              {
                icon: <Ruler className="w-6 h-6 text-gold" />,
                step: "01",
                heading: "Measure Your Window",
                body: "Use our simple 5-minute guide. Inside or outside mount. We double-check before production.",
              },
              {
                icon: <Palette className="w-6 h-6 text-gold" />,
                step: "02",
                heading: "Pick Your Fabric",
                body: "700+ fabrics including light filtering, solar, and blackout. Order free swatches or preview with the AI visualizer.",
              },
              {
                icon: <Hammer className="w-6 h-6 text-gold" />,
                step: "03",
                heading: "We Build It",
                body: "Manufactured in the USA to your exact dimensions. Quality-checked. Ships in approximately 7 days via FedEx.",
              },
              {
                icon: <CheckCircle className="w-6 h-6 text-gold" />,
                step: "04",
                heading: "Easy Install",
                body: "4 screws. 15 minutes. All hardware included. 100% Fit Guarantee — if it doesn't fit, we remake it free.",
              },
            ].map((s) => (
              <div key={s.step} className="flex flex-col gap-3">
                <div className="flex items-center gap-3 mb-1">
                  <div className="w-10 h-10 rounded-full bg-dark flex items-center justify-center shrink-0">
                    {s.icon}
                  </div>
                  <span className="font-sans font-bold text-2xl text-dark opacity-25 leading-none">
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

      {/* ─── 9. COMPARISON TABLE ──────────────────────────────── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="text-center mb-10">
            <h2 className="heading-section font-serif text-white">
              How We Compare — Honestly
            </h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">
              We're not afraid to stack us up. Here's the truth.
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
                    shade_store: true,
                    amazon: false,
                  },
                  {
                    label: "Pricing",
                    wws: "from $250",
                    shade_store: "$350–600/window",
                    amazon: "Not custom",
                  },
                  {
                    label: "Fabric Selection",
                    wws: "700+",
                    shade_store: "100–200",
                    amazon: "10–30",
                  },
                  {
                    label: "Shipping Speed",
                    wws: "~7 Days",
                    shade_store: "3–4 Weeks",
                    amazon: "2–5 Days (stock)",
                  },
                  {
                    label: "Free Samples",
                    wws: true,
                    shade_store: false,
                    amazon: false,
                  },
                  {
                    label: "Made in USA",
                    wws: true,
                    shade_store: "Sometimes",
                    amazon: false,
                  },
                  {
                    label: "Fit Guarantee",
                    wws: true,
                    shade_store: false,
                    amazon: false,
                  },
                  {
                    label: "AI Visualizer",
                    wws: true,
                    shade_store: false,
                    amazon: false,
                  },
                  {
                    label: "Motorization",
                    wws: true,
                    shade_store: true,
                    amazon: "Limited",
                  },
                ].map((row, i) => (
                  <tr
                    key={row.label}
                    className={i % 2 === 0 ? "bg-dark-muted/30" : ""}
                  >
                    <td className="py-3.5 px-4 text-warm-gray font-medium">{row.label}</td>
                    {[row.wws, row.shade_store, row.amazon].map((val, colIdx) => (
                      <td
                        key={colIdx}
                        className={`py-3.5 px-4 text-center ${colIdx === 0 ? "bg-dark-soft" : ""}`}
                      >
                        {typeof val === "boolean" ? (
                          val ? (
                            <Check className="w-4 h-4 text-gold mx-auto" />
                          ) : (
                            <X className="w-4 h-4 text-red-400 mx-auto" />
                          )
                        ) : (
                          <span
                            className={`font-sans text-sm ${colIdx === 0 ? "text-white font-semibold" : "text-warm-gray"}`}
                          >
                            {val}
                          </span>
                        )}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* ─── 10. PRICING ──────────────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">
              Factory-Direct Pricing
            </p>
            <h2 className="heading-section font-serif text-dark">
              No Showroom Markup. No Surprises.
            </h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">
              Because we manufacture directly, you pay what shades should cost — not what a
              showroom needs to pay rent.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              {
                size: "Small",
                price: "$250 – $350",
                label: "Side Windows, Small Offices",
                description: "Perfect for single-window offices. Side windows, smaller rooms.",
                features: [
                  "Up to 36\" wide",
                  "Inside or outside mount",
                  "Light filtering or blackout",
                  "All hardware included",
                ],
                popular: false,
              },
              {
                size: "Standard",
                price: "$300 – $600",
                label: "Standard Office Windows",
                description: "Our most popular size. Fits the vast majority of home office windows.",
                features: [
                  "36\" – 72\" wide",
                  "700+ fabrics available",
                  "Light filtering or blackout",
                  "Motorization available",
                ],
                popular: true,
              },
              {
                size: "Large",
                price: "$400 – $900",
                label: "Panoramic, Home Studio",
                description: "For wide windows, home studios, and panoramic views.",
                features: [
                  "72\"+ wide",
                  "Premium fabric options",
                  "Light filtering or blackout",
                  "Motorization recommended",
                ],
                popular: false,
              },
            ].map((tier) => (
              <div
                key={tier.size}
                className={`rounded-lg p-8 flex flex-col gap-4 ${tier.popular ? "bg-dark text-white shadow-xl border-2 border-gold" : "bg-white border border-cream-dark shadow-sm"}`}
              >
                {tier.popular && (
                  <span className="font-sans text-xs font-bold tracking-widest text-dark bg-gold rounded-full px-3 py-1 self-start uppercase">
                    Most Popular
                  </span>
                )}
                <div>
                  <p
                    className={`font-sans text-xs font-bold tracking-widest uppercase mb-1 ${tier.popular ? "text-gold" : "text-gold"}`}
                  >
                    {tier.size}
                  </p>
                  <p className={`font-sans text-xs mb-2 ${tier.popular ? "text-warm-gray" : "text-warm-gray"}`}>
                    {tier.label}
                  </p>
                  <span className={`font-serif text-3xl font-bold ${tier.popular ? "text-white" : "text-dark"}`}>
                    {tier.price}
                  </span>
                </div>
                <p className={`font-sans text-sm leading-relaxed ${tier.popular ? "text-warm-gray" : "text-warm-gray"}`}>
                  {tier.description}
                </p>
                <ul className="space-y-2 flex-1">
                  {tier.features.map((f) => (
                    <li key={f} className="flex items-center gap-2 font-sans text-sm">
                      <Check className={`w-4 h-4 shrink-0 ${tier.popular ? "text-gold" : "text-gold"}`} />
                      <span className={tier.popular ? "text-white" : "text-dark"}>{f}</span>
                    </li>
                  ))}
                </ul>
                <a
                  href="/builder"
                  className={`inline-block text-center font-sans font-semibold text-sm px-6 py-3 rounded-sm transition-colors duration-200 mt-2 ${tier.popular ? "bg-gold text-dark hover:bg-gold-dark" : "border border-dark text-dark hover:bg-dark hover:text-white"}`}
                >
                  Design Now
                </a>
              </div>
            ))}
          </div>

          {/* Motorization add-on */}
          <div className="bg-dark rounded-lg p-6 flex flex-col md:flex-row items-center gap-4 md:gap-8 max-w-2xl mx-auto text-center md:text-left">
            <div className="w-12 h-12 rounded-full bg-gold/10 border border-gold/30 flex items-center justify-center shrink-0">
              <Zap className="w-6 h-6 text-gold" />
            </div>
            <div className="flex-1">
              <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-1">
                Add-On
              </p>
              <p className="font-serif text-lg font-bold text-white">
                Motorization from +$250
              </p>
              <p className="font-sans text-sm text-warm-gray mt-1">
                Alexa, Google Home, Apple HomeKit. Set schedules. Voice commands. The ultimate WFH
                upgrade.
              </p>
            </div>
            <a
              href="/builder"
              className="shrink-0 inline-block border border-gold text-gold font-sans font-semibold text-sm px-6 py-3 rounded-sm hover:bg-gold hover:text-dark transition-colors duration-200"
            >
              Add Motorization
            </a>
          </div>
        </div>
      </section>

      {/* ─── 11. REVIEWS ──────────────────────────────────────── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12">
            <div className="flex justify-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-5 h-5 text-gold fill-gold" />
              ))}
            </div>
            <h2 className="heading-section font-serif text-white">
              WFH Professionals Love Their Shades
            </h2>
            <p className="font-sans text-warm-gray mt-3">
              4.9/5 from 500+ homeowners. Here's what they're saying.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Michael T.",
                location: "Denver, CO",
                review:
                  "I can finally work without squinting at my screen. The light filtering effect is perfect — soft, even light all day. And they shipped in 5 days.",
                stars: 5,
                detail: "Light Filtering · West-Facing Office",
              },
              {
                name: "Sarah K.",
                location: "Portland, OR",
                review:
                  "My video calls look so much better now. Soft, even lighting instead of blown-out windows behind me. My coworkers noticed immediately.",
                stars: 5,
                detail: "Light Filtering · South-Facing Office",
              },
              {
                name: "Ryan M.",
                location: "Austin, TX",
                review:
                  "West-facing home office was unbearable by 2pm. Light filtering shades dropped the temperature noticeably. I used to run the AC on max — now I barely need it.",
                stars: 5,
                detail: "Light Filtering · West-Facing Office",
              },
            ].map((review) => (
              <div
                key={review.name}
                className="bg-dark-soft border border-white/10 rounded-lg p-7 flex flex-col gap-4"
              >
                <div className="flex gap-0.5">
                  {[...Array(review.stars)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-gold fill-gold" />
                  ))}
                </div>
                <p className="font-sans text-white text-sm leading-relaxed flex-1">
                  "{review.review}"
                </p>
                <div>
                  <p className="font-sans font-semibold text-white text-sm">{review.name}</p>
                  <p className="font-sans text-xs text-warm-gray">{review.location}</p>
                  <p className="font-sans text-xs text-gold mt-1 uppercase tracking-wider">
                    {review.detail}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 12. FAQ ──────────────────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-narrow px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">
              Frequently Asked Questions
            </h2>
            <p className="font-sans text-warm-gray mt-3 max-w-lg mx-auto">
              Everything you need to know about home office shades.
            </p>
          </div>

          <div className="space-y-0 divide-y divide-cream-dark border border-cream-dark rounded-lg overflow-hidden">
            {[
              {
                q: "Should I get light filtering or blackout for my home office?",
                a: "Light filtering is the top recommendation for most home offices. It diffuses harsh sunlight into soft, even ambient light — eliminating screen glare while keeping your workspace bright and energized. Blackout is best for video editing, screen-intensive presentations, or total light control. Many serious WFH professionals opt for a dual setup: light filtering for daily use, motorized blackout for client calls and presentations.",
              },
              {
                q: "Will light filtering shades reduce screen glare?",
                a: "Yes. Light filtering shades transform direct, harsh sunlight into diffused ambient light. This eliminates the directional glare that causes squinting and eye strain on monitors. They don't block light entirely — they redistribute it evenly across the room so there are no harsh bright spots hitting your screen.",
              },
              {
                q: "Do these shades help with video call lighting?",
                a: "Significantly. Blown-out windows behind you create harsh backlighting that makes you look like a silhouette on video calls. Light filtering shades even out the light in your room, creating a soft, flattering look on camera. Many of our customers report that their coworkers noticed the improvement immediately.",
              },
              {
                q: "Can shades reduce my energy bill?",
                a: "Yes. Solar and light filtering shades block a significant portion of solar heat gain — up to 78% depending on the fabric openness factor. This is especially impactful for west-facing home offices. Lower heat gain means your AC runs less, which translates directly to lower energy bills.",
              },
              {
                q: "Can I automate shades to adjust throughout the day?",
                a: "Yes. Our motorized shades integrate with Alexa, Google Home, Apple HomeKit, and most smart home platforms. You can program them to lower automatically when the morning sun hits your east-facing window, or raise them for natural light during your afternoon slump.",
              },
              {
                q: "What colors work best for a home office?",
                a: "Neutral, warm tones — whites, linens, warm grays — are the most popular for home offices. For video calls, lighter shades behind you create a cleaner, more professional look. Use our AI visualizer to preview colors in your actual space before ordering.",
              },
              {
                q: "Can I get free fabric samples?",
                a: "Absolutely. We offer free fabric swatches so you can see and feel the material before committing. Order up to 10 swatches for free — just pay shipping. Seeing a sample in your actual office lighting is the best way to choose the right fabric.",
              },
              {
                q: "How do I measure my office window?",
                a: "Our measurement guide walks you through it step by step in about 5 minutes. You'll need a metal tape measure and take three measurements (top, middle, bottom for width; left, center, right for height). We offer a 100% Fit Guarantee — if your shades don't fit per our guide, we remake them at no charge.",
              },
            ].map((faq, i) => (
              <details key={i} className="group bg-white">
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none font-sans font-semibold text-dark text-sm hover:bg-cream transition-colors duration-150">
                  {faq.q}
                  <ChevronDown className="w-4 h-4 text-gold shrink-0 transition-transform duration-200 group-open:rotate-180" />
                </summary>
                <div className="px-6 pb-5">
                  <p className="font-sans text-sm text-warm-gray leading-relaxed">{faq.a}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 13. FINAL CTA ────────────────────────────────────── */}
      <section
        className="relative section-padding flex flex-col items-center text-center text-white overflow-hidden"
        style={{
          backgroundImage:
            "url(https://www.windowmakeoverinc.com/wp-content/uploads/2025/01/home-office-600x350.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-dark/82" />
        {/* Warm tint */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: "linear-gradient(to bottom, rgba(200,161,101,0.05) 0%, rgba(12,12,12,0.0) 100%)" }}
        />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />

        <div className="relative z-10 container-narrow px-4 flex flex-col items-center gap-6">
          <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase">
            Ready to Work Better?
          </p>
          <h2 className="heading-section font-serif text-white max-w-2xl leading-tight">
            Work Smarter.{" "}
            <span className="gold-gradient-text">Not Squintier.</span>
          </h2>
          <p className="font-sans text-warm-gray text-lg max-w-xl leading-relaxed">
            Custom home office shades, built to your exact windows. Glare-free screens. Better
            video calls. Cooler afternoons. Ships in 7 days.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <a
              href="/builder"
              className="inline-block bg-gold text-dark font-sans font-semibold text-base px-10 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200"
            >
              Design Your Office Shades
            </a>
            <a
              href="/swatches"
              className="inline-block border border-white/50 text-white font-sans font-semibold text-base px-10 py-4 rounded-sm hover:bg-white/10 transition-colors duration-200"
            >
              Order Free Swatches
            </a>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-6 mt-4 text-sm font-sans text-warm-gray">
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-gold fill-gold" />
              4.9/5 · 500+ Reviews
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

          {/* Phone */}
          <a
            href="tel:+18446742716"
            className="flex items-center gap-2 font-sans text-sm text-warm-gray hover:text-gold transition-colors duration-200 mt-2"
          >
            <Phone className="w-4 h-4" />
            Questions? Call (844) 674-2716
          </a>
        </div>
      </section>
    </>
  )
}
