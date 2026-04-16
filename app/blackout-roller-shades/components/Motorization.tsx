import { CTAButton } from "./CTAButton";
import { MOTORIZATION, CTA_URLS } from "../data";

export function Motorization() {
  return (
    <section className="bg-dark py-14 md:py-20">
      <div className="container-site">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-2">Smart Home Ready</p>
            <h2 className="heading-section text-2xl md:text-3xl text-cream mb-4">{MOTORIZATION.heading}</h2>
            <p className="text-warm-gray leading-relaxed mb-5">{MOTORIZATION.body}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {MOTORIZATION.badges.map((b) => (
                <span key={b} className="bg-dark-soft border border-dark-muted rounded-lg px-3 py-1.5 text-xs font-semibold text-warm-gray">{b}</span>
              ))}
            </div>
            <CTAButton href={CTA_URLS.builder}>{MOTORIZATION.cta}</CTAButton>
          </div>
          <div className="text-center">
            <div className="inline-block bg-dark-soft border border-dark-muted rounded-xl p-8">
              <p className="text-xs text-warm-gray uppercase tracking-wider mb-3">Add to any shade</p>
              <p className="text-4xl font-bold text-gold mb-1">{MOTORIZATION.price}</p>
              <p className="text-sm text-warm-gray">Motor upgrade per shade</p>
              <ul className="text-left space-y-2 mt-5 text-sm text-warm-gray">
                <li className="flex items-center gap-2"><span className="text-gold">✓</span> Somfy motor included</li>
                <li className="flex items-center gap-2"><span className="text-gold">✓</span> Rechargeable battery</li>
                <li className="flex items-center gap-2"><span className="text-gold">✓</span> App + voice control</li>
                <li className="flex items-center gap-2"><span className="text-gold">✓</span> Sun-tracking automation</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
