import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";

interface Testimonial {
  id: number;
  name: string;
  role: string;
  company: string;
  rating: number;
  comment: string;
  image: string;
}

export default function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(0); // -1 for left, 1 for right

  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: "Siti Rahmawati",
      role: "Founder",
      company: "Elia Organics (Skincare)",
      rating: 5,
      comment: "Lilik Label benar-benar menyelamatkan peluncuran produk serum kami! Hasil cetak label vinyl glossy mereka sangat jernih, warnanya persis sesuai mockup desain, dan stikernya 100% tahan air meski ditaruh di kamar mandi lembab. Adminnya ramah dan pengerjaan tepat waktu.",
      image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&h=150&q=80",
    },
    {
      id: 2,
      name: "Hendra Wijaya",
      role: "Owner",
      company: "Roast & Brew Coffee",
      rating: 5,
      comment: "Sudah order label botol kopi literan di sini berkali-kali. Bahan stiker vinyl dolf-nya memberikan kesan mewah banget. Lemnya sangat rekat, tidak lepas walau dimasukkan ke es batu seharian. Harga sangat bersahabat buat UMKM kecil.",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=150&h=150&q=80",
    },
    {
      id: 3,
      name: "Amanda Lestari",
      role: "Marketing Manager",
      company: "Dapur Manis Bakery",
      rating: 5,
      comment: "Suka sekali dengan hasil stiker Chromo dan stiker segel box dari Lilik Label. Cetakannya presisi, potongannya sangat rapi jadi tinggal kelupas langsung tempel di box kue kami. Unboxing kemasan kami terlihat jauh lebih berkelas!",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=150&h=150&q=80",
    },
    {
      id: 4,
      name: "Rian Pratama",
      role: "Pemilik Usaha",
      company: "Sambal Bakar Nusantara",
      rating: 5,
      comment: "Awalnya ragu apakah stiker label makanan bisa tahan minyak. Setelah mencoba stiker vinyl laminasi dari Lilik Label, ternyata luar biasa kuat! Sambal berminyak kami tidak merusak tulisan dan gambar sama sekali. Terima kasih banyak!",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=150&h=150&q=80",
    },
  ];

  // Auto-slide every 6 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      handleNext();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentIndex]);

  const handlePrev = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1));
  };

  const slideVariants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 100 : -100,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (dir: number) => ({
      x: dir < 0 ? 100 : -100,
      opacity: 0,
    }),
  };

  return (
    <section id="testimonials" className="py-24 bg-white relative overflow-hidden">
      {/* Background circles */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-slate-50/70 rounded-full blur-3xl -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <span className="text-blue-600 font-bold uppercase tracking-wider text-xs sm:text-sm">Testimoni Pelanggan</span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 leading-tight">
            Apa Kata Mereka Tentang Lilik Label?
          </h2>
          <p className="text-base text-slate-600 font-medium">
            Lebih dari ribuan pebisnis kuliner, kecantikan, dan e-commerce telah bermitra dengan kami untuk mempercantik kemasan mereka.
          </p>
        </div>

        {/* Carousel Container */}
        <div className="relative min-h-[360px] flex items-center justify-center">
          {/* Main Slide Card */}
          <div className="w-full max-w-4xl bg-slate-50 border border-slate-100 p-8 sm:p-12 md:p-16 rounded-[2.5rem] shadow-sm relative overflow-hidden">
            {/* Quote watermark icon */}
            <Quote className="absolute right-12 top-12 w-32 h-32 text-slate-200/50 -z-0 stroke-[1]" />

            <AnimatePresence initial={false} custom={direction} mode="wait">
              <motion.div
                key={currentIndex}
                custom={direction}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4 }}
                className="relative z-10 flex flex-col md:flex-row gap-8 items-center md:items-start"
              >
                {/* User Headshot */}
                <div className="relative shrink-0">
                  <div className="absolute -inset-1.5 bg-gradient-to-tr from-blue-600 to-amber-500 rounded-3xl blur-sm opacity-50" />
                  <img
                    src={testimonials[currentIndex].image}
                    alt={testimonials[currentIndex].name}
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl object-cover relative z-10 border-2 border-white"
                    referrerPolicy="no-referrer"
                  />
                </div>

                {/* Testimonial Message */}
                <div className="space-y-4 text-center md:text-left flex-1">
                  {/* Stars Rating */}
                  <div className="flex items-center justify-center md:justify-start gap-1">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />
                    ))}
                  </div>

                  {/* Comment */}
                  <blockquote className="text-base sm:text-lg text-slate-700 font-semibold leading-relaxed italic">
                    "{testimonials[currentIndex].comment}"
                  </blockquote>

                  {/* Customer Info */}
                  <div className="pt-2">
                    <p className="text-base font-extrabold text-slate-900">{testimonials[currentIndex].name}</p>
                    <p className="text-xs text-slate-500 font-extrabold uppercase tracking-wider mt-0.5">
                      {testimonials[currentIndex].role}, <span className="text-blue-600 font-bold">{testimonials[currentIndex].company}</span>
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation Chevrons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-0 right-0 flex justify-between pointer-events-none z-20 px-2 sm:px-6">
            <button
              onClick={handlePrev}
              className="w-12 h-12 rounded-2xl bg-white hover:bg-slate-50 text-slate-600 border border-slate-100 shadow-md hover:shadow-lg flex items-center justify-center pointer-events-auto transform active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label="Previous testimonial"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={handleNext}
              className="w-12 h-12 rounded-2xl bg-white hover:bg-slate-50 text-slate-600 border border-slate-100 shadow-md hover:shadow-lg flex items-center justify-center pointer-events-auto transform active:scale-95 transition-all duration-200 cursor-pointer"
              aria-label="Next testimonial"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Carousel Dots */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, idx) => (
            <button
              key={idx}
              onClick={() => {
                setDirection(idx > currentIndex ? 1 : -1);
                setCurrentIndex(idx);
              }}
              className={`h-2.5 rounded-full transition-all duration-300 cursor-pointer ${
                currentIndex === idx ? "w-8 bg-blue-600" : "w-2.5 bg-slate-200 hover:bg-slate-300"
              }`}
              aria-label={`Go to testimonial ${idx + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
