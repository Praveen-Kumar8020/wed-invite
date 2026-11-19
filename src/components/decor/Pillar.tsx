import type { CSSProperties } from 'react';

/**
 * Mandapam pillar in engraved gold: plinth, carved shaft sections, and the
 * pothigai bracket capital with the hanging poomottu (banana-flower bud).
 */
export default function Pillar({ className = '', style }: { className?: string; style?: CSSProperties }) {
  const line = { fill: 'none', stroke: '#B48A3C', strokeWidth: 1.1 } as const;
  const thin = { fill: 'none', stroke: '#B48A3C', strokeWidth: 0.6, opacity: 0.7 } as const;
  return (
    <svg className={className} viewBox="0 0 120 640" preserveAspectRatio="xMidYMax meet"
      style={{ display: 'block', ...style }} aria-hidden="true" focusable="false">
      {/* Pothigai bracket capital */}
      <path d="M6 18 H114 V30 H6 Z" fill="url(#g-foil-h)" opacity="0.9" />
      <path d="M14 30 H106 C106 44 98 50 90 52 H30 C22 50 14 44 14 30 Z" fill="url(#g-foil)" opacity="0.32" />
      <path d="M14 30 H106 C106 44 98 50 90 52 H30 C22 50 14 44 14 30 Z" {...line} />
      <path d="M22 36 C30 46 38 46 44 42 M98 36 C90 46 82 46 76 42" {...thin} />
      {/* poomottu buds */}
      {[22, 98].map((x) => (
        <g key={x}>
          <path d={`M${x} 52 V58`} {...line} />
          <path d={`M${x} 58 C${x - 6} 64 ${x - 6} 74 ${x} 82 C${x + 6} 74 ${x + 6} 64 ${x} 58 Z`} fill="url(#g-foil-v)" />
          <path d={`M${x - 3.5} 66 Q${x} 70 ${x + 3.5} 66 M${x - 3} 73 Q${x} 76 ${x + 3} 73`} stroke="#6E4E18" strokeWidth="0.6" fill="none" />
        </g>
      ))}
      <rect x="2" y="8" width="116" height="10" fill="url(#g-foil-h)" />

      {/* Shaft */}
      <path d="M36 52 H84 V600 H36 Z" fill="url(#g-foil-h)" opacity="0.13" />
      <path d="M36 52 V600 M84 52 V600" {...line} />
      <path d="M42 60 V592 M78 60 V592" {...thin} />
      {/* carved square blocks (sathuram) with lotus medallions */}
      {[110, 300, 490].map((y) => (
        <g key={y}>
          <rect x="30" y={y} width="60" height="60" fill="url(#g-foil)" opacity="0.22" />
          <rect x="30" y={y} width="60" height="60" {...line} />
          <rect x="35" y={y + 5} width="50" height="50" {...thin} />
          <circle cx="60" cy={y + 30} r="14" {...line} />
          {Array.from({ length: 8 }, (_, k) => {
            const a = (k * Math.PI) / 4;
            return (
              <ellipse key={k} cx={60 + Math.cos(a) * 8} cy={y + 30 + Math.sin(a) * 8} rx="4.5" ry="2"
                transform={`rotate(${(k * 45)} ${60 + Math.cos(a) * 8} ${y + 30 + Math.sin(a) * 8})`}
                fill="#C49A45" opacity="0.55" />
            );
          })}
          <circle cx="60" cy={y + 30} r="3" fill="#C49A45" />
        </g>
      ))}
      {/* octagonal transitions (kattu) */}
      {[200, 390].map((y) => (
        <g key={y}>
          <path d={`M36 ${y} L44 ${y + 10} H76 L84 ${y} M36 ${y + 80} L44 ${y + 70} H76 L84 ${y + 80}`} {...thin} />
          <path d={`M60 ${y + 16} C54 ${y + 26} 54 ${y + 40} 60 ${y + 50} C66 ${y + 40} 66 ${y + 26} 60 ${y + 16} Z`} {...thin} />
        </g>
      ))}
      {/* Plinth */}
      <path d="M26 600 H94 V612 H26 Z" fill="url(#g-foil-h)" opacity="0.7" />
      <path d="M18 612 H102 V624 H18 Z" fill="url(#g-foil-h)" opacity="0.55" />
      <path d="M10 624 H110 V640 H10 Z" fill="url(#g-foil-h)" opacity="0.45" />
    </svg>
  );
}
