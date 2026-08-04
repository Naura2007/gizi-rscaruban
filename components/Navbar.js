export default function Navbar() {
  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-3 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <img src="/images/logo-rsud.png" alt="Logo RSUD Caruban" className="h-12" />
          <img src="/images/logo-madiun.png" alt="Logo Kabupaten Madiun" className="h-12" />
          <div>
            <p className="font-bold text-primary text-lg leading-tight">Gizi_RSCaruban</p>
            <p className="text-xs text-gray-500">Caring for Your Health</p>
          </div>
        </div>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-700">
          <a href="/" className="hover:text-primary">Home</a>
          <a href="/#about" className="hover:text-primary">About Us</a>
          <a href="/cek-status-gizi" className="hover:text-primary">Cek Status Gizi</a>
          <a href="/artikel" className="hover:text-primary">Artikel</a>
          <a href="/leaflet" className="hover:text-primary">Leaflet</a>
        </div>

        {/* Telepon */}
        
        <a 
        href="https://wa.me/6282313737897"
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block bg-accent hover:bg-accent-dark text-white font-semibold py-3 px-6 rounded-lg transition-colors duration-300"
      >
        
          WhatsApp: 081-2313-7378-97
        </a>
      </div>
    </nav>
  );
}