"use client";

import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AdminLayout({ children, title, subtitle }) {
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <header className="bg-primary text-white">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-bold">Gizi_RSCaruban</span>
            <span className="bg-accent text-white text-xs font-bold px-2 py-0.5 rounded-full">
              Admin
            </span>
          </div>
          <button
            onClick={handleLogout}
            className="text-sm text-white/70 hover:text-white transition"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Page header */}
      {title && (
        <div className="max-w-5xl mx-auto px-6 pt-10 pb-6">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          {subtitle && <p className="text-gray-500 text-sm mt-1">{subtitle}</p>}
        </div>
      )}

      {/* Konten halaman */}
      <div className="max-w-5xl mx-auto px-6 pb-16">{children}</div>
    </div>
  );
}