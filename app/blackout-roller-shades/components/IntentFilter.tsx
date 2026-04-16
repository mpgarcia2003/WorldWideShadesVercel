import { CTAButton } from "./CTAButton";
import { INTENT_FILTER, CTA_URLS } from "../data";

export function IntentFilter() {
  return (
    <section className="bg-dark-soft border-y border-dark-muted py-14 md:py-20">
      <div className="container-site max-w-4xl">
        <h2 className="heading-section text-2xl md:text-3xl text-cream text-center mb-10">{INTENT_FILTER.heading}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="rounded-xl p-6 bg-success/5 border border-success/20">
            <h3 className="text-success font-bold text-sm uppercase tracking-wider mb-5">{INTENT_FILTER.forYou.title}</h3>
            <ul className="space-y-3">
              {INTENT_FILTER.forYou.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-cream/80 leading-relaxed">
                  <span className="text-success mt-0.5 shrink-0">✓</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl p-6 bg-error/5 border border-error/20">
            <h3 className="text-error font-bold text-sm uppercase tracking-wider mb-5">{INTENT_FILTER.notForYou.title}</h3>
            <ul className="space-y-3">
              {INTENT_FILTER.notForYou.items.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-cream/60 leading-relaxed">
                  <span className="text-error mt-0.5 shrink-0">✗</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center">
          <CTAButton href={CTA_URLS.builder}>{INTENT_FILTER.cta}</CTAButton>
        </div>
      </div>
    </section>
  );
}
