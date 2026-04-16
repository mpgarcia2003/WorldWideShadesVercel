import Image from "next/image";
import { CTAButton } from "./CTAButton";
import { HERO, TRUST_PILLS, IMAGES, CTA_URLS, PHONE_HREF } from "../data";

export function Hero() {
  return (
    <section className="relative min-h-[85vh] flex items-center overflow-hidden bg-dark">
      {/* Background image */}
      <Image
        src={IMAGES.heroBg}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover opacity-35"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-dark/50 via-dark/65 to-dark/85" />

      {/* Content */}
      <div className="relative z-10 container-site py-16 md:py-24">
        <div className="max-w-3xl">
          {/* Eyebrow */}
          <p className="text-gold text-xs font-semibold tracking-[0.12em] uppercase mb-5">
            {HERO.eyebrow}
          </p>

          {/* H1 */}
          <h1 className="heading-display text-4xl md:text-5xl lg:text-[3.5rem] text-cream mb-5">
            {HERO.h1}
          </h1>

          {/* Subheadline */}
          <p className="text-lg text-cream/80 mb-2 max-w-2xl leading-relaxed">
            {HERO.subheadline}
          </p>
          <p className="text-base text-cream/60 italic mb-5">
            {HERO.deliveryLine}
          </p>

          {/* Price Anchor + Sale Badge */}
          <div className="flex flex-wrap items-center gap-4 mb-6">
            <p className="text-2xl font-bold text-gold">
              <span className="line-through text-warm-gray text-base font-normal mr-2">{HERO.priceOriginal}</span>
              {HERO.priceNow}
            </p>
            <span className="inline-flex items-center gap-1.5 bg-gold/10 border border-gold/25 rounded-lg px-3 py-1.5 text-xs font-semibold text-gold">
              {HERO.saleBadge}
            </span>
          </div>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3 mb-3">
            <CTAButton href={CTA_URLS.builder} variant="gold">
              {HERO.primaryCTA}
            </CTAButton>
            <CTAButton href={PHONE_HREF} variant="phone">
              {HERO.secondaryCTA}
            </CTAButton>
          </div>

          {/* Guarantee */}
          <p className="text-sm text-cream/50 mb-6">
            <span className="text-gold mr-1">✓</span>
            {HERO.guaranteeLine}
          </p>

          {/* Trust pills */}
          <div className="flex flex-wrap gap-2">
            {TRUST_PILLS.map((pill) => (
              <span key={pill.label} className="bg-cream/8 text-cream/75 text-xs px-3.5 py-2 rounded-full border border-cream/10">
                {pill.label}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
