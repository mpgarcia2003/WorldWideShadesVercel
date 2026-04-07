import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { FAQSection, FinalCTA } from "@/components/sections";
import { JsonLd } from "@/components/shared/JsonLd";
import { faqJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";

export const metadata: Metadata = generatePageMetadata({ title: "FAQ — Frequently Asked Questions About Custom Shades", description: "Answers to common questions about ordering, measuring, installing, and maintaining custom roller shades from World Wide Shades.", path: "/faq" });

const FAQS = [
  { question: "How much do custom shades cost?", answer: "Our custom shades average $300 per window. Price depends on window size, fabric choice, and upgrades. Blackout and light filtering start at similar price points. Motorized upgrades start at $250." },
  { question: "How do I measure my windows?", answer: "We have a detailed measuring guide with step-by-step instructions for both inside mount and outside mount. Measure width and height at 3 points and use the smallest measurement for inside mount." },
  { question: "How long does it take to receive my shades?", answer: "Custom shades ship free within 7–10 business days. Each shade is precision-cut and quality-checked before shipping." },
  { question: "Can I get free fabric samples?", answer: "Yes! Order up to 10 free swatches and we'll ship them to you at no cost. See and feel the fabrics in your own space before ordering." },
  { question: "What's the difference between blackout and light filtering?", answer: "Blackout shades block 100% of light — ideal for bedrooms and media rooms. Light filtering shades diffuse sunlight for a warm glow while maintaining daytime privacy — great for living areas." },
  { question: "Do you offer motorized shades?", answer: "Yes. Any shade can be upgraded with a rechargeable motor ($250). Add the Smart Hub ($185) for app control, voice commands (Alexa/Google/HomeKit), and scheduling." },
  { question: "How do I install my shades?", answer: "Every shade includes brackets, screws, and a step-by-step guide. Most installations take under 10 minutes per window. No contractor needed." },
  { question: "Can you make shades for unusual window shapes?", answer: "Yes! We specialize in custom shapes — triangles, trapezoids, arches, hexagons, and more. Contact us with your measurements for a custom quote." },
  { question: "What is your return policy?", answer: "We offer a 100% satisfaction guarantee. If your shade doesn't fit or you're not happy with it, contact us and we'll make it right with a remake or refund." },
  { question: "Do you ship internationally?", answer: "Currently we ship free to all 50 US states. International shipping is available for an additional fee — contact us for a quote." },
  { question: "Can I order just one shade?", answer: "Absolutely. There's no minimum order. Whether you need one shade or fifty, every order gets the same custom quality and free shipping." },
  { question: "How do I clean my shades?", answer: "Most fabrics can be spot-cleaned with a damp cloth. For regular maintenance, a light dusting with a microfiber cloth or vacuum with a brush attachment works well." },
];

export default function FAQPage() {
  return (
    <>
      <JsonLd data={[faqJsonLd(FAQS), breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "FAQ", path: "/faq" }])]} />
      <section className="pt-12 pb-0 bg-cream/50">
        <div className="container-site text-center max-w-2xl mx-auto">
          <h1 className="heading-display text-4xl lg:text-5xl text-dark mb-4">Frequently Asked Questions</h1>
          <p className="text-lg text-warm-gray">Everything you need to know about ordering custom shades from World Wide Shades.</p>
        </div>
      </section>
      <FAQSection faqs={FAQS} />
      <FinalCTA headline="Still Have Questions?" subheadline="Our team is happy to help. Reach out for free consultations and measurement support." ctaLabel="Contact Us" ctaHref="/contact" />
    </>
  );
}
