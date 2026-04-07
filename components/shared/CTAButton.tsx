"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { trackCTAClick, trackBuilderStart } from "@/lib/gtm/events";

type Variant = "primary" | "secondary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface CTAButtonProps {
  href: string;
  label: string;
  trackingLocation: string;
  variant?: Variant;
  size?: Size;
  className?: string;
  external?: boolean;
}

const VARIANT_STYLES: Record<Variant, string> = {
  primary: "bg-gold text-white hover:bg-gold-dark shadow-md hover:shadow-gold transition-all",
  secondary: "bg-dark text-white hover:bg-dark-soft transition-colors",
  outline: "border-2 border-gold text-gold hover:bg-gold hover:text-white transition-all",
  ghost: "text-gold hover:text-gold-dark underline underline-offset-4 transition-colors",
};

const SIZE_STYLES: Record<Size, string> = {
  sm: "px-4 py-2 text-sm",
  md: "px-6 py-3 text-base",
  lg: "px-8 py-4 text-lg",
};

export function CTAButton({ href, label, trackingLocation, variant = "primary", size = "md", className, external = false }: CTAButtonProps) {
  const handleClick = () => {
    trackCTAClick(label, trackingLocation, href);
    if (href.includes("/builder")) trackBuilderStart(trackingLocation);
  };

  const classes = cn("inline-flex items-center justify-center font-semibold rounded-lg tracking-wide cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold", VARIANT_STYLES[variant], SIZE_STYLES[size], className);

  if (external) return <a href={href} onClick={handleClick} className={classes} target="_blank" rel="noopener noreferrer">{label}</a>;
  return <Link href={href} onClick={handleClick} className={classes}>{label}</Link>;
}
