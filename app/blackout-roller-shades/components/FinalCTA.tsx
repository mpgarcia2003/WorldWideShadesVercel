import { CTAButton } from "./CTAButton";
import { FINAL_CTA, CTA_URLS, PHONE_HREF, PHONE } from "../data";

export function FinalCTA() {
  return (
    <section className="bg-gradient-to-b from-dark to-dark-soft py-16 md:py-24">
      <div className="container-site max-w-3xl text-center">
        <p className="text-gold text-sm font-semibold mb-4">Most orders: $145–$300 · Ships in ~7 days</p>
        <h2 className="heading-display text-3xl md:text-4xl text-cream mb-4">{FINAL_CTA.heading}</h2>
        <p className="text-warm-gray leading-relaxed mb-8 max-w-xl mx-auto">{FINAL_CTA.body}</p>
        <div className="flex flex-wrap justify-center gap-3 mb-3">
          <CTAButton href={CTA_URLS.builder}>{FINAL_CTA.cta}</CTAButton>
          <CTAButton href={PHONE_HREF} variant="outline">Call {PHONE}</CTAButton>
        </div>
        <p className="text-sm text-gold/70 mb-8">✓ {FINAL_CTA.riskKiller}</p>
        <div className="flex flex-wrap justify-center gap-3">
          {FINAL_CTA.trustItems.map((item) => (
            <span key={item} className="bg-cream/5 text-cream/60 text-xs px-4 py-2 rounded-full border border-cream/10">{item}</span>
          ))}
        </div>
      </div>
    </section>
  );
}
