"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AdminGuard from "@/components/AdminGuard";
import AdminLayout from "@/components/AdminLayout";
import RichTextEditor from "@/components/RichTextEditor";
import ImageUploader from "@/components/ImageUploader";

function FormEditArtikel({ id }) {
  const router = useRouter();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [coverImageUrl, setCoverImageUrl] = useState("");
  const [status, setStatus] = useState("published");
  const [loadingData, setLoadingData] = useState(true);
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    async function muatArtikel() {
      const { data, error } = await supabase
        .from("articles")
        .select("title, content, cover_image_url, status")
        .eq("id", id)
        .single();

      if (!error && data) {
        setTitle(data.title);
        setContent(data.content);
        setCoverImageUrl(data.cover_image_url || "");
        setStatus(data.status || "published");
      }
      setLoadingData(false);
    }

    muatArtikel();
  }, [id]);

  async function handleUpdate(statusBaru) {
    setError("");
    setSaving(true);

    const { error } = await supabase
      .from("articles")
      .update({
        title,
        content,
        cover_image_url: coverImageUrl || null,
        status: statusBaru,
      })
      .eq("id", id);

    setSaving(false);

    if (error) {
      setError("Gagal menyimpan perubahan: " + error.message);
      return;
    }

    router.push("/admin/artikel");
  }

  if (loadingData) {
    return (
      <AdminLayout title="Edit Artikel">
        <p className="text-gray-400">Memuat data artikel...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Edit Artikel">
      <div className="max-w-3xl">
        <a
          href="/admin/artikel"
          className="text-primary text-sm font-semibold hover:underline mb-6 inline-block"
        >
          ← Kembali ke Daftar Artikel
        </a>

        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-8">
          <div className="mb-5 flex items-center justify-between">
            <label className="block text-sm font-semibold text-gray-700">
              Status
            </label>
            <span
              className={`text-xs font-bold px-3 py-1 rounded-full ${
                status === "published"
                  ? "bg-primary/10 text-primary"
                  : "bg-gray-100 text-gray-500"
              }`}
            >
              {status === "published" ? "Terbit" : "Draft"}
            </span>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Judul Artikel
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
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
            {status === "published" ? (
              <button
                type="button"
                disabled={saving}
                onClick={() => handleUpdate("draft")}
                className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold py-3 rounded-xl transition disabled:opacity-50"
              >
                Jadikan Draft
              </button>
            ) : (
              <button
                type="button"
                disabled={saving}
                onClick={() => handleUpdate("published")}
                className="flex-1 border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold py-3 rounded-xl transition disabled:opacity-50"
              >
                Terbitkan
              </button>
            )}
            <button
              type="button"
              disabled={saving}
              onClick={() => handleUpdate(status)}
              className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition disabled:opacity-50"
            >
              {saving ? "Menyimpan..." : "Simpan Perubahan"}
            </button>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}

export default function EditArtikelPage({ params }) {
  const [id, setId] = useState(null);

  useEffect(() => {
    params.then((p) => setId(p.id));
  }, [params]);

  if (!id) return null;

  return (
    <AdminGuard>
      <FormEditArtikel id={id} />
    </AdminGuard>
  );
}