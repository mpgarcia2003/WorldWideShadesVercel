import Link from "next/link";

interface CTAButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "gold" | "outline" | "phone";
  className?: string;
}

export function CTAButton({ href, children, variant = "gold", className = "" }: CTAButtonProps) {
  const base = "inline-flex items-center justify-center gap-2 rounded-md font-semibold text-base px-7 py-3.5 transition-all duration-200";
  const variants = {
    gold: `${base} bg-gold text-dark hover:bg-gold-dark hover:-translate-y-px hover:shadow-gold`,
    outline: `${base} border border-warm-gray/30 text-cream hover:border-gold hover:text-gold`,
    phone: `${base} border border-warm-gray/30 text-cream hover:border-gold hover:text-gold`,
  };

  return (
    <Link href={href} className={`${variants[variant]} ${className}`}>
      {children}
    </Link>
  );
}
