import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import SmartImage from './SmartImage';
import SectionHeading from './SectionHeading';

const images = [
  { src: '/images/1.jpeg', alt: 'Together at carved door' },
  { src: '/images/2.jpeg', alt: 'Purple traditional attire' },
  { src: '/images/4.jpeg', alt: 'Intimate couple portrait' },
  { src: '/images/3.jpeg', alt: 'Couple dancing' },
  { src: '/images/animate.jpeg', alt: 'Artistic illustration' },
  { src: '/images/candid.jpeg', alt: 'Karthikeyan portrait' },
  { src: '/images/couplepic.jpeg', alt: 'Kaushika Bharathi portrait' },
];

export default function Gallery() {
  const [light, setLight] = useState<number | null>(null);

  const goNext = () => setLight(p => p !== null ? (p + 1) % images.length : null);
  const goPrev = () => setLight(p => p !== null ? (p - 1 + images.length) % images.length : null);

  /* Keyboard support while the lightbox is open */
  useEffect(() => {
    if (light === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setLight(null);
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'ArrowLeft') goPrev();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [light]);

  return (
    <section id="gallery" className="panel silk-ivory">
      <div className="panel-inner center">
        <SectionHeading title="OUR GALLERY" sub="Captured Moments" />

        <div className="gallery-grid" style={{ gridAutoFlow: 'dense' }}>
          {images.map((img, i) => {
            const isTall = i === 0 || i === 3;
            return (
              <button
                key={i}
                type="button"
                className={`gallery-item${isTall ? ' tall' : ''}${i === 2 ? ' wide-sm' : ''}`}
                data-reveal={i % 3 === 1 ? 'tilt' : 'clip'}
                style={{ ['--d' as string]: (i % 3) * 120 }}
                onClick={() => setLight(i)}
                aria-label={img.alt}
              >
                <SmartImage src={img.src} alt={img.alt} loading="lazy" decoding="async" />
                <span className="veil" aria-hidden="true"><span>VIEW</span></span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {light !== null && (
          <motion.div
            className="lightbox"
            role="dialog"
            aria-modal="true"
            aria-label={images[light].alt}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setLight(null)}
          >
            <button className="lb-btn lb-close" onClick={() => setLight(null)} aria-label="Close">
              <svg width="18" height="18" viewBox="0 0 18 18" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M2 2 L16 16 M16 2 L2 16" /></svg>
            </button>

            <button className="lb-btn lb-prev" onClick={e => { e.stopPropagation(); goPrev(); }} aria-label="Previous">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M11.5 3 L5.5 9 L11.5 15" /></svg>
            </button>

            <button className="lb-btn lb-next" onClick={e => { e.stopPropagation(); goNext(); }} aria-label="Next">
              <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M6.5 3 L12.5 9 L6.5 15" /></svg>
            </button>

            <motion.div
              key={light}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              onClick={e => e.stopPropagation()}
            >
              <SmartImage src={images[light].src} alt={images[light].alt} className="lb-img" frameStyle={{ width: 'min(80vw, 520px)', height: 'auto', aspectRatio: '3 / 4' }} />
            </motion.div>

            <div className="lb-count tabular">
              {light + 1} / {images.length}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
