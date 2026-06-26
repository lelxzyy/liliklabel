import { motion } from "motion/react";
import { CheckCircle, Award, Users, Printer } from "lucide-react";

export default function About() {
  const stats = [
    { value: "5,000+", label: "UMKM Terbantu" },
    { value: "2.5M+", label: "Label Dicetak" },
    { value: "99.8%", label: "Tingkat Kepuasan" },
    { value: "24 Jam", label: "Customer Service" },
  ];

  const benefits = [
    "Menggunakan mesin cetak berskala industri dengan resolusi HD.",
    "Bahan stiker berkualitas tinggi (tahan air, anti sobek, lem rekat kuat).",
    "Pilihan finishing terlengkap (Laminasi Glossy, Doff, Sandblast, dll).",
    "Layanan konsultasi gratis untuk rekomendasi bahan terbaik.",
  ];

  return (
    <section id="about" className="py-24 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-12 gap-16 items-center">
          {/* Left Side: Photo/Illustration Collage */}
          <div className="lg:col-span-5 relative">
            <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl -z-10" />
            
            <div className="relative">
              {/* Main Collage Image */}
              <div className="relative z-10 rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white">
                <img
                  src="https://images.unsplash.com/photo-1607344645866-009c320c5ab8?auto=format&fit=crop&w=800&q=80"
                  alt="Lilik Label - Proses Percetakan Premium"
                  className="w-full h-[450px] object-cover hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Float Card 1: Experience */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="absolute -bottom-8 -left-8 z-20 bg-blue-600 text-white p-6 rounded-2xl shadow-xl flex items-center gap-4 max-w-[240px]"
              >
                <div className="w-12 h-12 rounded-xl bg-white/20 flex items-center justify-center shrink-0">
                  <Award className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-2xl font-black">5+ Thn</h4>
                  <p className="text-xs text-blue-100 font-medium leading-tight">Pengalaman di Bidang Cetak Label</p>
                </div>
              </motion.div>

              {/* Float Card 2: Speed */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="absolute -top-6 -right-6 z-20 bg-amber-500 text-slate-900 p-5 rounded-2xl shadow-xl flex items-center gap-3"
              >
                <div className="w-10 h-10 rounded-xl bg-slate-900/10 flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-slate-900" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-slate-800">Partner Terpercaya</p>
                  <p className="text-sm font-bold">UMKM Se-Indonesia</p>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Right Side: Copywriting & Bullet points */}
          <div className="lg:col-span-7 flex flex-col space-y-8">
            <div className="space-y-4">
              <span className="text-blue-600 font-bold uppercase tracking-wider text-xs sm:text-sm">Tentang Lilik Label</span>
              <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
                Penyedia Jasa Cetak Label Custom Tepercaya untuk Bisnis Anda
              </h2>
            </div>

            <p className="text-base text-slate-600 font-medium leading-relaxed">
              Lilik Label hadir untuk memberikan solusi percetakan label kemasan dan produk dengan standar kualitas premium. Kami mengerti bahwa label bukan sekadar stiker penanda, melainkan wajah pertama dari brand Anda yang membangun kepercayaan pembeli.
            </p>
            
            <p className="text-base text-slate-600 font-medium leading-relaxed">
              Kami melayani berbagai macam kebutuhan branding produk seperti kemasan makanan & minuman, botol jar skincare, tube kosmetik, hangtag fashion, stiker segel box, hingga label pengiriman toko online dengan opsi penyesuaian bahan dan finishing terlengkap.
            </p>

            {/* Benefit Checklists */}
            <div className="grid sm:grid-cols-2 gap-4">
              {benefits.map((benefit, idx) => (
                <div key={idx} className="flex gap-3 items-start">
                  <CheckCircle className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                  <span className="text-sm text-slate-700 font-semibold">{benefit}</span>
                </div>
              ))}
            </div>

            {/* Statistics Banner */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-8 border-t border-slate-100">
              {stats.map((stat, idx) => (
                <div key={idx} className="text-center sm:text-left">
                  <p className="text-2xl sm:text-3xl font-extrabold text-blue-600">{stat.value}</p>
                  <p className="text-xs sm:text-sm text-slate-500 font-bold mt-1">{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
