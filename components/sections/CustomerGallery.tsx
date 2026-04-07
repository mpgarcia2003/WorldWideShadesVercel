import { Instagram } from "lucide-react";

export function CustomerGallery() {
  // Placeholder images — replace with real UGC as collected
  const images = Array.from({ length: 8 }).map((_, i) => ({
    id: i,
    src: `/images/ugc/customer-${i + 1}.jpg`,
    alt: `Customer shade installation ${i + 1}`,
  }));

  return (
    <section className="section-padding bg-white">
      <div className="container-site">
        <div className="text-center mb-10">
          <h2 className="heading-section text-3xl lg:text-4xl text-dark mb-3">
            Your Shades, Your Style
          </h2>
          <p className="text-warm-gray text-lg">
            Real homes. Real windows. Real Worldwide Shades.
          </p>
        </div>

        {/* Masonry-style grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {images.map((img, i) => {
            // Vary heights for masonry effect
            const tall = i % 3 === 0;
            return (
              <div
                key={img.id}
                className={`group relative rounded-xl overflow-hidden bg-cream cursor-pointer ${tall ? "row-span-2" : ""}`}
              >
                <div className={`w-full ${tall ? "aspect-[3/4]" : "aspect-square"} bg-dark-muted relative`}>
                  <div
                    className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
                    style={{ backgroundImage: `url(${img.src})` }}
                  />
                  {/* Fallback gradient */}
                  <div
                    className="absolute inset-0"
                    style={{ backgroundColor: `hsl(${30 + i * 15}, ${15 + i * 3}%, ${50 + i * 4}%)` }}
                  />

                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-dark/0 group-hover:bg-dark/40 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity flex items-center gap-2 text-white text-sm font-medium">
                      <Instagram className="w-4 h-4" />
                      #WorldWideShades
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="text-center mt-8">
          <p className="text-sm text-warm-gray">
            Share your installation with <span className="font-semibold text-gold">#WorldWideShades</span> to be featured
          </p>
        </div>
      </div>
    </section>
  );
}
