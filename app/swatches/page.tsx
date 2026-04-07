import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { TrustBar } from "@/components/sections/TrustBar";

export const metadata: Metadata = generatePageMetadata({ title: "Order Free Fabric Swatches — See & Feel Before You Buy", description: "Order up to 10 free fabric swatches delivered to your door. See colors, textures, and opacity in your own space before ordering custom shades.", path: "/swatches" });

export default function SwatchesPage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Free Swatches", path: "/swatches" }])} />

      <section className="section-padding bg-cream/50">
        <div className="container-site text-center max-w-2xl mx-auto">
          <span className="inline-block mb-4 px-4 py-1.5 text-xs font-bold uppercase tracking-[0.15em] text-gold bg-gold/10 rounded-full">100% Free</span>
          <h1 className="heading-display text-4xl lg:text-5xl text-dark mb-4">See It. Feel It. Love It.</h1>
          <p className="text-lg text-warm-gray mb-8">Order up to 10 free fabric swatches delivered to your door. No commitment, no credit card required.</p>
        </div>
      </section>

      <TrustBar items={[{ metric: "Free", label: "Shipping" }, { metric: "10", label: "Swatches Max" }, { metric: "700+", label: "Fabrics Available" }, { metric: "3-5", label: "Day Delivery" }]} />

      <section className="section-padding bg-white">
        <div className="container-site">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="heading-section text-3xl text-dark mb-6">Why Order Swatches?</h2>
              <ul className="space-y-5">
                {[
                  { title: "See True Colors", desc: "Screens can't capture every shade. Hold the actual fabric up to your walls, furniture, and existing decor." },
                  { title: "Feel the Texture", desc: "From smooth solids to textured weaves and linen looks — texture matters. Feel the difference in person." },
                  { title: "Test the Opacity", desc: "Hold the swatch up to your window to see exactly how much light passes through. Blackout vs. light filtering — see it firsthand." },
                  { title: "Compare Side by Side", desc: "Narrow your favorites down by comparing up to 10 swatches next to each other in your actual space." },
                ].map((item) => (
                  <li key={item.title} className="flex gap-3">
                    <span className="shrink-0 mt-1 w-5 h-5 rounded-full bg-gold/20 flex items-center justify-center"><span className="w-2 h-2 rounded-full bg-gold" /></span>
                    <div><h3 className="font-semibold text-dark">{item.title}</h3><p className="text-sm text-warm-gray mt-0.5">{item.desc}</p></div>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-cream p-8 lg:p-10">
              <h3 className="heading-section text-xl text-dark mb-6">How to Order Swatches</h3>
              <ol className="space-y-4">
                <li className="flex gap-4"><span className="shrink-0 w-8 h-8 rounded-full bg-gold text-white font-bold flex items-center justify-center text-sm">1</span><div><h4 className="font-semibold text-dark">Browse Fabrics</h4><p className="text-sm text-warm-gray">Use our shade builder or fabrics page to explore options.</p></div></li>
                <li className="flex gap-4"><span className="shrink-0 w-8 h-8 rounded-full bg-gold text-white font-bold flex items-center justify-center text-sm">2</span><div><h4 className="font-semibold text-dark">Add to Swatch Cart</h4><p className="text-sm text-warm-gray">Click the swatch icon on any fabric to add it to your free swatch order (up to 10).</p></div></li>
                <li className="flex gap-4"><span className="shrink-0 w-8 h-8 rounded-full bg-gold text-white font-bold flex items-center justify-center text-sm">3</span><div><h4 className="font-semibold text-dark">Enter Your Address</h4><p className="text-sm text-warm-gray">We ship swatches free via USPS. Arrive in 3–5 business days.</p></div></li>
              </ol>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA headline="Ready to See Our Fabrics?" subheadline="Browse 700+ options and add up to 10 free swatches to your order." ctaLabel="Browse Fabrics" ctaHref="/builder" />
    </>
  );
}
