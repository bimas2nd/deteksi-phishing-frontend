// src/hooks/useLinkScanner.js

import { useState, useEffect, useRef } from "react";

// Fungsi helper ini kita pindahkan ke sini juga
const processApiResult = (apiData) => {
    if (!apiData || !apiData.data) { return { status: 'error', title: 'Hasil Tidak Valid', message: 'Respons dari API tidak valid.' };}
    const stats = apiData.data.attributes.last_analysis_stats;
    const categories = apiData.data.attributes.categories || {};
    if (stats.malicious === 0 && stats.suspicious === 0) { return { status: 'safe', title: 'Tautan Aman', message: 'Berdasarkan analisis, tautan ini tidak terindikasi berbahaya. Namun, web ini masih dalam tahap uji coba, selalu berhati-hati saat membuka link.' }; }
    const detectedThreats = new Set();
    for (const vendor in categories) {
      const category = categories[vendor].toLowerCase();
      if (category.includes('phishing')) detectedThreats.add('Phishing');
      if (category.includes('malware') || category.includes('malicious')) detectedThreats.add('Malware');
      if (category.includes('spyware')) detectedThreats.add('Spyware');
      if (category.includes('suspicious')) detectedThreats.add('Mencurigakan');
    }
    if (detectedThreats.size === 0) {
        if (stats.malicious > 0) detectedThreats.add('Malware');
        if (stats.suspicious > 0) detectedThreats.add('Mencurigakan');
    }
    const threatList = Array.from(detectedThreats).join(', ');
    const title = `Ancaman Terdeteksi: ${threatList}`;
    const message = `Sangat berbahaya! Tautan ini terindikasi sebagai ${threatList}. Jangan klik, karena berisiko mencuri data, menginstal virus, atau mengakses perangkat Anda (kamera, lokasi).`;
    return { status: 'phishing', title: title, message: message };
};


// Inilah Custom Hook kita
export default function useLinkScanner() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [history, setHistory] = useState([]);
  const intervalRef = useRef(null);

  useEffect(() => {
    return () => clearInterval(intervalRef.current);
  }, []);
  
  useEffect(() => { try { const savedHistory = localStorage.getItem('scanHistory'); if (savedHistory) { setHistory(JSON.parse(savedHistory)); } } catch (e) { console.error("Gagal memuat riwayat", e); }}, []);
  useEffect(() => { try { if (history.length > 0) { localStorage.setItem('scanHistory', JSON.stringify(history)); } } catch (e) { console.error("Gagal menyimpan riwayat", e); }}, [history]);

  const checkResult = async (analysisId) => {
    try {
      const response = await fetch(`http://localhost:8080/check-result/${analysisId}`);
      const data = await response.json();

      if (data.status === 'completed') {
        clearInterval(intervalRef.current);
        setLoading(false);
        const processedResult = processApiResult(data.data);
        setResult(processedResult);
        if (processedResult.status !== 'error') {
            const newHistoryItem = { url, status: processedResult.status, id: Date.now() };
            setHistory(prev => [newHistoryItem, ...prev.filter(item => item.url !== url)].slice(0, 5));
        }
      }
    } catch (err) {
      clearInterval(intervalRef.current);
      setLoading(false);
      setResult({ status: 'error', title: 'Gagal Memeriksa Hasil', message: 'Gagal menghubungi server untuk memeriksa hasil analisis.' });
    }
  };
  
  const startPolling = (analysisId) => {
      setResult({ status: 'pending', title: 'Analisis Dimulai...', message: 'Memeriksa hasil secara berkala, mohon tunggu...' });
      intervalRef.current = setInterval(() => {
          checkResult(analysisId);
      }, 10000);
  };

  const handleCekLink = async (e) => {
    e.preventDefault();
    clearInterval(intervalRef.current);
    const trimmedUrl = url.trim();
    if (!trimmedUrl) { setResult({ status: "error", title: "Input Kosong", message: "URL tidak boleh kosong." }); return; }
    
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('http://localhost:8080/scan-url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: trimmedUrl }),
      });
      const data = await response.json();

      if (data.status === 'completed') {
        setLoading(false);
        const processedResult = processApiResult(data.data);
        setResult(processedResult);
        if (processedResult.status !== 'error') {
            const newHistoryItem = { url: trimmedUrl, status: processedResult.status, id: Date.now() };
            setHistory(prev => [newHistoryItem, ...prev.filter(item => item.url !== trimmedUrl)].slice(0, 5));
        }
      } else if (data.status === 'pending') {
        startPolling(data.analysisId);
      } else {
        setLoading(false);
        setResult({ status: 'error', title: 'Analisis Gagal', message: data.message || 'Terjadi kesalahan.' });
      }
    } catch (err) {
      setLoading(false);
      setResult({ status: 'error', title: 'Koneksi Gagal', message: 'Tidak dapat terhubung ke server backend.' });
    }
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setUrl('');
    setResult(null);
    setLoading(false);
  };
  
  const handleHistoryClick = (historyUrl) => {
      clearInterval(intervalRef.current);
      setResult(null);
      setUrl(historyUrl);
  };

  return {
    url,
    setUrl,
    loading,
    result,
    history,
    handleCekLink,
    handleReset,
    handleHistoryClick
  };
}