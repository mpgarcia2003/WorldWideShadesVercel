import Link from "next/link";
import { isSaleActive, SALE_CONFIG } from "@/constants";

export function AnnouncementBar() {
  if (!isSaleActive()) return null;
  return (
    <div className="gold-gradient relative z-50 py-2.5 text-center">
      <Link href="/builder" className="flex items-center justify-center gap-2 text-sm font-semibold tracking-wide text-white md:text-base">
        <span className="animate-pulse">✦</span>
        <span>{SALE_CONFIG.reason} — Up to {SALE_CONFIG.maxDiscount}% Off</span>
        <span className="hidden sm:inline">— Ends {SALE_CONFIG.endDate.toLocaleDateString("en-US", { month: "long", day: "numeric" })}</span>
        <span className="ml-1 rounded-sm bg-white/20 px-2 py-0.5 text-xs font-bold uppercase">Shop Now →</span>
      </Link>
    </div>
  );
}
