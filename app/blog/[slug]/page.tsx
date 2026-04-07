import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SITE } from "@/lib/constants";

const POSTS: Record<string, { title: string; excerpt: string; category: string; date: string; image: string }> = {
  "blackout-shades-nursery-guide": { title: "The Complete Guide to Blackout Shades for Nurseries", excerpt: "Everything you need to know about creating the perfect sleep environment for your baby.", category: "Guides", date: "2026-03-28", image: "/images/blog-nursery.jpg" },
  "motorized-shades-smart-home": { title: "Motorized Shades: The Smart Home Upgrade You Didn't Know You Needed", excerpt: "How motorized window shades integrate with Alexa, Google Home, and Apple HomeKit.", category: "Product", date: "2026-03-20", image: "/images/blog-motorized.jpg" },
  "how-to-measure-windows": { title: "How to Measure Your Windows for Custom Shades", excerpt: "Step-by-step measuring guide with diagrams for inside and outside mount installations.", category: "Guides", date: "2026-03-12", image: "/images/blog-measure.jpg" },
  "light-filtering-vs-blackout": { title: "Light Filtering vs Blackout: Which Shade Is Right for Your Room?", excerpt: "A room-by-room breakdown to help you choose the perfect opacity for every window.", category: "Guides", date: "2026-03-05", image: "/images/blog-compare.jpg" },
  "spring-window-refresh": { title: "5 Ways to Refresh Your Windows This Spring", excerpt: "Simple updates that make a big impact — from new fabrics to smart upgrades.", category: "Inspiration", date: "2026-02-25", image: "/images/blog-spring.jpg" },
  "specialty-shape-windows": { title: "Shading Specialty Shape Windows: What You Need to Know", excerpt: "Triangles, arches, and hexagons — how custom shades solve unusual window challenges.", category: "Guides", date: "2026-02-18", image: "/images/blog-shapes.jpg" },
};

export async function generateStaticParams() {
  return Object.keys(POSTS).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return {};
  return { title: post.title, description: post.excerpt, alternates: { canonical: `https://${SITE.domain}/blog/${slug}` }, openGraph: { title: post.title, description: post.excerpt, type: "article", publishedTime: post.date, images: [{ url: post.image }] } };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = POSTS[slug];
  if (!post) return <div className="section-padding text-center"><h1 className="heading-display text-3xl text-dark">Post Not Found</h1></div>;

  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${slug}` }])} />
      <article className="section-padding bg-white">
        <div className="container-site container-narrow">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-warm-gray hover:text-gold transition-colors mb-8"><ArrowLeft className="w-4 h-4" />Back to Blog</Link>
          <header className="mb-10">
            <div className="flex items-center gap-3 mb-4">
              <span className="text-xs font-bold uppercase tracking-widest text-gold">{post.category}</span>
              <span className="text-xs text-warm-gray">{post.date}</span>
            </div>
            <h1 className="heading-display text-3xl lg:text-4xl xl:text-5xl text-dark mb-4">{post.title}</h1>
            <p className="text-xl text-warm-gray">{post.excerpt}</p>
          </header>
          <div className="aspect-[2/1] rounded-xl bg-dark-muted overflow-hidden mb-10">
            <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }} />
          </div>
          <div className="prose prose-lg max-w-none">
            <p className="text-warm-gray">Article content will be rendered here from CMS or MDX source files.</p>
          </div>
        </div>
      </article>
      <FinalCTA headline="Ready to Get Started?" subheadline="Design your custom shades in minutes. Free shipping. Free samples." ctaLabel="Start Designing" ctaHref="/builder" />
    </>
  );
}
