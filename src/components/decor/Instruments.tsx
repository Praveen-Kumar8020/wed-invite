import type { CSSProperties } from 'react';

/* Engraved gold line vocabulary shared with the lamp, pillar and arch. */
const L = { fill: 'none', stroke: '#A47A2C', strokeWidth: 1.5, strokeLinejoin: 'round', strokeLinecap: 'round' } as const;
const T = { fill: 'none', stroke: '#B48A3C', strokeWidth: 0.8, strokeLinecap: 'round', opacity: 0.85 } as const;
const WASH = { fill: 'url(#g-foil)', opacity: 0.16 } as const;

/** Nadaswaram drawn vertically, reed at top, brass bell at y≈304. */
function Nadaswaram() {
  const holes = [70, 92, 114, 136, 158, 180, 202];
  return (
    <g>
      {/* spare reeds hanging from the mouthpiece */}
      <path d="M20 22 C10 30 8 44 12 56" {...T} />
      <path d="M12 56 l-2.5 6 h5 Z" {...T} />
      {/* reed and kendai mouthpiece */}
      <path d="M18 0 H22 L23 12 H17 Z" {...L} />
      <path d="M16 12 H24 L25 26 H15 Z" {...WASH} />
      <path d="M16 12 H24 L25 26 H15 Z" {...L} />
      <path d="M14 26 H26 V30 H14 Z" {...L} />
      {/* conical body */}
      <path d="M13.5 30 H26.5 L32 250 H8 Z" {...WASH} />
      <path d="M13.5 30 H26.5 L32 250 H8 Z" {...L} />
      <path d="M16.5 36 L12.8 244" {...T} />
      <path d="M23.5 36 L27.2 244" {...T} opacity={0.4} />
      {/* turned rings */}
      {[44, 230, 244].map((y) => (
        <path key={y} d={`M${12.5 - (y - 30) * 0.025} ${y} h${15 + (y - 30) * 0.05} M${12.5 - (y - 30) * 0.025} ${y + 4} h${15 + (y - 30) * 0.05}`} {...T} />
      ))}
      {/* finger holes */}
      {holes.map((y) => (
        <ellipse key={y} cx="20" cy={y} rx="2.4" ry="2.8" {...L} strokeWidth={1.1} />
      ))}
      {/* flared bell (anaisu) with hatching */}
      <path d="M8 250 H32 C34 268 42 286 56 304 C46 311 -6 311 -16 304 C-2 286 6 268 8 250 Z" {...WASH} />
      <path d="M8 250 H32 C34 268 42 286 56 304 C46 311 -6 311 -16 304 C-2 286 6 268 8 250 Z" {...L} />
      <ellipse cx="20" cy="304" rx="36" ry="6" {...L} />
      {[-6, 2, 10, 18, 26, 34, 42].map((x) => (
        <path key={x} d={`M${20 + (x - 20) * 0.35} 254 Q${x} 280 ${x * 1.25 - 5} 300`} {...T} opacity={0.5} />
      ))}
    </g>
  );
}

/** Thavil barrel drum seen from the side with V-lacing, engraved in gold. */
function Thavil() {
  const laces = Array.from({ length: 9 }, (_, i) => 26 + i * 13);
  return (
    <g>
      {/* barrel shell */}
      <path d="M22 18 C40 10 116 10 134 18 C140 40 140 62 134 84 C116 92 40 92 22 84 C16 62 16 40 22 18 Z" {...WASH} opacity={0.2} />
      <path d="M22 18 C40 10 116 10 134 18 C140 40 140 62 134 84 C116 92 40 92 22 84 C16 62 16 40 22 18 Z" {...L} />
      {/* V lacing */}
      {laces.map((x) => (
        <path key={x} d={`M${x} 17 L${x + 6.5} 85 M${x + 13} 17 L${x + 6.5} 85`} {...T} />
      ))}
      {/* band */}
      <path d="M19 49 C40 55 116 55 137 49 M19 55 C40 61 116 61 137 55" {...L} strokeWidth={1.1} />
      {[34, 56, 78, 100, 122].map((x) => <circle key={x} cx={x} cy={55.5} r="1.3" fill="#B48A3C" />)}
      {/* facing head with tension ring */}
      <ellipse cx="22" cy="51" rx="14" ry="36" fill="#FFF8EC" />
      <ellipse cx="22" cy="51" rx="14" ry="36" {...L} />
      <ellipse cx="22" cy="51" rx="10.5" ry="30" {...T} />
      <ellipse cx="22" cy="51" rx="4" ry="10" {...T} />
      {/* far head rim */}
      <path d="M134 16 C142 28 142 74 134 86" {...L} />
      {/* carry strap */}
      <path d="M40 14 C60 -6 100 -6 120 14" {...L} />
      <path d="M43 15 C62 -2 98 -2 117 15" {...T} strokeDasharray="2 3" />
    </g>
  );
}

/**
 * Melam crest – two crossed Nadaswarams behind a Thavil, the ensemble that
 * plays the Getti Melam at the Muhurtham.
 */
export default function MelamCrest({ width = 240, className = '', style }: {
  width?: number; className?: string; style?: CSSProperties;
}) {
  return (
    <svg className={`melam-crest ${className}`} viewBox="0 -10 320 240" width={width}
      style={{ display: 'block', height: 'auto', overflow: 'visible', ...style }} aria-hidden="true" focusable="false">
      {/* bells raised outward, reeds meeting behind the drum */}
      <g transform="translate(160 120) rotate(146) scale(0.7) translate(-20 -150)"><Nadaswaram /></g>
      <g transform="translate(160 120) rotate(-146) scale(0.7) translate(-20 -150) translate(40 0) scale(-1 1)"><Nadaswaram /></g>
      <g transform="translate(82 112)"><Thavil /></g>
    </svg>
  );
}
