import { CTAButton } from "./CTAButton";
import { PRICING, CTA_URLS } from "../data";

export function Pricing() {
  return (
    <section className="bg-dark py-14 md:py-20">
      <div className="container-site">
        <div className="text-center mb-10">
          <h2 className="heading-section text-2xl md:text-3xl text-cream mb-3">{PRICING.heading}</h2>
          <p className="text-warm-gray text-base">{PRICING.subheading}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-8">
          {PRICING.cards.map((card) => (
            <div key={card.title} className={`rounded-xl p-6 ${card.highlighted ? "border-2 border-gold bg-dark-soft" : "border border-dark-muted bg-dark-soft"} relative`}>
              {card.highlighted && card.badge && (
                <span className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gold text-dark text-xs font-bold px-4 py-1 rounded-full uppercase tracking-wider">
                  {card.badge}
                </span>
              )}
              <h3 className="text-base font-bold text-cream mb-1">{card.title}</h3>
              {card.price && <p className="text-2xl font-bold text-gold mb-1">{card.price}</p>}
              <p className="text-sm text-warm-gray mb-4">{card.description}</p>
              {card.features.length > 0 && (
                <ul className="space-y-2 text-sm text-warm-gray-light">
                  {card.features.map((f: string) => (
                    <li key={f} className="flex items-start gap-2">
                      <span className="text-gold mt-0.5">✓</span>{f}
                    </li>
                  ))}
                </ul>
              )}
              {card.addOns && (
                <ul className="space-y-2.5 text-sm">
                  {card.addOns.map((a: { name: string; price: string }) => (
                    <li key={a.name} className="flex justify-between items-center border-b border-dark-muted pb-2 last:border-0">
                      <span className="text-warm-gray">{a.name}</span>
                      <span className="font-bold text-cream">{a.price}</span>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>
        <div className="text-center">
          <CTAButton href={CTA_URLS.builder}>{PRICING.cta}</CTAButton>
        </div>
      </div>
    </section>
  );
}
