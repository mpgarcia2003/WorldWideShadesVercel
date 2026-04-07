"use client";
import { CTAButton } from "@/components/shared/CTAButton";

interface HeroSectionProps {
  headline: string;
  subheadline: string;
  ctaLabel: string;
  ctaHref: string;
  secondaryCtaLabel?: string;
  secondaryCtaHref?: string;
  backgroundImage: string;
  badge?: string;
}

export function HeroSection({ headline, subheadline, ctaLabel, ctaHref, secondaryCtaLabel, secondaryCtaHref, backgroundImage, badge }: HeroSectionProps) {
  return (
    <section className="relative min-h-[70vh] lg:min-h-[80vh] flex items-center overflow-hidden">
      <div className="absolute inset-0 bg-dark">
        <div className="absolute inset-0 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${backgroundImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-r from-dark via-dark/80 to-transparent" />
      </div>
      <div className="absolute inset-0 noise-overlay pointer-events-none" />
      <div className="container-site relative z-10 py-20 lg:py-28">
        <div className="max-w-2xl">
          {badge && <span className="inline-block mb-5 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-white bg-gold/90 rounded-full">{badge}</span>}
          <h1 className="heading-display text-4xl sm:text-5xl lg:text-6xl xl:text-7xl text-white mb-6 whitespace-pre-line">{headline}</h1>
          <p className="text-lg lg:text-xl text-white/70 leading-relaxed mb-8 max-w-lg">{subheadline}</p>
          <div className="flex flex-wrap items-center gap-4">
            <CTAButton href={ctaHref} label={ctaLabel} trackingLocation="hero" variant="primary" size="lg" />
            {secondaryCtaLabel && secondaryCtaHref && (
              <CTAButton href={secondaryCtaHref} label={secondaryCtaLabel} trackingLocation="hero" variant="outline" size="lg" className="border-white/30 text-white hover:bg-white hover:text-dark" />
            )}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent" />
    </section>
  );
}
