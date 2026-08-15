export default function KonsultasiCards() {
  const cards = [
    {
      title: "Cek Status Gizi",
      desc: "Ketahui status gizi Anda dengan cepat dan akurat berdasarkan data resmi.",
      href: "/cek-status-gizi",
      image: "/images/card-cek-gizi.jpg",
    },
    {
      title: "Artikel",
      desc: "Baca informasi seputar gizi dan kesehatan yang terpercaya dan terkini.",
      href: "/artikel",
      image: "/images/card-artikel.jpg",
    },
    {
      title: "Leaflet",
      desc: "Unduh materi edukasi gizi dalam bentuk leaflet siap pakai.",
      href: "/leaflet",
      image: "/images/card-leaflet.jpg",
    },
  ];

  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">
        <p className="text-accent font-bold tracking-widest text-lg uppercase text-center mb-3">
          Layanan Konsultasi Gizi
        </p>
        <h2 className="text-4xl md:text-5xl font-bold text-primary text-center mb-4">
          Konsultasikan Kebutuhan Gizi Anda Kepada Kami
        </h2>
        <p className="text-gray-500 text-center max-w-xl mx-auto mb-12">
          Pilih layanan yang Anda butuhkan, kami siap membantu perjalanan
          hidup sehat Anda.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {cards.map((card) => (
            <a
              key={card.title}
              href={card.href}
              className="group bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden transition hover:-translate-y-2 hover:shadow-2xl"
            >
              {/* Foto di atas, rounded, mirip card v1 */}
              <div className="p-4 pb-0">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden bg-primary/10">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                </div>
              </div>

              <div className="px-6 pb-8 pt-6 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition">
                  {card.title}
                </h3>
                <p className="text-sm text-gray-500 mb-6">{card.desc}</p>

                <span className="inline-block bg-primary text-white group-hover:bg-accent px-6 py-2.5 rounded-full text-sm font-semibold transition">
                  Learn More →
                </span>
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}