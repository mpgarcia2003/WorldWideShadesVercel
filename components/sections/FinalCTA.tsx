import { CTAButton } from "@/components/shared/CTAButton";

interface FinalCTAProps { headline: string; subheadline: string; ctaLabel: string; ctaHref: string; }

export function FinalCTA({ headline, subheadline, ctaLabel, ctaHref }: FinalCTAProps) {
  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      <div className="absolute inset-0 bg-dark noise-overlay" />
      <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-gold/5" />
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full border border-gold/10" />
      <div className="absolute -bottom-20 -left-20 w-64 h-64 rounded-full border border-gold/10" />
      <div className="container-site relative z-10 text-center">
        <h2 className="heading-display text-3xl sm:text-4xl lg:text-5xl text-white mb-5 max-w-2xl mx-auto">{headline}</h2>
        <p className="text-lg text-white/60 mb-10 max-w-lg mx-auto">{subheadline}</p>
        <CTAButton href={ctaHref} label={ctaLabel} trackingLocation="final-cta" variant="primary" size="lg" />
      </div>
    </section>
  );
}
