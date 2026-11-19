import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SmartImage from './SmartImage';
import Pillar from './decor/Pillar';
import KuthuVilakku from './decor/Lamp';
import { Kalasam, LotusDivider } from './decor/Ornaments';
import { JasmineString, ToranFallback } from './decor/Flowers';

gsap.registerPlugin(ScrollTrigger);

/* The doors finish opening ~4.8s after load; copy arrives just behind them. */
const T0 = 3.4;
const ease = [0.16, 1, 0.3, 1] as const;
const rise = (d: number, y = 18) => ({
  initial: { opacity: 0, y },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1.1, delay: T0 + d, ease },
});

const STRINGS = [
  { len: 150, seed: 2, d: '6.2s', cls: '' },
  { len: 210, seed: 5, d: '7.4s', cls: 's-mid' },
  { len: 120, seed: 9, d: '5.6s', cls: 's-extra' },
  { len: 250, seed: 13, d: '8.1s', cls: 's-extra' },
];

export default function HeroSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const archRef = useRef<HTMLDivElement>(null);

  /* Scroll: walking through the mandapam entrance – pillars and leaves part
     outward, the toran lifts away, the arch recedes. Transform/opacity only. */
  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      const tl = gsap.timeline({
        defaults: { ease: 'none' },
        scrollTrigger: { trigger: section, start: 'top top', end: 'bottom top', scrub: 0.5 },
      });
      tl.to('.hero-side.left', { xPercent: -38, scale: 1.12, transformOrigin: '0% 100%' }, 0)
        .to('.hero-side.right', { xPercent: 38, scale: 1.12, transformOrigin: '100% 100%' }, 0)
        .to('.hero-toran', { yPercent: -60 }, 0)
        .to('.hero-strings', { y: -90 }, 0)
        .to('.hero-lamp', { y: 60, opacity: 0 }, 0)
        .to('.hero-stage', { y: -70, scale: 0.94, opacity: 0, transformOrigin: '50% 30%' }, 0)
        .to('.hero-bg', { yPercent: 8 }, 0);
    }, section);
    return () => mm.revert();
  }, []);

  /* Pointer depth: the arch tilts a few degrees toward the cursor (fine pointers only). */
  useEffect(() => {
    const section = sectionRef.current;
    const arch = archRef.current;
    if (!section || !arch) return;
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!fine || reduced) return;
    let raf = 0;
    let px = 0, py = 0;
    const onMove = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      px = (e.clientX - r.left) / r.width - 0.5;
      py = (e.clientY - r.top) / r.height - 0.5;
      if (!raf) raf = requestAnimationFrame(apply);
    };
    const apply = () => {
      raf = 0;
      arch.style.transform = `rotateY(${(px * 6).toFixed(2)}deg) rotateX(${(-py * 4).toFixed(2)}deg)`;
    };
    const onLeave = () => { px = 0; py = 0; if (!raf) raf = requestAnimationFrame(apply); };
    section.addEventListener('pointermove', onMove);
    section.addEventListener('pointerleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      section.removeEventListener('pointermove', onMove);
      section.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return (
    <section id="home" ref={sectionRef} className="hero">
      <div className="hero-bg silk-ivory" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />

      {/* Each decorative layer: outer div = scroll transform (GSAP),
          inner motion.div = entrance (framer), so the two never fight. */}

      {/* Mango-leaf & marigold toran */}
      <div className="hero-toran" aria-hidden="true">
        <motion.div initial={{ y: -60, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1.4, delay: T0 - 0.3, ease }}>
          <div className="sway" style={{ ['--sway-d' as string]: '9s' }}>
            <SmartImage src="/images/garland3.png" alt="Marigold toran garland" fallback="decor" fallbackNode={<ToranFallback />} />
          </div>
        </motion.div>
      </div>

      {/* Mallipoo strings hanging at both edges */}
      {(['left', 'right'] as const).map((side) => (
        <div key={side} className={`hero-strings ${side}`} aria-hidden="true">
          <motion.div className="strings-in"
            initial={{ y: -120, opacity: 0 }} animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.6, delay: T0 - 0.1, ease }}>
            {STRINGS.map((s, i) => (
              <div key={i} className={`sway ${s.cls}`}
                style={{ ['--sway-d' as string]: s.d, ['--sway-delay' as string]: `${-i * 1.3}s` }}>
                <JasmineString length={s.len} seed={s.seed + (side === 'right' ? 40 : 0)} />
              </div>
            ))}
          </motion.div>
        </div>
      ))}

      {/* Pillars wrapped in banana leaves – the mandapam entrance */}
      {(['left', 'right'] as const).map((side) => (
        <div key={side} className={`hero-side ${side}`} aria-hidden="true">
          <motion.div style={{ position: 'absolute', inset: 0 }}
            initial={{ opacity: 0, x: side === 'left' ? -40 : 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1.6, delay: T0 - 0.4, ease }}>
            <Pillar className="hero-pillar" />
            <div className="hero-leaf a breathe" style={{ ['--breathe' as string]: side === 'left' ? '-2deg' : '2deg' }}>
              <SmartImage src="/images/leaf3.png" alt={side === 'left' ? 'Banana leaves left' : 'Banana leaves right'} fallback="decor" loading="eager" />
            </div>
            <div className="hero-leaf b breathe" style={{ ['--breathe' as string]: side === 'left' ? '2.5deg' : '-2.5deg', animationDelay: '-3s' }}>
              <SmartImage src="/images/leaf1.png" alt={side === 'left' ? 'Banana leaf left accent' : 'Banana leaf right accent'} fallback="decor" loading="eager" />
            </div>
          </motion.div>
        </div>
      ))}

      {/* Lit kuthu vilakku at the threshold */}
      {(['left', 'right'] as const).map((side) => (
        <div key={side} className={`hero-lamp ${side}`} aria-hidden="true">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2, delay: T0 + 0.2, ease }}>
            <KuthuVilakku width={92} style={{ width: '100%' }} />
          </motion.div>
        </div>
      ))}

      {/* The arch and the invitation text */}
      <div className="hero-stage">
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.6, delay: T0 - 0.2, ease }}>
        <div ref={archRef} className="hero-arch">
          <div className="hero-arch-fill" aria-hidden="true" />
          <Kalasam width={40} className="hero-kalasam" />

          <div className="hero-copy">
            <motion.p className="hero-tamil" lang="ta" {...rise(0.1, 12)}>
              திருமண அழைப்பிதழ்
            </motion.p>

            <motion.p className="hero-std" {...rise(0.3, 10)}>
              SAVE THE DATE
            </motion.p>

            <motion.h1 className="hero-name"
              initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.4, delay: T0 + 0.5, ease }}>
              Karthikeyan
            </motion.h1>

            <motion.span className="hero-amp" aria-hidden="false"
              initial={{ opacity: 0, scale: 0.6, rotate: -20 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1.2, delay: T0 + 0.9, ease }}>
              &amp;
            </motion.span>

            <motion.h1 className="hero-name"
              initial={{ opacity: 0, y: 26, filter: 'blur(10px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ duration: 1.4, delay: T0 + 1.1, ease }}>
              Kaushika Bharathi
            </motion.h1>

            <motion.div style={{ margin: '22px 0 6px' }}
              initial={{ opacity: 0, scaleX: 0.3 }} animate={{ opacity: 1, scaleX: 1 }}
              transition={{ duration: 1.2, delay: T0 + 1.5, ease }}>
              <LotusDivider width={180} />
            </motion.div>

            <motion.p className="hero-date tabular" {...rise(1.65)}>06 · 12 · 2026</motion.p>
            <motion.p className="hero-time" {...rise(1.8, 10)}>SUNDAY · 10:30 AM – 12:00 NOON</motion.p>
            <motion.p className="hero-tag" {...rise(2.0, 10)}>A Beautiful Beginning of Forever</motion.p>
            <motion.p className="hero-venue" {...rise(2.15, 8)}>R.C. Mahal · Madurai, Tamil Nadu</motion.p>

            <motion.div className="hero-scroll" {...rise(2.5, 0)}>
              <p>Scroll to Discover</p>
              <span aria-hidden="true" />
            </motion.div>
          </div>
        </div>
        </motion.div>
      </div>

      <div className="hero-fade" aria-hidden="true" />
    </section>
  );
}
