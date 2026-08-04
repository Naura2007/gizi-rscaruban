"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";
import AdminGuard from "@/components/AdminGuard";

function formatTanggal(tanggal) {
  return new Date(tanggal).toLocaleDateString("id-ID", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

function DaftarArtikelAdmin() {
  const router = useRouter();
  const [artikelList, setArtikelList] = useState([]);
  const [loading, setLoading] = useState(true);

  async function muatArtikel() {
    setLoading(true);
    const { data, error } = await supabase
      .from("articles")
      .select("id, title, slug, created_at")
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

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <main className="max-w-4xl mx-auto px-6 py-16">
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="text-accent font-semibold mb-1">Admin Panel</p>
          <h1 className="text-2xl font-bold text-gray-900">Kelola Artikel</h1>
        </div>
        <button
          onClick={handleLogout}
          className="text-sm text-gray-500 hover:text-red-600 transition"
        >
          Logout
        </button>
      </div>

      <a
        href="/admin/artikel/baru"
        className="inline-block bg-primary hover:bg-primary-dark text-white font-semibold px-5 py-2.5 rounded-xl transition mb-8"
      >
        + Tambah Artikel Baru
      </a>

      {loading ? (
        <p className="text-gray-400">Memuat data...</p>
      ) : artikelList.length === 0 ? (
        <p className="text-gray-400">Belum ada artikel.</p>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
          {artikelList.map((artikel, index) => (
            <div
              key={artikel.id}
              className={`flex items-center justify-between px-6 py-4 ${
                index !== artikelList.length - 1 ? "border-b border-gray-100" : ""
              }`}
            >
              <div>
                <p className="font-semibold text-gray-900">{artikel.title}</p>
                <p className="text-xs text-gray-400">
                  {formatTanggal(artikel.created_at)}
                </p>
              </div>
              <div className="flex gap-3 text-sm font-semibold">
                <a
                  href={`/admin/artikel/${artikel.id}/edit`}
                  className="text-primary hover:underline"
                >
                  Edit
                </a>
                <button
                  onClick={() => handleHapus(artikel.id, artikel.title)}
                  className="text-red-500 hover:underline"
                >
                  Hapus
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}

export default function AdminArtikelPage() {
  return (
    <AdminGuard>
      <DaftarArtikelAdmin />
    </AdminGuard>
  );
}