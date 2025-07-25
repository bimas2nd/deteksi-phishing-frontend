// src/components/Footer.js

import { Github, Instagram, Linkedin, ArrowUpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SocialIcon = ({ href, children }) => {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, y: -2 }}
            whileTap={{ scale: 0.9 }}
            className="text-slate-500 hover:text-purple-500 dark:text-slate-400 dark:hover:text-purple-400 transition-colors"
        >
            {children}
        </motion.a>
    );
};

const FooterLink = ({ href, children }) => (
    <a href={href} className="text-slate-600 dark:text-slate-400 hover:text-purple-600 dark:hover:text-purple-300 transition-colors">
        {children}
    </a>
);

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <footer className="relative w-full bg-[#cfd7ea] dark:bg-blue-950 overflow-hidden">
            {/* Pola SVG untuk latar belakang */}
            <div className="absolute inset-0 opacity-10 dark:opacity-20">
                <svg width="100%" height="100%" xmlns="http://www.w3.org/2000/svg">
                    <defs>
                        <pattern id="footer-pattern" patternUnits="userSpaceOnUse" width="80" height="80" patternTransform="scale(1) rotate(45)">
                            <rect x="0" y="0" width="100%" height="100%" fill="none"/>
                            <path d="M10 0 L10 80 M0 10 L80 10 M30 0 L30 80 M0 30 L80 30 M50 0 L50 80 M0 50 L80 50 M70 0 L70 80 M0 70 L80 70" stroke="rgba(124, 58, 237, 0.2)" strokeWidth="0.5"/>
                        </pattern>
                    </defs>
                    <rect x="0" y="0" width="100%" height="100%" fill="url(#footer-pattern)" />
                </svg>
            </div>
            
            <div className="relative bg-gradient-to-b from-transparent to-slate-200/50 dark:to-slate-950/50">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-20 py-16">
                    
                    {/* Layout Multi-Kolom */}
                    <div className="grid md:grid-cols-3 gap-12 text-center md:text-left">
                        {/* Kolom 1: Brand & Tagline */}
                        <div className="md:col-span-1">
                            <h3 className="text-3xl font-bold">
                                <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                                    AntiPhish
                                </span>
                            </h3>
                            <p className="mt-4 text-slate-600 dark:text-slate-400 max-w-xs mx-auto md:mx-0">
                                Melindungi setiap klik, menjaga dunia digital Anda tetap aman dan terpercaya.
                            </p>
                        </div>

                        {/* Kolom 2: Quick Links */}
                        <div className="md:col-span-1">
                            <h4 className="font-semibold text-slate-800 dark:text-slate-100 tracking-wider">Quick Links</h4>
                            <div className="mt-4 flex flex-col space-y-3">
                                <FooterLink href="#link-checker">Analisis Link</FooterLink>
                                <FooterLink href="#edukasi">Edukasi</FooterLink>
                                <FooterLink href="#simulasi">Simulasi Phishing</FooterLink>
                            </div>
                        </div>

                        {/* Kolom 3: Social Media */}
                        <div className="md:col-span-1">
                             <h4 className="font-semibold text-slate-800 dark:text-slate-100 tracking-wider">Connect with Us</h4>
                             <div className="mt-4 flex justify-center md:justify-start gap-6">
                                <SocialIcon href="https://github.com/bimas2nd">
                                    <Github size={28} />
                                </SocialIcon>
                                <SocialIcon href="https://www.instagram.com/kentang.kotak/">
                                    <Instagram size={28} />
                                </SocialIcon>
                                <SocialIcon href="https://www.linkedin.com/in/bimas-buky-861154204/">
                                    <Linkedin size={28} />
                                </SocialIcon>
                            </div>
                        </div>
                    </div>
                </div>
                
                {/* Bagian Copyright & Back to Top */}
                <div className="border-t border-slate-300/50 dark:border-slate-700/50">
                    <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-20 py-6 flex flex-col sm:flex-row justify-between items-center text-sm text-slate-500 dark:text-slate-500">
                        <p>&copy; {new Date().getFullYear()} AntiPhish. Dibuat dengan semangat & kopi.</p>
                        <button 
                            onClick={scrollToTop}
                            className="group flex items-center gap-2 mt-4 sm:mt-0 hover:text-purple-500 transition-colors"
                            aria-label="Kembali ke atas"
                        >
                            Kembali ke atas
                            <ArrowUpCircle className="transition-transform group-hover:-translate-y-1" />
                        </button>
                    </div>
                </div>
            </div>
        </footer>
    );
}