import { CTAButton } from "@/components/shared/CTAButton";

interface FabricShowcaseProps { headline: string; description: string; categories: { name: string; swatch: string; description: string }[]; }

export function FabricShowcase({ headline, description, categories }: FabricShowcaseProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="heading-section text-3xl lg:text-4xl text-dark mb-4">{headline}</h2>
          <p className="text-lg text-warm-gray">{description}</p>
        </div>
        <div className="grid grid-cols-2 gap-5 lg:grid-cols-4 lg:gap-6">
          {categories.map((cat) => (
            <article key={cat.name} className="group rounded-xl overflow-hidden bg-cream hover:shadow-md transition-shadow">
              <div className="aspect-square bg-dark-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-110 transition-transform duration-700" style={{ backgroundImage: `url(${cat.swatch})` }} />
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-dark text-sm mb-1">{cat.name}</h3>
                <p className="text-xs text-warm-gray leading-relaxed">{cat.description}</p>
              </div>
            </article>
          ))}
        </div>
        <div className="text-center mt-10">
          <CTAButton href="/fabrics" label="Browse All Fabrics" trackingLocation="fabric-showcase" variant="outline" size="md" />
        </div>
      </div>
    </section>
  );
}
