interface AccessoriesProps { headline: string; items: { name: string; price: string; description: string; image: string }[]; }

export function Accessories({ headline, items }: AccessoriesProps) {
  return (
    <section className="section-padding bg-cream/50">
      <div className="container-site">
        <h2 className="heading-section text-3xl lg:text-4xl text-dark text-center mb-12">{headline}</h2>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map((item) => (
            <article key={item.name} className="rounded-xl bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
              <div className="aspect-[4/3] rounded-lg bg-cream mb-4 overflow-hidden">
                <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${item.image})` }} />
              </div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h3 className="font-semibold text-dark">{item.name}</h3>
                <span className="shrink-0 text-sm font-bold text-gold">{item.price}</span>
              </div>
              <p className="text-sm text-warm-gray leading-relaxed">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
