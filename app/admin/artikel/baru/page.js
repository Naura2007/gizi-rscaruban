"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AdminGuard from "@/components/AdminGuard";
import AdminLayout from "@/components/AdminLayout";
import RichTextEditor from "@/components/RichTextEditor";
import ImageUploader from "@/components/ImageUploader";

function buatSlug(title) {
  return title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function FormTambahArtikel() {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSimpan(status) {
    setError("");

    if (!title.trim()) {
      setError("Judul artikel wajib diisi.");
      return;
    }
    if (!content || content === "<p></p>") {
      setError("Isi artikel wajib diisi.");
      return;
    }

    setLoading(true);
    const slug = buatSlug(title);

    const { error } = await supabase.from("articles").insert({
      title,
      slug,
      content,
      cover_image_url: coverImageUrl || null,
      status,
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
    <AdminLayout title="Tambah Artikel Baru">
      <div className="max-w-3xl">
        <a
          href="/admin/artikel"
          className="text-primary text-sm font-semibold hover:underline mb-6 inline-block"
        >
          ← Kembali ke Daftar Artikel
        </a>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Judul Artikel
            </label>
            <input
              type="text"
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
              Gambar Sampul
            </label>
            <ImageUploader value={coverImageUrl} onChange={setCoverImageUrl} />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Isi Artikel
            </label>
            <RichTextEditor content={content} onChange={setContent} />
          </div>

          {error && (
            <p className="text-red-600 text-sm mb-4 text-center">{error}</p>
          )}

          <div className="flex gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSimpan("draft")}
              className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold py-3 rounded-xl transition disabled:opacity-50"
            >
              {loading ? "Menyimpan..." : "Simpan sebagai Draft"}
            </button>
            <button
              type="button"
              disabled={loading}
              onClick={() => handleSimpan("published")}
              className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
            >
              {loading ? "Menerbitkan..." : "Terbitkan"}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default function TambahArtikelPage() {
  return (
    <AdminGuard>
      <FormTambahArtikel />
    </AdminGuard>
  );
}