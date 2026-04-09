"use client";

import { useState } from "react";

/* ─── Types ─────────────────────────────────────────────── */
type OrderStatus = "received" | "in_production" | "quality_check" | "shipped" | "delivered" | "cancelled";

interface OrderItem {
  shade_type: string;
  fabric_name: string;
  width: number;
  width_fraction: string;
  height: number;
  height_fraction: string;
  mount_type: string;
  control_type: string;
  motor_power: string;
  roll_type: string;
  valance_type: string;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface StatusEvent {
  status: string;
  notes: string;
  created_at: string;
}

interface Order {
  id: string;
  order_number: string;
  status: OrderStatus;
  total: number;
  subtotal: number;
  discount: number;
  sale_savings: number;
  estimated_delivery: string;
  tracking_number: string;
  tracking_url: string;
  created_at: string;
  order_items: OrderItem[];
  order_status_history: StatusEvent[];
}

/* ─── Constants ─────────────────────────────────────────── */
const JOURNEY_STEPS = [
  {
    key: "received",
    label: "Order Received",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#fff" : "#d1d5db"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/>
      </svg>
    ),
    detail: "Your order has been confirmed and payment processed. Your shades enter production within 1 business day.",
  },
  {
    key: "in_production",
    label: "In Production",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#fff" : "#d1d5db"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 20h20"/><path d="M5 20V8.4a1 1 0 0 1 .6-.9l6-3a1 1 0 0 1 .8 0l6 3a1 1 0 0 1 .6.9V20"/><path d="M9 20v-5h6v5"/><path d="M9 10h6"/>
      </svg>
    ),
    detail: "Your custom shades are being cut, assembled, and finished by hand in our Brooklyn, NY factory. Each shade is made to your exact measurements.",
  },
  {
    key: "quality_check",
    label: "Quality Inspection",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#fff" : "#d1d5db"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>
      </svg>
    ),
    detail: "Every shade undergoes rigorous quality inspection — we check measurements, fabric alignment, motor function, and hardware before packaging.",
  },
  {
    key: "shipped",
    label: "Shipped",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#fff" : "#d1d5db"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
      </svg>
    ),
    detail: "Your shades have been carefully packaged and are on their way to you. Track your shipment using the tracking number below.",
  },
  {
    key: "delivered",
    label: "Delivered",
    icon: (active: boolean) => (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={active ? "#fff" : "#d1d5db"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
      </svg>
    ),
    detail: "Your custom shades have been delivered! Check out our installation guides to get them up in minutes.",
  },
];

function fmt(n: number) {
  return "$" + Number(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function fmtDim(val: number, frac: string) {
  return frac && frac !== "0" ? `${val} ${frac}"` : `${val}"`;
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" });
}

function fmtDateShort(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric" });
}

function fmtDateTime(d: string) {
  return new Date(d).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit" });
}

function getStatusColor(status: string) {
  const colors: Record<string, string> = {
    received: "#3b82f6",
    in_production: "#f59e0b",
    quality_check: "#8b5cf6",
    shipped: "#06b6d4",
    delivered: "#22c55e",
    cancelled: "#ef4444",
  };
  return colors[status] || "#999";
}

/* ─── Component ─────────────────────────────────────────── */
export default function TrackOrderPage() {
  const [orderNumber, setOrderNumber] = useState("");
  const [email, setEmail] = useState("");
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  async function handleLookup(e: React.FormEvent) {
    e.preventDefault();
    if (!orderNumber.trim() || !email.trim()) {
      setError("Please enter both your order number and email.");
      return;
    }
    setLoading(true);
    setError("");
    setOrder(null);

    try {
      const res = await fetch("/api/orders/lookup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          order_number: orderNumber.trim(),
          email: email.trim(),
        }),
      });
      const data = await res.json();
      if (data.order) {
        setOrder(data.order);
      } else {
        setError(data.error || "Order not found. Please check your order number and email.");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    }

    setSearched(true);
    setLoading(false);
  }

  const currentStepIndex = order
    ? JOURNEY_STEPS.findIndex((s) => s.key === order.status)
    : -1;

  const progressPercent =
    currentStepIndex >= 0
      ? Math.round(((currentStepIndex + 1) / JOURNEY_STEPS.length) * 100)
      : 0;

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#faf9f6", fontFamily: "'DM Sans', sans-serif" }}>

      {/* ─── HERO SEARCH ──────────────────────────────────── */}
      <section style={{ background: "linear-gradient(180deg, #0c0c0c 0%, #1a1a1a 100%)", padding: "4rem 1.5rem 3rem" }}>
        <div style={{ maxWidth: "640px", margin: "0 auto", textAlign: "center" }}>
          <p style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#c8a165", marginBottom: "0.75rem" }}>
            Order Tracking
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2.25rem", fontWeight: 700, color: "#fff", marginBottom: "0.75rem", lineHeight: 1.15 }}>
            Track Your Shades
          </h1>
          <p style={{ color: "#9a9590", fontSize: "1rem", marginBottom: "2rem", lineHeight: 1.6 }}>
            Follow your custom shades from our Brooklyn factory to your front door.
          </p>

          <form onSubmit={handleLookup} style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "1rem", padding: "1.5rem", backdropFilter: "blur(10px)" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem" }}>
              <div style={{ textAlign: "left" }}>
                <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#c8a165", marginBottom: "0.375rem" }}>Order Number</label>
                <input
                  value={orderNumber}
                  onChange={(e) => setOrderNumber(e.target.value)}
                  placeholder="WWS-20260408-0001"
                  style={{ width: "100%", padding: "0.8125rem 1rem", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "0.5rem", background: "rgba(255,255,255,0.07)", color: "#fff", fontSize: "0.9375rem", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }}
                />
              </div>
              <div style={{ textAlign: "left" }}>
                <label style={{ display: "block", fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#c8a165", marginBottom: "0.375rem" }}>Email Address</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  style={{ width: "100%", padding: "0.8125rem 1rem", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "0.5rem", background: "rgba(255,255,255,0.07)", color: "#fff", fontSize: "0.9375rem", fontFamily: "'DM Sans', sans-serif", outline: "none", boxSizing: "border-box" }}
                />
              </div>
            </div>
            {error && <p style={{ color: "#f87171", fontSize: "0.8125rem", marginBottom: "0.75rem", fontWeight: 600 }}>{error}</p>}
            <button
              type="submit"
              disabled={loading}
              style={{ width: "100%", padding: "0.9375rem", background: "linear-gradient(90deg, #c8a165 0%, #d4b47a 50%, #c8a165 100%)", color: "#0c0c0c", border: "none", borderRadius: "0.5rem", fontSize: "1rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif", letterSpacing: "0.02em", opacity: loading ? 0.7 : 1, transition: "opacity 0.2s" }}
            >
              {loading ? "Looking up your order…" : "Track My Order"}
            </button>
          </form>
        </div>
      </section>

      {/* ─── ORDER RESULTS ────────────────────────────────── */}
      {order && (
        <div style={{ maxWidth: "800px", margin: "0 auto", padding: "0 1.5rem" }}>

          {/* ── Progress Bar ──────────────────────────────── */}
          <div style={{ background: "#fff", border: "1px solid #e5ddd0", borderRadius: "1rem", padding: "2rem", marginTop: "-1.5rem", position: "relative", zIndex: 2, boxShadow: "0 8px 30px rgba(0,0,0,0.08)" }}>
            {/* Order header */}
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
              <div>
                <p style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#9a9590" }}>Order</p>
                <p style={{ fontSize: "1.375rem", fontWeight: 800, color: "#0c0c0c", fontFamily: "'Playfair Display', Georgia, serif" }}>{order.order_number}</p>
                <p style={{ fontSize: "0.8125rem", color: "#9a9590", marginTop: "0.25rem" }}>Placed {fmtDate(order.created_at)}</p>
              </div>
              <div style={{ textAlign: "right" }}>
                <div style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", background: getStatusColor(order.status) + "15", border: `1px solid ${getStatusColor(order.status)}40`, borderRadius: "2rem", padding: "0.375rem 1rem" }}>
                  <span style={{ width: "8px", height: "8px", borderRadius: "50%", background: getStatusColor(order.status), display: "inline-block", animation: order.status !== "delivered" && order.status !== "cancelled" ? "pulse 2s infinite" : "none" }} />
                  <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: getStatusColor(order.status) }}>
                    {JOURNEY_STEPS.find((s) => s.key === order.status)?.label || order.status}
                  </span>
                </div>
                {order.estimated_delivery && (
                  <p style={{ fontSize: "0.8125rem", color: "#9a9590", marginTop: "0.5rem" }}>
                    Est. delivery: <strong style={{ color: "#0c0c0c" }}>{order.estimated_delivery}</strong>
                  </p>
                )}
              </div>
            </div>

            {/* Visual progress bar */}
            <div style={{ marginBottom: "2rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.5rem" }}>
                <span style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#9a9590" }}>Progress</span>
                <span style={{ fontSize: "0.8125rem", fontWeight: 700, color: "#c8a165" }}>{progressPercent}%</span>
              </div>
              <div style={{ height: "6px", background: "#f0ece6", borderRadius: "3px", overflow: "hidden" }}>
                <div style={{ height: "100%", width: `${progressPercent}%`, background: "linear-gradient(90deg, #c8a165, #d4b47a)", borderRadius: "3px", transition: "width 1s ease" }} />
              </div>
            </div>

            {/* Journey steps */}
            <div style={{ display: "flex", justifyContent: "space-between", position: "relative" }}>
              {/* Connector line */}
              <div style={{ position: "absolute", top: "24px", left: "24px", right: "24px", height: "2px", background: "#f0ece6", zIndex: 0 }} />
              <div style={{ position: "absolute", top: "24px", left: "24px", height: "2px", background: "linear-gradient(90deg, #c8a165, #d4b47a)", zIndex: 1, width: `${currentStepIndex >= 0 ? (currentStepIndex / (JOURNEY_STEPS.length - 1)) * 100 : 0}%`, transition: "width 1s ease", right: "24px" }} />

              {JOURNEY_STEPS.map((step, i) => {
                const isComplete = i < currentStepIndex;
                const isCurrent = i === currentStepIndex;
                const isPending = i > currentStepIndex;

                return (
                  <div key={step.key} style={{ display: "flex", flexDirection: "column", alignItems: "center", position: "relative", zIndex: 2, flex: 1 }}>
                    <div style={{
                      width: "48px", height: "48px", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center",
                      background: isComplete ? "#22c55e" : isCurrent ? "#c8a165" : "#f7f5f0",
                      border: isCurrent ? "3px solid rgba(200,161,101,0.3)" : isComplete ? "3px solid #22c55e" : "2px solid #e5ddd0",
                      boxShadow: isCurrent ? "0 0 20px rgba(200,161,101,0.3)" : "none",
                      transition: "all 0.5s ease",
                    }}>
                      {isComplete ? (
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                      ) : (
                        step.icon(!isPending)
                      )}
                    </div>
                    <p style={{
                      fontSize: "0.6875rem", fontWeight: 700, color: isPending ? "#d1d5db" : isCurrent ? "#c8a165" : "#0c0c0c",
                      marginTop: "0.5rem", textAlign: "center", lineHeight: 1.3,
                    }}>
                      {step.label}
                    </p>
                    {/* Date from history */}
                    {order.order_status_history && (() => {
                      const event = order.order_status_history.find((h) => h.status === step.key);
                      return event ? (
                        <p style={{ fontSize: "0.625rem", color: "#9a9590", marginTop: "0.125rem" }}>{fmtDateShort(event.created_at)}</p>
                      ) : null;
                    })()}
                  </div>
                );
              })}
            </div>

            {/* Current step detail */}
            {currentStepIndex >= 0 && (
              <div style={{ marginTop: "1.5rem", padding: "1rem 1.25rem", background: getStatusColor(order.status) + "08", border: `1px solid ${getStatusColor(order.status)}20`, borderRadius: "0.75rem" }}>
                <p style={{ fontSize: "0.875rem", color: "#374151", lineHeight: 1.6 }}>
                  {JOURNEY_STEPS[currentStepIndex].detail}
                </p>
              </div>
            )}
          </div>

          {/* ── Tracking Info ─────────────────────────────── */}
          {order.tracking_number && (
            <div style={{ background: "#fff", border: "1px solid #e5ddd0", borderRadius: "1rem", padding: "1.5rem", marginTop: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1rem" }}>
                <div style={{ width: "40px", height: "40px", background: "#06b6d415", borderRadius: "0.5rem", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#06b6d4" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="1" y="3" width="15" height="13"/><polygon points="16 8 20 8 23 11 23 16 16 16 16 8"/><circle cx="5.5" cy="18.5" r="2.5"/><circle cx="18.5" cy="18.5" r="2.5"/>
                  </svg>
                </div>
                <div>
                  <p style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#9a9590" }}>Tracking Number</p>
                  <p style={{ fontSize: "1.125rem", fontWeight: 700, color: "#0c0c0c", fontFamily: "monospace", letterSpacing: "0.05em" }}>{order.tracking_number}</p>
                </div>
              </div>
              {order.tracking_url && (
                <a
                  href={order.tracking_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ display: "block", textAlign: "center", padding: "0.75rem", background: "#06b6d410", border: "1px solid #06b6d430", borderRadius: "0.5rem", color: "#06b6d4", fontWeight: 700, fontSize: "0.875rem", textDecoration: "none" }}
                >
                  Track Package on Carrier Website →
                </a>
              )}
            </div>
          )}

          {/* ── Timeline History ──────────────────────────── */}
          {order.order_status_history && order.order_status_history.length > 0 && (
            <div style={{ background: "#fff", border: "1px solid #e5ddd0", borderRadius: "1rem", padding: "1.5rem", marginTop: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
              <p style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#9a9590", marginBottom: "1rem" }}>Timeline</p>
              <div style={{ display: "flex", flexDirection: "column", gap: "0" }}>
                {[...order.order_status_history]
                  .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                  .map((event, i) => {
                    const isFirst = i === 0;
                    const stepInfo = JOURNEY_STEPS.find((s) => s.key === event.status);
                    return (
                      <div key={i} style={{ display: "flex", gap: "1rem", position: "relative", paddingBottom: i < order.order_status_history.length - 1 ? "1.25rem" : 0 }}>
                        {/* Timeline dot + line */}
                        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "20px", flexShrink: 0 }}>
                          <div style={{
                            width: isFirst ? "12px" : "8px",
                            height: isFirst ? "12px" : "8px",
                            borderRadius: "50%",
                            background: isFirst ? getStatusColor(event.status) : "#d1d5db",
                            border: isFirst ? `3px solid ${getStatusColor(event.status)}30` : "none",
                            flexShrink: 0,
                            marginTop: "4px",
                          }} />
                          {i < order.order_status_history.length - 1 && (
                            <div style={{ width: "2px", flex: 1, background: "#f0ece6", marginTop: "4px" }} />
                          )}
                        </div>
                        {/* Content */}
                        <div style={{ paddingBottom: "0.25rem" }}>
                          <p style={{ fontSize: "0.8125rem", fontWeight: 700, color: isFirst ? getStatusColor(event.status) : "#374151" }}>
                            {stepInfo?.label || event.status}
                          </p>
                          <p style={{ fontSize: "0.75rem", color: "#9a9590", marginTop: "0.125rem" }}>{fmtDateTime(event.created_at)}</p>
                          {event.notes && <p style={{ fontSize: "0.75rem", color: "#6b7280", marginTop: "0.25rem" }}>{event.notes}</p>}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* ── Order Items ───────────────────────────────── */}
          <div style={{ background: "#fff", border: "1px solid #e5ddd0", borderRadius: "1rem", padding: "1.5rem", marginTop: "1rem", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <p style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#9a9590", marginBottom: "1rem" }}>
              Your Shades ({order.order_items?.length || 0})
            </p>
            {order.order_items?.map((item, i) => (
              <div key={i} style={{ padding: "1rem", background: "#faf9f6", borderRadius: "0.75rem", marginBottom: "0.5rem", border: "1px solid #f0ece6" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <p style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#0c0c0c" }}>{item.shade_type}</p>
                  <p style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#0c0c0c" }}>{fmt(Number(item.total_price))}</p>
                </div>
                <div style={{ fontSize: "0.8125rem", color: "#6b7280", lineHeight: 1.8 }}>
                  {item.fabric_name && <div>Fabric: {item.fabric_name}</div>}
                  <div>Size: {fmtDim(item.width, item.width_fraction)} W × {fmtDim(item.height, item.height_fraction)} H</div>
                  <div>{item.mount_type} · {item.control_type}{item.motor_power ? ` (${item.motor_power})` : ""}</div>
                  <div>Qty: {item.quantity}</div>
                </div>
              </div>
            ))}

            {/* Totals */}
            <div style={{ borderTop: "2px solid #e5ddd0", marginTop: "0.75rem", paddingTop: "0.75rem" }}>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", color: "#6b7280", marginBottom: "0.25rem" }}>
                <span>Subtotal</span><span>{fmt(Number(order.subtotal))}</span>
              </div>
              {Number(order.sale_savings) > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", color: "#16a34a", fontWeight: 600, marginBottom: "0.25rem" }}>
                  <span>Sale Savings</span><span>-{fmt(Number(order.sale_savings))}</span>
                </div>
              )}
              {Number(order.discount) > 0 && (
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", color: "#16a34a", fontWeight: 600, marginBottom: "0.25rem" }}>
                  <span>Promo Discount</span><span>-{fmt(Number(order.discount))}</span>
                </div>
              )}
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", color: "#6b7280", marginBottom: "0.5rem" }}>
                <span>Shipping</span><span style={{ color: "#16a34a", fontWeight: 600 }}>FREE</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between", fontSize: "1.25rem", fontWeight: 800, color: "#0c0c0c", fontFamily: "'Playfair Display', Georgia, serif" }}>
                <span>Total</span><span>{fmt(Number(order.total))}</span>
              </div>
            </div>
          </div>

          {/* ── Helpful Resources ─────────────────────────── */}
          <div style={{ background: "#fff", border: "1px solid #e5ddd0", borderRadius: "1rem", padding: "1.5rem", marginTop: "1rem", marginBottom: "3rem", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <p style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.1em", color: "#9a9590", marginBottom: "1rem" }}>Get Ready for Install Day</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              {[
                { label: "Measuring Guide", href: "/guides/WWS-Window-Measuring-Guide.pdf" },
                { label: "Installation Guide", href: "/guides/WWS-Roller-Shades-Installation-Guide_1.pdf" },
                { label: "Remote Programming", href: "/guides/WWS-Somfy_Remote_Programming_Guide.pdf" },
                { label: "Motor Programming", href: "/guides/WWS-Somfy_Motors_Programming_Guide.pdf" },
              ].map((guide) => (
                <a key={guide.label} href={guide.href} target="_blank" style={{ display: "flex", alignItems: "center", gap: "0.5rem", padding: "0.75rem", background: "#faf9f6", border: "1px solid #f0ece6", borderRadius: "0.5rem", textDecoration: "none", color: "#0c0c0c", fontSize: "0.8125rem", fontWeight: 600 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#c8a165" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
                  {guide.label}
                </a>
              ))}
            </div>

            <div style={{ marginTop: "1.25rem", padding: "1rem", background: "#fdf9f5", border: "1px solid #e5ddd0", borderRadius: "0.5rem", textAlign: "center" }}>
              <p style={{ fontSize: "0.875rem", color: "#374151", marginBottom: "0.25rem" }}>
                <strong>Need help?</strong> We're here for you.
              </p>
              <p style={{ fontSize: "0.8125rem", color: "#6b7280" }}>
                Call <a href="tel:+18446742716" style={{ color: "#c8a165", fontWeight: 600, textDecoration: "none" }}>(844) 674-2716</a> or email <a href="mailto:hello@worldwideshades.com" style={{ color: "#c8a165", fontWeight: 600, textDecoration: "none" }}>Hello@WorldWideShades.com</a>
              </p>
              <p style={{ fontSize: "0.75rem", color: "#9a9590", marginTop: "0.25rem" }}>Mon–Fri 9am–6pm EST</p>
            </div>
          </div>
        </div>
      )}

      {/* ─── NOT FOUND ────────────────────────────────────── */}
      {searched && !order && !loading && (
        <div style={{ maxWidth: "600px", margin: "2rem auto", padding: "3rem 1.5rem", textAlign: "center" }}>
          <div style={{ background: "#fff", border: "1px solid #e5ddd0", borderRadius: "1rem", padding: "3rem 2rem", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
            <div style={{ width: "64px", height: "64px", background: "#fef2f2", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.25rem" }}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.375rem", fontWeight: 700, color: "#0c0c0c", marginBottom: "0.5rem" }}>Order Not Found</h2>
            <p style={{ color: "#6b7280", fontSize: "0.9375rem", lineHeight: 1.6, marginBottom: "1.5rem" }}>
              We couldn't find an order matching that number and email. Please double-check and try again.
            </p>
            <p style={{ fontSize: "0.8125rem", color: "#9a9590" }}>
              Need help? Call <a href="tel:+18446742716" style={{ color: "#c8a165", fontWeight: 600, textDecoration: "none" }}>(844) 674-2716</a>
            </p>
          </div>
        </div>
      )}

      {/* Pulse animation */}
      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: 0.4; }
        }
      `}</style>
    </div>
  );
}
