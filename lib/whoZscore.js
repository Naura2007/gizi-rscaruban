import wfaGirls from "./who-data/wfa-girls.json";
import wfaBoys from "./who-data/wfa-boys.json";

/**
 * Cari baris data (L, M, S) untuk usia tertentu (dalam bulan).
 * Data WHO ada per bulan bulat (0, 1, 2, ..., 60), jadi kita bulatkan
 * usia ke bulan terdekat yang tersedia di tabel.
 */
function cariDataLMS(ageMonths, gender) {
  const data = gender === "L" ? wfaBoys : wfaGirls;
  const bulanDibulatkan = Math.round(ageMonths);

  const row = data.find((item) => item.month === bulanDibulatkan);
  return row || null;
}

/**
 * Rumus resmi WHO (LMS method) untuk menghitung Z-score.
 * Kalau L mendekati 0, pakai rumus logaritma (sesuai ketentuan WHO).
 */
function hitungZScore(beratAktual, L, M, S) {
  if (Math.abs(L) < 0.01) {
    return Math.log(beratAktual / M) / S;
  }
  return (Math.pow(beratAktual / M, L) - 1) / (L * S);
}

/**
 * Klasifikasi status gizi berdasarkan Z-score BB/U,
 * mengikuti standar WHO / Kemenkes RI.
 */
function klasifikasiBBU(z) {
  if (z < -3) {
    return {
      label: "Berat Badan Sangat Kurang",
      warna: "text-red-600",
      bg: "bg-red-50",
      saran: "Segera konsultasikan ke tenaga kesehatan atau ahli gizi untuk penanganan lebih lanjut.",
    };
  }
  if (z < -2) {
    return {
      label: "Berat Badan Kurang",
      warna: "text-accent-dark",
      bg: "bg-accent/10",
      saran: "Disarankan konsultasi ke ahli gizi untuk evaluasi pola makan dan pertumbuhan anak.",
    };
  }
  if (z <= 1) {
    return {
      label: "Berat Badan Normal",
      warna: "text-primary",
      bg: "bg-primary/10",
      saran: "Pertahankan pola makan bergizi seimbang dan pantau tumbuh kembang secara rutin.",
    };
  }
  return {
    label: "Risiko Berat Badan Lebih",
    warna: "text-orange-600",
    bg: "bg-orange-50",
    saran: "Disarankan konsultasi ke ahli gizi untuk evaluasi pola makan anak.",
  };
}

/**
 * Fungsi utama yang dipanggil dari halaman kalkulator.
 * Mengembalikan hasil Z-score + kategori, atau null kalau data usia
 * tidak ditemukan (misal usia di luar rentang 0-60 bulan).
 */
export function cekBeratBadanMenurutUmur(beratKg, ageMonths, gender) {
  const lms = cariDataLMS(ageMonths, gender);

  if (!lms || lms.L == null || lms.M == null || lms.S == null) {
    return null;
  }

  const z = hitungZScore(beratKg, lms.L, lms.M, lms.S);
  const kategori = klasifikasiBBU(z);

  return {
    zScore: z.toFixed(2),
    ...kategori,
  };
}