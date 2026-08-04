"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

function getKategori(imt) {
  if (imt < 18.5) {
    return { label: "Kurus", warna: "text-blue-600", bg: "bg-blue-50", saran: "Disarankan menambah asupan kalori dan protein secara bertahap. Konsultasikan dengan ahli gizi untuk rencana yang tepat." };
  }
  if (imt <= 25.0) {
    return { label: "Normal", warna: "text-primary", bg: "bg-primary/10", saran: "Pertahankan pola makan seimbang dan aktivitas fisik rutin." };
  }
  if (imt <= 27.0) {
    return { label: "Gemuk (BB Lebih)", warna: "text-accent-dark", bg: "bg-accent/10", saran: "Disarankan mengatur porsi makan dan meningkatkan aktivitas fisik. Konsultasikan dengan ahli gizi." };
  }
  return { label: "Obesitas", warna: "text-red-600", bg: "bg-red-50", saran: "Disarankan segera berkonsultasi dengan ahli gizi untuk program penurunan berat badan yang aman." };
}

export default function CekGiziDewasaPage() {
  const [berat, setBerat] = useState("");
  const [tinggi, setTinggi] = useState("");
  const [hasil, setHasil] = useState(null);

  function hitungIMT(e) {
    e.preventDefault();

    const beratNum = parseFloat(berat);
    const tinggiM = parseFloat(tinggi) / 100; // cm ke meter

    if (!beratNum || !tinggiM || tinggiM <= 0) {
      return;
    }

    const imt = beratNum / (tinggiM * tinggiM);
    const kategori = getKategori(imt);

    setHasil({
      imt: imt.toFixed(1),
      ...kategori,
    });
  }

  function reset() {
    setBerat("");
    setTinggi("");
    setHasil(null);
  }

  return (
    <main>
      <Navbar />

      <section className="bg-primary text-white py-16 px-6 md:px-16 text-center">
        <p className="text-accent font-semibold mb-2">Cek Status Gizi</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Kalkulator IMT Dewasa
        </h1>
        <p className="text-white/80 max-w-xl mx-auto">
          Masukkan berat dan tinggi badan Anda untuk mengetahui status gizi
          berdasarkan Indeks Massa Tubuh (IMT).
        </p>
      </section>

      <div className="max-w-xl mx-auto px-6 md:px-16 py-16">
        <form
          onSubmit={hitungIMT}
          className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8"
        >
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Berat Badan (kg)
            </label>
            <input
              type="number"
              step="0.1"
              required
              value={berat}
              onChange={(e) => setBerat(e.target.value)}
              placeholder="contoh: 60"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Tinggi Badan (cm)
            </label>
            <input
              type="number"
              step="0.1"
              required
              value={tinggi}
              onChange={(e) => setTinggi(e.target.value)}
              placeholder="contoh: 165"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition"
            >
              Hitung IMT
            </button>
            {hasil && (
              <button
                type="button"
                onClick={reset}
                className="px-5 border border-gray-200 rounded-xl text-gray-500 hover:bg-gray-50 transition"
              >
                Reset
              </button>
            )}
          </div>
        </form>

        {/* Hasil perhitungan */}
        {hasil && (
          <div className={`mt-6 rounded-3xl p-8 text-center ${hasil.bg}`}>
            <p className="text-sm text-gray-500 mb-1">IMT Anda</p>
            <p className={`text-5xl font-extrabold mb-2 ${hasil.warna}`}>
              {hasil.imt}
            </p>
            <p className={`text-lg font-bold mb-4 ${hasil.warna}`}>
              {hasil.label}
            </p>
            <p className="text-sm text-gray-600 max-w-sm mx-auto">
              {hasil.saran}
            </p>
          </div>
        )}
      </div>

      <Footer />
    </main>
  );
}