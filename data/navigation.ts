export interface NavLink { label: string; href: string; description?: string; }
export interface NavGroup { label: string; links: NavLink[]; }
export interface NavItem {
  label: string;
  href?: string;
  megaMenu?: { groups: NavGroup[]; featured?: { title: string; description: string; href: string; image: string }; };
}

export const NAV_ITEMS: NavItem[] = [
  {
    label: "Shop by Type",
    megaMenu: {
      groups: [
        { label: "Shade Types", links: [
          { label: "Blackout Roller Shades", href: "/blackout-roller-shades", description: "Total darkness for bedrooms & media rooms" },
          { label: "Light Filtering Shades", href: "/light-filtering-shades", description: "Soft glow while maintaining privacy" },
          { label: "Motorized Shades", href: "/motorized-shades", description: "Smart home integration & convenience" },
          { label: "Specialty Shapes", href: "/specialty-shapes", description: "Triangles, arches, hexagons & more" },
        ]},
        { label: "Shop by Room", links: [
          { label: "Bedroom", href: "/rooms/bedroom" },
          { label: "Nursery", href: "/rooms/nursery" },
          { label: "Living Room", href: "/rooms/living-room" },
          { label: "Home Office", href: "/rooms/home-office" },
          { label: "Bathroom", href: "/rooms/bathroom" },
        ]},
      ],
      featured: { title: "Easter Sale — 40% Off", description: "All custom shades on sale. 700+ fabrics. Free shipping.", href: "/builder", image: "/images/sale-featured.jpg" },
    },
  },
  { label: "Fabrics", href: "/fabrics" },
  {
    label: "How It Works",
    megaMenu: {
      groups: [
        { label: "Get Started", links: [
          { label: "Design Your Shade", href: "/builder", description: "Use our visual configurator" },
          { label: "Order Free Swatches", href: "/swatches", description: "See & feel fabrics before you buy" },
          { label: "Book a Consultation", href: "/contact", description: "Get expert help with your project" },
        ]},
        { label: "Resources", links: [
          { label: "Measuring Guide", href: "/measuring-guide" },
          { label: "Installation Guide", href: "/installation-guide" },
          { label: "FAQ", href: "/faq" },
        ]},
      ],
    },
  },
  { label: "Blog", href: "/blog" },
  { label: "Contact", href: "/contact" },
];

export const FOOTER_LINKS = {
  shop: { title: "Shop", links: [
    { label: "Blackout Shades", href: "/blackout-roller-shades" },
    { label: "Light Filtering Shades", href: "/light-filtering-shades" },
    { label: "Motorized Shades", href: "/motorized-shades" },
    { label: "Specialty Shapes", href: "/specialty-shapes" },
    { label: "All Fabrics", href: "/fabrics" },
  ]},
  support: { title: "Support", links: [
    { label: "Measuring Guide", href: "/measuring-guide" },
    { label: "Installation Guide", href: "/installation-guide" },
    { label: "FAQ", href: "/faq" },
    { label: "Contact Us", href: "/contact" },
    { label: "Track Your Order", href: "/account/tracking" },
  ]},
  company: { title: "Company", links: [
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
    { label: "Reviews", href: "/reviews" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms of Service", href: "/terms" },
  ]},
};
