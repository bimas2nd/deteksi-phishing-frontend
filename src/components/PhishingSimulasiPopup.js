// src/components/PhishingSimulasiPopup.js (Lengkap dengan Tombol Interaktif & SVG)

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Lottie from 'lottie-react';
import { Gift, X, ArrowLeft, ArrowRight } from 'lucide-react';

import anim1 from '../assets/simulasi/1.json';
import anim2 from '../assets/simulasi/2.json';
import anim3 from '../assets/simulasi/3.json';
import anim4 from '../assets/simulasi/4.json';

const steps = [
    { 
        title: "Langkah 1: Umpan Dikirim", 
        desc: "Anda menerima email atau pesan dengan tawaran yang sangat menggiurkan: 'Selamat! Anda memenangkan hadiah!'. Pesan ini dirancang untuk membangkitkan rasa penasaran dan mendesak Anda untuk segera bertindak.",
        anim: anim1 
    },
    { 
        title: "Langkah 2: Jebakan di Depan Mata", 
        desc: "Karena penasaran, Anda mengklik link tersebut. Anda langsung diarahkan ke sebuah situs web yang tampilannya sangat mirip dengan aslinya. Semua logo, warna, dan tulisannya dibuat untuk menipu Anda.",
        anim: anim2,
        actionLabel: "Lanjutkan ke Situs Klaim Hadiah" 
    },
    { 
        title: "Langkah 3: Anda Memasukkan Data", 
        desc: "Situs palsu ini meminta Anda login untuk 'klaim hadiah'. Tanpa curiga, Anda memasukkan username, password, bahkan mungkin data pribadi lainnya. Setiap ketukan tombol Anda direkam oleh peretas.",
        anim: anim3,
        actionLabel: "Login & Klaim Sekarang!"
    },
    { 
        title: "Langkah 4: Data Berhasil Dicuri", 
        desc: "Begitu Anda menekan 'Login' atau 'Submit', semua data yang Anda masukkan langsung terkirim ke server milik peretas dalam sekejap mata. Tidak ada proses loading yang aneh, semuanya tampak normal.",
        anim: anim4 
    },
    { 
        title: "Langkah 5: Akun Diambil Alih", 
        desc: "Kini peretas memiliki kunci akses ke akun Anda. Mereka bisa menguras rekening, menyebarkan informasi palsu, menipu kontak Anda, atau menjual data pribadi Anda ke pihak lain. Kerugian sudah terjadi.",
        anim: anim4 
    },
];

const backdropVariants = { hidden: { opacity: 0 }, visible: { opacity: 1 } };
const popupVariants = {
    hidden: { scale: 0.95, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: 'spring', stiffness: 300, damping: 30 } },
    exit: { scale: 0.95, opacity: 0 },
};
const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
    exit: { opacity: 0, x: -50, transition: { duration: 0.2, ease: 'easeIn' } },
};

export default function PhishingSimulasiPopup() {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [currentStep, setCurrentStep] = useState(0);

    useEffect(() => {
        const originalStyle = window.getComputedStyle(document.body).overflow;
        if (isPopupOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = originalStyle;
            setTimeout(() => setCurrentStep(0), 300);
        }
        return () => {
            document.body.style.overflow = originalStyle;
        };
    }, [isPopupOpen]);

    const handleNext = () => {
        if (currentStep < steps.length - 1) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    return (
        <section id="simulasi" className="relative w-full px-6 sm:px-10 md:px-20 py-32 flex flex-col items-center justify-center overflow-hidden bg-[#cfd7ea] dark:bg-blue-950">
            <div className="relative z-10 flex flex-col items-center text-center">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Penasaran Bagaimana Phishing Bekerja?</h2>
                <p className="max-w-2xl mt-4 text-slate-600 dark:text-slate-300 text-base sm:text-lg">Lihat simulasi langkah demi langkah bagaimana peretas mencuri data Anda dan bagaimana cara menghindarinya.</p>
                <button onClick={() => setIsPopupOpen(true)} className="mt-8 px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-full flex items-center gap-3 text-lg transition-transform transform hover:scale-105 shadow-lg">
                    <Gift size={24} />
                    Mulai Simulasi Interaktif
                </button>
            </div>
            
            <AnimatePresence>
                {isPopupOpen && (
                    <motion.div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4" variants={backdropVariants} initial="hidden" animate="visible" exit="hidden">
                        <motion.div 
                            role="dialog" 
                            aria-modal="true" 
                            className="bg-violet-50 dark:bg-gradient-to-br dark:from-purple-950 dark:to-violet-950 p-6 sm:p-8 rounded-3xl max-w-4xl w-full shadow-2xl relative border border-violet-200 dark:border-violet-700/50 flex flex-col text-center" 
                            variants={popupVariants} initial="hidden" animate="visible" exit="exit"
                        >
                            <button onClick={() => setIsPopupOpen(false)} className="absolute top-4 right-4 text-violet-500 dark:text-gray-400 hover:text-violet-800 dark:hover:text-white transition-colors z-20"><X size={24}/></button>
                            <div className="w-full">
                                <p className="font-semibold text-purple-600 dark:text-purple-400">Langkah {currentStep + 1} dari {steps.length}</p>
                                <div className="relative h-96 flex items-center justify-center my-4">
                                    <AnimatePresence mode="wait">
                                        <motion.div 
                                            key={currentStep} 
                                            variants={stepVariants} initial="hidden" animate="visible" exit="exit" 
                                            className="w-full max-w-md"
                                        >
                                            <Lottie animationData={steps[currentStep].anim} loop autoplay />
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                                <h3 className="text-2xl font-bold text-slate-900 dark:text-white mt-4">{steps[currentStep].title}</h3>
                                <p className="text-slate-600 dark:text-slate-300 mt-2 min-h-[110px] sm:min-h-[80px]">
                                    {steps[currentStep].desc}
                                </p>
                            </div>

                            <div className="flex items-center justify-between mt-8">
                                <button onClick={handlePrev} disabled={currentStep === 0} className="flex items-center gap-2 px-5 py-2 rounded-lg text-slate-700 dark:text-slate-300 hover:bg-violet-200/50 dark:hover:bg-white/10 disabled:opacity-40 disabled:cursor-not-allowed transition-colors">
                                    <ArrowLeft size={18} />
                                    <span>Sebelumnya</span>
                                </button>
                                
                                {steps[currentStep].actionLabel ? (
                                    <button onClick={handleNext} className="px-8 py-3 bg-gradient-to-r from-rose-500 to-red-600 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg shadow-red-500/30">
                                      {steps[currentStep].actionLabel}
                                    </button>
                                ) : (
                                    <>
                                      {currentStep === steps.length - 1 ? (
                                          <button onClick={() => setIsPopupOpen(false)} className="px-8 py-3 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg text-white font-semibold transition-all duration-300 transform hover:scale-105">
                                              Saya Paham Risikonya
                                          </button>
                                      ) : (
                                          <button onClick={handleNext} className="flex items-center gap-2 px-5 py-2 rounded-lg text-white bg-purple-600 hover:bg-purple-700 disabled:opacity-40 transition-colors">
                                              <span>Langkah Selanjutnya</span>
                                              <ArrowRight size={18} />
                                          </button>
                                      )}
                                    </>
                                )}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
            
            <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
                <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M0,120 L1440,120 L1440,60 L1200,40 L950,70 L720,30 L500,60 L250,20 L0,50 Z" className="fill-[#ffffff] dark:fill-blue-800"></path>
                    <path d="M0,120 L1440,120 L1440,80 L1100,70 L850,100 L620,60 L400,90 L150,50 L0,80 Z" className="fill-[#cfd7ea] dark:fill-blue-950 "></path>
                </svg>
            </div>
        </section>
    );
}