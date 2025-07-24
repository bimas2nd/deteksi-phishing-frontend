// src/components/LinkChecker.js (VERSI FINAL LENGKAP)

import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from "framer-motion";
import { Link, ShieldCheck, CheckCircle, AlertTriangle, XCircle, Loader2, ChevronDown, RotateCcw, History, Clock } from "lucide-react";
import ResultCardSkeleton from './ResultCardSkeleton';

const API_BASE_URL = process.env.REACT_APP_API_URL;

const poll = (fn, ms) => {
  return new Promise((resolve, reject) => {
    const interval = setInterval(async () => {
      try {
        const result = await fn();
        if (result.status === 'completed') {
          clearInterval(interval);
          resolve(result);
        }
      } catch (error) {
        clearInterval(interval);
        reject(error);
      }
    }, ms);
  });
};

const ResultCard = ({ result }) => {
  if (!result) return null;
  const config = {
    safe: { icon: <CheckCircle className="h-10 w-10 text-emerald-500 dark:text-emerald-400" />, bg: "bg-emerald-200/50 dark:bg-emerald-900/30", borderColor: "border-emerald-400/50 dark:border-emerald-500/30", textColor: "text-emerald-700 dark:text-emerald-300" },
    phishing: { icon: <AlertTriangle className="h-10 w-10 text-rose-500 dark:text-rose-400" />, bg: "bg-rose-200/50 dark:bg-rose-900/30", borderColor: "border-rose-400/50 dark:border-rose-500/30", textColor: "text-rose-700 dark:text-rose-300" },
    error: { icon: <XCircle className="h-10 w-10 text-amber-500 dark:text-amber-400" />, bg: "bg-amber-200/50 dark:bg-amber-900/30", borderColor: "border-amber-400/50 dark:border-amber-500/30", textColor: "text-amber-700 dark:text-amber-300" },
    pending: { icon: <Clock className="h-10 w-10 text-sky-500 dark:text-sky-400" />, bg: "bg-sky-200/50 dark:bg-sky-900/30", borderColor: "border-sky-400/50 dark:border-sky-500/30", textColor: "text-sky-700 dark:text-sky-300" },
  };
  const currentConfig = config[result.status];
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} transition={{ duration: 0.4 }} className={`relative mt-6 w-full overflow-hidden rounded-xl border ${currentConfig.borderColor} p-6 backdrop-blur-sm ${currentConfig.bg}`}>
      <div className="relative z-10 flex flex-col items-center gap-3 text-center">
        {currentConfig.icon}
        <h3 className={`text-2xl font-bold ${currentConfig.textColor}`}>{result.title}</h3>
        <p className="text-slate-700 dark:text-slate-300 text-sm md:text-base">{result.message}</p>
      </div>
    </motion.div>
  );
};

export default function LinkChecker() {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState(() => {
    const savedHistory = localStorage.getItem('scanHistory');
    return savedHistory ? JSON.parse(savedHistory) : [];
  });

  useEffect(() => {
    localStorage.setItem('scanHistory', JSON.stringify(history));
  }, [history]);

  const formatResult = (data) => {
    const stats = data?.data?.attributes?.last_analysis_stats;
    if (!stats) return { status: 'error', title: 'Error', message: 'Gagal mendapatkan data analisis. Coba lagi.' };

    if (stats.malicious > 0 || stats.suspicious > 0) {
      return { status: 'phishing', title: 'Bahaya!', message: `Terdeteksi ${stats.malicious + stats.suspicious} ancaman. URL ini kemungkinan besar adalah phishing.` };
    } else {
      return { status: 'safe', title: 'Aman', message: 'Tidak ada ancaman terdeteksi. URL ini kemungkinan besar aman.' };
    }
  };

  const handleCekLink = async (e) => {
    e.preventDefault();
    if (!url) return;
    setLoading(true);
    setResult(null);

    try {
      const initialResponse = await axios.post(`${API_BASE_URL}/scan-url`, { url });
      let finalResult;

      if (initialResponse.data.status === 'completed') {
        finalResult = formatResult(initialResponse.data.data);
      } else if (initialResponse.data.status === 'pending') {
        setResult({ status: 'pending', title: 'Analisis Sedang Berlangsung...', message: 'Harap tunggu, server kami sedang bekerja keras menganalisis URL Anda.' });
        const analysisId = initialResponse.data.analysisId;
        const pollFn = () => axios.get(`${API_BASE_URL}/check-result/${analysisId}`).then(res => res.data);
        const completedResult = await poll(pollFn, 5000);
        finalResult = formatResult(completedResult.data);
      }

      setResult(finalResult);
      const newHistoryItem = { id: new Date().getTime(), url, status: finalResult.status };
      setHistory(prev => [newHistoryItem, ...prev.slice(0, 4)]);
    } catch (error) {
      console.error("Error saat scanning:", error);
      setResult({ status: 'error', title: 'Terjadi Kesalahan', message: 'Tidak dapat terhubung ke server analisis. Coba periksa kembali URL atau coba beberapa saat lagi.' });
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setUrl('');
    setResult(null);
    setLoading(false);
  };

  const handleHistoryClick = (historyUrl) => {
    setUrl(historyUrl);
  };

  return (
    <section id="link-checker" className="relative w-full min-h-screen px-6 sm:px-10 md:px-20 py-24 flex items-center justify-center overflow-hidden bg-gradient-to-br from-white via-[#f0f4ff] to-white dark:from-[#111827] dark:via-[#1a1446] dark:to-black">
        {/* ... Sisa kode JSX Anda (tampilan) tidak perlu diubah sama sekali ... */}
        {/* ... Saya salin langsung dari kode yang Anda berikan ... */}
        <div className="absolute top-0 left-0 w-full overflow-hidden leading-none z-10">
            <svg viewBox="0 0 1440 120" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="block w-full">
                <path d="M0,0 L1440,0 L1440,40 Q720,100 0,40 Z" className="fill-[#cfd7ea] dark:fill-blue-950" />
            </svg>
        </div>
        <div className="absolute top-[-200px] left-[-150px] w-[700px] h-[700px] bg-pink-300/80 dark:bg-purple-700/50 opacity-20 blur-[160px] rounded-full pointer-events-none z-0 animate-blob-1" />
        <div className="absolute bottom-[-150px] right-[-120px] w-[500px] h-[500px] bg-indigo-400/80 dark:bg-indigo-600/50 opacity-20 blur-[180px] rounded-full pointer-events-none z-0 animate-blob-2" />
        <motion.div
            initial={{ opacity: 0, y: 60, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.8, type: 'spring', damping: 20, stiffness: 80 }}
            viewport={{ once: true }}
            className="relative z-10 w-full max-w-7xl rounded-3xl p-[1px] bg-gradient-to-br from-slate-300 to-slate-400 dark:from-purple-500/40 dark:via-pink-500/40 dark:to-blue-500/40 shadow-xl shadow-slate-300/30 dark:shadow-slate-950/40"
        >
            <div className="w-full h-full rounded-3xl bg-gradient-to-br from-white/70 to-slate-100/60 dark:from-slate-900/90 dark:via-blue-950/80 dark:to-slate-900/90 backdrop-blur-lg p-8 sm:p-12 flex flex-col items-center gap-6">
                <div className="w-full max-w-lg text-center">
                    <motion.div initial="hidden" animate="visible" variants={{ visible: { transition: { staggerChildren: 0.1 } } }}>
                        <motion.div variants={{ hidden: { opacity: 0, scale: 0.5 }, visible: { opacity: 1, scale: 1 } }} className="flex justify-center mb-6">
                            <div className="p-4 bg-gradient-to-br from-white to-slate-200 dark:from-purple-600/30 dark:to-pink-600/30 rounded-2xl border border-slate-300/80 dark:border-white/10 shadow-md">
                                <ShieldCheck className="h-16 w-16 text-purple-600 dark:text-purple-300" />
                            </div>
                        </motion.div>
                        <motion.h2 variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="text-4xl z-10 sm:text-5xl font-extrabold bg-gradient-to-r from-purple-700 to-blue-600 dark:from-fuchsia-400 dark:via-pink-400 dark:to-orange-300 text-transparent bg-clip-text dark:[text-shadow:0_0_15px_rgba(244,114,182,0.4)]">
                            Lindungi Jejak Digitalmu
                        </motion.h2>
                        <motion.p variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="mt-4 mb-8 text-lg text-slate-600 dark:text-slate-400">
                            Jangan biarkan satu klik salah menghancurkan keamananmu. Masukkan URL mencurigakan di bawah untuk analisis instan.
                        </motion.p>
                        <motion.form onSubmit={handleCekLink} variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }} className="flex flex-col gap-4">
                            <div className="relative">
                                <Link className="absolute top-1/2 left-5 -translate-y-1/2 text-slate-400 dark:text-slate-500" />
                                <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://masukkan-link-mencurigakan.com" className="w-full py-4 pl-14 pr-5 rounded-xl border border-slate-300/70 dark:border-slate-700/80 bg-white/50 dark:bg-slate-800/50 text-slate-800 dark:text-slate-100 placeholder:text-slate-500 dark:placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-purple-500/50 focus:border-purple-500 transition-all duration-300" />
                            </div>
                            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02, y: -2 }} whileTap={{ scale: 0.98 }} className={`w-full py-4 rounded-xl text-white font-bold text-lg transition-all duration-300 flex items-center justify-center gap-2 group relative overflow-hidden ${ loading ? "bg-slate-500 dark:bg-slate-700/50 cursor-not-allowed" : "bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-bold text-lg shadow-lg shadow-indigo-500/30 transition" }`}>
                                <span className="absolute w-0 h-0 transition-all duration-300 ease-out bg-white/20 rounded-full group-hover:w-32 group-hover:h-32 opacity-10"></span>
                                <div className="relative flex items-center gap-2">{loading ? ( <><Loader2 className="animate-spin h-5 w-5" /> Menganalisis...</> ) : ( <><ShieldCheck className="h-5 w-5" /> Analisis Tautan</> )}</div>
                            </motion.button>
                        </motion.form>
                        <AnimatePresence mode="wait">
                            {loading && <ResultCardSkeleton />}
                            {result && <ResultCard result={result} />}
                        </AnimatePresence>
                        {result && (
                            <motion.button
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.5 }}
                                onClick={handleReset}
                                className="mt-6 flex items-center justify-center gap-2 text-sm text-slate-500 hover:text-slate-700 dark:text-slate-400 dark:hover:text-slate-200 transition-colors"
                            >
                                <RotateCcw className="h-4 w-4" />
                                Analisis Tautan Lain
                            </motion.button>
                        )}
                        {history.length > 0 && !loading && !result && (
                            <div className="mt-8 w-full text-left">
                                <h4 className="flex items-center gap-2 text-lg font-semibold text-slate-700 dark:text-slate-300">
                                    <History className="h-5 w-5" />
                                    Riwayat Analisis
                                </h4>
                                <ul className="mt-3 space-y-2">
                                    {history.map(item => (
                                        <li key={item.id} className="p-2 rounded-md hover:bg-slate-200 dark:hover:bg-slate-800/50 transition-colors">
                                            <button onClick={() => handleHistoryClick(item.url)} className="flex items-center justify-between w-full text-left">
                                                <span className="truncate w-4/5 text-sm text-slate-600 dark:text-slate-400">{item.url}</span>
                                                {item.status === 'safe' ? 
                                                    <span className="text-xs font-bold text-emerald-500">Aman</span> : 
                                                    <span className="text-xs font-bold text-rose-500">Bahaya</span>
                                                }
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
        </motion.div>
        <motion.a href="#simulasi" aria-label="Scroll ke section simulasi" initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 1, duration: 0.5}} className="absolute bottom-24 left-1/2 -translate-x-1/2 z-20">
            <motion.div animate={{ y: [0, 10, 0] }} transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}>
                <ChevronDown className="h-8 w-8 text-slate-500/80 dark:text-white/40"/>
            </motion.div>
        </motion.a>
        <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none z-10">
            <svg viewBox="0 0 1440 100" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg" className="block w-full">
                <path d="M1440,80 C1080,30,360,30,0,80 L0,120 L1440,120 Z" className="fill-[#cfd7ea] dark:fill-blue-950" />
            </svg>
        </div>
    </section>
  );
}