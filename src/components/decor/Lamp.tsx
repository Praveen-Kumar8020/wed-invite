import type { CSSProperties } from 'react';

function Flame({ x, y, s = 1, i = 0 }: { x: number; y: number; s?: number; i?: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <circle cx="0" cy="-8" r="26" fill="url(#g-glow)" className="lamp-glow" style={{ animationDelay: `${i * -0.7}s` }} />
      <g className="lamp-flame" style={{ animationDelay: `${i * -0.37}s` }}>
        <path d="M0 -24 C-4 -15 -7 -9 -6 -4 C-5 1 -2.5 3 0 3 C2.5 3 5 1 6 -4 C7 -9 4 -15 0 -24 Z" fill="url(#g-flame)" />
        <path d="M0 -12 C-1.6 -8 -2.4 -5 -2 -2.5 C-1.6 0 -0.6 1 0 1 C0.6 1 1.6 0 2 -2.5 C2.4 -5 1.6 -8 0 -12 Z" fill="#FFFFFF" opacity="0.85" />
      </g>
      <rect x="-0.7" y="2" width="1.4" height="4" fill="#3B2410" />
    </g>
  );
}

/**
 * Kuthu vilakku – the tall brass oil lamp lit at Tamil weddings.
 * Drawn as gold foil with engraved detail lines; three visible wicks flicker.
 */
export default function KuthuVilakku({ width = 90, lit = true, className = '', style }: {
  width?: number; lit?: boolean; className?: string; style?: CSSProperties;
}) {
  const engrave = { fill: 'none', stroke: '#5E4114', strokeWidth: 0.8, opacity: 0.55 } as const;
  return (
    <svg className={`kuthu-vilakku ${className}`} viewBox="0 0 120 300" width={width}
      style={{ display: 'block', height: 'auto', overflow: 'visible', ...style }} aria-hidden="true" focusable="false">
      {/* Annam (swan) finial */}
      <path d="M60 8 C55 8 53 12 54 16 C55 19 58 20 58 24 C58 28 52 28 49 31 C46 34 48 38 53 38 L69 38 C74 38 76 33 72 29 C69 26 64 27 63 23 C62 20 65 18 65 14 C65 10 63 8 60 8 Z" fill="url(#g-foil)" />
      <path d="M65 12 L70 10.5 L66 14.5 Z" fill="#A88238" />
      <circle cx="61.5" cy="12.5" r="0.9" fill="#3B2410" />
      <path d="M52 34 Q60 30 70 33" {...engrave} />
      <path d="M50 40 H70 L68 46 H52 Z" fill="url(#g-foil-h)" />
      <rect x="57" y="46" width="6" height="34" fill="url(#g-foil-h)" />
      <ellipse cx="60" cy="58" rx="6.5" ry="2.4" fill="#A88238" />
      <ellipse cx="60" cy="70" rx="6.5" ry="2.4" fill="#A88238" />

      {/* Bowl with five spouts (three visible) */}
      <path d="M10 92 C24 88 40 84 60 84 C80 84 96 88 110 92 C104 108 86 118 60 118 C34 118 16 108 10 92 Z" fill="url(#g-foil)" />
      <path d="M14 93 C30 97 45 99 60 99 C75 99 90 97 106 93" {...engrave} />
      <path d="M22 104 C34 110 48 112 60 112 C72 112 86 110 98 104" {...engrave} />
      <path d="M4 90 L16 88 L16 95 Z" fill="url(#g-foil)" />
      <path d="M116 90 L104 88 L104 95 Z" fill="url(#g-foil)" />
      <path d="M54 82 L60 76 L66 82 Z" fill="url(#g-foil)" />
      <ellipse cx="60" cy="86" rx="40" ry="4" fill="#4A2E0C" opacity="0.55" />

      {/* Stem with turned rings */}
      <path d="M52 118 H68 L65 126 H55 Z" fill="url(#g-foil-h)" />
      <rect x="55.5" y="126" width="9" height="116" fill="url(#g-foil-h)" />
      {[140, 168, 196, 224].map((y) => (
        <g key={y}>
          <ellipse cx="60" cy={y} rx="11" ry="4" fill="url(#g-foil)" />
          <ellipse cx="60" cy={y - 1} rx="11" ry="2.2" fill="none" stroke="#F3E2AE" strokeWidth="0.6" opacity="0.7" />
        </g>
      ))}
      <path d="M57.5 128 V240" stroke="#F8EBC2" strokeWidth="1.2" opacity="0.55" />

      {/* Tiered base */}
      <path d="M48 242 H72 C74 248 78 252 86 256 H34 C42 252 46 248 48 242 Z" fill="url(#g-foil)" />
      <ellipse cx="60" cy="258" rx="30" ry="5" fill="url(#g-foil)" />
      <path d="M26 262 C30 270 40 276 60 276 C80 276 90 270 94 262 Z" fill="url(#g-foil)" />
      <path d="M32 266 Q60 274 88 266" {...engrave} />
      <ellipse cx="60" cy="283" rx="44" ry="7" fill="url(#g-foil)" />
      <ellipse cx="60" cy="281.5" rx="44" ry="4" fill="none" stroke="#F3E2AE" strokeWidth="0.7" opacity="0.6" />
      <ellipse cx="60" cy="292" rx="40" ry="4" fill="#3B2410" opacity="0.18" />

      {lit && (
        <>
          <Flame x={8} y={88} s={0.85} i={0} />
          <Flame x={60} y={78} s={1} i={1} />
          <Flame x={112} y={88} s={0.85} i={2} />
        </>
      )}
    </svg>
  );
}
