import { CTAButton } from "./CTAButton";
import { STEPS, CTA_URLS } from "../data";

export function HowItWorks() {
  return (
    <section className="bg-dark-soft border-y border-dark-muted py-14 md:py-20">
      <div className="container-site">
        <h2 className="heading-section text-2xl md:text-3xl text-cream text-center mb-10">
          Get Your Custom Shades in 4 Steps
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {STEPS.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-10 h-10 rounded-full bg-gold text-dark flex items-center justify-center text-sm font-bold mx-auto mb-3">
                {step.number}
              </div>
              <h3 className="text-base font-semibold text-cream mb-1">{step.title}</h3>
              <p className="text-sm text-warm-gray leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
        <div className="text-center">
          <CTAButton href={CTA_URLS.builder}>Get Your Exact Price →</CTAButton>
        </div>
      </div>
    </section>
  );
}
