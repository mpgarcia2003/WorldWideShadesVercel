import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/seo/metadata";

export const metadata: Metadata = generatePageMetadata({ title: "Design Your Custom Shade — Visual Shade Builder", description: "Design custom roller shades in minutes with our visual configurator. Choose from 700+ fabrics, set your dimensions, add motorization.", path: "/builder" });

export default function BuilderLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
