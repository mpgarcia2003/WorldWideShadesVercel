import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { CTAButton } from "@/components/shared/CTAButton";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = generatePageMetadata({ title: "700+ Premium Fabrics — Browse Our Full Collection", description: "Explore 700+ premium roller shade fabrics. Blackout, light filtering, textured weaves, bold solids. Order free swatches.", path: "/fabrics" });

const CATEGORIES = [
  { name: "All Fabrics", count: 700, slug: "all" },
  { name: "Blackout", count: 400, slug: "blackout" },
  { name: "Light Filtering", count: 300, slug: "light-filtering" },
  { name: "Textured Weaves", count: 120, slug: "textured" },
  { name: "Linen Look", count: 85, slug: "linen" },
  { name: "Bold Colors", count: 95, slug: "bold" },
  { name: "Neutrals", count: 200, slug: "neutrals" },
];

export default function FabricsPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Fabrics", path: "/fabrics" }])} />
      <section className="section-padding bg-cream/50">
        <div className="container-site text-center max-w-2xl mx-auto">
          <h1 className="heading-display text-4xl lg:text-5xl text-dark mb-4">Our Fabric Collection</h1>
          <p className="text-lg text-warm-gray mb-8">700+ premium fabrics in every color, texture, and opacity. Order free swatches to see and feel them in person.</p>
          <CTAButton href="/swatches" label="Order Free Swatches" trackingLocation="fabrics-header" variant="outline" size="md" />
        </div>
      </section>

      <section className="border-b border-cream-dark sticky top-16 lg:top-18 z-20 bg-white/95 backdrop-blur-sm">
        <div className="container-site">
          <nav className="flex items-center gap-2 overflow-x-auto py-3 -mx-1">
            {CATEGORIES.map((cat) => (
              <button key={cat.slug} className="shrink-0 px-4 py-2 text-sm font-medium rounded-full border border-cream-dark text-dark hover:border-gold hover:text-gold transition-colors">
                {cat.name} <span className="ml-1 text-warm-gray">({cat.count})</span>
              </button>
            ))}
          </nav>
        </div>
      </section>

      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
            {Array.from({ length: 24 }).map((_, i) => (
              <article key={i} className="group rounded-lg overflow-hidden bg-cream hover:shadow-md transition-shadow cursor-pointer">
                <div className="aspect-square bg-dark-muted relative">
                  <div className="absolute inset-0" style={{ backgroundColor: `hsl(${30 + i * 8}, ${20 + (i % 5) * 10}%, ${40 + (i % 7) * 8}%)` }} />
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 bg-dark/40 flex items-center justify-center transition-opacity">
                    <span className="text-white text-xs font-semibold px-3 py-1.5 bg-gold rounded-full">View Details</span>
                  </div>
                </div>
                <div className="p-3">
                  <span className="text-xs font-medium text-dark block truncate">Fabric {String(i + 1).padStart(3, "0")}</span>
                  <span className="text-xs text-warm-gray">{i % 2 === 0 ? "Blackout" : "Light Filtering"}</span>
                </div>
              </article>
            ))}
          </div>
          <div className="text-center mt-10">
            <p className="text-sm text-warm-gray mb-4">Showing 24 of 700+ fabrics. Full catalog available in the shade builder.</p>
            <CTAButton href="/builder" label="Browse All in Builder" trackingLocation="fabrics-grid" variant="primary" size="md" />
          </div>
        </div>
      </section>

      <FinalCTA headline="Found a Fabric You Love?" subheadline="Order free swatches or jump straight into designing your custom shade." ctaLabel="Start Designing" ctaHref="/builder" />
    </>
  );
}
