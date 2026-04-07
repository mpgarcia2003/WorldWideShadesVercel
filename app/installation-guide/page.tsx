import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { FinalCTA } from "@/components/sections/FinalCTA";

export const metadata: Metadata = generatePageMetadata({ title: "Installation Guide — Mount Your Shades in Minutes", description: "Step-by-step installation instructions for inside mount and outside mount roller shades. Simple bracket system, no contractor needed.", path: "/installation-guide" });

export default function InstallationGuidePage() {
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Installation Guide", path: "/installation-guide" }])} />
      <section className="section-padding bg-white">
        <div className="container-site container-narrow">
          <h1 className="heading-display text-4xl lg:text-5xl text-dark mb-4">Installation Guide</h1>
          <p className="text-lg text-warm-gray mb-12">Every shade ships with all hardware included. Most installations take under 10 minutes per window.</p>

          <div className="space-y-12">
            <div>
              <h2 className="heading-section text-2xl text-dark mb-2">What You&apos;ll Need</h2>
              <p className="text-warm-gray mb-4">A drill/driver, pencil, level, and a step stool for higher windows. That&apos;s it.</p>
            </div>

            <div>
              <h2 className="heading-section text-2xl text-dark mb-4">Inside Mount (3 Steps)</h2>
              <ol className="space-y-4">
                <li className="flex gap-4"><span className="shrink-0 w-8 h-8 rounded-full bg-gold/10 text-gold font-bold flex items-center justify-center text-sm">1</span><div><h3 className="font-semibold text-dark">Position Brackets</h3><p className="text-sm text-warm-gray">Hold the brackets at the top inside of the window frame, 2–3 inches from each end. Mark screw holes with a pencil.</p></div></li>
                <li className="flex gap-4"><span className="shrink-0 w-8 h-8 rounded-full bg-gold/10 text-gold font-bold flex items-center justify-center text-sm">2</span><div><h3 className="font-semibold text-dark">Drill & Secure</h3><p className="text-sm text-warm-gray">Pre-drill pilot holes, then screw brackets in with the included screws. Use a level to confirm they&apos;re even.</p></div></li>
                <li className="flex gap-4"><span className="shrink-0 w-8 h-8 rounded-full bg-gold/10 text-gold font-bold flex items-center justify-center text-sm">3</span><div><h3 className="font-semibold text-dark">Snap In the Shade</h3><p className="text-sm text-warm-gray">Insert one end of the roller into the bracket, then snap the other end in. Test the shade by pulling down and releasing.</p></div></li>
              </ol>
            </div>

            <div className="border-t border-cream-dark pt-12">
              <h2 className="heading-section text-2xl text-dark mb-4">Outside Mount (3 Steps)</h2>
              <ol className="space-y-4">
                <li className="flex gap-4"><span className="shrink-0 w-8 h-8 rounded-full bg-gold/10 text-gold font-bold flex items-center justify-center text-sm">1</span><div><h3 className="font-semibold text-dark">Position Brackets</h3><p className="text-sm text-warm-gray">Hold brackets on the wall above the window frame where marked. Use a level to ensure they&apos;re straight.</p></div></li>
                <li className="flex gap-4"><span className="shrink-0 w-8 h-8 rounded-full bg-gold/10 text-gold font-bold flex items-center justify-center text-sm">2</span><div><h3 className="font-semibold text-dark">Drill & Secure</h3><p className="text-sm text-warm-gray">Use wall anchors if not drilling into a stud. Secure brackets with screws.</p></div></li>
                <li className="flex gap-4"><span className="shrink-0 w-8 h-8 rounded-full bg-gold/10 text-gold font-bold flex items-center justify-center text-sm">3</span><div><h3 className="font-semibold text-dark">Snap In the Shade</h3><p className="text-sm text-warm-gray">Same snap-in process as inside mount. Test operation and adjust as needed.</p></div></li>
              </ol>
            </div>

            <div className="rounded-xl bg-cream p-6 border border-cream-dark">
              <h3 className="font-semibold text-dark mb-2">Motorized Shades</h3>
              <p className="text-sm text-warm-gray">Motorized shades install identically — the motor is pre-installed inside the roller tube. After mounting, simply pair the remote by pressing the pairing button on the motor head.</p>
            </div>
          </div>
        </div>
      </section>
      <FinalCTA headline="Need Help With Installation?" subheadline="Contact our team for free installation support, or ask about our professional installer network." ctaLabel="Contact Us" ctaHref="/contact" />
    </>
  );
}
