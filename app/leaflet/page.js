import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const kategoriLeaflet = [
  {
    kategori: "Ibu & Anak",
    deskripsi: "Panduan gizi untuk tumbuh kembang anak dan masa menyusui.",
    warna: "accent",
    items: [
      { title: "Makanan Pendamping ASI (MPASI)", file: "mpasi.pdf", image: "mpasi.jpg" },
      { title: "Gizi Seimbang untuk Anak", file: "gizi-seimbang-anak.pdf", image: "gizi-seimbang-anak.jpg" },
      { title: "Diet Ibu Menyusui", file: "diet-ibu-menyusui.pdf", image: "diet-ibu-menyusui.jpg" },
    ],
  },
  {
    kategori: "Diet Penyakit Khusus",
    deskripsi: "Panduan pola makan untuk kondisi kesehatan tertentu.",
    warna: "primary",
    items: [
      { title: "Diet Rendah Lemak", file: "diet-rendah-lemak.pdf", image: "diet-rendah-lemak.jpg" },
      { title: "Diet Rendah Protein", file: "diet-rendah-protein.pdf", image: "diet-rendah-protein.jpg" },
      { title: "Diet Diabetes Melitus", file: "diet-diabetes-melitus.pdf", image: "diet-diabetes-melitus.jpg" },
      { title: "Diet Lambung", file: "diet-lambung.pdf", image: "diet-lambung.jpg" },
      { title: "Diet Rendah Purin", file: "diet-rendah-purin.pdf", image: "diet-rendah-purin.jpg" },
      { title: "Diet Rendah Serat", file: "diet-rendah-serat.pdf", image: "diet-rendah-serat.jpg" },
      { title: "Diet Hati", file: "diet-hati.pdf", image: "diet-hati.jpg" },
    ],
  },
  {
    kategori: "Panduan Umum",
    deskripsi: "Referensi umum seputar bahan makanan.",
    warna: "gray",
    items: [
      { title: "Bahan Makanan Penukar", file: "bahan-makanan-penukar.pdf", image: "bahan-makanan-penukar.jpg" },
    ],
  },
];

const warnaMap = {
  accent: {
    badge: "bg-accent/10 text-accent-dark",
    button: "bg-accent hover:bg-accent-dark",
    border: "border-accent/20",
  },
  primary: {
    badge: "bg-primary/10 text-primary",
    button: "bg-primary hover:bg-primary-dark",
    border: "border-primary/20",
  },
  gray: {
    badge: "bg-gray-100 text-gray-600",
    button: "bg-gray-700 hover:bg-gray-800",
    border: "border-gray-200",
  },
};

export default function LeafletPage() {
  return (
    <main>
      <Navbar />

      <section className="bg-primary text-white py-16 px-6 md:px-16 text-center">
        <p className="text-accent font-semibold mb-2">Leaflet Edukasi Gizi</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Unduh Materi Edukasi Gizi
        </h1>
        <p className="text-white/80 max-w-xl mx-auto">
          Kumpulan leaflet resmi dari Gizi_RSCaruban, siap dibaca dan diunduh
          kapan saja.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 space-y-16">
        {kategoriLeaflet.map((grup) => {
          const warna = warnaMap[grup.warna];
          return (
            <div key={grup.kategori}>
              <div className="mb-6">
                <span
                  className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 ${warna.badge}`}
                >
                  {grup.kategori}
                </span>
                <p className="text-gray-500 text-sm">{grup.deskripsi}</p>
              </div>

              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
                {grup.items.map((item) => (
                  <a
                    key={item.file}
                    href={`/pdf/${item.file}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`group bg-white rounded-2xl border ${warna.border} shadow-sm overflow-hidden hover:shadow-lg hover:-translate-y-1 transition flex flex-col`}
                  >
                    {/* Thumbnail foto */}
                    <div className="aspect-[4/3] bg-gray-100 overflow-hidden">
                      <img
                        src={`/images/leaflet/${item.image}`}
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                      />
                    </div>

                    <div className="p-5 flex flex-col flex-1 justify-between">
                      <h3 className="font-semibold text-gray-900 mb-4">
                        {item.title}
                      </h3>
                      <span
                        className={`inline-block text-center text-white text-sm font-semibold px-4 py-2 rounded-lg transition ${warna.button}`}
                      >
                        Lihat Leaflet
                      </span>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </div>

      <Footer />
    </main>
  );
}