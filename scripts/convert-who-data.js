// Script ini membaca file Excel (.xlsx) resmi dari WHO
// dan mengubahnya jadi file JSON yang gampang dipakai di aplikasi Next.js.
// Cara jalanin: node scripts/convert-who-data.js

const xlsx = require("xlsx");
const fs = require("fs");
const path = require("path");

function convert(inputFile, outputFile) {
  const filePath = path.join(__dirname, "..", "data", "who-raw", inputFile);
  const workbook = xlsx.readFile(filePath);

  // Ambil sheet pertama di file Excel itu
  const sheetName = workbook.SheetNames[0];
  const sheet = workbook.Sheets[sheetName];

  // Ubah jadi array of objects, contoh: [{ Month: 0, L: ..., M: ..., S: ... }, ...]
  const rows = xlsx.utils.sheet_to_json(sheet);

  // Kita rapikan biar formatnya konsisten & cuma nyimpen kolom yang kita perlu
  const cleaned = rows.map((row) => ({
    month: row.Month ?? row.month,
    L: row.L,
    M: row.M,
    S: row.S,
  }));

  const outputPath = path.join(__dirname, "..", "lib", "who-data", outputFile);

  // Pastikan folder tujuan ada
  fs.mkdirSync(path.dirname(outputPath), { recursive: true });

  fs.writeFileSync(outputPath, JSON.stringify(cleaned, null, 2));

  console.log(`✅ Berhasil: ${inputFile} -> lib/who-data/${outputFile} (${cleaned.length} baris)`);
}

convert("wfa-girls.xlsx", "wfa-girls.json");
convert("wfa-boys.xlsx", "wfa-boys.json");