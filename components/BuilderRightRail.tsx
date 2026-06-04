/**
 * BuilderRightRail.tsx
 * ─────────────────────────────────────────────────────────
 * Persistent right-rail context panel for the builder. Has four sections
 * stacked top-to-bottom:
 *
 *   1. Step Guide — adapts to the active step (content from builder-step-guides).
 *   2. Need Help — phone CTA, always visible.
 *   3. Trust strip — Free Shipping / Fit Guarantee / Lifetime Support.
 *   4. Total panel — passive price display (NO CTA, single CTA lives in the
 *      sticky bottom bar of the middle column to avoid decision paralysis).
 *
 * Desktop only (lg+ viewports). On mobile/tablet, MobileStepGuide.tsx renders
 * the step guide content as a collapsible card inside the stepper area.
 */

import React from 'react';
import { Phone, Truck, ShieldCheck, Award, Calendar, ChevronRight } from 'lucide-react';
import { getGuideForStep } from '../lib/builder-step-guides';
import { deliveryLabel } from '../lib/delivery';

interface BuilderRightRailProps {
  openStep: number | null;
  totalPrice: number;
  originalPrice: number;
  saleActive: boolean;
  deliveryDate: string;
  isSpecialty?: boolean;
}

const BuilderRightRail: React.FC<BuilderRightRailProps> = ({
  openStep,
  totalPrice,
  originalPrice,
  saleActive,
  deliveryDate,
  isSpecialty = false,
}) => {
  const guide = getGuideForStep(openStep);
  const Icon = guide.icon;
  const savings = saleActive && originalPrice > totalPrice ? originalPrice - totalPrice : 0;
  const isStepGuide = openStep !== null && openStep >= 0 && openStep < 6;

  return (
    <div className="hidden lg:flex w-[28%] flex-col h-full bg-[#FDFBF7] border-l border-gray-100 shrink-0 overflow-hidden">
      <div className="flex-1 overflow-y-auto p-3.5">
        {/* ─── 1. STEP GUIDE ─────────────────────────── */}
        <div className="bg-white rounded-2xl p-3.5 mb-2.5" style={{ border: '1px solid rgba(20,20,20,0.06)', boxShadow: '0 1px 3px rgba(0,0,0,0.02)' }}>
          <div className="flex items-center gap-2 mb-2.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#f5f0e6' }}>
              <Icon size={14} className="text-[#8b6d3f]" />
            </div>
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#aaa]">
              {isStepGuide ? `Step ${(openStep as number) + 1} guide` : 'Helpful info'}
            </div>
          </div>
          <h3 className="text-[14px] font-medium text-[#1a1a1a] leading-tight mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '-0.01em' }}>
            {guide.headline}
          </h3>
          {/* Body: prefer structured `sections` (bold gold labels). Fall back to free-form `body` for default guide. */}
          {guide.sections && guide.sections.length > 0 ? (
            <div className="space-y-2 mb-2.5">
              {guide.sections.map((section, i) => (
                <div key={i}>
                  <div className="text-[11.5px] font-bold text-[#8b6d3f] mb-0.5">{section.label}</div>
                  <div className="text-[11.5px] text-[#666] leading-relaxed">{section.description}</div>
                </div>
              ))}
            </div>
          ) : guide.body ? (
            <p className="text-[11.5px] text-[#666] leading-relaxed mb-2.5">{guide.body}</p>
          ) : null}
          {guide.tips.length > 0 && (
            <div className="space-y-1.5 pt-2 border-t border-gray-100">
              {guide.tips.map((tip, i) => (
                <div key={i} className="flex items-start gap-1.5 text-[11px] text-[#555] leading-relaxed">
                  <ChevronRight size={11} className="text-[#c8a165] mt-0.5 shrink-0" />
                  <div>{tip}</div>
                </div>
              ))}
            </div>
          )}
          {guide.footer && (
            <div className="mt-2.5 pt-2.5 border-t border-gray-100 text-[10.5px] font-medium text-[#8b6d3f] italic leading-relaxed">
              {guide.footer}
            </div>
          )}
        </div>

        {/* ─── 2. NEED HELP CARD ──────────────────────── */}
        <div className="rounded-2xl p-3.5 mb-2.5" style={{ backgroundColor: '#fdfaf3', border: '1px solid #e8dcc8' }}>
          <div className="flex items-center gap-2 mb-1.5">
            <div className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0" style={{ backgroundColor: '#c8a165' }}>
              <Phone size={13} className="text-white" />
            </div>
            <div className="text-[12px] font-semibold text-[#1a1a1a]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              Need help?
            </div>
          </div>
          <a href="tel:+18446742716" className="block text-[14px] font-semibold text-[#8b6d3f] hover:text-[#a8844d] transition-colors mb-0.5">
            (844) 674-2716
          </a>
          <p className="text-[10px] text-[#aa9070] leading-relaxed">
            Mon–Fri, 9am–6pm EST. We'll guide you through any step.
          </p>
        </div>

        {/* ─── 3. TRUST STRIP (vertical) ───────────────── */}
        <div className="bg-white rounded-2xl p-3.5" style={{ border: '1px solid rgba(20,20,20,0.06)' }}>
          <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#aaa] mb-2.5">
            Why World Wide Shades
          </div>
          <div className="space-y-2">
            <div className="flex items-center gap-2.5">
              <Truck size={13} className="text-[#c8a165] shrink-0" strokeWidth={1.5} />
              <span className="text-[11px] text-[#555] font-medium">Free shipping on every order</span>
            </div>
            <div className="flex items-center gap-2.5">
              <ShieldCheck size={13} className="text-[#c8a165] shrink-0" strokeWidth={1.5} />
              <span className="text-[11px] text-[#555] font-medium">100% perfect fit guarantee</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Calendar size={13} className="text-[#c8a165] shrink-0" strokeWidth={1.5} />
              <span className="text-[11px] text-[#555] font-medium">Ships in {deliveryLabel(isSpecialty)}</span>
            </div>
            <div className="flex items-center gap-2.5">
              <Award size={13} className="text-[#c8a165] shrink-0" strokeWidth={1.5} />
              <span className="text-[11px] text-[#555] font-medium">Lifetime support and warranty</span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── 4. PASSIVE TOTAL DISPLAY (no CTA) ─────────
          The single CTA lives in the StickyBottomBar below the stepper to
          avoid decision paralysis. This panel shows price only as a passive
          mirror — useful while the user reads the guide on the right. */}
      <div className="bg-white border-t border-gray-100 p-3.5 shrink-0" style={{ boxShadow: '0 -2px 8px rgba(0,0,0,0.03)' }}>
        {totalPrice > 0 ? (
          <>
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#aaa] mb-1.5">
              Your total
            </div>
            {saleActive && savings > 0 && (
              <div className="flex items-baseline gap-2 mb-0.5">
                <span className="text-[11px] text-[#bbb] line-through">${originalPrice.toFixed(0)}</span>
                <span className="text-[10px] font-bold text-green-700 bg-green-50 px-1.5 py-0.5 rounded">
                  SAVE ${savings.toFixed(0)}
                </span>
              </div>
            )}
            <div className="text-[22px] font-medium text-[#1a1a1a] leading-tight" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              ${totalPrice.toFixed(2)}
            </div>
            <div className="flex items-center gap-1 text-[10px] text-[#888] mt-1">
              <Truck size={10} className="text-[#2d8a4e]" />
              <span>Free shipping · Arrives by {deliveryDate}</span>
            </div>
          </>
        ) : (
          <>
            <div className="text-[10px] font-semibold uppercase tracking-[0.14em] text-[#aaa] mb-1.5">
              Your total
            </div>
            <div className="text-[20px] font-medium text-[#ddd]" style={{ fontFamily: "'Playfair Display', Georgia, serif" }}>
              $—
            </div>
            <div className="text-[10px] text-[#aaa] mt-0.5">Complete the steps to see your price</div>
          </>
        )}
      </div>
    </div>
  );
};

export default BuilderRightRail;
