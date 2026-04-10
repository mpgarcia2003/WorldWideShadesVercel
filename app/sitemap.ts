import type { MetadataRoute } from "next";
import { LANDING_PAGES } from "@/data/pages";

const BASE = "https://worldwideshades.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/fabrics`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE}/builder`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/blog`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/motorized-shades`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${BASE}/swatches`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },
    { url: `${BASE}/measuring-guide`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/installation-guide`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/faq`, lastModified: now, changeFrequency: "monthly", priority: 0.7 },

  ];

  const landingPages: MetadataRoute.Sitemap = Object.keys(LANDING_PAGES).map((slug) => ({
    url: `${BASE}/${slug}`, lastModified: now, changeFrequency: "weekly" as const, priority: 0.9,
  }));

  const roomPages: MetadataRoute.Sitemap = ["bedroom", "nursery", "living-room", "home-office", "bathroom"].map((room) => ({
    url: `${BASE}/rooms/${room}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.7,
  }));

  const blogSlugs = ["blackout-shades-nursery-guide", "motorized-shades-smart-home", "how-to-measure-windows", "light-filtering-vs-blackout", "spring-window-refresh", "specialty-shape-windows"];
  const blogPages: MetadataRoute.Sitemap = blogSlugs.map((slug) => ({
    url: `${BASE}/blog/${slug}`, lastModified: now, changeFrequency: "monthly" as const, priority: 0.6,
  }));

  return [...staticPages, ...landingPages, ...roomPages, ...blogPages];
}
