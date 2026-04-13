"use client";

import { useState, useEffect, useCallback } from "react";

// ─── Types ─────────────────────────────────────────────────
interface Session {
  id: string;
  visitor_id: string;
  session_id: string;
  started_at: string;
  duration_seconds: number;
  landing_page: string;
  utm_source: string | null;
  utm_medium: string | null;
  gclid: string | null;
  device_type: string;
  browser: string;
  furthest_builder_step: number;
  exit_page: string;
  reached_cart: boolean;
  reached_checkout: boolean;
  purchased: boolean;
  purchase_value: number;
  max_scroll_depth: number;
  rage_click_count: number;
  pages_viewed: number;
  ai_insight: string | null;
}

interface Funnel {
  total_sessions: number;
  visited_builder: number;
  step_1_shape: number;
  step_2_dimensions: number;
  step_3_fabric: number;
  step_4_mount: number;
  step_5_control: number;
  reached_cart: number;
  reached_checkout: number;
  purchased: number;
}

interface Insight {
  id: string;
  analysis_type: string;
  date_range_start: string;
  date_range_end: string;
  sessions_analyzed: number;
  insight_text: string;
  funnel_data: any;
  drop_off_points: any[];
  recommendations: any;
  traffic_breakdown: any;
  created_at: string;
}

interface SessionEvent {
  id: string;
  event_name: string;
  event_data: any;
  page: string;
  timestamp: string;
  step_number: number | null;
  time_on_step_seconds: number | null;
}

const PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "wws-admin-2026";
const hdrs: Record<string, string> = { "Content-Type": "application/json", "x-admin-password": PASS };

// ─── Funnel Bar ────────────────────────────────────────────
function FunnelBar({ label, count, total, prev }: { label: string; count: number; total: number; prev: number }) {
  const pct = total > 0 ? Math.round((count / total) * 100) : 0;
  const dropOff = prev > 0 ? Math.round(((prev - count) / prev) * 100) : 0;
  const width = total > 0 ? Math.max(4, (count / total) * 100) : 0;
  return (
    <div style={{ marginBottom: "0.5rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.8125rem", marginBottom: "0.25rem" }}>
        <span style={{ fontWeight: 600, color: "#0c0c0c" }}>{label}</span>
        <span style={{ color: "#6b7280" }}>
          {count} <span style={{ fontSize: "0.6875rem" }}>({pct}%)</span>
          {dropOff > 0 && prev !== total && (
            <span style={{ color: "#ef4444", marginLeft: "0.5rem", fontSize: "0.6875rem" }}>▼ {dropOff}% drop</span>
          )}
        </span>
      </div>
      <div style={{ background: "#f3f0eb", borderRadius: "4px", height: "24px", overflow: "hidden" }}>
        <div
          style={{
            width: `${width}%`,
            height: "100%",
            background: count === 0 ? "#e5e7eb" : "linear-gradient(90deg, #c8a165, #b8895a)",
            borderRadius: "4px",
            transition: "width 0.5s ease",
          }}
        />
      </div>
    </div>
  );
}

// ─── Step Config Formatter ─────────────────────────────────
function formatStepData(event: SessionEvent): React.ReactNode | null {
  const d = event.event_data;
  if (!d || Object.keys(d).length === 0) return null;
  const name = event.event_name;

  // Step completed events with config
  if (name === "bh_step_completed") {
    const step = d.step || "";
    if (d.shape) return <span style={{ color: "#0c0c0c" }}>Shape: <strong>{d.shape}</strong></span>;
    if (d.width && d.height) {
      const wStr = d.width_fraction && d.width_fraction !== "0" ? `${d.width} ${d.width_fraction}` : `${d.width}`;
      const hStr = d.height_fraction && d.height_fraction !== "0" ? `${d.height} ${d.height_fraction}` : `${d.height}`;
      return <span style={{ color: "#0c0c0c" }}>Dimensions: <strong>{wStr}&quot; × {hStr}&quot;</strong>{d.custom_dims ? " (specialty)" : ""}</span>;
    }
    if (d.fabric_name) return <span style={{ color: "#0c0c0c" }}>Fabric: <strong>{d.fabric_name}</strong> ({d.fabric_category || d.shade_type || ""})</span>;
    if (d.mount_type) return <span style={{ color: "#0c0c0c" }}>Mount: <strong>{d.mount_type}</strong></span>;
    if (d.mount) return <span style={{ color: "#0c0c0c" }}>Mount: <strong>{d.mount}</strong></span>;
    if (d.control_type) return <span style={{ color: "#0c0c0c" }}>Control: <strong>{d.control_type}</strong>{d.motor_power ? ` (${d.motor_power})` : ""} — {d.control_position || ""} side</span>;
    if (d.control) return <span style={{ color: "#0c0c0c" }}>Control: <strong>{d.control}</strong></span>;
    if (d.valance_type) return <span style={{ color: "#0c0c0c" }}>Valance: <strong>{d.valance_type}</strong> | Channels: <strong>{d.side_channels || "none"}</strong> | Roll: <strong>{d.roll_type || "standard"}</strong></span>;
    if (d.quantity) return <span style={{ color: "#0c0c0c" }}>Quantity: <strong>{d.quantity}</strong></span>;
    if (d.item_count !== undefined) return <span style={{ color: "#16a34a" }}>Added to Cart: <strong>{d.item_count} item(s)</strong> — ${d.total?.toFixed(2) || "0.00"}</span>;
  }

  if (name === "bh_price_shown" && d.price) return <span style={{ color: "#c8a165" }}>Price shown: <strong>${d.price}</strong></span>;
  if (name === "bh_scroll_depth") return <span>Scrolled to <strong>{d.depth}%</strong></span>;
  if (name === "bh_rage_click") return <span style={{ color: "#ef4444" }}>Rage click on <strong>&lt;{d.target}&gt;</strong> at ({d.x}, {d.y})</span>;
  if (name === "bh_page_view") return <span>Navigated to <strong>{d.page}{d.search || ""}</strong></span>;
  if (name === "bh_checkout_started") return <span style={{ color: "#f59e0b" }}>Checkout: <strong>${d.total?.toFixed(2)}</strong> ({d.item_count} items)</span>;
  if (name === "bh_session_end") return <span>Exit from <strong>{d.exit_page}</strong> — {d.duration_seconds}s total, {d.max_scroll_depth}% scroll</span>;

  // Fallback: show raw but trimmed
  const raw = JSON.stringify(d);
  return raw.length > 2 ? <span style={{ color: "#9ca3af" }}>{raw.slice(0, 120)}</span> : null;
}

const EVENT_ICONS: Record<string, string> = {
  bh_step_started: "▶",
  bh_step_completed: "✓",
  bh_page_view: "📄",
  bh_scroll_depth: "📜",
  bh_rage_click: "😤",
  bh_tab_hidden: "👁",
  bh_tab_returned: "👁",
  bh_session_end: "🚪",
  bh_price_shown: "💰",
  bh_checkout_started: "🛒",
  bh_remove_from_cart: "🗑",
  bh_step_backward: "⬅",
  bh_builder_abandoned: "❌",
  bh_swatch_requested: "🎨",
};

const EVENT_COLORS: Record<string, string> = {
  bh_step_completed: "#16a34a",
  bh_rage_click: "#ef4444",
  bh_session_end: "#6b7280",
  bh_checkout_started: "#f59e0b",
  bh_builder_abandoned: "#ef4444",
  bh_price_shown: "#c8a165",
};

// ─── Session Detail Modal ──────────────────────────────────
function SessionDetail({ sessionId, onClose }: { sessionId: string; onClose: () => void }) {
  const [session, setSession] = useState<Session | null>(null);
  const [events, setEvents] = useState<SessionEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/behavior/sessions/${sessionId}`, { headers: hdrs })
      .then((r) => r.json())
      .then((data) => {
        setSession(data.session);
        setEvents(data.events || []);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [sessionId]);

  if (loading) return <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "center" }}><div style={{ background: "#fff", borderRadius: "0.75rem", padding: "2rem", color: "#6b7280" }}>Loading session...</div></div>;
  if (!session) return <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "center" }}><div style={{ background: "#fff", borderRadius: "0.75rem", padding: "2rem", color: "#ef4444" }}>Session not found</div></div>;

  // Extract config summary from step_completed events
  const configSummary: Record<string, any> = {};
  for (const ev of events) {
    if (ev.event_name === "bh_step_completed" && ev.event_data) {
      const d = ev.event_data;
      if (d.shape) configSummary.shape = d.shape;
      if (d.width) {
        const wStr = d.width_fraction && d.width_fraction !== "0" ? `${d.width} ${d.width_fraction}` : `${d.width}`;
        const hStr = d.height_fraction && d.height_fraction !== "0" ? `${d.height} ${d.height_fraction}` : `${d.height}`;
        configSummary.dimensions = `${wStr}" × ${hStr}"`;
      }
      if (d.fabric_name) { configSummary.fabric = d.fabric_name; configSummary.fabricCategory = d.fabric_category || d.shade_type || ""; }
      if (d.mount_type || d.mount) configSummary.mount = d.mount_type || d.mount;
      if (d.control_type || d.control) { configSummary.control = d.control_type || d.control; configSummary.motorPower = d.motor_power || ""; }
      if (d.valance_type) { configSummary.valance = d.valance_type; configSummary.sideChannels = d.side_channels || "none"; }
      if (d.quantity) configSummary.quantity = d.quantity;
      if (d.item_count !== undefined) configSummary.cartTotal = d.total;
    }
  }
  const hasConfig = Object.keys(configSummary).length > 0;

  return (
    <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", justifyContent: "center", alignItems: "flex-start", paddingTop: "2rem", overflow: "auto" }} onClick={onClose}>
      <div style={{ background: "#fff", borderRadius: "0.75rem", maxWidth: "750px", width: "95%", maxHeight: "85vh", overflow: "auto", padding: "1.5rem" }} onClick={(e) => e.stopPropagation()}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem" }}>
          <h2 style={{ fontFamily: "Georgia, serif", fontSize: "1.25rem", fontWeight: 700 }}>Session Detail</h2>
          <button onClick={onClose} style={{ background: "none", border: "none", fontSize: "1.5rem", cursor: "pointer", color: "#6b7280" }}>×</button>
        </div>

        {/* Session summary */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem", marginBottom: "1rem", fontSize: "0.8125rem" }}>
          <div><strong>Visitor:</strong> {session.visitor_id.slice(0, 12)}...</div>
          <div><strong>Device:</strong> {session.device_type} / {session.browser}</div>
          <div><strong>Landing:</strong> {session.landing_page}</div>
          <div><strong>Source:</strong> {session.utm_source || (session.gclid ? "Google Ads" : "Direct")}</div>
          <div><strong>Duration:</strong> {session.duration_seconds}s</div>
          <div><strong>Builder Step:</strong> {session.furthest_builder_step}/8</div>
          <div><strong>Exit Page:</strong> {session.exit_page || "—"}</div>
          <div><strong>Scroll Depth:</strong> {session.max_scroll_depth}%</div>
          <div><strong>Rage Clicks:</strong> {session.rage_click_count}</div>
          <div>
            <strong>Outcome:</strong>{" "}
            {session.purchased ? (
              <span style={{ color: "#16a34a", fontWeight: 700 }}>Purchased (${session.purchase_value})</span>
            ) : session.reached_checkout ? (
              <span style={{ color: "#f59e0b", fontWeight: 700 }}>Abandoned Checkout</span>
            ) : session.reached_cart ? (
              <span style={{ color: "#f97316", fontWeight: 700 }}>Abandoned Cart</span>
            ) : (
              <span style={{ color: "#6b7280" }}>Left Builder</span>
            )}
          </div>
        </div>

        {/* Config summary card */}
        {hasConfig && (
          <div style={{ background: "#faf9f6", border: "1px solid #e5ddd0", borderRadius: "0.5rem", padding: "1rem", marginBottom: "1rem" }}>
            <h3 style={{ fontWeight: 700, fontSize: "0.75rem", color: "#c8a165", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.625rem" }}>Shade Configuration</h3>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.5rem", fontSize: "0.8125rem" }}>
              {configSummary.shape && <div>🔲 Shape: <strong>{configSummary.shape}</strong></div>}
              {configSummary.dimensions && <div>📏 Dimensions: <strong>{configSummary.dimensions}</strong></div>}
              {configSummary.fabric && <div>🎨 Fabric: <strong>{configSummary.fabric}</strong> <span style={{ color: "#9ca3af", fontSize: "0.75rem" }}>({configSummary.fabricCategory})</span></div>}
              {configSummary.mount && <div>🔧 Mount: <strong>{configSummary.mount}</strong></div>}
              {configSummary.control && <div>⚙️ Control: <strong>{configSummary.control}</strong>{configSummary.motorPower ? <span style={{ color: "#9ca3af" }}> ({configSummary.motorPower})</span> : ""}</div>}
              {configSummary.valance && <div>🏠 Valance: <strong>{configSummary.valance}</strong> | Channels: <strong>{configSummary.sideChannels}</strong></div>}
              {configSummary.quantity && <div>🔢 Qty: <strong>{configSummary.quantity}</strong></div>}
              {configSummary.cartTotal !== undefined && <div>🛒 Cart: <strong>${configSummary.cartTotal?.toFixed(2)}</strong></div>}
            </div>
          </div>
        )}

        {/* Event timeline */}
        <h3 style={{ fontWeight: 700, fontSize: "0.875rem", marginBottom: "0.75rem", borderTop: "1px solid #e5ddd0", paddingTop: "1rem" }}>Event Timeline ({events.length} events)</h3>
        <div style={{ maxHeight: "350px", overflow: "auto" }}>
          {events.map((ev, i) => {
            const icon = EVENT_ICONS[ev.event_name] || "•";
            const color = EVENT_COLORS[ev.event_name] || "#0c0c0c";
            const formatted = formatStepData(ev);
            return (
              <div key={ev.id || i} style={{ display: "flex", gap: "0.75rem", padding: "0.5rem 0", borderBottom: "1px solid #f3f0eb", fontSize: "0.75rem" }}>
                <div style={{ color: "#9ca3af", minWidth: "65px", fontFamily: "monospace" }}>
                  {new Date(ev.timestamp).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
                </div>
                <div style={{ minWidth: "20px", textAlign: "center" }}>{icon}</div>
                <div style={{ flex: 1 }}>
                  <span style={{ fontWeight: 600, color }}>
                    {ev.event_name.replace("bh_", "")}
                  </span>
                  {ev.time_on_step_seconds != null && ev.time_on_step_seconds > 0 && (
                    <span style={{ color: "#c8a165", marginLeft: "0.5rem", fontWeight: 600 }}>{ev.time_on_step_seconds}s</span>
                  )}
                  {ev.page && ev.event_name === "bh_page_view" ? null : ev.page ? <span style={{ color: "#d1d5db", marginLeft: "0.5rem" }}>{ev.page}</span> : null}
                  {formatted && <div style={{ marginTop: "0.125rem" }}>{formatted}</div>}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

// ─── Main Dashboard ────────────────────────────────────────
export default function InsightsPage() {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [funnel, setFunnel] = useState<Funnel | null>(null);
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [analyzing, setAnalyzing] = useState(false);
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const [dateFrom, setDateFrom] = useState(() => {
    const d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().slice(0, 10);
  });
  const [dateTo, setDateTo] = useState(() => new Date().toISOString().slice(0, 10));

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const [sessRes, insRes] = await Promise.all([
        fetch(`/api/behavior/sessions?from=${dateFrom}T00:00:00Z&to=${dateTo}T23:59:59Z&limit=100`, { headers: hdrs }),
        fetch("/api/behavior/sessions?limit=1", { headers: { ...hdrs } }), // just for count
      ]);
      const sessData = await sessRes.json();
      setSessions(sessData.sessions || []);
      setFunnel(sessData.funnel || null);

      // Load insights separately from Supabase via a simple inline fetch
      // (We'll use the sessions endpoint data for now)
    } catch (e) {
      console.error("Failed to load:", e);
    }
    setLoading(false);
  }, [dateFrom, dateTo]);

  // Load AI insights
  useEffect(() => {
    fetch("/api/behavior/sessions?limit=1", { headers: hdrs })
      .then(() => {
        // Load insights from Supabase directly through a dedicated fetch
        // For now we'll show the AI analysis from the analyze endpoint
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  const runAnalysis = async () => {
    setAnalyzing(true);
    try {
      const res = await fetch("/api/behavior/analyze", {
        method: "POST",
        headers: hdrs,
        body: JSON.stringify({ from: `${dateFrom}T00:00:00Z`, to: `${dateTo}T23:59:59Z`, manual: true }),
      });
      const data = await res.json();
      if (data.analysis) {
        setInsights((prev) => [
          {
            id: data.insight_id || Date.now().toString(),
            analysis_type: "manual",
            date_range_start: dateFrom,
            date_range_end: dateTo,
            sessions_analyzed: data.sessions_analyzed,
            insight_text: typeof data.analysis === "string" ? data.analysis : data.analysis.summary || "",
            funnel_data: funnel,
            drop_off_points: data.analysis.drop_offs || [],
            recommendations: data.analysis,
            traffic_breakdown: null,
            created_at: new Date().toISOString(),
          },
          ...prev,
        ]);
      }
    } catch (e) {
      console.error("Analysis failed:", e);
    }
    setAnalyzing(false);
  };

  const funnelSteps = funnel
    ? [
        { label: "All Sessions", count: funnel.total_sessions },
        { label: "Step 1: Shape", count: funnel.step_1_shape },
        { label: "Step 2: Dimensions", count: funnel.step_2_dimensions },
        { label: "Step 3: Fabric", count: funnel.step_3_fabric },
        { label: "Step 4: Mount", count: funnel.step_4_mount },
        { label: "Step 5: Control", count: funnel.step_5_control },
        { label: "Added to Cart", count: funnel.reached_cart },
        { label: "Checkout", count: funnel.reached_checkout },
        { label: "Purchased", count: funnel.purchased },
      ]
    : [];

  return (
    <div style={{ padding: "1.5rem", maxWidth: "1200px", margin: "0 auto", fontFamily: "'DM Sans', sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "1.5rem", flexWrap: "wrap", gap: "0.75rem" }}>
        <h1 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", fontWeight: 700, color: "#0c0c0c" }}>Behavior Insights</h1>
        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center", flexWrap: "wrap" }}>
          <input type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} style={{ padding: "0.5rem", border: "1px solid #e5ddd0", borderRadius: "0.375rem", fontSize: "0.8125rem" }} />
          <span style={{ color: "#9ca3af" }}>to</span>
          <input type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} style={{ padding: "0.5rem", border: "1px solid #e5ddd0", borderRadius: "0.375rem", fontSize: "0.8125rem" }} />
          <button onClick={loadData} style={{ padding: "0.5rem 1rem", background: "#0c0c0c", color: "#fff", border: "none", borderRadius: "0.375rem", fontSize: "0.8125rem", fontWeight: 600, cursor: "pointer" }}>
            Refresh
          </button>
          <button
            onClick={runAnalysis}
            disabled={analyzing}
            style={{ padding: "0.5rem 1rem", background: analyzing ? "#9ca3af" : "#c8a165", color: "#fff", border: "none", borderRadius: "0.375rem", fontSize: "0.8125rem", fontWeight: 600, cursor: analyzing ? "wait" : "pointer" }}
          >
            {analyzing ? "Analyzing..." : "🤖 Run AI Analysis"}
          </button>
        </div>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", padding: "3rem", color: "#9ca3af" }}>Loading sessions...</div>
      ) : (
        <>
          {/* ─── Stats Row ──────────────────────────────── */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "0.75rem", marginBottom: "1.5rem" }}>
            {[
              { label: "Sessions", value: funnel?.total_sessions || 0, color: "#0c0c0c" },
              { label: "Reached Builder", value: funnel?.visited_builder || 0, color: "#6366f1" },
              { label: "Added to Cart", value: funnel?.reached_cart || 0, color: "#f59e0b" },
              { label: "Checkout", value: funnel?.reached_checkout || 0, color: "#f97316" },
              { label: "Purchased", value: funnel?.purchased || 0, color: "#16a34a" },
            ].map((stat) => (
              <div key={stat.label} style={{ background: "#fff", border: "1px solid #e5ddd0", borderRadius: "0.5rem", padding: "1rem", textAlign: "center" }}>
                <div style={{ fontSize: "1.5rem", fontWeight: 700, color: stat.color }}>{stat.value}</div>
                <div style={{ fontSize: "0.75rem", color: "#6b7280", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}>{stat.label}</div>
              </div>
            ))}
          </div>

          {/* ─── Funnel + AI Insights Row ───────────────── */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1.5rem" }}>
            {/* Funnel */}
            <div style={{ background: "#fff", border: "1px solid #e5ddd0", borderRadius: "0.5rem", padding: "1.25rem" }}>
              <h2 style={{ fontWeight: 700, fontSize: "0.9375rem", marginBottom: "1rem", color: "#0c0c0c" }}>Conversion Funnel</h2>
              {funnelSteps.map((step, i) => (
                <FunnelBar key={step.label} label={step.label} count={step.count} total={funnel?.total_sessions || 1} prev={i > 0 ? funnelSteps[i - 1].count : step.count} />
              ))}
            </div>

            {/* AI Insights */}
            <div style={{ background: "#fff", border: "1px solid #e5ddd0", borderRadius: "0.5rem", padding: "1.25rem", maxHeight: "500px", overflow: "auto" }}>
              <h2 style={{ fontWeight: 700, fontSize: "0.9375rem", marginBottom: "1rem", color: "#0c0c0c" }}>🤖 AI Insights</h2>
              {insights.length === 0 ? (
                <div style={{ textAlign: "center", padding: "2rem", color: "#9ca3af", fontSize: "0.875rem" }}>
                  No insights yet. Click &quot;Run AI Analysis&quot; to analyze sessions.
                </div>
              ) : (
                insights.map((insight) => (
                  <div key={insight.id} style={{ marginBottom: "1.25rem", paddingBottom: "1rem", borderBottom: "1px solid #f3f0eb" }}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: "0.6875rem", color: "#9ca3af", marginBottom: "0.5rem" }}>
                      <span>{insight.analysis_type} — {insight.sessions_analyzed} sessions</span>
                      <span>{new Date(insight.created_at).toLocaleDateString()}</span>
                    </div>
                    {insight.insight_text && (
                      <p style={{ fontSize: "0.8125rem", color: "#0c0c0c", lineHeight: 1.5, marginBottom: "0.75rem" }}>{insight.insight_text}</p>
                    )}
                    {insight.recommendations?.biggest_leak && (
                      <div style={{ background: "#fef2f2", border: "1px solid #fecaca", borderRadius: "0.375rem", padding: "0.75rem", fontSize: "0.75rem", marginBottom: "0.5rem" }}>
                        <strong style={{ color: "#dc2626" }}>Biggest Leak:</strong> {insight.recommendations.biggest_leak.step} — {insight.recommendations.biggest_leak.drop_off_pct}% drop-off. {insight.recommendations.biggest_leak.likely_cause}
                      </div>
                    )}
                    {insight.recommendations?.ux && (
                      <div style={{ fontSize: "0.75rem", color: "#374151" }}>
                        <strong>Recommendations:</strong>
                        <ul style={{ margin: "0.25rem 0 0 1rem", padding: 0 }}>
                          {(insight.recommendations.ux as string[]).slice(0, 5).map((r, i) => (
                            <li key={i} style={{ marginBottom: "0.25rem" }}>{r}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                    {insight.recommendations?.ab_tests && (
                      <div style={{ fontSize: "0.75rem", color: "#374151", marginTop: "0.5rem" }}>
                        <strong>A/B Tests:</strong>
                        <ul style={{ margin: "0.25rem 0 0 1rem", padding: 0 }}>
                          {(insight.recommendations.ab_tests as any[]).slice(0, 3).map((t, i) => (
                            <li key={i} style={{ marginBottom: "0.25rem" }}><strong>{t.test}:</strong> {t.hypothesis}</li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>

          {/* ─── Session Explorer ───────────────────────── */}
          <div style={{ background: "#fff", border: "1px solid #e5ddd0", borderRadius: "0.5rem", padding: "1.25rem" }}>
            <h2 style={{ fontWeight: 700, fontSize: "0.9375rem", marginBottom: "1rem", color: "#0c0c0c" }}>Session Explorer ({sessions.length} sessions)</h2>
            <div style={{ overflow: "auto" }}>
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: "0.75rem" }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #e5ddd0", textAlign: "left" }}>
                    <th style={{ padding: "0.5rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", fontSize: "0.625rem", letterSpacing: "0.05em" }}>Time</th>
                    <th style={{ padding: "0.5rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", fontSize: "0.625rem" }}>Source</th>
                    <th style={{ padding: "0.5rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", fontSize: "0.625rem" }}>Device</th>
                    <th style={{ padding: "0.5rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", fontSize: "0.625rem" }}>Landing</th>
                    <th style={{ padding: "0.5rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", fontSize: "0.625rem" }}>Steps</th>
                    <th style={{ padding: "0.5rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", fontSize: "0.625rem" }}>Duration</th>
                    <th style={{ padding: "0.5rem", fontWeight: 700, color: "#6b7280", textTransform: "uppercase", fontSize: "0.625rem" }}>Outcome</th>
                  </tr>
                </thead>
                <tbody>
                  {sessions.map((s) => (
                    <tr
                      key={s.session_id}
                      onClick={() => setSelectedSession(s.session_id)}
                      style={{ borderBottom: "1px solid #f3f0eb", cursor: "pointer", transition: "background 0.1s" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#faf9f6")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "transparent")}
                    >
                      <td style={{ padding: "0.5rem", whiteSpace: "nowrap" }}>
                        {new Date(s.started_at).toLocaleDateString("en-US", { month: "short", day: "numeric" })}{" "}
                        {new Date(s.started_at).toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                      </td>
                      <td style={{ padding: "0.5rem" }}>
                        <span style={{
                          display: "inline-block",
                          padding: "0.125rem 0.5rem",
                          borderRadius: "999px",
                          fontSize: "0.625rem",
                          fontWeight: 700,
                          background: s.gclid ? "#dbeafe" : s.utm_source ? "#fef3c7" : "#f3f4f6",
                          color: s.gclid ? "#1d4ed8" : s.utm_source ? "#92400e" : "#6b7280",
                        }}>
                          {s.gclid ? "Google Ads" : s.utm_source || "Direct"}
                        </span>
                      </td>
                      <td style={{ padding: "0.5rem" }}>{s.device_type}</td>
                      <td style={{ padding: "0.5rem", maxWidth: "150px", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{s.landing_page}</td>
                      <td style={{ padding: "0.5rem", textAlign: "center" }}>
                        <span style={{ fontWeight: 700, color: s.furthest_builder_step >= 5 ? "#16a34a" : s.furthest_builder_step >= 3 ? "#f59e0b" : "#6b7280" }}>
                          {s.furthest_builder_step}/8
                        </span>
                      </td>
                      <td style={{ padding: "0.5rem" }}>{s.duration_seconds ? `${s.duration_seconds}s` : "—"}</td>
                      <td style={{ padding: "0.5rem" }}>
                        {s.purchased ? (
                          <span style={{ color: "#16a34a", fontWeight: 700 }}>✓ ${s.purchase_value}</span>
                        ) : s.reached_checkout ? (
                          <span style={{ color: "#f59e0b", fontWeight: 600 }}>Checkout</span>
                        ) : s.reached_cart ? (
                          <span style={{ color: "#f97316", fontWeight: 600 }}>Cart</span>
                        ) : (
                          <span style={{ color: "#9ca3af" }}>Left</span>
                        )}
                      </td>
                    </tr>
                  ))}
                  {sessions.length === 0 && (
                    <tr>
                      <td colSpan={7} style={{ padding: "2rem", textAlign: "center", color: "#9ca3af" }}>
                        No sessions found for this date range. Visitors will appear here once the tracker is live.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </>
      )}

      {/* Session Detail Modal */}
      {selectedSession && <SessionDetail sessionId={selectedSession} onClose={() => setSelectedSession(null)} />}
    </div>
  );
}
