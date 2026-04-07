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
  return {
    title: title === SITE.name ? title : `${title} | ${SITE.name}`,
    description,
    alternates: { canonical: url },
    openGraph: { title, description, url, siteName: SITE.name, images: [{ url: ogImage, width: 1200, height: 630, alt: title }], type: "website", locale: "en_US" },
    twitter: { card: "summary_large_image", title, description, images: [ogImage] },
    ...(noIndex && { robots: { index: false, follow: false } }),
  };
}
