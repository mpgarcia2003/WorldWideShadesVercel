import { SITE } from "@/lib/constants";
const BASE_URL = `https://${SITE.domain}`;

export function organizationJsonLd() {
  return { "@context": "https://schema.org", "@type": "Organization", name: SITE.name, url: BASE_URL, logo: `${BASE_URL}/images/logo.png`, contactPoint: { "@type": "ContactPoint", telephone: SITE.phone, contactType: "customer service", availableLanguage: ["English", "Spanish"] }, sameAs: Object.values(SITE.social) };
}

export function websiteJsonLd() {
  return { "@context": "https://schema.org", "@type": "WebSite", name: SITE.name, url: BASE_URL, potentialAction: { "@type": "SearchAction", target: `${BASE_URL}/fabrics?q={search_term_string}`, "query-input": "required name=search_term_string" } };
}

export function localBusinessJsonLd() {
  return { "@context": "https://schema.org", "@type": "HomeAndConstructionBusiness", name: SITE.name, url: BASE_URL, telephone: SITE.phone, email: SITE.email, priceRange: "$$", areaServed: { "@type": "Country", name: "US" }, description: "Custom roller shades direct to your door. 700+ fabrics, blackout and light filtering options, motorized upgrades, free shipping." };
}

export function productCategoryJsonLd(input: { name: string; description: string; path: string; image: string; lowPrice: number; highPrice: number }) {
  return { "@context": "https://schema.org", "@type": "Product", name: input.name, description: input.description, url: `${BASE_URL}${input.path}`, image: input.image, brand: { "@type": "Brand", name: SITE.name }, offers: { "@type": "AggregateOffer", lowPrice: input.lowPrice.toFixed(2), highPrice: input.highPrice.toFixed(2), priceCurrency: "USD", availability: "https://schema.org/InStock", offerCount: "700" }, aggregateRating: { "@type": "AggregateRating", ratingValue: "4.8", reviewCount: "1247" } };
}

export function faqJsonLd(faqs: { question: string; answer: string }[]) {
  return { "@context": "https://schema.org", "@type": "FAQPage", mainEntity: faqs.map((faq) => ({ "@type": "Question", name: faq.question, acceptedAnswer: { "@type": "Answer", text: faq.answer } })) };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: items.map((item, i) => ({ "@type": "ListItem", position: i + 1, name: item.name, item: `${BASE_URL}${item.path}` })) };
}
