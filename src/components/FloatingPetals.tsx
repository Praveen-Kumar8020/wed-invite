import { useEffect, useRef } from 'react';

/* ------------------------------------------------------------------
   Rose petals falling through the page.
   - Petals are pre-rendered once to small offscreen sprites (gradient
     body, curl shading, veins), then only drawImage'd per frame.
   - Each petal has its own depth (z): size, fall speed, opacity and how
     strongly it reacts to page scroll all scale with z – near petals
     race past when you scroll, far ones barely move.
   - A layered wind function gives slow drift plus occasional gusts.
   - 3D tumble = scaling the sprite's minor axis by cos(flip phase).
   ------------------------------------------------------------------ */

type Palette = [string, string, string];
const PALETTES: { c: Palette; w: number }[] = [
  { c: ['#4E0816', '#9A1A31', '#C9465C'], w: 0.42 }, // deep red rose
  { c: ['#6A0E22', '#B5263F', '#DE6A82'], w: 0.16 }, // crimson
  { c: ['#B9606F', '#EBB0BA', '#F9E0E3'], w: 0.3 },  // blush
  { c: ['#CFC2A6', '#F3ECDF', '#FFFFFF'], w: 0.12 }, // white rose
];

const SPRITE = 64;

function makeSprite([base, mid, edge]: Palette, variant: number): HTMLCanvasElement {
  const cv = document.createElement('canvas');
  cv.width = cv.height = SPRITE;
  const g = cv.getContext('2d')!;
  const w = 0.9 + variant * 0.12; // petal width variety
  g.translate(32, 32);
  g.scale(w, 1);
  g.translate(-32, -32);

  const petal = new Path2D();
  petal.moveTo(32, 60);
  petal.bezierCurveTo(9, 53, 3, 27, 17, 11);
  petal.bezierCurveTo(23, 4, 29, 6, 32, 10);
  petal.bezierCurveTo(35, 6, 41, 4, 47, 11);
  petal.bezierCurveTo(61, 27, 55, 53, 32, 60);

  const body = g.createRadialGradient(32, 52, 2, 32, 34, 34);
  body.addColorStop(0, base);
  body.addColorStop(0.45, mid);
  body.addColorStop(1, edge);
  g.fillStyle = body;
  g.fill(petal);

  g.save();
  g.clip(petal);
  // curl: one side in shadow, the other catching light
  const curl = g.createLinearGradient(4, 0, 60, 0);
  curl.addColorStop(0, 'rgba(30,0,8,0.28)');
  curl.addColorStop(0.45, 'rgba(255,255,255,0)');
  curl.addColorStop(0.75, 'rgba(255,255,255,0.16)');
  curl.addColorStop(1, 'rgba(30,0,8,0.12)');
  g.fillStyle = curl;
  g.fillRect(0, 0, SPRITE, SPRITE);
  // soft sheen near the rim
  const sheen = g.createRadialGradient(36, 18, 1, 36, 18, 18);
  sheen.addColorStop(0, 'rgba(255,255,255,0.22)');
  sheen.addColorStop(1, 'rgba(255,255,255,0)');
  g.fillStyle = sheen;
  g.fillRect(0, 0, SPRITE, SPRITE);
  // veins
  g.strokeStyle = 'rgba(40,0,10,0.12)';
  g.lineWidth = 0.6;
  for (let k = -3; k <= 3; k++) {
    g.beginPath();
    g.moveTo(32, 58);
    g.quadraticCurveTo(32 + k * 4, 36, 32 + k * 7.5, 14 + Math.abs(k) * 2.5);
    g.stroke();
  }
  g.restore();

  g.strokeStyle = 'rgba(255,255,255,0.18)';
  g.lineWidth = 0.8;
  g.stroke(petal);
  return cv;
}

interface Petal {
  x: number; y: number; z: number; size: number;
  vy: number; rot: number; spin: number;
  flip: number; flipSpeed: number;
  swayAmp: number; swayFreq: number; swayPhase: number;
  sprite: number;
}

export default function FloatingPetals() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const nav = navigator as Navigator & { deviceMemory?: number };
    const lowPower = (nav.hardwareConcurrency ?? 8) <= 4 || (nav.deviceMemory ?? 8) <= 4;
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    let W = 0, H = 0;

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
    };
    resize();

    const small = W < 768;
    const count = lowPower ? (small ? 6 : 10) : small ? 9 : 16;

    // weighted palette pick → sprite bank
    const sprites: HTMLCanvasElement[] = [];
    const weights: number[] = [];
    PALETTES.forEach((p, i) => {
      for (let v = 0; v < 2; v++) { sprites.push(makeSprite(p.c, v + i * 0.3)); weights.push(p.w / 2); }
    });
    const pick = () => {
      let r = Math.random();
      for (let i = 0; i < weights.length; i++) { r -= weights[i]; if (r <= 0) return i; }
      return 0;
    };

    const spawn = (p: Partial<Petal> = {}, top = false): Petal => {
      const z = 0.35 + Math.random() * 0.65;
      const size = (small ? 10 : 12) + z * (small ? 12 : 18);
      return {
        x: Math.random() * W,
        y: top ? -size - Math.random() * H * 0.3 : Math.random() * H,
        z, size,
        vy: 22 + z * 42 + Math.random() * 10,            // px / second
        rot: Math.random() * Math.PI * 2,
        spin: (Math.random() - 0.5) * 1.6,
        flip: Math.random() * Math.PI * 2,
        flipSpeed: 0.8 + Math.random() * 2.2,
        swayAmp: 14 + Math.random() * 30,
        swayFreq: 0.35 + Math.random() * 0.6,
        swayPhase: Math.random() * Math.PI * 2,
        sprite: pick(),
        ...p,
      };
    };

    let petals = Array.from({ length: count }, () => spawn());
    petals.sort((a, b) => a.z - b.z); // far petals drawn first

    let lastScroll = window.scrollY;
    let scrollKick = 0;
    const onScroll = () => {
      const y = window.scrollY;
      scrollKick += y - lastScroll;
      lastScroll = y;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', resize);

    let raf = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const dt = Math.min((now - last) / 1000, 0.05);
      last = now;
      const t = now / 1000;
      // layered wind: slow drift + mid swell + occasional gust
      const gust = Math.max(0, Math.sin(t * 0.21 + 0.7)) ** 6 * 46;
      const wind = Math.sin(t * 0.23) * 16 + Math.sin(t * 0.71 + 1.3) * 7 + gust;
      const kick = Math.max(-80, Math.min(80, scrollKick));
      scrollKick = 0;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of petals) {
        p.y += p.vy * dt - kick * (0.12 + p.z * 0.55);
        p.x += (wind * (0.4 + p.z * 0.6)) * dt
          + Math.cos(t * p.swayFreq + p.swayPhase) * p.swayAmp * p.swayFreq * dt;
        p.rot += (p.spin + gust * 0.01) * dt;
        p.flip += p.flipSpeed * dt;

        if (p.y > H + p.size * 2) Object.assign(p, spawn({ z: p.z, size: p.size, sprite: p.sprite }, true), { x: Math.random() * W });
        if (p.y < -H * 0.4) p.y = H + p.size;
        if (p.x > W + 40) p.x = -40;
        if (p.x < -40) p.x = W + 40;

        const fy = Math.cos(p.flip);
        const sy = (Math.abs(fy) < 0.14 ? 0.14 * Math.sign(fy || 1) : fy);
        const sx = 0.85 + Math.sin(p.flip * 0.7) * 0.15;
        const c = Math.cos(p.rot), s = Math.sin(p.rot);
        ctx.setTransform(c * sx * dpr, s * sx * dpr, -s * sy * dpr, c * sy * dpr, p.x * dpr, p.y * dpr);
        ctx.globalAlpha = 0.5 + p.z * 0.45;
        ctx.drawImage(sprites[p.sprite], -p.size / 2, -p.size / 2, p.size, p.size);
      }
      ctx.globalAlpha = 1;
      raf = requestAnimationFrame(tick);
    };

    const onVisibility = () => {
      if (document.hidden) { cancelAnimationFrame(raf); raf = 0; }
      else if (!raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
    };
    document.addEventListener('visibilitychange', onVisibility);
    raf = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(raf);
      petals = [];
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return <canvas ref={canvasRef} className="petal-canvas" aria-hidden="true" />;
}
