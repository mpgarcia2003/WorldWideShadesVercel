/**
 * BuilderRightRail.tsx
 * ─────────────────────────────────────────────────────────
 * Persistent right-rail context panel for the builder. Has four sections
 * stacked top-to-bottom:
 *
 *   1. Step Guide — adapts to the active step. Headline + body + tips.
 *   2. Need Help — phone CTA, always visible.
 *   3. Trust strip — Free Shipping / Fit Guarantee / Lifetime Support.
 *   4. Total panel — passive price display (NO CTA, single CTA lives in the
 *      sticky bottom bar of the middle column to avoid decision paralysis).
 *
 * Only the Step Guide content changes per step. The bottom three sections
 * stay constant.
 */

import React from 'react';
import { Phone, Truck, ShieldCheck, Award, Calendar, Ruler, Lightbulb, Home, Settings, Layout, Hash, ChevronRight } from 'lucide-react';
import { isSaleActive, SALE_CONFIG } from '../constants';

interface BuilderRightRailProps {
  openStep: number | null;
  totalPrice: number;
  originalPrice: number;
  saleActive: boolean;
  deliveryDate: string;
}

// ─── STEP GUIDE CONTENT ──────────────────────────────────
// Each step has a headline (the question they're asking themselves), a body
// paragraph, and 2-5 quick tips. Order matches STEPS array in constants.ts:
//   0: Choose Your Fabric
//   1: Shape & Size
//   2: Installation Style (Mount)
//   3: Control Type
//   4: Customize Look
//   5: Quantity

interface StepGuide {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  headline: string;
  body: React.ReactNode;
  tips: React.ReactNode[];
  footer?: string;
}

const STEP_GUIDES: StepGuide[] = [
  // Step 0: Choose Your Fabric
  {
    icon: Lightbulb,
    headline: 'Which shade type is right for me?',
    body: (
      <>
        Most homes use <strong>Blackout</strong> — it blocks 99%+ of light, ideal for bedrooms, nurseries, and media rooms.{' '}
        <strong>Light Filtering</strong> softens sunlight while keeping your view and natural brightness — ideal for living rooms,
        kitchens, and offices.
      </>
    ),
    tips: [
      <>Bedroom or nursery → <strong>Blackout</strong></>,
      <>Living room or office → <strong>Light Filtering</strong></>,
      <>For 100% blackout, add side channels in Step 5</>,
    ],
    footer: 'Need help choosing? Call (844) 674-2716',
  },
  // Step 1: Shape & Size
  {
    icon: Ruler,
    headline: 'How to measure your window',
    body: (
      <>
        <strong>Width:</strong> measure top, middle, and bottom — use the <strong>narrowest</strong> of the three.{' '}
        <strong>Height:</strong> measure left, center, and right — use the <strong>tallest</strong>.
      </>
    ),
    tips: [
      <>Measure to the nearest 1/8"</>,
      <>Don't subtract anything — we handle the deductions for you</>,
      <>Use a steel tape measure for accuracy</>,
      <><strong>Inside mount depth:</strong> 1" minimum works fine — the shade will stick out slightly. For a fully flush, recessed look, you'll want 2" of frame depth</>,
    ],
    footer: "Not comfortable measuring? Call (844) 674-2716 — we'll guide you through it",
  },
  // Step 2: Installation Style (Mount)
  {
    icon: Home,
    headline: 'Inside, outside, or cloth size?',
    body: (
      <>
        <strong>Inside Mount</strong> sits inside the window frame for a clean, built-in look. Works with as little as 1" of frame depth
        — though 2" gives you a fully flush, recessed appearance. <strong>Outside Mount</strong> covers the entire frame and wall area —
        best for full coverage, maximum light blocking, or no usable frame depth at all. <strong>Cloth Size</strong> lets you specify the
        exact fabric width — useful when you're replacing an existing shade or matching a specific opening.
      </>
    ),
    tips: [
      <>1"+ depth, OK with slight projection → <strong>Inside Mount</strong></>,
      <>2"+ depth, want a flush look → <strong>Inside Mount</strong> (most popular)</>,
      <>No frame depth or want maximum coverage → <strong>Outside Mount</strong></>,
      <>Replacing an existing shade → <strong>Cloth Size</strong></>,
    ],
    footer: 'Cloth Size note: hardware adds ~1½" to the total width. Need help? Call (844) 674-2716',
  },
  // Step 3: Control Type
  {
    icon: Settings,
    headline: 'Manual or motorized?',
    body: (
      <>
        <strong>Manual</strong> uses a metal bead chain — simple, reliable, no power needed. Best for windows you can easily reach.{' '}
        <strong>Motorized</strong> is remote or app-controlled with whisper-quiet operation — perfect for tall windows, hard-to-reach
        spots, or smart-home integration.
      </>
    ),
    tips: [
      <>Easy-to-reach windows → <strong>Manual</strong> (included free)</>,
      <>Tall, wide, or behind furniture → <strong>Motorized</strong></>,
      <>Already own a Somfy remote? Pair it free</>,
      <>One remote controls up to 5 shades</>,
      <>Add a Smart Hub to control via Alexa, Google Home, or Siri</>,
    ],
    footer: 'Questions about motorization? Call (844) 674-2716',
  },
  // Step 4: Customize Look
  {
    icon: Layout,
    headline: 'Three decisions to finish your shade',
    body: (
      <>
        This step has three parts — <strong>Roll Type</strong>, <strong>Valance Cover</strong>, and{' '}
        <strong>Light Blocking Channels</strong>. Take them one at a time.
      </>
    ),
    tips: [
      <>
        <strong>1. Roll Type (free).</strong> Choose how the fabric rolls off the tube. <strong>Standard</strong> rolls from the back —
        traditional look. <strong>Reverse</strong> rolls from the front — modern, flush look that hugs the window glass.
      </>,
      <>
        <strong>2. Valance Cover (optional).</strong> Hides the roller mechanism. <strong>No Cover</strong> is minimal and free.{' '}
        <strong>Cassette</strong> is our most popular upgrade — fully encloses the roller in a fabric-wrapped housing.{' '}
        <strong>Metal Fascia</strong> is a sharp, architectural flat cover.
      </>,
      <>
        <strong>3. Side Channels (optional).</strong> Aluminum tracks that seal the light gaps on the sides. Without them, you'll get
        slight light bleed even with blackout fabric. Add them for true 100% blackout in bedrooms and media rooms.
      </>,
    ],
    footer: "Not sure what to pick? Call (844) 674-2716 — we'll walk you through it",
  },
  // Step 5: Quantity
  {
    icon: Hash,
    headline: 'Ordering for multiple windows?',
    body: (
      <>
        Each shade is custom-made to the dimensions you entered above. If you need different sizes,{' '}
        <strong>add this shade to cart</strong>, then <strong>build another</strong> — your cart can hold multiple custom shades with
        their own configurations.
      </>
    ),
    tips: [
      <>Same window dimensions → adjust quantity here</>,
      <>Different sizes → finish this shade, then build another</>,
      <>All shades ship together, free, in 5–7 business days</>,
      <>Lifetime support and 100% fit guarantee included</>,
    ],
    footer: 'Bulk order or trade pricing? Call (844) 674-2716',
  },
];

// Default guide shown when no step is open (e.g. after all steps complete)
const DEFAULT_GUIDE: StepGuide = {
  icon: Lightbulb,
  headline: 'Your custom shade, your way',
  body: (
    <>
      Walk through each step on the left to design your shade. Have questions at any point? We're a phone call away — our specialists
      can help you choose fabrics, take measurements, or pick the right options for your space.
    </>
  ),
  tips: [
    <>Free shipping on every order</>,
    <>5–7 business day delivery</>,
    <>100% perfect fit guarantee</>,
    <>Lifetime support and warranty</>,
  ],
  footer: 'Talk to a specialist — Call (844) 674-2716',
};

const BuilderRightRail: React.FC<BuilderRightRailProps> = ({
  openStep,
  totalPrice,
  originalPrice,
  saleActive,
  deliveryDate,
}) => {
  const guide = openStep !== null && openStep < STEP_GUIDES.length ? STEP_GUIDES[openStep] : DEFAULT_GUIDE;
  const Icon = guide.icon;
  const savings = saleActive && originalPrice > totalPrice ? originalPrice - totalPrice : 0;

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
              {openStep !== null && openStep < STEP_GUIDES.length ? `Step ${openStep + 1} guide` : 'Helpful info'}
            </div>
          </div>
          <h3 className="text-[14px] font-medium text-[#1a1a1a] leading-tight mb-2" style={{ fontFamily: "'Playfair Display', Georgia, serif", letterSpacing: '-0.01em' }}>
            {guide.headline}
          </h3>
          <p className="text-[11.5px] text-[#666] leading-relaxed mb-2.5">
            {guide.body}
          </p>
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
              <span className="text-[11px] text-[#555] font-medium">Ships in 5–7 business days</span>
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
