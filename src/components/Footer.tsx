import React from "react";
import { Printer, Mail, Phone, MapPin, Instagram, MessageCircle, ArrowUp } from "lucide-react";
import { CONFIG } from "../config/config";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const handleNavClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const target = document.querySelector(href);
    if (target) {
      const offsetTop = (target as HTMLElement).offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <footer className="bg-slate-900 text-slate-400 pt-20 pb-10 border-t border-slate-800 relative">
      {/* Scroll to Top Trigger */}
      <button
        onClick={handleScrollToTop}
        className="absolute top-0 right-10 -translate-y-1/2 w-12 h-12 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white flex items-center justify-center shadow-lg transform hover:-translate-y-1 active:scale-95 transition-all duration-300 cursor-pointer"
        aria-label="Scroll to top"
      >
        <ArrowUp className="w-5 h-5 stroke-[2.5]" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-slate-800">
          
          {/* Column 1: Brand & About */}
          <div className="lg:col-span-4 space-y-6">
            <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="flex items-center gap-2.5">
              <div className="bg-blue-600 text-white p-2.5 rounded-xl">
                <Printer className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white">
                Lilik<span className="text-blue-500">Label</span>
              </span>
            </a>
            <p className="text-sm text-slate-400 font-medium leading-relaxed">
              Penyedia jasa percetakan label custom premium terpercaya di Indonesia. Kami membantu menaikkan level kemasan produk UMKM, makanan, minuman, kosmetik, skincare, dan brand retail melalui cetakan stiker presisi tinggi.
            </p>
            {/* Social Icons */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-gradient-to-tr hover:from-amber-500 hover:to-purple-600 hover:text-white text-slate-400 flex items-center justify-center transition-all duration-300 shadow-sm"
                aria-label="Follow our Instagram"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href={CONFIG.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-emerald-600 hover:text-white text-slate-400 flex items-center justify-center transition-all duration-300 shadow-sm"
                aria-label="Contact our WhatsApp"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-3 lg:col-start-6 space-y-6">
            <h3 className="text-white font-extrabold text-sm uppercase tracking-wider">Navigasi Halaman</h3>
            <ul className="grid grid-cols-2 gap-y-3.5 gap-x-4 text-sm font-semibold">
              <li>
                <a href="#hero" onClick={(e) => handleNavClick(e, "#hero")} className="hover:text-blue-500 transition-colors duration-200">
                  Beranda
                </a>
              </li>
              <li>
                <a href="#about" onClick={(e) => handleNavClick(e, "#about")} className="hover:text-blue-500 transition-colors duration-200">
                  Tentang
                </a>
              </li>
              <li>
                <a href="#products" onClick={(e) => handleNavClick(e, "#products")} className="hover:text-blue-500 transition-colors duration-200">
                  Produk
                </a>
              </li>
              <li>
                <a href="#why-choose-us" onClick={(e) => handleNavClick(e, "#why-choose-us")} className="hover:text-blue-500 transition-colors duration-200">
                  Keunggulan
                </a>
              </li>
              <li>
                <a href="#gallery" onClick={(e) => handleNavClick(e, "#gallery")} className="hover:text-blue-500 transition-colors duration-200">
                  Galeri
                </a>
              </li>
              <li>
                <a href="#testimonials" onClick={(e) => handleNavClick(e, "#testimonials")} className="hover:text-blue-500 transition-colors duration-200">
                  Testimoni
                </a>
              </li>
              <li>
                <a href="#faq" onClick={(e) => handleNavClick(e, "#faq")} className="hover:text-blue-500 transition-colors duration-200">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#contact" onClick={(e) => handleNavClick(e, "#contact")} className="hover:text-blue-500 transition-colors duration-200">
                  Kontak
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Contact Info */}
          <div className="lg:col-span-4 space-y-6">
            <h3 className="text-white font-extrabold text-sm uppercase tracking-wider">Hubungi Kami</h3>
            <ul className="space-y-4 text-sm font-semibold">
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{CONFIG.contactAddress}</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-blue-500 shrink-0" />
                <a href={CONFIG.whatsapp} target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 transition-colors duration-200">
                  {CONFIG.contactPhone}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-blue-500 shrink-0" />
                <a href={`mailto:${CONFIG.contactEmail}`} className="hover:text-blue-500 transition-colors duration-200">
                  {CONFIG.contactEmail}
                </a>
              </li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Terms */}
        <div className="pt-10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-bold uppercase tracking-wider">
          <p>© {currentYear} {CONFIG.brandName}. Hak Cipta Dilindungi.</p>
          <div className="flex items-center gap-6">
            <a href="#about" onClick={(e) => handleNavClick(e, "#about")} className="hover:text-white transition-colors duration-200">Kebijakan Privasi</a>
            <a href="#faq" onClick={(e) => handleNavClick(e, "#faq")} className="hover:text-white transition-colors duration-200">Ketentuan Layanan</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
