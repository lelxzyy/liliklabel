import { motion } from "motion/react";
import { MessageCircle, ArrowUpRight, Sparkles } from "lucide-react";
import { CONFIG } from "../config/config";

export default function CTA() {
  return (
    <section id="contact" className="py-20 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main CTA Box */}
        <div className="relative rounded-[3rem] bg-gradient-to-br from-blue-700 via-indigo-700 to-blue-900 text-white overflow-hidden shadow-2xl px-6 py-16 sm:p-20 text-center">
          
          {/* Decorative Background Blurs */}
          <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/20 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl translate-x-1/3 translate-y-1/3" />

          {/* Floating Grid Graphic */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:24px_24px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />

          <div className="relative z-10 max-w-3xl mx-auto flex flex-col items-center space-y-8">
            {/* Sparkle Badge */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-white text-xs sm:text-sm font-bold"
            >
              <Sparkles className="w-4 h-4 text-amber-300 fill-amber-300" />
              <span>Dapatkan Konsultasi Desain & Bahan Gratis!</span>
            </motion.div>

            {/* Headline */}
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight leading-tight">
              Siap Membuat Label Pakaian Anda Terlihat Lebih Profesional?
            </h2>

            {/* Subtitle Description */}
            <p className="text-base sm:text-lg text-blue-100 max-w-2xl font-medium leading-relaxed">
              Konsultasikan kebutuhan label fashion Anda sekarang juga. Hubungi tim admin Lilik Label untuk rekomendasi bahan terbaik, kalkulasi harga custom, dan bantuan file siap jahit.
            </p>

            {/* Huge Dynamic WhatsApp CTA Button */}
            <motion.div
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.98 }}
              className="w-full sm:w-auto"
            >
              <a
                href={CONFIG.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-3 bg-white text-blue-700 hover:bg-slate-50 px-10 py-5 rounded-2xl font-black text-lg shadow-xl shadow-slate-950/20 hover:shadow-2xl hover:shadow-white/10 transition-all duration-300 w-full sm:w-auto"
              >
                <MessageCircle className="w-6 h-6 fill-blue-700" />
                Hubungi Admin Sekarang
                <ArrowUpRight className="w-5 h-5 text-blue-500 stroke-[3]" />
              </a>
            </motion.div>

            {/* Trust Badges */}
            <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 pt-4 text-xs font-bold text-blue-100">
              <p>✓ Respons Cepat Admin</p>
              <p>✓ Harga Terjangkau</p>
              <p>✓ Bergaransi Hasil Cetak</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
