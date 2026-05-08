import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  Star,
  Truck,
  Factory,
  CheckCircle,
  Phone,
  AlertTriangle,
  Wrench,
  ShieldCheck,
  Sparkles,
  Ruler,
  ChevronRight,
} from "lucide-react";
import { SITE } from "@/lib/constants";
import { SHAPES_REGISTRY, SHAPE_SLUGS, getShapeData } from "@/data/specialty-shapes";

const SITE_URL = `https://${SITE.domain}`;

/**
 * Specialty shape dynamic route
 * ───────────────────────────────────────────────────────────────────────────
 * Renders one of the dedicated shape pages (pentagon, trapezoid, triangle,
 * hexagon, arch, skylight) from the data registry at /data/specialty-shapes/.
 *
 * Routing: `app/specialty-shapes/[shape]/page.tsx` matches `/specialty-shapes/{shape}`.
 * Slugs that don't exist in SHAPES_REGISTRY return 404 (not soft-404 —
 * not-found.tsx has noindex metadata override from Week 1).
 *
 * SEO:
 * - generateStaticParams pre-renders every shape at build time → static HTML
 * - generateMetadata produces unique title/description/canonical/OG per shape
 * - JSON-LD includes Product + FAQPage + BreadcrumbList, all parameterized
 *
 * Visual language matches the parent /specialty-shapes page (gold/dark/cream
 * palette, font-serif headings, container-site layout). Sections in render
 * order: Hero → Stats → Where Found → Problem → Solution → Pricing →
 * Measuring → Gallery → FAQs → Related Shapes → Final CTA.
 */

// ─── Static generation config ───────────────────────────────────────────
export function generateStaticParams() {
  return SHAPE_SLUGS.map((shape) => ({ shape }));
}

// ─── Per-shape metadata ─────────────────────────────────────────────────
export async function generateMetadata({
  params,
}: {
  params: Promise<{ shape: string }>;
}): Promise<Metadata> {
  const { shape } = await params;
  const data = getShapeData(shape);
  if (!data) return {};

  const url = `${SITE_URL}/specialty-shapes/${data.slug}`;
  return {
    title: data.meta.title,
    description: data.meta.description,
    alternates: { canonical: url },
    openGraph: {
      title: data.meta.title,
      description: data.meta.description,
      url,
      siteName: SITE.name,
      type: "website",
      images: [
        {
          url: data.meta.ogImage,
          width: 1200,
          height: 630,
          alt: `Custom ${data.shapeName.toLowerCase()} window shades — World Wide Shades`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: data.meta.title,
      description: data.meta.description,
      images: [data.meta.ogImage],
    },
  };
}

// ─── Page component ─────────────────────────────────────────────────────
export default async function SpecialtyShapePage({
  params,
}: {
  params: Promise<{ shape: string }>;
}) {
  const { shape } = await params;
  const data = getShapeData(shape);
  if (!data) notFound();

  const pageUrl = `${SITE_URL}/specialty-shapes/${data.slug}`;

  // ─── JSON-LD: Product + FAQ + Breadcrumb ─────────────────────────────
  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "Product",
        name: `Custom ${data.shapeName} Window Shades`,
        description: data.meta.description,
        url: pageUrl,
        image: data.meta.ogImage,
        brand: { "@type": "Brand", name: "World Wide Shades" },
        manufacturer: {
          "@type": "Organization",
          name: "World Wide Shades",
          url: SITE_URL,
        },
        category: `${data.shapeName} Window Shades`,
        offers: {
          "@type": "AggregateOffer",
          priceCurrency: "USD",
          lowPrice: String(data.jsonLd.lowPrice),
          highPrice: String(data.jsonLd.highPrice),
          availability: "https://schema.org/InStock",
          deliveryLeadTime: {
            "@type": "QuantitativeValue",
            minValue: "7",
            maxValue: "10",
            unitCode: "DAY",
          },
          shippingDetails: {
            "@type": "OfferShippingDetails",
            shippingRate: {
              "@type": "MonetaryAmount",
              value: "0",
              currency: "USD",
            },
            shippingDestination: {
              "@type": "DefinedRegion",
              addressCountry: "US",
            },
          },
        },
        aggregateRating: {
          "@type": "AggregateRating",
          ratingValue: "4.9",
          reviewCount: "500",
          bestRating: "5",
          worstRating: "1",
        },
      },
      {
        "@type": "FAQPage",
        mainEntity: data.faqs.map((faq) => ({
          "@type": "Question",
          name: faq.q,
          acceptedAnswer: { "@type": "Answer", text: faq.a },
        })),
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Specialty Shapes",
            item: `${SITE_URL}/specialty-shapes`,
          },
          {
            "@type": "ListItem",
            position: 3,
            name: `${data.shapeName} Shades`,
            item: pageUrl,
          },
        ],
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* ─── 1. HERO ─────────────────────────────────────────── */}
      <section
        className="relative min-h-[80vh] flex flex-col justify-center items-center text-center text-white overflow-hidden"
        style={{
          backgroundImage: `url(${data.hero.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-dark/82" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />

        <div className="relative z-10 container-site section-padding flex flex-col items-center gap-6 px-4">
          {/* Breadcrumb (visible) */}
          <nav
            aria-label="Breadcrumb"
            className="flex items-center gap-2 text-xs font-sans text-warm-gray uppercase tracking-widest"
          >
            <Link href="/" className="hover:text-gold transition-colors">
              Home
            </Link>
            <ChevronRight className="w-3 h-3" />
            <Link
              href="/specialty-shapes"
              className="hover:text-gold transition-colors"
            >
              Specialty Shapes
            </Link>
            <ChevronRight className="w-3 h-3" />
            <span className="text-gold">{data.shapeName} Shades</span>
          </nav>

          {/* Eyebrow badge */}
          <div className="inline-flex items-center gap-2 bg-white/10 border border-white/20 rounded-full px-4 py-1.5 text-xs font-sans font-semibold tracking-widest text-warm-gray uppercase">
            {data.hero.badge}
          </div>

          {/* Shape icon (small, above H1) */}
          {data.hero.shapeIconUrl && (
            <img
              src={data.hero.shapeIconUrl}
              alt={`${data.shapeName} window shape icon`}
              className="h-16 w-auto opacity-70"
            />
          )}

          {/* H1 */}
          <h1 className="heading-display font-serif text-white max-w-4xl leading-tight">
            {data.hero.h1}
          </h1>

          {/* Subhead */}
          <p className="font-sans text-lg md:text-xl text-warm-gray max-w-2xl leading-relaxed">
            {data.hero.subhead}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-2">
            <Link
              href="/builder"
              className="inline-block bg-gold text-dark font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200"
            >
              Design Your {data.shapeName} Shade
            </Link>
            <Link
              href="/swatches"
              className="inline-block border border-white/50 text-white font-sans font-semibold text-base px-8 py-4 rounded-sm hover:bg-white/10 transition-colors duration-200"
            >
              Order Free Swatches
            </Link>
          </div>

          {/* Trust row */}
          <div className="flex flex-wrap justify-center gap-6 mt-6 text-sm font-sans text-warm-gray">
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-gold fill-gold" />
              4.9/5 from 500+ Homeowners
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-gold" />
              Ships 7–10 Days
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-gold" />
              100% Fit Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <Factory className="w-4 h-4 text-gold" />
              Made in USA
            </span>
          </div>
        </div>
      </section>

      {/* ─── 2. STATS BAR ──────────────────────────────────────── */}
      <section className="bg-dark border-y border-white/10">
        <div className="container-site">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-white/10">
            {data.stats.map((stat) => (
              <div
                key={stat.label}
                className="flex flex-col items-center py-8 px-4 text-center"
              >
                <span className="font-serif text-3xl md:text-4xl font-bold text-gold leading-none">
                  {stat.value}
                </span>
                <span className="font-sans text-sm text-warm-gray mt-2 uppercase tracking-wider">
                  {stat.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 3. WHERE FOUND (architectural context) ──────────── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <h2 className="heading-section font-serif text-dark">
              {data.whereFound.headline}
            </h2>
            <p className="font-sans text-warm-gray mt-4 leading-relaxed">
              {data.whereFound.intro}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {data.whereFound.contexts.map((ctx) => (
              <div
                key={ctx.title}
                className="bg-white rounded-lg p-6 flex flex-col gap-3 shadow-sm border border-cream-dark"
              >
                <h3 className="font-serif text-lg font-bold text-dark leading-snug">
                  {ctx.title}
                </h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">
                  {ctx.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 4. PROBLEM ──────────────────────────────────────── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">
              The Problem
            </p>
            <h2 className="heading-section font-serif text-white">
              {data.problem.headline}
            </h2>
            <p className="font-sans text-warm-gray mt-4 leading-relaxed">
              {data.problem.intro}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {data.problem.points.map((pt) => (
              <div
                key={pt.title}
                className="bg-dark-soft rounded-lg p-7 flex flex-col gap-3 border border-white/10"
              >
                <div className="w-10 h-10 rounded-full bg-red-400/10 flex items-center justify-center shrink-0">
                  <AlertTriangle className="w-5 h-5 text-red-400" />
                </div>
                <h3 className="font-serif text-lg font-bold text-white leading-snug">
                  {pt.title}
                </h3>
                <p className="font-sans text-sm text-warm-gray leading-relaxed">
                  {pt.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 5. SOLUTION ─────────────────────────────────────── */}
      <section className="section-padding bg-cream-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">
              How We Solve It
            </p>
            <h2 className="heading-section font-serif text-dark">
              {data.solution.headline}
            </h2>
            <p className="font-sans text-warm-gray mt-4 leading-relaxed">
              {data.solution.intro}
            </p>
          </div>

          <div className="grid sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {data.solution.points.map((pt, i) => {
              const Icon = [Wrench, ShieldCheck, Sparkles, Factory][i % 4];
              return (
                <div
                  key={pt.title}
                  className="bg-white rounded-lg p-7 flex flex-col gap-3 shadow-sm border border-cream-dark"
                >
                  <div className="w-10 h-10 rounded-full bg-gold/15 flex items-center justify-center shrink-0">
                    <Icon className="w-5 h-5 text-gold" />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-dark leading-snug">
                    {pt.title}
                  </h3>
                  <p className="font-sans text-sm text-warm-gray leading-relaxed">
                    {pt.body}
                  </p>
                </div>
              );
            })}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/builder"
              className="inline-block bg-dark text-white font-sans font-semibold text-sm px-10 py-4 rounded-sm hover:bg-dark-soft transition-colors duration-200"
            >
              Start Building Your {data.shapeName} Shade
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 6. PRICING ──────────────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-site px-4">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">
              Transparent Pricing
            </p>
            <h2 className="heading-section font-serif text-dark">
              {data.pricing.headline}
            </h2>
            <p className="font-sans text-warm-gray mt-4 leading-relaxed">
              {data.pricing.intro}
            </p>
            <p className="font-serif text-3xl text-gold mt-6 font-bold">
              {data.pricing.startingPrice}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {data.pricing.examples.map((ex, i) => (
              <div
                key={ex.dimensions}
                className={`rounded-lg p-7 flex flex-col gap-3 shadow-sm ${
                  i === 1
                    ? "bg-dark text-white border-2 border-gold"
                    : "bg-white border border-cream-dark"
                }`}
              >
                <p
                  className={`font-sans text-xs font-bold tracking-widest uppercase ${
                    i === 1 ? "text-gold" : "text-warm-gray"
                  }`}
                >
                  Example
                </p>
                <h3
                  className={`font-serif text-base font-semibold leading-snug ${
                    i === 1 ? "text-white" : "text-dark"
                  }`}
                >
                  {ex.dimensions}
                </h3>
                <p
                  className={`font-sans text-sm leading-relaxed flex-1 ${
                    i === 1 ? "text-warm-gray" : "text-warm-gray"
                  }`}
                >
                  {ex.fabric}
                </p>
                <p
                  className={`font-serif text-2xl font-bold mt-2 ${
                    i === 1 ? "text-gold" : "text-dark"
                  }`}
                >
                  {ex.price}
                </p>
              </div>
            ))}
          </div>

          <p className="text-center font-sans text-sm text-warm-gray mt-10 max-w-2xl mx-auto leading-relaxed">
            {data.pricing.note}
          </p>

          <div className="text-center mt-8">
            <Link
              href="/builder"
              className="inline-block bg-gold text-dark font-sans font-semibold text-sm px-10 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200"
            >
              Get Your Exact Quote
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 7. MEASURING GUIDE ──────────────────────────────── */}
      <section className="section-padding bg-dark">
        <div className="container-site px-4">
          <div className="text-center mb-12 max-w-2xl mx-auto">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">
              Measuring Guide
            </p>
            <h2 className="heading-section font-serif text-white">
              {data.measuring.headline}
            </h2>
            <p className="font-sans text-warm-gray mt-4 leading-relaxed">
              {data.measuring.intro}
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-5">
            {data.measuring.steps.map((step) => (
              <div
                key={step.number}
                className="flex gap-5 bg-dark-soft rounded-lg p-6 border border-white/10"
              >
                <div className="w-10 h-10 rounded-full bg-gold flex items-center justify-center shrink-0 font-serif font-bold text-dark">
                  {step.number}
                </div>
                <div className="flex flex-col gap-1">
                  <h3 className="font-serif text-base font-bold text-white leading-snug">
                    {step.title}
                  </h3>
                  <p className="font-sans text-sm text-warm-gray leading-relaxed">
                    {step.body}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="max-w-3xl mx-auto mt-10 bg-gold/10 border border-gold/30 rounded-lg p-6 flex gap-4 items-start">
            <Ruler className="w-5 h-5 text-gold shrink-0 mt-0.5" />
            <p className="font-sans text-sm text-warm-gray leading-relaxed">
              {data.measuring.callout}
            </p>
          </div>
        </div>
      </section>

      {/* ─── 8. GALLERY (optional) ──────────────────────────── */}
      {data.gallery && (
        <section className="section-padding bg-dark-muted">
          <div className="container-site px-4">
            <div className="text-center mb-10 max-w-2xl mx-auto">
              <h2 className="heading-section font-serif text-white">
                {data.gallery.headline}
              </h2>
              <p className="font-sans text-warm-gray mt-3 leading-relaxed">
                {data.gallery.intro}
              </p>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {data.gallery.images.map((img) => (
                <div
                  key={img.caption}
                  className="rounded-lg overflow-hidden group relative"
                >
                  <img
                    src={img.src}
                    alt={img.alt}
                    className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    style={{ height: "240px" }}
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent" />
                  <p className="absolute bottom-3 left-3 right-3 font-sans text-xs font-semibold text-white">
                    {img.caption}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ─── 9. FAQ ──────────────────────────────────────────── */}
      <section className="section-padding bg-cream">
        <div className="container-narrow px-4">
          <div className="text-center mb-12">
            <h2 className="heading-section font-serif text-dark">
              {data.shapeName} Shade FAQs
            </h2>
            <p className="font-sans text-warm-gray mt-3">
              Everything you need to know before ordering.
            </p>
          </div>

          <div className="space-y-0 divide-y divide-cream-dark border border-cream-dark rounded-lg overflow-hidden">
            {data.faqs.map((faq, idx) => (
              <details key={idx} className="group bg-white">
                <summary className="flex items-center justify-between gap-4 px-6 py-5 cursor-pointer list-none hover:bg-cream transition-colors duration-150">
                  <span className="font-serif text-base font-bold text-dark">
                    {faq.q}
                  </span>
                  <span className="shrink-0 w-5 h-5 rounded-full border border-cream-dark flex items-center justify-center text-dark font-bold text-sm group-open:rotate-45 transition-transform duration-200">
                    +
                  </span>
                </summary>
                <div className="px-6 pb-5 pt-1">
                  <p className="font-sans text-sm text-warm-gray leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* ─── 10. RELATED SHAPES (internal linking) ──────────── */}
      <section className="section-padding bg-cream-dark">
        <div className="container-site px-4">
          <div className="text-center mb-10 max-w-2xl mx-auto">
            <p className="font-sans text-xs font-bold tracking-widest text-gold uppercase mb-3">
              Other Specialty Shapes
            </p>
            <h2 className="heading-section font-serif text-dark">
              We Cover Every Custom Shape
            </h2>
            <p className="font-sans text-warm-gray mt-3 leading-relaxed">
              {data.shapeName} not the right shape? See our other specialty
              shape pages, or browse the full catalog of windows we cover.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {data.relatedShapes.map((rel) => {
              const href = rel.hasPage
                ? `/specialty-shapes/${rel.slug}`
                : "/specialty-shapes";
              return (
                <Link
                  key={rel.slug}
                  href={href}
                  className="bg-white rounded-lg p-5 flex flex-col gap-2 shadow-sm border border-cream-dark hover:border-gold hover:shadow-md transition-all duration-200"
                >
                  <h3 className="font-serif text-base font-bold text-dark leading-snug">
                    {rel.name}
                  </h3>
                  <p className="font-sans text-xs text-warm-gray leading-relaxed flex-1">
                    {rel.description}
                  </p>
                  <span className="font-sans text-xs font-semibold text-gold mt-2">
                    {rel.hasPage ? "View Page →" : "See Catalog →"}
                  </span>
                </Link>
              );
            })}
          </div>

          <div className="text-center mt-10">
            <Link
              href="/specialty-shapes"
              className="inline-block bg-dark text-white font-sans font-semibold text-sm px-10 py-4 rounded-sm hover:bg-dark-soft transition-colors duration-200"
            >
              See All Specialty Shapes
            </Link>
          </div>
        </div>
      </section>

      {/* ─── 11. FINAL CTA ───────────────────────────────────── */}
      <section
        className="relative section-padding flex flex-col justify-center items-center text-center text-white overflow-hidden"
        style={{
          backgroundImage: `url(${data.hero.backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-dark/85" />
        <div className="noise-overlay absolute inset-0 pointer-events-none" />

        <div className="relative z-10 container-narrow px-4 flex flex-col items-center gap-6 py-16">
          <h2 className="heading-section font-serif text-white max-w-2xl leading-tight">
            {data.finalCta.headline}
          </h2>

          <p className="font-sans text-lg text-warm-gray max-w-xl leading-relaxed">
            {data.finalCta.subhead}
          </p>

          <Link
            href="/builder"
            className="inline-block bg-gold text-dark font-sans font-semibold text-base px-10 py-4 rounded-sm hover:bg-gold-dark transition-colors duration-200"
          >
            Design Your {data.shapeName} Shade
          </Link>

          <div className="flex flex-wrap justify-center gap-6 mt-2 text-sm font-sans text-warm-gray">
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 text-gold fill-gold" />
              4.9/5 from 500+ Homeowners
            </span>
            <span className="flex items-center gap-1.5">
              <Truck className="w-4 h-4 text-gold" />
              Ships 7–10 Days
            </span>
            <span className="flex items-center gap-1.5">
              <CheckCircle className="w-4 h-4 text-gold" />
              100% Fit Guarantee
            </span>
            <span className="flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-gold" />
              (844) 674-2716
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
