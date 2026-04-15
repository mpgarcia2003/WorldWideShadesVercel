import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Custom Blackout Roller Shades | 50% Off | World Wide Shades",
  description:
    "100% light-blocking custom blackout roller shades built to your exact window measurements. 200+ premium fabrics from Phifer, Ferrari & Mermet. Up to 50% off — from $145. Free shipping.",
  alternates: {
    canonical: "https://www.worldwideshades.com/blackout-roller-shades",
  },
  other: {
    // Preload hero image so browser starts downloading before JS bundle executes
    "link-preload": "true",
  },
};

export default function BlackoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {/* Preload hero image — tells browser to start downloading immediately in the initial HTML */}
      {/* Mobile gets 400w, desktop gets 800w */}
      <link
        rel="preload"
        as="image"
        href="https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_400/v1776277846/photo-1616594039964-ae9021a400a0_o7co15.jpg"
        media="(max-width: 768px)"
      />
      <link
        rel="preload"
        as="image"
        href="https://res.cloudinary.com/dcmlcfynd/image/upload/f_auto,q_auto,w_800/v1776277846/photo-1616594039964-ae9021a400a0_o7co15.jpg"
        media="(min-width: 769px)"
      />
      {children}
    </>
  );
}
