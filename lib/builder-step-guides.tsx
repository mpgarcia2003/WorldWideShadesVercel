/**
 * builder-step-guides.tsx
 * ─────────────────────────────────────────────────────────
 * Shared step guide content used by both:
 *   - BuilderRightRail.tsx (desktop, lg+ viewports)
 *   - MobileStepGuide.tsx (mobile + tablet, <lg viewports)
 *
 * Each step has a headline (the question they're asking themselves),
 * a body paragraph, and 2-5 quick tips. Order matches STEPS array
 * in constants.ts:
 *   0: Choose Your Fabric
 *   1: Shape & Size
 *   2: Installation Style (Mount)
 *   3: Control Type
 *   4: Customize Look
 *   5: Quantity
 */

import React from 'react';
import { Ruler, Lightbulb, Home, Settings, Layout, Hash } from 'lucide-react';

export interface StepGuide {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  headline: string;
  body: React.ReactNode;
  tips: React.ReactNode[];
  footer?: string;
}

export const STEP_GUIDES: StepGuide[] = [
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
export const DEFAULT_GUIDE: StepGuide = {
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

/**
 * Helper: get the right guide for the current openStep.
 * Returns DEFAULT_GUIDE when openStep is null or out of range.
 */
export function getGuideForStep(openStep: number | null): StepGuide {
  if (openStep === null || openStep < 0 || openStep >= STEP_GUIDES.length) {
    return DEFAULT_GUIDE;
  }
  return STEP_GUIDES[openStep];
}
