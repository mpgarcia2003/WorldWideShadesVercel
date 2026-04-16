import { REVIEWS } from "../data";

export function Reviews() {
  return (
    <section className="bg-dark py-14 md:py-20">
      <div className="container-site">
        <div className="text-center mb-10">
          <p className="text-gold text-xs font-semibold uppercase tracking-wider mb-2">What Homeowners Say</p>
          <h2 className="heading-section text-2xl md:text-3xl text-cream">4.9/5 from 500+ Verified Homeowners</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {REVIEWS.map((r) => (
            <div key={r.author} className="bg-dark-soft border border-dark-muted rounded-xl p-6">
              <div className="text-gold text-sm tracking-wider mb-3">{"★".repeat(r.stars)}</div>
              <p className="text-cream/80 text-sm italic leading-relaxed mb-4">&ldquo;{r.quote}&rdquo;</p>
              <div className="border-t border-dark-muted pt-3">
                <p className="text-sm font-semibold text-cream">{r.author}</p>
                <p className="text-xs text-warm-gray">{r.location}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
