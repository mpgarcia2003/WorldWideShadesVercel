"use client"

import { useState } from "react"
import { Star } from "lucide-react"

// Branded Google review short link for World Wide Shades LLC.
// Redirects to the same listing as placeid=ChIJH4GIVT6LwokR_xVzBIpqkd8.
const GOOGLE_REVIEW_URL = "https://g.page/r/Cf8VcwSKapHfEAI/review"

export default function OrderReviewPrompt() {
  const [selected, setSelected] = useState(0)
  const [hovered, setHovered] = useState(0)
  const [tapped, setTapped] = useState(false)

  // Open Google INSIDE the click handler so it stays a user-initiated action —
  // this keeps the new tab from being caught by popup blockers.
  const handleRate = (value: number) => {
    setSelected(value)
    setTapped(true)
    window.open(GOOGLE_REVIEW_URL, "_blank", "noopener,noreferrer")
  }

  const active = hovered || selected

  return (
    <section className="section-padding bg-cream">
      <div className="container-narrow px-4">
        <div className="bg-white rounded-lg shadow-md border border-cream-dark px-6 py-10 md:px-10 md:py-12 text-center">
          <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-2">
            30 seconds
          </p>
          <h2 className="heading-section font-serif text-dark">
            How easy was it to place your order?
          </h2>
          <p className="font-sans text-warm-gray mt-3 max-w-md mx-auto leading-relaxed">
            Tap a star to share your experience on Google — it helps other
            homeowners find us.
          </p>

          {/* ─── Star rating (every star routes to Google) ─── */}
          <div
            className="flex items-center justify-center gap-2 mt-7"
            role="radiogroup"
            aria-label="Rate how easy it was to place your order"
          >
            {[1, 2, 3, 4, 5].map((value) => {
              const filled = value <= active
              return (
                <button
                  key={value}
                  type="button"
                  role="radio"
                  aria-checked={value === selected}
                  aria-label={`${value} star${value > 1 ? "s" : ""}`}
                  onMouseEnter={() => setHovered(value)}
                  onMouseLeave={() => setHovered(0)}
                  onFocus={() => setHovered(value)}
                  onBlur={() => setHovered(0)}
                  onClick={() => handleRate(value)}
                  className="p-1 rounded-sm transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                >
                  <Star
                    className={`w-9 h-9 md:w-10 md:h-10 transition-colors ${
                      filled ? "text-gold" : "text-warm-gray/40"
                    }`}
                    fill={filled ? "#c8a165" : "none"}
                    strokeWidth={1.5}
                  />
                </button>
              )
            })}
          </div>

          {/* ─── Acknowledgment + fallback link after a tap ─── */}
          {tapped ? (
            <div className="mt-7">
              <p className="font-sans text-dark font-semibold">
                Thank you! Your Google review opened in a new tab.
              </p>
              <a
                href={GOOGLE_REVIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block mt-2 font-sans text-sm font-semibold text-gold hover:underline"
              >
                Didn&apos;t open? Leave your review here →
              </a>
            </div>
          ) : (
            <a
              href={GOOGLE_REVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => setTapped(true)}
              className="inline-flex items-center gap-2 mt-8 bg-gold text-dark font-sans font-bold px-7 py-3.5 rounded-sm hover:opacity-90 transition-opacity"
            >
              Leave a Google Review
            </a>
          )}
        </div>
      </div>
    </section>
  )
}
