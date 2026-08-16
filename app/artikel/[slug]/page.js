import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/lib/supabase";
import { notFound } from "next/navigation";

export const dynamic = "force-dynamic";

async function getArtikelBySlug(slug) {
  const { data, error } = await supabase
    .from("articles")
    .select("id, title, content, cover_image_url, created_at, status")
    .eq("slug", slug)
    .eq("status", "published")
    .single();

  if (error || !data) {
    return null;
  }

  return data;
}

function formatTanggal(tanggal) {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default async function DetailArtikelPage({ params }) {
  const { slug } = await params;
  const artikel = await getArtikelBySlug(slug);

  if (!artikel) {
    notFound();
  }

  return (
    <main>
      <Navbar />

      <article className="max-w-3xl mx-auto px-6 md:px-16 py-16">
        <a
          href="/artikel"
          className="text-primary text-sm font-semibold hover:underline mb-6 inline-block"
        >
          ← Kembali ke Artikel
        </a>

        <p className="text-gray-400 text-sm mb-2">
          {formatTanggal(artikel.created_at)}
        </p>
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
          {artikel.title}
        </h1>

        {artikel.cover_image_url && (
          <div className="rounded-2xl overflow-hidden mb-8 aspect-[16/9]">
            <img
              src={artikel.cover_image_url}
              alt={artikel.title}
              className="w-full h-full object-cover"
            />
          </div>
        )}

        <div
          className="prose prose-lg max-w-none prose-headings:text-gray-900 prose-p:text-gray-700"
          dangerouslySetInnerHTML={{ __html: artikel.content }}
        />
      </article>

      <Footer />
    </main>
  );
}