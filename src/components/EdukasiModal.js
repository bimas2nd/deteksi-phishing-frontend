// src/components/EdukasiModal.js

import React, { useEffect, useRef, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const LottiePlayer = lazy(() => import('lottie-react'));

function EdukasiModal({ isOpen, onClose, topic, animMap }) {
  const lottieRef = useRef(null);

  useEffect(() => {
    if (lottieRef.current && !isOpen) {
        lottieRef.current.destroy();
        lottieRef.current = null;
    }
  }, [isOpen]);

  const renderModalMedia = () => {
    if (!topic) {
      return <div className="text-gray-500 dark:text-gray-400 text-center">Pilih topik edukasi.</div>;
    }

    const animationData = animMap[topic.title];
    
    if (!animationData) {
      return (
        <div className="text-gray-500 dark:text-gray-400 text-center flex items-center justify-center h-full max-w-[280px] mx-auto text-lg p-4">
          <p>Animasi untuk topik ini tidak tersedia.</p>
        </div>
      );
    }

    return (
      <Suspense fallback={<div className="text-gray-500 dark:text-gray-400 text-center">Memuat animasi...</div>}>
        <LottiePlayer
          key={topic.id}
          lottieRef={lottieRef}
          animationData={animationData}
          loop={true}
          className="w-full h-full max-w-[280px]"
        />
      </Suspense>
    );
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="edukasi-modal-backdrop"
          onClick={onClose}
          className="fixed inset-0 bg-black/75 backdrop-blur-md z-[1000] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            key="edukasi-modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.8, opacity: 0, y: 50 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.8, opacity: 0, y: 50 }}
            transition={{ type: 'spring', stiffness: 200, damping: 25 }}
            className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl max-w-4xl w-full flex flex-col md:flex-row overflow-hidden border border-slate-200 dark:border-slate-700 max-h-[90vh]"
          >
            <div className="w-full h-48 md:w-[45%] md:h-auto bg-gradient-to-br from-purple-600 to-indigo-700 dark:from-purple-900 dark:to-indigo-950 flex items-center justify-center p-4">
              {renderModalMedia()}
            </div>

            <div className="w-full md:w-[55%] p-8 sm:p-10 relative overflow-y-auto custom-scrollbar">
              <button
                aria-label="Close modal"
                onClick={onClose}
                className="absolute top-4 right-4 text-slate-500 hover:text-red-500 text-3xl font-light p-2 rounded-full bg-slate-100/50 dark:bg-slate-700/50 backdrop-blur-sm"
              >
                &times;
              </button>
              
              <h3 className="text-3xl font-bold text-indigo-700 dark:text-indigo-400 mb-5 leading-snug">
                {topic?.title}
              </h3>
              {/* --- PERUBAHAN TIPOGRAFI DI BARIS INI --- */}
              <div className="text-slate-700 dark:text-slate-300 text-lg leading-loose whitespace-pre-line space-y-6 text-justify">
                {topic?.detail.split('\n\n').map((paragraph, index) => {
                    if (paragraph.startsWith('- ')) {
                        const listItems = paragraph.split('\n- ').map(item => item.replace('- ', ''));
                        return (
                            <ul key={index} className="list-disc list-inside space-y-2 pl-2">
                                {listItems.map((li, liIndex) => <li key={liIndex}>{li}</li>)}
                            </ul>
                        )
                    }
                    return <p key={index}>{paragraph}</p>
                })}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default EdukasiModal;