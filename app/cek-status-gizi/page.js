import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CekStatusGiziPage() {
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

      <div className="max-w-4xl mx-auto px-6 md:px-16 py-16 grid sm:grid-cols-2 gap-8">
        <a
          href="/cek-status-gizi/dewasa"
          className="group bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition"
        >
          <div className="aspect-[4/3] bg-primary/10 overflow-hidden">
            <img
              src="/images/cek-gizi-dewasa.jpg"
              alt="Cek Status Gizi Dewasa"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
          <div className="p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition">
              Dewasa
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Usia 18 tahun ke atas. Menggunakan perhitungan IMT (Indeks Massa
              Tubuh).
            </p>
            <span className="inline-block bg-primary text-white group-hover:bg-accent px-6 py-2.5 rounded-full text-sm font-semibold transition">
              Mulai Cek →
            </span>
          </div>
        </a>

        <a
          href="/cek-status-gizi/anak"
          className="group bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden hover:-translate-y-2 hover:shadow-2xl transition"
        >
          <div className="aspect-[4/3] bg-primary/10 overflow-hidden">
            <img
              src="/images/cek-gizi-anak.jpg"
              alt="Cek Status Gizi Anak"
              className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
            />
          </div>
          <div className="p-8 text-center">
            <h2 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-primary transition">
              Anak-anak
            </h2>
            <p className="text-sm text-gray-500 mb-6">
              Usia 0–5 tahun. Menggunakan standar pertumbuhan anak dari WHO.
            </p>
            <span className="inline-block bg-primary text-white group-hover:bg-accent px-6 py-2.5 rounded-full text-sm font-semibold transition">
              Mulai Cek →
            </span>
          </div>
        </a>
      </div>

      <Footer />
    </main>
  );
}