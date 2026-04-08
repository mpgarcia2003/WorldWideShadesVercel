"use client";

import { useState } from "react";

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------
interface OrderItem {
  name: string;
  fabric: string;
  dimensions: string;
  mount: string;
  control: string;
  quantity: number;
  price: number;
}

interface OrderData {
  id: string;
  status: "received" | "in_production" | "quality_check" | "shipped" | "delivered";
  items: OrderItem[];
  total: number;
  createdAt: string;
  estimatedDelivery: string;
  trackingNumber?: string;
  trackingUrl?: string;
  shippingAddress: { name: string; city: string; state: string };
}

const STATUSES = [
  { key: "received", label: "Order Received", icon: "📋", description: "We\u2019ve confirmed your order and payment." },
  { key: "in_production", label: "In Production", icon: "🏭", description: "Your custom shades are being cut and assembled." },
  { key: "quality_check", label: "Quality Check", icon: "✅", description: "Final inspection before shipping." },
  { key: "shipped", label: "Shipped", icon: "📦", description: "Your shades are on the way via FedEx." },
  { key: "delivered", label: "Delivered", icon: "🏠", description: "Your shades have been delivered!" },
] as const;

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

// Demo data — will be replaced by /api/track → Supabase
const DEMO_ORDER: OrderData = {
  id: "WWS-20260408-0001",
  status: "in_production",
  items: [
    { name: "Custom Blackout Roller Shade", fabric: "Texstyle Milano — Charcoal", dimensions: '48" \u00d7 72"', mount: "Inside Mount", control: "Motorized", quantity: 1, price: 487 },
    { name: "Custom Light Filtering Shade", fabric: "Phifer SheerWeave — Chalk", dimensions: '36" \u00d7 60"', mount: "Outside Mount", control: "Cordless", quantity: 2, price: 312 },
  ],
  total: 1111,
  createdAt: "2026-04-02",
  estimatedDelivery: "April 14\u201318, 2026",
  shippingAddress: { name: "Jane Smith", city: "New York", state: "NY" },
};

export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<OrderData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    if (!orderNumber.trim() || !email.trim()) { setError("Please enter both your order number and email."); return; }
    setLoading(true);
    setError("");
    // TODO: Replace with real Supabase query via /api/track
    await new Promise((r) => setTimeout(r, 1200));
    if (orderNumber.trim().length > 0) {
      setOrder({ ...DEMO_ORDER, id: orderNumber.trim().toUpperCase() });
    } else {
      setOrder(null);
      setError("Order not found. Please check your order number and email.");
    }
    setSearched(true);
    setLoading(false);
  }

  const statusIndex = order ? STATUSES.findIndex((s) => s.key === order.status) : -1;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#faf9f6", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .track-input { width:100%; padding:0.875rem 1rem; border:1px solid #e5ddd0; border-radius:0.5rem; background:#fff; color:#0c0c0c; font-size:1rem; font-family:'DM Sans',sans-serif; transition:border-color 0.15s,box-shadow 0.15s; }
        .track-input::placeholder { color:#9ca3af; }
        .track-input:focus { outline:none; border-color:#c8a165; box-shadow:0 0 0 3px rgba(200,161,101,0.18); }
      `}</style>

      <header style={{ background: "#0c0c0c", padding: "1.25rem 0" }}>
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#c8a165", textDecoration: "none" }}>World Wide Shades</a>
          <a href="tel:8446742716" style={{ color: "#fff", fontSize: "0.875rem", textDecoration: "none" }}>(844) 674-2716</a>
        </div>
      </header>

      <main style={{ maxWidth: "800px", margin: "0 auto", padding: "3rem 1.5rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2.5rem" }}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2rem", fontWeight: 700, color: "#0c0c0c", marginBottom: "0.5rem" }}>Track Your Order</h1>
          <p style={{ color: "#6b7280", fontSize: "1rem" }}>Enter your order number and email to see your production status.</p>
        </div>

        <form onSubmit={handleLookup} style={{ background: "#fff", border: "1px solid #e5ddd0", borderRadius: "0.75rem", padding: "2rem", marginBottom: "2rem" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#0c0c0c", marginBottom: "0.375rem" }}>Order Number</label>
              <input className="track-input" placeholder="WWS-20260408-0001" value={orderNumber} onChange={(e) => setOrderNumber(e.target.value)} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#0c0c0c", marginBottom: "0.375rem" }}>Email Address</label>
              <input className="track-input" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
          </div>
          {error && <p style={{ color: "#dc2626", fontSize: "0.875rem", marginBottom: "0.75rem" }}>{error}</p>}
          <button type="submit" disabled={loading} style={{ width: "100%", padding: "1rem", background: loading ? "#d4b07c" : "linear-gradient(135deg, #c8a165, #b8895a)", color: "#fff", border: "none", borderRadius: "0.5rem", fontSize: "1rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif", opacity: loading ? 0.75 : 1 }}>
            {loading ? "Looking up\u2026" : "Track Order"}
          </button>
        </form>

        {order && (
          <div style={{ background: "#fff", border: "1px solid #e5ddd0", borderRadius: "0.75rem", overflow: "hidden" }}>
            <div style={{ padding: "1.5rem 2rem", borderBottom: "1px solid #e5ddd0", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <p style={{ fontSize: "0.75rem", color: "#9ca3af", fontWeight: 500, marginBottom: "0.25rem" }}>ORDER NUMBER</p>
                <p style={{ fontSize: "1.125rem", fontWeight: 700, color: "#0c0c0c", fontFamily: "'Playfair Display', Georgia, serif" }}>{order.id}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <p style={{ fontSize: "0.75rem", color: "#9ca3af", fontWeight: 500, marginBottom: "0.25rem" }}>PLACED ON</p>
                <p style={{ fontSize: "0.9375rem", fontWeight: 600, color: "#0c0c0c" }}>{new Date(order.createdAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</p>
              </div>
            </div>

            <div style={{ padding: "2rem" }}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.125rem", fontWeight: 700, color: "#0c0c0c", marginBottom: "1.5rem" }}>Production Status</h2>
              <div style={{ position: "relative", paddingLeft: "2.5rem" }}>
                <div style={{ position: "absolute", left: "1rem", top: "0.25rem", bottom: "0.25rem", width: "2px", background: "#e5ddd0" }} />
                {STATUSES.map((s, i) => {
                  const isActive = i === statusIndex;
                  const isComplete = i < statusIndex;
                  const isPending = i > statusIndex;
                  return (
                    <div key={s.key} style={{ position: "relative", marginBottom: i < STATUSES.length - 1 ? "2rem" : 0 }}>
                      <div style={{ position: "absolute", left: "-1.75rem", top: "0.125rem", width: "1.5rem", height: "1.5rem", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.75rem", background: isComplete ? "#16a34a" : isActive ? "#c8a165" : "#f3f0ea", color: isComplete || isActive ? "#fff" : "#9ca3af", border: isActive ? "3px solid rgba(200,161,101,0.3)" : "none", zIndex: 1 }}>
                        {isComplete ? "\u2713" : isActive ? "\u25cf" : ""}
                      </div>
                      <div style={{ opacity: isPending ? 0.4 : 1 }}>
                        <p style={{ fontWeight: 700, fontSize: "0.9375rem", color: isActive ? "#c8a165" : "#0c0c0c", marginBottom: "0.2rem" }}>
                          {s.icon} {s.label}
                          {isActive && <span style={{ marginLeft: "0.5rem", fontSize: "0.7rem", background: "#fef3c7", color: "#92400e", padding: "0.15rem 0.5rem", borderRadius: "999px", fontWeight: 600 }}>CURRENT</span>}
                        </p>
                        <p style={{ fontSize: "0.8125rem", color: "#6b7280" }}>{s.description}</p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {order.trackingNumber && (
                <div style={{ marginTop: "1.5rem", padding: "1rem", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "0.5rem" }}>
                  <p style={{ fontWeight: 700, color: "#15803d", fontSize: "0.875rem" }}>📦 FedEx Tracking: {order.trackingNumber}</p>
                  {order.trackingUrl && <a href={order.trackingUrl} target="_blank" rel="noopener noreferrer" style={{ color: "#c8a165", fontWeight: 600, fontSize: "0.8125rem", textDecoration: "none" }}>Track on FedEx \u2192</a>}
                </div>
              )}

              <div style={{ marginTop: "1.5rem", padding: "1rem", background: "#fdf9f5", border: "1px solid #e5ddd0", borderRadius: "0.5rem" }}>
                <p style={{ fontWeight: 600, color: "#0c0c0c", fontSize: "0.875rem" }}>📅 Estimated Delivery: <span style={{ color: "#c8a165" }}>{order.estimatedDelivery}</span></p>
                <p style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" }}>Shipping to {order.shippingAddress.name} \u2014 {order.shippingAddress.city}, {order.shippingAddress.state}</p>
              </div>
            </div>

            <div style={{ padding: "0 2rem 2rem" }}>
              <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.125rem", fontWeight: 700, color: "#0c0c0c", marginBottom: "1rem" }}>Order Items</h2>
              {order.items.map((item, i) => (
                <div key={i} style={{ padding: "1rem", background: "#faf9f6", border: "1px solid #e5ddd0", borderRadius: "0.5rem", marginBottom: "0.75rem" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <p style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#0c0c0c" }}>{item.name}</p>
                    <p style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#0c0c0c" }}>{fmt(item.price)}</p>
                  </div>
                  <div style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "0.2rem 0.75rem", fontSize: "0.75rem" }}>
                    {[["Fabric", item.fabric], ["Size", item.dimensions], ["Mount", item.mount], ["Control", item.control], ["Qty", String(item.quantity)]].map(([k, v]) => (
                      <div key={k} style={{ display: "contents" }}><span style={{ color: "#9ca3af" }}>{k}:</span><span style={{ color: "#374151" }}>{v}</span></div>
                    ))}
                  </div>
                </div>
              ))}
              <div style={{ display: "flex", justifyContent: "space-between", padding: "1rem 0", borderTop: "2px solid #e5ddd0", marginTop: "0.5rem" }}>
                <span style={{ fontWeight: 700, fontSize: "1rem", color: "#0c0c0c" }}>Total</span>
                <span style={{ fontWeight: 800, fontSize: "1.25rem", color: "#0c0c0c", fontFamily: "'Playfair Display', Georgia, serif" }}>{fmt(order.total)}</span>
              </div>
            </div>

            <div style={{ padding: "1.5rem 2rem", background: "#f3f0ea", borderTop: "1px solid #e5ddd0" }}>
              <p style={{ fontWeight: 600, color: "#0c0c0c", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Need help with your order?</p>
              <p style={{ fontSize: "0.8125rem", color: "#6b7280" }}>
                Call us at <a href="tel:8446742716" style={{ color: "#c8a165", fontWeight: 600, textDecoration: "none" }}>(844) 674-2716</a> or email <a href="mailto:support@worldwideshades.com" style={{ color: "#c8a165", fontWeight: 600, textDecoration: "none" }}>support@worldwideshades.com</a>
              </p>
            </div>
          </div>
        )}

        {searched && !order && !loading && (
          <div style={{ textAlign: "center", padding: "3rem", background: "#fff", border: "1px solid #e5ddd0", borderRadius: "0.75rem" }}>
            <p style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>🔍</p>
            <p style={{ fontWeight: 700, color: "#0c0c0c", fontSize: "1.125rem", marginBottom: "0.5rem" }}>Order not found</p>
            <p style={{ color: "#6b7280", fontSize: "0.875rem" }}>Please check your order number and email and try again.</p>
          </div>
        )}
      </main>
    </div>
  );
}
