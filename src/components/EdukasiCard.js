// src/components/EdukasiCard.js
import React from 'react';
import { motion } from 'framer-motion';

function EdukasiCard({ item, onClick, onHover, isActive }) {
  return (
    <motion.div
      onMouseEnter={onHover}
      onClick={onClick}
      whileHover={{ y: -5, boxShadow: '0 12px 24px rgba(0,0,0,0.1)' }}
      transition={{ type: 'spring', stiffness: 250, damping: 20 }}
      className={`p-5 rounded-2xl border-2 cursor-pointer transition-all duration-300 transform
        ${isActive
          ? 'bg-indigo-900 border-indigo-700 text-white shadow-2xl shadow-indigo-500/40 dark:bg-indigo-800 dark:border-indigo-600 ring-4 ring-indigo-400/50'
          : 'bg-white border-slate-200 text-gray-800 shadow-sm dark:bg-slate-800 dark:border-slate-700 dark:text-gray-200 hover:border-indigo-400 dark:hover:border-indigo-500'}
      `}
    >
      <div className="flex items-center gap-4 relative z-10">
        <div className={`text-3xl md:text-4xl ${isActive ? 'text-white' : 'text-indigo-500 dark:text-indigo-400'}`}>
          {item.icon}
        </div>
        <div className="flex-1">
          <h3 className={`font-semibold text-lg md:text-xl leading-tight ${isActive ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
            {item.title}
          </h3>
          <p className={`text-sm mt-1 ${isActive ? 'text-indigo-100 opacity-90' : 'text-gray-600 dark:text-gray-400'}`}>
            {item.tagline}
          </p>
        </div>
        <motion.div
          initial={false}
          animate={{ x: isActive ? 8 : 0 }}
          transition={{ type: 'spring', stiffness: 400, damping: 22 }}
          className={`text-2xl font-light ml-auto ${isActive ? 'text-white' : 'text-indigo-400 dark:text-indigo-500'}`}
        >
          →
        </motion.div>
      </div>
    </motion.div>
  );
}

export default EdukasiCard;