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
      id: "woven",
      name: "Label Woven",
      desc: "Label rajut berkualitas tinggi untuk pakaian dan fashion brand, tahan cuci, tidak mudah luntur, ideal untuk merk, ukuran, dan care label.",
      image: "https://images.unsplash.com/photo-1520975869014-35fd2fb2da3d?auto=format&fit=crop&w=600&q=80",
      price: "Rp 350 /pcs",
      features: ["Tahan Cuci & Tidak Mudah Luntur", "Tekstur Premium Woven", "Cocok untuk Pakaian & Aksesori", "Hasil Label Brand Profesional"],
      waMessage: "Halo Lilik Label, saya tertarik memesan *Label Woven* untuk produk pakaian saya. Mohon informasi harga dan cara order.",
    },
    {
      id: "printing",
      name: "Label Printing",
      desc: "Label kain printing warna penuh dengan detail tajam, sangat cocok untuk label brand, instruksi perawatan, dan label ukuran pada pakaian.",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
      price: "Rp 280 /pcs",
      features: ["Cetak Warna Penuh Berkualitas", "Permukaan Lembut untuk Kain", "Ideal untuk Care Label & Brand", "Detail Tajam pada Ukuran Kecil"],
      waMessage: "Halo Lilik Label, saya tertarik memesan *Label Printing* untuk produk pakaian saya. Mohon informasi harga dan cara order.",
    },
    {
      id: "komputer",
      name: "Label Komputer",
      desc: "Label komputer presisi untuk pakaian dan seragam, mudah dicetak dalam jumlah banyak dengan hasil logo, nama, dan ukuran yang konsisten.",
      image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=600&q=80",
      price: "Rp 220 /pcs",
      features: ["Hasil Cetak Presisi Komputer", "Cocok untuk Seragam & Pakaian", "Daya Rekat Kuat & Tahan Panas", "Ideal untuk Produksi Massal"],
      waMessage: "Halo Lilik Label, saya tertarik memesan *Label Komputer* untuk produk pakaian saya. Mohon informasi harga dan cara order.",
    },
    {
      id: "satin",
      name: "Label Satin",
      desc: "Label satin halus dengan tampilan mewah untuk pakaian premium, dress, dan koleksi fashion yang membutuhkan finishing elegan.",
      image: "https://images.unsplash.com/photo-1525186402429-2a1d3f476b06?auto=format&fit=crop&w=600&q=80",
      price: "Rp 300 /pcs",
      features: ["Permukaan Satin Halus & Mewah", "Nyaman di Kontak Kulit", "Cocok untuk Pakaian Premium", "Cetak Logo & Instruksi Perawatan"],
      waMessage: "Halo Lilik Label, saya tertarik memesan *Label Satin* untuk produk pakaian saya. Mohon informasi harga dan cara order.",
    },
    {
      id: "rubber",
      name: "Label Rubber",
      desc: "Label rubber timbul yang kuat untuk pakaian olahraga, streetwear, dan jaket yang membutuhkan detail akhir modern dan tahan lama.",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80",
      price: "Rp 280 /pcs",
      features: ["Tahan Aus & Elastis", "Desain Timbul Modern", "Cocok untuk Hoodie & Jaket", "Tahan Cuci Mesin"],
      waMessage: "Halo Lilik Label, saya tertarik memesan *Label Rubber* untuk produk pakaian saya. Mohon informasi harga dan cara order.",
    },
    {
      id: "tag",
      name: "Label Tag Gantung",
      desc: "Label gantung custom untuk pakaian dan aksesori, membantu memperkuat brand dengan desain premium dan material tebal.",
      image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=600&q=80",
      price: "Rp 180 /pcs",
      features: ["Custom Desain Brand & Harga", "Bahan Tebal & Tahan Rusak", "Cocok untuk Tag Pakaian & Aksesori", "Finishing Matte/Mengkilap"],
      waMessage: "Halo Lilik Label, saya tertarik memesan *Label Tag Gantung* untuk produk pakaian saya. Mohon informasi harga dan cara order.",
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
