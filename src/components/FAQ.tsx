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
      question: "Berapa minimal order untuk label pakaian seperti woven, printing, atau komputer?",
      answer: "Lilik Label mendukung brand fashion kecil dan grosir. Kami melayani order label pakaian mulai dari satuan hingga produksi massal, dengan harga yang lebih hemat untuk pemesanan jumlah besar.",
    },
    {
      id: 2,
      question: "Apa perbedaan antara label woven, label printing, dan label komputer?",
      answer: "Label woven terbuat dari benang rajut dan ideal untuk label brand pakaian yang tahan cuci. Label printing cocok untuk mencetak logo berwarna dan instruksi perawatan di kain tipis. Label komputer adalah pilihan ekonomis untuk nama, ukuran, dan detail produksi dengan hasil cetak yang presisi dan konsisten.",
    },
    {
      id: 3,
      question: "Format file desain apa yang terbaik untuk label pakaian?",
      answer: "Untuk hasil terbaik, kami merekomendasikan file vektor seperti PDF, Adobe Illustrator (.ai), CorelDraw (.cdr), atau SVG. File PNG transparan atau JPEG resolusi tinggi 300 DPI juga dapat digunakan, terutama untuk desain logo atau label printing.",
    },
    {
      id: 4,
      question: "Berapa lama proses produksi label pakaian hingga siap kirim?",
      answer: "Produksi standar kami biasanya memakan waktu 2 sampai 5 hari kerja setelah file desain final disetujui dan pembayaran dikonfirmasi. Waktu ini bisa lebih cepat untuk order kecil, sedangkan label woven custom dengan jumlah besar umumnya memerlukan persiapan sedikit lebih lama.",
    },
    {
      id: 5,
      question: "Apakah bisa membuat ukuran dan desain label sesuai spesifikasi pakaian?",
      answer: "Ya, kami bisa membantu menyesuaikan ukuran label, bentuk, dan desain sesuai kebutuhan pakaian Anda — baik untuk tag brand, ukuran, care label, maupun label khusus seragam.",
    },
    {
      id: 6,
      question: "Bagaimana pengemasan dan pengiriman agar label tidak rusak?",
      answer: "Kami mengemas label pakaian secara rapi menggunakan lapisan pelindung, kardus kokoh, dan jika perlu plastik anti lembab agar label tetap mulus tiba di lokasi Anda.",
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
            Temukan jawaban cepat untuk pertanyaan label pakaian, mulai dari jenis bahan woven, printing, komputer, hingga proses produksi dan pengiriman.
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
