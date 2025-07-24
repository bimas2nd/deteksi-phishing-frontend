// src/components/Navbar.js (Final dengan urutan baru dan tanpa highlight di hero)

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// PERUBAHAN #1: Urutan link diubah.
const navLinks = [
  { id: "edukasi", label: "Edukasi" },
  { id: "link-checker", label: "Deteksi" },
  { id: "simulasi", label: "Simulasi" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  
  // PERUBAHAN #2: State awal activeLink kosong, agar tidak ada yang aktif di awal.
  const [activeLink, setActiveLink] = useState("");

  const [isDark, setIsDark] = useState(
    () => window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);
  
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 40);

      // PERUBAHAN #2: Jika posisi scroll masih di paling atas, jangan aktifkan link manapun.
      if (scrollPosition < 100) {
        setActiveLink("");
        return;
      }
      
      let currentSection = "";
      navLinks.forEach(link => {
        const section = document.getElementById(link.id);
        if (section) {
          // Cek apakah section sudah masuk ke viewport
          if (section.offsetTop <= scrollPosition + 150) {
            currentSection = link.id;
          }
        }
      });
      
      setActiveLink(currentSection);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const section = document.getElementById(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
    setMobileMenuOpen(false);
  };

  const NavLink = ({ link }) => (
    <a 
      key={link.id} 
      href={`#${link.id}`}
      onClick={(e) => {
        e.preventDefault();
        scrollToSection(link.id);
      }}
      className={`hover:text-indigo-500 dark:hover:text-white transition text-base relative ${
        activeLink === link.id ? "font-bold text-indigo-600 dark:text-white" : ""
      }`}
    >
      {link.label}
      {activeLink === link.id && (
        <motion.div 
          className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-indigo-500 dark:bg-fuchsia-400"
          layoutId="underline"
        />
      )}
    </a>
  );

  return (
    <>
      <motion.nav
        initial={{ y: -30, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6 }}
        className={`fixed top-0 left-0 w-full z-50 transition-all duration-700 ${isScrolled ? "py-2" : "py-4 sm:py-8"}`}
      >
        {!isScrolled && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1 }} className="absolute inset-0 h-[120px] z-0 overflow-hidden pointer-events-none">
            <svg viewBox="0 0 1440 180" className="w-full h-full" preserveAspectRatio="none">
              <path fill={isDark ? "#1f0836" : "#cfd7ea"} d="M0,96L60,90.7C120,85,240,75,360,69.3C480,62,600,64,720,80C840,96,960,128,1080,149.3C1200,171,1320,181,1380,186.7L1440,192V0H1380C1320,0,1200,0,1080,0C960,0,840,0,720,0C600,0,480,0,360,0C240,0,120,0,60,0H0Z" />
            </svg>
          </motion.div>
        )}

        <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-20">
          <div className={`relative flex justify-between items-center transition-all duration-500 ${isScrolled ? "bg-white/70 dark:bg-[#0f172a]/80 rounded-full shadow-md backdrop-blur-lg px-3 py-[6px] border border-white/30 dark:border-white/10" : "bg-transparent px-5 py-4"}`}>
            
            <div className="hidden md:flex items-center gap-5 text-slate-800 dark:text-slate-200 font-medium">
              {navLinks.map(link => <NavLink key={link.id} link={link} />)}
            </div>

            <div className="md:hidden">
              <button aria-label="Buka menu" onClick={() => setMobileMenuOpen(true)} className="text-slate-800 dark:text-slate-200 p-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m4 6h16" /></svg>
              </button>
            </div>

            <div className="flex items-center gap-3">
              <div className={`font-bold bg-gradient-to-r from-indigo-400 via-pink-400 to-purple-500 bg-clip-text text-transparent tracking-wide transition-all ${isScrolled ? "text-base sm:text-lg" : "text-lg sm:text-xl"}`}>
                🔐 AntiPhish
              </div>
              <button onClick={() => setIsDark(!isDark)} className={`text-xs sm:text-sm px-3 py-1 rounded-full font-semibold bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white shadow-md hover:brightness-110 transition`}>
                {isDark ? "☀️ Light" : "🌙 Dark"}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
            <motion.div
              initial={{ x: '100%' }} animate={{ x: 0 }} exit={{ x: '100%' }}
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
              className="fixed inset-0 z-50 bg-white dark:bg-[#0f172a] p-6 md:hidden"
            >
              <div className="flex justify-end mb-8">
                <button aria-label="Tutup menu" onClick={() => setMobileMenuOpen(false)} className="p-2">
                    <svg className="w-6 h-6 text-slate-800 dark:text-slate-200" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                </button>
              </div>
              <div className="flex flex-col items-center gap-8">
                {navLinks.map(link => (
                    <a key={link.id} href={`#${link.id}`} onClick={(e) => { e.preventDefault(); scrollToSection(link.id); }} className="text-2xl font-semibold text-slate-800 dark:text-slate-200">
                      {link.label}
                    </a>
                ))}
                <button onClick={() => { setIsDark(!isDark); setMobileMenuOpen(false); }} className={`w-full text-lg mt-4 px-3 py-2 rounded-full font-semibold bg-gradient-to-r from-indigo-500 to-fuchsia-500 text-white`}>
                  {isDark ? "☀️ Ganti ke Light Mode" : "🌙 Ganti ke Dark Mode"}
                </button>
              </div>
            </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}