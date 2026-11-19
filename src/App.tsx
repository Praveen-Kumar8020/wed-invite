import { useEffect, useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Navbar from './components/Navbar';
import HeroSection from './components/HeroSection';
import CoupleSection from './components/CoupleSection';
import WeddingDetails from './components/WeddingDetails';
import Countdown from './components/Countdown';
import Gallery from './components/Gallery';
import Venue from './components/Venue';
import FinalInvitation from './components/FinalInvitation';
import FloatingPetals from './components/FloatingPetals';
import MusicToggle from './components/MusicToggle';
import Preloader from './components/Preloader';
import Defs from './components/decor/Defs';
import { LotusDivider, ZariBorder } from './components/decor/Ornaments';
import { useCinematics } from './hooks/useCinematics';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    // Content fades in just before the doors part, so the mandapam is
    // already standing behind them when they open.
    const t2 = setTimeout(() => {
      setShowContent(true);
      ScrollTrigger.refresh();
    }, 2800);
    const t1 = setTimeout(() => setIsLoaded(true), 3000);
    return () => { clearTimeout(t1); clearTimeout(t2); };
  }, []);

  useCinematics(showContent);

  return (
    <>
      <Defs />

      <AnimatePresence>
        {!isLoaded && <Preloader key="preloader" />}
      </AnimatePresence>

      <div style={{
        opacity: showContent ? 1 : 0,
        transition: 'opacity 0.6s ease',
        minHeight: '100vh',
      }}>
        <Navbar />
        <FloatingPetals />
        <MusicToggle />

        <main>
          <HeroSection />
          <CoupleSection />
          <WeddingDetails />
          <Countdown />
          <Gallery />
          <Venue />
          <FinalInvitation />
        </main>

        {/* Footer */}
        <footer className="footer">
          <ZariBorder className="zari-edge top" />
          <p className="footer-names">
            KARTHIKEYAN & KAUSHIKA BHARATHI
          </p>
          <p className="footer-date tabular">
            06 · 12 · 2026
          </p>
          <div style={{ margin: '8px auto 4px' }}><LotusDivider width={120} tone="light" /></div>
          <p className="footer-love">
            Made with love ♥
          </p>
        </footer>
      </div>
    </>
  );
}

export default App;
