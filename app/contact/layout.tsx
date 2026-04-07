import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({ title: "Contact Us — Get Help With Your Custom Shades", description: "Questions about custom shades? Book a consultation, request a quote, or get measurement help. Our team responds within 1 business day.", path: "/contact" });

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
