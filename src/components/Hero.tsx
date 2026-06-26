import React from "react";
import { motion } from "motion/react";
import { MessageCircle, ArrowRight, ShieldCheck, Zap, Sparkles } from "lucide-react";
import { CONFIG } from "../config/config";

export default function Hero() {
  const handleScrollToProducts = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    const target = document.querySelector("#products");
    if (target) {
      const offsetTop = (target as HTMLElement).offsetTop - 80;
      window.scrollTo({
        top: offsetTop,
        behavior: "smooth",
      });
    }
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden bg-gradient-to-b from-blue-50/40 via-slate-50 to-white"
    >
      {/* Abstract Blur Background Elements */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400/10 rounded-full blur-3xl -z-10 animate-pulse duration-5000" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-amber-400/10 rounded-full blur-3xl -z-10 animate-pulse duration-3000" />
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-emerald-400/10 rounded-full blur-3xl -z-10 animate-pulse duration-4000" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative w-full">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Hero Text */}
          <div className="lg:col-span-7 flex flex-col space-y-8 text-center lg:text-left">
            {/* Promo Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 text-xs sm:text-sm font-semibold mx-auto lg:mx-0 self-center lg:self-start shadow-sm"
            >
              <Sparkles className="w-4 h-4 text-amber-500" />
              <span>Percetakan Label Custom</span>
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.15 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-tight"
            >
              Buat Label Produk yang{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-800">
                Menarik & Berkualitas
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-lg text-slate-600 max-w-2xl mx-auto lg:mx-0 font-medium leading-relaxed"
            >
              Kami membantu UMKM dan berbagai bisnis menciptakan label produk
              berkualitas tinggi dengan desain menarik, hasil cetak tajam, dan
              harga terjangkau.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.45 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <a
                href={CONFIG.whatsapp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-extrabold text-base shadow-lg shadow-blue-600/20 hover:shadow-xl hover:shadow-blue-600/30 transform hover:-translate-y-0.5 transition-all duration-300"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                Pesan via WhatsApp
              </a>
              <button
                onClick={handleScrollToProducts}
                className="inline-flex items-center justify-center gap-2 bg-white hover:bg-slate-50 text-slate-800 border border-slate-200 hover:border-slate-300 px-8 py-4 rounded-2xl font-extrabold text-base shadow-sm transform hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
              >
                Lihat Produk
                <ArrowRight className="w-5 h-5 text-slate-500" />
              </button>
            </motion.div>

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="pt-6 border-t border-slate-100 flex flex-wrap gap-y-3 gap-x-6 justify-center lg:justify-start text-xs sm:text-sm font-semibold text-slate-500"
            >
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span>Hasil Cetak Tajam & Awet</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-5 h-5 text-amber-500" />
                <span>Pengerjaan Cepat</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-5 h-5 text-blue-500" />
                <span>Bisa Pesan Satuan</span>
              </div>
            </motion.div>
          </div>

          {/* Hero Visuals / Mockup */}
          <div className="lg:col-span-5 relative flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="relative w-full max-w-[450px]"
            >
              {/* Decorative Frame */}
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-100 to-amber-100 rounded-[2.5rem] blur-2xl opacity-70 -z-10" />

              {/* Main Mockup Image */}
              <div className="bg-white p-3 rounded-[2rem] shadow-2xl border border-slate-100/50 overflow-hidden transform hover:scale-[1.02] transition-transform duration-500">
                <img
                  src="https://i.pinimg.com/736x/c1/a8/60/c1a86097dc0dfcf65ddd5d2a9a95408a.jpg"
                  alt="Custom Product Label Premium Mockup Lilik Label"
                  className="rounded-[1.5rem] w-full h-auto object-cover"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Floating Badge 1 - Top Left */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 4,
                  ease: "easeInOut",
                }}
                className="absolute -top-4 -left-6 bg-white/95 backdrop-blur shadow-lg border border-slate-100 p-4 rounded-2xl flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">
                    Bahan Premium
                  </p>
                  <p className="text-sm font-extrabold text-slate-800">
                    100% Vinyl & Waterproof
                  </p>
                </div>
              </motion.div>

              {/* Floating Badge 2 - Bottom Right */}
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 3.5,
                  ease: "easeInOut",
                  delay: 0.5,
                }}
                className="absolute -bottom-6 -right-4 bg-slate-900/95 backdrop-blur shadow-xl p-4 rounded-2xl flex items-center gap-3 text-white"
              >
                <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-xs text-slate-400 font-medium">
                    Gratis Jasa
                  </p>
                  <p className="text-sm font-extrabold">
                    Potong Pola (Die Cut)
                  </p>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
