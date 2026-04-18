"use client";

import { useEffect } from "react";

const CLARITY_PROJECT_ID = "wd2vttf1qj";

export function ClarityScript() {
  useEffect(() => {
    // Only run once, only in browser
    if (typeof window === "undefined") return;
    if ((window as any).clarity) return; // Already loaded

    // Set up the clarity queue function
    (window as any).clarity =
      (window as any).clarity ||
      function () {
        ((window as any).clarity.q = (window as any).clarity.q || []).push(
          arguments
        );
      };

    // Create and inject the Clarity tag script
    const script = document.createElement("script");
    script.async = true;
    script.src = `https://www.clarity.ms/tag/${CLARITY_PROJECT_ID}`;
    document.head.appendChild(script);
  }, []);

  return null;
}
