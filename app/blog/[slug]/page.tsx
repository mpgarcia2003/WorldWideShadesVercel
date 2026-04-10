import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd } from "@/lib/seo/jsonld";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { SITE } from "@/lib/constants";
import { getAllPosts, getPostBySlug } from "@/lib/blog";

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `https://${SITE.domain}/blog/${slug}` },
    openGraph: { title: post.title, description: post.excerpt, type: "article", publishedTime: post.date, images: post.image ? [{ url: post.image }] : [] },
  };
}

function renderMarkdown(content: string): string {
  // Simple markdown to HTML — handles headers, bold, italic, links, lists, paragraphs
  return content
    .split("\n\n")
    .map((block) => {
      block = block.trim();
      if (!block) return "";
      // Headers
      if (block.startsWith("### ")) return `<h3>${inline(block.slice(4))}</h3>`;
      if (block.startsWith("## ")) return `<h2>${inline(block.slice(3))}</h2>`;
      if (block.startsWith("# ")) return `<h1>${inline(block.slice(2))}</h1>`;
      // Unordered list
      if (block.match(/^[-*] /m)) {
        const items = block.split("\n").filter(l => l.match(/^[-*] /)).map(l => `<li>${inline(l.replace(/^[-*] /, ""))}</li>`).join("");
        return `<ul>${items}</ul>`;
      }
      // Paragraph
      return `<p>${inline(block.replace(/\n/g, " "))}</p>`;
    })
    .join("\n");
}

function inline(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2" class="text-gold hover:text-gold-dark underline">$1</a>');
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return <div className="section-padding text-center"><h1 className="heading-display text-3xl text-dark">Post Not Found</h1></div>;

  const html = renderMarkdown(post.content);

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
          {post.image && (
            <div className="aspect-[2/1] rounded-xl bg-dark-muted overflow-hidden mb-10">
              <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${post.image})` }} />
            </div>
          )}
          <div
            className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-dark prose-p:text-warm-gray prose-strong:text-dark prose-a:text-gold prose-li:text-warm-gray"
            dangerouslySetInnerHTML={{ __html: html }}
          />
        </div>
      </article>
      <FinalCTA headline="Ready to Get Started?" subheadline="Design your custom shades in minutes. Free shipping. Free samples." ctaLabel="Start Designing" ctaHref="/builder" />
    </>
  );
}
