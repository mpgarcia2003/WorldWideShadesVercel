import Link from "next/link";
import { CTAButton } from "@/components/shared/CTAButton";

export default function NotFound() {
  return (
    <section className="section-padding bg-white">
      <div className="container-site text-center max-w-xl mx-auto">
        <span className="block heading-display text-8xl text-gold/30 mb-4">404</span>
        <h1 className="heading-display text-3xl text-dark mb-3">Page Not Found</h1>
        <p className="text-warm-gray mb-8">The page you&apos;re looking for doesn&apos;t exist or has been moved.</p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <CTAButton href="/" label="Go Home" trackingLocation="404" variant="primary" />
          <CTAButton href="/builder" label="Design a Shade" trackingLocation="404" variant="outline" />
        </div>
      </div>
    </section>
  );
}
