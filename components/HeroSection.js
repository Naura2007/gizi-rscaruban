import WaveDivider from "./WaveDivider";

export default function HeroSection() {
  return (
    <section className="relative bg-primary overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 md:py-24 grid md:grid-cols-2 items-center gap-10">
        {/* Teks kiri */}
        <div className="text-white">
            <p className="text-accent font-bold tracking-widest text-lg mb-3">
            Gizi_RSCaruban
          </p>
          <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-4">
            Caring for Your Health
          </h1>
          <p className="text-white/80 mb-8 max-w-md">
            Layanan konsultasi gizi dari RSUD Caruban untuk membantu Anda
            hidup lebih sehat, mulai dari cek status gizi hingga informasi
            gizi terpercaya.
          </p>
          
          <a
            href="https://wa.me/6282313737897"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
          >
        
          WhatsApp: 081-2313-7378-97
          </a>
        </div>

        {/* Foto kanan + badge oranye */}
        <div className="relative">
          <div className="rounded-3xl overflow-hidden aspect-[4/3] bg-primary-light">
            <img
              src="/images/hero-rsud.jpg"
              alt="RSUD Caruban"
              className="w-full h-full object-cover"
            />
          </div>
          {/* Badge oranye melayang, khas gaya v1 */}
          <div className="absolute -bottom-6 -left-6 bg-accent text-white rounded-2xl px-6 py-4 shadow-lg">
            <p className="text-2xl font-bold">24/7</p>
            <p className="text-xs">Layanan Konsultasi</p>
          </div>
        </div>
      </div>

      {/* Wave putih di bawah, transisi ke section berikutnya */}
      <WaveDivider color="#ffffff" />
    </section>
  );
}