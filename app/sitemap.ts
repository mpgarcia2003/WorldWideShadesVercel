import type { MetadataRoute } from "next";
import { LANDING_PAGES } from "@/data/pages";
import { getAllPosts } from "@/lib/blog";

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

  const blogPages: MetadataRoute.Sitemap = getAllPosts().map((post) => ({
    url: `${BASE}/blog/${post.slug}`, lastModified: post.date || now, changeFrequency: "monthly" as const, priority: 0.6,
  }));

  return [...staticPages, ...landingPages, ...roomPages, ...blogPages];
}
