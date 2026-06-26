import { motion } from "motion/react";
import { ShoppingCart, Check, Tag } from "lucide-react";
import { CONFIG } from "../config/config";

interface Product {
  id: string;
  name: string;
  desc: string;
  image: string;
  price: string;
  features: string[];
  waMessage: string;
}

export default function Products() {
  const products: Product[] = [
    {
      id: "vinyl",
      name: "Label Vinyl Premium",
      desc: "Stiker berbahan plastik lentur yang sangat kuat, 100% tahan air (waterproof), tahan sobek, dan tidak luntur. Sangat ideal untuk outdoor maupun indoor.",
      image: "https://images.unsplash.com/photo-1595152772835-219674b2a8a6?auto=format&fit=crop&w=600&q=80",
      price: "Rp 250 /pcs",
      features: ["Anti Air (Waterproof)", "Lentur & Tidak Mudah Sobek", "Finishing Glossy/Doff", "Cocok untuk Skincare & Frozen Food"],
      waMessage: "Halo Lilik Label, saya tertarik memesan *Label Vinyl Premium* untuk produk saya. Mohon informasi harga dan cara order.",
    },
    {
      id: "hvs",
      name: "Label Stiker HVS",
      desc: "Stiker kertas dengan permukaan matte (tidak mengkilap) yang bertekstur alami. Sangat mudah ditulis menggunakan pulpen atau pensil biasa.",
      image: "https://images.unsplash.com/photo-1586075010923-2dd4570fb338?auto=format&fit=crop&w=600&q=80",
      price: "Rp 120 /pcs",
      features: ["Permukaan Matte / Buram", "Bisa Ditulis Pulpen/Pensil", "Ekonomis & Ramah Lingkungan", "Cocok untuk Label Pengiriman & Barcode"],
      waMessage: "Halo Lilik Label, saya tertarik memesan *Label Stiker HVS* untuk produk saya. Mohon informasi harga dan cara order.",
    },
    {
      id: "transparan",
      name: "Label Transparan",
      desc: "Stiker bening transparan yang memberikan efek 'no-label-look'. Membuat produk di dalam botol kaca atau plastik tetap terlihat bersih dan mewah.",
      image: "https://images.unsplash.com/photo-1626806787461-102c1bfaaea1?auto=format&fit=crop&w=600&q=80",
      price: "Rp 280 /pcs",
      features: ["100% Bening & Tembus Pandang", "Waterproof & Tahan Gores", "Memberikan Efek Mewah / Elegan", "Cocok untuk Botol Parfum & Jar Kaca"],
      waMessage: "Halo Lilik Label, saya tertarik memesan *Label Transparan* untuk produk saya. Mohon informasi harga dan cara order.",
    },
    {
      id: "chromo",
      name: "Label Stiker Chromo",
      desc: "Stiker kertas dengan permukaan semi-glossy yang mengkilap. Memiliki daya rekat sangat tinggi dan hasil cetak warna yang tajam serta hidup.",
      image: "https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=600&q=80",
      price: "Rp 150 /pcs",
      features: ["Permukaan Mengkilap (Semi-Glossy)", "Daya Rekat Sangat Kuat", "Harga Sangat Ekonomis", "Cocok untuk Label Snack & Kemasan Kering"],
      waMessage: "Halo Lilik Label, saya tertarik memesan *Label Stiker Chromo* untuk produk saya. Mohon informasi harga dan cara order.",
    },
    {
      id: "kemasan",
      name: "Label Segel Kemasan",
      desc: "Stiker khusus penutup/segel box kemasan (packaging sleeve) untuk menjamin keaslian dan keamanan produk Anda dari produsen sampai ke pelanggan.",
      image: "https://images.unsplash.com/photo-1589365278144-c9e705f843ba?auto=format&fit=crop&w=600&q=80",
      price: "Rp 350 /pcs",
      features: ["Bentuk Custom (Sleeve/Segel)", "Menjamin Keamanan Produk", "Meningkatkan Unboxing Experience", "Cocok untuk Dus Hijab, Kue & Pizza Box"],
      waMessage: "Halo Lilik Label, saya tertarik memesan *Label Segel Kemasan* untuk produk saya. Mohon informasi harga dan cara order.",
    },
    {
      id: "botol",
      name: "Label Botol & Jar",
      desc: "Label dengan ukuran presisi yang disesuaikan khusus untuk botol minuman, jar madu, bumbu dapur, kopi literan, atau botol herbal.",
      image: "https://images.unsplash.com/photo-1556229174-5e42a09e45af?auto=format&fit=crop&w=600&q=80",
      price: "Rp 230 /pcs",
      features: ["Ukuran Presisi Sesuai Diameter Botol", "Bahan Tahan Dingin & Lembab", "Hasil Cetak Gradasi Sangat Halus", "Cocok untuk Kopi Literan, Madu & Juice"],
      waMessage: "Halo Lilik Label, saya tertarik memesan *Label Botol & Jar* untuk produk saya. Mohon informasi harga dan cara order.",
    },
  ];

  const getWaLink = (message: string) => {
    // Extract base WA Link without query params to append custom message
    const baseWa = CONFIG.whatsapp.split("?")[0];
    return `${baseWa}?text=${encodeURIComponent(message)}`;
  };

  return (
    <section id="products" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-blue-600 font-bold uppercase tracking-wider text-xs sm:text-sm">Katalog Produk</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            Pilihan Bahan Terbaik Untuk Label Produk Anda
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Sesuaikan jenis bahan stiker dengan kebutuhan karakteristik produk Anda. Setiap bahan dicetak dengan resolusi tinggi demi penampilan branding yang maksimal.
          </p>
        </div>

        {/* Product Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-3xl shadow-md hover:shadow-xl hover:shadow-slate-100 overflow-hidden border border-slate-100/60 flex flex-col group h-full transform hover:-translate-y-1.5 transition-all duration-300"
            >
              {/* Image Container with Hover Effect */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Floating Price Tag */}
                <div className="absolute bottom-4 left-4 bg-white/95 backdrop-blur px-3 py-1.5 rounded-xl flex items-center gap-1.5 shadow-md">
                  <Tag className="w-3.5 h-3.5 text-amber-500 fill-current" />
                  <span className="text-xs font-extrabold text-slate-800">{product.price}</span>
                </div>
              </div>

              {/* Card Body */}
              <div className="p-6 sm:p-8 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors duration-200">
                    {product.name}
                  </h3>
                  <p className="text-slate-500 text-sm font-semibold mt-3 leading-relaxed">
                    {product.desc}
                  </p>

                  {/* Bullet Features Checklist */}
                  <div className="mt-6 space-y-2.5">
                    {product.features.map((feature, fIdx) => (
                      <div key={fIdx} className="flex items-center gap-2.5 text-xs text-slate-700 font-bold">
                        <div className="w-4 h-4 rounded-full bg-emerald-50 flex items-center justify-center shrink-0">
                          <Check className="w-3.5 h-3.5 text-emerald-500 stroke-[3]" />
                        </div>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA Action */}
                <div className="mt-8 pt-6 border-t border-slate-100">
                  <a
                    href={getWaLink(product.waMessage)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white w-full py-3.5 rounded-2xl font-extrabold shadow-sm hover:shadow-md hover:shadow-blue-600/10 transform active:scale-[0.98] transition-all duration-200 text-sm"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    Pesan {product.name.replace("Label ", "")}
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
