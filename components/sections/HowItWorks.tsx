import { Palette, Ruler, Wrench, Camera } from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = { Palette, Ruler, Wrench, Camera };

interface HowItWorksProps { headline: string; steps: { number: number; title: string; description: string; icon: string }[]; }

export function HowItWorks({ headline, steps }: HowItWorksProps) {
  return (
    <section className="section-padding bg-dark text-white relative overflow-hidden noise-overlay">
      <div className="container-site relative z-10">
        <h2 className="heading-section text-3xl lg:text-4xl text-center mb-14">{headline}</h2>
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 md:gap-8 max-w-4xl mx-auto">
          {steps.map((step) => { const Icon = ICON_MAP[step.icon]; return (
            <div key={step.number} className="relative text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 mb-5 rounded-full border-2 border-gold/40 bg-gold/10">
                <span className="heading-display text-2xl text-gold">{step.number}</span>
              </div>
              {Icon && <div className="flex justify-center mb-3"><Icon className="w-5 h-5 text-gold/60" /></div>}
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-white/60 leading-relaxed max-w-xs mx-auto">{step.description}</p>
              {step.number < steps.length && <div className="hidden md:block absolute top-8 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-px bg-gold/20" />}
            </div>
          ); })}
        </div>
      </div>
    </section>
  );
}
