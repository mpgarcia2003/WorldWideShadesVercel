/**
 * MobileStepGuide.tsx
 * ─────────────────────────────────────────────────────────
 * Collapsible step guide card for mobile and tablet (<lg viewports).
 * Shows a "Need help with this step?" toggle button. When tapped, expands
 * to reveal the same guide content used by the desktop right rail.
 *
 * - Auto-collapses when the user moves to a new step (so they don't carry
 *   open state across steps unintentionally).
 * - Hidden on desktop (lg+) since the right rail handles guidance there.
 * - Imports content from lib/builder-step-guides.tsx (single source of truth).
 */

import React, { useState, useEffect } from 'react';
import { ChevronDown, HelpCircle, Phone } from 'lucide-react';
import { getGuideForStep } from '../lib/builder-step-guides';

interface MobileStepGuideProps {
  openStep: number | null;
}

const MobileStepGuide: React.FC<MobileStepGuideProps> = ({ openStep }) => {
  const [isOpen, setIsOpen] = useState(false);

  // Auto-collapse when the user changes step. Keeps each step's guide
  // self-contained — opening one doesn't surprise the user on the next.
  useEffect(() => {
    setIsOpen(false);
  }, [openStep]);

  // Don't render at all if there's no active step (nothing to guide on)
  if (openStep === null) return null;

  const guide = getGuideForStep(openStep);
  const Icon = guide.icon;

  return (
    <div className="lg:hidden mx-2 mt-2 mb-1">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between gap-3 p-3.5 rounded-2xl transition-all duration-300"
        style={{
          // Apple Wallet card aesthetic: subtle vertical gold gradient (cream → soft gold)
          background: 'linear-gradient(180deg, #fefcf6 0%, #faf5e8 100%)',
          // Hint of gold border — barely visible, just a tint
          border: '1px solid rgba(200, 161, 101, 0.22)',
          // Layered shadow stack for that "floating card" depth:
          //   1. inset 3px gold stripe on left (the editorial accent)
          //   2. inset 1px white highlight on top (light-hitting-card edge effect)
          //   3. tight 1–2px shadow for crisp edge
          //   4. soft 8–16px gold-tinted shadow for floating depth
          boxShadow: isOpen
            ? 'inset 3px 0 0 #c8a165, inset 0 1px 0 rgba(255,255,255,0.7), 0 2px 4px rgba(20,20,20,0.04), 0 8px 20px rgba(200,161,101,0.18)'
            : 'inset 3px 0 0 #c8a165, inset 0 1px 0 rgba(255,255,255,0.7), 0 1px 3px rgba(20,20,20,0.04), 0 4px 12px rgba(200,161,101,0.12)',
        }}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-3 flex-1 min-w-0 pl-1">
          {/* Premium gold gradient icon badge (white icon on gold) */}
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center shrink-0"
            style={{
              background: 'linear-gradient(135deg, #d4b07a 0%, #c8a165 55%, #b8914f 100%)',
              boxShadow: '0 1px 3px rgba(184, 145, 79, 0.25), inset 0 1px 0 rgba(255,255,255,0.25)',
            }}
          >
            <HelpCircle size={16} className="text-white" strokeWidth={2} />
          </div>
          <div className="text-left flex-1 min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] leading-tight" style={{ color: '#8b6d3f' }}>
              Step {openStep + 1} guide
            </div>
            <div className="text-[14px] font-semibold text-[#1a1a1a] truncate mt-0.5" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {isOpen ? guide.headline : 'Need help with this step?'}
            </div>
          </div>
        </div>
        <ChevronDown
          size={18}
          className="shrink-0 transition-transform duration-300"
          style={{
            color: '#8b6d3f',
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
          }}
        />
      </button>

      {/* Expanded content — same Wallet-card aesthetic continued */}
      {isOpen && (
        <div
          className="rounded-2xl p-4 mt-2 animate-in fade-in slide-in-from-top-1 duration-200"
          style={{
            background: 'linear-gradient(180deg, #ffffff 0%, #fefcf6 100%)',
            border: '1px solid rgba(200, 161, 101, 0.18)',
            boxShadow:
              'inset 3px 0 0 #c8a165, inset 0 1px 0 rgba(255,255,255,0.6), 0 1px 3px rgba(20,20,20,0.04), 0 4px 12px rgba(200,161,101,0.08)',
          }}
        >
          {/* Icon header */}
          <div className="flex items-center gap-2 mb-2">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#f5f0e6' }}>
              <Icon size={14} className="text-[#8b6d3f]" />
            </div>
            <h3 className="text-[14px] font-medium text-[#1a1a1a] leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '-0.01em' }}>
              {guide.headline}
            </h3>
          </div>

          {/* Body: prefer structured `sections` (bold gold labels). Fall back to free-form `body` for default guide. */}
          {guide.sections && guide.sections.length > 0 ? (
            <div className="space-y-2.5 mb-3">
              {guide.sections.map((section, i) => (
                <div key={i}>
                  <div className="text-[12px] font-bold text-[#8b6d3f] mb-0.5">{section.label}</div>
                  <div className="text-[12px] text-[#666] leading-relaxed">{section.description}</div>
                </div>
              ))}
            </div>
          ) : guide.body ? (
            <p className="text-[12px] text-[#666] leading-relaxed mb-3">{guide.body}</p>
          ) : null}

          {/* Tips */}
          {guide.tips.length > 0 && (
            <div className="space-y-2 pt-2.5 border-t border-gray-100">
              {guide.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-2 text-[11.5px] text-[#555] leading-relaxed">
                  <span className="text-[#c8a165] font-bold mt-0.5 shrink-0">›</span>
                  <div>{tip}</div>
                </div>
              ))}
            </div>
          )}

          {/* Footer w/ click-to-call link */}
          {guide.footer && (
            <div className="mt-3 pt-3 border-t border-gray-100">
              <a
                href="tel:+18446742716"
                className="flex items-start gap-2 text-[11px] font-medium text-[#8b6d3f] italic leading-relaxed hover:text-[#a8844d] transition-colors"
              >
                <Phone size={12} className="mt-0.5 shrink-0 not-italic" />
                <span>{guide.footer}</span>
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default MobileStepGuide;
