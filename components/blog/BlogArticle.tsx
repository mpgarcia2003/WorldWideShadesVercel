"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronDown } from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeSlug from "rehype-slug";
import type { BlogPost } from "@/lib/blog";

interface BlogArticleProps {
  post: BlogPost;
  slug: string;
  related: BlogPost[];
}

function slugify(text: string): string {
  return text.toLowerCase().replace(/[^\w\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").trim();
}

export function BlogArticle({ post, slug, related }: BlogArticleProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [tocOpen, setTocOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<string | null>(null);
  const articleRef = useRef<HTMLDivElement>(null);

  // Extract headings for TOC
  const headings = post.content
    .split("\n")
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const text = line.slice(3).trim();
      return { id: slugify(text), text };
    });

  // Intersection observer for active heading tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActiveId(entry.target.id);
        }
      },
      { rootMargin: "-80px 0px -75% 0px", threshold: 0 }
    );
    const headingElements = document.querySelectorAll("article h2[id]");
    headingElements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  const wordCount = post.content.split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 250);

  return (
    <>
      {/* Hero */}
      <section className="pt-12 pb-0 px-5 bg-white">
        <div className="max-w-[680px] mx-auto text-center">
          <Link href="/blog" className="inline-flex items-center gap-1.5 text-sm text-warm-gray hover:text-gold transition-colors mb-8">
            <ArrowLeft className="w-4 h-4" /> Back to Blog
          </Link>
          <div className="flex items-center justify-center gap-3 mb-6 text-xs uppercase tracking-[0.08em] text-warm-gray">
            <span className="text-gold font-semibold">{post.category}</span>
            <span>&middot;</span>
            <span>{post.date}</span>
            <span>&middot;</span>
            <span>{readTime} min read</span>
          </div>
          <h1 className="heading-display text-3xl lg:text-4xl xl:text-5xl text-dark mb-5 leading-[1.12]">{post.title}</h1>
          <p className="text-lg text-warm-gray leading-relaxed max-w-[560px] mx-auto mb-10">{post.excerpt}</p>
        </div>
        {post.image && (
          <div className="max-w-[960px] mx-auto pb-12">
            <div className="rounded-xl overflow-hidden aspect-video bg-dark-muted">
              <img src={post.image} alt={post.title} className="w-full h-full object-cover" loading="eager" />
            </div>
          </div>
        )}
      </section>

      {/* Two-column layout */}
      <div className="max-w-[1200px] mx-auto px-5 grid grid-cols-1 lg:grid-cols-[220px_1fr] gap-16 relative">
        {/* TOC Sidebar */}
        <aside className="lg:block">
          {/* Mobile toggle */}
          <div className="lg:hidden sticky top-[56px] z-50 bg-white border-b border-cream-dark -mx-5 px-5">
            <button onClick={() => setTocOpen(!tocOpen)} className="flex items-center justify-between w-full py-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-warm-gray">Table of Contents</span>
              <ChevronDown className={`w-4 h-4 text-warm-gray transition-transform ${tocOpen ? "rotate-180" : ""}`} />
            </button>
            {tocOpen && (
              <nav className="pb-4">
                <ul className="border-l-2 border-cream-dark">
                  {headings.map((h) => (
                    <li key={h.id}>
                      <a href={`#${h.id}`} onClick={() => setTocOpen(false)} className={`block py-1.5 pl-4 text-sm -ml-[2px] border-l-2 transition-colors ${activeId === h.id ? "text-gold border-gold font-medium" : "text-warm-gray border-transparent hover:text-dark"}`}>
                        {h.text}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            )}
          </div>

          {/* Desktop sticky TOC */}
          <nav className="hidden lg:block sticky top-24">
            <ul className="border-l-2 border-cream-dark">
              {headings.map((h) => (
                <li key={h.id}>
                  <a href={`#${h.id}`} className={`block py-2 pl-5 text-[13px] leading-snug -ml-[2px] border-l-2 transition-colors ${activeId === h.id ? "text-gold border-gold font-medium" : "text-warm-gray border-transparent hover:text-dark"}`}>
                    {h.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </aside>

        {/* Article content */}
        <article ref={articleRef} className="max-w-[680px] pb-16">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeSlug]}
            components={{
              h2: ({ children, id, ...props }) => (
                <h2 id={id} className="font-display text-2xl lg:text-3xl text-dark mt-12 mb-6 pl-5 border-l-[3px] border-gold scroll-mt-24" {...props}>{children}</h2>
              ),
              h3: ({ children, id, ...props }) => {
                const text = String(children);
                const faqId = id || slugify(text);
                const isOpen = openFaq === faqId;
                return (
                  <div className="border-b border-cream-dark">
                    <button onClick={() => setOpenFaq(isOpen ? null : faqId)} className="w-full flex items-center justify-between gap-4 py-5 text-left text-[17px] font-medium text-dark hover:text-gold transition-colors" aria-expanded={isOpen}>
                      <span>{children}</span>
                      <ChevronDown className={`w-5 h-5 flex-shrink-0 transition-transform ${isOpen ? "rotate-180" : ""}`} />
                    </button>
                    {isOpen && (
                      <div className="pb-5 text-warm-gray text-base leading-relaxed" id={faqId}>
                        {/* FAQ answer is rendered by the next paragraph elements */}
                      </div>
                    )}
                  </div>
                );
              },
              p: ({ children, ...props }) => (
                <p className="text-lg leading-[1.72] text-warm-gray mb-5" {...props}>{children}</p>
              ),
              strong: ({ children, ...props }) => (
                <strong className="text-dark font-semibold" {...props}>{children}</strong>
              ),
              a: ({ href, children, ...props }) => (
                <a href={href} className="text-gold underline decoration-gold/35 underline-offset-[3px] hover:decoration-gold transition-colors" {...props}>{children}</a>
              ),
              ul: ({ children, ...props }) => (
                <ul className="list-none pl-0 mb-6 space-y-3" {...props}>{children}</ul>
              ),
              li: ({ children, ...props }) => (
                <li className="relative pl-6 text-lg leading-[1.72] text-warm-gray before:content-[''] before:absolute before:left-0 before:top-[11px] before:w-1.5 before:h-1.5 before:rounded-full before:bg-gold" {...props}>{children}</li>
              ),
              blockquote: ({ children, ...props }) => (
                <blockquote className="border-l-[3px] border-gold pl-6 py-4 my-8 bg-gold/5 rounded-r-lg" {...props}>{children}</blockquote>
              ),
              table: ({ children, ...props }) => (
                <div className="overflow-x-auto my-6">
                  <table className="w-full border-collapse rounded-xl overflow-hidden border border-cream-dark text-[15px]" {...props}>{children}</table>
                </div>
              ),
              thead: ({ children, ...props }) => (
                <thead className="bg-cream" {...props}>{children}</thead>
              ),
              th: ({ children, ...props }) => (
                <th className="px-5 py-4 text-left font-semibold text-sm text-dark tracking-wide border-b-2 border-cream-dark" {...props}>{children}</th>
              ),
              td: ({ children, ...props }) => (
                <td className="px-5 py-3 text-warm-gray border-b border-cream-dark leading-snug" {...props}>{children}</td>
              ),
              img: ({ src, alt }) => (
                <div className="rounded-xl overflow-hidden my-8">
                  <img src={src} alt={alt || ""} className="w-full h-auto" loading="lazy" />
                </div>
              ),
              hr: () => <hr className="border-none h-px bg-cream-dark my-10" />,
            }}
          >
            {post.content}
          </ReactMarkdown>
        </article>
      </div>

      {/* CTA Banner */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-dark" />
        <div className="absolute inset-0 bg-gradient-to-br from-gold/10 via-transparent to-gold/5" />
        <div className="container-site relative z-10 text-center">
          <p className="text-xs uppercase tracking-[0.12em] text-gold font-medium mb-3">Ready to See the Difference?</p>
          <h2 className="heading-display text-2xl lg:text-3xl text-white mb-4">Precision-Measured Shades, Shipped to Your Door</h2>
          <p className="text-sm text-white/60 max-w-md mx-auto mb-6">World Wide Shades offers precision-measured, custom-built window treatments shipped directly to your door.</p>
          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Link href="/builder" className="inline-flex items-center gap-2 px-6 py-3 bg-gold text-white text-sm font-medium rounded hover:bg-gold-dark transition-colors">
              Design Your Custom Shade &rarr;
            </Link>
            <Link href="/swatches" className="inline-flex items-center gap-2 px-6 py-3 border border-white/30 text-white text-sm font-medium rounded hover:border-white/60 hover:bg-white/5 transition-colors">
              Request Free Swatches
            </Link>
          </div>
        </div>
      </section>

      {/* Author Card */}
      <div className="max-w-[680px] mx-auto px-5 py-12">
        <div className="flex items-start gap-5 p-6 bg-white border border-cream-dark rounded-xl">
          <div className="w-12 h-12 rounded-full bg-cream flex items-center justify-center flex-shrink-0">
            <span className="text-lg font-display text-warm-gray">W</span>
          </div>
          <div>
            <h3 className="font-display text-lg text-dark mb-1">{post.author}</h3>
            <p className="text-[15px] text-warm-gray leading-relaxed mb-2">Custom window shade experts based in The Bronx, NY. We design, manufacture, and ship precision-fit roller shades, cellular shades, and motorized window treatments to homes across the U.S.</p>
            <Link href="/contact" className="text-sm text-gold font-medium hover:underline">About World Wide Shades &rarr;</Link>
          </div>
        </div>
      </div>

      {/* Related Posts */}
      {related.length > 0 && (
        <section className="bg-cream py-16 px-5 mt-16">
          <div className="max-w-[1200px] mx-auto">
            <h2 className="heading-display text-2xl lg:text-3xl text-dark mb-8 text-center">More from the Blog</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {related.map((r) => (
                <Link key={r.slug} href={`/blog/${r.slug}`} className="group block bg-white rounded-xl overflow-hidden border border-cream-dark hover:-translate-y-1 hover:shadow-lg transition-all">
                  {r.image && (
                    <div className="aspect-[16/10] bg-dark-muted relative overflow-hidden">
                      <img src={r.image} alt={r.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                      <span className="absolute top-3 left-3 text-[11px] font-semibold uppercase tracking-wider text-white bg-black/35 backdrop-blur-sm px-2 py-0.5 rounded">{r.category}</span>
                    </div>
                  )}
                  <div className="p-5">
                    <h3 className="font-display text-[17px] text-dark leading-snug mb-1 group-hover:text-gold transition-colors">{r.title}</h3>
                    <span className="text-xs text-warm-gray">{r.date}</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
