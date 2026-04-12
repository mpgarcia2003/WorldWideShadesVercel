"use client";

import { useState, useEffect, useCallback } from "react";

interface CustomerOrder {
  id: string;
  order_number: string;
  total: number;
  status: string;
  created_at: string;
}

interface Customer {
  email: string;
  first_name: string;
  last_name: string;
  phone: string;
  address1: string;
  address2: string;
  city: string;
  state: string;
  zip: string;
  total_orders: number;
  total_spent: number;
  first_order_date: string;
  last_order_date: string;
  orders: CustomerOrder[];
}

const STATUS_COLORS: Record<string, string> = {
  received: "#3b82f6",
  in_production: "#f59e0b",
  quality_check: "#8b5cf6",
  shipped: "#06b6d4",
  delivered: "#22c55e",
  cancelled: "#ef4444",
};

const STATUS_LABELS: Record<string, string> = {
  received: "Received",
  in_production: "In Production",
  quality_check: "QC",
  shipped: "Shipped",
  delivered: "Delivered",
  cancelled: "Cancelled",
};

function fmt(n: number) {
  return "$" + n.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function fmtDate(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric",
  });
}

function fmtDateFull(d: string) {
  return new Date(d).toLocaleDateString("en-US", {
    month: "short", day: "numeric", year: "numeric", hour: "numeric", minute: "2-digit",
  });
}

export default function AdminCustomersPage() {
  const password = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "wws-admin-2026";

  const [customers, setCustomers] = useState<Customer[]>([]);
  const [loading, setLoading] = useState(false);
  const [total, setTotal] = useState(0);
  const [search, setSearch] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [sortBy, setSortBy] = useState<"last_order" | "total_spent" | "total_orders" | "name">("last_order");

  const adminHeaders = {
    "Content-Type": "application/json",
    "x-admin-password": password,
  };

  const fetchCustomers = useCallback(async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.set("search", search);
      const res = await fetch(`/api/customers?${params}`, { headers: adminHeaders });
      if (res.status === 401) return;
      const data = await res.json();
      if (data.customers) {
        setCustomers(data.customers);
        setTotal(data.total || 0);
      }
    } catch {
      console.error("Failed to fetch customers");
    }
    setLoading(false);
  }, [search]);

  useEffect(() => { fetchCustomers(); }, [fetchCustomers]);

  const sortedCustomers = [...customers].sort((a, b) => {
    if (sortBy === "total_spent") return b.total_spent - a.total_spent;
    if (sortBy === "total_orders") return b.total_orders - a.total_orders;
    if (sortBy === "name") return (a.first_name + a.last_name).localeCompare(b.first_name + b.last_name);
    return new Date(b.last_order_date).getTime() - new Date(a.last_order_date).getTime();
  });

  const totalCustomers = customers.length;
  const totalRevenue = customers.reduce((s, c) => s + c.total_spent, 0);
  const repeatCustomers = customers.filter((c) => c.total_orders > 1).length;
  const avgOrderValue = customers.length > 0 ? totalRevenue / customers.reduce((s, c) => s + c.total_orders, 0) : 0;

  return (
    <div style={{ fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ padding: "1.5rem 2rem", maxWidth: "1400px", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1rem", marginBottom: "1.5rem" }}>
          {[
            { label: "Total Customers", value: totalCustomers, color: "#0c0c0c" },
            { label: "Repeat Customers", value: repeatCustomers, color: "#8b5cf6" },
            { label: "Total Revenue", value: fmt(totalRevenue), color: "#22c55e" },
            { label: "Avg Order Value", value: fmt(avgOrderValue), color: "#f59e0b" },
          ].map((s) => (
            <div key={s.label} style={{ background: "#fff", borderRadius: "0.75rem", padding: "1.25rem", border: "1px solid #ede9e0" }}>
              <p style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", marginBottom: "0.25rem" }}>{s.label}</p>
              <p style={{ fontSize: "1.5rem", fontWeight: 800, color: s.color, margin: 0 }}>{s.value}</p>
            </div>
          ))}
        </div>

        <div style={{ display: "flex", gap: "0.75rem", marginBottom: "1rem", flexWrap: "wrap", alignItems: "center" }}>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value as any)}
            style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid #ddd", fontSize: "0.875rem", background: "#fff" }}>
            <option value="last_order">Last Order (Recent)</option>
            <option value="total_spent">Highest Spend</option>
            <option value="total_orders">Most Orders</option>
            <option value="name">Name (A-Z)</option>
          </select>
          <form onSubmit={(e) => { e.preventDefault(); setSearch(searchInput); }} style={{ display: "flex", gap: "0.5rem" }}>
            <input type="text" value={searchInput} onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search name, email, phone, city..."
              style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", border: "1px solid #ddd", fontSize: "0.875rem", width: "280px" }}
            />
            <button type="submit" style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "#0c0c0c", color: "#fff", border: "none", fontSize: "0.8125rem", cursor: "pointer" }}>Search</button>
          </form>
          <button onClick={fetchCustomers} style={{ padding: "0.5rem 1rem", borderRadius: "0.5rem", background: "#fff", border: "1px solid #ddd", fontSize: "0.8125rem", cursor: "pointer" }}>↻ Refresh</button>
          <p style={{ fontSize: "0.8125rem", color: "#999", marginLeft: "auto" }}>{total} customer{total !== 1 ? "s" : ""}</p>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: selectedCustomer ? "1fr 1fr" : "1fr", gap: "1.5rem" }}>
          <div>
            {loading ? (
              <div style={{ textAlign: "center", padding: "3rem", color: "#999" }}>Loading customers...</div>
            ) : sortedCustomers.length === 0 ? (
              <div style={{ textAlign: "center", padding: "3rem", background: "#fff", borderRadius: "0.75rem", border: "1px solid #ede9e0" }}>
                <p style={{ fontSize: "1rem", color: "#666" }}>No customers found</p>
              </div>
            ) : (
              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {sortedCustomers.map((c) => (
                  <div key={c.email} onClick={() => setSelectedCustomer(c)}
                    style={{
                      background: selectedCustomer?.email === c.email ? "#fdf9f5" : "#fff",
                      borderRadius: "0.5rem", padding: "1rem 1.25rem",
                      border: `1px solid ${selectedCustomer?.email === c.email ? "#c8a165" : "#ede9e0"}`,
                      cursor: "pointer", transition: "border-color 0.15s",
                    }}>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.375rem" }}>
                      <div>
                        <span style={{ fontWeight: 700, fontSize: "0.9375rem" }}>{c.first_name} {c.last_name}</span>
                        {!c.first_name && !c.last_name && <span style={{ fontWeight: 700, fontSize: "0.9375rem", color: "#999" }}>No Name</span>}
                      </div>
                      <span style={{ fontSize: "1rem", fontWeight: 800, color: "#22c55e" }}>{fmt(c.total_spent)}</span>
                    </div>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", color: "#666" }}>
                      <span>{c.email}</span>
                      <span>{c.total_orders} order{c.total_orders !== 1 ? "s" : ""}</span>
                    </div>
                    <div style={{ fontSize: "0.75rem", color: "#999", marginTop: "0.25rem" }}>
                      {c.city && <span>{c.city}, {c.state} · </span>}
                      Last order: {fmtDate(c.last_order_date)}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {selectedCustomer && (
            <div style={{ background: "#fff", borderRadius: "0.75rem", border: "1px solid #ede9e0", padding: "1.5rem", position: "sticky", top: "5rem", maxHeight: "calc(100vh - 7rem)", overflowY: "auto" }}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.5rem" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 700, margin: 0 }}>{selectedCustomer.first_name} {selectedCustomer.last_name}</h2>
                <button onClick={() => setSelectedCustomer(null)} style={{ background: "none", border: "none", fontSize: "1.25rem", cursor: "pointer", color: "#999" }}>✕</button>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", display: "block", marginBottom: "0.5rem" }}>Contact Information</label>
                <div style={{ background: "#f7f5f0", borderRadius: "0.5rem", padding: "0.75rem", fontSize: "0.8125rem", color: "#666", lineHeight: 1.8 }}>
                  <div>✉️ {selectedCustomer.email}</div>
                  {selectedCustomer.phone && <div>📞 {selectedCustomer.phone}</div>}
                  {selectedCustomer.address1 && (
                    <>
                      <div>📍 {[selectedCustomer.address1, selectedCustomer.address2].filter(Boolean).join(", ")}</div>
                      <div style={{ paddingLeft: "1.5rem" }}>{[selectedCustomer.city, selectedCustomer.state, selectedCustomer.zip].filter(Boolean).join(", ")}</div>
                    </>
                  )}
                </div>
              </div>

              <div style={{ marginBottom: "1.5rem" }}>
                <label style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", display: "block", marginBottom: "0.5rem" }}>Customer Stats</label>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem" }}>
                  <div style={{ background: "#f7f5f0", borderRadius: "0.375rem", padding: "0.75rem", textAlign: "center" }}>
                    <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#0c0c0c", margin: 0 }}>{selectedCustomer.total_orders}</p>
                    <p style={{ fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", margin: 0 }}>Total Orders</p>
                  </div>
                  <div style={{ background: "#f7f5f0", borderRadius: "0.375rem", padding: "0.75rem", textAlign: "center" }}>
                    <p style={{ fontSize: "1.5rem", fontWeight: 800, color: "#22c55e", margin: 0 }}>{fmt(selectedCustomer.total_spent)}</p>
                    <p style={{ fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", margin: 0 }}>Lifetime Value</p>
                  </div>
                  <div style={{ background: "#f7f5f0", borderRadius: "0.375rem", padding: "0.75rem", textAlign: "center" }}>
                    <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0c0c0c", margin: 0 }}>{fmtDate(selectedCustomer.first_order_date)}</p>
                    <p style={{ fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", margin: 0 }}>First Order</p>
                  </div>
                  <div style={{ background: "#f7f5f0", borderRadius: "0.375rem", padding: "0.75rem", textAlign: "center" }}>
                    <p style={{ fontSize: "0.875rem", fontWeight: 700, color: "#0c0c0c", margin: 0 }}>{fmtDate(selectedCustomer.last_order_date)}</p>
                    <p style={{ fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", margin: 0 }}>Last Order</p>
                  </div>
                </div>
              </div>

              <div>
                <label style={{ fontSize: "0.6875rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.08em", color: "#999", display: "block", marginBottom: "0.5rem" }}>
                  Order History ({selectedCustomer.orders.length})
                </label>
                <div style={{ display: "flex", flexDirection: "column", gap: "0.375rem" }}>
                  {selectedCustomer.orders.map((o) => (
                    <a key={o.id} href="/admin/orders" style={{ textDecoration: "none", color: "inherit" }}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "0.625rem 0.75rem", background: "#f7f5f0", borderRadius: "0.375rem", fontSize: "0.8125rem" }}>
                        <div>
                          <span style={{ fontWeight: 700 }}>{o.order_number}</span>
                          <span style={{ color: "#999", marginLeft: "0.5rem" }}>{fmtDateFull(o.created_at)}</span>
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                          <span style={{
                            fontSize: "0.625rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em",
                            padding: "0.15rem 0.4rem", borderRadius: "0.2rem",
                            background: (STATUS_COLORS[o.status] || "#999") + "18", color: STATUS_COLORS[o.status] || "#999",
                          }}>
                            {STATUS_LABELS[o.status] || o.status}
                          </span>
                          <span style={{ fontWeight: 700 }}>{fmt(Number(o.total))}</span>
                        </div>
                      </div>
                    </a>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
