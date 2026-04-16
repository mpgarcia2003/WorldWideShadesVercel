import { CTAButton } from "./CTAButton";
import { SIDE_CHANNELS, CTA_URLS } from "../data";

export function SideChannels() {
  return (
    <section className="bg-dark-soft border-y border-dark-muted py-14 md:py-20">
      <div className="container-site">
        <div className="text-center mb-8">
          <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-2">The Secret to True Blackout</p>
          <h2 className="heading-section text-2xl md:text-3xl text-cream mb-3">{SIDE_CHANNELS.heading}</h2>
          <p className="text-warm-gray max-w-xl mx-auto">{SIDE_CHANNELS.body}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Visual comparison */}
          <div className="grid grid-cols-2 gap-3">
            <div className="rounded-xl p-5 bg-dark border border-error/20 text-center">
              <div className="text-3xl mb-2">☀️</div>
              <p className="text-xs font-semibold uppercase tracking-wider text-error mb-2">Without</p>
              <p className="text-2xl font-bold text-cream mb-1">{SIDE_CHANNELS.withoutPct}</p>
              <p className="text-xs text-warm-gray leading-relaxed">{SIDE_CHANNELS.withoutNote}</p>
            </div>
            <div className="rounded-xl p-5 bg-dark border border-gold text-center">
              <div className="text-3xl mb-2">🌙</div>
              <p className="text-xs font-semibold uppercase tracking-wider text-gold mb-2">With Channels</p>
              <p className="text-2xl font-bold text-gold mb-1">{SIDE_CHANNELS.withPct}</p>
              <p className="text-xs text-warm-gray leading-relaxed">{SIDE_CHANNELS.withNote}</p>
            </div>
          </div>
          {/* Features */}
          <div>
            <h3 className="text-lg font-semibold text-cream mb-4">How Side Channels Work</h3>
            <ul className="space-y-3 mb-5">
              {SIDE_CHANNELS.features.map((f) => (
                <li key={f} className="flex items-start gap-2.5 text-sm text-warm-gray leading-relaxed">
                  <span className="text-gold mt-0.5 shrink-0">✓</span>{f}
                </li>
              ))}
            </ul>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xl font-bold text-gold">{SIDE_CHANNELS.price}</span>
              <span className="text-sm text-warm-gray">{SIDE_CHANNELS.priceNote}</span>
            </div>
            <CTAButton href={CTA_URLS.builder}>{SIDE_CHANNELS.cta}</CTAButton>
          </div>
        </div>
      </div>
    </section>
  );
}
