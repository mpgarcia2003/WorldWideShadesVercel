/**
 * builder-step-guides.tsx
 * ─────────────────────────────────────────────────────────
 * Shared step guide content used by both:
 *   - BuilderRightRail.tsx (desktop, lg+ viewports)
 *   - MobileStepGuide.tsx (mobile + tablet, <lg viewports)
 *
 * Each step has a headline (the question they're asking themselves),
 * structured sections (one per option/concept), 2-5 quick tips, and
 * an optional footer line. Order matches STEPS array in constants.ts:
 *   0: Choose Your Fabric
 *   1: Shape & Size
 *   2: Installation Style (Mount)
 *   3: Control Type
 *   4: Customize Look
 *   5: Quantity
 *
 * Sections vs body:
 *   - `sections` is the preferred field — gives the guide visual rhythm with
 *     bold gold labels (#8b6d3f) above each description block.
 *   - `body` is a free-form fallback used only by DEFAULT_GUIDE (no step open).
 *   - Renderers prefer `sections` if present, else fall back to `body`.
 */

import React from 'react';
import { Ruler, Lightbulb, Home, Settings, Layout, Hash } from 'lucide-react';

export interface StepGuideSection {
  label: string;
  description: React.ReactNode;
}

export interface StepGuide {
  icon: React.ComponentType<{ size?: number; className?: string }>;
  headline: string;
  sections?: StepGuideSection[];
  body?: React.ReactNode;
  tips: React.ReactNode[];
  footer?: string;
}

export const STEP_GUIDES: StepGuide[] = [
  // Step 0: Choose Your Fabric
  {
    icon: Lightbulb,
    headline: 'Which shade type is right for me?',
    sections: [
      {
        label: 'Blackout',
        description: <>Most homes use Blackout — it blocks 99%+ of light, ideal for bedrooms, nurseries, and media rooms.</>,
      },
      {
        label: 'Light Filtering',
        description: <>Softens sunlight while keeping your view and natural brightness — ideal for living rooms, kitchens, and offices.</>,
      },
    ],
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
    sections: [
      {
        label: 'Width',
        description: <>Measure top, middle, and bottom — use the <strong>narrowest</strong> of the three.</>,
      },
      {
        label: 'Height',
        description: <>Measure left, center, and right — use the <strong>tallest</strong>.</>,
      },
    ],
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
    sections: [
      {
        label: 'Inside Mount',
        description: <>Sits inside the window frame for a clean, built-in look. Works with as little as 1" of frame depth — though 2" gives you a fully flush, recessed appearance.</>,
      },
      {
        label: 'Outside Mount',
        description: <>Covers the entire frame and wall area — best for full coverage, maximum light blocking, or no usable frame depth at all.</>,
      },
      {
        label: 'Cloth Size',
        description: <>Lets you specify the exact fabric width — useful when you're replacing an existing shade or matching a specific opening.</>,
      },
    ],
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
    sections: [
      {
        label: 'Manual',
        description: <>Uses a metal bead chain — simple, reliable, no power needed. Best for windows you can easily reach.</>,
      },
      {
        label: 'Motorized',
        description: <>Remote or app-controlled with whisper-quiet operation — perfect for tall windows, hard-to-reach spots, or smart-home integration.</>,
      },
    ],
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
    sections: [
      {
        label: 'Roll Type (free)',
        description: (
          <>
            Choose how the fabric rolls off the tube. <em>Standard</em> rolls from the back for a traditional look.{' '}
            <em>Reverse</em> rolls from the front for a modern, flush look that hugs the window glass.
          </>
        ),
      },
      {
        label: 'Valance Cover (optional)',
        description: (
          <>
            Hides the roller mechanism. <em>No Cover</em> is minimal and free. <em>Cassette</em> is our most popular upgrade — fully
            encloses the roller in a fabric-wrapped housing. <em>Metal Fascia</em> is a sharp, architectural flat cover.
          </>
        ),
      },
      {
        label: 'Side Channels (optional)',
        description: (
          <>
            Aluminum tracks that seal the light gaps on the sides. Without them, you'll get slight light bleed even with blackout fabric.
            Add them for true 100% blackout in bedrooms and media rooms.
          </>
        ),
      },
    ],
    tips: [
      <>Bedroom or media room → <strong>Cassette</strong> + <strong>Side Channels</strong></>,
      <>Modern minimal aesthetic → <strong>Reverse</strong> roll + <strong>No Cover</strong></>,
      <>Commercial or industrial vibe → <strong>Metal Fascia</strong></>,
    ],
    footer: "Not sure what to pick? Call (844) 674-2716 — we'll walk you through it",
  },
  // Step 5: Quantity
  {
    icon: Hash,
    headline: 'Ordering for multiple windows?',
    sections: [
      {
        label: 'Same window dimensions',
        description: <>Each shade is custom-made to the dimensions you entered above. Adjust the quantity here and we'll make multiples of this exact configuration.</>,
      },
      {
        label: 'Different sizes',
        description: <>Add this shade to cart, then build another. Your cart can hold multiple custom shades with their own configurations.</>,
      },
    ],
    tips: [
      <>All shades ship together, free, in 5–7 business days</>,
      <>Lifetime support and 100% fit guarantee included</>,
      <>Bulk or trade pricing? Give us a call</>,
    ],
    footer: 'Bulk order or trade pricing? Call (844) 674-2716',
  },
];

// Default guide shown when no step is open (e.g. after all steps complete).
// Uses `body` instead of `sections` since this is a free-form intro, not
// step-specific structured content.
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
