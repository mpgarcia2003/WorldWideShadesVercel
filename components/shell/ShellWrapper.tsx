"use client";

import { usePathname } from "next/navigation";
import { AnnouncementBar } from "@/components/shell/AnnouncementBar";
import { Footer } from "@/components/shell/Footer";
import { Header } from "@/components/shell/Header";

/**
 * ShellWrapper
 * ──────────────────────────────────────────────────────────
 * Route-aware shell controller. Routes that have their own page-level
 * chrome (like /builder's full-screen layout or /checkout's focused
 * header) hide the global shell elements to avoid duplicate UI.
 *
 * Hidden-shell routes:
 *   /builder   → uses its own visualizer/stepper layout, no nav/footer
 *   /checkout  → uses its own minimal CheckoutHeader for focused conversion;
 *                hiding the global Header prevents the duplicate "World Wide
 *                Shades" logo bug. Footer also hidden during payment to
 *                reduce distraction.
 */
export function ShellWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Routes where the global shell (announcement / header / footer) is suppressed
  // because the page provides its own chrome.
  const hideShell = pathname === "/builder" || pathname === "/checkout";

  return (
    <>
      {!hideShell && <AnnouncementBar />}
      {!hideShell && <Header />}
      {children}
      {!hideShell && <Footer />}
    </>
  );
}
