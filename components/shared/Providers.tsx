"use client";
import { usePageTracking } from "@/hooks/usePageTracking";
export function Providers({ children }: { children: React.ReactNode }) {
  usePageTracking();
  return <>{children}</>;
}
