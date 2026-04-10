"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function RecoverCartPage() {
  const params = useParams();
  const id = params?.id as string;
  const [status, setStatus] = useState<"loading" | "restored" | "error">("loading");
  const [destination, setDestination] = useState<"checkout" | "builder">("checkout");

  useEffect(() => {
    if (!id) { setStatus("error"); return; }

    async function restore() {
      try {
        const res = await fetch(`/api/abandoned-carts/${id}`);
        if (!res.ok) { setStatus("error"); return; }
        const data = await res.json();

        // Mark lead as captured so popup doesn't show again
        if (data.email) localStorage.setItem("wws_lead_captured", data.email);

        const items = data.cart_data;
        const isFromBuilder = data.page === "builder" || data.page === "builder_exit_intent";

        if (items && Array.isArray(items) && items.length > 0) {
          // Check if this is a builder config (has config.shape/shadeType but no config.material.id)
          // vs a full cart item (has config.material object, proper totalPrice, etc.)
          const firstItem = items[0];
          const isBuilderConfig = firstItem.config && 
            (firstItem.config.shape || firstItem.config.shadeType) && 
            !firstItem.config?.material?.id && 
            !firstItem.id;

          if (isBuilderConfig || isFromBuilder) {
            // Restore builder configuration so they continue where they left off
            const builderConfig = firstItem.config || firstItem;
            localStorage.setItem("wws_builder_config", JSON.stringify(builderConfig));
            // Set editing flag so builder restores ALL fields (width, height, fabric, etc.)
            localStorage.setItem("wws_editing_item", "recovery");
            setDestination("builder");
            setStatus("restored");
            setTimeout(() => { window.location.href = "/builder"; }, 1500);
          } else {
            // Full cart items — restore to cart and go to checkout
            localStorage.setItem("wws_cart_v1", JSON.stringify(items));
            setDestination("checkout");
            setStatus("restored");
            setTimeout(() => { window.location.href = "/checkout"; }, 1500);
          }
        } else {
          // No cart data — send to builder
          setDestination("builder");
          setStatus("restored");
          setTimeout(() => { window.location.href = "/builder"; }, 1500);
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
            <h1 style={{ fontFamily: "Georgia, serif", fontSize: "1.5rem", color: "#0c0c0c", marginBottom: "0.5rem" }}>
              {destination === "builder" ? "Configuration Restored!" : "Cart Restored!"}
            </h1>
            <p style={{ color: "#6b7280", fontSize: "0.9375rem" }}>
              {destination === "builder" 
                ? "Redirecting you to the shade builder to continue where you left off..." 
                : "Redirecting you to checkout..."}
            </p>
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
