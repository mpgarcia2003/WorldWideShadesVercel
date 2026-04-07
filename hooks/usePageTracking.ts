"use client";
import { useEffect } from "react";
import { usePathname } from "next/navigation";

export function usePageTracking() {
  const pathname = usePathname();
  useEffect(() => {
    if (typeof window !== "undefined") {
      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({ event: "virtual_page_view", page_path: pathname });
    }
  }, [pathname]);
}
