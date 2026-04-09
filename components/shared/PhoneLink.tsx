"use client";

import { trackPhoneClick } from "@/lib/gtm/events";

export function PhoneLink({ location, className, style, children }: {
  location: string;
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
}) {
  return (
    <a
      href="tel:+18446742716"
      className={className}
      style={style}
      onClick={() => trackPhoneClick(location)}
    >
      {children || "(844) 674-2716"}
    </a>
  );
}
