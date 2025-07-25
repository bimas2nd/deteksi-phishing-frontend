// src/components/EdukasiSection.js

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import EdukasiCard from './EdukasiCard';
import EdukasiModal from './EdukasiModal';

// Import animasi
import shieldMainAnim from '../assets/modal/shield-main.json';
import ranteAnim from '../assets/modal/rante.json';
import shieldAnim from '../assets/modal/shield.json';
import warningAnim from '../assets/modal/warning.json';
import searchAnim from '../assets/modal/search.json'; // <-- TAMBAHKAN IMPORT INI

// --- DATA & KONFIGURASI ---
const edukasiData = [
  { id: 1, tagline: "DASAR-DASAR ANCAMAN", title: "Membedah Anatomi Phishing", description: "Pahami bagaimana penipu merancang jebakan mereka, mulai dari email palsu hingga situs web yang meniru aslinya.", detail: `Phishing adalah upaya penipuan untuk mendapatkan informasi sensitif Anda, seperti kata sandi, detail kartu kredit, atau data pribadi lainnya, dengan menyamar sebagai entitas terpercaya dalam komunikasi elektronik.\n\nTujuan utamanya adalah menipu Anda agar secara sukarela memberikan informasi tersebut.\n\nModus Umum Phishing:\n- Email dari "bank" yang menyatakan ada masalah dengan akun Anda dan meminta Anda login melalui link yang mereka berikan.\n- Pesan WhatsApp mengatasnamakan kurir paket yang meminta Anda meng-install aplikasi (.apk) untuk melacak paket.\n- Situs web palsu yang meniru halaman login Instagram atau Google untuk mencuri username dan password Anda.\n- Tawaran hadiah atau diskon yang tidak masuk akal yang mengharuskan Anda mengisi formulir dengan data pribadi.`, icon: "📨" },
  { id: 2, tagline: "INVESTIGASI DIGITAL", title: "Mendeteksi Jebakan dalam URL", description: "Belajar menjadi detektif digital dengan mengenali tanda-tanda bahaya dalam sebuah tautan sebelum Anda mengkliknya.", detail: `URL adalah petunjuk terbesar. Perhatikan baik-baik sebelum mengklik.\n\nTanda Bahaya pada URL:\n- Salah Eja (Typo): Perhatikan domain utama. Penipu sering menggunakan nama yang sangat mirip, misal: 'klikbca.com' (benar) vs 'klik-bca.co' atau 'kllikbca.com' (palsu).\n- Subdomain Menyesatkan: Dalam 'secure.bank-anda.com.xyz', domain utamanya adalah 'com.xyz', bukan 'bank-anda.com'. Domain yang sah selalu berada tepat sebelum .com, .co.id, dll.\n- Karakter Aneh atau Simbol: URL yang sah jarang menggunakan banyak simbol hubung (-) atau karakter yang tidak biasa.\n- Bukan HTTPS: Jika sebuah situs web meminta data login tapi alamatnya dimulai dengan 'http://' bukan 'https://🔒', itu adalah bendera merah raksasa. Namun, HTTPS saja bukan jaminan 100% aman.`, icon: "🔗" },
  { id: 3, tagline: "DAMPAK & RISIKO", title: "Konsekuensi dari Satu Klik", description: "Ketahui risiko nyata yang terjadi setelah mengklik link berbahaya, dari pencurian identitas hingga infeksi malware.", detail: `Kerusakan dari satu klik yang salah bisa sangat masif dan menyebar dengan cepat.\n\nBeberapa Konsekuensi Fatal:\n- Kehilangan Akses Akun: Akun email atau media sosial Anda bisa diambil alih dan digunakan untuk menipu kontak Anda.\n- Kerugian Finansial: Kredensial mobile banking atau detail kartu kredit Anda dicuri, lalu isi rekening Anda dikuras habis.\n- Instalasi Malware/Ransomware: Perangkat Anda (HP atau laptop) bisa terinfeksi virus yang mencuri data atau bahkan mengunci semua file Anda dan meminta tebusan (ransomware).\n- Pencurian Identitas: Data pribadi Anda (KTP, KK) digunakan untuk melakukan pinjaman online ilegal atau kejahatan lain atas nama Anda.`, icon: "⚠️" },
  { id: 4, tagline: "STRATEGI PERTAHANAN", title: "Membangun Benteng Digital Anda", description: "Terapkan langkah-langkah proaktif seperti 2FA dan kebiasaan digital yang aman untuk menjadi target yang sulit ditembus.", detail: `Menjadi korban phishing seringkali bisa dicegah dengan kebiasaan yang baik.\n\nStrategi Pertahanan Anda:\n- Mantra Utama: "Jangan Percaya, Selalu Verifikasi". Jika ada pesan yang mendesak atau mencurigakan, hubungi perusahaan terkait melalui jalur resmi (telepon atau website resmi), jangan melalui link di pesan tersebut.\n- Aktifkan 2FA (Autentikasi Dua Faktor): Ini adalah lapisan keamanan terpenting. Bahkan jika password Anda dicuri, penipu tidak bisa masuk tanpa kode dari HP Anda.\n- Gunakan Password Manager: Buat password yang unik dan rumit untuk setiap akun. Mustahil untuk mengingat semuanya, jadi gunakan aplikasi password manager terpercaya.\n- Selalu Update Perangkat Lunak: Pastikan browser, sistem operasi HP, dan laptop Anda selalu dalam versi terbaru untuk mendapatkan patch keamanan terkini.\n- Berpikir Sebelum Klik: Tanyakan pada diri sendiri, "Apakah saya mengharapkan email ini? Apakah tawarannya terlalu bagus untuk jadi kenyataan?"`, icon: "🛡️" },
];

const animMap = {
  "Membedah Anatomi Phishing": searchAnim, // <-- GANTI DARI NULL KE SEARCHANIM
  "Mendeteksi Jebakan dalam URL": ranteAnim,
  "Konsekuensi dari Satu Klik": warningAnim,
  "Membangun Benteng Digital Anda": shieldAnim,
};

// --- KOMPONEN UTAMA HALAMAN EDUKASI ---
export default function EdukasiSection() {
    // ... Sisa kode komponen ini tidak ada yang berubah ...
    // ... jadi Anda bisa biarkan saja atau ganti semua untuk memastikan ...
  const [selectedTopic, setSelectedTopic] = useState(null);
  const [hoveredTopic, setHoveredTopic] = useState(edukasiData.length > 0 ? edukasiData[0] : null);
  
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    },
  };

  useEffect(() => {
    if (selectedTopic) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedTopic]);

  return (
    <section id="edukasi" className="relative w-full bg-[#cfd7ea] dark:bg-blue-950 px-6 py-24 sm:py-32 overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-[-100px] right-[-150px] w-[500px] h-[500px] bg-purple-600/20 dark:bg-purple-900/10 opacity-80 blur-[250px] rounded-full animate-aurora-1"></div>
        <div className="absolute bottom-[-150px] left-[-200px] w-[600px] h-[600px] bg-indigo-600/20 dark:bg-indigo-900/10 opacity-80 blur-[250px] rounded-full animate-aurora-2"></div>
      </div>
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-center text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white sm:text-5xl"
            >
              Kenali Ancamannya, <br className="sm:hidden" />
              <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                Amankan Datamu
              </span>
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="mt-5 text-xl leading-relaxed text-gray-700 dark:text-gray-400 max-w-3xl mx-auto font-light"
            >
              Pengetahuan adalah <strong>perisai terbaik Anda</strong> dalam menghadapi ancaman digital. Pelajari cara kerja phishing, identifikasi jebakan URL, dan terapkan strategi pertahanan siber yang paling efektif untuk melindungi diri Anda dan data pribadi.
            </motion.p>
        </div>
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} transition={{ duration: 0.8 }} viewport={{ once: true }}
            className="w-full lg:block sticky top-8"
          >
            <div className="p-8 bg-white/70 dark:bg-purple-600/20 rounded-3xl backdrop-blur-lg border border-slate-200/60 dark:border-slate-700/60 shadow-xl flex items-center justify-center min-h-[250px]">
              <Lottie animationData={shieldMainAnim} loop className="w-full h-auto max-w-[350px] mx-auto" />
            </div>
            <div className="mt-8 text-center lg:text-left">
              <AnimatePresence mode="wait">
                {hoveredTopic && (
                  <motion.div key={hoveredTopic.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -15 }} transition={{ duration: 0.3 }}>
                    <p className="text-base font-semibold text-blue-600 dark:text-blue-400 tracking-widest uppercase">{hoveredTopic.tagline}</p>
                    <h3 className="mt-2 text-3xl font-extrabold text-gray-900 dark:text-white leading-snug">{hoveredTopic.title}</h3>
                    <p className="mt-3 text-lg text-gray-600 dark:text-gray-400 min-h-[70px] leading-relaxed">{hoveredTopic.description}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            className="flex flex-col gap-6 w-full"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {edukasiData.map((item) => (
              <motion.div key={item.id} variants={itemVariants}>
                <EdukasiCard
                  item={item}
                  isActive={item.id === hoveredTopic?.id}
                  onClick={() => setSelectedTopic(item)}
                  onHover={() => setHoveredTopic(item)}
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
      <EdukasiModal isOpen={!!selectedTopic} onClose={() => setSelectedTopic(null)} topic={selectedTopic} animMap={animMap} />
    </section>
  );
}