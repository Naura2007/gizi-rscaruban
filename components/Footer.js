export default function Footer() {
  return (
    <footer className="bg-primary-dark text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-16 py-16 grid md:grid-cols-4 gap-10">
        {/* Kolom 1: Logo & deskripsi */}
        <div>
          <p className="font-bold text-lg mb-3">Gizi_RSCaruban</p>
          <p className="text-white/70 text-sm leading-relaxed">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit
            tellus, luctus nec ullamcorper mattis, pulvinar dapibus leo.
          </p>
        </div>

        {/* Kolom 2: Main Site */}
        <div>
          <p className="font-semibold mb-4">Main Site</p>
          <ul className="space-y-2 text-white/70 text-sm">
            <li><a href="/" className="hover:text-accent">Home</a></li>
            <li><a href="/about" className="hover:text-accent">About Us</a></li>
            <li><a href="/contact" className="hover:text-accent">Contact</a></li>
          </ul>
        </div>

        {/* Kolom 3: Office Hours */}
        <div>
          <p className="font-semibold mb-4">Office Hours</p>
          <p className="text-white/70 text-sm mb-1">Mon – Fri: 7:00 am – 6:00 pm</p>
          <p className="text-white/70 text-sm">Sat–Sun: Closed</p>
        </div>

        {/* Kolom 4: Contact Info */}
        <div>
          <p className="font-semibold mb-4">Contact Info</p>
          <ul className="space-y-2 text-white/70 text-sm">
            <li>xyz street, 1234</li>
            <li>contact@abc.com</li>
            <li>123-123-1234</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-white/10 py-5 text-center text-white/50 text-xs">
        © Copyright 2026 Gizi_RSCaruban. All Rights Reserved.
      </div>
    </footer>
  );
}