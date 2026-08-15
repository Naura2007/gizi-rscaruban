"use client";

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { cekStatusGiziRemaja } from "@/lib/whoZscoreRemaja";

export default function CekGiziRemajaPage() {
  const [gender, setGender] = useState("L");
  const [usiaTahun, setUsiaTahun] = useState("");
  const [usiaBulanTambahan, setUsiaBulanTambahan] = useState("");
  const [berat, setBerat] = useState("");
  const [tinggi, setTinggi] = useState("");
  const [hasil, setHasil] = useState(null);
  const [errorPesan, setErrorPesan] = useState("");

  function hitungStatusGizi(e) {
    e.preventDefault();
    setErrorPesan("");

    const tahun = parseFloat(usiaTahun) || 0;
    const bulanTambahan = parseFloat(usiaBulanTambahan) || 0;
    const totalBulan = tahun * 12 + bulanTambahan;

    const beratNum = parseFloat(berat);
    const tinggiNum = parseFloat(tinggi);

    if (totalBulan < 61 || totalBulan > 228) {
      setErrorPesan("Kalkulator ini hanya berlaku untuk usia 5–19 tahun.");
      setHasil(null);
      return;
    }

    const result = cekStatusGiziRemaja(beratNum, tinggiNum, totalBulan, gender);

    if (!result) {
      setErrorPesan("Data untuk usia ini tidak ditemukan. Pastikan usia diisi dengan benar.");
      setHasil(null);
      return;
    }

    setHasil(result);
  }

  function reset() {
    setUsiaTahun("");
    setUsiaBulanTambahan("");
    setBerat("");
    setTinggi("");
    setHasil(null);
    setErrorPesan("");
  }

  return (
    <main>
      <Navbar />

      <section className="bg-primary text-white py-16 px-6 md:px-16 text-center">
        <p className="text-accent font-semibold mb-2">Cek Status Gizi</p>
        <h1 className="text-3xl md:text-4xl font-bold mb-3">
          Kalkulator Status Gizi Remaja
        </h1>
        <p className="text-white/80 max-w-xl mx-auto">
          Berdasarkan indikator IMT menurut Umur, standar WHO, untuk usia
          5–19 tahun.
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
                  gender === "L" ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                Laki-laki
              </button>
              <button
                type="button"
                onClick={() => setGender("P")}
                className={`flex-1 py-3 rounded-xl font-medium transition ${
                  gender === "P" ? "bg-primary text-white" : "bg-gray-100 text-gray-600"
                }`}
              >
                Perempuan
              </button>
            </div>
          </div>

          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Usia
            </label>
            <div className="flex gap-3">
              <div className="flex-1">
                <input
                  type="number"
                  required
                  min="5"
                  max="19"
                  value={usiaTahun}
                  onChange={(e) => setUsiaTahun(e.target.value)}
                  placeholder="Tahun"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div className="flex-1">
                <input
                  type="number"
                  min="0"
                  max="11"
                  value={usiaBulanTambahan}
                  onChange={(e) => setUsiaBulanTambahan(e.target.value)}
                  placeholder="Bulan (opsional)"
                  className="w-full border border-gray-200 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            <p className="text-xs text-gray-400 mt-1">Rentang usia: 5–19 tahun</p>
          </div>

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
              placeholder="contoh: 45"
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
              placeholder="contoh: 150"
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
            <p className="text-sm text-gray-500 mb-1">IMT Anda</p>
            <p className={`text-4xl font-extrabold mb-1 ${hasil.warna}`}>
              {hasil.imt}
            </p>
            <p className="text-xs text-gray-400 mb-4">Z-Score: {hasil.zScore}</p>
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