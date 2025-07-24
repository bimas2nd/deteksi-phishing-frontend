// src/components/Hero.js (Dengan Efek Parallax)

import { motion, useScroll, useTransform } from "framer-motion"; // <-- Tambahkan useScroll & useTransform
import Lottie from "lottie-react";
import phishingAnim from "../assets/phishing-anim.json";

export default function Hero() {
  // Hook untuk mendeteksi progress scroll dari seluruh halaman
  const { scrollYProgress } = useScroll();
  
  // Mengubah nilai scroll (0 sampai 1) menjadi pergerakan vertikal (y)
  // Teks akan bergerak sedikit lebih cepat dari scroll (menciptakan efek seolah-olah lebih dekat)
  const yText = useTransform(scrollYProgress, [0, 1], ["0%", "200%"]);
  // Animasi Lottie akan bergerak lebih lambat (menciptakan efek seolah-olah lebih jauh)
  const yLottie = useTransform(scrollYProgress, [0, 1], ["0%", "-50%"]);

  const scrollToForm = () => {
    const section = document.getElementById("link-checker");
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    <section
      id="hero"
      className="relative z-10 w-full min-h-screen px-6 sm:px-10 md:px-20 py-24 flex flex-col-reverse lg:flex-row items-center justify-center gap-10 transition-colors duration-500  
      bg-gradient-to-br from-white via-[#f0f4ff] to-white 
      dark:from-[#111827] dark:via-[#1a1446] dark:to-black overflow-hidden"
    >
      {/* Glow Blobs (tidak berubah) */}
      <div className="absolute top-[-200px] left-[-150px] w-[700px] h-[700px] bg-pink-300/80 dark:bg-purple-700/50 opacity-20 blur-[160px] rounded-full pointer-events-none z-0 animate-blob-1" />
      <div className="absolute bottom-[-150px] right-[-120px] w-[500px] h-[500px] bg-indigo-400/80 dark:bg-indigo-600/50 opacity-20 blur-[180px] rounded-full pointer-events-none z-0 animate-blob-2" />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-300/80 dark:bg-purple-900/50 opacity-10 blur-[120px] rounded-full pointer-events-none z-0 animate-blob-1" />

      {/* LEFT: TEXT -- DITAMBAHKAN style={{ y: yText }} */}
      <motion.div
        style={{ y: yText }} // <-- PERUBAHAN DI SINI
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        className="flex-1 text-center lg:text-left z-10 max-w-2xl"
      >
        <motion.h1
          variants={childVariants}
          className="text-[clamp(2.25rem,5.5vw,4.25rem)] font-bold leading-tight tracking-tight text-black dark:text-white"
        >
          Perisai Cerdas Anda, <br />
          <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
            Melawan Dunia Phishing.
          </span>
        </motion.h1>
        <motion.p
          variants={childVariants}
          className="mt-6 text-lg text-slate-600 dark:text-slate-300 max-w-xl mx-auto lg:mx-0"
        >
          Lindungi privasi kamu dari link berbahaya yang bisa mencuri data, lokasi, atau mengakses perangkatmu.
        </motion.p>
        <motion.div variants={childVariants}>
          <motion.button
            whileHover={{ scale: 1.05, boxShadow: "0px 10px 30px rgba(99, 102, 241, 0.5)" }}
            whileTap={{ scale: 0.95 }}
            onClick={scrollToForm}
            className="mt-10 px-8 py-4 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-lg shadow-indigo-500/30 transition"
          >
            Mulai Deteksi 🔍
          </motion.button>
        </motion.div>
      </motion.div>

      {/* RIGHT: LOTTIE -- DITAMBAHKAN style={{ y: yLottie }} */}
      <motion.div
        style={{ y: yLottie }} // <-- PERUBAHAN DI SINI
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
        viewport={{ once: true }}
        className="flex-1 max-w-md relative z-10 flex items-start lg:items-center justify-center"
      >
        <div className="w-full h-auto">
          <Lottie animationData={phishingAnim} loop />
        </div>
      </motion.div>

      {/* Ombak SVG di bagian bawah (tidak berubah) */}
      <div className="absolute -bottom-1 left-0 w-full overflow-hidden leading-none z-10">
        <svg
          viewBox="0 0 1440 120"
          preserveAspectRatio="none"
          className="w-full h-28"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M1440,80 C1080,30,360,30,0,80 L0,120 L1440,120 Z"
            className="fill-[#cfd7ea] dark:fill-blue-950"
          />
        </svg>
      </div>
    </section>
  );
}