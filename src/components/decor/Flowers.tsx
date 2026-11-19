import { useMemo, type CSSProperties, type ReactElement } from 'react';

/* Deterministic PRNG so flower placement is stable between renders. */
function rng(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

const BUD = 'M0 0 C-2.5 -2.6 -2.7 -7.6 0 -11.5 C2.7 -7.6 2.5 -2.6 0 0 Z';
const JAS_PETAL = 'M0 0 C-2.6 -1.6 -3.2 -6 0 -7.8 C3.2 -6 2.6 -1.6 0 0 Z';

function Bud({ x, y, r, s = 1 }: { x: number; y: number; r: number; s?: number }) {
  return (
    <g transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${r.toFixed(1)}) scale(${s.toFixed(2)})`}>
      <path d={BUD} fill="url(#g-bud)" stroke="#D8D0B4" strokeWidth="0.35" />
      <path d="M-0.6 -2.5 C-1 -5 -0.8 -7.5 0 -9.5" stroke="#FFFFFF" strokeWidth="0.6" fill="none" opacity="0.9" />
      <circle cx="0" cy="0.4" r="1.1" fill="#9DAA6E" />
    </g>
  );
}

function JasmineFlower({ x, y, r = 0, s = 1 }: { x: number; y: number; r?: number; s?: number }) {
  return (
    <g transform={`translate(${x.toFixed(2)} ${y.toFixed(2)}) rotate(${r.toFixed(1)}) scale(${s.toFixed(2)})`}>
      {[0, 72, 144, 216, 288].map((a) => (
        <path key={a} d={JAS_PETAL} transform={`rotate(${a})`} fill="url(#g-jas-petal)" stroke="#DDD6BD" strokeWidth="0.3" />
      ))}
      <circle r="1.1" fill="#E7D9A6" />
    </g>
  );
}

/** A hanging string of mallipoo (jasmine) – paired buds with open flowers. */
export function JasmineString({ length = 240, seed = 1, className = '', style }: {
  length?: number; seed?: number; className?: string; style?: CSSProperties;
}) {
  const nodes = useMemo(() => {
    const rand = rng(seed);
    const out: ReactElement[] = [];
    let i = 0;
    for (let y = 6; y < length - 10; y += 6.2) {
      const wob = (rand() - 0.5) * 1.6;
      if (i % 7 === 5) {
        out.push(<JasmineFlower key={`f${i}`} x={13 + wob} y={y} r={rand() * 72} s={0.95 + rand() * 0.25} />);
      } else {
        out.push(<Bud key={`l${i}`} x={12 + wob} y={y} r={-100 - rand() * 28} s={0.9 + rand() * 0.25} />);
        out.push(<Bud key={`r${i}`} x={14 + wob} y={y + 1.5} r={100 + rand() * 28} s={0.9 + rand() * 0.25} />);
      }
      i++;
    }
    return out;
  }, [length, seed]);

  return (
    <svg className={className} viewBox={`0 0 26 ${length + 14}`} width="26" height={length + 14}
      style={{ display: 'block', overflow: 'visible', ...style }} aria-hidden="true" focusable="false">
      <path d={`M13 0 V${length}`} stroke="#B9AE88" strokeWidth="0.6" />
      {nodes}
      {/* gold bead + small tassel */}
      <circle cx="13" cy={length + 2} r="2.4" fill="url(#g-foil)" />
      <path d={`M11.2 ${length + 4} L13 ${length + 13} L14.8 ${length + 4} Z`} fill="#A82B45" />
    </svg>
  );
}

/** A draped jasmine swag between two points, sagging by `sag`. */
export function JasmineSwag({ width = 300, sag = 40, seed = 3, className = '', style }: {
  width?: number; sag?: number; seed?: number; className?: string; style?: CSSProperties;
}) {
  const nodes = useMemo(() => {
    const rand = rng(seed);
    const out: ReactElement[] = [];
    const steps = Math.round(width / 5.4);
    for (let k = 0; k <= steps; k++) {
      const t = k / steps;
      const x = t * width;
      const y = 6 + 4 * sag * t * (1 - t);
      const ang = (Math.atan2(4 * sag * (1 - 2 * t), width) * 180) / Math.PI;
      if (k % 9 === 4) {
        out.push(<JasmineFlower key={`f${k}`} x={x} y={y + 1} r={rand() * 72} s={1 + rand() * 0.2} />);
      } else {
        out.push(<Bud key={`u${k}`} x={x} y={y} r={ang + 180 - 18 - rand() * 22} s={0.9 + rand() * 0.25} />);
        out.push(<Bud key={`d${k}`} x={x + 1} y={y + 1.5} r={ang + 18 + rand() * 22} s={0.9 + rand() * 0.25} />);
      }
    }
    return out;
  }, [width, sag, seed]);

  return (
    <svg className={className} viewBox={`-8 -8 ${width + 16} ${sag + 28}`} width="100%"
      style={{ display: 'block', overflow: 'visible', ...style }} aria-hidden="true" focusable="false">
      {nodes}
    </svg>
  );
}

const PETAL_5 = 'M0 0 C-9 -5 -11 -21 0 -29 C11 -21 9 -5 0 0 Z';

export function Blossom({ size = 48, tone = 'pink', rotate = 0, style, className = '' }: {
  size?: number; tone?: 'pink' | 'white'; rotate?: number; style?: CSSProperties; className?: string;
}) {
  const fill = tone === 'pink' ? 'url(#g-blossom-pink)' : 'url(#g-blossom-white)';
  const edge = tone === 'pink' ? '#C76B80' : '#E2D6B8';
  return (
    <svg className={className} viewBox="-32 -32 64 64" width={size} height={size} aria-hidden="true" focusable="false"
      style={{ display: 'block', overflow: 'visible', ...style }}>
      <g transform={`rotate(${rotate})`}>
        {[0, 72, 144, 216, 288].map((a, i) => (
          <g key={a} transform={`rotate(${a + (i % 2 ? 4 : -3)})`}>
            <path d={PETAL_5} fill={fill} stroke={edge} strokeWidth="0.5" />
            <path d="M0 -3 C-0.6 -10 -0.4 -18 0 -24" stroke={edge} strokeWidth="0.45" fill="none" opacity="0.5" />
          </g>
        ))}
        <circle r="4.2" fill={tone === 'pink' ? '#F7E4A6' : '#F2D77A'} />
        {[0, 60, 120, 180, 240, 300].map((a) => (
          <circle key={a} cx={Math.cos((a * Math.PI) / 180) * 2.4} cy={Math.sin((a * Math.PI) / 180) * 2.4} r="0.8" fill="#B07A1E" />
        ))}
      </g>
    </svg>
  );
}

const ROSE_OUTER = 'M0 0 C-15 -3 -18 -24 -2 -30 C0 -31 2 -31 4 -30 C18 -24 15 -3 0 0 Z';

/** Deep red rose seen from above: three petal rings and a spiral heart. */
export function Rose({ size = 56, rotate = 0, style, className = '' }: {
  size?: number; rotate?: number; style?: CSSProperties; className?: string;
}) {
  return (
    <svg className={className} viewBox="-34 -34 68 68" width={size} height={size} aria-hidden="true" focusable="false"
      style={{ display: 'block', overflow: 'visible', ...style }}>
      <g transform={`rotate(${rotate})`}>
        {[0, 72, 144, 216, 288].map((a) => (
          <g key={`o${a}`} transform={`rotate(${a})`}>
            <path d={ROSE_OUTER} fill="url(#g-rose-outer)" />
            <path d="M-12 -24 C-6 -30 6 -31 12 -24" stroke="#E07C8C" strokeWidth="0.9" fill="none" opacity="0.55" />
          </g>
        ))}
        {[36, 108, 180, 252, 324].map((a) => (
          <path key={`m${a}`} d={ROSE_OUTER} transform={`rotate(${a}) scale(0.66)`} fill="url(#g-rose-outer)" stroke="#5A0C1C" strokeWidth="0.4" />
        ))}
        {[10, 130, 250].map((a) => (
          <path key={`i${a}`} d={ROSE_OUTER} transform={`rotate(${a}) scale(0.4)`} fill="url(#g-rose-inner)" stroke="#C04660" strokeWidth="0.5" />
        ))}
        <path d="M0 -5 C4 -5 5 0 2 2.5 C-1 4.5 -5 2 -4.5 -1.5 C-4 -5 1 -6.5 3 -3.5" fill="none" stroke="#C04660" strokeWidth="0.9" />
      </g>
    </svg>
  );
}

const LEAF = 'M0 0 C7 -10 7 -28 0 -40 C-7 -28 -7 -10 0 0 Z';

/**
 * Floral corner arrangement: leaves fanning from the corner, a rose,
 * arali blossoms and loose jasmine. Drawn for the top-left corner.
 */
export function FloralCorner({ size = 180, className = '', style }: {
  size?: number; className?: string; style?: CSSProperties;
}) {
  const buds = useMemo(() => {
    const rand = rng(11);
    return Array.from({ length: 22 }, (_, i) => ({
      x: 20 + rand() * 120 * (i % 2 ? 0.45 : 1),
      y: 20 + rand() * 120 * (i % 2 ? 1 : 0.45),
      r: rand() * 360,
      s: 0.9 + rand() * 0.4,
    }));
  }, []);
  return (
    <svg className={className} viewBox="0 0 200 200" width={size} height={size} aria-hidden="true" focusable="false"
      style={{ display: 'block', overflow: 'visible', pointerEvents: 'none', ...style }}>
      {[
        [6, 12, 98, 2.7], [12, 6, 172, 2.7], [8, 8, 120, 2.3], [8, 8, 150, 2.3], [30, 4, 86, 1.7], [4, 30, 184, 1.7],
      ].map(([x, y, r, s], i) => (
        <g key={i} transform={`translate(${x} ${y}) rotate(${r}) scale(${s})`}>
          <path d={LEAF} fill="url(#g-leaf)" />
          <path d="M0 -2 V-38" stroke="#7FA265" strokeWidth="0.7" opacity="0.7" />
        </g>
      ))}
      {buds.map((b, i) => (
        <g key={i} transform={`translate(${b.x} ${b.y}) rotate(${b.r}) scale(${b.s})`}>
          <path d={BUD} fill="url(#g-bud)" stroke="#D8D0B4" strokeWidth="0.35" />
          <circle cx="0" cy="0.4" r="1.1" fill="#9DAA6E" />
        </g>
      ))}
      <g transform="translate(46 46)">
        <g transform="scale(0.95)">
          {[0, 72, 144, 216, 288].map((a) => (
            <g key={a} transform={`rotate(${a})`}><path d={ROSE_OUTER} fill="url(#g-rose-outer)" /></g>
          ))}
          {[36, 108, 180, 252, 324].map((a) => (
            <path key={a} d={ROSE_OUTER} transform={`rotate(${a}) scale(0.66)`} fill="url(#g-rose-outer)" stroke="#5A0C1C" strokeWidth="0.4" />
          ))}
          {[10, 130, 250].map((a) => (
            <path key={a} d={ROSE_OUTER} transform={`rotate(${a}) scale(0.4)`} fill="url(#g-rose-inner)" stroke="#C04660" strokeWidth="0.5" />
          ))}
        </g>
      </g>
      {[
        { x: 104, y: 30, s: 0.7, t: 'pink', r: 12 },
        { x: 30, y: 106, s: 0.66, t: 'pink', r: -20 },
        { x: 92, y: 86, s: 0.55, t: 'white', r: 30 },
        { x: 140, y: 18, s: 0.42, t: 'white', r: 5 },
        { x: 18, y: 146, s: 0.4, t: 'white', r: 50 },
      ].map((b, i) => (
        <g key={i} transform={`translate(${b.x} ${b.y}) scale(${b.s}) rotate(${b.r})`}>
          {[0, 72, 144, 216, 288].map((a) => (
            <path key={a} d={PETAL_5} transform={`rotate(${a})`}
              fill={b.t === 'pink' ? 'url(#g-blossom-pink)' : 'url(#g-blossom-white)'}
              stroke={b.t === 'pink' ? '#C76B80' : '#E2D6B8'} strokeWidth="0.5" />
          ))}
          <circle r="4.2" fill="#F2D77A" />
        </g>
      ))}
    </svg>
  );
}

/** SVG marigold + mango-leaf toran, used only if garland3.png is missing. */
export function ToranFallback({ className = '', style }: { className?: string; style?: CSSProperties }) {
  const n = 26;
  return (
    <svg className={className} viewBox="0 0 1200 170" preserveAspectRatio="xMidYMin slice" width="100%"
      style={{ display: 'block', ...style }} aria-hidden="true" focusable="false">
      {Array.from({ length: 7 }, (_, g) => {
        const cx = 70 + g * 177;
        return (
          <g key={g} transform={`translate(${cx} 34)`}>
            {[-24, -10, 0, 10, 24].map((r, i) => (
              <g key={i} transform={`rotate(${r}) translate(${(i - 2) * 6} 0)`}>
                <path d="M0 0 C10 22 9 70 0 110 C-9 70 -10 22 0 0 Z" fill="url(#g-leaf)" />
                <path d="M0 4 V104" stroke="#86A86A" strokeWidth="1" opacity="0.6" />
              </g>
            ))}
          </g>
        );
      })}
      {Array.from({ length: n }, (_, i) => (
        <circle key={i} cx={24 + i * 46.5} cy={30 + (i % 2) * 3} r="24" fill={i % 2 ? 'url(#g-marigold-y)' : 'url(#g-marigold)'} />
      ))}
    </svg>
  );
}
