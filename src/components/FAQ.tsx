import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FAQItem {
  id: number;
  question: string;
  answer: string;
}

export default function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1); // Default first FAQ open

  const faqs: FAQItem[] = [
    {
      id: 1,
      question: "Berapa minimal order (MOQ) untuk cetak stiker label?",
      answer: "Lilik Label berkomitmen penuh mendukung pertumbuhan UMKM. Oleh karena itu, kami melayani pesanan yang sangat fleksibel tanpa minimal order besar (bisa order satuan atau dalam lembaran A3+). Tentu saja, untuk pemesanan dalam jumlah grosir besar, Anda akan mendapatkan potongan harga per keping stiker yang jauh lebih hemat.",
    },
    {
      id: 2,
      question: "Apa perbedaan mendasar antara bahan stiker Vinyl dan Chromo?",
      answer: "Perbedaan utamanya terletak pada bahan dasarnya. Stiker Vinyl terbuat dari plastik PVC tipis sehingga 100% tahan air (waterproof), tahan minyak, elastis, anti sobek, cocok untuk produk dingin/basah seperti frozen food, jus, salad, jar skincare, dan botol kosmetik. Sementara stiker Chromo berbahan dasar kertas glossy yang tebal dan ekonomis, sangat cocok untuk label makanan kering, stiker hampers, box kemasan, atau stiker pengiriman.",
    },
    {
      id: 3,
      question: "Format file desain seperti apa yang direkomendasikan?",
      answer: "Untuk memastikan hasil cetakan stiker Anda sangat tajam, detail huruf terbaca jelas, dan warna tidak blur, kami sangat menyarankan file format vektor seperti PDF, Adobe Illustrator (.ai), CorelDraw (.cdr), atau SVG. Namun jangan khawatir, kami juga tetap menerima file gambar resolusi tinggi format PNG (transparan) atau JPEG dengan kerapatan piksel minimal 300 DPI.",
    },
    {
      id: 4,
      question: "Berapa lama proses pengerjaan stiker hingga siap dikirim?",
      answer: "Proses produksi standar kami berkisar antara 2 sampai 4 hari kerja setelah pembayaran divalidasi dan file desain disetujui untuk dicetak (sudah fix ukuran dan garis potongnya). Kecepatan cetak juga dipengaruhi oleh antrean produksi serta kerumitan jenis potongan stiker Anda (Die Cut / Kiss Cut).",
    },
    {
      id: 5,
      question: "Apakah saya bisa dibantu membuat garis potong (cutline) pola custom?",
      answer: "Tentu saja! Tim desainer profesional Lilik Label siap membantu Anda merancang atau merapikan garis potong (cutline) stiker secara gratis sesuai pola logo produk Anda, baik itu bentuk bulat, persegi, oval, maupun mengikuti kontur lekukan logo yang unik (die-cut custom).",
    },
    {
      id: 6,
      question: "Apakah bisa kirim ke luar kota/pulau, dan bagaimana keamanannya?",
      answer: "Kami melayani pengiriman stiker label ke seluruh wilayah kota dan kabupaten di Indonesia. Untuk menjaga lembaran stiker Anda tetap lurus, tidak terlipat, dan aman dari kelembaban selama perjalanan ekspedisi, kami mengemasnya secara khusus menggunakan lapisan plastik OPP tebal, bubble wrap berlapis, serta amplop kardus kokoh.",
    },
  ];

  return (
    <section id="faq" className="py-24 bg-slate-50 relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-blue-600 font-bold uppercase tracking-wider text-xs sm:text-sm">Tanya Jawab</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            Pertanyaan yang Sering Diajukan (FAQ)
          </h2>
          <p className="text-base text-slate-600 font-medium">
            Temukan jawaban cepat atas pertanyaan mendasar mengenai proses desain, bahan stiker, produksi, hingga mekanisme pengiriman paket Anda.
          </p>
        </div>

        {/* Accordions List */}
        <div className="space-y-4">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id;
            return (
              <div
                key={faq.id}
                className={`bg-white rounded-2xl border transition-all duration-300 ${
                  isOpen
                    ? "border-blue-200 shadow-md shadow-blue-600/5"
                    : "border-slate-100/80 shadow-sm"
                }`}
              >
                {/* Trigger Button */}
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between p-6 text-left cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex gap-4 items-center pr-4">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? "text-blue-600" : "text-slate-400"}`} />
                    <span className="text-base sm:text-lg font-extrabold text-slate-900">
                      {faq.question}
                    </span>
                  </div>
                  <div
                    className={`w-8 h-8 rounded-xl bg-slate-50 flex items-center justify-center shrink-0 transition-transform duration-300 ${
                      isOpen ? "rotate-180 bg-blue-50 text-blue-600" : "text-slate-400"
                    }`}
                  >
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                {/* Collapsible Content */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pt-0 border-t border-slate-50 mt-1">
                        <p className="text-slate-600 text-sm sm:text-base font-semibold leading-relaxed pl-9">
                          {faq.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
