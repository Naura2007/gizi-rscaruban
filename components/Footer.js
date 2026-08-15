export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 grid md:grid-cols-4 gap-10">
        {/* Kolom 1: Logo & deskripsi */}
        <div>
          <p className="font-bold text-lg mb-3">RSUD Caruban</p>
          <p className="text-white/70 text-sm leading-relaxed">
            Profesional Sepenuh Hati Bersahabat
          </p>
        </div>

        {/* Kolom 2: Main Site */}
        <div>
          <p className="font-semibold mb-4">Halaman Utama</p>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="/" className="hover:text-accent">Home</a></li>
              <li><a href="/#about" className="hover:text-accent">Tentang Kami</a></li>
              <li>
                <a  
                href="https://wa.me/0812313737897"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                Konsultasi Gizi
              </a>
            </li>
          </ul>
        </div>
          
        {/* Kolom 3: Office Hours */}
        <div>
          <p className="font-semibold mb-4">Jam Kerja</p>
          <p className="text-white/70 text-sm mb-1">Senin – Jum'at: 8:00 – 15:00 WIB</p>
          <p className="text-white/70 text-sm">Sabtu – Minggu: Tutup</p>
        </div>

        {/* Kolom 4: Contact Info */}
        <div>
          <p className="font-semibold mb-4">Informasi Kontak</p>
          <ul className="space-y-2 text-white/70 text-sm">
            <li>Jl. Ahmad Yani No. KM 2</li>
            <li>instalasigizirsudcaruban@gmail.com</li>
            <li>0812313737897</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-white/50 text-xs">
        © Copyright 2026 Gizi_RSCaruban. All Rights Reserved.
      </div>
    </footer>
  );
}