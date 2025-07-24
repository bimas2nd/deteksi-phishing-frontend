// src/App.js (Setelah diperbaiki)

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EdukasiSection from './components/EdukasiSection';
import LinkChecker from './components/LinkChecker';
import PhishingSimulasiPopup from './components/PhishingSimulasiPopup';
import Footer from './components/Footer';

function App() {
 return (
  <div className="font-sans bg-white dark:bg-black">
   <Navbar />
   <Hero />
   <EdukasiSection />
   <LinkChecker />
   <PhishingSimulasiPopup />
    <Footer />
  </div>
 );
}

export default App;