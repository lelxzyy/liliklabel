import React from "react";
import { motion } from "motion/react";
import { Printer, Percent, Palette, Zap, Package, Truck } from "lucide-react";

interface Advantage {
  icon: React.ComponentType<any>;
  title: string;
  desc: string;
  colorClass: string;
  bgColorClass: string;
}

export default function WhyChooseUs() {
  const advantages: Advantage[] = [
    {
      icon: Printer,
      title: "Cetak Berkualitas",
      desc: "Menggunakan mesin offset dan digital press berskala industri. Menghasilkan warna cetakan yang sangat tajam, presisi tinggi, dan tahan cuci untuk label pakaian.",
      colorClass: "text-blue-600",
      bgColorClass: "bg-blue-50",
    },
    {
      icon: Percent,
      title: "Harga Terjangkau",
      desc: "Kami menawarkan skema harga grosir yang sangat kompetitif. Makin banyak jumlah label pakaian Anda, biaya per label akan jauh lebih ekonomis.",
      colorClass: "text-amber-500",
      bgColorClass: "bg-amber-50",
    },
    {
      icon: Palette,
      title: "Desain Custom",
      desc: "Kebebasan penuh menyesuaikan bentuk, ukuran, dan layout label untuk brand fashion Anda, mulai dari woven hingga hangtag stylish.",
      colorClass: "text-emerald-500",
      bgColorClass: "bg-emerald-50",
    },
    {
      icon: Zap,
      title: "Proses Cepat",
      desc: "Alur produksi terintegrasi penuh membuat proses pengerjaan label pakaian Anda selesai tepat waktu tanpa mengurangi ketelitian kontrol kualitas.",
      colorClass: "text-indigo-600",
      bgColorClass: "bg-indigo-50",
    },
    {
      icon: Package,
      title: "Bisa Order Satuan",
      desc: "Sangat bersahabat untuk bisnis rintisan atau UMKM pemula yang ingin tes pasar terlebih dahulu. Mulai dengan jumlah kecil/satuan tanpa minimal order besar.",
      colorClass: "text-rose-500",
      bgColorClass: "bg-rose-50",
    },
    {
      icon: Truck,
      title: "Pengiriman Seluruh Indonesia",
      desc: "Bekerja sama erat dengan ekspedisi tepercaya nasional. Dipacking aman menggunakan bubble wrap dan kardus tebal ke seluruh kota Indonesia.",
      colorClass: "text-sky-500",
      bgColorClass: "bg-sky-50",
    },
  ];

  return (
    <section id="why-choose-us" className="py-24 bg-white relative overflow-hidden">
      {/* Decorative background shapes */}
      <div className="absolute top-1/4 right-0 w-64 h-64 bg-slate-50 rounded-full blur-2xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-blue-600 font-bold uppercase tracking-wider text-xs sm:text-sm">Keunggulan Kami</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            Mengapa UMKM Memilih Lilik Label?
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Komitmen kami adalah membantu meningkatkan nilai jual fashion brand Anda melalui label pakaian yang dikerjakan secara profesional dan berkualitas tinggi.
          </p>
        </div>

        {/* Advantages Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {advantages.map((adv, idx) => {
            const IconComponent = adv.icon;
            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, scale: 0.95 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: idx * 0.08 }}
                className="bg-slate-50/50 hover:bg-white p-8 rounded-3xl border border-slate-100/60 hover:border-slate-200/80 shadow-sm hover:shadow-xl hover:shadow-slate-100/80 flex flex-col items-start gap-6 transform hover:-translate-y-1 transition-all duration-300"
              >
                {/* Icon Container */}
                <div className={`w-14 h-14 rounded-2xl ${adv.bgColorClass} flex items-center justify-center shrink-0 shadow-sm`}>
                  <IconComponent className={`w-7 h-7 ${adv.colorClass}`} />
                </div>

                {/* Text Content */}
                <div className="space-y-3">
                  <h3 className="text-lg font-extrabold text-slate-900">
                    {adv.title}
                  </h3>
                  <p className="text-slate-500 text-sm font-semibold leading-relaxed">
                    {adv.desc}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
