import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/**
 * Page-wide scroll choreography, started once content is visible.
 *  - [data-reveal]  → one IntersectionObserver adds .is-in (CSS does the motion)
 *  - [data-speed]   → GSAP scrubbed parallax on decorative layers (transform only)
 * Everything is torn down on unmount.
 */
export function useCinematics(active: boolean) {
  useEffect(() => {
    if (!active) return;

    /* Clip-path reveals start fully clipped, and a fully clipped element never
       reports as intersecting – so those are observed through their parent. */
    const revealEls = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const targets = new Map<Element, HTMLElement[]>();
    for (const el of revealEls) {
      const clipped = el.dataset.reveal === 'clip' || el.dataset.reveal === 'curtain';
      const watch = (clipped && el.parentElement) || el;
      const list = targets.get(watch);
      if (list) list.push(el); else targets.set(watch, [el]);
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            targets.get(e.target)?.forEach((el) => el.classList.add('is-in'));
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    );
    targets.forEach((_, watch) => io.observe(watch));

    const mm = gsap.matchMedia();
    mm.add(
      {
        motion: '(prefers-reduced-motion: no-preference)',
        small: '(max-width: 767px)',
      },
      (ctx) => {
        const { motion, small } = ctx.conditions as { motion: boolean; small: boolean };
        if (!motion) return;
        const range = small ? 50 : 110;
        gsap.utils.toArray<HTMLElement>('[data-speed]').forEach((el) => {
          const speed = parseFloat(el.dataset.speed || '0');
          const trigger = el.closest('section, footer') ?? el;
          gsap.fromTo(
            el,
            { y: -speed * range },
            {
              y: speed * range,
              ease: 'none',
              scrollTrigger: { trigger, start: 'top bottom', end: 'bottom top', scrub: 0.6 },
            },
          );
        });
      },
    );

    const refresh = window.setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      window.clearTimeout(refresh);
      io.disconnect();
      mm.revert();
    };
  }, [active]);
}
