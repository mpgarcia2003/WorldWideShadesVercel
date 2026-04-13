"use client";

import { usePathname } from "next/navigation";
import { AnnouncementBar } from "@/components/shell/AnnouncementBar";
import { Footer } from "@/components/shell/Footer";

export function ShellWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isBuilder = pathname === "/builder";

  return (
    <>
      {!isBuilder && <AnnouncementBar />}
      {children}
      {!isBuilder && <Footer />}
    </>
  );
}
