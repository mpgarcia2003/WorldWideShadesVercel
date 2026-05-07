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
        className="w-full flex items-center justify-between gap-3 p-3 bg-white rounded-xl transition-all"
        style={{
          border: isOpen ? '1.5px solid #c8a165' : '1px solid rgba(20,20,20,0.08)',
          boxShadow: isOpen ? '0 4px 12px rgba(200,161,101,0.12)' : '0 1px 3px rgba(0,0,0,0.02)',
        }}
        aria-expanded={isOpen}
      >
        <div className="flex items-center gap-2.5 flex-1 min-w-0">
          <div className="w-8 h-8 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#f5f0e6' }}>
            <HelpCircle size={15} className="text-[#8b6d3f]" />
          </div>
          <div className="text-left flex-1 min-w-0">
            <div className="text-[10px] font-semibold uppercase tracking-[0.12em] text-[#aaa] leading-tight">
              Step {openStep + 1} guide
            </div>
            <div className="text-[13px] font-semibold text-[#1a1a1a] truncate" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              {isOpen ? guide.headline : 'Need help with this step?'}
            </div>
          </div>
        </div>
        <ChevronDown
          size={18}
          className="text-[#c8a165] shrink-0 transition-transform duration-300"
          style={{ transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}
        />
      </button>

      {/* Expanded content */}
      {isOpen && (
        <div
          className="bg-white rounded-xl p-4 mt-1.5 animate-in fade-in slide-in-from-top-1 duration-200"
          style={{ border: '1px solid rgba(20,20,20,0.06)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}
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

          {/* Body */}
          <p className="text-[12px] text-[#666] leading-relaxed mb-3">
            {guide.body}
          </p>

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
