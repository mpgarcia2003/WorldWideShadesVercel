import { Package } from "lucide-react";
import { CTAButton } from "@/components/shared/CTAButton";

export function SwatchesCTA() {
  return (
    <section className="section-padding bg-cream/50">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden aspect-[4/3] bg-cream-dark order-2 lg:order-1">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{ backgroundImage: "url(/images/swatches-styled.jpg)" }}
            />
            {/* Fallback if no image */}
            <div className="absolute inset-0 flex items-center justify-center bg-cream">
              <div className="text-center">
                <Package className="w-16 h-16 text-gold/30 mx-auto mb-3" />
                <span className="text-sm text-warm-gray">Fabric swatches — styled photo</span>
              </div>
            </div>
          </div>

          {/* Copy */}
          <div className="order-1 lg:order-2">
            <h2 className="heading-display text-3xl lg:text-4xl text-dark mb-4">
              Not Sure About<br />Your Fabric?
            </h2>
            <p className="text-lg text-warm-gray mb-6 max-w-md">
              We&apos;ll send up to 10 free swatches to your door. See the colors, feel the textures, test the opacity — in your own space, on your own windows.
            </p>
            <ul className="space-y-3 mb-8">
              {[
                "Free shipping — no credit card required",
                "Pick up to 10 fabrics from our 700+ collection",
                "Delivered in 3–5 business days",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2 text-sm text-dark">
                  <span className="w-1.5 h-1.5 rounded-full bg-gold shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <CTAButton
              href="/swatches"
              label="Order Free Swatches"
              trackingLocation="swatches-cta-section"
              variant="outline"
              size="lg"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
