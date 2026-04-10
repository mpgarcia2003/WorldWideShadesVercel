import type { Metadata } from "next";
import Link from "next/link";
import { generatePageMetadata } from "@/lib/seo/metadata";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { getAllPosts } from "@/lib/blog";

export const metadata: Metadata = generatePageMetadata({ title: "Blog — Window Treatment Tips, Guides & Inspiration", description: "Expert guides on choosing, measuring, and installing custom window shades. Design inspiration and product updates.", path: "/blog" });

export default function BlogPage() {
  const posts = getAllPosts();
  if (posts.length === 0) {
    return (
      <section className="section-padding bg-white">
        <div className="container-site text-center py-20">
          <h1 className="heading-display text-4xl text-dark mb-4">The Shade <span className="text-gold">Journal</span></h1>
          <p className="text-warm-gray">Posts coming soon.</p>
        </div>
      </section>
    );
  }
  const [featured, ...rest] = posts;
  return (
    <>
      <JsonLd data={breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }])} />
      <section className="section-padding bg-white">
        <div className="container-site">
          <h1 className="heading-display text-4xl lg:text-5xl text-dark mb-10">The Shade <span className="text-gold">Journal</span></h1>
          <Link href={`/blog/${featured.slug}`} className="group block rounded-xl overflow-hidden bg-cream mb-12 md:grid md:grid-cols-2">
            <div className="aspect-[16/9] md:aspect-auto bg-dark-muted relative overflow-hidden">
              <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url(${featured.image})` }} />
            </div>
            <div className="p-6 md:p-10 flex flex-col justify-center">
              <span className="text-xs font-bold uppercase tracking-widest text-gold mb-3">{featured.category}</span>
              <h2 className="heading-section text-2xl lg:text-3xl text-dark mb-3 group-hover:text-gold transition-colors">{featured.title}</h2>
              <p className="text-warm-gray mb-4">{featured.excerpt}</p>
              <span className="text-sm font-semibold text-gold">Read More →</span>
            </div>
          </Link>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="group block rounded-xl overflow-hidden bg-cream hover:shadow-md transition-shadow">
                <div className="aspect-[16/10] bg-dark-muted relative overflow-hidden">
                  <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url(${post.image})` }} />
                </div>
                <div className="p-5">
                  <div className="flex items-center gap-3 mb-2">
                    <span className="text-xs font-bold uppercase tracking-widest text-gold">{post.category}</span>
                    <span className="text-xs text-warm-gray">{post.date}</span>
                  </div>
                  <h3 className="font-semibold text-dark mb-2 group-hover:text-gold transition-colors">{post.title}</h3>
                  <p className="text-sm text-warm-gray line-clamp-2">{post.excerpt}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
