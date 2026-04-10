"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function RecoverCartPage() {
  const params = useParams();
  const id = params?.id as string;
  const [status, setStatus] = useState<"loading" | "restored" | "error">("loading");

  useEffect(() => {
    if (!id) { setStatus("error"); return; }

    async function restore() {
      try {
        const res = await fetch(`/api/abandoned-carts/${id}`);
        if (!res.ok) { setStatus("error"); return; }
        const data = await res.json();

        if (data.cart_data && Array.isArray(data.cart_data) && data.cart_data.length > 0) {
          // Restore cart to localStorage
          localStorage.setItem("wws_cart_v1", JSON.stringify(data.cart_data));
          // Mark lead as captured so popup doesn't show again
          localStorage.setItem("wws_lead_captured", data.email || "");
          setStatus("restored");
          // Redirect to checkout if they had items, otherwise builder
          setTimeout(() => {
            window.location.href = "/checkout";
          }, 1500);
        } else {
          // No cart data — send to builder
          setStatus("restored");
          setTimeout(() => {
            window.location.href = "/builder";
          }, 1500);
        }
      } catch {
        setStatus("error");
      }
    }

    restore();
  }, [id]);

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", background: "#faf9f6" }}>
      <div style={{ textAlign: "center", maxWidth: "400px", padding: "2rem" }}>
        {status === "loading" && (
          <>
            <div style={{ fontSize: "2rem", marginBottom: "1rem", animation: "spin 1s linear infinite" }}>⟳</div>
            <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", color: "#0c0c0c", marginBottom: "0.5rem" }}>Restoring Your Shades</h1>
            <p style={{ color: "#6b7280", fontSize: "0.9375rem" }}>Loading your saved configuration...</p>
          </>
        )}
        {status === "restored" && (
          <>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>✓</div>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", color: "#0c0c0c", marginBottom: "0.5rem" }}>Cart Restored!</h1>
            <p style={{ color: "#6b7280", fontSize: "0.9375rem" }}>Redirecting you to checkout...</p>
          </>
        )}
        {status === "error" && (
          <>
            <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>😔</div>
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", color: "#0c0c0c", marginBottom: "0.5rem" }}>Link Expired</h1>
            <p style={{ color: "#6b7280", fontSize: "0.9375rem", marginBottom: "1.5rem" }}>This recovery link is no longer available. Start a new design instead.</p>
            <a href="/builder" style={{ display: "inline-block", padding: "0.75rem 2rem", background: "linear-gradient(135deg, #c8a165, #b8895a)", color: "#fff", borderRadius: "0.5rem", fontWeight: 600, textDecoration: "none" }}>Design Your Shade</a>
          </>
        )}
      </div>
    </div>
  );
}
