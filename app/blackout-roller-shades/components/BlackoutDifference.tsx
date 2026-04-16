import { CTAButton } from "./CTAButton";
import { BLACKOUT_DIFFERENCE, CTA_URLS } from "../data";

export function BlackoutDifference() {
  return (
    <section className="bg-dark py-14 md:py-20">
      <div className="container-site max-w-4xl">
        <div className="text-center mb-10">
          <h2 className="heading-section text-2xl md:text-3xl text-cream mb-3">{BLACKOUT_DIFFERENCE.heading}</h2>
          <p className="text-warm-gray">{BLACKOUT_DIFFERENCE.subheading}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8">
          <div className="rounded-xl p-6 bg-dark-soft border border-error/20">
            <h3 className="text-error font-bold text-sm uppercase tracking-wider mb-4">✗ Without Custom Fit</h3>
            <ul className="space-y-3">
              {BLACKOUT_DIFFERENCE.without.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-warm-gray leading-relaxed">
                  <span className="text-error mt-0.5 shrink-0">✗</span>{item}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-xl p-6 bg-dark-soft border border-gold/30">
            <h3 className="text-gold font-bold text-sm uppercase tracking-wider mb-4">✓ With World Wide Shades</h3>
            <ul className="space-y-3">
              {BLACKOUT_DIFFERENCE.with.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-cream/80 leading-relaxed">
                  <span className="text-gold mt-0.5 shrink-0">✓</span>{item}
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="text-center">
          <CTAButton href={CTA_URLS.builder}>Get Your Exact Price →</CTAButton>
        </div>
      </div>
    </section>
  );
}
