"use client";

import { useState } from "react";
import { FAQS } from "../data";

export function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="bg-dark-soft border-y border-dark-muted py-14 md:py-20">
      <div className="container-site max-w-3xl">
        <h2 className="heading-section text-2xl md:text-3xl text-cream text-center mb-10">Common Questions</h2>
        <div className="divide-y divide-dark-muted">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div key={faq.question}>
                <button
                  type="button"
                  aria-expanded={isOpen}
                  onClick={() => setOpenIndex(isOpen ? null : idx)}
                  className="flex items-center justify-between w-full py-5 text-left text-base font-medium text-cream cursor-pointer hover:text-gold transition-colors"
                >
                  <span>{faq.question}</span>
                  <span
                    className="text-gold text-xl font-light shrink-0 ml-4 transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)" }}
                  >
                    +
                  </span>
                </button>
                <div
                  className="overflow-hidden transition-all duration-300 ease-in-out"
                  style={{ maxHeight: isOpen ? "500px" : "0px" }}
                >
                  <p className="pb-5 text-warm-gray leading-relaxed text-sm">{faq.answer}</p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
