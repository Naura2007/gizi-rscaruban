import WaveDivider from "./WaveDivider";

export default function AboutSection() {
  return (
    <section id="about" className="relative bg-primary text-white overflow-hidden scroll-mt-20">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-20 grid md:grid-cols-2 items-center gap-12">
        {/* Foto kiri */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-primary-light">
            <img
              src="/images/about-rsud.jpg"
              alt="Tentang Gizi_RSCaruban"
              className="w-full h-full object-cover"
            />
          </div>
          <div className="absolute -top-6 -right-6 bg-accent text-white rounded-2xl px-6 py-4 shadow-lg">
            <p className="text-2xl font-bold">25+</p>
            <p className="text-xs">Tahun Melayani</p>
          </div>
        </div>

        {/* Teks kanan */}
        <div>
          <p className="text-accent font-semibold tracking-wide mb-2">
          </p>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            About Gizi_RSCaruban
          </h2>
          <p className="text-white/80 mb-4 leading-relaxed">
            Gizi_RSCaruban adalah layanan konsultasi gizi dari RSUD Caruban
            yang hadir untuk membantu masyarakat memahami kondisi gizi
            mereka, memberikan edukasi, dan mendampingi menuju pola hidup
            yang lebih sehat.
          </p>
          <p className="text-white/80 mb-8 leading-relaxed">
            Ditangani langsung oleh ahli gizi profesional dengan pendekatan
            yang mudah dipahami dan berbasis data terpercaya.
          </p>
          
            <a
            href="https://wa.me/6282313737897"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
      >
          WhatsApp: 0823-1373-7897
           
          </a>
        </div>
      </div>

      {/* Wave putih di bawah, transisi ke section Konsultasi (putih) */}
      <WaveDivider color="#ffffff" />
    </section>
  );
}