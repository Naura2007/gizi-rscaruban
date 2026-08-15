// Script ini membaca file Excel (.xlsx) resmi dari WHO
// dan mengubahnya jadi file JSON yang gampang dipakai di aplikasi Next.js.
// Cara jalanin: node scripts/convert-who-data.js

const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

function ambilNilai(row, kemungkinanNama) {
  for (const nama of kemungkinanNama) {
    if (row[nama] !== undefined) return row[nama];
  }
  return undefined;
}

function convert(inputFile, outputFile) {
  console.log(`\n--- Memproses ${inputFile} ---`);

  const filePath = path.join(__dirname, "..", "data", "who-raw", inputFile);
  console.log("Membaca file dari:", filePath);

  const workbook = xlsx.readFile(filePath);
  console.log("Nama sheet ditemukan:", workbook.SheetNames);

  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];
  const rows = xlsx.utils.sheet_to_json(sheet);
  console.log("Jumlah baris terbaca:", rows.length);

  if (rows.length > 0) {
    console.log("Contoh baris pertama (mentah):", rows[0]);
  }

  const cleaned = rows.map((row) => ({
    month: ambilNilai(row, ["Month", "month", "Age", "age"]),
    L: ambilNilai(row, ["L", "l"]),
    M: ambilNilai(row, ["M", "m"]),
    S: ambilNilai(row, ["S", "s"]),
  }));

  const outputPath = path.join(__dirname, "..", "lib", "who-data", outputFile);
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(outputPath, JSON.stringify(cleaned, null, 2));

  console.log(`✅ Berhasil ditulis ke lib/who-data/${outputFile}`);
}

function jalankanSemua() {
  const daftarFile = [
    ["wfa-girls.xlsx", "wfa-girls.json"],
    ["wfa-boys.xlsx", "wfa-boys.json"],
    ["bmifa-girls.xlsx", "bmifa-girls.json"],
    ["bmifa-boys.xlsx", "bmifa-boys.json"],
  ];

  for (const [input, output] of daftarFile) {
    try {
      convert(input, output);
    } catch (err) {
      console.log(`❌ GAGAL memproses ${input}`);
      console.log("Pesan error:", err.message);
      console.log("Detail lengkap:", err);
    }
  }

  console.log("\n=== Semua proses selesai ===");
}

jalankanSemua();