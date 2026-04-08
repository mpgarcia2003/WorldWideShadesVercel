"use client";

import { useState, useEffect, useCallback } from "react";

/* ─── Types ─────────────────────────────────────────────── */
type OrderStatus = "received" | "in_production" | "quality_check" | "shipped" | "delivered" | "cancelled";

interface OrderItem {
  id: string;
  shade_type: string;
  shape: string;
  fabric_name: string;
  width: number;
  width_fraction: string;
  height: number;
  height_fraction: string;
  mount_type: string;
  control_type: string;
  motor_power: string;
  roll_type: string;
  bottom_bar: string;
  valance_type: string;
  side_channel_type: string;
  motorized_controller: boolean;
  motorized_hub: boolean;
  motorized_charger: boolean;
  sun_sensor: boolean;
  quantity: number;
  unit_price: number;
  total_price: number;
}

interface StatusHistory {
  id: string;
  status: string;
  notes: string;
  created_at: string;
}

interface Order {
  id: string;
  order_number: string;
  email: string;
  status: OrderStatus;
  subtotal: number;
  discount: number;
  tax: number;
  shipping: number;
  total: number;
  sale_savings: number;
  retail_total: number;
  sale_percent: number;
  promo_code: string;
  stripe_payment_intent_id: string;
  shipping_first_name: string;
  shipping_last_name: string;
  shipping_address1: string;
  shipping_address2: string;
  shipping_city: string;
  shipping_state: string;
  shipping_zip: string;
  phone: string;
  tracking_number: string;
  tracking_url: string;
  estimated_delivery: string;
  notes: string;
  created_at: string;
  updated_at: string;
  order_items: OrderItem[];
  order_status_history: StatusHistory[];
}

const STATUS_LABELS: Record<OrderStatus, string> = {
  received: "Order Received",
  in_production: "In Production",
  quality_check: "Quality Check",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

const STATUS_COLORS: Record<OrderStatus, string> = {
  received: "#3b82f6",
  in_production: "#f59e0b",
  quality_check: "#8b5cf6",
  shipped: "#06b6d4",
  delivered: "#22c55e",
  cancelled: "#ef4444",
};

function fmt(n: number) {
  return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
  });
}

/* ─── Main Component ────────────────────────────────────── */
export default function AdminOrdersPage() {
  const [password, setPassword] = useState("");
  const [authed, setAuthed] = useState(false);
  const [authError, setAuthError] = useState("");

  // Orders state
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");

  // Detail panel
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [customerStats, setCustomerStats] = useState<any>(null);
  const [updating, setUpdating] = useState(false);
  const [actionMessage, setActionMessage] = useState("");

  // Tracking form
  const [trackingNumber, setTrackingNumber] = useState("");
  const [trackingUrl, setTrackingUrl] = useState("");

  const adminHeaders = {
    "Content-Type": "application/json",
    "x-admin-password": password,
  };

  /* ─── Auth ──────────────────────────────────────────────── */
  function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!password.trim()) return;
    setAuthed(true);
    setAuthError("");
  }

  /* ─── Fetch Orders ──────────────────────────────────────── */
  const fetchOrders = useCallback(async () => {
    if (!authed) return;
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: "50", status: statusFilter });
      if (search) params.set("search", search);
      const res = await fetch(`/api/orders?${params}`, { headers: adminHeaders });
      if (res.status === 401) {
        setAuthed(false);
        setAuthError("Invalid password");
        return;
      }
      const data = await res.json();
      if (data.orders) {
        setOrders(data.orders);
        setTotal(data.total || 0);
      }
    } catch {
      console.error("Failed to fetch orders");
    }
    setLoading(false);
  }, [authed, page, statusFilter, search, password]);

  useEffect(() => { fetchOrders(); }, [fetchOrders]);

  /* ─── Fetch Order Detail ─────────────────────────────────── */
  async function fetchOrderDetail(orderId: string) {
    try {
      const res = await fetch(`/api/orders/${orderId}`, { headers: adminHeaders });
      const data = await res.json();
      if (data.order) {
        setSelectedOrder(data.order);
        setCustomerStats(data.customer_stats || null);
        setTrackingNumber(data.order.tracking_number || "");
        setTrackingUrl(data.order.tracking_url || "");
        setActionMessage("");
      }
    } catch {
      console.error("Failed to fetch order detail");
    }
  }

  /* ─── Update Status ─────────────────────────────────────── */
  async function updateStatus(orderId: string, newStatus: OrderStatus, notes?: string) {
    setUpdating(true);
    setActionMessage("");
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: adminHeaders,
        body: JSON.stringify({ status: newStatus, status_notes: notes || `Status changed to ${newStatus}` }),
      });
      const data = await res.json();
      if (data.order) {
        setSelectedOrder(data.order);
        setOrders((prev) => prev.map((o) => (o.id === orderId ? data.order : o)));
        setActionMessage(`Status updated to "${STATUS_LABELS[newStatus]}"`);
      }
    } catch {
      setActionMessage("Failed to update status");
    }
    setUpdating(false);
  }

  /* ─── Update Tracking ───────────────────────────────────── */
  async function updateTracking(orderId: string) {
    setUpdating(true);
    try {
      const res = await fetch(`/api/orders/${orderId}`, {
        method: "PATCH",
        headers: adminHeaders,
        body: JSON.stringify({ tracking_number: trackingNumber, tracking_url: trackingUrl }),
      });
      const data = await res.json();
      if (data.order) {
        setSelectedOrder(data.order);
        setOrders((prev) => prev.map((o) => (o.id === orderId ? data.order : o)));
        setActionMessage("Tracking info updated");
      }
    } catch {
      setActionMessage("Failed to update tracking");
    }
    setUpdating(false);
  }

  /* ─── Cancel / Refund ───────────────────────────────────── */
  async function cancelOrder(orderId: string, withRefund: boolean) {
    if (!confirm(withRefund ? "Cancel AND refund this order? The customer will be refunded via Stripe." : "Cancel this order WITHOUT refund?")) return;
    setUpdating(true);
    setActionMessage("");
    try {
      const res = await fetch(`/api/orders/${orderId}?refund=${withRefund}`, {
        method: "DELETE",
        headers: adminHeaders,
      });
      const data = await res.json();
      if (data.success) {
        setActionMessage(withRefund ? `Cancelled + refunded (${data.refund?.id || "done"})` : "Cancelled (no refund)");
        fetchOrders();
        setSelectedOrder(null);
      } else {
        setActionMessage(`Error: ${data.error}`);
      }
    } catch {
      setActionMessage("Failed to cancel order");
    }
    setUpdating(false);
  }

  /* ─── Stats ─────────────────────────────────────────────── */
  const stats = {
    total: orders.length,
    received: orders.filter((o) => o.status === "received").length,
    production: orders.filter((o) => o.status === "in_production").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    revenue: orders.filter((o) => o.status !== "cancelled").reduce((s, o) => s + Number(o.total), 0),
  };

  /* ─── Login Screen ──────────────────────────────────────── */
  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", backgroundColor: "#0c0c0c" }}>
        <form onSubmit={handleLogin} style={{ background: "#1a1a1a", padding: "2.5rem", borderRadius: "1rem", border: "1px solid #333", width: "100%", maxWidth: "400px" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#fff", fontSize: "1.5rem", marginBottom: "0.5rem" }}>
            WWS Admin
          </h1>
          <p style={{ color: "#999", fontSize: "0.875rem", marginBottom: "1.5rem" }}>Order Management Dashboard</p>
          {authError && <p style={{ color: "#ef4444", fontSize: "0.875rem", marginBottom: "1rem" }}>{authError}</p>}
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Admin password"
            autoFocus
            style={{ width: "100%", padding: "0.75rem 1rem", borderRadius: "0.5rem", border: "1px solid #444", background: "#0c0c0c", color: "#fff", fontSize: "1rem", marginBottom: "1rem", outline: "none", boxSizing: "border-box" }}
          />
          <button type="submit" style={{ width: "100%", padding: "0.75rem", borderRadius: "0.5rem", background: "linear-gradient(90deg, #c8a165, #d4b47a)", color: "#0c0c0c", fontWeight: 700, fontSize: "1rem", border: "none", cursor: "pointer" }}>
            Sign In
          </button>
        </form>
      </div>
    );
  }

  /* ─── Dashboard ─────────────────────────────────────────── */
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f7f5f0", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Top bar */}
      <div style={{ background: "#0c0c0c", color: "#fff", padding: "1rem 2rem", display: "flex", justifyContent: "space-between", alignItems: "center", position: "sticky", top: 0, zIndex: 50 }}>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.25rem", margin: 0 }}>
            WWS <span style={{ color: "#c8a165" }}>Admin</span>
          </h1>
          <span style={{ fontSize: "0.75rem", color: "#666", borderLeft: "1px solid #333", paddingLeft: "1rem" }}>
            Order Management
          </span>
          <div style={{ display: "flex", gap: "0.25rem", marginLeft: "1rem" }}>
            <a href="/admin/orders" style={{ padding: "0.375rem 0.75rem", borderRadius: "0.375rem", fontSize: "0.75rem", fontWeight: 600, color: "#fff", textDecoration: "none", background: "#333", border: "1px solid #c8a165" }}>Orders</a>
            <a href="/admin/customers" style={{ padding: "0.375rem 0.75rem", borderRadius: "0.375rem", fontSize: "0.75rem", fontWeight: 600, color: "#999", textDecoration: "none", background: "#1a1a1a" }}>Customers</a>
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a href="/" style={{ color: "#c8a165", fontSize: "0.8125rem", textDecoration: "none" }}>← Back to Site</a>
          <button onClick={() => { setAuthed(false); setPassword(""); }} style={{ padding: "0.375rem 0.75rem", borderRadius: "0.375rem", background: "#333", color: "#fff", border: "none", fontSize: "0.75rem", cursor: "pointer" }}>
            Logout
          </button>
        </div>
      </div>

      <div style={{ padding: "1.5rem 2rem", maxWidth: "1400px", margin: "0 auto" }}>
        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
          {[
            { label: "Total Orders", value: stats.total, color: "#0c0c0c" },
            { label: "Received", value: stats.received, color: "#3b82f6" },
            { label: "In Production", value: stats.production, color: "#f59e0b" },
            { label: "Shipped", value: stats.shipped, color: "#06b6d4" },
            { label: "Revenue", value: fmt(stats.revenue), color: "#22c55e" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#fff", borderRadius: "0.75rem", padding: "1.25rem", border: "1px solid #ede9e0" }}>
              <p style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", marginBottom: "0.25rem" }}>{s.label}</p>
              <p style={{ fontSize: "1.5rem", fontWeight: 800, color: s.color, margin: 0 }}>{s.value}</p>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <select
            value={statusFilter}
            onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
            style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid #ddd", fontSize: "0.875rem", background: "#fff" }}
          >
            <option value="all">All Statuses</option>
            {Object.entries(STATUS_LABELS).map(([k, v]) => (
              <option key={k} value={k}>{v}</option>
            ))}
          </select>
          <form onSubmit={(e) => { e.preventDefault(); setSearch(searchInput); setPage(1); }} style={{ display: "flex", gap: "0.5rem" }}>
            <input
              type="text"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search order#, email, name..."
              style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid #ddd", fontSize: "0.875rem", width: "280px" }}
            />
            <button type="submit" style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "#0c0c0c", color: "#fff", border: "none", fontSize: "0.8125rem", cursor: "pointer" }}>
              Search
            </button>
          </form>
          <button onClick={fetchOrders} style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "#fff", border: "1px solid #ddd", fontSize: "0.8125rem", cursor: "pointer" }}>
            ↻ Refresh
          </button>
          <p style={{ fontSize: "0.8125rem", color: "#999", marginLeft: "auto" }}>
            {total} order{total !== 1 ? "s" : ""} total
          </p>
        </div>

        {/* Layout: order list + detail panel */}
        <div style={{ display: "grid", gridTemplateColumns: selectedOrder ? "1fr 1fr" : "1fr", gap: "1.5rem" }}>
          {/* Order list */}
          <div>
            {loading ? (
              <div style={{ textAlign: "center", padding: "3rem", color: "#999" }}>Loading orders...</div>
            ) : orders.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem", background: "#fff", borderRadius: "0.75rem", border: "1px solid #ede9e0" }}>
                <p style={{ fontSize: "1rem", color: "#666" }}>No orders found</p>
                <p style={{ fontSize: "0.8125rem", color: "#999" }}>Orders will appear here after customers check out.</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {orders.map((order) => (
                  <div
                    key={order.id}
                    onClick={() => fetchOrderDetail(order.id)}
                    style={{
                      background: selectedOrder?.id === order.id ? "#fdf9f5" : "#fff",
                      borderRadius: "0.5rem",
                      padding: "1rem 1.25rem",
                      border: `1px solid ${selectedOrder?.id === order.id ? "#c8a165" : "#ede9e0"}`,
                      cursor: "pointer",
                      transition: "border-color 0.15s",
                    }}
                  >
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.5rem" }}>
                      <div>
                        <span style={{ fontWeight: 700, fontSize: "0.9375rem" }}>{order.order_number}</span>
                        <span style={{ fontSize: "0.75rem", color: "#999", marginLeft: "0.75rem" }}>{fmtDate(order.created_at)}</span>
                      </div>
                      <span style={{
                        fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em",
                        padding: "0.2rem 0.5rem", borderRadius: "0.25rem",
                        background: STATUS_COLORS[order.status] + "18", color: STATUS_COLORS[order.status],
                      }}>
                        {STATUS_LABELS[order.status]}
                      </span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", color: "#666" }}>
                      <span>{order.shipping_first_name} {order.shipping_last_name} · {order.email}</span>
                      <span style={{ fontWeight: 700, color: "#0c0c0c" }}>{fmt(Number(order.total))}</span>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#999", marginTop: "0.25rem" }}>
                      {order.order_items?.length || 0} item{(order.order_items?.length || 0) !== 1 ? "s" : ""}
                      {Number(order.discount) > 0 && <span style={{ color: "#16a34a", fontWeight: 600 }}> · -{fmt(Number(order.discount))} promo</span>}
                      {Number(order.sale_savings) > 0 && <span style={{ color: "#16a34a", fontWeight: 600 }}> · Saved {fmt(Number(order.sale_savings))}</span>}
                      {order.promo_code && <span style={{ color: "#92400e", fontWeight: 600 }}> · Code: {order.promo_code}</span>}
                      {order.tracking_number && <span> · Tracking: {order.tracking_number}</span>}
                    </div>
                  </div>
                ))}

                {/* Pagination */}
                {total > 50 && (
                  <div style={{ display: "flex", gap: "0.5rem", justifyContent: "center", marginTop: "1rem" }}>
                    <button disabled={page <= 1} onClick={() => setPage(page - 1)} style={{ padding: "0.375rem 0.75rem", borderRadius: "0.375rem", border: "1px solid #ddd", background: "#fff", cursor: page <= 1 ? "default" : "pointer", opacity: page <= 1 ? 0.4 : 1 }}>← Prev</button>
                    <span style={{ padding: "0.375rem 0.75rem", fontSize: "0.875rem" }}>Page {page} of {Math.ceil(total / 50)}</span>
                    <button disabled={page >= Math.ceil(total / 50)} onClick={() => setPage(page + 1)} style={{ padding: "0.375rem 0.75rem", borderRadius: "0.375rem", border: "1px solid #ddd", background: "#fff", cursor: "pointer" }}>Next →</button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Detail panel */}
          {selectedOrder && (
            <div style={{ background: "#fff", borderRadius: "0.75rem", border: "1px solid #ede9e0", padding: "1.5rem", position: "sticky", top: "5rem", maxHeight: "calc(100vh - 7rem)", overflowY: "auto" }}>
              {/* Header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                <div>
                  <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: "0 0 0.25rem" }}>{selectedOrder.order_number}</h2>
                  <p style={{ fontSize: "0.8125rem", color: "#999", margin: 0 }}>{fmtDate(selectedOrder.created_at)}</p>
                </div>
                <button onClick={() => setSelectedOrder(null)} style={{ background: "none", border: "none", fontSize: "1.25rem", cursor: "pointer", color: "#999" }}>✕</button>
              </div>

              {/* Action message */}
              {actionMessage && (
                <div style={{ padding: "0.625rem 1rem", borderRadius: "0.5rem", background: actionMessage.includes("Error") ? "#fef2f2" : "#f0fdf4", color: actionMessage.includes("Error") ? "#dc2626" : "#16a34a", fontSize: "0.8125rem", fontWeight: 600, marginBottom: "1rem" }}>
                  {actionMessage}
                </div>
              )}

              {/* Status update */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", display: "block", marginBottom: "0.5rem" }}>Update Status</label>
                <div style={{ display: "flex", flexWrap: "wrap", gap: "0.375rem" }}>
                  {(Object.keys(STATUS_LABELS) as OrderStatus[]).filter(s => s !== "cancelled").map((s) => (
                    <button
                      key={s}
                      onClick={() => updateStatus(selectedOrder.id, s)}
                      disabled={updating || selectedOrder.status === s}
                      style={{
                        padding: "0.375rem 0.75rem", borderRadius: "0.375rem", fontSize: "0.75rem", fontWeight: 600, border: "1px solid",
                        cursor: selectedOrder.status === s ? "default" : "pointer",
                        background: selectedOrder.status === s ? STATUS_COLORS[s] : "#fff",
                        color: selectedOrder.status === s ? "#fff" : STATUS_COLORS[s],
                        borderColor: STATUS_COLORS[s],
                        opacity: updating ? 0.5 : 1,
                      }}
                    >
                      {STATUS_LABELS[s]}
                    </button>
                  ))}
                </div>
              </div>

              {/* Customer info */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", display: "block", marginBottom: "0.5rem" }}>Customer</label>
                <div style={{ background: "#f7f5f0", borderRadius: "0.5rem", padding: "0.75rem" }}>
                  <p style={{ fontSize: "0.9375rem", margin: "0 0 0.375rem", fontWeight: 700 }}>{selectedOrder.shipping_first_name} {selectedOrder.shipping_last_name}</p>
                  <div style={{ fontSize: "0.8125rem", color: "#666", lineHeight: 1.8 }}>
                    <div>✉️ {selectedOrder.email}</div>
                    {selectedOrder.phone && <div>📞 {selectedOrder.phone}</div>}
                    <div>📍 {[selectedOrder.shipping_address1, selectedOrder.shipping_address2].filter(Boolean).join(", ")}</div>
                    <div style={{ paddingLeft: "1.5rem" }}>{[selectedOrder.shipping_city, selectedOrder.shipping_state, selectedOrder.shipping_zip].filter(Boolean).join(", ")}</div>
                  </div>
                </div>
                {customerStats && (
                  <div style={{ marginTop: "0.5rem", display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: "0.5rem" }}>
                    <div style={{ background: "#fff", border: "1px solid #ede9e0", borderRadius: "0.375rem", padding: "0.5rem 0.75rem", textAlign: "center" }}>
                      <p style={{ fontSize: "1.125rem", fontWeight: 800, color: "#0c0c0c", margin: 0 }}>{customerStats.total_orders}</p>
                      <p style={{ fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", margin: 0 }}>Orders</p>
                    </div>
                    <div style={{ background: "#fff", border: "1px solid #ede9e0", borderRadius: "0.375rem", padding: "0.5rem 0.75rem", textAlign: "center" }}>
                      <p style={{ fontSize: "1.125rem", fontWeight: 800, color: "#22c55e", margin: 0 }}>{fmt(customerStats.total_spent)}</p>
                      <p style={{ fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", margin: 0 }}>Lifetime</p>
                    </div>
                    <div style={{ background: "#fff", border: "1px solid #ede9e0", borderRadius: "0.375rem", padding: "0.5rem 0.75rem", textAlign: "center" }}>
                      <p style={{ fontSize: "0.75rem", fontWeight: 700, color: "#0c0c0c", margin: 0 }}>{customerStats.last_order_date ? fmtDate(customerStats.last_order_date).split(",")[0] : "—"}</p>
                      <p style={{ fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", margin: 0 }}>Last Order</p>
                    </div>
                  </div>
                )}
                {customerStats && customerStats.total_orders > 1 && (
                  <details style={{ marginTop: "0.5rem", fontSize: "0.75rem" }}>
                    <summary style={{ cursor: "pointer", color: "#c8a165", fontWeight: 600 }}>View all {customerStats.total_orders} orders</summary>
                    <div style={{ marginTop: "0.375rem", display: "flex", flexDirection: "column", gap: "0.25rem" }}>
                      {customerStats.orders.map((o: any) => (
                        <div key={o.id} style={{ display: "flex", justifyContent: "space-between", padding: "0.25rem 0", borderBottom: "1px solid #f0f0f0" }}>
                          <span style={{ fontWeight: 600 }}>{o.order_number}</span>
                          <span style={{ color: "#666" }}>{fmt(Number(o.total))} · {fmtDate(o.created_at).split(",")[0]}</span>
                        </div>
                      ))}
                    </div>
                  </details>
                )}
              </div>

              {/* Line items */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", display: "block", marginBottom: "0.5rem" }}>Items ({selectedOrder.order_items?.length || 0})</label>
                {selectedOrder.order_items?.map((item) => (
                  <div key={item.id} style={{ padding: "0.75rem", background: "#f7f5f0", borderRadius: "0.5rem", marginBottom: "0.5rem", fontSize: "0.8125rem" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 600 }}>
                      <span>{item.shade_type}</span>
                      <span>{fmt(Number(item.total_price))}</span>
                    </div>
                    <div style={{ color: "#666", marginTop: "0.5rem", lineHeight: 1.8 }}>
                      {item.fabric_name && <div><span style={{ fontWeight: 600, color: "#999", fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Fabric:</span> {item.fabric_name}</div>}
                      <div><span style={{ fontWeight: 600, color: "#999", fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Size:</span> {item.width}{item.width_fraction && item.width_fraction !== '0' ? ` ${item.width_fraction}` : ''}&quot; W × {item.height}{item.height_fraction && item.height_fraction !== '0' ? ` ${item.height_fraction}` : ''}&quot; H</div>
                      {item.shape && item.shape !== 'Standard' && <div><span style={{ fontWeight: 600, color: "#999", fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Shape:</span> {item.shape}</div>}
                      {item.mount_type && <div><span style={{ fontWeight: 600, color: "#999", fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Mount:</span> {item.mount_type}</div>}
                      {item.control_type && <div><span style={{ fontWeight: 600, color: "#999", fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Control:</span> {item.control_type}{item.motor_power ? ` (${item.motor_power})` : ''}</div>}
                      {item.roll_type && <div><span style={{ fontWeight: 600, color: "#999", fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Roll Type:</span> {item.roll_type}</div>}
                      {item.valance_type && item.valance_type !== 'None' && item.valance_type !== 'standard' && <div><span style={{ fontWeight: 600, color: "#999", fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Valance:</span> {item.valance_type}</div>}
                      {item.side_channel_type && item.side_channel_type !== 'none' && <div><span style={{ fontWeight: 600, color: "#999", fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Side Channels:</span> Yes</div>}
                      {(item.motorized_controller || item.motorized_hub || item.motorized_charger || item.sun_sensor) && (
                        <div><span style={{ fontWeight: 600, color: "#999", fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Accessories:</span> {[item.motorized_controller && 'Remote', item.motorized_hub && 'Smart Hub', item.motorized_charger && 'Charger', item.sun_sensor && 'Sun Sensor'].filter(Boolean).join(', ')}</div>
                      )}
                      <div><span style={{ fontWeight: 600, color: "#999", fontSize: "0.6875rem", textTransform: "uppercase", letterSpacing: "0.05em" }}>Qty:</span> {item.quantity}</div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order total */}
              <div style={{ marginBottom: "1.5rem", padding: "1rem", background: "#f7f5f0", borderRadius: "0.5rem" }}>
                {selectedOrder.promo_code && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", marginBottom: "0.5rem", padding: "0.375rem 0.5rem", background: "#fef3c7", borderRadius: "0.25rem", border: "1px solid #fcd34d" }}>
                    <span style={{ fontWeight: 600, color: "#92400e" }}>Promo Code</span><span style={{ fontWeight: 700, color: "#92400e" }}>{selectedOrder.promo_code}</span>
                  </div>
                )}
                {Number(selectedOrder.retail_total) > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", marginBottom: "0.25rem", color: "#999" }}>
                    <span>Retail Price</span><span style={{ textDecoration: "line-through" }}>{fmt(Number(selectedOrder.retail_total))}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", marginBottom: "0.25rem" }}>
                  <span>Subtotal</span><span>{fmt(Number(selectedOrder.subtotal))}</span>
                </div>
                {Number(selectedOrder.sale_savings) > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", marginBottom: "0.25rem", color: "#16a34a", fontWeight: 600 }}>
                    <span>Sale Discount{Number(selectedOrder.sale_percent) > 0 ? ` (${selectedOrder.sale_percent}% off)` : ''}</span><span>-{fmt(Number(selectedOrder.sale_savings))}</span>
                  </div>
                )}
                {Number(selectedOrder.discount) > 0 && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", marginBottom: "0.25rem", color: "#16a34a", fontWeight: 600 }}>
                    <span>Promo Discount</span><span>-{fmt(Number(selectedOrder.discount))}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", marginBottom: "0.25rem" }}>
                  <span>Tax</span><span>{fmt(Number(selectedOrder.tax))}</span>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", marginBottom: "0.5rem" }}>
                  <span>Shipping</span><span>{Number(selectedOrder.shipping) === 0 ? "FREE" : fmt(Number(selectedOrder.shipping))}</span>
                </div>
                {(Number(selectedOrder.sale_savings) > 0 || Number(selectedOrder.discount) > 0) && (
                  <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", marginBottom: "0.5rem", padding: "0.375rem 0.5rem", background: "#dcfce7", borderRadius: "0.25rem", border: "1px solid #86efac" }}>
                    <span style={{ fontWeight: 700, color: "#16a34a" }}>✨ Customer Saved</span>
                    <span style={{ fontWeight: 700, color: "#16a34a" }}>{fmt(Number(selectedOrder.sale_savings || 0) + Number(selectedOrder.discount || 0))}</span>
                  </div>
                )}
                <div style={{ display: "flex", justifyContent: "space-between", fontWeight: 800, fontSize: "1.125rem", borderTop: "1px solid #ddd", paddingTop: "0.5rem" }}>
                  <span>Total</span><span>{fmt(Number(selectedOrder.total))}</span>
                </div>
              </div>

              {/* Tracking */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", display: "block", marginBottom: "0.5rem" }}>Tracking Info</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                  <input
                    type="text"
                    value={trackingNumber}
                    onChange={(e) => setTrackingNumber(e.target.value)}
                    placeholder="Tracking number"
                    style={{ padding: "0.5rem 0.75rem", borderRadius: "0.375rem", border: "1px solid #ddd", fontSize: "0.8125rem" }}
                  />
                  <input
                    type="text"
                    value={trackingUrl}
                    onChange={(e) => setTrackingUrl(e.target.value)}
                    placeholder="Tracking URL (e.g. https://tools.usps.com/...)"
                    style={{ padding: "0.5rem 0.75rem", borderRadius: "0.375rem", border: "1px solid #ddd", fontSize: "0.8125rem" }}
                  />
                  <button
                    onClick={() => updateTracking(selectedOrder.id)}
                    disabled={updating}
                    style={{ padding: "0.5rem 1rem", borderRadius: "0.375rem", background: "#0c0c0c", color: "#fff", border: "none", fontSize: "0.8125rem", cursor: "pointer", fontWeight: 600, opacity: updating ? 0.5 : 1 }}
                  >
                    Save Tracking
                  </button>
                </div>
              </div>

              {/* Status history timeline */}
              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", display: "block", marginBottom: "0.5rem" }}>Status History</label>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  {(selectedOrder.order_status_history || [])
                    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
                    .map((h) => (
                    <div key={h.id} style={{ fontSize: "0.8125rem", display: "flex", gap: "0.75rem", alignItems: "flex-start" }}>
                      <span style={{ width: "6px", height: "6px", borderRadius: "50%", background: STATUS_COLORS[h.status as OrderStatus] || "#999", marginTop: "0.4rem", flexShrink: 0 }} />
                      <div>
                        <span style={{ fontWeight: 600 }}>{STATUS_LABELS[h.status as OrderStatus] || h.status}</span>
                        <span style={{ color: "#999", marginLeft: "0.5rem" }}>{fmtDate(h.created_at)}</span>
                        {h.notes && <p style={{ color: "#666", margin: "0.125rem 0 0", fontSize: "0.75rem" }}>{h.notes}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Stripe info */}
              {selectedOrder.stripe_payment_intent_id && (
                <div style={{ marginBottom: "1.5rem" }}>
                  <label style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", display: "block", marginBottom: "0.5rem" }}>Stripe</label>
                  <p style={{ fontSize: "0.8125rem", color: "#666", margin: 0, wordBreak: "break-all" }}>
                    PI: {selectedOrder.stripe_payment_intent_id}
                  </p>
                </div>
              )}

              {/* Cancel / Refund */}
              {selectedOrder.status !== "cancelled" && (
                <div style={{ borderTop: "1px solid #eee", paddingTop: "1rem", display: "flex", gap: "0.5rem" }}>
                  <button
                    onClick={() => cancelOrder(selectedOrder.id, false)}
                    disabled={updating}
                    style={{ flex: 1, padding: "0.625rem", borderRadius: "0.375rem", background: "#fff", color: "#ef4444", border: "1px solid #ef4444", fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer", opacity: updating ? 0.5 : 1 }}
                  >
                    Cancel Order
                  </button>
                  {selectedOrder.stripe_payment_intent_id && (
                    <button
                      onClick={() => cancelOrder(selectedOrder.id, true)}
                      disabled={updating}
                      style={{ flex: 1, padding: "0.625rem", borderRadius: "0.375rem", background: "#ef4444", color: "#fff", border: "none", fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer", opacity: updating ? 0.5 : 1 }}
                    >
                      Cancel + Refund
                    </button>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
