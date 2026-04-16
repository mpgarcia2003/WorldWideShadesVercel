import { COMPARISON } from "../data";

export function ComparisonTable() {
  return (
    <section className="bg-dark-soft border-y border-dark-muted py-14 md:py-20">
      <div className="container-site max-w-4xl">
        <h2 className="heading-section text-2xl md:text-3xl text-cream text-center mb-10">{COMPARISON.heading}</h2>
        <div className="overflow-x-auto rounded-xl border border-dark-muted">
          <table className="w-full min-w-[500px] text-sm">
            <thead>
              <tr className="bg-dark">
                <th className="text-left py-3 px-5 text-warm-gray font-semibold uppercase text-xs tracking-wider w-1/3">Feature</th>
                <th className="text-left py-3 px-5 text-gold font-semibold uppercase text-xs tracking-wider">World Wide Shades</th>
                <th className="text-left py-3 px-5 text-warm-gray font-semibold uppercase text-xs tracking-wider">Showrooms & Amazon</th>
              </tr>
            </thead>
            <tbody>
              {COMPARISON.rows.map((row, i) => (
                <tr key={row.feature} className={i % 2 === 0 ? "bg-dark-soft" : "bg-dark"}>
                  <td className="py-3 px-5 font-medium text-cream">{row.feature}</td>
                  <td className="py-3 px-5 text-cream/80">{row.ours}</td>
                  <td className="py-3 px-5 text-warm-gray">{row.theirs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
