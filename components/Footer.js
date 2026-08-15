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
          <p className="font-semibold mb-4">Main Site</p>
            <ul className="space-y-2 text-white/70 text-sm">
              <li><a href="/" className="hover:text-accent">Home</a></li>
              <li><a href="/cek-status-gizi" className="hover:text-accent">Cek Status Gizi</a></li>
              <li><a href="/artikel" className="hover:text-accent">Artikel</a></li>
              <li><a href="/#about" className="hover:text-accent">About Us</a></li>
              <li>
                <a  
                href="https://wa.me/6281231337897"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-accent"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
          
        {/* Kolom 3: Office Hours */}
        <div>
          <p className="font-semibold mb-4">Office Hours</p>
          <p className="text-white/70 text-sm mb-1">Mon – Fri: 8:00 am – 3:00 pm</p>
          <p className="text-white/70 text-sm">Sat–Sun: Closed</p>
        </div>

        {/* Kolom 4: Contact Info */}
        <div>
          <p className="font-semibold mb-4">Contact Info</p>
          <ul className="space-y-2 text-white/70 text-sm">
            <li>Jl. Ahmad Yani No. KM 2</li>
            <li>instalasigizirsudcaruban@gmail.com</li>
            <li>081-2313-7378-97</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-white/50 text-xs">
        © Copyright 2026 Gizi_RSCaruban. All Rights Reserved.
      </div>
    </footer>
  );
}