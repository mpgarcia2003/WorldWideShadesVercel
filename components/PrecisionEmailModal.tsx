import React, { useEffect, useMemo, useState } from "react";

type PrecisionEmailModalProps = {
  open: boolean;
  onClose: () => void;
  onSubmit: (email: string) => Promise<void> | void;

  // Optional customization
  shapeLabel?: string; // e.g., "Trapezoid"
  incentiveLabel?: string; // e.g., "Exclusive 15% custom order incentive"
  showShopPayNote?: boolean;
  initialEmail?: string;
  loadingText?: string;
  ctaText?: string;
};

const emailRegex =
  // pragmatic email validation
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

export default function PrecisionEmailModal({
  open,
  onClose,
  onSubmit,
  shapeLabel = "Trapezoid",
  incentiveLabel = "Exclusive 15% custom order incentive",
  showShopPayNote = true,
  initialEmail = "",
  loadingText = "Saving…",
  ctaText = "SAVE MY CUSTOM DESIGN",
}: PrecisionEmailModalProps) {
  const [email, setEmail] = useState(initialEmail);
  const [touched, setTouched] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const isValid = useMemo(() => emailRegex.test(email.trim()), [email]);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    document.addEventListener("keydown", onKeyDown);
    // lock scroll
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", onKeyDown);
      document.body.style.overflow = prev;
    };
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setEmail(initialEmail);
      setTouched(false);
      setSubmitting(false);
    }
  }, [open, initialEmail]);

  if (!open) return null;

  const error = touched && !isValid ? "Enter a valid email address." : "";

  const handleSubmit = async () => {
    setTouched(true);
    if (!isValid || submitting) return;

    try {
      setSubmitting(true);
      await onSubmit(email.trim());
      onClose();
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-[1000] flex items-center justify-center px-4"
      role="dialog"
      aria-modal="true"
      aria-label="Save your custom design"
      style={{ animation: 'precisionFadeIn 0.3s ease forwards' }}
    >
      {/* Backdrop */}
      <button
        aria-label="Close modal"
        onClick={onClose}
        className="absolute inset-0 cursor-default bg-black/55 backdrop-blur-[2px]"
      />

      {/* Modal */}
      <div
        className="relative w-full max-w-[820px] overflow-hidden rounded-2xl border border-white/10 shadow-2xl"
        style={{ animation: 'precisionModalUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards' }}
      >
        {/* Gold edge glow */}
        <div className="absolute inset-x-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-[#c9a66b] to-transparent opacity-90" />

        {/* Ambient gradient */}
        <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_70%_55%,rgba(201,166,107,0.22),transparent_55%),radial-gradient(900px_500px_at_35%_15%,rgba(255,255,255,0.08),transparent_60%),linear-gradient(180deg,rgba(17,17,17,0.92),rgba(10,10,10,0.92))]" />

        {/* Noise overlay (subtle) */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.08]"
          style={{
            backgroundImage:
              "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='220' height='220'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.9' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='220' height='220' filter='url(%23n)' opacity='.45'/%3E%3C/svg%3E\")",
          }}
        />

        <div className="relative p-6 sm:p-10">
          {/* Close */}
          <button
            onClick={onClose}
            className="absolute right-4 top-4 rounded-full p-2 text-white/70 transition hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-[#c9a66b]/60"
            aria-label="Close"
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 20 20"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M5 5L15 15M15 5L5 15"
                stroke="currentColor"
                strokeWidth="1.6"
                strokeLinecap="round"
              />
            </svg>
          </button>

          {/* Header */}
          <div className="text-center">
            <div className="mx-auto mb-3 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-1.5">
              <span className="text-[#c9a66b]">✦</span>
              <span className="text-sm tracking-wide text-white/85">
                Precision Matters.
              </span>
            </div>

            <h2 className="mx-auto max-w-[18ch] font-serif text-2xl leading-tight text-white sm:text-4xl" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Your Custom {shapeLabel} Shade Is Almost Ready.
            </h2>

            <p className="mx-auto mt-3 max-w-[62ch] text-sm leading-relaxed text-white/70 sm:text-base">
              {shapeLabel} shades require exact measurements. Save your
              configuration and our design team will personally review it before
              production.
            </p>
          </div>

          {/* Benefits */}
          <div className="mx-auto mt-7 grid max-w-[680px] gap-3 sm:mt-8">
            <BenefitRow label="Save your exact dimensions" />
            <BenefitRow label="Complimentary measurement review" />
            <BenefitRow label="Priority production support" />
            <BenefitRow label={incentiveLabel} />
          </div>

          {/* Form */}
          <div className="mx-auto mt-7 max-w-[680px] sm:mt-8">
            <div className="rounded-2xl border border-white/10 bg-white/[0.04] p-4 sm:p-5">
              <label className="sr-only" htmlFor="precision-email">
                Email address
              </label>

              <div className="relative">
                <input
                  id="precision-email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onBlur={() => setTouched(true)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
                  placeholder="your@email.com"
                  inputMode="email"
                  autoComplete="email"
                  autoFocus
                  className={[
                    "h-12 w-full rounded-xl border bg-black/30 px-4 text-white placeholder:text-white/35",
                    "transition focus:outline-none focus:ring-2",
                    error
                      ? "border-red-400/40 focus:ring-red-400/40"
                      : "border-white/10 focus:ring-[#c9a66b]/45",
                  ].join(" ")}
                />
                <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                  <div
                    className={[
                      "h-2.5 w-2.5 rounded-full transition-colors duration-300",
                      isValid ? "bg-emerald-400/80" : "bg-white/15",
                    ].join(" ")}
                    aria-hidden="true"
                  />
                </div>
              </div>

              {error ? (
                <div className="mt-2 text-xs text-red-200/80">{error}</div>
              ) : (
                <div className="mt-2 text-xs text-white/35">
                  We'll only use this to send your saved configuration.
                </div>
              )}

              <button
                onClick={handleSubmit}
                disabled={submitting}
                className={[
                  "mt-4 h-12 w-full rounded-xl font-semibold tracking-wide",
                  "transition focus:outline-none focus:ring-2 focus:ring-offset-0",
                  "bg-gradient-to-b from-[#d8bb84] to-[#b79355] text-black",
                  "hover:from-[#e2c892] hover:to-[#c19a59]",
                  "disabled:cursor-not-allowed disabled:opacity-70",
                ].join(" ")}
              >
                {submitting ? loadingText : ctaText}
              </button>

              {showShopPayNote && (
                <div className="mt-3 text-center text-xs text-white/45">
                  Available with{" "}
                  <span className="inline-flex items-center gap-1 rounded-md bg-white/10 px-2 py-0.5 text-white/75">
                    <span className="font-semibold">Shop</span>
                    <span className="rounded bg-white px-1 text-[10px] font-bold text-black">
                      Pay
                    </span>
                  </span>{" "}
                  Installments
                </div>
              )}

              <button
                onClick={onClose}
                className="mt-3 w-full text-center text-xs text-white/35 underline-offset-4 transition hover:text-white/60 hover:underline"
              >
                Continue without saving
              </button>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes precisionFadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes precisionModalUp {
          0% { opacity: 0; transform: translateY(20px) scale(0.96); }
          100% { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

function BenefitRow({ label }: { label: string }) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3">
      <span className="mt-0.5 inline-flex h-6 w-6 flex-none items-center justify-center rounded-full bg-[#c9a66b]/15 text-[#c9a66b]">
        <svg
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M13.2 4.6L6.7 11.1L2.8 7.2"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </span>
      <div className="text-sm text-white/80">{label}</div>
    </div>
  );
}
