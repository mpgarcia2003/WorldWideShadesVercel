import { HeroSection } from "./HeroSection";
import { TrustBar } from "./TrustBar";
import { ValueProps } from "./ValueProps";
import { UseCases } from "./UseCases";
import { FabricShowcase } from "./FabricShowcase";
import { HowItWorks } from "./HowItWorks";
import { Accessories } from "./Accessories";
import { Testimonials } from "./Testimonials";
import { FAQSection } from "./FAQSection";
import { FinalCTA } from "./FinalCTA";
import { JsonLd } from "@/components/shared/JsonLd";
import { productCategoryJsonLd, faqJsonLd, breadcrumbJsonLd } from "@/lib/seo/jsonld";
import type { LandingPageData } from "@/data/pages";

export function LandingPageTemplate({ data }: { data: LandingPageData }) {
  return (
    <>
      <JsonLd data={[
        productCategoryJsonLd({ name: data.meta.title, description: data.meta.description, path: `/${data.slug}`, image: data.hero.backgroundImage, lowPrice: data.jsonLd.lowPrice, highPrice: data.jsonLd.highPrice }),
        faqJsonLd(data.faqs),
        breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: data.meta.title.split("—")[0].trim(), path: `/${data.slug}` }]),
      ]} />
      <HeroSection {...data.hero} />
      <TrustBar items={data.trustBar} />
      <ValueProps {...data.valueProps} />
      <UseCases {...data.useCases} />
      <FabricShowcase {...data.fabricShowcase} />
      <HowItWorks {...data.howItWorks} />
      {data.accessories && <Accessories {...data.accessories} />}
      <Testimonials {...data.testimonials} />
      <FAQSection faqs={data.faqs} />
      <FinalCTA {...data.finalCta} />
    </>
  );
}
