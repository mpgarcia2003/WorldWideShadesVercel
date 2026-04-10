"use client";

import { useState, useEffect } from "react";

interface AbandonedCart {
  id: string;
  email: string;
  name: string | null;
  phone: string | null;
  cart_data: any;
  page: string;
  source: string;
  total: number;
  item_count: number;
  recovered: boolean;
  emails_sent: number;
  email_sent_at: string | null;
  created_at: string;
}

const PASS = "wws-admin-2026";
const hdrs = { "Content-Type": "application/json", "x-admin-password": PASS };

export default function AbandonedCartsPage() {
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [carts, setCarts] = useState<AbandonedCart[]>([]);
  const [total, setTotal] = useState(0);
  const [filter, setFilter] = useState<"all" | "pending" | "recovered">("pending");
  const [sending, setSending] = useState<string | null>(null);
  const [batchSending, setBatchSending] = useState(false);
  const [selected, setSelected] = useState<AbandonedCart | null>(null);

  async function fetchCarts() {
    const recovered = filter === "all" ? "" : filter === "recovered" ? "true" : "false";
    const res = await fetch(`/api/abandoned-carts?recovered=${recovered}`, { headers: hdrs });
    const data = await res.json();
    setCarts(data.carts || []);
    setTotal(data.total || 0);
  }

  useEffect(() => { if (authed) fetchCarts(); }, [authed, filter]);

  async function sendRecoveryEmail(cartId: string) {
    setSending(cartId);
    await fetch("/api/abandoned-carts/send-recovery", {
      method: "POST",
      headers: hdrs,
      body: JSON.stringify({ cart_id: cartId }),
    });
    setSending(null);
    fetchCarts();
  }

  async function sendAllRecoveryEmails() {
    setBatchSending(true);
    const res = await fetch("/api/abandoned-carts/send-recovery", {
      method: "POST",
      headers: hdrs,
      body: JSON.stringify({ send_all: true }),
    });
    const data = await res.json();
    alert(`Sent: ${data.sent} | Failed: ${data.failed}`);
    setBatchSending(false);
    fetchCarts();
  }

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", background: "#faf9f6" }}>
        <div style={{ background: "#fff", padding: "2rem", borderRadius: "0.75rem", border: "1px solid #e5ddd0", width: "100%", maxWidth: "360px" }}>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", marginBottom: "1rem", textAlign: "center" }}>Abandoned Carts</h1>
          <input type="password" placeholder="Admin password" value={pw} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === "Enter" && pw === PASS && setAuthed(true)} style={{ width: "100%", padding: "0.75rem", border: "1px solid #e5ddd0", borderRadius: "0.5rem", marginBottom: "0.75rem", fontSize: "0.875rem" }} />
          <button onClick={() => pw === PASS && setAuthed(true)} style={{ width: "100%", padding: "0.75rem", background: "#0c0c0c", color: "#fff", border: "none", borderRadius: "0.5rem", fontWeight: 600, cursor: "pointer" }}>Login</button>
        </div>
      </div>
    );
  }

  const pendingCount = carts.filter(c => !c.recovered).length;
  const totalValue = carts.reduce((s, c) => s + (c.total || 0), 0);

  return (
    <div style={{ minHeight: "100vh", background: "#faf9f6", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Nav */}
      <div style={{ background: "#0c0c0c", padding: "0.75rem 1.5rem", display: "flex", gap: "1.5rem", alignItems: "center" }}>
        <a href="/admin/orders" style={{ color: "#9ca3af", fontSize: "0.875rem", textDecoration: "none" }}>Orders</a>
        <a href="/admin/customers" style={{ color: "#9ca3af", fontSize: "0.875rem", textDecoration: "none" }}>Customers</a>
        <a href="/admin/abandoned" style={{ color: "#c8a165", fontSize: "0.875rem", textDecoration: "none", fontWeight: 600 }}>Abandoned Carts</a>
      </div>

      <div style={{ maxWidth: "1100px", margin: "0 auto", padding: "2rem 1.5rem" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "1rem" }}>
          <h1 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", fontWeight: 700, color: "#0c0c0c" }}>Abandoned Cart Recovery</h1>
          <button
            onClick={sendAllRecoveryEmails}
            disabled={batchSending}
            style={{ padding: "0.625rem 1.25rem", background: batchSending ? "#9ca3af" : "#c8a165", color: "#fff", border: "none", borderRadius: "0.5rem", fontWeight: 600, fontSize: "0.875rem", cursor: batchSending ? "not-allowed" : "pointer" }}
          >
            {batchSending ? "Sending..." : `Send Recovery Emails (${pendingCount})`}
          </button>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "1rem", marginBottom: "1.5rem" }}>
          {[
            { label: "Total Abandoned", value: total, color: "#0c0c0c" },
            { label: "Pending Recovery", value: pendingCount, color: "#dc2626" },
            { label: "Potential Revenue", value: `$${totalValue.toFixed(0)}`, color: "#c8a165" },
            { label: "Recovered", value: carts.filter(c => c.recovered).length, color: "#16a34a" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#fff", border: "1px solid #e5ddd0", borderRadius: "0.75rem", padding: "1.25rem", textAlign: "center" }}>
              <p style={{ fontSize: "1.5rem", fontWeight: 700, color: s.color, margin: "0 0 0.25rem" }}>{s.value}</p>
              <p style={{ fontSize: "0.75rem", color: "#9ca3af", margin: 0 }}>{s.label}</p>
            </div>
          ))}
        </div>

        {/* Filter */}
        <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.25rem" }}>
          {(["pending", "recovered", "all"] as const).map((f) => (
            <button key={f} onClick={() => setFilter(f)} style={{ padding: "0.5rem 1rem", borderRadius: "0.375rem", border: "1px solid #e5ddd0", background: filter === f ? "#0c0c0c" : "#fff", color: filter === f ? "#fff" : "#374151", fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer", textTransform: "capitalize" }}>
              {f}
            </button>
          ))}
        </div>

        {/* Cart list */}
        <div style={{ display: "flex", flexDirection: "column", gap: "0.75rem" }}>
          {carts.length === 0 && (
            <div style={{ textAlign: "center", padding: "3rem", background: "#fff", border: "1px solid #e5ddd0", borderRadius: "0.75rem", color: "#9ca3af" }}>
              No abandoned carts found.
            </div>
          )}
          {carts.map((cart) => (
            <div key={cart.id} style={{ background: "#fff", border: "1px solid #e5ddd0", borderRadius: "0.75rem", padding: "1.25rem", display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "1rem", cursor: "pointer" }} onClick={() => setSelected(selected?.id === cart.id ? null : cart)}>
              <div style={{ flex: 1, minWidth: "200px" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.375rem" }}>
                  <p style={{ fontWeight: 600, fontSize: "0.9375rem", color: "#0c0c0c", margin: 0 }}>{cart.email}</p>
                  {cart.recovered && <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "0.15rem 0.5rem", borderRadius: "999px", background: "#dcfce7", color: "#15803d" }}>RECOVERED</span>}
                  {!cart.recovered && cart.emails_sent > 0 && <span style={{ fontSize: "0.65rem", fontWeight: 600, padding: "0.15rem 0.5rem", borderRadius: "999px", background: "#dbeafe", color: "#1e40af" }}>{cart.emails_sent} EMAIL{cart.emails_sent > 1 ? "S" : ""} SENT</span>}
                </div>
                <p style={{ fontSize: "0.75rem", color: "#9ca3af", margin: 0 }}>
                  {cart.name || "No name"} · {cart.item_count} item{cart.item_count !== 1 ? "s" : ""} · {cart.page} · {new Date(cart.created_at).toLocaleDateString("en-US", { month: "short", day: "numeric", hour: "numeric", minute: "2-digit" })}
                </p>
              </div>
              <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                <p style={{ fontWeight: 700, fontSize: "1.125rem", color: cart.total > 0 ? "#0c0c0c" : "#9ca3af", margin: 0, fontFamily: "Georgia, serif" }}>
                  {cart.total > 0 ? `$${cart.total.toFixed(2)}` : "—"}
                </p>
                {!cart.recovered && (
                  <button
                    onClick={(e) => { e.stopPropagation(); sendRecoveryEmail(cart.id); }}
                    disabled={sending === cart.id}
                    style={{ padding: "0.5rem 1rem", background: sending === cart.id ? "#9ca3af" : "#c8a165", color: "#fff", border: "none", borderRadius: "0.375rem", fontSize: "0.75rem", fontWeight: 600, cursor: sending === cart.id ? "not-allowed" : "pointer", whiteSpace: "nowrap" }}
                  >
                    {sending === cart.id ? "Sending..." : "Send Email"}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Detail panel */}
        {selected && (
          <div style={{ marginTop: "1.5rem", background: "#fff", border: "1px solid #e5ddd0", borderRadius: "0.75rem", padding: "1.5rem" }}>
            <h3 style={{ fontFamily: "Georgia, serif", fontSize: "1.125rem", marginBottom: "1rem" }}>Cart Details — {selected.email}</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", fontSize: "0.8125rem", marginBottom: "1rem" }}>
              <div><span style={{ color: "#9ca3af" }}>Name:</span> <strong>{selected.name || "—"}</strong></div>
              <div><span style={{ color: "#9ca3af" }}>Phone:</span> <strong>{selected.phone || "—"}</strong></div>
              <div><span style={{ color: "#9ca3af" }}>Page:</span> <strong>{selected.page}</strong></div>
              <div><span style={{ color: "#9ca3af" }}>Source:</span> <strong>{selected.source}</strong></div>
              <div><span style={{ color: "#9ca3af" }}>Created:</span> <strong>{new Date(selected.created_at).toLocaleString()}</strong></div>
              <div><span style={{ color: "#9ca3af" }}>Emails Sent:</span> <strong>{selected.emails_sent}</strong></div>
              {selected.email_sent_at && <div><span style={{ color: "#9ca3af" }}>Last Email:</span> <strong>{new Date(selected.email_sent_at).toLocaleString()}</strong></div>}
            </div>
            {selected.cart_data && Array.isArray(selected.cart_data) && selected.cart_data.length > 0 && (
              <div>
                <h4 style={{ fontSize: "0.875rem", fontWeight: 600, marginBottom: "0.5rem" }}>Items in Cart:</h4>
                {selected.cart_data.map((item: any, i: number) => (
                  <div key={i} style={{ padding: "0.75rem", background: "#fdf9f5", border: "1px solid #e5ddd0", borderRadius: "0.5rem", marginBottom: "0.5rem", fontSize: "0.8125rem" }}>
                    <p style={{ fontWeight: 600, margin: "0 0 0.25rem" }}>Custom {item.config?.shadeType || "Roller"} Shade</p>
                    <p style={{ color: "#6b7280", margin: 0 }}>
                      {item.config?.material?.name || "No fabric"} · {item.config?.width || 0}" × {item.config?.height || 0}" · {item.config?.mountType || "—"} · ${item.totalPrice?.toFixed(2) || "0.00"}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
