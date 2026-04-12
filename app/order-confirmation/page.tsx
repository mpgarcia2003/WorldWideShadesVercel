"use client"

import { useState, useEffect } from "react"
import { trackPurchase } from "@/lib/gtm/events"
import {
  CheckCircle,
  Factory,
  Package,
  Home,
  Play,
  Download,
  Palette,
  Phone,
  Mail,
  MessageCircle,
  ChevronDown,
  ChevronUp,
  Share2,
  Copy,
  Check,
  Truck,
  MapPin,
} from "lucide-react"

// ─── ORDER DATA (loaded from localStorage) ────────────────────────────────────
const defaultOrder = {
  number: "WWS-00000000-0000",
  email: "",
  date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
  estimatedDelivery: "",
  items: [] as any[],
  subtotal: 0,
  motorized: 0,
  valance: 0,
  shipping: 0,
  tax: 0,
  total: 0,
  discount: 0,
  retailSavings: 0,
}

function loadOrder() {
  if (typeof window === 'undefined') return defaultOrder;
  try {
    const raw = localStorage.getItem('wws_last_order');
    if (!raw) return defaultOrder;
    const data = JSON.parse(raw);
    const deliveryStart = new Date();
    deliveryStart.setDate(deliveryStart.getDate() + 7);
    const deliveryEnd = new Date(deliveryStart);
    deliveryEnd.setDate(deliveryEnd.getDate() + 4);
    const opts: Intl.DateTimeFormatOptions = { month: 'long', day: 'numeric' };
    return {
      number: data.order_number || defaultOrder.number,
      email: data.email || defaultOrder.email,
      date: data.date || defaultOrder.date,
      estimatedDelivery: `${deliveryStart.toLocaleDateString('en-US', opts)}–${deliveryEnd.toLocaleDateString('en-US', opts)}, ${deliveryEnd.getFullYear()}`,
      items: data.items || [],
      subtotal: data.subtotal || 0,
      motorized: 0,
      valance: 0,
      shipping: data.shipping || 0,
      tax: data.tax || 0,
      total: data.total || 0,
      discount: data.discount || 0,
      retailSavings: 0,
    };
  } catch { return defaultOrder; }
}

// ─── CONFETTI PIECES (generated once) ─────────────────────────────────────────
const CONFETTI_COUNT = 40
const confettiColors = ["#c8a165", "#0c0c0c", "#f5f0e8", "#ffffff"]
const confettiPieces = Array.from({ length: CONFETTI_COUNT }).map((_, i) => ({
  id: i,
  color: confettiColors[i % confettiColors.length],
  size: 6 + ((i * 3) % 7),
  left: (i * 2.5) % 100,
  duration: 2 + ((i * 0.05) % 2),
  delay: (i * 0.038) % 1.5,
  isCircle: i % 2 === 0,
  rotation: (i * 17) % 360,
}))

// ─── TIMELINE STEPS ────────────────────────────────────────────────────────────
const timelineSteps = [
  {
    number: 1,
    icon: CheckCircle,
    status: "COMPLETED" as const,
    title: "Order Received",
    description: "Order confirmed and payment processed.",
    timeframe: `Today, ${new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`,
  },
  {
    number: 2,
    icon: Factory,
    status: "IN_PROGRESS" as const,
    title: "Production Started",
    description: "Your shade is being precision-cut and assembled in our USA facility.",
    timeframe: `By ${new Date(Date.now() + 86400000).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`,
  },
  {
    number: 3,
    icon: Package,
    status: "UPCOMING" as const,
    title: "Quality Check & Ship",
    description: "Final inspection, packaging, and FedEx pickup.",
    timeframe: `${new Date(Date.now() + 2*86400000).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}–${new Date(Date.now() + 3*86400000).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`,
  },
  {
    number: 4,
    icon: Home,
    status: "UPCOMING" as const,
    title: "Delivered",
    description: "Arrives at your door. 15-minute install. Hardware included.",
    timeframe: `${new Date(Date.now() + 6*86400000).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}–${new Date(Date.now() + 10*86400000).toLocaleDateString('en-US', { month: 'long', day: 'numeric' })}`,
  },
]

// ─── ROOM CARDS ────────────────────────────────────────────────────────────────
const roomCards = [
  {
    room: "Living Room",
    product: "Light filtering shades",
    price: "From $300",
    cta: "Design Living Room Shades →",
    href: "/rooms/living-room",
    image:
      "https://images.unsplash.com/photo-1613545325268-9265e1609167?auto=format&fit=crop&w=600&q=80",
  },
  {
    room: "Nursery",
    product: "Blackout + cordless",
    price: "From $250",
    cta: "Design Nursery Shades →",
    href: "/rooms/nursery",
    image:
      "https://cdn.shopify.com/s/files/1/0283/0227/8795/files/ivory-milan-with-glider-plus-6.jpg?v=1727290979",
  },
  {
    room: "Home Office",
    product: "Light filtering",
    price: "From $250",
    cta: "Design Office Shades →",
    href: "/rooms/home-office",
    image:
      "https://images.unsplash.com/photo-1774311237295-a65a4c1ff38a?auto=format&fit=crop&w=600&q=80",
  },
]

// ─── FOOTER COLUMNS ────────────────────────────────────────────────────────────
const footerColumns = [
  {
    heading: "Products",
    links: [
      { label: "Blackout Roller Shades", href: "/blackout-roller-shades" },
      { label: "Light Filtering Shades", href: "/light-filtering-shades" },
      { label: "Motorized Shades", href: "/motorized-shades" },
      { label: "Custom Valances", href: "/specialty-shapes" },
      { label: "Free Swatches", href: "/swatches" },
    ],
  },
  {
    heading: "Design Tools",
    links: [
      { label: "Shade Builder", href: "/builder" },
      { label: "AI Room Visualizer", href: "/visualizer" },
      { label: "Measurement Guide", href: "/measuring-guide" },
      { label: "Installation Guide", href: "/installation-guide" },
    ],
  },
  {
    heading: "Company",
    links: [
      { label: "About Us", href: "/about" },
      { label: "Made in USA", href: "/about" },
      { label: "Reviews", href: "/reviews" },
      { label: "Blog", href: "/blog" },
      { label: "Careers", href: "/careers" },
    ],
  },
  {
    heading: "Support",
    links: [
      { label: "Contact Us", href: "/contact" },
      { label: "FAQ", href: "/faq" },
      { label: "Returns & Fit Guarantee", href: "/faq" },
      { label: "Order Status", href: "/track-order" },
      { label: "Privacy Policy", href: "/privacy" },
    ],
  },
]

// ─── MAIN COMPONENT ────────────────────────────────────────────────────────────
export default function ThankYouPage() {
  const [order, setOrder] = useState(defaultOrder)
  const [showConfetti, setShowConfetti] = useState(true)
  const [orderExpanded, setOrderExpanded] = useState(false)
  const [copied, setCopied] = useState(false)
  const [timeLeft, setTimeLeft] = useState({ hours: 23, minutes: 42, seconds: 18 })

  // Load real order data from localStorage + backup purchase tracking
  useEffect(() => {
    const loaded = loadOrder();
    setOrder(loaded);

    // Backup purchase event — fires ONLY if checkout didn't already track it
    // Covers: 3DS redirects, slow network, ad blocker killed GTM mid-fire
    if (loaded.total > 0 && loaded.number !== defaultOrder.number) {
      const alreadyTracked = sessionStorage.getItem('wws_purchase_tracked');
      if (!alreadyTracked) {
        const stripePI = (typeof window !== 'undefined' && localStorage.getItem('wws_last_order'))
          ? JSON.parse(localStorage.getItem('wws_last_order')!).stripe_payment_intent_id || loaded.number
          : loaded.number;
        trackPurchase(
          stripePI,
          loaded.total,
          loaded.items.map((i: any) => ({
            item_id: i.fabric || 'shade',
            item_name: i.name || 'Custom Roller Shade',
            item_category: i.name || 'Roller Shade',
            price: i.price || 0,
            quantity: i.qty || 1,
          })),
          { tax: loaded.tax, shipping: loaded.shipping, discount: loaded.discount }
        );
        sessionStorage.setItem('wws_purchase_tracked', 'true');
      }
    }
  }, []);

  // Hide confetti after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => setShowConfetti(false), 5000)
    return () => clearTimeout(timer)
  }, [])

  // Countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 }
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 }
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 }
        }
        return prev
      })
    }, 1000)
    return () => clearInterval(interval)
  }, [])

  const handleCopy = () => {
    navigator.clipboard.writeText("https://worldwideshades.com?ref=friend")
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const pad = (n: number) => String(n).padStart(2, "0")

  return (
    <>
      {/* ─── CONFETTI KEYFRAMES ───────────────────────────────── */}
      <style>{`
        @keyframes confettiFall {
          0% {
            transform: translateY(-10px) rotate(0deg);
            opacity: 1;
          }
          80% {
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }
        @keyframes pulse-gold {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.5; }
        }
        @keyframes progress-fill {
          from { width: 0%; }
          to { width: 60%; }
        }
        .timeline-pulse {
          animation: pulse-gold 1.5s ease-in-out infinite;
        }
        .progress-animate {
          animation: progress-fill 1.2s ease-out forwards;
        }
      `}</style>

      {/* ─── CONFETTI OVERLAY ─────────────────────────────────── */}
      {showConfetti && (
        <div
          className="fixed inset-0 pointer-events-none overflow-hidden"
          style={{ zIndex: 9999 }}
          aria-hidden="true"
        >
          {confettiPieces.map((piece) => (
            <div
              key={piece.id}
              style={{
                position: "absolute",
                top: "-10px",
                left: `${piece.left}%`,
                width: `${piece.size}px`,
                height: `${piece.size}px`,
                backgroundColor: piece.color,
                borderRadius: piece.isCircle ? "50%" : "2px",
                animation: `confettiFall ${piece.duration}s ease-in ${piece.delay}s both`,
                transform: `rotate(${piece.rotation}deg)`,
              }}
            />
          ))}
        </div>
      )}


      {/* ─── SECTION 1: CELEBRATION HERO ──────────────────────── */}
      <section className="bg-dark section-padding relative overflow-hidden">
        <div className="noise-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 container-narrow px-4 flex flex-col items-center text-center gap-6">

          {/* Gold pill badge */}
          <div className="inline-flex items-center gap-2 bg-gold/20 border border-gold/40 rounded-full px-5 py-2 text-xs font-sans font-bold tracking-widest text-gold uppercase">
            <CheckCircle className="w-3.5 h-3.5" />
            Order Confirmed
          </div>

          {/* H1 */}
          <h1 className="heading-display font-serif text-white leading-tight">
            Your Shades Are{" "}
            <span className="gold-gradient-text">Being Made.</span>
          </h1>

          {/* Order meta */}
          <p className="font-sans text-warm-gray text-base">
            Order #{order.number} · {order.date}
          </p>

          {/* Confirmation note */}
          <p className="font-sans text-warm-gray text-base max-w-lg leading-relaxed">
            A confirmation email is on its way to{" "}
            <span className="text-white font-semibold">{order.email}</span>. Your shades enter
            production within 1 business day.
          </p>

          {/* KPI chips */}
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-sm px-5 py-3 font-sans text-sm text-white">
              <Truck className="w-4 h-4 text-gold" />
              <span>
                <span className="text-warm-gray">Estimated Delivery: </span>
                <span className="font-semibold">April 14–18</span>
              </span>
            </div>
            <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-sm px-5 py-3 font-sans text-sm text-white">
              <MapPin className="w-4 h-4 text-gold" />
              <span>
                <span className="text-warm-gray">Factory: </span>
                <span className="font-semibold">Brooklyn, NY</span>
              </span>
            </div>
          </div>

          {/* Countdown urgency */}
          <div className="mt-2 bg-white/5 border border-gold/30 rounded-sm px-6 py-4 flex flex-col items-center gap-1">
            <p className="font-sans text-xs font-bold uppercase tracking-widest text-warm-gray">
              Production starts in
            </p>
            <p className="font-serif text-3xl font-bold text-gold tabular-nums">
              {pad(timeLeft.hours)}:{pad(timeLeft.minutes)}:{pad(timeLeft.seconds)}
            </p>
            <p className="font-sans text-xs text-warm-gray/70">
              Changes must be requested within 1 hour
            </p>
          </div>
        </div>
      </section>

      {/* ─── SECTION 2: PRODUCTION TIMELINE ───────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-14">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-2">
              Live Status
            </p>
            <h2 className="heading-section font-serif text-dark">Your Shade's Journey</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-md mx-auto">
              We keep you informed every step of the way, from production floor to your front door.
            </p>
          </div>

          {/* Desktop: horizontal timeline */}
          <div className="hidden md:block">
            {/* Progress track */}
            <div className="relative flex items-start justify-between gap-0 mb-0">
              {/* Connecting lines between steps */}
              <div className="absolute top-8 left-[12.5%] right-[12.5%] h-0.5 bg-cream-dark" aria-hidden="true">
                {/* Completed segment: step 1→2 */}
                <div
                  className="absolute left-0 h-full bg-gold"
                  style={{ width: "33.33%" }}
                />
                {/* In-progress segment: step 2→3 */}
                <div
                  className="absolute h-full bg-gold progress-animate overflow-hidden"
                  style={{ left: "33.33%", width: "33.33%" }}
                >
                  <div
                    className="absolute inset-0 bg-gold/50"
                    style={{
                      background:
                        "repeating-linear-gradient(90deg, #c8a165 0px, #c8a165 8px, transparent 8px, transparent 16px)",
                      animation: "progress-fill 1.2s ease-out forwards",
                    }}
                  />
                </div>
              </div>

              {timelineSteps.map((step) => {
                const Icon = step.icon
                const isCompleted = step.status === "COMPLETED"
                const isInProgress = step.status === "IN_PROGRESS"
                const isUpcoming = step.status === "UPCOMING"

                return (
                  <div key={step.number} className="flex flex-col items-center flex-1 relative">
                    {/* Circle */}
                    <div
                      className={`
                        relative z-10 w-16 h-16 rounded-full flex items-center justify-center mb-4 border-2 transition-all
                        ${isCompleted ? "bg-gold border-gold" : ""}
                        ${isInProgress ? "bg-gold border-gold timeline-pulse" : ""}
                        ${isUpcoming ? "bg-cream-dark border-cream-dark" : ""}
                      `}
                    >
                      <Icon
                        className={`w-6 h-6 ${
                          isCompleted || isInProgress ? "text-dark" : "text-warm-gray"
                        }`}
                      />
                    </div>

                    {/* Status badge */}
                    <span
                      className={`font-sans text-xs font-bold tracking-widest uppercase mb-2 ${
                        isCompleted
                          ? "text-gold"
                          : isInProgress
                          ? "text-gold"
                          : "text-warm-gray/60"
                      }`}
                    >
                      {isCompleted ? "✓ Completed" : isInProgress ? "⚡ In Progress" : "Upcoming"}
                    </span>

                    {/* Title */}
                    <p
                      className={`font-serif font-bold text-base mb-1 text-center ${
                        isUpcoming ? "text-warm-gray" : "text-dark"
                      }`}
                    >
                      {step.title}
                    </p>

                    {/* Description */}
                    <p className="font-sans text-xs text-warm-gray text-center leading-relaxed max-w-[160px]">
                      {step.description}
                    </p>

                    {/* Timeframe */}
                    <p
                      className={`font-sans text-xs font-semibold mt-2 ${
                        isCompleted || isInProgress ? "text-gold" : "text-warm-gray/60"
                      }`}
                    >
                      {step.timeframe}
                    </p>
                  </div>
                )
              })}
            </div>
          </div>

          {/* Mobile: vertical timeline */}
          <div className="md:hidden space-y-0">
            {timelineSteps.map((step, idx) => {
              const Icon = step.icon
              const isCompleted = step.status === "COMPLETED"
              const isInProgress = step.status === "IN_PROGRESS"
              const isUpcoming = step.status === "UPCOMING"
              const isLast = idx === timelineSteps.length - 1

              return (
                <div key={step.number} className="flex gap-4">
                  {/* Left: circle + line */}
                  <div className="flex flex-col items-center">
                    <div
                      className={`
                        w-12 h-12 rounded-full flex items-center justify-center shrink-0 border-2
                        ${isCompleted ? "bg-gold border-gold" : ""}
                        ${isInProgress ? "bg-gold border-gold timeline-pulse" : ""}
                        ${isUpcoming ? "bg-cream-dark border-cream-dark" : ""}
                      `}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          isCompleted || isInProgress ? "text-dark" : "text-warm-gray"
                        }`}
                      />
                    </div>
                    {!isLast && (
                      <div
                        className="w-0.5 flex-1 mt-1 mb-1 min-h-[40px]"
                        style={{
                          backgroundColor:
                            isCompleted ? "#c8a165" : isInProgress ? "#c8a165" : "#e8e0d0",
                        }}
                      />
                    )}
                  </div>

                  {/* Right: content */}
                  <div className={`pb-8 ${isLast ? "pb-0" : ""}`}>
                    <span
                      className={`font-sans text-xs font-bold tracking-widest uppercase ${
                        isCompleted
                          ? "text-gold"
                          : isInProgress
                          ? "text-gold"
                          : "text-warm-gray/60"
                      }`}
                    >
                      {isCompleted ? "✓ Completed" : isInProgress ? "⚡ In Progress" : "Upcoming"}
                    </span>
                    <p
                      className={`font-serif font-bold text-base mt-0.5 ${
                        isUpcoming ? "text-warm-gray" : "text-dark"
                      }`}
                    >
                      {step.title}
                    </p>
                    <p className="font-sans text-sm text-warm-gray mt-1 leading-relaxed">
                      {step.description}
                    </p>
                    <p
                      className={`font-sans text-xs font-semibold mt-1 ${
                        isCompleted || isInProgress ? "text-gold" : "text-warm-gray/60"
                      }`}
                    >
                      {step.timeframe}
                    </p>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* ─── SECTION 3: ORDER DETAILS ─────────────────────────── */}
      <section className="section-padding bg-cream-dark">
        <div className="container-narrow px-4">
          <h2 className="heading-section font-serif text-dark text-center mb-8">Order Summary</h2>

          <div className="bg-white rounded-lg shadow-md border border-cream-dark overflow-hidden">
            {/* Mobile toggle header */}
            <button
              className="md:hidden w-full flex items-center justify-between px-6 py-4 border-b border-cream-dark"
              onClick={() => setOrderExpanded(!orderExpanded)}
              aria-expanded={orderExpanded}
            >
              <span className="font-sans font-semibold text-dark text-sm">
                {order.number} — ${order.total.toFixed(2)}
              </span>
              {orderExpanded ? (
                <ChevronUp className="w-5 h-5 text-warm-gray" />
              ) : (
                <ChevronDown className="w-5 h-5 text-warm-gray" />
              )}
            </button>

            {/* Content: always visible on desktop, toggled on mobile */}
            <div className={`${orderExpanded ? "block" : "hidden"} md:block`}>
              {order.items.map((item, i) => (
                <div key={i} className="p-6 md:p-8 border-b border-cream-dark">
                  {/* Item header */}
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <p className="font-serif font-bold text-dark text-lg">{item.name}</p>
                      <p className="font-sans text-xs text-warm-gray uppercase tracking-wider mt-0.5">
                        {item.room} · Qty {item.qty}
                      </p>
                    </div>
                    <span className="font-serif text-xl font-bold text-dark shrink-0">
                      ${item.price.toFixed(2)}
                    </span>
                  </div>

                  {/* Configuration grid */}
                  <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                    {[
                      { label: "Fabric", value: item.fabric },
                      { label: "Dimensions", value: item.dimensions },
                      { label: "Mount", value: item.mount },
                      { label: "Control", value: item.control },
                    ].map((detail) => (
                      <div key={detail.label}>
                        <p className="font-sans text-xs font-bold uppercase tracking-wider text-warm-gray/70">
                          {detail.label}
                        </p>
                        <p className="font-sans text-sm text-dark mt-0.5">{detail.value}</p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}

              {/* Price breakdown */}
              <div className="p-6 md:p-8">
                <div className="space-y-3">
                  {order.items.map((item: any, i: number) => (
                    <div key={i} className="flex justify-between font-sans text-sm">
                      <span className="text-warm-gray">{item.name} (Qty: {item.qty})</span>
                      <span className="text-dark">${item.price.toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="flex justify-between font-sans text-sm">
                    <span className="text-warm-gray">Shipping</span>
                    <span className="text-gold font-semibold">FREE</span>
                  </div>
                  {order.discount > 0 && (
                    <div className="flex justify-between font-sans text-sm">
                      <span className="text-green-600 font-semibold">Promo Discount</span>
                      <span className="text-green-600 font-semibold">-${order.discount.toFixed(2)}</span>
                    </div>
                  )}

                  <div className="border-t border-cream-dark pt-3 flex justify-between">
                    <span className="font-sans font-bold text-dark text-base">Order Total</span>
                    <span className="font-serif text-2xl font-bold text-dark">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                </div>

                {/* Factory-direct callout */}
                <div className="mt-4 bg-gold/10 border border-gold/30 rounded-sm px-5 py-3 flex items-center gap-3">
                  <span className="text-gold text-xl">✦</span>
                  <p className="font-sans text-sm">
                    <span className="font-bold text-gold">
                      Factory-direct pricing
                    </span>{" "}
                    <span className="text-warm-gray">— custom made for you.</span>
                  </p>
                </div>

                {/* Change cutoff */}
                <div className="mt-4 bg-cream rounded-sm border border-cream-dark px-5 py-3">
                  <p className="font-sans text-sm text-dark">
                    <span className="font-semibold">Need to make a change?</span>{" "}
                    <span className="text-warm-gray">Call us within 1 hour: </span>
                    <a
                      href="tel:+18446742716"
                      className="text-gold font-semibold hover:underline"
                    >
                      (844) 674-2716
                    </a>
                  </p>
                  <p className="font-sans text-xs text-warm-gray/70 mt-0.5">
                    Changes cannot be made once production begins.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 4: INSTALLATION PREP ─────────────────────── */}
      <section className="section-padding bg-dark-soft">
        <div className="container-site px-4">
          <div className="text-center mb-10">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-2">
              You're ahead of the game
            </p>
            <h2 className="heading-section font-serif text-white">Get Ready for Install Day</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-md mx-auto">
              Everything you need so install day takes 15 minutes, not 2 hours.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-5">
            {[
              {
                icon: Play,
                title: "Watch the Install Video",
                body: "4-minute guide for inside mount installation. Hardware included with every shade.",
                cta: "Watch Video →",
                href: "/installation-guide",
              },
              {
                icon: Download,
                title: "Download Your Measurement Guide",
                body: "Keep for your records, or measure your next room before your shades even arrive.",
                cta: "Download PDF →",
                href: "/guides/WWS-Window-Measuring-Guide.pdf",
              },
              {
                icon: Palette,
                title: "Order Free Swatches for Your Next Room",
                body: "Sample fabrics for your living room, office, or nursery — before you need them.",
                cta: "Get Free Swatches →",
                href: "/swatches",
              },
            ].map((card) => {
              const Icon = card.icon
              return (
                <div
                  key={card.title}
                  className="bg-dark rounded-lg border border-white/10 p-7 flex flex-col gap-4 hover:border-gold/40 transition-colors duration-200"
                >
                  <div className="w-11 h-11 bg-gold/15 rounded-sm flex items-center justify-center">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <div>
                    <p className="font-serif font-bold text-white text-base">{card.title}</p>
                    <p className="font-sans text-sm text-warm-gray mt-2 leading-relaxed">
                      {card.body}
                    </p>
                  </div>
                  <a
                    href={card.href}
                    className="mt-auto font-sans text-sm font-semibold text-gold hover:underline"
                    {...(card.href.endsWith('.pdf') ? { target: '_blank' } : {})}
                  >
                    {card.cta}
                  </a>
                </div>
              )
            })}
          </div>

          {/* Downloadable PDF Guides */}
          <div className="mt-10">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-4 text-center">Downloadable Guides</p>
            <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: "Measuring Guide", desc: "How to measure your windows", href: "/guides/WWS-Window-Measuring-Guide.pdf" },
                { title: "Installation Guide", desc: "Step-by-step shade installation", href: "/guides/WWS-Roller-Shades-Installation-Guide_1.pdf" },
                { title: "Remote Programming", desc: "Somfy Situo RTS II remote setup", href: "/guides/WWS-Somfy_Remote_Programming_Guide.pdf" },
                { title: "Motor Programming", desc: "Complete Somfy motor reference", href: "/guides/WWS-Somfy_Motors_Programming_Guide.pdf" },
              ].map((guide) => (
                <a
                  key={guide.title}
                  href={guide.href}
                  target="_blank"
                  className="bg-dark rounded-lg border border-white/10 p-5 hover:border-gold/40 transition-colors duration-200 flex items-start gap-3"
                >
                  <Download className="w-5 h-5 text-gold shrink-0 mt-0.5" />
                  <div>
                    <p className="font-sans font-bold text-white text-sm">{guide.title}</p>
                    <p className="font-sans text-xs text-warm-gray mt-1">{guide.desc}</p>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── SECTION 5: SMART UPSELL ──────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-10">
            <h2 className="heading-section font-serif text-dark">Complete Your Home</h2>
            <p className="font-sans text-warm-gray mt-3 max-w-md mx-auto">
              Customers who order for one room come back for more. You can start now.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {roomCards.map((card) => (
              <div
                key={card.room}
                className="bg-white rounded-lg overflow-hidden border border-cream-dark shadow-sm hover:shadow-md transition-shadow duration-200 group"
              >
                {/* Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={card.image}
                    alt={`${card.room} window shades`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Content */}
                <div className="p-5">
                  <p className="font-sans text-xs font-bold uppercase tracking-widest text-warm-gray/70 mb-1">
                    {card.product}
                  </p>
                  <p className="font-serif font-bold text-dark text-lg">{card.room}</p>
                  <p className="font-serif text-gold text-xl font-bold mt-1">{card.price}</p>
                  <a
                    href={card.href}
                    className="mt-4 inline-block w-full text-center font-sans text-sm font-semibold text-dark border border-dark rounded-sm px-4 py-2.5 hover:bg-dark hover:text-white transition-colors duration-200"
                  >
                    {card.cta}
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── SECTION 6: SHARE & REFER ─────────────────────────── */}
      <section className="section-padding bg-dark">
        <div className="noise-overlay absolute inset-0 pointer-events-none" aria-hidden="true" />
        <div className="relative z-10 container-narrow px-4 flex flex-col items-center text-center gap-8">
          <div>
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">
              Refer a Friend
            </p>
            <h2 className="heading-section font-serif text-white">
              Know someone with tricky windows?
            </h2>
            <p className="font-sans text-warm-gray mt-3 max-w-md mx-auto">
              Tell them about World Wide Shades. They'll thank you.
            </p>
          </div>

          {/* Share buttons */}
          <div className="flex flex-wrap justify-center gap-4">
            <a
              href="javascript:void(0)"
              className="inline-flex items-center gap-2 font-sans font-semibold text-sm text-white px-6 py-3 rounded-sm transition-opacity duration-200 hover:opacity-90"
              style={{ backgroundColor: "#1877F2" }}
            >
              <Share2 className="w-4 h-4" />
              Share on Facebook
            </a>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-2 font-sans font-semibold text-sm text-dark bg-gold px-6 py-3 rounded-sm hover:bg-gold/90 transition-all duration-200"
            >
              {copied ? (
                <>
                  <Check className="w-4 h-4" />
                  ✓ Copied!
                </>
              ) : (
                <>
                  <Copy className="w-4 h-4" />
                  Copy Referral Link
                </>
              )}
            </button>
          </div>

          {/* Shareable quote */}
          <blockquote className="max-w-xl border-l-4 border-gold pl-6 text-left">
            <p className="font-serif text-white text-lg italic leading-relaxed">
              &ldquo;Found a company that makes shades for triangle windows. Mind blown.&rdquo;
            </p>
            <p className="font-sans text-xs text-warm-gray mt-3 uppercase tracking-widest">
              — Share our story
            </p>
          </blockquote>
        </div>
      </section>

      {/* ─── SECTION 7: SUPPORT + FOOTER ──────────────────────── */}
      <section className="section-padding bg-dark border-t border-white/10">
        <div className="container-site px-4">
          <div className="text-center mb-10">
            <h2 className="heading-section font-serif text-white">Questions? We're here.</h2>
            <p className="font-sans text-warm-gray mt-3">
              Real humans. Mon–Fri, 9am–6pm EST.
            </p>
          </div>

          {/* Contact options */}
          <div className="grid sm:grid-cols-3 gap-5 mb-16 max-w-2xl mx-auto">
            <a
              href="tel:+18446742716"
              className="bg-dark-soft border border-white/10 rounded-lg p-6 text-center hover:border-gold/40 transition-colors duration-200 group"
            >
              <Phone className="w-7 h-7 text-gold mx-auto mb-3" />
              <p className="font-serif font-bold text-white">Call</p>
              <p className="font-sans text-sm text-gold mt-1">(844) 674-2716</p>
              <p className="font-sans text-xs text-warm-gray mt-1">Mon–Fri 9am–6pm EST</p>
            </a>
            <a
              href="mailto:Hello@WorldWideShades.com"
              className="bg-dark-soft border border-white/10 rounded-lg p-6 text-center hover:border-gold/40 transition-colors duration-200"
            >
              <Mail className="w-7 h-7 text-gold mx-auto mb-3" />
              <p className="font-serif font-bold text-white">Email</p>
              <p className="font-sans text-sm text-gold mt-1 break-all">
                Hello@WorldWideShades.com
              </p>
              <p className="font-sans text-xs text-warm-gray mt-1">Reply within 2 hours</p>
            </a>
            <a
              href="#"
              className="bg-dark-soft border border-white/10 rounded-lg p-6 text-center hover:border-gold/40 transition-colors duration-200"
            >
              <MessageCircle className="w-7 h-7 text-gold mx-auto mb-3" />
              <p className="font-serif font-bold text-white">Chat</p>
              <p className="font-sans text-sm text-gold mt-1">Start Live Chat →</p>
              <p className="font-sans text-xs text-warm-gray mt-1">Avg wait &lt; 1 min</p>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
