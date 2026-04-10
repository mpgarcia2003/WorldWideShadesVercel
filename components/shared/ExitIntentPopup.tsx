"use client";

import { useState, useEffect, useCallback } from "react";
import { X } from "lucide-react";

interface ExitIntentPopupProps {
  /** Which page this is on (for tracking) */
  page: "builder" | "checkout" | "cart" | "landing";
}

const POPUP_KEY = "wws_exit_popup_shown";
const LEAD_KEY = "wws_lead_captured";

export function ExitIntentPopup({ page }: ExitIntentPopupProps) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Don't render on builder page — builder has its own exit intent
  const [isBuilder, setIsBuilder] = useState(false);
  useEffect(() => {
    if (typeof window !== "undefined" && window.location.pathname.startsWith("/builder")) {
      setIsBuilder(true);
    }
  }, []);

  const triggerPopup = useCallback(() => {
    // Don't show if already shown this session or lead already captured
    if (typeof window === "undefined") return;
    if (sessionStorage.getItem(POPUP_KEY)) return;
    if (localStorage.getItem(LEAD_KEY)) return;
    sessionStorage.setItem(POPUP_KEY, "1");
    setShow(true);
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    // Don't show on builder page or if lead already captured
    if (isBuilder) return;
    if (localStorage.getItem(LEAD_KEY)) return;
    if (sessionStorage.getItem(POPUP_KEY)) return;

    // Desktop: mouse leaves viewport (exit intent)
    const handleMouseLeave = (e: MouseEvent) => {
      if (e.clientY <= 0) triggerPopup();
    };

    // Mobile: show after 45 seconds of inactivity
    let mobileTimer: ReturnType<typeof setTimeout>;
    const isMobile = window.innerWidth < 768;

    if (isMobile) {
      mobileTimer = setTimeout(triggerPopup, 45000);
    } else {
      document.addEventListener("mouseout", handleMouseLeave);
    }

    return () => {
      document.removeEventListener("mouseout", handleMouseLeave);
      clearTimeout(mobileTimer);
    };
  }, [triggerPopup]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);

    // Get cart data from localStorage
    let cartData = null;
    let total = 0;
    let itemCount = 0;
    try {
      const raw = localStorage.getItem("wws_cart_v1");
      if (raw) {
        const cart = JSON.parse(raw);
        cartData = cart;
        itemCount = cart.length;
        total = cart.reduce((s: number, i: any) => s + (i.totalPrice || 0), 0);
      }
    } catch {}

    try {
      await fetch("/api/abandoned-carts", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: email.trim(),
          name: name.trim() || null,
          cart_data: cartData,
          page,
          source: "exit_intent",
          total,
          item_count: itemCount,
        }),
      });
      localStorage.setItem(LEAD_KEY, email.trim());
      setSubmitted(true);
    } catch (err) {
      console.error("Failed to save abandoned cart:", err);
    }
    setLoading(false);
  }

  if (!show) return null;

  return (
    <div className="fixed inset-0 z-[2000] flex items-center justify-center p-4" onClick={() => setShow(false)}>
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div
        className="relative w-full max-w-md bg-white rounded-2xl shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
        style={{ animation: "popIn 0.3s ease-out" }}
      >
        <style>{`
          @keyframes popIn {
            from { opacity: 0; transform: scale(0.9) translateY(20px); }
            to { opacity: 1; transform: scale(1) translateY(0); }
          }
        `}</style>

        {/* Close button */}
        <button
          onClick={() => setShow(false)}
          className="absolute top-4 right-4 p-1.5 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors z-10"
          aria-label="Close"
        >
          <X className="w-4 h-4 text-gray-500" />
        </button>

        {submitted ? (
          /* Success state */
          <div className="p-8 text-center">
            <div className="text-4xl mb-4">✓</div>
            <h3 className="text-xl font-bold text-dark mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              You're All Set!
            </h3>
            <p className="text-warm-gray text-sm mb-4">
              We've saved your configuration. Check your email for a link to pick up where you left off.
            </p>
            <button
              onClick={() => setShow(false)}
              className="px-6 py-2.5 bg-gold text-white rounded-lg font-semibold text-sm hover:bg-gold-dark transition-colors"
            >
              Continue Browsing
            </button>
          </div>
        ) : (
          <>
            {/* Gold header bar */}
            <div className="px-8 py-5 text-center" style={{ background: "linear-gradient(135deg, #c8a165 0%, #b8895a 100%)" }}>
              <p className="text-white/90 text-xs font-semibold uppercase tracking-widest mb-1">Before you go</p>
              <h3 className="text-white text-xl font-bold" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
                Don't Lose Your Design
              </h3>
            </div>

            {/* Content */}
            <div className="p-8">
              <p className="text-warm-gray text-sm text-center mb-6 leading-relaxed">
                Enter your email and we'll save your shade configuration. 
                We'll also send you an <strong className="text-dark">exclusive 10% off code</strong> to use when you're ready.
              </p>

              <form onSubmit={handleSubmit} className="space-y-3">
                <input
                  type="text"
                  placeholder="First name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border border-cream-dark rounded-lg text-sm text-dark bg-white focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                  style={{ fontSize: "16px" }}
                />
                <input
                  type="email"
                  placeholder="Your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full px-4 py-3 border border-cream-dark rounded-lg text-sm text-dark bg-white focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                  style={{ fontSize: "16px" }}
                />
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-3.5 rounded-lg text-white font-bold text-sm transition-all"
                  style={{
                    background: "linear-gradient(135deg, #c8a165 0%, #b8895a 100%)",
                    opacity: loading ? 0.7 : 1,
                    cursor: loading ? "not-allowed" : "pointer",
                  }}
                >
                  {loading ? "Saving..." : "Save My Design + Get 10% Off"}
                </button>
              </form>

              <p className="text-center text-xs text-gray-400 mt-4">
                No spam. Just your saved shade config and a discount code.
              </p>

              {/* Trust signals */}
              <div className="flex items-center justify-center gap-4 mt-5 pt-5 border-t border-cream-dark text-xs text-warm-gray">
                <span>✓ Free Shipping</span>
                <span>✓ 700+ Fabrics</span>
                <span>✓ Made in USA</span>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
