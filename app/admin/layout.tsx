"use client";
import { useEffect } from "react";

function HideSiteShell() {
  useEffect(() => {
    // Hide AnnouncementBar, Header, Footer from root layout
    const selectors = [
      'header',                    // site Header
      'footer',                    // site Footer  
      '[data-announcement-bar]',   // AnnouncementBar if tagged
    ];
    
    const main = document.querySelector('main');
    if (main?.parentElement) {
      const siblings = Array.from(main.parentElement.children);
      siblings.forEach((el) => {
        if (el !== main && el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE') {
          (el as HTMLElement).style.display = 'none';
        }
      });
    }

    return () => {
      // Restore on unmount (navigating away from admin)
      if (main?.parentElement) {
        const siblings = Array.from(main.parentElement.children);
        siblings.forEach((el) => {
          if (el !== main && el.tagName !== 'SCRIPT' && el.tagName !== 'STYLE') {
            (el as HTMLElement).style.display = '';
          }
        });
      }
    };
  }, []);

  return null;
}

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <HideSiteShell />
      {children}
    </>
  );
}
