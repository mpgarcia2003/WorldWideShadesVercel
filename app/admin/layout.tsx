"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const PASS = process.env.NEXT_PUBLIC_ADMIN_PASSWORD || "wws-admin-2026";
const AUTH_KEY = "wws_admin_auth";

const TABS = [
  { label: "Orders", href: "/admin/orders" },
  { label: "Customers", href: "/admin/customers" },
  { label: "Abandoned Carts", href: "/admin/abandoned" },
  { label: "Insights", href: "/admin/insights" },
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [authed, setAuthed] = useState(false);
  const [pw, setPw] = useState("");
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    // Check if already authenticated this session
    if (sessionStorage.getItem(AUTH_KEY) === "true") {
      setAuthed(true);
    }
    setChecking(false);
  }, []);

  function handleLogin() {
    if (pw === PASS) {
      setAuthed(true);
      sessionStorage.setItem(AUTH_KEY, "true");
    }
  }

  if (checking) return null;

  if (!authed) {
    return (
      <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", background: "#faf9f6" }}>
        <div style={{ background: "#fff", padding: "2.5rem", borderRadius: "0.75rem", border: "1px solid #e5ddd0", width: "100%", maxWidth: "380px", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}>
          <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", fontWeight: 700, color: "#0c0c0c", marginBottom: "0.25rem" }}>World Wide Shades</h1>
            <p style={{ fontSize: "0.875rem", color: "#9ca3af" }}>Admin Dashboard</p>
          </div>
          <input
            type="password"
            placeholder="Admin password"
            value={pw}
            onChange={(e) => setPw(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleLogin()}
            style={{ width: "100%", padding: "0.875rem 1rem", border: "1px solid #e5ddd0", borderRadius: "0.5rem", marginBottom: "0.75rem", fontSize: "0.9375rem", outline: "none", fontFamily: "'DM Sans', sans-serif" }}
          />
          <button
            onClick={handleLogin}
            style={{ width: "100%", padding: "0.875rem", background: "#0c0c0c", color: "#fff", border: "none", borderRadius: "0.5rem", fontWeight: 600, fontSize: "0.9375rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
          >
            Login
          </button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: "100vh", background: "#faf9f6", fontFamily: "'DM Sans', sans-serif" }}>
      {/* Top nav */}
      <div style={{ background: "#0c0c0c", padding: "0 1.5rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <div style={{ display: "flex", alignItems: "center", gap: "0" }}>
          <span style={{ color: "#c8a165", fontFamily: "Georgia, serif", fontWeight: 700, fontSize: "1rem", marginRight: "2rem", padding: "0.875rem 0" }}>WWS Admin</span>
          {TABS.map((tab) => {
            const isActive = pathname === tab.href;
            return (
              <Link
                key={tab.href}
                href={tab.href}
                style={{
                  padding: "0.875rem 1.25rem",
                  fontSize: "0.8125rem",
                  fontWeight: 600,
                  color: isActive ? "#fff" : "#9ca3af",
                  textDecoration: "none",
                  borderBottom: isActive ? "2px solid #c8a165" : "2px solid transparent",
                  transition: "all 0.15s",
                }}
              >
                {tab.label}
              </Link>
            );
          })}
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <a href="/" style={{ color: "#9ca3af", fontSize: "0.75rem", textDecoration: "none" }}>← Back to Site</a>
          <button
            onClick={() => { sessionStorage.removeItem(AUTH_KEY); setAuthed(false); }}
            style={{ color: "#9ca3af", fontSize: "0.75rem", background: "none", border: "none", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* Page content — rendered by child routes */}
      {children}
    </div>
  );
}
