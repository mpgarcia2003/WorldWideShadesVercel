"use client";
import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface FAQSectionProps { faqs: { question: string; answer: string }[]; }

export function FAQSection({ faqs }: FAQSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  return (
    <section className="section-padding bg-cream/50">
      <div className="container-site container-narrow">
        <h2 className="heading-section text-3xl lg:text-4xl text-dark text-center mb-12">Frequently Asked Questions</h2>
        <dl className="space-y-3">
          {faqs.map((faq, i) => { const isOpen = openIndex === i; return (
            <div key={i} className={cn("rounded-xl border transition-colors", isOpen ? "border-gold/30 bg-white shadow-sm" : "border-cream-dark bg-white")}>
              <dt><button onClick={() => setOpenIndex(isOpen ? null : i)} className="flex items-center justify-between w-full px-6 py-4 text-left" aria-expanded={isOpen}>
                <span className="text-base font-semibold text-dark pr-4">{faq.question}</span>
                <ChevronDown className={cn("w-5 h-5 shrink-0 text-warm-gray transition-transform", isOpen && "rotate-180 text-gold")} />
              </button></dt>
              {isOpen && <dd className="px-6 pb-5"><p className="text-sm text-warm-gray leading-relaxed">{faq.answer}</p></dd>}
            </div>
          ); })}
        </dl>
      </div>
    </section>
  );
}
