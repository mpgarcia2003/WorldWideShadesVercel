import { CTAButton } from "./CTAButton";
import { ROOMS, CTA_URLS } from "../data";

export function RoomUseCases() {
  return (
    <section className="bg-dark-soft border-y border-dark-muted py-14 md:py-20">
      <div className="container-site">
        <h2 className="heading-section text-2xl md:text-3xl text-cream text-center mb-10">Built for Every Room That Needs Darkness</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {ROOMS.map((room) => (
            <div key={room.title} className="bg-dark border border-dark-muted rounded-xl p-6 hover:border-gold/40 transition-colors">
              <span className="inline-block bg-gold/10 text-gold text-xs font-semibold px-3 py-1 rounded-full mb-4">{room.badge}</span>
              <h3 className="text-lg font-bold text-cream mb-2">{room.title}</h3>
              <p className="text-sm text-warm-gray leading-relaxed mb-4">{room.description}</p>
              <CTAButton href={CTA_URLS.builder} variant="outline" className="text-sm px-5 py-2.5">{room.cta}</CTAButton>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
