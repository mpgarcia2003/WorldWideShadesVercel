"use client";

import { useState, useRef, useEffect } from "react";
import { Mail, Phone, MapPin, Clock } from "lucide-react";
import { SITE } from "@/lib/constants";
import { trackGenerateLead } from "@/lib/gtm/events";

// ─── Contact Page ──────────────────────────────────────────────────────────
// Wired up 2026-05-09. Previously the submit handler only fired GA4 and
// flipped the success state — never sent the message anywhere. Now POSTs
// to /api/contact which persists to Supabase + emails admin + auto-replies
// to the customer. See app/api/contact/route.ts for the backend logic.
//
// ANTI-BOT DEFENSE (added 2026-05-09 after first bot probe submission):
// 3 invisible layers — none affect real customers, none affect LLM crawlers
// reading this page. They ONLY filter form submissions.
//
//   1. HONEYPOT FIELD: hidden input named "website" that real users can't
//      see (CSS-hidden + aria-hidden + autocomplete=off + tabindex=-1).
//      Bots auto-fill every input — humans don't. If submitted with a value,
//      the API silently rejects (returns 200 success so the bot doesn't know).
//
//   2. RENDER TIMESTAMP: captured on mount. Sent with submission. The API
//      rejects submissions <3s after render — humans take longer to read,
//      type, and review. Scripted submissions are sub-second.
//
//   3. SERVER-SIDE HEURISTICS: pattern scoring in the API for things like
//      no-vowel names, message-with-zero-spaces, base64 message bodies,
//      invalid US area codes, suspicious TLDs. 2+ flags → save as 'spam'.
//
// LLM CRAWLABILITY: this page is fully crawlable. The `/contact` route is
// in robots.ts allow list, in the sitemap, and in llms.txt. The honeypot
// field is invisible HTML the crawler can ignore. Defenses only fire on
// POST to /api/contact, not on GET of this page.
export default function ContactPage() {
  // Form state (controlled inputs so we can submit programmatically)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");

  // ─── ANTI-BOT: honeypot + render timestamp ─────────────────────────
  // honeypotValue: hidden field. Real users never see it, never type into
  // it. Bots filling all fields will set this. API rejects if non-empty.
  const [honeypotValue, setHoneypotValue] = useState("");
  // renderTimestamp: captured on mount. Used server-side to enforce a
  // minimum time-to-submit (humans take >3s to fill out a form; bots
  // submit in milliseconds). useRef so it survives re-renders without
  // triggering them.
  const renderTimestampRef = useRef<number>(0);
  useEffect(() => {
    renderTimestampRef.current = Date.now();
  }, []);

  // UI state
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (loading) return; // prevent double-submit

    setErrorMsg(null);
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          firstName,
          lastName,
          email,
          phone: phone || null,
          subject: subject || null,
          message,
          source_page: typeof window !== "undefined" ? window.location.pathname + window.location.search : null,
          // Anti-bot fields. Sent with every submission. Real users send:
          //   honeypot: "" (they can't see the field)
          //   formRenderedAt: ms timestamp from when the form was rendered
          // Bots typically send:
          //   honeypot: <some value> (they fill all inputs blindly)
          //   formRenderedAt: missing or sub-second-old
          honeypot: honeypotValue,
          formRenderedAt: renderTimestampRef.current || Date.now(),
        }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data?.success) {
        // DB save failed — show the customer an error so they can retry or call.
        const msg =
          data?.error ||
          "Something went wrong sending your message. Please call us at (844) 674-2716 or try again in a moment.";
        setErrorMsg(msg);
        setLoading(false);
        return;
      }

      // Successful save (regardless of email delivery — DB has the message).
      // Fire GA4 lead event AFTER the actual save so the count reflects
      // real submissions, not just clicks (the previous code fired the
      // event on click even when the message went nowhere).
      trackGenerateLead("contact-form");
      setSubmitted(true);
    } catch (err) {
      console.error("Contact form submit error:", err);
      setErrorMsg(
        "Could not connect. Please check your internet and try again, or call (844) 674-2716."
      );
      setLoading(false);
    }
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
                <p className="text-warm-gray">We&apos;ll get back to you within 1 business day. Check your inbox for a confirmation.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* ─── HONEYPOT FIELD ─────────────────────────────────────
                    Real users never see, never tab to, never fill this.
                    Bots that auto-fill every form input will set it. The API
                    silently rejects (200 OK with no save) when this has a
                    value, so the bot doesn't learn it was detected.

                    Defense in depth:
                    • CSS: position:absolute + left:-9999px keeps it offscreen
                      (display:none can be detected by smarter bots; offscreen
                      positioning is harder to filter out)
                    • aria-hidden="true": screen readers skip it entirely
                    • tabindex={-1}: keyboard users can't tab into it
                    • autoComplete="off": browsers don't autofill it
                    • Field name "website" is intentionally tempting to bots
                      (they love filling URL/website-looking fields).
                ─────────────────────────────────────────────────────────── */}
                <div
                  aria-hidden="true"
                  style={{
                    position: "absolute",
                    left: "-9999px",
                    width: "1px",
                    height: "1px",
                    overflow: "hidden",
                    opacity: 0,
                    pointerEvents: "none",
                  }}
                >
                  <label htmlFor="website-url-confirm">
                    Leave this field empty
                    <input
                      id="website-url-confirm"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={honeypotValue}
                      onChange={(e) => setHoneypotValue(e.target.value)}
                    />
                  </label>
                </div>

                <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                  <Field label="First Name" name="firstName" required value={firstName} onChange={setFirstName} />
                  <Field label="Last Name" name="lastName" required value={lastName} onChange={setLastName} />
                </div>
                <Field label="Email" name="email" type="email" required value={email} onChange={setEmail} />
                <Field label="Phone" name="phone" type="tel" value={phone} onChange={setPhone} />
                <div>
                  <label className="block text-sm font-medium text-dark mb-1.5">How can we help?</label>
                  <select
                    name="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    className="w-full rounded-lg border border-cream-dark bg-white px-4 py-3 text-sm text-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none"
                  >
                    <option value="">Select a topic</option>
                    <option value="consultation">Book a Consultation</option>
                    <option value="quote">Request a Custom Quote</option>
                    <option value="measurement">Measurement Help</option>
                    <option value="order">Existing Order</option>
                    <option value="other">Something Else</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-dark mb-1.5">Message<span className="text-gold ml-0.5">*</span></label>
                  <textarea
                    name="message"
                    rows={5}
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="w-full rounded-lg border border-cream-dark bg-white px-4 py-3 text-sm text-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none resize-none"
                    placeholder="Tell us about your project..."
                  />
                </div>

                {errorMsg && (
                  <div role="alert" className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full sm:w-auto px-8 py-3 text-base font-semibold text-white bg-gold hover:bg-gold-dark rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
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

// Controlled field component — accepts value + onChange so the parent
// can read submission data when the form is submitted.
function Field({
  label,
  name,
  type = "text",
  required = false,
  value,
  onChange,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label htmlFor={name} className="block text-sm font-medium text-dark mb-1.5">
        {label}
        {required && <span className="text-gold ml-0.5">*</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-lg border border-cream-dark bg-white px-4 py-3 text-sm text-dark focus:border-gold focus:ring-1 focus:ring-gold outline-none"
      />
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
