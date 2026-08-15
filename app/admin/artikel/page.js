"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import AdminGuard from "@/components/AdminGuard";
import AdminLayout from "@/components/AdminLayout";

function formatTanggal(tanggal) {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function DaftarArtikelAdmin() {
  const [artikelList, setArtikelList] = useState([]);
  const [loading, setLoading] = useState(true);

  async function muatArtikel() {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("id, title, slug, created_at, status")
      .order("created_at", { ascending: false });

    if (!error) {
      setArtikelList(data);
    }
    setLoading(false);
  }

  useEffect(() => {
    muatArtikel();
  }, []);

  async function handleHapus(id, title) {
    const yakin = confirm(`Yakin mau hapus artikel "${title}"?`);
    if (!yakin) return;

    const { error } = await supabase.from("articles").delete().eq("id", id);

    if (error) {
      alert("Gagal menghapus artikel: " + error.message);
      return;
    }

    muatArtikel();
  }

  return (
    <AdminLayout title="Kelola Artikel" subtitle="Tambah, ubah, atau hapus artikel yang tampil di website.">
      <div className="flex justify-end mb-6">
        <a
          href="/admin/artikel/baru"
          className="inline-flex items-center gap-2 bg-primary hover:bg-primary-dark text-white font-semibold px-5 py-2.5 rounded-xl transition"
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M12 5v14M5 12h14" strokeLinecap="round" />
          </svg>
          Tambah Artikel Baru
        </a>
      </div>

      {loading ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center text-gray-400">
          Memuat data...
        </div>
      ) : artikelList.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <p className="text-gray-500 mb-1">Belum ada artikel</p>
          <p className="text-gray-400 text-sm">Klik "Tambah Artikel Baru" untuk mulai menulis.</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {artikelList.map((artikel, index) => (
            <div
              key={artikel.id}
              className={`flex items-center justify-between px-6 py-5 hover:bg-gray-50 transition ${
                index !== artikelList.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center text-primary font-bold text-sm shrink-0">
                  {artikel.title.charAt(0).toUpperCase()}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-semibold text-gray-900">{artikel.title}</p>
                    <span
                      className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                        artikel.status === "published"
                          ? "bg-primary/10 text-primary"
                          : "bg-gray-100 text-gray-500"
                      }`}
                    >
                      {artikel.status === "published" ? "Terbit" : "Draft"}
                    </span>
                  </div>
                  <p className="text-xs text-gray-400">{formatTanggal(artikel.created_at)}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <a
                  href={`/admin/artikel/${artikel.id}/edit`}
                  className="p-2 rounded-lg text-gray-400 hover:text-primary hover:bg-primary/10 transition"
                  title="Edit"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 20h9" strokeLinecap="round" />
                    <path d="M16.5 3.5a2.12 2.12 0 0 1 3 3L7 19l-4 1 1-4Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
                <button
                  onClick={() => handleHapus(artikel.id, artikel.title)}
                  className="p-2 rounded-lg text-gray-400 hover:text-red-500 hover:bg-red-50 transition"
                  title="Hapus"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 6h18M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2m3 0v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6h14Z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminLayout>
  );
}

export default function AdminArtikelPage() {
  return (
    <AdminGuard>
      <DaftarArtikelAdmin />
    </AdminGuard>
  );
}