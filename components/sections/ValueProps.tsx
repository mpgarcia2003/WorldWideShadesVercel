import { Moon, Thermometer, Shield, Volume2, Sun, Eye, Sparkles, Triangle, Maximize2, Palette, Zap } from "lucide-react";

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = { Moon, Thermometer, Shield, Volume2, Sun, Eye, Sparkles, Triangle, Maximize2, Palette, Zap };

interface ValuePropsProps { headline: string; description: string; items: { icon: string; title: string; description: string }[]; }

export function ValueProps({ headline, description, items }: ValuePropsProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <div className="text-center max-w-2xl mx-auto mb-12 lg:mb-16">
          <h2 className="heading-section text-3xl lg:text-4xl text-dark mb-4">{headline}</h2>
          <p className="text-lg text-warm-gray">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => { const Icon = ICON_MAP[item.icon]; return (
            <article key={item.title} className="group text-center">
              <div className="inline-flex items-center justify-center w-14 h-14 mb-5 rounded-xl bg-cream text-gold group-hover:bg-gold group-hover:text-white transition-colors">
                {Icon ? <Icon className="w-6 h-6" /> : null}
              </div>
              <h3 className="text-lg font-semibold text-dark mb-2">{item.title}</h3>
              <p className="text-sm leading-relaxed text-warm-gray">{item.description}</p>
            </article>
          ); })}
        </div>
      </div>
    </section>
  );
}
