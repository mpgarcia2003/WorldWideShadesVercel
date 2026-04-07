export function PressBar() {
  // Placeholder logos — replace with real press logo images as features are earned
  const publications = [
    { name: "Apartment Therapy", logo: "/images/press/apartment-therapy.svg" },
    { name: "The Spruce", logo: "/images/press/the-spruce.svg" },
    { name: "House Beautiful", logo: "/images/press/house-beautiful.svg" },
    { name: "Architectural Digest", logo: "/images/press/architectural-digest.svg" },
    { name: "Wirecutter", logo: "/images/press/wirecutter.svg" },
  ];

  return (
    <section className="py-10 border-y border-cream-dark bg-white">
      <div className="container-site">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-warm-gray/60 mb-6">
          As Seen In
        </p>
        <div className="flex items-center justify-center gap-10 md:gap-16 flex-wrap opacity-40 grayscale">
          {publications.map((pub) => (
            <div key={pub.name} className="h-6 flex items-center">
              {/* Replace with <Image> once real logos are available */}
              <span className="text-sm font-semibold text-dark tracking-wide">{pub.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
