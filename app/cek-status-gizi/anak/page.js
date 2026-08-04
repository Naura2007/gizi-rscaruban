"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cekBeratBadanMenurutUmur } from "@/lib/whoZscore";

export default function CekGiziAnakPage() {
  const [gender, setGender] = useState("L");
  const [usiaBulan, setUsiaBulan] = useState("");
  const [berat, setBerat] = useState("");
  const [hasil, setHasil] = useState(null);
  const [errorPesan, setErrorPesan] = useState("");

  function hitungStatusGizi(e) {
    e.preventDefault();
    setErrorPesan("");

    const usiaNum = parseFloat(usiaBulan);
    const beratNum = parseFloat(berat);

    if (usiaNum < 0 || usiaNum > 60) {
      setErrorPesan("Kalkulator ini hanya berlaku untuk usia 0–60 bulan (0–5 tahun).");
      setHasil(null);
      return;
    }

    const result = cekBeratBadanMenurutUmur(beratNum, usiaNum, gender);

    if (!result) {
      setErrorPesan("Data untuk usia ini tidak ditemukan. Pastikan usia diisi dalam rentang 0–60 bulan.");
      setHasil(null);
      return;
    }

    setHasil(result);
  }

  function reset() {
    setUsiaBulan("");
    setBerat("");
    setHasil(null);
    setErrorPesan("");
  }

  return (
    <main>
      <Navbar />

      <section className="bg-primary text-white py-16 px-6 md:px-16 text-center">
        <p className="text-accent font-semibold mb-2">Cek Status Gizi</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Kalkulator Status Gizi Anak
        </h1>
        <p className="text-white/80 max-w-xl mx-auto">
          Berdasarkan indikator Berat Badan menurut Umur (BB/U), standar WHO,
          untuk anak usia 0–5 tahun.
        </p>
      </section>

      <div className="max-w-xl mx-auto px-6 md:px-16 py-16">
        <form
          onSubmit={hitungStatusGizi}
          className="bg-white rounded-3xl shadow-lg border border-gray-100 p-8"
        >
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Jenis Kelamin
            </label>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setGender("L")}
                className={`flex-1 py-3 rounded-xl font-medium transition ${
                  gender === "L"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Laki-laki
              </button>
              <button
                type="button"
                onClick={() => setGender("P")}
                className={`flex-1 py-3 rounded-xl font-medium transition ${
                  gender === "P"
                    ? "bg-primary text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                Perempuan
              </button>
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Usia (bulan)
            </label>
            <input
              type="number"
              required
              min="0"
              max="60"
              value={usiaBulan}
              onChange={(e) => setUsiaBulan(e.target.value)}
              placeholder="contoh: 18"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
            <p className="text-xs text-gray-400 mt-1">Rentang usia: 0–60 bulan (0–5 tahun)</p>
          </div>

          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Berat Badan (kg)
            </label>
            <input
              type="number"
              step="0.1"
              required
              value={berat}
              onChange={(e) => setBerat(e.target.value)}
              placeholder="contoh: 10.5"
              className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
            />
          </div>

          <div className="flex gap-3">
            <button
              type="submit"
              className="flex-1 bg-primary hover:bg-primary-dark text-white font-semibold py-3 rounded-xl transition"
            >
              Cek Status Gizi
            </button>
            {(hasil || errorPesan) && (
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

        {errorPesan && (
          <div className="mt-6 rounded-2xl p-5 bg-red-50 text-red-600 text-sm text-center">
            {errorPesan}
          </div>
        )}

        {hasil && (
          <div className={`mt-6 rounded-3xl p-8 text-center ${hasil.bg}`}>
            <p className="text-sm text-gray-500 mb-1">Z-Score (BB/U)</p>
            <p className={`text-5xl font-extrabold mb-2 ${hasil.warna}`}>
              {hasil.zScore}
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