import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Returns & Fit Guarantee",
  description:
    "100% Fit Guarantee on all custom roller shades. If your shade doesn't fit, we remake it free. Learn about our return and guarantee policies.",
};

export default function ReturnsPage() {
  return (
    <main className="min-h-screen bg-cream">
      {/* Hero */}
      <section className="bg-white border-b border-cream-dark">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-16 sm:py-20 text-center">
          <p className="text-xs font-bold tracking-[0.2em] uppercase text-gold mb-3">
            Our promise
          </p>
          <h1 className="font-serif text-4xl sm:text-5xl font-bold text-dark leading-tight mb-4">
            100% Fit Guarantee
          </h1>
          <p className="text-warm-gray text-base sm:text-lg max-w-xl mx-auto leading-relaxed">
            Every shade is custom-made to your exact measurements. If something
            isn&apos;t right, we make it right — no questions asked.
          </p>
        </div>
      </section>

      {/* Promise Cards */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 -mt-8">
        <div className="grid sm:grid-cols-3 gap-4">
          {[
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <polyline points="9 12 11 14 15 10" />
                </svg>
              ),
              title: "Perfect fit or free remake",
              desc: "If your shade doesn\u2019t fit your window, we\u2019ll remake it at no charge.",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
              ),
              title: "Defect-free guarantee",
              desc: "Received a defective product? We\u2019ll replace it free of charge, including shipping.",
            },
            {
              icon: (
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
                </svg>
              ),
              title: "Dedicated support",
              desc: "Call (844) 674-2716 or email us. We respond within 24 hours.",
            },
          ].map((card) => (
            <div
              key={card.title}
              className="bg-white border border-cream-dark rounded-xl p-6 text-center shadow-sm"
            >
              <div className="w-11 h-11 rounded-full bg-gold mx-auto mb-3 flex items-center justify-center">
                {card.icon}
              </div>
              <h3 className="font-sans text-[15px] font-bold text-dark mb-1">
                {card.title}
              </h3>
              <p className="text-xs text-warm-gray leading-relaxed">
                {card.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* How It Works */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 py-16">
        <div className="bg-white border border-cream-dark rounded-xl p-8 sm:p-10 mb-8">
          <h2 className="font-serif text-xl font-bold text-dark mb-6 pb-4 border-b border-cream-dark">
            How it works
          </h2>

          <div className="space-y-8">
            {[
              {
                step: "1",
                title: "Contact us within 30 days of delivery",
                desc: "Reach out via phone or email with your order number and a description of the issue. Photos are helpful but not required.",
              },
              {
                step: "2",
                title: "We review and respond",
                desc: "Our team will assess the issue within 1\u20132 business days and offer a solution \u2014 whether that\u2019s a free remake or replacement.",
              },
              {
                step: "3",
                title: "Get your replacement",
                desc: "Your corrected shade ships within 5\u20137 business days with free shipping. We\u2019ll send you a prepaid return label for the original if needed.",
              },
            ].map((item) => (
              <div key={item.step} className="flex gap-4 sm:gap-5">
                <div className="w-8 h-8 rounded-full bg-gold text-white flex items-center justify-center text-sm font-bold shrink-0 mt-0.5">
                  {item.step}
                </div>
                <div>
                  <h3 className="text-[15px] font-bold text-dark mb-0.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-warm-gray leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Policy Details */}
        <div className="bg-white border border-cream-dark rounded-xl p-8 sm:p-10 mb-8">
          <h2 className="font-serif text-xl font-bold text-dark mb-6 pb-4 border-b border-cream-dark">
            Policy details
          </h2>

          <dl className="space-y-5 text-sm">
            {[
              {
                label: "Fit guarantee",
                text: "If your custom shade doesn\u2019t fit your window as ordered, we will remake it at no cost to you. This covers manufacturing errors and measurement discrepancies.",
              },
              {
                label: "Defective products",
                text: "Shades with material defects, motor malfunctions, or operational issues will be replaced free of charge within 30 days of delivery.",
              },
              {
                label: "Exchanges & returns",
                text: "Because each shade is custom-made to your exact specifications, we are unable to accept exchanges or returns. We strongly recommend ordering free fabric swatches before purchasing to ensure you love your selection.",
              },
              {
                label: "Cancellations",
                text: "Once an order is placed, production begins immediately and the order cannot be cancelled. Our team begins cutting and assembling your custom shade right away to ensure the fastest possible delivery.",
              },
              {
                label: "Free swatches",
                text: "Not sure about a fabric? Order up to 5 free swatches shipped to your door at no cost. This is the best way to see and feel the material before committing to a full shade.",
              },
              {
                label: "Contact",
                text: "Phone: (844) 674-2716 \u00a0|\u00a0 Email: Hello@WorldWideShades.com \u00a0|\u00a0 Hours: Mon\u2013Fri 9am\u20136pm EST",
              },
            ].map((item) => (
              <div
                key={item.label}
                className="grid sm:grid-cols-[160px_1fr] gap-1 sm:gap-3"
              >
                <dt className="font-bold text-dark">{item.label}</dt>
                <dd className="text-warm-gray leading-relaxed">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>

        {/* Contact CTA */}
        <div
          className="rounded-xl overflow-hidden text-center py-10 px-6"
          style={{ background: "#0c0c0c" }}
        >
          <h2 className="font-serif text-xl font-bold text-white mb-2">
            Still have questions?
          </h2>
          <p className="text-sm text-warm-gray mb-6">
            Our shade experts are here to help — no pressure, no obligation.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:+18446742716"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-bold text-sm text-dark"
              style={{
                background: "linear-gradient(90deg, #c8a165, #d4b47a)",
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 8.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
              </svg>
              Call (844) 674-2716
            </a>
            <a
              href="mailto:Hello@WorldWideShades.com"
              className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium text-sm text-white border border-white/20 hover:bg-white/10 transition-colors"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="4" width="20" height="16" rx="2" />
                <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
              </svg>
              Hello@WorldWideShades.com
            </a>
          </div>
        </div>

        {/* Bottom link */}
        <div className="text-center mt-8">
          <Link
            href="/builder"
            className="text-sm font-semibold text-gold hover:text-gold-dark transition-colors"
          >
            &larr; Back to Shade Builder
          </Link>
        </div>
      </section>
    </main>
  );
}
