"use client";

import { useState } from "react";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    if (!email || !password) { setError("Please enter your email and password."); return; }
    setLoading(true);
    setError("");
    // TODO: Replace with Supabase Auth signInWithPassword
    await new Promise((r) => setTimeout(r, 1000));
    // Demo: store auth flag and redirect
    localStorage.setItem("wws_auth", JSON.stringify({ email, name: email.split("@")[0] }));
    window.location.href = "/account";
  }

  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#faf9f6", fontFamily: "'DM Sans', sans-serif", display: "flex", flexDirection: "column" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700;800&family=DM+Sans:wght@400;500;600;700;800&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        .auth-input { width:100%; padding:0.875rem 1rem; border:1px solid #e5ddd0; border-radius:0.5rem; background:#fff; color:#0c0c0c; font-size:1rem; font-family:'DM Sans',sans-serif; }
        .auth-input:focus { outline:none; border-color:#c8a165; box-shadow:0 0 0 3px rgba(200,161,101,0.18); }
        .auth-input::placeholder { color:#9ca3af; }
      `}</style>

      <header style={{ background: "#0c0c0c", padding: "1.25rem 0" }}>
        <div style={{ maxWidth: "500px", margin: "0 auto", padding: "0 1.5rem", display: "flex", justifyContent: "center" }}>
          <a href="/" style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.25rem", fontWeight: 700, color: "#c8a165", textDecoration: "none" }}>World Wide Shades</a>
        </div>
      </header>

      <main style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", padding: "2rem 1.5rem" }}>
        <div style={{ width: "100%", maxWidth: "420px" }}>
          <div style={{ textAlign: "center", marginBottom: "2rem" }}>
            <h1 style={{ fontFamily: "'Playfair Display', Georgia, serif", fontSize: "1.75rem", fontWeight: 700, color: "#0c0c0c", marginBottom: "0.5rem" }}>Welcome Back</h1>
            <p style={{ color: "#6b7280", fontSize: "0.9375rem" }}>Sign in to view your orders and account.</p>
          </div>

          <form onSubmit={handleLogin} style={{ background: "#fff", border: "1px solid #e5ddd0", borderRadius: "0.75rem", padding: "2rem" }}>
            <div style={{ marginBottom: "1rem" }}>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#0c0c0c", marginBottom: "0.375rem" }}>Email</label>
              <input className="auth-input" type="email" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} autoComplete="email" />
            </div>
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={{ display: "block", fontSize: "0.8125rem", fontWeight: 600, color: "#0c0c0c", marginBottom: "0.375rem" }}>Password</label>
              <input className="auth-input" type="password" placeholder="\u2022\u2022\u2022\u2022\u2022\u2022\u2022\u2022" value={password} onChange={(e) => setPassword(e.target.value)} autoComplete="current-password" />
            </div>
            {error && <p style={{ color: "#dc2626", fontSize: "0.875rem", marginBottom: "0.75rem" }}>{error}</p>}
            <button type="submit" disabled={loading} style={{ width: "100%", padding: "1rem", background: "linear-gradient(135deg, #c8a165, #b8895a)", color: "#fff", border: "none", borderRadius: "0.5rem", fontSize: "1rem", fontWeight: 700, cursor: loading ? "not-allowed" : "pointer", fontFamily: "'DM Sans', sans-serif", opacity: loading ? 0.75 : 1 }}>
              {loading ? "Signing in\u2026" : "Sign In"}
            </button>
          </form>

          <p style={{ textAlign: "center", marginTop: "1.5rem", fontSize: "0.875rem", color: "#6b7280" }}>
            Don&apos;t have an account? <a href="/account/register" style={{ color: "#c8a165", fontWeight: 600, textDecoration: "none" }}>Create one</a>
          </p>
        </div>
      </main>
    </div>
  );
}
