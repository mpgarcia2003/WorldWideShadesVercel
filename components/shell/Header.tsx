"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { Menu, X, ChevronDown, ShoppingBag, Phone } from "lucide-react";
import { NAV_ITEMS, type NavItem } from "@/data/navigation";
import { SITE } from "@/lib/constants";
import { cn } from "@/lib/utils";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [scrolled, setScrolled] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const handler = () => { if (mq.matches) setMobileOpen(false); };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  const openMenu = (label: string) => { clearTimeout(timeoutRef.current); setActiveMenu(label); };
  const closeMenu = () => { timeoutRef.current = setTimeout(() => setActiveMenu(null), 150); };

  return (
    <header className={cn("sticky top-0 z-40 w-full transition-all duration-300", scrolled ? "bg-white/95 shadow-md backdrop-blur-md" : "bg-white")}>
      <nav className="container-site flex items-center justify-between h-16 lg:h-18">
        <Link href="/" className="flex items-center gap-2 shrink-0">
          <span className="heading-display text-xl lg:text-2xl text-dark">World Wide <span className="text-gold">Shades</span></span>
        </Link>

        <ul className="hidden lg:flex items-center gap-1">
          {NAV_ITEMS.map((item) => (
            <DesktopNavItem key={item.label} item={item} isOpen={activeMenu === item.label} onOpen={() => openMenu(item.label)} onClose={closeMenu} />
          ))}
        </ul>

        <div className="flex items-center gap-3">
          <a href={`tel:${SITE.phone}`} className="hidden md:flex items-center gap-1.5 text-sm text-warm-gray hover:text-gold transition-colors">
            <Phone className="w-4 h-4" /><span className="font-medium">{SITE.phone}</span>
          </a>
          <Link href="/builder" className="hidden sm:inline-flex items-center px-4 py-2 text-sm font-semibold text-white bg-gold hover:bg-gold-dark rounded-lg transition-colors">Design Your Shade</Link>
          <button className="relative p-2 text-dark hover:text-gold transition-colors" aria-label="Cart"><ShoppingBag className="w-5 h-5" /></button>
          <button className="lg:hidden p-2 text-dark" onClick={() => setMobileOpen(!mobileOpen)} aria-label={mobileOpen ? "Close menu" : "Open menu"}>
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </nav>

      {NAV_ITEMS.map((item) => item.megaMenu ? (
        <MegaMenuPanel key={item.label} item={item} isOpen={activeMenu === item.label} onMouseEnter={() => openMenu(item.label)} onMouseLeave={closeMenu} onLinkClick={() => setActiveMenu(null)} />
      ) : null)}

      <MobileDrawer open={mobileOpen} onClose={() => setMobileOpen(false)} />
    </header>
  );
}

function DesktopNavItem({ item, isOpen, onOpen, onClose }: { item: NavItem; isOpen: boolean; onOpen: () => void; onClose: () => void }) {
  if (item.href && !item.megaMenu) return <li><Link href={item.href} className="px-3 py-2 text-sm font-medium text-dark hover:text-gold transition-colors">{item.label}</Link></li>;
  return (
    <li onMouseEnter={onOpen} onMouseLeave={onClose}>
      <button className={cn("flex items-center gap-1 px-3 py-2 text-sm font-medium transition-colors", isOpen ? "text-gold" : "text-dark hover:text-gold")} aria-expanded={isOpen}>
        {item.label}<ChevronDown className={cn("w-3.5 h-3.5 transition-transform", isOpen && "rotate-180")} />
      </button>
    </li>
  );
}

function MegaMenuPanel({ item, isOpen, onMouseEnter, onMouseLeave, onLinkClick }: { item: NavItem; isOpen: boolean; onMouseEnter: () => void; onMouseLeave: () => void; onLinkClick: () => void }) {
  if (!item.megaMenu || !isOpen) return null;
  const { groups, featured } = item.megaMenu;
  return (
    <div className="absolute left-0 right-0 bg-white border-t border-cream-dark shadow-lg z-30" onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
      <div className="container-site py-8">
        <div className="grid grid-cols-12 gap-8">
          <div className={cn("flex gap-12", featured ? "col-span-8" : "col-span-12")}>
            {groups.map((group) => (
              <div key={group.label}>
                <h3 className="text-xs font-bold uppercase tracking-widest text-warm-gray mb-4">{group.label}</h3>
                <ul className="space-y-3">
                  {group.links.map((link) => (
                    <li key={link.href}><Link href={link.href} onClick={onLinkClick} className="group block">
                      <span className="text-sm font-medium text-dark group-hover:text-gold transition-colors">{link.label}</span>
                      {link.description && <span className="block text-xs text-warm-gray mt-0.5">{link.description}</span>}
                    </Link></li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          {featured && (
            <div className="col-span-4">
              <Link href={featured.href} onClick={onLinkClick} className="block rounded-xl overflow-hidden bg-cream group hover:shadow-lg transition-shadow">
                <div className="aspect-[16/9] bg-dark-muted relative overflow-hidden">
                  <div className="absolute inset-0 gold-gradient opacity-80 group-hover:opacity-90 transition-opacity" />
                  <div className="absolute inset-0 flex items-center justify-center"><span className="text-white text-lg font-bold">{featured.title}</span></div>
                </div>
                <div className="p-4"><p className="text-sm text-dark-soft">{featured.description}</p><span className="inline-block mt-2 text-sm font-semibold text-gold">Shop Now →</span></div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function MobileDrawer({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [expandedGroup, setExpandedGroup] = useState<string | null>(null);
  if (!open) return null;
  return (
    <>
      <div className="fixed inset-0 bg-dark/50 z-40 lg:hidden" onClick={onClose} />
      <div className="fixed top-0 right-0 h-full w-[85vw] max-w-sm bg-white z-50 overflow-y-auto lg:hidden shadow-2xl">
        <div className="flex items-center justify-between px-5 py-4 border-b border-cream-dark">
          <span className="heading-display text-lg text-dark">World Wide <span className="text-gold">Shades</span></span>
          <button onClick={onClose} className="p-2 text-dark" aria-label="Close menu"><X className="w-5 h-5" /></button>
        </div>
        <div className="px-5 py-4">
          <Link href="/builder" onClick={onClose} className="flex items-center justify-center w-full px-4 py-3 mb-6 text-base font-semibold text-white bg-gold rounded-lg hover:bg-gold-dark transition-colors">Design Your Shade</Link>
          <ul className="space-y-1">
            {NAV_ITEMS.map((item) => (
              <li key={item.label}>
                {item.megaMenu ? (
                  <>
                    <button onClick={() => setExpandedGroup(expandedGroup === item.label ? null : item.label)} className="flex items-center justify-between w-full px-2 py-3 text-base font-medium text-dark">
                      {item.label}<ChevronDown className={cn("w-4 h-4 transition-transform", expandedGroup === item.label && "rotate-180")} />
                    </button>
                    {expandedGroup === item.label && (
                      <div className="pl-4 pb-2 space-y-4">
                        {item.megaMenu.groups.map((group) => (
                          <div key={group.label}>
                            <span className="block text-xs font-bold uppercase tracking-widest text-warm-gray mb-2">{group.label}</span>
                            <ul className="space-y-2">{group.links.map((link) => (
                              <li key={link.href}><Link href={link.href} onClick={onClose} className="block py-1 text-sm text-dark-soft hover:text-gold transition-colors">{link.label}</Link></li>
                            ))}</ul>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                ) : (
                  <Link href={item.href!} onClick={onClose} className="block px-2 py-3 text-base font-medium text-dark hover:text-gold transition-colors">{item.label}</Link>
                )}
              </li>
            ))}
          </ul>
          <div className="mt-8 pt-6 border-t border-cream-dark">
            <a href={`tel:${SITE.phone}`} className="flex items-center gap-2 text-sm text-warm-gray hover:text-gold transition-colors"><Phone className="w-4 h-4" /><span>{SITE.phone}</span></a>
          </div>
        </div>
      </div>
    </>
  );
}
