"use client";

import { useState, useEffect } from "react";
import { SHAPE_CONFIGS, VALANCE_OPTIONS, SIDE_CHANNEL_OPTIONS, isSaleActive, SALE_CONFIG } from "../../constants";
import type { CartItem, ShapeType } from "../../types";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

const formatDim = (val: number, frac: string) => {
  return frac && frac !== "0" ? `${val} ${frac}` : `${val}`;
};

function getDimDisplay(item: CartItem) {
  if (item.config.shape === "Standard") {
    return `${formatDim(item.config.width, item.config.widthFraction)}" × ${formatDim(item.config.height, item.config.heightFraction)}"`;
  }
  const shapeCfg = SHAPE_CONFIGS[item.config.shape as ShapeType];
  if (shapeCfg) {
    return shapeCfg.inputs
      .map((input: any) => {
        let val = 0;
        let frac = "0";
        if (input.key === "width") { val = item.config.width || 0; frac = item.config.widthFraction || "0"; }
        else if (input.key === "height") { val = item.config.height || 0; frac = item.config.heightFraction || "0"; }
        else { val = item.config.customDims?.[input.key] || 0; frac = item.config.customFracs?.[input.key] || "0"; }
        return `${input.label}: ${formatDim(val, frac)}"`;
      })
      .join(" · ");
  }
  return "—";
}

function getEstimatedDelivery() {
  const d = new Date();
  d.setDate(d.getDate() + 7);
  const end = new Date(d);
  end.setDate(end.getDate() + 4);
  const opts: Intl.DateTimeFormatOptions = { month: "short", day: "numeric" };
  return `${d.toLocaleDateString("en-US", opts)} – ${end.toLocaleDateString("en-US", opts)}, ${end.getFullYear()}`;
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function CheckoutHeader() {
  return (
    <header className="bg-white border-b border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <a href="/" className="font-serif text-xl font-bold tracking-tight text-dark" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
          World Wide Shades
        </a>
        <div className="flex items-center gap-1.5 text-sm font-medium text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0 1 10 0v4" />
          </svg>
          <span className="hidden sm:inline">Secure Checkout</span>
        </div>
        <a href="tel:8446742716" className="flex items-center gap-1.5 text-sm font-medium text-dark hover:text-gold transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.56 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
          </svg>
          <span className="hidden sm:inline">(844) 674-2716</span>
        </a>
      </div>
    </header>
  );
}

function MockPaymentElement() {
  return (
    <div style={{ border: "1px solid #e2e8f0", borderRadius: "0.5rem", backgroundColor: "#f8fafc", padding: "1rem" }}>
      <div style={{ marginBottom: "0.75rem" }}>
        <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, color: "#6b7280", marginBottom: "0.35rem" }}>Card number</label>
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", backgroundColor: "#fff", border: "1px solid #d1d5db", borderRadius: "0.375rem", padding: "0.625rem 0.75rem" }}>
          <svg xmlns="http://www.w3.org/2000/svg" width="22" height="16" viewBox="0 0 38 24" fill="none" aria-hidden="true">
            <rect width="38" height="24" rx="4" fill="#E8E8E8" />
            <rect x="1" y="7" width="36" height="5" fill="#C0C0C0" />
          </svg>
          <span style={{ color: "#9ca3af", fontSize: "0.875rem", letterSpacing: "0.15em" }}>1234 1234 1234 1234</span>
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
        <div>
          <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, color: "#6b7280", marginBottom: "0.35rem" }}>Expiration date</label>
          <div style={{ backgroundColor: "#fff", border: "1px solid #d1d5db", borderRadius: "0.375rem", padding: "0.625rem 0.75rem", color: "#9ca3af", fontSize: "0.875rem" }}>MM / YY</div>
        </div>
        <div>
          <label style={{ display: "block", fontSize: "0.75rem", fontWeight: 500, color: "#6b7280", marginBottom: "0.35rem" }}>Security code</label>
          <div style={{ backgroundColor: "#fff", border: "1px solid #d1d5db", borderRadius: "0.375rem", padding: "0.625rem 0.75rem", color: "#9ca3af", fontSize: "0.875rem" }}>CVC</div>
        </div>
      </div>
      <p style={{ marginTop: "0.75rem", fontSize: "0.7rem", color: "#9ca3af", textAlign: "center" }}>
        Powered by <span style={{ fontWeight: 600, color: "#635bff" }}>stripe</span> — live payment form coming soon
      </p>
    </div>
  );
}

function AffirmCallout({ total }: { total: number }) {
  const monthly = (total / 12).toFixed(2);
  return (
    <div style={{ border: "1px solid #e5ddd0", borderRadius: "0.5rem", padding: "0.875rem 1rem", backgroundColor: "#fdf9f5", display: "flex", alignItems: "flex-start", gap: "0.75rem" }}>
      <div style={{ flexShrink: 0, width: "52px", height: "24px", borderRadius: "4px", backgroundColor: "#060809", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ color: "#60f", fontWeight: 900, fontSize: "0.6rem", letterSpacing: "-0.01em" }}>affirm</span>
      </div>
      <div>
        <p style={{ fontSize: "0.8125rem", fontWeight: 600, color: "#0c0c0c", marginBottom: "0.1rem" }}>
          Pay over time with Affirm — as low as ${monthly}/mo
        </p>
        <p style={{ fontSize: "0.75rem", color: "#6b7280" }}>
          Select Affirm at checkout to split your purchase into easy payments.
        </p>
      </div>
    </div>
  );
}

function PricingRow({ label, value, valueStyle }: { label: string; value: string; valueStyle?: React.CSSProperties }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
      <span>{label}</span>
      <span style={valueStyle}>{value}</span>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Cart item card for order summary
// ---------------------------------------------------------------------------
function CartItemCard({ item }: { item: CartItem }) {
  const valance = VALANCE_OPTIONS.find((v: any) => v.id === item.config.valanceType);
  const hasValance = valance && valance.id !== "standard" && valance.id !== "reverse";
  const hasSideChannels = item.config.sideChannelType === "standard";
  const isMotorized = item.config.controlType === "Motorized";

  const motorAddons = [
    item.config.motorizedController && "Remote",
    item.config.motorizedHub && "Smart Hub",
    item.config.motorizedCharger && "Charger",
    item.config.sunSensor && "Sun Sensor",
  ].filter(Boolean);

  const specs: [string, string][] = [
    ["Fabric", item.config.material?.name || "—"],
    ["Dimensions", getDimDisplay(item)],
    ["Mount", item.config.mountType || "—"],
    ["Control", isMotorized ? `Motorized (${item.config.motorPower || "Rechargeable"})` : item.config.controlType || "—"],
    ["Roll", item.config.rollType || "Standard"],
  ];

  if (hasValance) specs.push(["Valance", valance?.id === "cassette" ? "Cassette Valance" : valance?.id === "fascia" ? "Fascia Valance" : valance?.id || "—"]);
  if (hasSideChannels) specs.push(["Side Channels", "Yes"]);
  if (motorAddons.length > 0) specs.push(["Motor Add-ons", motorAddons.join(", ")]);

  return (
    <div style={{ backgroundColor: "#fff", border: "1px solid #e5ddd0", borderRadius: "0.5rem", padding: "1rem", marginBottom: "0.75rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem" }}>
        <div>
          <p style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#0c0c0c", margin: "0 0 0.15rem" }}>
            Custom {item.config.shadeType || "Roller"} Shade
            {item.config.shape !== "Standard" && ` — ${item.config.shape}`}
          </p>
          <p style={{ fontSize: "0.75rem", color: "#9ca3af", margin: 0 }}>Qty: {item.config.quantity || 1}</p>
        </div>
        <p style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#0c0c0c", whiteSpace: "nowrap", marginLeft: "0.5rem" }}>
          {fmt(item.totalPrice)}
        </p>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0.25rem 0.75rem", fontSize: "0.75rem" }}>
        {specs.map(([key, val]) => (
          <div key={key} style={{ display: "contents" }}>
            <span style={{ color: "#9ca3af", fontWeight: 500 }}>{key}:</span>
            <span style={{ color: "#374151" }}>{val}</span>
          </div>
        ))}
      </div>

      <a href="/cart" style={{ display: "inline-block", marginTop: "0.75rem", fontSize: "0.75rem", color: "#c8a165", fontWeight: 600, textDecoration: "none" }}>
        ✏ Edit in Cart
      </a>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Order summary (right column)
// ---------------------------------------------------------------------------
function OrderSummary({
  cart,
  promoCode,
  setPromoCode,
  promoApplied,
  setPromoApplied,
}: {
  cart: CartItem[];
  promoCode: string;
  setPromoCode: (v: string) => void;
  promoApplied: boolean;
  setPromoApplied: (v: boolean) => void;
}) {
  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const discount = promoApplied ? 50 : 0;
  const adjustedTotal = subtotal - discount;

  return (
    <div style={{ backgroundColor: "#fdf9f5", border: "1px solid #e5ddd0", borderRadius: "0.75rem", overflow: "hidden" }}>
      <div style={{ padding: "1.25rem 1.5rem", borderBottom: "1px solid #e5ddd0" }}>
        <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.125rem", fontWeight: 700, color: "#0c0c0c", margin: 0 }}>
          Order Summary
        </h2>
      </div>

      <div style={{ padding: "1.25rem 1.5rem" }}>
        {/* Cart items */}
        {cart.length === 0 ? (
          <div style={{ textAlign: "center", padding: "2rem 1rem", color: "#9ca3af" }}>
            <p style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>🛒</p>
            <p style={{ fontWeight: 600 }}>Your cart is empty</p>
            <a href="/builder" style={{ color: "#c8a165", fontWeight: 600, textDecoration: "none", fontSize: "0.875rem" }}>Design Your Shade →</a>
          </div>
        ) : (
          cart.map((item) => <CartItemCard key={item.id} item={item} />)
        )}

        {/* Pricing breakdown */}
        {cart.length > 0 && (
          <>
            <div style={{ fontSize: "0.875rem", color: "#374151", marginTop: "0.5rem" }}>
              <PricingRow label={`Subtotal (${cart.reduce((s, i) => s + (i.config.quantity || 1), 0)} item${cart.length > 1 ? "s" : ""})`} value={fmt(subtotal)} />
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span>Shipping</span>
                <span>
                  <s style={{ color: "#9ca3af", marginRight: "0.35rem" }}>$19.99</s>
                  <span style={{ color: "#16a34a", fontWeight: 600 }}>FREE</span>
                </span>
              </div>
              {promoApplied && <PricingRow label="Promo (SHADE10)" value={`-${fmt(50)}`} valueStyle={{ color: "#16a34a", fontWeight: 600 }} />}
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e5ddd0", margin: "0.75rem 0" }} />

            {/* Promo code */}
            <div style={{ display: "flex", gap: "0.5rem", marginBottom: "0.75rem" }}>
              <input
                type="text"
                placeholder="Promo code"
                value={promoCode}
                onChange={(e) => setPromoCode(e.target.value)}
                style={{ flex: 1, padding: "0.5rem 0.75rem", border: "1px solid #e5ddd0", borderRadius: "0.375rem", fontSize: "0.8125rem", color: "#0c0c0c", backgroundColor: "#fff", outline: "none" }}
              />
              <button
                onClick={() => { if (promoCode.trim()) setPromoApplied(true); }}
                style={{ padding: "0.5rem 1rem", backgroundColor: promoApplied ? "#d1fae5" : "#0c0c0c", color: promoApplied ? "#065f46" : "#fff", border: "none", borderRadius: "0.375rem", fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
              >
                {promoApplied ? "✓ Applied" : "Apply"}
              </button>
            </div>

            <hr style={{ border: "none", borderTop: "1px solid #e5ddd0", margin: "0.75rem 0" }} />

            <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", color: "#6b7280", marginBottom: "0.5rem" }}>
              <span>Tax</span>
              <span>Calculated at checkout</span>
            </div>

            {/* Total */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginTop: "0.5rem" }}>
              <span style={{ fontWeight: 700, fontSize: "1rem", color: "#0c0c0c" }}>Total</span>
              <span style={{ fontWeight: 800, fontSize: "1.375rem", color: "#0c0c0c", fontFamily: "'Playfair Display', Georgia, serif" }}>
                {fmt(adjustedTotal)}
              </span>
            </div>

            {isSaleActive() && (
              <p style={{ textAlign: "right", fontSize: "0.75rem", color: "#c8a165", fontWeight: 600, marginTop: "0.25rem" }}>
                {SALE_CONFIG.discountPercent}% off applied at builder
              </p>
            )}
          </>
        )}

        {/* Swatches upsell */}
        <div style={{ marginTop: "1.25rem", padding: "0.75rem", backgroundColor: "#fff", border: "1px dashed #d1c4a8", borderRadius: "0.5rem", fontSize: "0.8125rem", color: "#6b7280" }}>
          <p style={{ fontWeight: 600, color: "#0c0c0c", marginBottom: "0.2rem" }}>Not 100% sure about your fabric?</p>
          <p>We&apos;ll ship swatches free. <a href="/swatches" style={{ color: "#c8a165", fontWeight: 600, textDecoration: "none" }}>Get Swatches →</a></p>
        </div>

        {/* Trust box */}
        <div style={{ marginTop: "1rem", padding: "0.875rem", backgroundColor: "#fff", border: "1px solid #e5ddd0", borderRadius: "0.5rem", fontSize: "0.75rem", color: "#374151" }}>
          <p style={{ display: "flex", alignItems: "flex-start", gap: "0.375rem", marginBottom: "0.4rem" }}>
            <span>✓</span>
            <span><strong>100% Fit Guarantee</strong> — If your shades don&apos;t fit, we remake them free.</span>
          </p>
          <p style={{ display: "flex", alignItems: "center", gap: "0.375rem", marginBottom: "0.4rem" }}>
            <span>📦</span>
            <span>Ships in ~7 business days via FedEx</span>
          </p>
          <p style={{ display: "flex", alignItems: "center", gap: "0.375rem" }}>
            <span>📞</span>
            <a href="tel:8446742716" style={{ color: "#c8a165", fontWeight: 600, textDecoration: "none" }}>(844) 674-2716</a>
          </p>
        </div>

        {/* Delivery estimate */}
        <div style={{ marginTop: "1rem", padding: "0.75rem", backgroundColor: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "0.5rem", fontSize: "0.8125rem" }}>
          <p style={{ fontWeight: 700, color: "#15803d", marginBottom: "0.2rem" }}>
            📅 Estimated delivery: {getEstimatedDelivery()}
          </p>
        </div>
      </div>
    </div>
  );
}

// ---------------------------------------------------------------------------
// Place Order section
// ---------------------------------------------------------------------------
function PlaceOrderSection({ total, isProcessing, onPlaceOrder }: { total: number; isProcessing: boolean; onPlaceOrder: () => void }) {
  return (
    <div>
      <button
        className="place-order-btn"
        onClick={onPlaceOrder}
        disabled={isProcessing}
        aria-busy={isProcessing}
        style={{
          width: "100%", padding: "1.125rem 1.5rem",
          background: isProcessing ? "linear-gradient(135deg, #d4b07c 0%, #c49a6a 100%)" : "linear-gradient(135deg, #c8a165 0%, #b8895a 100%)",
          color: "#fff", border: "none", borderRadius: "0.625rem", fontSize: "1.0625rem", fontWeight: 700,
          cursor: isProcessing ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif",
          display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem",
          letterSpacing: "0.01em", transition: "opacity 0.2s", opacity: isProcessing ? 0.75 : 1,
        }}
      >
        {isProcessing ? (<><SpinnerIcon /> Processing…</>) : (`Place Order — ${fmt(total)}`)}
      </button>

      <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.75rem", lineHeight: 1.5 }}>
        By placing this order, you agree to our{" "}
        <a href="/terms" style={{ color: "#c8a165", textDecoration: "none" }}>Terms of Service</a>{" "}and{" "}
        <a href="/privacy" style={{ color: "#c8a165", textDecoration: "none" }}>Privacy Policy</a>.
      </p>

      <div className="trust-badges">
        {[
          { icon: "lock", label: "Secure Checkout" },
          { icon: "check", label: "100% Fit Guarantee" },
          { icon: "check", label: "Free Shipping" },
        ].map((b) => (
          <span key={b.label} className="trust-badge-item">
            <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              {b.icon === "lock" ? (<><rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" /></>) : (<polyline points="20 6 9 17 4 12" />)}
            </svg>
            {b.label}
          </span>
        ))}
        <span className="trust-badge-item"><span style={{ fontSize: "0.75rem" }}>🇺🇸</span> Made in USA</span>
      </div>
    </div>
  );
}

function SpinnerIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ animation: "spin 0.8s linear infinite" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

// ---------------------------------------------------------------------------
// Main checkout page
// ---------------------------------------------------------------------------
export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false);

  // Contact
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [textUpdates, setTextUpdates] = useState(true);

  // Shipping
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [zip, setZip] = useState("");
  const [useBillingAddress, setUseBillingAddress] = useState(true);
  const [showBillingAddress, setShowBillingAddress] = useState(false);

  // UI state
  const [orderSummaryOpen, setOrderSummaryOpen] = useState(false);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("wws_cart_v1");
      if (raw) setCart(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const discount = promoApplied ? 50 : 0;
  const adjustedTotal = subtotal - discount;

  function handlePlaceOrder() {
    if (cart.length === 0) return;
    setIsProcessing(true);
    // TODO: Create Stripe PaymentIntent via /api/checkout, confirm payment, then redirect to /order-confirmation
    setTimeout(() => setIsProcessing(false), 2800);
  }

  function handleUseBillingChange(checked: boolean) {
    setUseBillingAddress(checked);
    setShowBillingAddress(!checked);
  }

  if (!loaded) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>
        <SpinnerIcon /> <span style={{ marginLeft: "0.5rem" }}>Loading…</span>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#ffffff", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        input:focus { outline: none; box-shadow: 0 0 0 3px rgba(200,161,101,0.2); border-color: #c8a165 !important; }
        .checkout-input { width:100%; padding:0.75rem 1rem; border:1px solid #e5ddd0; border-radius:0.5rem; background:#fff; color:#0c0c0c; font-size:0.9375rem; font-family:'DM Sans',sans-serif; transition:border-color 0.15s,box-shadow 0.15s; }
        .checkout-input::placeholder { color:#9ca3af; }
        .checkout-input:focus { border-color:#c8a165; box-shadow:0 0 0 3px rgba(200,161,101,0.18); }
        .checkout-label { display:block; font-size:0.8125rem; font-weight:500; color:#0c0c0c; margin-bottom:0.375rem; }
        .section-card { background:#fff; border:1px solid #f0ebe3; border-radius:0.75rem; padding:1.5rem; margin-bottom:1.25rem; }
        .section-heading { font-size:1rem; font-weight:700; color:#0c0c0c; margin-bottom:1rem; padding-bottom:0.625rem; border-bottom:1px solid #f0ebe3; font-family:'DM Sans',sans-serif; }
        .express-btn { flex:1; display:flex; align-items:center; justify-content:center; gap:0.5rem; padding:0.875rem 1rem; background:#0c0c0c; color:#fff; border:none; border-radius:0.5rem; font-size:0.9375rem; font-weight:600; cursor:pointer; font-family:'DM Sans',sans-serif; transition:background 0.15s,transform 0.1s; }
        .express-btn:hover { background:#1f1f1f; transform:translateY(-1px); }
        .place-order-btn { width:100%; padding:1.125rem 1.5rem; background:linear-gradient(135deg,#c8a165 0%,#b8895a 100%); color:#fff; border:none; border-radius:0.625rem; font-size:1.0625rem; font-weight:700; cursor:pointer; font-family:'DM Sans',sans-serif; transition:opacity 0.2s,transform 0.15s; letter-spacing:0.01em; }
        .place-order-btn:hover:not(:disabled) { opacity:0.92; transform:translateY(-1px); }
        .place-order-btn:disabled { opacity:0.65; cursor:not-allowed; transform:none; }
        .divider-text { display:flex; align-items:center; gap:0.75rem; margin:1rem 0; font-size:0.8125rem; color:#9ca3af; }
        .divider-text::before,.divider-text::after { content:''; flex:1; height:1px; background:#e5ddd0; }
        .trust-badges { display:flex; flex-wrap:wrap; align-items:center; justify-content:center; gap:0.75rem 1.25rem; font-size:0.75rem; color:#6b7280; margin-top:0.75rem; }
        .trust-badge-item { display:flex; align-items:center; gap:0.3rem; font-weight:500; }
        @media (max-width:767px) { .mobile-sticky-cta { position:fixed; bottom:0; left:0; right:0; padding:0.875rem 1rem; background:#fff; border-top:1px solid #e5ddd0; z-index:50; box-shadow:0 -4px 20px rgba(0,0,0,0.08); } }
        @media (min-width:768px) { .mobile-sticky-cta { display:none; } }
        @media (max-width:767px) { .desktop-place-order { display:none; } }
        @media (min-width:768px) { .desktop-place-order { display:block; } }
        .mobile-summary-toggle { display:flex; align-items:center; justify-content:space-between; padding:1rem; background:linear-gradient(135deg,#c8a165 0%,#b8895a 100%); color:#fff; cursor:pointer; border:none; width:100%; font-family:'DM Sans',sans-serif; font-size:0.9375rem; font-weight:600; border-radius:0.625rem; margin-bottom:1.25rem; }
        @media (min-width:768px) { .mobile-summary-toggle { display:none; } .mobile-summary-content { display:block !important; } }
      `}</style>

      <CheckoutHeader />

      <main style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1rem 6rem" }}>
        {/* Mobile order summary accordion */}
        <div className="md-hidden" style={{ marginBottom: "0.5rem" }}>
          <button className="mobile-summary-toggle" onClick={() => setOrderSummaryOpen((o) => !o)} aria-expanded={orderSummaryOpen}>
            <span>{orderSummaryOpen ? "Hide" : "Show"} Order Summary</span>
            <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
              <span style={{ fontWeight: 800 }}>{fmt(adjustedTotal)}</span>
              <span style={{ transition: "transform 0.2s", transform: orderSummaryOpen ? "rotate(180deg)" : "none" }}>▼</span>
            </div>
          </button>
          <div className="mobile-summary-content" style={{ display: orderSummaryOpen ? "block" : "none", marginBottom: "1.5rem" }}>
            <OrderSummary cart={cart} promoCode={promoCode} setPromoCode={setPromoCode} promoApplied={promoApplied} setPromoApplied={setPromoApplied} />
          </div>
        </div>

        {/* Two-column layout */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "2rem" }} className="checkout-grid">
          <style>{`
            @media (min-width:768px) { .checkout-grid { grid-template-columns: 60fr 40fr !important; } .desktop-order-summary-col { display:block !important; } }
            .desktop-order-summary-col { display:none; }
          `}</style>

          {/* LEFT COLUMN */}
          <div>
            {/* Express Checkout */}
            <div className="section-card">
              <h2 className="section-heading">Express Checkout</h2>
              <div style={{ display: "flex", gap: "0.75rem" }}>
                <button className="express-btn" aria-label="Pay with Apple Pay">
                  <svg viewBox="0 0 28 12" height="14" fill="white" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M5.37 2.2C5.05 2.57 4.54 2.86 4.03 2.82c-.06-.51.19-1.05.48-1.38C4.83.96 5.37.69 5.82.66c.06.53-.15 1.05-.45 1.54zm.44.73c-.79-.05-1.47.45-1.84.45-.38 0-.96-.42-1.59-.41C1.67 3 .93 3.5.56 4.27c-.73 1.25-.19 3.1.52 4.12.35.5.77 1.06 1.32 1.04.53-.02.73-.34 1.37-.34.64 0 .82.34 1.38.33.57-.01.93-.5 1.28-1 .4-.57.56-1.12.57-1.15-.01-.01-1.1-.43-1.11-1.7-.01-1.06.87-1.57.91-1.59-.5-.73-1.27-.81-1.54-.83zM11.18 1.3v8.4h1.31V6.7h1.81c1.65 0 2.81-1.14 2.81-2.71 0-1.57-1.13-2.7-2.76-2.7h-3.17zm1.31 1.1h1.51c1.13 0 1.77.6 1.77 1.6 0 1-.64 1.61-1.78 1.61h-1.5V2.4zm7.38 7.37c.82 0 1.57-.41 1.92-1.07h.03v1h1.2V5.7c0-1.21-.97-1.99-2.46-1.99-1.38 0-2.4.79-2.44 1.88h1.17c.1-.52.57-.86 1.23-.86.8 0 1.24.37 1.24 1.05v.46l-1.62.1c-1.51.09-2.32.71-2.32 1.78 0 1.09.84 1.8 2.05 1.8v-.05zm.35-1.01c-.69 0-1.13-.33-1.13-.84 0-.53.42-.84 1.22-.88l1.44-.09v.47c0 .78-.66 1.34-1.53 1.34zm5.05 3.25c1.28 0 1.88-.49 2.41-1.97l2.3-6.47h-1.33l-1.54 4.97h-.03l-1.54-4.97H24.2l2.23 6.17-.12.38c-.2.63-.53.87-1.11.87-.1 0-.3-.01-.38-.02v1.02c.07.02.38.02.45.02z" />
                  </svg>
                  Apple Pay
                </button>
                <button className="express-btn" aria-label="Pay with Google Pay">
                  <svg height="16" viewBox="0 0 41 17" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                    <path d="M19.26 8.49v5.08h-1.6V1h4.26a3.84 3.84 0 0 1 2.75 1.07 3.56 3.56 0 0 1 1.14 2.69 3.56 3.56 0 0 1-1.14 2.7 3.8 3.8 0 0 1-2.75 1.03h-2.66zm0-6.1v4.72h2.69a2.17 2.17 0 0 0 1.63-.65 2.2 2.2 0 0 0 0-3.14 2.13 2.13 0 0 0-1.63-.67l-2.69.74z" fill="#fff" />
                  </svg>
                  Google Pay
                </button>
              </div>
              <div className="divider-text">— or continue below —</div>
            </div>

            {/* Contact Information */}
            <div className="section-card">
              <h2 className="section-heading">Contact Information</h2>
              <div style={{ display: "grid", gap: "1rem" }}>
                <div>
                  <label htmlFor="email" className="checkout-label">Email address</label>
                  <input id="email" type="email" className="checkout-input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
                </div>
                <div>
                  <label htmlFor="phone" className="checkout-label">Phone number</label>
                  <input id="phone" type="tel" className="checkout-input" placeholder="(555) 000-0000" value={phone} onChange={(e) => setPhone(e.target.value)} autoComplete="tel" />
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: "0.625rem", cursor: "pointer", fontSize: "0.875rem", color: "#374151" }}>
                  <input type="checkbox" checked={textUpdates} onChange={(e) => setTextUpdates(e.target.checked)} style={{ width: "1rem", height: "1rem", accentColor: "#c8a165" }} />
                  Send me order updates via text
                </label>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="section-card">
              <h2 className="section-heading">Shipping Address</h2>
              <div style={{ display: "grid", gap: "0.875rem" }}>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                  <div>
                    <label htmlFor="firstName" className="checkout-label">First name</label>
                    <input id="firstName" type="text" className="checkout-input" placeholder="Jane" value={firstName} onChange={(e) => setFirstName(e.target.value)} autoComplete="given-name" />
                  </div>
                  <div>
                    <label htmlFor="lastName" className="checkout-label">Last name</label>
                    <input id="lastName" type="text" className="checkout-input" placeholder="Smith" value={lastName} onChange={(e) => setLastName(e.target.value)} autoComplete="family-name" />
                  </div>
                </div>
                <div>
                  <label htmlFor="address1" className="checkout-label">Address</label>
                  <input id="address1" type="text" className="checkout-input" placeholder="123 Main Street" value={address1} onChange={(e) => setAddress1(e.target.value)} autoComplete="address-line1" />
                </div>
                <div>
                  <label htmlFor="address2" className="checkout-label">Apartment, suite, etc. <span style={{ fontWeight: 400, color: "#9ca3af", fontSize: "0.75rem" }}>(optional)</span></label>
                  <input id="address2" type="text" className="checkout-input" placeholder="Apt 4B" value={address2} onChange={(e) => setAddress2(e.target.value)} autoComplete="address-line2" />
                </div>
                <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr", gap: "0.75rem" }}>
                  <div>
                    <label htmlFor="city" className="checkout-label">City</label>
                    <input id="city" type="text" className="checkout-input" placeholder="New York" value={city} onChange={(e) => setCity(e.target.value)} autoComplete="address-level2" />
                  </div>
                  <div>
                    <label htmlFor="state" className="checkout-label">State</label>
                    <input id="state" type="text" className="checkout-input" placeholder="NY" value={state} onChange={(e) => setState(e.target.value)} autoComplete="address-level1" maxLength={2} />
                  </div>
                  <div>
                    <label htmlFor="zip" className="checkout-label">ZIP code</label>
                    <input id="zip" type="text" className="checkout-input" placeholder="10001" value={zip} onChange={(e) => setZip(e.target.value)} autoComplete="postal-code" maxLength={10} />
                  </div>
                </div>
                <label style={{ display: "flex", alignItems: "center", gap: "0.625rem", cursor: "pointer", fontSize: "0.875rem", color: "#374151" }}>
                  <input type="checkbox" checked={useBillingAddress} onChange={(e) => handleUseBillingChange(e.target.checked)} style={{ width: "1rem", height: "1rem", accentColor: "#c8a165" }} />
                  Use as billing address
                </label>
              </div>

              {showBillingAddress && (
                <div style={{ marginTop: "1rem", paddingTop: "1rem", borderTop: "1px solid #f0ebe3" }}>
                  <h3 style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#0c0c0c", marginBottom: "0.875rem" }}>Billing Address</h3>
                  <div style={{ display: "grid", gap: "0.875rem" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
                      <div><label className="checkout-label">First name</label><input type="text" className="checkout-input" placeholder="Jane" autoComplete="billing given-name" /></div>
                      <div><label className="checkout-label">Last name</label><input type="text" className="checkout-input" placeholder="Smith" autoComplete="billing family-name" /></div>
                    </div>
                    <div><label className="checkout-label">Address</label><input type="text" className="checkout-input" placeholder="123 Main Street" autoComplete="billing address-line1" /></div>
                    <div style={{ display: "grid", gridTemplateColumns: "2fr 1.5fr 1.5fr", gap: "0.75rem" }}>
                      <div><label className="checkout-label">City</label><input type="text" className="checkout-input" placeholder="New York" /></div>
                      <div><label className="checkout-label">State</label><input type="text" className="checkout-input" placeholder="NY" maxLength={2} /></div>
                      <div><label className="checkout-label">ZIP</label><input type="text" className="checkout-input" placeholder="10001" maxLength={10} /></div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method */}
            <div className="section-card">
              <h2 className="section-heading">Payment Method</h2>
              <MockPaymentElement />
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.875rem", fontSize: "0.8125rem", color: "#6b7280" }}>
                <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
                </svg>
                Your payment info is encrypted and secure
              </div>
              <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", marginTop: "0.625rem", flexWrap: "wrap" }}>
                {["Visa", "Mastercard", "Amex", "Discover"].map((brand) => (
                  <span key={brand} style={{ padding: "0.2rem 0.5rem", border: "1px solid #e5ddd0", borderRadius: "0.25rem", fontSize: "0.7rem", fontWeight: 700, color: "#374151", backgroundColor: "#fff", letterSpacing: "0.02em" }}>{brand}</span>
                ))}
              </div>
              <div style={{ marginTop: "1rem" }}>
                <AffirmCallout total={adjustedTotal} />
              </div>
            </div>

            {/* Place Order (desktop) */}
            <div className="desktop-place-order">
              <PlaceOrderSection total={adjustedTotal} isProcessing={isProcessing} onPlaceOrder={handlePlaceOrder} />
            </div>
          </div>

          {/* RIGHT COLUMN (desktop only) */}
          <div className="desktop-order-summary-col">
            <div style={{ position: "sticky", top: "1.5rem" }}>
              <OrderSummary cart={cart} promoCode={promoCode} setPromoCode={setPromoCode} promoApplied={promoApplied} setPromoApplied={setPromoApplied} />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile sticky CTA */}
      <div className="mobile-sticky-cta">
        <button className="place-order-btn" onClick={handlePlaceOrder} disabled={isProcessing || cart.length === 0} aria-busy={isProcessing}>
          {isProcessing ? (<span style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "0.5rem" }}><SpinnerIcon /> Processing…</span>) : (`Place Order — ${fmt(adjustedTotal)}`)}
        </button>
      </div>
    </div>
  );
}
