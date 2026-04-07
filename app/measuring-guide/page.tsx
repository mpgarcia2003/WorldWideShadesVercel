import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { CTAButton } from "@/components/shared/CTAButton";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = generatePageMetadata({ title: "How to Measure Your Windows for Custom Shades", description: "Step-by-step guide to measuring your windows for inside mount and outside mount roller shades. Includes diagrams and tips for perfect fit.", path: "/measuring-guide" });

export default function MeasuringGuidePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Measuring Guide", path: "/measuring-guide" }])} />

      <section className="section-padding bg-white">
        <div className="container-site container-narrow">
          <h1 className="heading-display text-4xl lg:text-5xl text-dark mb-4">How to Measure Your Windows</h1>
          <p className="text-lg text-warm-gray mb-12">Accurate measurements ensure a perfect fit. Follow these steps for inside mount or outside mount installation.</p>

          <div className="space-y-12">
            <div>
              <h2 className="heading-section text-2xl text-dark mb-4">Inside Mount (most common)</h2>
              <p className="text-warm-gray mb-4">The shade sits inside the window frame for a clean, flush look.</p>
              <ol className="space-y-4">
                <li className="flex gap-4"><span className="shrink-0 w-8 h-8 rounded-full bg-gold/10 text-gold font-bold flex items-center justify-center text-sm">1</span><div><h3 className="font-semibold text-dark">Measure Width</h3><p className="text-sm text-warm-gray">Measure the inside width of your window frame at the top, middle, and bottom. Use the <strong>smallest</strong> measurement.</p></div></li>
                <li className="flex gap-4"><span className="shrink-0 w-8 h-8 rounded-full bg-gold/10 text-gold font-bold flex items-center justify-center text-sm">2</span><div><h3 className="font-semibold text-dark">Measure Height</h3><p className="text-sm text-warm-gray">Measure the inside height at the left, center, and right. Use the <strong>smallest</strong> measurement.</p></div></li>
                <li className="flex gap-4"><span className="shrink-0 w-8 h-8 rounded-full bg-gold/10 text-gold font-bold flex items-center justify-center text-sm">3</span><div><h3 className="font-semibold text-dark">Check Depth</h3><p className="text-sm text-warm-gray">Your window frame needs at least 1.5&quot; of depth for inside mount. For motorized, 2.5&quot; is recommended.</p></div></li>
              </ol>
            </div>

            <div className="border-t border-cream-dark pt-12">
              <h2 className="heading-section text-2xl text-dark mb-4">Outside Mount</h2>
              <p className="text-warm-gray mb-4">The shade mounts on the wall or frame above the window — ideal for maximum light blocking.</p>
              <ol className="space-y-4">
                <li className="flex gap-4"><span className="shrink-0 w-8 h-8 rounded-full bg-gold/10 text-gold font-bold flex items-center justify-center text-sm">1</span><div><h3 className="font-semibold text-dark">Measure Width</h3><p className="text-sm text-warm-gray">Measure the area you want to cover. We recommend adding <strong>1.5–3 inches</strong> on each side of the window for full coverage.</p></div></li>
                <li className="flex gap-4"><span className="shrink-0 w-8 h-8 rounded-full bg-gold/10 text-gold font-bold flex items-center justify-center text-sm">2</span><div><h3 className="font-semibold text-dark">Measure Height</h3><p className="text-sm text-warm-gray">Measure from where the bracket will mount to the window sill. Add <strong>3 inches above</strong> the window frame for bracket clearance.</p></div></li>
              </ol>
            </div>

            <div className="rounded-xl bg-cream p-6 border border-cream-dark">
              <h3 className="font-semibold text-dark mb-2">Pro Tips</h3>
              <ul className="space-y-2 text-sm text-warm-gray">
                <li>• Use a metal tape measure — fabric tapes stretch and give inaccurate readings</li>
                <li>• Measure in inches, to the nearest 1/8&quot;</li>
                <li>• Measure each window individually — even windows that look the same can vary by 1/4&quot; or more</li>
                <li>• When in doubt, contact us — we offer free measurement consultations</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <FinalCTA headline="Ready to Order?" subheadline="Measurements in hand? Design your custom shade in our builder." ctaLabel="Start Designing" ctaHref="/builder" />
    </>
  );
}
