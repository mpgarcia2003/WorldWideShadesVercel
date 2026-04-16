import type { Metadata } from "next";
import { Hero } from "./components/Hero";
import { HowItWorks } from "./components/HowItWorks";
import { Pricing } from "./components/Pricing";
import { IntentFilter } from "./components/IntentFilter";
import { Reviews } from "./components/Reviews";
import { RoomUseCases } from "./components/RoomUseCases";
import { BlackoutDifference } from "./components/BlackoutDifference";
import { SideChannels } from "./components/SideChannels";
import { Urgency } from "./components/Urgency";
import { ComparisonTable } from "./components/ComparisonTable";
import { Motorization } from "./components/Motorization";
import { FAQ } from "./components/FAQ";
import { FinalCTA } from "./components/FinalCTA";
import { MobileStickyBar } from "./components/MobileStickyBar";
import { FAQS, IMAGES } from "./data";

// ── Metadata (server-rendered in <head>) ──
export const metadata: Metadata = {
  title: "Custom Blackout Roller Shades | Up to 50% Off | World Wide Shades",
  description:
    "100% light-blocking blackout roller shades, custom-built to your exact window. 200+ fabrics, factory-direct from $145. Ships in ~7 days. Free shipping. Made in USA.",
  openGraph: {
    title: "Custom Blackout Roller Shades | World Wide Shades",
    description: "Order custom blackout roller shades online. 100% light blocking, built to your exact window. From $145 with Spring Sale.",
    url: "https://www.worldwideshades.com/blackout-roller-shades",
    siteName: "World Wide Shades",
    type: "website",
    images: [{ url: IMAGES.heroBgOg, width: 1200, height: 630, alt: "Custom blackout roller shades in a modern bedroom" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Custom Blackout Roller Shades | World Wide Shades",
    description: "100% light-blocking shades built to your exact window. From $145. Ships in ~7 days.",
    images: [IMAGES.heroBgOg],
  },
  alternates: {
    canonical: "https://www.worldwideshades.com/blackout-roller-shades",
  },
};

// ── JSON-LD Structured Data ──
const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Product",
      name: "Custom Blackout Roller Shades",
      description: "100% light-blocking blackout roller shades, custom-built to your exact window size. 200+ premium fabrics, factory-direct pricing, ships in ~7 days.",
      brand: { "@type": "Brand", name: "World Wide Shades" },
      manufacturer: { "@type": "Organization", name: "World Wide Shades", url: "https://worldwideshades.com" },
      url: "https://worldwideshades.com/blackout-roller-shades",
      image: IMAGES.heroBgOg,
      category: "Blackout Window Shades",
      material: "Premium Blackout Fabric",
      countryOfOrigin: "US",
      offers: {
        "@type": "AggregateOffer",
        priceCurrency: "USD",
        lowPrice: "145",
        highPrice: "700",
        offerCount: "200",
        availability: "https://schema.org/InStock",
        deliveryLeadTime: { "@type": "QuantitativeValue", value: "7", unitCode: "DAY" },
        shippingDetails: {
          "@type": "OfferShippingDetails",
          shippingRate: { "@type": "MonetaryAmount", value: "0", currency: "USD" },
          shippingDestination: { "@type": "DefinedRegion", addressCountry: "US" },
        },
      },
      aggregateRating: { "@type": "AggregateRating", ratingValue: "4.9", reviewCount: "500", bestRating: "5" },
      review: [
        { "@type": "Review", author: { "@type": "Person", name: "Rachel M." }, reviewRating: { "@type": "Rating", ratingValue: "5" }, reviewBody: "Quoted $2,400 locally for our nursery. Paid under $700 with World Wide Shades. The blackout is complete — our toddler finally sleeps past 6am." },
        { "@type": "Review", author: { "@type": "Person", name: "David K." }, reviewRating: { "@type": "Rating", ratingValue: "5" }, reviewBody: "I work nights. Tried everything — curtains, foil, you name it. These are zero light leakage. Like sleeping in a cave. Worth every penny." },
        { "@type": "Review", author: { "@type": "Person", name: "James T." }, reviewRating: { "@type": "Rating", ratingValue: "5" }, reviewBody: "Legitimately zero light in our theater room. Added the motorized option — close them with Alexa before movie night." },
      ],
      additionalProperty: [
        { "@type": "PropertyValue", name: "Light Blocking", value: "100%" },
        { "@type": "PropertyValue", name: "Custom Sizing", value: "Yes — built to exact measurements (to 1/8 inch)" },
        { "@type": "PropertyValue", name: "Fabric Options", value: "200+" },
        { "@type": "PropertyValue", name: "Motorized Option", value: "Available" },
        { "@type": "PropertyValue", name: "Smart Home Compatible", value: "Alexa, Google Home, Apple HomeKit, SmartThings, Matter" },
        { "@type": "PropertyValue", name: "Warranty", value: "100% Fit Guarantee" },
      ],
    },
    {
      "@type": "FAQPage",
      mainEntity: FAQS.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    },
    {
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: "https://www.worldwideshades.com" },
        { "@type": "ListItem", position: 2, name: "Blackout Roller Shades", item: "https://www.worldwideshades.com/blackout-roller-shades" },
      ],
    },
  ],
};

// ── Page ──
export default function BlackoutRollerShadesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <main className="bg-dark pb-16 md:pb-0">
        {/* 1 — Hero: H1 + price anchor + CTAs */}
        <Hero />

        {/* 2 — How It Works: 4-step process */}
        <HowItWorks />

        {/* 3 — Pricing: transparent pricing upfront */}
        <Pricing />

        {/* 4 — Intent Filter: qualify/disqualify visitors */}
        <IntentFilter />

        {/* 5 — Reviews: social proof */}
        <Reviews />

        {/* 6 — Blackout Difference: why custom > stock */}
        <BlackoutDifference />

        {/* 7 — Side Channels: upsell + education */}
        <SideChannels />

        {/* 8 — Room Use Cases */}
        <RoomUseCases />

        {/* 9 — Comparison Table: vs competitors */}
        <ComparisonTable />

        {/* 10 — Urgency: limited production */}
        <Urgency />

        {/* 11 — Motorization: upsell */}
        <Motorization />

        {/* 12 — FAQ */}
        <FAQ />

        {/* 13 — Final CTA */}
        <FinalCTA />
      </main>

      {/* Sticky mobile CTA bar */}
      <MobileStickyBar />
    </>
  );
}
