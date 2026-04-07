import { Star } from "lucide-react";

interface TestimonialsProps { headline: string; items: { name: string; location: string; rating: number; text: string; product: string }[]; }

export function Testimonials({ headline, items }: TestimonialsProps) {
  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <h2 className="heading-section text-3xl lg:text-4xl text-dark text-center mb-12">{headline}</h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
          {items.map((item, i) => (
            <article key={i} className="rounded-xl border border-cream-dark p-6 hover:border-gold/30 hover:shadow-sm transition-all">
              <div className="flex items-center gap-0.5 mb-4">
                {Array.from({ length: item.rating }).map((_, j) => <Star key={j} className="w-4 h-4 fill-gold text-gold" />)}
              </div>
              <blockquote className="text-sm text-dark-soft leading-relaxed mb-5">&ldquo;{item.text}&rdquo;</blockquote>
              <footer>
                <span className="block text-sm font-semibold text-dark">{item.name}</span>
                <span className="block text-xs text-warm-gray">{item.location}</span>
                <span className="block text-xs text-gold mt-1">{item.product}</span>
              </footer>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
