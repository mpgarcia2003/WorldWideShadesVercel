interface TrustBarProps { items: { metric: string; label: string }[]; }
export function TrustBar({ items }: TrustBarProps) {
  return (
    <section className="border-y border-cream-dark bg-cream/50">
      <div className="container-site py-6">
        <ul className="grid grid-cols-2 gap-6 md:grid-cols-4 md:gap-8">
          {items.map((item) => (
            <li key={item.label} className="text-center">
              <span className="block text-2xl lg:text-3xl font-bold text-gold heading-display">{item.metric}</span>
              <span className="block mt-1 text-sm text-warm-gray font-medium">{item.label}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
