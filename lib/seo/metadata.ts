import type { Metadata } from "next";
import { SITE } from "@/lib/constants";

interface PageMetaInput {
  title: string;
  description: string;
  path: string;
  image?: string;
  noIndex?: boolean;
}

const BASE_URL = `https://${SITE.domain}`;

export function generatePageMetadata({ title, description, path, image, noIndex = false }: PageMetaInput): Metadata {
  const url = `${BASE_URL}${path}`;
  const ogImage = image || `${BASE_URL}/images/og-default.jpg`;
  // Title note: do NOT append `| ${SITE.name}` here. The root layout's
  // metadata.title.template already does that exactly once via Next.js's
  // title template system. Appending here as well produced doubled brand
  // names like "FAQ — Frequently Asked Questions | World Wide Shades | World
  // Wide Shades" on every page using this helper (Perplexity audit
  // 2026-05-08). Returning the bare title lets the template handle suffixing.
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE.name, images: [{ url: ogImage, width: 1200, height: 630, alt: title }], type: "website", locale: "en_US" },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}
