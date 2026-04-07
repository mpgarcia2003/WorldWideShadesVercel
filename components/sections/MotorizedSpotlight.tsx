import { Zap, Smartphone, Mic, BatteryCharging } from "lucide-react";
import { CTAButton } from "@/components/shared/CTAButton";

export function MotorizedSpotlight() {
  return (
    <section className="section-padding bg-dark text-white relative overflow-hidden noise-overlay">
      <div className="container-site relative z-10">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
          {/* Left — Video / Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-dark-soft">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/images/motorized-lifestyle.jpg)" }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />

            {/* Voice command overlay */}
            <div className="absolute bottom-6 left-6 right-6">
              <div className="bg-white/10 backdrop-blur-md rounded-xl px-5 py-3 flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center">
                  <Mic className="w-4 h-4 text-gold" />
                </div>
                <div>
                  <span className="text-white/50 text-xs block">"Alexa..."</span>
                  <span className="text-white text-sm font-medium">"Close the bedroom shades"</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right — Copy */}
          <div>
            <span className="inline-block mb-4 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.2em] text-gold bg-gold/10 rounded-full">
              Smart Home Ready
            </span>
            <h2 className="heading-display text-3xl lg:text-4xl text-white mb-5">
              Upgrade Any Shade<br />to Motorized
            </h2>
            <p className="text-white/60 text-base lg:text-lg mb-8 max-w-md">
              Rechargeable motor. No wiring needed. Control with a remote, your phone, or your voice.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {[
                { icon: Smartphone, label: "App Control", desc: "iOS & Android" },
                { icon: Mic, label: "Voice Control", desc: "Alexa · Google · Siri" },
                { icon: BatteryCharging, label: "6-Month Battery", desc: "USB-C rechargeable" },
                { icon: Zap, label: "Schedules", desc: "Sunrise & sunset" },
              ].map((item) => (
                <div key={item.label} className="bg-white/5 rounded-xl p-4 hover:bg-white/10 transition-colors">
                  <item.icon className="w-5 h-5 text-gold mb-2" />
                  <span className="block text-sm font-semibold text-white">{item.label}</span>
                  <span className="block text-xs text-white/40">{item.desc}</span>
                </div>
              ))}
            </div>

            <CTAButton
              href="/motorized-shades"
              label="Explore Motorized Options"
              trackingLocation="motorized-spotlight"
              variant="primary"
              size="md"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
