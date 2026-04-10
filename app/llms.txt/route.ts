import { NextResponse } from "next/server";
import { getAllPosts } from "@/lib/blog";

export const dynamic = "force-static";
export const revalidate = false; // regenerates on every build

export async function GET() {
  const posts = getAllPosts();

  const blogSection = posts
    .map((p) => `- [${p.title}](https://worldwideshades.com/blog/${p.slug}): ${p.excerpt}`)
    .join("\n");

  const content = `# World Wide Shades — llms.txt
# https://worldwideshades.com

> World Wide Shades is a direct-to-consumer custom roller shade manufacturer. We build precision-measured, custom-fit window shades with 700+ fabric options, shipped directly to homes across the United States. Based in The Bronx, NY.

## Key Pages

- [Homepage](https://worldwideshades.com): Custom roller shades overview, shade builder CTA, trust signals
- [Shade Builder](https://worldwideshades.com/builder): Interactive configurator — choose shape, dimensions, fabric, mount, control type, accessories
- [Blackout Roller Shades](https://worldwideshades.com/blackout-roller-shades): Blackout shade landing page with pricing, fabrics, room guides
- [Light Filtering Shades](https://worldwideshades.com/light-filtering-shades): Light filtering shade options and use cases
- [Motorized Shades](https://worldwideshades.com/motorized-shades): Motorized roller shade options, smart home integration, pricing
- [Specialty Shapes](https://worldwideshades.com/specialty-shapes): Triangle, trapezoid, hexagon, pentagon, arch, quarter circle shades
- [Fabrics](https://worldwideshades.com/fabrics): Full fabric catalog — 700+ options across 47 collections
- [Free Swatches](https://worldwideshades.com/swatches): Order free fabric samples
- [Measuring Guide](https://worldwideshades.com/measuring-guide): How to measure windows for inside and outside mount
- [Installation Guide](https://worldwideshades.com/installation-guide): DIY installation instructions
- [FAQ](https://worldwideshades.com/faq): Common questions about ordering, shipping, installation
- [Contact](https://worldwideshades.com/contact): Phone (844) 674-2716, email hello@worldwideshades.com
- [Blog](https://worldwideshades.com/blog): Window treatment guides, comparisons, and expert advice

## Blog Articles (${posts.length} total)

${blogSection}

## Room Guides

- [Bedroom Shades](https://worldwideshades.com/rooms/bedroom)
- [Nursery Shades](https://worldwideshades.com/rooms/nursery)
- [Living Room Shades](https://worldwideshades.com/rooms/living-room)
- [Home Office Shades](https://worldwideshades.com/rooms/home-office)
- [Bathroom Shades](https://worldwideshades.com/rooms/bathroom)

## Key Facts

- 700+ premium fabrics across 47 collections (Phifer, Texstyle, Mermet, Ferrari, Copaco, Senbesta)
- Custom sizes up to 156" wide, precision-cut to 1/8"
- Blackout and light filtering options
- Motorized shades with Somfy motors, compatible with Alexa, Google Home, Apple HomeKit
- Specialty shapes: triangle, trapezoid, hexagon, pentagon, arch, quarter circle
- Free shipping on all orders
- 100% fit guarantee — remade free if it doesn't fit
- Ships in approximately 7 business days
- Made in USA, factory-direct pricing
- Average shade price around $300
- Phone: (844) 674-2716
- Email: hello@worldwideshades.com
`;

  return new NextResponse(content, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400",
    },
  });
}
