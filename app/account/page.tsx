"use client";

import { useState, useEffect } from "react";
import { supabaseAuth } from "@/lib/supabase/auth";
import type { User } from "@supabase/supabase-js";

interface OrderSummary {
  id: string;
  order_number: string;
  status: string;
  total: number;
  created_at: string;
  estimated_delivery: string;
  order_items: { id: string }[];
}

const STATUS_LABELS: Record<string, { label: string; color: string; bg: string }> = {
  received: { label: "Received", color: "#92400e", bg: "#fef3c7" },
  in_production: { label: "In Production", color: "#1e40af", bg: "#dbeafe" },
  quality_check: { label: "Quality Check", color: "#6d28d9", bg: "#ede9fe" },
  shipped: { label: "Shipped", color: "#065f46", bg: "#d1fae5" },
  delivered: { label: "Delivered", color: "#15803d", bg: "#dcfce7" },
  cancelled: { label: "Cancelled", color: "#dc2626", bg: "#fef2f2" },
};

function fmt(n: number) {
  return n.toLocaleString("en-US", { style: "currency", currency: "USD" });
}

export default function AccountDashboard() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [orders, setOrders] = useState<OrderSummary[]>([]);
  const [ordersLoading, setOrdersLoading] = useState(false);

  useEffect(() => {
    if (!supabaseAuth) { setLoading(false); return; }

    supabaseAuth.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user || null);
      setLoading(false);
      if (session?.user?.email) fetchOrders(session.user.email);
    });

    const { data: { subscription } } = supabaseAuth.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user?.email) fetchOrders(session.user.email);
    });

    return () => subscription.unsubscribe();
  }, []);

  async function fetchOrders(email: string) {
    setOrdersLoading(true);
    try {
      const res = await fetch(`/api/orders/lookup?email=${encodeURIComponent(email)}`);
      if (res.ok) {
        const data = await res.json();
        setOrders(data.orders || []);
      }
    } catch {
      console.error("Failed to fetch orders");
    }
    setOrdersLoading(false);
  }

  async function handleLogout() {
    if (supabaseAuth) await supabaseAuth.auth.signOut();
    window.location.href = "/account/login";
  }

  if (loading) return <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif" }}>Loading&hellip;</div>;

  if (!user) {
    if (typeof window !== "undefined") window.location.href = "/account/login";
    return null;
  }

  const userName = user.user_metadata?.full_name || user.user_metadata?.first_name || user.email?.split("@")[0] || "there";

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#faf9f6", fontFamily: "'DM Sans', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
      `}</style>

      <header style={{ background: "#0c0c0c", padding: "1.25rem 0" }}>
        <div style={{ maxWidth: "900px", margin: "0 auto", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <a href="/" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#c8a165", textDecoration: "none" }}>World Wide Shades</a>
          <div style={{ display: "flex", alignItems: "center", gap: "1.5rem" }}>
            <a href="/builder" style={{ color: "#fff", fontSize: "0.875rem", textDecoration: "none", fontWeight: 500 }}>Builder</a>
            <button onClick={handleLogout} style={{ color: "#9ca3af", fontSize: "0.875rem", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Sign Out</button>
          </div>
        </div>
      </header>

      <main style={{ maxWidth: "900px", margin: "0 auto", padding: "2.5rem 1.5rem" }}>
        <div style={{ marginBottom: "2.5rem" }}>
          <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.75rem", fontWeight: 700, color: "#0c0c0c", marginBottom: "0.25rem" }}>
            Welcome back, {userName.split(" ")[0]}
          </h1>
          <p style={{ color: "#6b7280", fontSize: "0.9375rem" }}>{user.email}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "1rem", marginBottom: "2.5rem" }}>
          {[
            { label: "Design a New Shade", href: "/builder", icon: "\uD83C\uDFA8" },
            { label: "Track an Order", href: "/track-order", icon: "\uD83D\uDCE6" },
            { label: "Order Free Swatches", href: "/swatches", icon: "\uD83C\uDFA8" },
            { label: "Contact Support", href: "/contact", icon: "\uD83D\uDCDE" },
          ].map((a) => (
            <a key={a.label} href={a.href} style={{ display: "flex", alignItems: "center", gap: "0.75rem", padding: "1.25rem", background: "#fff", border: "1px solid #e5ddd0", borderRadius: "0.75rem", textDecoration: "none", color: "#0c0c0c", fontWeight: 600, fontSize: "0.9375rem" }}>
              <span style={{ fontSize: "1.25rem" }}>{a.icon}</span>
              {a.label}
            </a>
          ))}
        </div>

        <div>
          <h2 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#0c0c0c", marginBottom: "1.25rem" }}>Your Orders</h2>

          {ordersLoading ? (
            <div style={{ textAlign: "center", padding: "3rem", background: "#fff", border: "1px solid #e5ddd0", borderRadius: "0.75rem" }}>
              <p style={{ color: "#9ca3af" }}>Loading orders&hellip;</p>
            </div>
          ) : orders.length === 0 ? (
            <div style={{ textAlign: "center", padding: "3rem", background: "#fff", border: "1px solid #e5ddd0", borderRadius: "0.75rem" }}>
              <p style={{ fontSize: "2rem", marginBottom: "0.75rem" }}>{"\uD83D\uDED2"}</p>
              <p style={{ fontWeight: 700, color: "#0c0c0c", marginBottom: "0.5rem" }}>No orders yet</p>
              <a href="/builder" style={{ color: "#c8a165", fontWeight: 600, textDecoration: "none" }}>Design Your First Shade {"\u2192"}</a>
            </div>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
              {orders.map((order) => {
                const st = STATUS_LABELS[order.status] || STATUS_LABELS.received;
                const itemCount = order.order_items?.length || 0;
                return (
                  <div key={order.id} style={{ background: "#fff", border: "1px solid #e5ddd0", borderRadius: "0.75rem", padding: "1.5rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem" }}>
                    <div>
                      <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem" }}>
                        <p style={{ fontWeight: 700, fontSize: "1rem", color: "#0c0c0c", margin: 0 }}>{order.order_number}</p>
                        <span style={{ fontSize: "0.7rem", fontWeight: 600, padding: "0.2rem 0.6rem", borderRadius: "999px", color: st.color, backgroundColor: st.bg }}>{st.label}</span>
                      </div>
                      <p style={{ fontSize: "0.8125rem", color: "#6b7280", margin: 0 }}>
                        {itemCount} item{itemCount > 1 ? "s" : ""} {"\u2022"} Placed {new Date(order.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                      </p>
                      {order.status !== "delivered" && order.estimated_delivery && (
                        <p style={{ fontSize: "0.75rem", color: "#c8a165", fontWeight: 600, marginTop: "0.25rem" }}>Est. delivery: {order.estimated_delivery}</p>
                      )}
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                      <p style={{ fontWeight: 700, fontSize: "1.125rem", color: "#0c0c0c", fontFamily: "'Playfair Display', Georgia, serif", margin: 0 }}>{fmt(Number(order.total))}</p>
                      <a href={`/track-order?id=${order.order_number}`} style={{ padding: "0.5rem 1rem", background: "#0c0c0c", color: "#fff", borderRadius: "0.375rem", fontSize: "0.8125rem", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
                        {order.status === "delivered" ? "View Order" : "Track"}
                      </a>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
