// src/components/Footer.js

import { Github, Twitter, Linkedin, ArrowUpCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const SocialIcon = ({ href, children }) => {
    return (
        <motion.a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.2, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            className="text-slate-500 hover:text-purple-500 dark:text-slate-400 dark:hover:text-purple-400 transition-colors"
        >
            {children}
        </motion.a>
    );
};

export default function Footer() {
    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        // ✅ Latar belakangnya menyatu dengan SVG di atas dan bergradasi ke lebih gelap
        <footer className="w-full bg-[#cfd7ea] dark:bg-blue-950">
            <div className="bg-gradient-to-b from-transparent to-slate-200/50 dark:to-slate-950/50">
                <div className="max-w-7xl mx-auto px-6 sm:px-10 md:px-20 py-12 text-center">
                    <motion.h3 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-3xl font-bold"
                    >
                        <span className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                            AntiPhish
                        </span>
                    </motion.h3>
                    
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="mt-4 text-slate-600 dark:text-slate-400 max-w-md mx-auto"
                    >
                        Melindungi setiap klik, menjaga dunia digital Anda tetap aman dan terpercaya.
                    </motion.p>
                    
                    <motion.div 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="mt-8 flex justify-center gap-8"
                    >
                        <SocialIcon href="https://github.com">
                            <Github size={28} />
                        </SocialIcon>
                        <SocialIcon href="https://twitter.com">
                            <Twitter size={28} />
                        </SocialIcon>
                        <SocialIcon href="https://linkedin.com">
                            <Linkedin size={28} />
                        </SocialIcon>
                    </motion.div>
                </div>
                
                <div className="mt-8 border-t border-slate-300/50 dark:border-slate-700/50">
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