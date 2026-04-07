import Link from "next/link";

interface UseCasesProps { headline: string; description: string; rooms: { name: string; image: string; description: string }[]; }

export function UseCases({ headline, description, rooms }: UseCasesProps) {
  return (
    <section className="section-padding bg-cream/50">
      <div className="container-site">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h2 className="heading-section text-3xl lg:text-4xl text-dark mb-4">{headline}</h2>
          <p className="text-lg text-warm-gray">{description}</p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {rooms.map((room) => (
            <Link key={room.name} href="/builder" className="group block rounded-xl overflow-hidden bg-white shadow-sm hover:shadow-lg transition-shadow">
              <div className="aspect-[4/3] bg-dark-muted relative overflow-hidden">
                <div className="absolute inset-0 bg-cover bg-center group-hover:scale-105 transition-transform duration-500" style={{ backgroundImage: `url(${room.image})` }} />
                <div className="absolute inset-0 bg-gradient-to-t from-dark/60 to-transparent" />
                <span className="absolute bottom-3 left-3 text-white font-semibold text-lg">{room.name}</span>
              </div>
              <div className="p-4"><p className="text-sm text-warm-gray leading-relaxed">{room.description}</p></div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
