"use client";

import { useState } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { SITE } from "@/lib/constants";
import { trackGenerateLead } from "@/lib/gtm/events";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    trackGenerateLead("contact-form");
    setSubmitted(true);
  };

  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <div>
            <h1 className="heading-display text-4xl lg:text-5xl text-dark mb-4">Get in Touch</h1>
            <p className="text-lg text-warm-gray mb-8">Have questions about your project? Need help choosing fabrics or measuring? Our team is here to help.</p>
            {submitted ? (
              <div className="rounded-xl bg-cream p-8 text-center">
                <span className="text-4xl mb-4 block">✓</span>
                <h2 className="text-xl font-semibold text-dark mb-2">Message Sent!</h2>
                <p className="text-warm-gray">We&apos;ll get back to you within 1 business day.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="First Name" name="firstName" required />
                  <Field label="Last Name" name="lastName" required />
                </div>
                <Field label="Email" name="email" type="email" required />
                <Field label="Phone" name="phone" type="tel" />
                <div>
                  <label className="block text-sm font-medium text-dark mb-1.5">How can we help?</label>
                  <select name="subject" className="w-full rounded-lg border border-cream-dark bg-white px-4 py-3 text-sm text-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none">
                    <option value="">Select a topic</option>
                    <option value="consultation">Book a Consultation</option>
                    <option value="quote">Request a Custom Quote</option>
                    <option value="measurement">Measurement Help</option>
                    <option value="order">Existing Order</option>
                    <option value="other">Something Else</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1.5">Message</label>
                  <textarea name="message" rows={5} className="w-full rounded-lg border border-cream-dark bg-white px-4 py-3 text-sm text-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none resize-none" placeholder="Tell us about your project..." />
                </div>
                <button type="submit" className="w-full sm:w-auto px-8 py-3 text-base font-semibold text-white bg-gold hover:bg-gold-dark rounded-lg transition-colors">Send Message</button>
              </form>
            )}
          </div>
          <div className="lg:pl-8">
            <div className="rounded-xl bg-cream p-8 space-y-6">
              <h2 className="heading-section text-xl text-dark">Contact Information</h2>
              <ContactRow icon={Phone} label="Phone" value={SITE.phone} href={`tel:${SITE.phone}`} />
              <ContactRow icon={Mail} label="Email" value={SITE.email} href={`mailto:${SITE.email}`} />
              <ContactRow icon={MapPin} label="Service Area" value="Nationwide — Free Shipping to All 50 States" />
              <ContactRow icon={Clock} label="Hours" value="Mon–Fri 9am–6pm EST" />
            </div>
            <div className="mt-6 rounded-xl bg-dark p-8 text-white">
              <h3 className="font-semibold text-lg mb-2">Need It Fast?</h3>
              <p className="text-sm text-white/60 mb-4">Call us directly for same-day quotes on standard sizes.</p>
              <a href={`tel:${SITE.phone}`} className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-semibold bg-gold hover:bg-gold-dark rounded-lg transition-colors"><Phone className="w-4 h-4" />Call Now</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, name, type = "text", required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-dark mb-1.5">{label}{required && <span className="text-gold ml-0.5">*</span>}</label>
      <input id={name} name={name} type={type} required={required} className="w-full rounded-lg border border-cream-dark bg-white px-4 py-3 text-sm text-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none" />
    </div>
  );
}

function ContactRow({ icon: Icon, label, value, href }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href?: string }) {
  const inner = (
    <div className="flex items-start gap-3">
      <Icon className="w-5 h-5 text-gold shrink-0 mt-0.5" />
      <div><span className="block text-xs font-bold uppercase tracking-widest text-warm-gray mb-0.5">{label}</span><span className="text-sm text-dark font-medium">{value}</span></div>
    </div>
  );
  return href ? <a href={href} className="block hover:opacity-80 transition-opacity">{inner}</a> : <div>{inner}</div>;
}
