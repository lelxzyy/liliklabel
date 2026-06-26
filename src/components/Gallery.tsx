import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Eye, X, MessageCircle, Filter } from "lucide-react";
import { CONFIG } from "../config/config";

interface GalleryItem {
  id: number;
  title: string;
  category: "fashion" | "seragam" | "hangtag" | "custom";
  categoryLabel: string;
  image: string;
  size: string; // Used to simulate masonry layout
}

export default function Gallery() {
  const [selectedItem, setSelectedItem] = useState<GalleryItem | null>(null);
  const [activeFilter, setActiveFilter] = useState<string>("semua");

  const galleryItems: GalleryItem[] = [
    {
      id: 1,
      title: "Label Woven Brand Jaket",
      category: "fashion",
      categoryLabel: "Fashion",
      image: "https://images.unsplash.com/photo-1520975869014-35fd2fb2da3d?auto=format&fit=crop&w=800&q=80",
      size: "row-span-2",
    },
    {
      id: 2,
      title: "Label Printing Tag T-Shirt",
      category: "hangtag",
      categoryLabel: "Hangtag & Care",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
      size: "row-span-1",
    },
    {
      id: 3,
      title: "Label Komputer Ukuran Seragam",
      category: "seragam",
      categoryLabel: "Seragam",
      image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80",
      size: "row-span-1",
    },
    {
      id: 4,
      title: "Hangtag Fashion Premium",
      category: "hangtag",
      categoryLabel: "Hangtag & Care",
      image: "https://images.unsplash.com/photo-1503341455253-b2e723bb3dbb?auto=format&fit=crop&w=800&q=80",
      size: "row-span-2",
    },
    {
      id: 5,
      title: "Label Satin Dress Mewah",
      category: "fashion",
      categoryLabel: "Fashion",
      image: "https://images.unsplash.com/photo-1512099042905-0f2f7fc8cb96?auto=format&fit=crop&w=800&q=80",
      size: "row-span-1",
    },
    {
      id: 6,
      title: "Label Komputer Pakaian Anak",
      category: "custom",
      categoryLabel: "Custom",
      image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=800&q=80",
      size: "row-span-1",
    },
    {
      id: 7,
      title: "Label Rubber Streetwear",
      category: "fashion",
      categoryLabel: "Fashion",
      image: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?auto=format&fit=crop&w=800&q=80",
      size: "row-span-1",
    },
    {
      id: 8,
      title: "Label Seragam Sekolah Custom",
      category: "seragam",
      categoryLabel: "Seragam",
      image: "https://images.unsplash.com/photo-1491553895911-0055eca6402d?auto=format&fit=crop&w=800&q=80",
      size: "row-span-1",
    },
  ];

  const filters = [
    { value: "semua", label: "Semua Label Pakaian" },
    { value: "fashion", label: "Fashion" },
    { value: "seragam", label: "Seragam" },
    { value: "hangtag", label: "Hangtag & Care" },
    { value: "custom", label: "Custom Label" },
  ];

  const filteredItems = activeFilter === "semua"
    ? galleryItems
    : galleryItems.filter((item) => item.category === activeFilter);

  const getWaLinkForGallery = (title: string) => {
    const baseWa = CONFIG.whatsapp.split("?")[0];
    const text = `Halo Lilik Label, saya tertarik memesan label pakaian custom seperti di portofolio *"${title}"*. Boleh konsultasi lebih lanjut?`;
    return `${baseWa}?text=${encodeURIComponent(text)}`;
  };

  return (
    <section id="gallery" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 space-y-4">
          <span className="text-blue-600 font-bold uppercase tracking-wider text-xs sm:text-sm">Galeri Hasil Cetak</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            Inspirasi Hasil Cetak Label Pakaian & Fashion
          </h2>
          <p className="text-base sm:text-lg text-slate-600 font-medium leading-relaxed">
            Mulai dari label woven jacket, hangtag premium, care label, hingga label komputer seragam. Temukan inspirasi untuk memperkuat brand fashion Anda.
          </p>
        </div>

        {/* Categories Tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filters.map((filter) => (
            <button
              key={filter.value}
              onClick={() => setActiveFilter(filter.value)}
              className={`px-5 py-2.5 rounded-xl text-sm font-bold transition-all duration-300 flex items-center gap-1.5 cursor-pointer ${
                activeFilter === filter.value
                  ? "bg-blue-600 text-white shadow-md shadow-blue-600/15"
                  : "bg-white hover:bg-slate-100 text-slate-600 border border-slate-200/60"
              }`}
            >
              {filter.value === "semua" && <Filter className="w-3.5 h-3.5" />}
              {filter.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid Container */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[220px] gap-6">
          <AnimatePresence mode="popLayout">
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4 }}
                onClick={() => setSelectedItem(item)}
                className={`group relative overflow-hidden rounded-3xl bg-white border border-slate-100/80 shadow-sm hover:shadow-xl cursor-pointer ${item.size}`}
              >
                {/* Thumbnail Image */}
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                />

                {/* Dark Overlay on Hover */}
                <div className="absolute inset-0 bg-slate-950/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-6" />

                {/* Info Text Overlay on Hover */}
                <div className="absolute inset-x-0 bottom-0 p-6 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 flex items-end justify-between z-10 text-white">
                  <div className="space-y-1 pr-4">
                    <span className="text-[10px] font-extrabold uppercase tracking-widest bg-blue-600 text-white px-2 py-0.5 rounded-full">
                      {item.categoryLabel}
                    </span>
                    <h4 className="text-sm font-bold line-clamp-1">{item.title}</h4>
                  </div>
                  <div className="w-9 h-9 rounded-xl bg-white/25 backdrop-blur-md flex items-center justify-center shrink-0 shadow-lg text-white">
                    <Eye className="w-4 h-4" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Lightbox / Preview Modal */}
        <AnimatePresence>
          {selectedItem && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-slate-900/85 backdrop-blur-md z-50 flex items-center justify-center p-4 sm:p-6"
              onClick={() => setSelectedItem(null)}
            >
              {/* Modal Card */}
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                transition={{ type: "spring", damping: 25, stiffness: 350 }}
                className="bg-white rounded-3xl shadow-2xl overflow-hidden max-w-4xl w-full grid md:grid-cols-2 border border-slate-100"
                onClick={(e) => e.stopPropagation()} // Prevent close when clicking inside card
              >
                {/* Left Side: Large Image */}
                <div className="relative h-72 md:h-[450px]">
                  <img
                    src={selectedItem.image}
                    alt={selectedItem.title}
                    className="w-full h-full object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <span className="absolute top-4 left-4 text-xs font-extrabold uppercase tracking-widest bg-blue-600 text-white px-3 py-1 rounded-full shadow-md">
                    {selectedItem.categoryLabel}
                  </span>
                </div>

                {/* Right Side: Description & CTAs */}
                <div className="p-8 flex flex-col justify-between">
                  <div className="space-y-6">
                    {/* Header */}
                    <div className="flex items-start justify-between">
                      <h3 className="text-2xl font-extrabold text-slate-900 leading-tight">
                        {selectedItem.title}
                      </h3>
                      <button
                        onClick={() => setSelectedItem(null)}
                        className="p-1.5 rounded-xl hover:bg-slate-100 text-slate-400 hover:text-slate-600 transition-colors duration-200 cursor-pointer"
                        aria-label="Close"
                      >
                        <X className="w-6 h-6" />
                      </button>
                    </div>

                    <p className="text-slate-600 text-sm font-medium leading-relaxed">
                      Portofolio asli produksi *Lilik Label*. Kami menggunakan sistem kontrol cetak modern untuk menghasilkan label pakaian dengan warna tajam, tekstur rapi, dan daya tahan jahit terbaik.
                    </p>

                    {/* Features checklist */}
                    <div className="bg-slate-50 p-4 rounded-2xl space-y-2 text-xs font-bold text-slate-600 border border-slate-100">
                      <p className="text-slate-400 uppercase tracking-wider text-[10px]">Detail Spesifikasi</p>
                      <p>✓ Bahan: Label kain premium untuk apparel dan hangtag</p>
                      <p>✓ Pemotongan: Presisi jahit dan pola custom sesuai brand</p>
                      <p>✓ Cetak: High-definition warna penuh untuk label fashion</p>
                    </div>
                  </div>

                  {/* CTA Buttons */}
                  <div className="mt-8 pt-6 border-t border-slate-100 flex flex-col sm:flex-row gap-3">
                    <a
                      href={getWaLinkForGallery(selectedItem.title)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 rounded-2xl font-extrabold text-sm shadow-md hover:shadow-lg transform active:scale-[0.98] transition-all duration-200 flex-1"
                    >
                      <MessageCircle className="w-4 h-4 fill-current" />
                      Tanyakan Model Ini
                    </a>
                    <button
                      onClick={() => setSelectedItem(null)}
                      className="inline-flex items-center justify-center bg-slate-100 hover:bg-slate-200 text-slate-600 px-6 py-3.5 rounded-2xl font-bold text-sm transform active:scale-[0.98] transition-all duration-200 cursor-pointer"
                    >
                      Kembali ke Galeri
                    </button>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
