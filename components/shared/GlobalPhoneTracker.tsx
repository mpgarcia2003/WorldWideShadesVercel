"use client";

import { useEffect } from "react";
import { trackPhoneClick } from "@/lib/gtm/events";

export function GlobalPhoneTracker() {
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as HTMLElement;
      const link = target.closest('a[href^="tel:"]') as HTMLAnchorElement;
      if (link) {
        // Try to determine location from nearest section or data attribute
        const section = link.closest("section, header, footer, [data-track-location]");
        const location = section?.getAttribute("data-track-location")
          || section?.tagName.toLowerCase()
          || "unknown";
        trackPhoneClick(location);
      }
    }

    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
  }, []);

  return null;
}
