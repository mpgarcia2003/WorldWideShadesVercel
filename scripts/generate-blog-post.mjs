/**
 * Auto-generate a daily SEO blog post for World Wide Shades
 * Called by GitHub Actions on a cron schedule
 */

import { readdir, writeFile, readFile } from "fs/promises";
import { existsSync } from "fs";
import { join } from "path";

const BLOG_DIR = "content/blog";
const IMAGES_DIR = "public/images";
const API_URL = "https://api.anthropic.com/v1/messages";
const API_KEY = process.env.ANTHROPIC_API_KEY;
const UNSPLASH_KEY = process.env.UNSPLASH_ACCESS_KEY;

if (!API_KEY) {
  console.error("ANTHROPIC_API_KEY not set");
  process.exit(1);
}

// ─── Image Fetching ─────────────────────────────────────
async function fetchHeroImage(slug, searchQuery) {
  if (!UNSPLASH_KEY) {
    console.log("⚠️  No UNSPLASH_ACCESS_KEY — using placeholder image");
    return "/images/blog-placeholder.jpg";
  }

  try {
    const query = encodeURIComponent(searchQuery);
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${query}&orientation=landscape&per_page=1`,
      { headers: { Authorization: `Client-ID ${UNSPLASH_KEY}` } }
    );
    const data = await res.json();

    if (!data.results || data.results.length === 0) {
      console.log("No Unsplash results, using placeholder");
      return "/images/blog-placeholder.jpg";
    }

    const photo = data.results[0];
    const imageUrl = photo.urls.regular; // 1080px wide

    // Download the image
    const imgRes = await fetch(imageUrl);
    const buffer = Buffer.from(await imgRes.arrayBuffer());
    const imgPath = join(IMAGES_DIR, `blog-${slug}.jpg`);
    await writeFile(imgPath, buffer);

    console.log(`📸 Image saved: ${imgPath} (${Math.round(buffer.length / 1024)}KB)`);
    console.log(`   Credit: ${photo.user.name} on Unsplash`);

    return `/images/blog-${slug}.jpg`;
  } catch (err) {
    console.error("Image fetch failed:", err.message);
    return "/images/blog-placeholder.jpg";
  }
}

// ─── Topic Bank ─────────────────────────────────────────
// Each topic becomes one blog post. Script picks the first unused one.
// Add more topics anytime — the script skips already-published slugs.
const TOPICS = [
  { slug: "solar-shades-vs-blackout-shades", title: "Solar Shades vs. Blackout Shades: Which Do You Need?", keywords: "solar shades vs blackout, solar roller shades", imageQuery: "modern living room window sunlight" },
  { slug: "best-roller-shades-home-office", title: "The Best Roller Shades for a Home Office", keywords: "home office roller shades, reduce glare window shades", imageQuery: "home office window natural light desk" },
  { slug: "how-to-clean-roller-shades", title: "How to Clean Roller Shades Without Ruining Them", keywords: "clean roller shades, roller shade maintenance", imageQuery: "clean white window shades interior" },
  { slug: "dual-roller-shades-guide", title: "Dual Roller Shades: Day and Night Privacy in One Window", keywords: "dual roller shades, day night shades", imageQuery: "modern bedroom window shades daylight" },
  { slug: "roller-shades-vs-blinds", title: "Roller Shades vs. Blinds: A Complete Comparison", keywords: "roller shades vs blinds, blinds or shades", imageQuery: "window blinds roller shades interior comparison" },
  { slug: "energy-efficient-window-shades", title: "Energy-Efficient Window Shades: Can They Lower Your Electric Bill?", keywords: "energy efficient shades, window shades save energy", imageQuery: "energy efficient home window sunlight" },
  { slug: "best-fabrics-roller-shades", title: "The Best Fabrics for Custom Roller Shades Explained", keywords: "roller shade fabrics, best shade material", imageQuery: "fabric swatches textile samples" },
  { slug: "roller-shades-kitchen-bathroom", title: "Roller Shades for Kitchens and Bathrooms: Moisture-Resistant Options", keywords: "kitchen roller shades, bathroom window shades, moisture resistant", imageQuery: "modern kitchen window natural light" },
  { slug: "smart-home-motorized-shades-setup", title: "How to Set Up Motorized Shades With Your Smart Home", keywords: "smart home shades setup, motorized shades alexa google", imageQuery: "smart home automation living room" },
  { slug: "child-safe-window-treatments", title: "Child-Safe Window Treatments: What Every Parent Should Know", keywords: "child safe window shades, cordless shades safety", imageQuery: "child safe nursery window bright" },
  { slug: "roller-shades-rental-apartment", title: "The Best Window Shades for Renters", keywords: "window shades renters, temporary roller shades apartment", imageQuery: "apartment window city view modern" },
  { slug: "custom-shades-new-construction", title: "Ordering Custom Shades for New Construction: Timing and Tips", keywords: "custom shades new build, window treatments new construction", imageQuery: "new home construction large windows" },
  { slug: "light-filtering-shades-guide", title: "Light Filtering Shades: Everything You Need to Know", keywords: "light filtering shades, sheer roller shades", imageQuery: "soft light through sheer window shade" },
  { slug: "woven-wood-shades-guide", title: "Woven Wood Shades: Natural Texture for Modern Homes", keywords: "woven wood shades, bamboo roller shades", imageQuery: "woven bamboo wood window shade interior" },
  { slug: "commercial-roller-shades-office", title: "Commercial Roller Shades for Offices and Workspaces", keywords: "commercial roller shades, office window treatments", imageQuery: "modern office building windows interior" },
  { slug: "roller-shade-valance-options", title: "Roller Shade Valances and Cassettes: Which Finish Is Right?", keywords: "roller shade valance, cassette headrail", imageQuery: "modern window treatment detail close up" },
  { slug: "how-to-install-roller-shades", title: "How to Install Roller Shades: DIY Guide", keywords: "install roller shades, roller shade installation", imageQuery: "diy home improvement window installation" },
  { slug: "best-window-shades-bedroom", title: "The Best Window Shades for Bedrooms in 2026", keywords: "bedroom window shades, best shades for sleep", imageQuery: "bedroom window morning light peaceful" },
  { slug: "blackout-curtains-vs-blackout-shades", title: "Blackout Curtains vs. Blackout Shades: Which Is Better?", keywords: "blackout curtains vs shades, blackout window treatments", imageQuery: "dark bedroom blackout window treatments" },
  { slug: "outdoor-roller-shades-patio", title: "Outdoor Roller Shades for Patios and Porches", keywords: "outdoor roller shades, patio shade solutions", imageQuery: "outdoor patio shade covered terrace" },
  { slug: "window-shades-color-guide", title: "How to Choose the Right Color for Your Window Shades", keywords: "shade color guide, window shade colors", imageQuery: "interior design color palette window" },
  { slug: "roller-shades-french-doors", title: "Window Shades for French Doors: What Works and What Doesn't", keywords: "french door shades, window treatments french doors", imageQuery: "french doors natural light interior" },
  { slug: "skylight-shades-guide", title: "Skylight Shades: Options for Hard-to-Reach Windows", keywords: "skylight shades, skylight window treatments", imageQuery: "skylight window natural light ceiling" },
  { slug: "uv-protection-window-shades", title: "UV-Blocking Window Shades: Protect Your Furniture and Floors", keywords: "uv protection shades, sun damage window treatments", imageQuery: "sunlight through window hardwood floor" },
  { slug: "roller-shades-vs-roman-shades", title: "Roller Shades vs. Roman Shades: Style and Function Compared", keywords: "roller shades vs roman shades, shade types compared", imageQuery: "elegant window treatments interior design" },
  { slug: "window-shade-trends-2026", title: "Window Shade Trends for 2026: What's In and What's Out", keywords: "window shade trends, 2026 window treatment trends", imageQuery: "modern minimalist interior design 2026" },
  { slug: "noise-reducing-window-shades", title: "Can Window Shades Reduce Noise? What the Data Says", keywords: "noise reducing shades, soundproof window treatments", imageQuery: "peaceful quiet bedroom window" },
  { slug: "pet-friendly-window-treatments", title: "Pet-Friendly Window Treatments That Actually Last", keywords: "pet friendly shades, durable window treatments pets", imageQuery: "dog cat home window sunlight" },
  { slug: "window-shades-increase-home-value", title: "Do Custom Window Shades Increase Home Value?", keywords: "window shades home value, window treatments resale", imageQuery: "beautiful home interior staging" },
  { slug: "best-shades-south-facing-windows", title: "Best Window Shades for South-Facing Windows", keywords: "south facing window shades, sun control shades", imageQuery: "bright south facing window sunlight living room" },
];

// ─── Main ───────────────────────────────────────────────
async function main() {
  // Get existing blog post slugs
  const existing = new Set();
  if (existsSync(BLOG_DIR)) {
    const files = await readdir(BLOG_DIR);
    for (const f of files) {
      if (f.endsWith(".md")) existing.add(f.replace(".md", ""));
    }
  }

  console.log(`Found ${existing.size} existing posts`);

  // Pick the first topic that hasn't been written yet
  const topic = TOPICS.find((t) => !existing.has(t.slug));
  if (!topic) {
    console.log("All topics exhausted! Add more to the TOPICS array.");
    process.exit(0);
  }

  console.log(`Generating: ${topic.slug} — "${topic.title}"`);

  // Fetch hero image from Unsplash
  const imagePath = await fetchHeroImage(topic.slug, topic.imageQuery || topic.title);

  // Generate the blog post via Claude API
  const today = new Date().toISOString().slice(0, 10);

  const prompt = `Write a comprehensive, SEO-optimized blog post for World Wide Shades (worldwideshades.com), a custom roller shade manufacturer.

TOPIC: ${topic.title}
TARGET KEYWORDS: ${topic.keywords}
DATE: ${today}

REQUIREMENTS:
- Write 1,500-2,500 words of expert, helpful content
- Use ## for section headers (H2). Do NOT include an H1 — the title is in frontmatter
- Include a FAQ section at the bottom with 3-4 questions using ### for each question
- Naturally link to these internal pages where relevant (don't force them):
  - /builder (shade configurator)
  - /swatches (free fabric samples)
  - /contact (contact page)
  - /blog/blackout-shades-no-light-gaps
  - /blog/custom-roller-shades-vs-home-depot
  - /blog/motorized-roller-shades-worth-it
  - /blog/inside-mount-vs-outside-mount-roller-shades
  - /blog/how-to-measure-windows-roller-shades
  - /blog/custom-window-shade-costs
  - /blog/blackout-shades-nursery-cordless
  - /blog/custom-roller-shades-large-windows
- Write in a knowledgeable, practical, trustworthy voice — like an industry expert talking to a homeowner
- Include specific data points, measurements, or price ranges where relevant
- Do NOT use generic filler phrases like "In today's world" or "When it comes to"
- Do NOT include any HTML, schema markup, or script tags
- End with a CTA linking to /builder, /swatches, and /contact
- Include one image reference: ![Custom window shades by World Wide Shades](${imagePath})

OUTPUT FORMAT — Return ONLY the markdown below, nothing else:

---
title: "${topic.title}"
excerpt: "WRITE A 1-2 SENTENCE DESCRIPTION HERE"
category: "Guides"
date: "${today}"
image: "${imagePath}"
author: "World Wide Shades"
---

ARTICLE CONTENT HERE`;

  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": API_KEY,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 4096,
      messages: [{ role: "user", content: prompt }],
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    console.error("API error:", response.status, err);
    process.exit(1);
  }

  const data = await response.json();
  let content = data.content[0]?.text || "";

  // Clean up — remove any markdown code fences if present
  content = content.replace(/^```markdown\n?/i, "").replace(/\n?```$/i, "").trim();

  // Validate frontmatter exists
  if (!content.startsWith("---")) {
    console.error("Generated content missing frontmatter");
    process.exit(1);
  }

  // Write the file
  const filePath = join(BLOG_DIR, `${topic.slug}.md`);
  await writeFile(filePath, content, "utf-8");
  console.log(`✅ Published: ${filePath}`);
  console.log(`   Title: ${topic.title}`);
  console.log(`   Words: ~${content.split(/\s+/).length}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
