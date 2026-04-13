import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

export const metadata: Metadata = {
  title: "Custom Blackout Roller Shades | 100% Light Blocking Window Shades",
  description: "Custom blackout roller shades built to your exact windows. 200+ premium blackout fabrics, factory-direct pricing from $250. Ships in 7 days. 100% Fit Guarantee. Made in USA.",
  alternates: { canonical: `https://${SITE.domain}/blackout-roller-shades` },
  openGraph: {
    title: "Custom Blackout Roller Shades | World Wide Shades",
    description: "100% light-blocking blackout window shades, custom-built to your exact measurements. 200+ premium fabrics. Ships in 7 days. From $250.",
    type: "website",
    url: `https://${SITE.domain}/blackout-roller-shades`,
  },
};

export default function BlackoutLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
