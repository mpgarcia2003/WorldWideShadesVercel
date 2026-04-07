import Link from "next/link";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { FOOTER_LINKS } from "@/data/navigation";
import { SITE } from "@/lib/constants";

export function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="bg-dark text-white/80">
      <div className="container-site py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Link href="/" className="inline-block mb-4"><span className="heading-display text-2xl text-white">World Wide <span className="text-gold">Shades</span></span></Link>
            <p className="text-sm leading-relaxed text-white/60 max-w-xs mb-6">Custom roller shades made simple. 700+ premium fabrics, free shipping, and a satisfaction guarantee on every order.</p>
            <div className="flex items-center gap-4">
              <SocialLink href={SITE.social.instagram} label="Instagram"><Instagram className="w-5 h-5" /></SocialLink>
              <SocialLink href={SITE.social.facebook} label="Facebook"><Facebook className="w-5 h-5" /></SocialLink>
              <SocialLink href={SITE.social.youtube} label="YouTube"><Youtube className="w-5 h-5" /></SocialLink>
            </div>
          </div>
          {Object.values(FOOTER_LINKS).map((section) => (
            <div key={section.title}>
              <h3 className="text-xs font-bold uppercase tracking-[0.15em] text-white/40 mb-4">{section.title}</h3>
              <ul className="space-y-2.5">{section.links.map((link) => (
                <li key={link.href}><Link href={link.href} className="text-sm text-white/60 hover:text-gold transition-colors">{link.label}</Link></li>
              ))}</ul>
            </div>
          ))}
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="container-site flex flex-col items-center justify-between gap-3 py-5 sm:flex-row">
          <p className="text-xs text-white/40">© {year} {SITE.name}. All rights reserved.</p>
          <div className="flex items-center gap-4 text-xs text-white/40">
            <Link href="/privacy" className="hover:text-white/60 transition-colors">Privacy</Link>
            <Link href="/terms" className="hover:text-white/60 transition-colors">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function SocialLink({ href, label, children }: { href: string; label: string; children: React.ReactNode }) {
  return <a href={href} target="_blank" rel="noopener noreferrer" aria-label={label} className="flex items-center justify-center w-9 h-9 rounded-full bg-white/10 text-white/60 hover:bg-gold hover:text-white transition-all">{children}</a>;
}
