import type { Metadata } from "next";
import { JsonLd } from "@/components/shared/JsonLd";
import { breadcrumbJsonLd, faqJsonLd } from "@/lib/seo/jsonld";
import { SITE } from "@/lib/constants";
import { getAllPosts, getPostBySlug } from "@/lib/blog";
import { BlogArticle } from "@/components/blog/BlogArticle";

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
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      images: post.image ? [{ url: `https://${SITE.domain}${post.image}`, width: 1200, height: 675 }] : [],
    },
    twitter: { card: "summary_large_image" },
  };
}

function articleJsonLd(post: { title: string; excerpt: string; date: string; image: string; author: string; slug: string }) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.excerpt,
    image: post.image ? `https://${SITE.domain}${post.image}` : undefined,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: post.author, url: `https://${SITE.domain}` },
    publisher: {
      "@type": "Organization",
      name: SITE.name,
      url: `https://${SITE.domain}`,
      logo: { "@type": "ImageObject", url: `https://${SITE.domain}/images/logo.png` },
    },
    mainEntityOfPage: { "@type": "WebPage", "@id": `https://${SITE.domain}/blog/${post.slug}` },
  };
}

function parseFAQs(content: string): { question: string; answer: string }[] {
  const faqs: { question: string; answer: string }[] = [];
  const lines = content.split("\n");
  let inFaq = false;
  let currentQ = "";
  let currentA: string[] = [];

  for (const line of lines) {
    if (line.startsWith("### ") && !line.toLowerCase().includes("table of contents")) {
      if (currentQ && currentA.length) {
        faqs.push({ question: currentQ, answer: currentA.join(" ").trim() });
      }
      currentQ = line.slice(4).trim();
      currentA = [];
      inFaq = true;
    } else if (inFaq && line.startsWith("## ")) {
      if (currentQ && currentA.length) {
        faqs.push({ question: currentQ, answer: currentA.join(" ").trim() });
      }
      inFaq = false;
      currentQ = "";
      currentA = [];
    } else if (inFaq && line.trim()) {
      currentA.push(line.trim());
    }
  }
  if (currentQ && currentA.length) {
    faqs.push({ question: currentQ, answer: currentA.join(" ").trim() });
  }
  return faqs;
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return <div className="section-padding text-center"><h1 className="heading-display text-3xl text-dark">Post Not Found</h1></div>;

  const faqs = parseFAQs(post.content);
  const allPosts = getAllPosts();
  const related = allPosts.filter((p) => p.slug !== slug).slice(0, 3);

  return (
    <>
      <JsonLd data={[
        breadcrumbJsonLd([{ name: "Home", path: "/" }, { name: "Blog", path: "/blog" }, { name: post.title, path: `/blog/${slug}` }]),
        articleJsonLd({ ...post, slug }),
        ...(faqs.length > 0 ? [faqJsonLd(faqs)] : []),
      ]} />
      <BlogArticle post={post} slug={slug} related={related} />
    </>
  );
}
