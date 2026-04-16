import Link from "next/link";
import { CTA_URLS } from "../data";

export function MobileStickyBar() {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-gradient-to-r from-dark to-dark-soft border-t border-gold shadow-[0_-4px_20px_rgba(0,0,0,0.4)]">
      <div className="flex items-center justify-between px-4 py-3 gap-3">
        <div className="text-xs text-warm-gray leading-tight">
          Blackout Shades
          <span className="block text-base font-bold text-gold">
            <span className="line-through text-warm-gray text-xs font-normal mr-1">$290</span>
            From $145
          </span>
        </div>
        <Link
          href={CTA_URLS.builder}
          className="shrink-0 bg-gold text-dark rounded-md px-5 py-2.5 text-sm font-bold"
        >
          Design Yours →
        </Link>
      </div>
    </div>
  );
}
