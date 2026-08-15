import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CekStatusGiziPage() {
  const kategori = [
    {
      title: "Balita",
      desc: "Usia 0–5 tahun. Menggunakan standar pertumbuhan anak dari WHO.",
      href: "/cek-status-gizi/anak",
      image: "/images/cek-gizi-anak.jpg",
    },
    {
      title: "Remaja",
      desc: "Usia 5–19 tahun. Menggunakan standar IMT menurut Umur dari WHO.",
      href: "/cek-status-gizi/remaja",
      image: "/images/cek-gizi-remaja.jpg",
    },
    {
      title: "Dewasa",
      desc: "Usia 19 tahun ke atas. Menggunakan perhitungan IMT (Indeks Massa Tubuh).",
      href: "/cek-status-gizi/dewasa",
      image: "/images/cek-gizi-dewasa.jpg",
    },
  ];

  return (
    <main>
      <Navbar />

      <section className="bg-primary text-white py-16 px-6 md:px-16 text-center">
        <p className="text-accent font-semibold mb-2">Cek Status Gizi</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Ketahui Status Gizi Anda
        </h1>
        <p className="text-white/80 max-w-xl mx-auto">
          Pilih kategori sesuai usia untuk mendapatkan hasil yang akurat.
        </p>
      </section>

      <div className="max-w-5xl mx-auto px-6 md:px-16 py-16 grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {kategori.map((item) => (
          <a
            key={item.title}
            href={item.href}
            className="group bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition"
          >
            <div className="aspect-[4/3] bg-primary/10 overflow-hidden">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
              />
            </div>
            <div className="p-8 text-center">
              <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition">
                {item.title}
              </h2>
              <p className="text-sm text-gray-500 mb-6">{item.desc}</p>
              <span className="inline-block bg-primary text-white group-hover:bg-accent px-6 py-2.5 rounded-full text-sm font-semibold transition">
                Mulai Cek →
              </span>
            </div>
          </a>
        ))}
      </div>

      <Footer />
    </main>
  );
}