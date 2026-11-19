import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LotusDivider } from './decor/Ornaments';

const navLinks = [
  { label: 'Home', href: '#home' },
  { label: 'The Couple', href: '#couple' },
  { label: 'Wedding', href: '#wedding' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'Venue', href: '#venue' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 60);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  /* Lock page scroll and allow Escape while the mobile menu is open */
  useEffect(() => {
    if (!isMobileOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') setIsMobileOpen(false); };
    window.addEventListener('keydown', onKey);
    return () => { document.body.style.overflow = prev; window.removeEventListener('keydown', onKey); };
  }, [isMobileOpen]);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    setIsMobileOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <motion.nav
        className={`nav${isScrolled ? ' scrolled' : ''}`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay: 4.2, ease: [0.16, 1, 0.3, 1] }}
        aria-label="Primary"
      >
        <div className="nav-row">
          {/* Monogram */}
          <a href="#home" onClick={e => handleNav(e, '#home')} className="nav-mono">
            K <em>&</em> K
          </a>

          {/* Desktop links */}
          <div className="nav-links">
            {navLinks.map(link => (
              <a key={link.href} href={link.href} onClick={e => handleNav(e, link.href)} className="nav-link">
                {link.label}
              </a>
            ))}
          </div>

          {/* Hamburger */}
          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="nav-burger"
            aria-label="Toggle menu"
            aria-expanded={isMobileOpen}
          >
            <svg width="24" height="16" viewBox="0 0 24 16" fill="currentColor" aria-hidden="true">
              <rect y="0" width="24" height="1.5" rx="0.75" />
              <rect x="6" y="7" width="18" height="1.5" rx="0.75" />
              <rect y="14" width="24" height="1.5" rx="0.75" />
            </svg>
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay */}
      <AnimatePresence>
        {isMobileOpen && (
          <motion.div
            className="menu-sheet silk-maroon"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.55, ease: [0.65, 0, 0.35, 1] }}
            role="dialog"
            aria-modal="true"
            aria-label="Menu"
          >
            <button className="menu-close" onClick={() => setIsMobileOpen(false)} aria-label="Close menu">
              <svg width="20" height="20" viewBox="0 0 20 20" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M3 3 L17 17 M17 3 L3 17" /></svg>
            </button>

            <p className="menu-label">MENU</p>
            {navLinks.map((link, i) => (
              <motion.div key={link.href}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.07, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              >
                <a href={link.href} onClick={e => handleNav(e, link.href)} className="menu-link">
                  {link.label}
                </a>
              </motion.div>
            ))}
            <div style={{ marginTop: 40, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
              <LotusDivider width={130} tone="light" />
              <p className="f-caps" style={{ color: 'rgba(232,213,163,0.75)', fontSize: 12, letterSpacing: '0.45em' }}>
                06 · 12 · 2026
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
