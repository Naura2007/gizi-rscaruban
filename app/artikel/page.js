import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";

async function getArtikel() {
  const { data, error } = await supabase
    .from("articles")
    .select("id, title, slug, content, cover_image_url, created_at")
    .eq("status", "published")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Gagal mengambil artikel:", error.message);
    return [];
  }

  return data;
}

function htmlKeTeksPolos(html) {
  return html.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ").trim();
}

function buatRingkasan(html, panjang = 120) {
  const teks = htmlKeTeksPolos(html);
  if (teks.length <= panjang) return teks;
  return teks.slice(0, panjang).trim() + "...";
}

function estimasiWaktuBaca(html) {
  const teks = htmlKeTeksPolos(html);
  const jumlahKata = teks.split(/\s+/).filter(Boolean).length;
  const menit = Math.max(1, Math.round(jumlahKata / 200));
  return `${menit} menit baca`;
}

function formatTanggal(tanggal) {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function ArtikelPage() {
  const artikelList = await getArtikel();
  const [artikelUtama, ...artikelLainnya] = artikelList;

  return (
    <main>
      <Navbar />

      <section className="bg-primary text-white py-16 px-6 md:px-16 text-center">
        <p className="text-accent font-semibold mb-2">Artikel</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Informasi Seputar Gizi & Kesehatan
        </h1>
        <p className="text-white/80 max-w-xl mx-auto">
          Bacaan terpercaya untuk membantu Anda dan keluarga hidup lebih
          sehat.
        </p>
      </section>

      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16">
        {artikelList.length === 0 ? (
          <p className="text-center text-gray-500">
            Belum ada artikel yang tersedia.
          </p>
        ) : (
          <>
            <a
              href={`/artikel/${artikelUtama.slug}`}
              className="group grid md:grid-cols-2 gap-8 items-center bg-white rounded-3xl border border-gray-100 shadow-lg overflow-hidden mb-16 hover:shadow-2xl transition"
            >
              <div className="aspect-[16/10] md:aspect-auto md:h-full bg-primary/10 overflow-hidden">
                {artikelUtama.cover_image_url ? (
                  <img
                    src={artikelUtama.cover_image_url}
                    alt={artikelUtama.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-primary/30">
                    Gizi_RSCaruban
                  </div>
                )}
              </div>
              <div className="p-6 md:p-10">
                <span className="inline-block bg-accent/10 text-accent-dark text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-4">
                  Artikel Terbaru
                </span>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3 group-hover:text-primary transition">
                  {artikelUtama.title}
                </h2>
                <p className="text-gray-500 mb-4">
                  {buatRingkasan(artikelUtama.content, 180)}
                </p>
                <p className="text-xs text-gray-400">
                  {formatTanggal(artikelUtama.created_at)} · {estimasiWaktuBaca(artikelUtama.content)}
                </p>
              </div>
            </a>

            {artikelLainnya.length > 0 && (
              <>
                <h3 className="text-lg font-bold text-gray-900 mb-6">
                  Artikel Lainnya
                </h3>
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {artikelLainnya.map((artikel) => (
                    <a
                      key={artikel.id}
                      href={`/artikel/${artikel.slug}`}
                      className="group bg-white rounded-2xl border border-gray-100 shadow-lg overflow-hidden hover:shadow-2xl hover:-translate-y-1 transition"
                    >
                      <div className="aspect-[16/10] bg-primary/10 overflow-hidden">
                        {artikel.cover_image_url ? (
                          <img
                            src={artikel.cover_image_url}
                            alt={artikel.title}
                            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-primary/30 text-sm">
                            Gizi_RSCaruban
                          </div>
                        )}
                      </div>
                      <div className="p-6">
                        <p className="text-xs text-gray-400 mb-2">
                          {formatTanggal(artikel.created_at)} · {estimasiWaktuBaca(artikel.content)}
                        </p>
                        <h2 className="font-bold text-gray-900 mb-2 group-hover:text-primary transition">
                          {artikel.title}
                        </h2>
                        <p className="text-sm text-gray-500">
                          {buatRingkasan(artikel.content)}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>
              </>
            )}
          </>
        )}
      </div>

      <Footer />
    </main>
  );
}