"use client";

import { useEffect, useState } from "react";

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default function OrderConfirmationPage() {
  const [orderId] = useState(() => `WWS-${new Date().toISOString().slice(0, 10).replace(/-/g, "")}-${String(Math.floor(Math.random() * 9999)).padStart(4, "0")}`);
  const [total, setTotal] = useState(0);
  const [itemCount, setItemCount] = useState(0);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("wws_cart_v1");
      if (raw) {
        const cart = JSON.parse(raw);
        setTotal(cart.reduce((s: number, i: any) => s + i.totalPrice, 0));
        setItemCount(cart.length);
        // Clear cart after successful order
        // localStorage.removeItem("wws_cart_v1"); // Uncomment when Stripe is live
      }
    } catch {}
  }, []);

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 10);

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#faf9f6", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <header style={{ background: "#0c0c0c", padding: "1.25rem 0" }}>
        <div style={{ maxWidth: "700px", margin: "0 auto", padding: "0 1.5rem", display: "flex", justifyContent: "center" }}>
          <a href="/" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#c8a165", textDecoration: "none" }}>World Wide Shades</a>
        </div>
      </header>

      <main style={{ maxWidth: "700px", margin: "0 auto", padding: "3rem 1.5rem", textAlign: "center" }}>
        {/* Success icon */}
        <div style={{ width: "80px", height: "80px", borderRadius: "50%", background: "#d1fae5", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 1.5rem", fontSize: "2rem" }}>
          \u2713
        </div>

        <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "2rem", fontWeight: 700, color: "#0c0c0c", marginBottom: "0.5rem" }}>
          Thank You for Your Order!
        </h1>
        <p style={{ color: "#6b7280", fontSize: "1rem", marginBottom: "2rem" }}>
          Your custom shades are on their way to being made.
        </p>

        {/* Order summary card */}
        <div style={{ background: "#fff", border: "1px solid #e5ddd0", borderRadius: "0.75rem", padding: "2rem", marginBottom: "2rem", textAlign: "left" }}>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.5rem", marginBottom: "1.5rem" }}>
            <div>
              <p style={{ fontSize: "0.75rem", color: "#9ca3af", fontWeight: 500, marginBottom: "0.25rem" }}>ORDER NUMBER</p>
              <p style={{ fontSize: "1.125rem", fontWeight: 700, color: "#0c0c0c", fontFamily: "'Playfair Display', Georgia, serif" }}>{orderId}</p>
            </div>
            <div>
              <p style={{ fontSize: "0.75rem", color: "#9ca3af", fontWeight: 500, marginBottom: "0.25rem" }}>TOTAL</p>
              <p style={{ fontSize: "1.125rem", fontWeight: 700, color: "#0c0c0c", fontFamily: "'Playfair Display', Georgia, serif" }}>{fmt(total)}</p>
            </div>
          </div>

          <div style={{ padding: "1rem", background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: "0.5rem", marginBottom: "1rem" }}>
            <p style={{ fontWeight: 700, color: "#15803d", fontSize: "0.875rem" }}>
              \ud83d\udce6 {itemCount} custom shade{itemCount !== 1 ? "s" : ""} ordered
            </p>
            <p style={{ fontSize: "0.8125rem", color: "#166534", marginTop: "0.25rem" }}>
              Estimated delivery: ~{deliveryDate.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </p>
          </div>

          <div style={{ padding: "1rem", background: "#fdf9f5", border: "1px solid #e5ddd0", borderRadius: "0.5rem" }}>
            <p style={{ fontWeight: 600, color: "#0c0c0c", fontSize: "0.8125rem", marginBottom: "0.5rem" }}>What happens next?</p>
            <div style={{ fontSize: "0.8125rem", color: "#6b7280" }}>
              <p style={{ marginBottom: "0.35rem" }}>1. You&apos;ll receive a confirmation email shortly.</p>
              <p style={{ marginBottom: "0.35rem" }}>2. Your shades enter production within 1 business day.</p>
              <p style={{ marginBottom: "0.35rem" }}>3. We&apos;ll email you when they ship with FedEx tracking.</p>
              <p>4. Typical delivery: 7\u201311 business days.</p>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap" }}>
          <a href="/track-order" style={{ padding: "0.875rem 1.5rem", background: "linear-gradient(135deg, #c8a165, #b8895a)", color: "#fff", borderRadius: "0.5rem", fontWeight: 700, textDecoration: "none", fontSize: "0.9375rem" }}>
            Track Your Order
          </a>
          <a href="/" style={{ padding: "0.875rem 1.5rem", background: "#0c0c0c", color: "#fff", borderRadius: "0.5rem", fontWeight: 700, textDecoration: "none", fontSize: "0.9375rem" }}>
            Continue Shopping
          </a>
        </div>

        {/* Support */}
        <div style={{ marginTop: "2.5rem", padding: "1.5rem", background: "#f3f0ea", borderRadius: "0.75rem" }}>
          <p style={{ fontWeight: 600, color: "#0c0c0c", fontSize: "0.875rem", marginBottom: "0.5rem" }}>Questions about your order?</p>
          <p style={{ fontSize: "0.8125rem", color: "#6b7280" }}>
            Call <a href="tel:8446742716" style={{ color: "#c8a165", fontWeight: 600, textDecoration: "none" }}>(844) 674-2716</a> or email <a href="mailto:support@worldwideshades.com" style={{ color: "#c8a165", fontWeight: 600, textDecoration: "none" }}>support@worldwideshades.com</a>
          </p>
        </div>
      </main>
    </div>
  );
}
