import bmifaGirls from "./who-data/bmifa-girls.json";
import bmifaBoys from "./who-data/bmifa-boys.json";

function cariDataLMS(ageMonths, gender) {
  const data = gender === "L" ? bmifaBoys : bmifaGirls;
  const bulanDibulatkan = Math.round(ageMonths);

  const row = data.find((item) => item.month === bulanDibulatkan);
  return row || null;
}

function hitungZScore(nilaiAktual, L, M, S) {
  if (Math.abs(L) < 0.01) {
    return Math.log(nilaiAktual / M) / S;
  }
  return (Math.pow(nilaiAktual / M, L) - 1) / (L * S);
}

/**
 * Klasifikasi status gizi berdasarkan Z-score IMT/U,
 * mengikuti standar WHO 2007 untuk usia 5-19 tahun.
 */
function klasifikasiIMTU(z) {
  if (z < -3) {
    return {
      label: "Gizi Buruk (Severe Thinness)",
      warna: "text-red-600",
      bg: "bg-red-50",
      saran: "Segera konsultasikan ke tenaga kesehatan atau ahli gizi untuk penanganan lebih lanjut.",
    };
  }
  if (z < -2) {
    return {
      label: "Gizi Kurang (Thinness)",
      warna: "text-accent-dark",
      bg: "bg-accent/10",
      saran: "Disarankan konsultasi ke ahli gizi untuk evaluasi pola makan.",
    };
  }
  if (z <= 1) {
    return {
      label: "Gizi Normal",
      warna: "text-primary",
      bg: "bg-primary/10",
      saran: "Pertahankan pola makan bergizi seimbang dan aktivitas fisik rutin.",
    };
  }
  if (z <= 2) {
    return {
      label: "Gizi Lebih (Overweight)",
      warna: "text-orange-600",
      bg: "bg-orange-50",
      saran: "Disarankan mengatur porsi makan dan meningkatkan aktivitas fisik. Konsultasikan dengan ahli gizi.",
    };
  }
  return {
    label: "Obesitas",
    warna: "text-red-600",
    bg: "bg-red-50",
    saran: "Disarankan segera berkonsultasi dengan ahli gizi untuk program penanganan berat badan yang aman.",
  };
}

/**
 * Fungsi utama untuk cek status gizi remaja (5-19 tahun / 61-228 bulan).
 * beratKg dan tinggiCm dipakai untuk menghitung IMT terlebih dulu,
 * baru dibandingkan ke tabel referensi usia & jenis kelamin.
 */
export function cekStatusGiziRemaja(beratKg, tinggiCm, ageMonths, gender) {
  const tinggiM = tinggiCm / 100;
  const imt = beratKg / (tinggiM * tinggiM);

  const lms = cariDataLMS(ageMonths, gender);

  if (!lms || lms.L == null || lms.M == null || lms.S == null) {
    return null;
  }

  const z = hitungZScore(imt, lms.L, lms.M, lms.S);
  const kategori = klasifikasiIMTU(z);

  return {
    imt: imt.toFixed(1),
    zScore: z.toFixed(2),
    ...kategori,
  };
}