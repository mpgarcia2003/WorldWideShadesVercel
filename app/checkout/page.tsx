"use client";

import { useState, useEffect, useCallback } from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements, PaymentElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { SHAPE_CONFIGS, VALANCE_OPTIONS, SIDE_CHANNEL_OPTIONS, isSaleActive, SALE_CONFIG, getFabricUrl } from "../../constants";
import type { CartItem, ShapeType } from "../../types";
import { trackBeginCheckout, trackAddPaymentInfo, trackPurchase, trackPhoneClick, buildGTMItem } from "../../lib/gtm/events";

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

// ---------------------------------------------------------------------------
// Promo Codes
// ---------------------------------------------------------------------------
interface PromoCode {
  code: string;
  type: "percent" | "flat";
  value: number; // percent (10 = 10%) or flat dollar amount
  minOrder: number;
  label: string;
  active: boolean;
}

const PROMO_CODES: PromoCode[] = [
  { code: "COMEBACK10", type: "percent", value: 10, minOrder: 0, label: "10% Off — Welcome Back", active: true },
  { code: "SHADE10", type: "flat", value: 50, minOrder: 100, label: "$50 Off", active: true },
  { code: "SAVE15", type: "percent", value: 15, minOrder: 300, label: "15% Off", active: true },
  { code: "FIRST20", type: "percent", value: 20, minOrder: 200, label: "20% Off — First Order", active: true },
];

function validatePromo(code: string, subtotal: number): { valid: boolean; promo?: PromoCode; discount?: number; error?: string } {
  if (!code.trim()) return { valid: false, error: "Enter a promo code" };
  const promo = PROMO_CODES.find((p) => p.code.toUpperCase() === code.trim().toUpperCase() && p.active);
  if (!promo) return { valid: false, error: "Invalid promo code" };
  if (subtotal < promo.minOrder) return { valid: false, error: `Minimum order ${promo.minOrder} required` };
  const discount = promo.type === "percent" ? subtotal * (promo.value / 100) : promo.value;
  return { valid: true, promo, discount: Math.min(discount, subtotal) };
}

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

// ---------------------------------------------------------------------------
// Stripe Payment Form (rendered inside <Elements> provider)
// ---------------------------------------------------------------------------
function StripePaymentForm({
  total,
  isProcessing,
  setIsProcessing,
  orderData,
}: {
  total: number;
  isProcessing: boolean;
  setIsProcessing: (v: boolean) => void;
  orderData: any;
}) {
  const stripe = useStripe();
  const elements = useElements();
  const [errorMessage, setErrorMessage] = useState("");

  async function handleSubmit() {
    if (!stripe || !elements) return;

    // Validate required customer fields
    const missing = [];
    if (!orderData.email?.trim()) missing.push("Email");
    if (!orderData.shipping_first_name?.trim()) missing.push("First name");
    if (!orderData.shipping_last_name?.trim()) missing.push("Last name");
    if (!orderData.shipping_address1?.trim()) missing.push("Address");
    if (!orderData.shipping_city?.trim()) missing.push("City");
    if (!orderData.shipping_state?.trim()) missing.push("State");
    if (!orderData.shipping_zip?.trim()) missing.push("ZIP code");
    if (missing.length > 0) {
      setErrorMessage(`Please fill in: ${missing.join(", ")}`);
      return;
    }

    setIsProcessing(true);
    setErrorMessage("");

    // Track payment info entered
    trackAddPaymentInfo(
      orderData.items?.map((i: any) => ({ item_id: i.fabric_id || "shade", item_name: i.shade_type, item_category: i.shade_type, price: i.total_price, quantity: i.quantity || 1 })) || [],
      total
    );

    const { error, paymentIntent } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        return_url: `${window.location.origin}/order-confirmation`,
      },
      redirect: "if_required",
    });

    if (error) {
      setErrorMessage(error.message || "Payment failed. Please try again.");
      setIsProcessing(false);
    } else if (paymentIntent && paymentIntent.status === "succeeded") {
      // Track purchase — THE primary conversion
      trackPurchase(
        paymentIntent.id,
        total,
        orderData.items?.map((i: any) => ({ item_id: i.fabric_id || "shade", item_name: i.shade_type, item_category: i.shade_type, price: i.total_price, quantity: i.quantity || 1 })) || [],
        { tax: 0, shipping: 0, coupon: orderData.promo_code || "", discount: orderData.discount || 0 },
        { email: orderData.email, phone: orderData.phone, firstName: orderData.shipping_first_name, lastName: orderData.shipping_last_name, address: orderData.shipping_address1, city: orderData.shipping_city, state: orderData.shipping_state, zip: orderData.shipping_zip }
      );

      // Save order to Supabase
      let orderNumber = '';
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          headers: { "Content-Type": "application/json", "x-admin-password": "wws-admin-2026" },
          body: JSON.stringify({
            ...orderData,
            stripe_payment_intent_id: paymentIntent.id,
          }),
        });
        const resData = await res.json();
        orderNumber = resData.order_number || '';
      } catch (e) {
        console.error("Failed to save order:", e);
      }
      // Save order confirmation data for the thank-you page
      localStorage.setItem("wws_last_order", JSON.stringify({
        order_number: orderNumber || `WWS-${new Date().toISOString().slice(0,10).replace(/-/g,'')}-${Math.floor(Math.random()*9000)+1000}`,
        email: orderData.email,
        date: new Date().toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' }),
        items: (orderData.items || []).map((item: any) => ({
          name: item.shade_type || 'Custom Roller Shade',
          fabric: item.fabric_name || '',
          dimensions: `${item.width || 0}${item.width_fraction && item.width_fraction !== '0' ? ' ' + item.width_fraction : ''}" x ${item.height || 0}${item.height_fraction && item.height_fraction !== '0' ? ' ' + item.height_fraction : ''}"`,
          mount: item.mount_type || '',
          control: item.control_type || '',
          qty: item.quantity || 1,
          price: item.total_price || 0,
        })),
        subtotal: orderData.subtotal || total,
        discount: orderData.discount || 0,
        shipping: 0,
        tax: 0,
        total: total,
        stripe_payment_intent_id: paymentIntent.id,
      }));

      // Clear cart and redirect (1.5s delay for Google Ads conversion pixel to complete)
      sessionStorage.setItem('wws_purchase_tracked', 'true');
      localStorage.removeItem("wws_cart_v1");
      await new Promise((resolve) => setTimeout(resolve, 1500));
      window.location.href = "/order-confirmation";
    } else {
      setIsProcessing(false);
    }
  }

  return (
    <div className="section-card">
      <h2 className="section-heading">Payment</h2>
      <PaymentElement
        options={{
          layout: "tabs",
          defaultValues: { billingDetails: { address: { country: "US" } } },
        }}
      />
      {errorMessage && (
        <p style={{ color: "#dc2626", fontSize: "0.875rem", marginTop: "0.75rem" }}>{errorMessage}</p>
      )}
      <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginTop: "0.875rem", fontSize: "0.8125rem", color: "#6b7280" }}>
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#16a34a" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
        </svg>
        Your payment info is encrypted and secure
      </div>

      {/* Place Order — desktop */}
      <div className="desktop-place-order" style={{ marginTop: "1.5rem" }}>
        <button
          className="place-order-btn"
          onClick={handleSubmit}
          disabled={isProcessing || !stripe}
          aria-busy={isProcessing}
        >
          {isProcessing ? (<><SpinnerIcon /> Processing…</>) : (`Place Order — ${fmt(total)}`)}
        </button>
        <p style={{ textAlign: "center", fontSize: "0.75rem", color: "#9ca3af", marginTop: "0.75rem", lineHeight: 1.5 }}>
          By placing this order, you agree to our{" "}
          <a href="/terms" style={{ color: "#c8a165", textDecoration: "none" }}>Terms of Service</a>{" "}and{" "}
          <a href="/privacy" style={{ color: "#c8a165", textDecoration: "none" }}>Privacy Policy</a>.
        </p>
      </div>
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

  // Roll type: Standard Roll or Reverse Roll
  const rollLabel = item.config.rollType === "Reverse" ? "Reverse Roll" : "Standard Roll";
  // Valance type: separate from roll
  const valanceLabel = valance?.id === "cassette" ? "Cassette Valance" : valance?.id === "fascia" ? "Metal Fascia" : null;

  const specs: [string, string][] = [
    ["Fabric", item.config.material?.name || "\u2014"],
    ["Dimensions", getDimDisplay(item)],
    ["Mount", item.config.mountType || "\u2014"],
    ["Control", isMotorized ? `Motorized (${item.config.motorPower || "Rechargeable"})` : `${item.config.controlType || "Manual"} \u2014 ${item.config.controlPosition || "Right"} Side`],
    ["Roll Type", rollLabel],
  ];

  if (valanceLabel) specs.push(["Valance", valanceLabel]);
  if (hasSideChannels) specs.push(["Side Channels", "Yes"]);
  if (motorAddons.length > 0) specs.push(["Accessories", motorAddons.join(", ")]);

  // Fabric swatch image
  const swatchUrl = item.config.material?.cloudinaryId ? getFabricUrl(item.config.material.cloudinaryId, "thumb") : null;

  return (
    <div style={{ backgroundColor: "#fff", border: "1px solid #e5ddd0", borderRadius: "0.5rem", padding: "1rem", marginBottom: "0.75rem" }}>
      <div style={{ display: "flex", gap: "0.75rem", marginBottom: "0.75rem" }}>
        {/* Fabric swatch thumbnail */}
        {swatchUrl && (
          <div style={{ width: "56px", height: "56px", borderRadius: "0.375rem", border: "1px solid #e5ddd0", overflow: "hidden", flexShrink: 0 }}>
            <img src={swatchUrl} alt={item.config.material?.name || "Fabric"} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
          </div>
        )}
        <div style={{ flex: 1, display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <p style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#0c0c0c", margin: "0 0 0.15rem" }}>
              Custom {item.config.shadeType || "Roller"} Shade
              {item.config.shape !== "Standard" && ` \u2014 ${item.config.shape}`}
            </p>
            <p style={{ fontSize: "0.75rem", color: "#9ca3af", margin: 0 }}>Qty: {item.config.quantity || 1}</p>
          </div>
          <p style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#0c0c0c", whiteSpace: "nowrap", marginLeft: "0.5rem" }}>
            {fmt(item.totalPrice)}
          </p>
        </div>
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
  promoDiscount,
  promoLabel,
  promoError,
  onApplyPromo,
}: {
  cart: CartItem[];
  promoCode: string;
  setPromoCode: (v: string) => void;
  promoApplied: boolean;
  setPromoApplied: (v: boolean) => void;
  promoDiscount: number;
  promoLabel: string;
  promoError: string;
  onApplyPromo: () => void;
}) {
  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const discount = promoApplied ? promoDiscount : 0;
  const adjustedTotal = subtotal - discount;

  // Calculate savings from sale discount
  const saleActive = isSaleActive();
  const salePercent = SALE_CONFIG.maxDiscount;
  const retailTotal = saleActive ? cart.reduce((sum, item) => sum + (item.totalPrice / (1 - salePercent / 100)), 0) : subtotal;
  const saleSavings = retailTotal - subtotal;

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
              {saleActive && retailTotal > subtotal && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span>Retail Price</span>
                  <span style={{ textDecoration: "line-through", color: "#9ca3af" }}>{fmt(retailTotal)}</span>
                </div>
              )}
              <PricingRow label={`Subtotal (${cart.reduce((s, i) => s + (i.config.quantity || 1), 0)} item${cart.length > 1 ? "s" : ""})`} value={fmt(subtotal)} />
              {saleActive && saleSavings > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <span style={{ color: "#16a34a", fontWeight: 600 }}>Sale Savings (Up to {salePercent}% Off)</span>
                  <span style={{ color: "#16a34a", fontWeight: 600 }}>-{fmt(saleSavings)}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                <span>Shipping</span>
                <span>
                  <s style={{ color: "#9ca3af", marginRight: "0.35rem" }}>$19.99</s>
                  <span style={{ color: "#16a34a", fontWeight: 600 }}>FREE</span>
                </span>
              </div>
              {promoApplied && <PricingRow label={`Promo (${promoLabel})`} value={`-${fmt(promoDiscount)}`} valueStyle={{ color: "#16a34a", fontWeight: 600 }} />}
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
                onClick={onApplyPromo}
                style={{ padding: "0.5rem 1rem", backgroundColor: promoApplied ? "#d1fae5" : "#0c0c0c", color: promoApplied ? "#065f46" : "#fff", border: "none", borderRadius: "0.375rem", fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer", whiteSpace: "nowrap" }}
              >
                {promoApplied ? "✓ Applied" : "Apply"}
              </button>
            </div>
            {promoError && !promoApplied && (
              <p style={{ fontSize: "0.75rem", color: "#dc2626", marginTop: "-0.5rem", marginBottom: "0.75rem" }}>{promoError}</p>
            )}

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

            {isSaleActive() && saleSavings > 0 && (
              <p style={{ textAlign: "right", fontSize: "0.8125rem", color: "#16a34a", fontWeight: 700, marginTop: "0.25rem" }}>
                You save {fmt(saleSavings + (promoApplied ? promoDiscount : 0))}!
              </p>
            )}
          </>
        )}


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
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [promoLabel, setPromoLabel] = useState("");
  const [promoError, setPromoError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [clientSecret, setClientSecret] = useState<string | null>(null);
  const [stripeError, setStripeError] = useState("");
  const [gaClientId, setGaClientId] = useState<string | null>(null);

  // Capture GA4 client_id for server-side attribution stitching
  useEffect(() => {
    try {
      const w = window as any;
      if (w.gtag) {
        w.gtag('get', 'G-1RHH50R34P', 'client_id', (id: string) => {
          if (id) setGaClientId(id);
        });
      }
      // Fallback: read from GA cookie
      if (!gaClientId) {
        const match = document.cookie.match(/_ga=GA\d+\.\d+\.(.+)/);
        if (match) setGaClientId(match[1]);
      }
    } catch {}
  }, []);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const raw = localStorage.getItem("wws_cart_v1");
      if (raw) setCart(JSON.parse(raw));
    } catch {}
    setLoaded(true);
  }, []);

  // Fire begin_checkout when cart loads (1.5s delay for Google Ads Tag to initialize)
  useEffect(() => {
    if (!loaded || cart.length === 0) return;
    const timer = setTimeout(() => {
      const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
      const gtmItems = cart.map((item) => buildGTMItem(item.config, item.totalPrice));
      trackBeginCheckout(gtmItems, total);
    }, 1500);
    return () => clearTimeout(timer);
  }, [loaded, cart.length]);

  // Create PaymentIntent when cart is loaded
  useEffect(() => {
    if (!loaded || cart.length === 0) return;
    const total = cart.reduce((sum, item) => sum + item.totalPrice, 0);
    const discount = promoApplied ? promoDiscount : 0;
    const amountInCents = Math.round((total - discount) * 100);
    if (amountInCents < 50) return;

    setStripeError("");
    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        amount: amountInCents,
        email: email || undefined,
        metadata: { items: cart.length.toString(), ga_client_id: gaClientId || '' },
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.clientSecret) setClientSecret(data.clientSecret);
        else setStripeError(data.error || "Could not initialize payment.");
      })
      .catch(() => setStripeError("Could not connect to payment server."));
  }, [loaded, cart, promoApplied, promoDiscount]); // re-create if promo changes

  const subtotal = cart.reduce((sum, item) => sum + item.totalPrice, 0);
  const discount = promoApplied ? promoDiscount : 0;
  const adjustedTotal = subtotal - discount;
  const _salePercent = SALE_CONFIG.maxDiscount;
  const _retailTotal = isSaleActive() ? cart.reduce((sum, item) => sum + (item.totalPrice / (1 - _salePercent / 100)), 0) : subtotal;
  const _saleSavings = _retailTotal - subtotal;

  function handleUseBillingChange(checked: boolean) {
    setUseBillingAddress(checked);
    setShowBillingAddress(!checked);
  }

  function handleApplyPromo() {
    const result = validatePromo(promoCode, subtotal);
    if (result.valid && result.promo && result.discount !== undefined) {
      setPromoApplied(true);
      setPromoDiscount(result.discount);
      setPromoLabel(result.promo.label);
      setPromoError("");
    } else {
      setPromoApplied(false);
      setPromoDiscount(0);
      setPromoLabel("");
      setPromoError(result.error || "Invalid code");
    }
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
            <OrderSummary cart={cart} promoCode={promoCode} setPromoCode={setPromoCode} promoApplied={promoApplied} setPromoApplied={setPromoApplied} promoDiscount={promoDiscount} promoLabel={promoLabel} promoError={promoError} onApplyPromo={handleApplyPromo} />
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

            {/* Stripe Payment — card, Apple Pay, Google Pay */}
            {clientSecret ? (
              <Elements stripe={stripePromise} options={{ clientSecret, appearance: { theme: "stripe", variables: { colorPrimary: "#c8a165", fontFamily: "'DM Sans', sans-serif" } } }}>
                <StripePaymentForm total={adjustedTotal} isProcessing={isProcessing} setIsProcessing={setIsProcessing} orderData={{
                  email,
                  phone,
                  subtotal,
                  discount,
                  sale_savings: _saleSavings,
                  retail_total: _retailTotal,
                  sale_percent: isSaleActive() ? _salePercent : 0,
                  tax: 0,
                  shipping: 0,
                  total: adjustedTotal,
                  promo_code: promoApplied ? promoCode : undefined,
                  shipping_first_name: firstName,
                  shipping_last_name: lastName,
                  shipping_address1: address1,
                  shipping_address2: address2,
                  shipping_city: city,
                  shipping_state: state,
                  shipping_zip: zip,
                  estimated_delivery: getEstimatedDelivery(),
                  items: cart.map((item) => ({
                    shade_type: `Custom ${item.config.shadeType || 'Roller'} Shade`,
                    shape: item.config.shape || 'Standard',
                    fabric_name: item.config.material?.name || '',
                    fabric_id: item.config.material?.id || '',
                    width: item.config.width,
                    width_fraction: item.config.widthFraction || '0',
                    height: item.config.height,
                    height_fraction: item.config.heightFraction || '0',
                    custom_dims: item.config.customDims || null,
                    mount_type: item.config.mountType || 'Inside Mount',
                    control_type: item.config.controlType || 'Manual',
                    motor_power: item.config.motorPower || null,
                    roll_type: item.config.rollType || 'Standard',
                    bottom_bar: item.config.bottomBar || 'Standard',
                    valance_type: item.config.valanceType || 'standard',
                    side_channel_type: item.config.sideChannelType || 'none',
                    motorized_controller: item.config.motorizedController || false,
                    motorized_hub: item.config.motorizedHub || false,
                    motorized_charger: item.config.motorizedCharger || false,
                    sun_sensor: item.config.sunSensor || false,
                    quantity: item.config.quantity || 1,
                    unit_price: item.totalPrice / (item.config.quantity || 1),
                    total_price: item.totalPrice,
                  })),
                }} />
              </Elements>
            ) : stripeError ? (
              <div className="section-card">
                <p style={{ color: "#dc2626", fontSize: "0.875rem" }}>{stripeError}</p>
              </div>
            ) : cart.length > 0 ? (
              <div className="section-card" style={{ textAlign: "center", padding: "2rem" }}>
                <SpinnerIcon /> <span style={{ marginLeft: "0.5rem", color: "#6b7280" }}>Loading payment...</span>
              </div>
            ) : null}
          </div>

          {/* RIGHT COLUMN (desktop only) */}
          <div className="desktop-order-summary-col">
            <div style={{ position: "sticky", top: "1.5rem" }}>
              <OrderSummary cart={cart} promoCode={promoCode} setPromoCode={setPromoCode} promoApplied={promoApplied} setPromoApplied={setPromoApplied} promoDiscount={promoDiscount} promoLabel={promoLabel} promoError={promoError} onApplyPromo={handleApplyPromo} />
            </div>
          </div>
        </div>
      </main>

      {/* Mobile sticky CTA — scrolls to payment section */}
      {cart.length > 0 && !clientSecret && (
        <div className="mobile-sticky-cta">
          <div style={{ textAlign: "center", padding: "0.5rem", color: "#6b7280", fontSize: "0.875rem" }}>
            <SpinnerIcon /> Loading payment...
          </div>
        </div>
      )}
      {cart.length > 0 && clientSecret && (
        <div className="mobile-sticky-cta">
          <button
            onClick={() => {
              const el = document.querySelector('.place-order-btn');
              if (el) {
                el.scrollIntoView({ behavior: 'smooth', block: 'center' });
                setTimeout(() => (el as HTMLButtonElement).click(), 600);
              }
            }}
            disabled={isProcessing}
            style={{
              width: "100%", padding: "1rem", background: "linear-gradient(135deg, #c8a165 0%, #b8895a 100%)",
              color: "#fff", border: "none", borderRadius: "0.625rem", fontSize: "1rem", fontWeight: 700,
              cursor: isProcessing ? "not-allowed" : "pointer", opacity: isProcessing ? 0.65 : 1,
              fontFamily: "'DM Sans', sans-serif"
            }}
          >
            {isProcessing ? "Processing..." : `Place Order — ${fmt(cart.reduce((s, i) => s + i.totalPrice, 0) - (promoApplied ? promoDiscount : 0))}`}
          </button>
        </div>
      )}
    </div>
  );
}
