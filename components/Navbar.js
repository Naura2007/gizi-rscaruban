"use client";

import { useState } from "react";

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  const menuItems = [
    { label: "Home", href: "/" },
    { label: "About Us", href: "/#about" },
    { label: "Cek Status Gizi", href: "/cek-status-gizi" },
    { label: "Artikel", href: "/artikel" },
    { label: "Leaflet", href: "/leaflet" },
  ];

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2 md:gap-3 min-w-0">
          <img src="/images/logo-rsud.png" alt="Logo RSUD Caruban" className="h-9 md:h-12 shrink-0" />
          <img src="/images/logo-madiun.png" alt="Logo Kabupaten Madiun" className="h-9 md:h-12 shrink-0" />
          <div className="min-w-0">
            <p className="font-bold text-primary text-sm md:text-lg leading-tight truncate">
              Gizi_RSCaruban
            </p>
            <p className="text-[10px] md:text-xs text-gray-500 truncate">Caring for Your Health</p>
          </div>
        </div>

        {/* Menu - desktop */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          {menuItems.map((item) => (
            <a key={item.label} href={item.href} className="hover:text-primary">
              {item.label}
            </a>
          ))}
        </div>

        <div className="flex items-center gap-2 shrink-0">
          {/* WhatsApp - teks lengkap di desktop, ikon saja di mobile */}
          <a
            href="https://wa.me/6281231337897"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary text-white p-2.5 md:px-4 md:py-2 rounded-full md:rounded-lg text-sm font-medium hover:bg-primary-dark flex items-center gap-2"
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21h.01c5.46 0 9.9-4.45 9.9-9.92 0-2.65-1.03-5.14-2.9-7.01A9.87 9.87 0 0 0 12.04 2zm5.8 14.1c-.24.68-1.4 1.3-1.93 1.38-.5.08-1.11.11-1.79-.11-.41-.13-.94-.31-1.62-.6-2.85-1.23-4.71-4.1-4.85-4.29-.14-.19-1.16-1.54-1.16-2.94s.73-2.09.99-2.37c.26-.29.57-.36.76-.36s.38 0 .55.01c.18.01.41-.07.64.49.24.57.81 1.98.88 2.12.07.15.12.32.02.51-.1.19-.15.31-.29.48-.15.17-.31.38-.44.51-.15.15-.3.31-.13.6.17.29.75 1.24 1.62 2.01 1.11.99 2.05 1.3 2.34 1.44.29.15.46.13.63-.08.17-.21.72-.84.91-1.13.19-.29.38-.24.64-.14.26.1 1.66.78 1.94.93.28.14.47.21.53.33.07.13.07.72-.17 1.4z" />
            </svg>
            <span className="hidden md:inline">WhatsApp: 0812-3133-7897</span>
          </a>

          {/* Tombol hamburger - mobile saja */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-gray-700"
            aria-label="Buka menu"
          >
            {menuOpen ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M18 6L6 18M6 6l12 12" strokeLinecap="round" />
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M3 6h18M3 12h18M3 18h18" strokeLinecap="round" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Menu dropdown - mobile saja, muncul kalau menuOpen true */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
          {menuItems.map((item) => (
            <a
              key={item.label}
              href={item.href}
              onClick={() => setMenuOpen(false)}
              className="py-2.5 text-sm font-medium text-gray-700 hover:text-primary border-b border-gray-50 last:border-b-0"
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}