import { CTAButton } from "./CTAButton";
import { URGENCY, CTA_URLS } from "../data";

export function Urgency() {
  return (
    <section className="bg-dark py-12 md:py-16">
      <div className="container-site max-w-3xl text-center">
        <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-3">⚡ {URGENCY.heading.split("—")[0]}</p>
        <h2 className="heading-section text-2xl md:text-3xl text-cream mb-4">{URGENCY.heading}</h2>
        <p className="text-warm-gray leading-relaxed mb-2">{URGENCY.body}</p>
        <p className="text-sm text-gold font-semibold mb-6">{URGENCY.note}</p>
        <CTAButton href={CTA_URLS.builder}>{URGENCY.cta}</CTAButton>
      </div>
    </section>
  );
}
