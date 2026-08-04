"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AdminGuard from "@/components/AdminGuard";

function buatSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "") // buang karakter aneh
    .replace(/\s+/g, "-") // spasi jadi strip
    .replace(/-+/g, "-"); // strip dobel jadi satu
}

function FormTambahArtikel() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSimpan(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    const slug = buatSlug(title);

    const { error } = await supabase.from("articles").insert({
      title,
      slug,
      content,
      cover_image_url: coverImageUrl || null,
    });

    setLoading(false);

    if (error) {
      setError(
        error.message.includes("duplicate")
          ? "Sudah ada artikel dengan judul yang mirip. Coba ubah judulnya sedikit."
          : "Gagal menyimpan: " + error.message
      );
      return;
    }

    router.push("/admin/artikel");
  }

  return (
    <main className="max-w-2xl mx-auto px-6 py-16">
      <a
        href="/admin/artikel"
        className="text-primary text-sm font-semibold hover:underline mb-6 inline-block"
      >
        ← Kembali ke Daftar Artikel
      </a>

      <h1 className="text-2xl font-bold text-gray-900 mb-8">
        Tambah Artikel Baru
      </h1>

      <form
        onSubmit={handleSimpan}
        className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8"
      >
        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Judul Artikel
          </label>
          <input
            type="text"
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="contoh: Manfaat Sayur untuk Anak"
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
          {title && (
            <p className="text-xs text-gray-400 mt-1">
              URL: /artikel/{buatSlug(title)}
            </p>
          )}
        </div>

        <div className="mb-5">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Link Gambar Sampul (opsional)
          </label>
          <input
            type="text"
            value={coverImageUrl}
            onChange={(e) => setCoverImageUrl(e.target.value)}
            placeholder="https://..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-2">
            Isi Artikel
          </label>
          <textarea
            required
            rows={10}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Tulis isi artikel di sini..."
            className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {error && (
          <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
        >
          {loading ? "Menyimpan..." : "Simpan Artikel"}
        </button>
      </form>
    </main>
  );
}

export default function TambahArtikelPage() {
  return (
    <AdminGuard>
      <FormTambahArtikel />
    </AdminGuard>
  );
}