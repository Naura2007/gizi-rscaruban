"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function ImageUploader({ value, onChange }) {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState("");

  async function handleFileChange(e) {
    const file = e.target.files[0];
    if (!file) return;

    setError("");
    setUploading(true);

    // Bikin nama file unik biar nggak bentrok sama gambar lain
    const namaFile = `${Date.now()}-${file.name.replace(/\s+/g, "-")}`;

    const { error: uploadError } = await supabase.storage
      .from("article-images")
      .upload(namaFile, file);

    if (uploadError) {
      setError("Gagal upload: " + uploadError.message);
      setUploading(false);
      return;
    }

    // Ambil URL publik dari gambar yang baru diupload
    const { data } = supabase.storage
      .from("article-images")
      .getPublicUrl(namaFile);

    onChange(data.publicUrl);
    setUploading(false);
  }

  function handleHapus() {
    onChange("");
  }

  return (
    <div>
      {value ? (
        <div className="relative rounded-xl overflow-hidden border border-gray-200">
          <img src={value} alt="Sampul artikel" className="w-full aspect-video object-cover" />
          <button
            type="button"
            onClick={handleHapus}
            className="absolute top-2 right-2 bg-white/90 hover:bg-white text-red-500 text-xs font-semibold px-3 py-1.5 rounded-lg shadow"
          >
            Hapus Gambar
          </button>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center border-2 border-dashed border-gray-200 rounded-xl py-10 cursor-pointer hover:border-primary hover:bg-primary/5 transition">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
            disabled={uploading}
          />
          <span className="text-gray-400 text-sm">
            {uploading ? "Mengupload..." : "Klik untuk pilih gambar sampul"}
          </span>
        </label>
      )}

      {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
    </div>
  );
}