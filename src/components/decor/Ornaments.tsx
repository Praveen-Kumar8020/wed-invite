import type { CSSProperties } from 'react';

/** Kanchipuram temple border band (gopuram triangles in gold zari). */
export function ZariBorder({ flip = false, className = '', style }: {
  flip?: boolean; className?: string; style?: CSSProperties;
}) {
  return (
    <svg className={`zari-border ${className}`} aria-hidden="true" focusable="false"
      width="100%" height="40" preserveAspectRatio="none"
      style={{ display: 'block', transform: flip ? 'scaleY(-1)' : undefined, ...style }}>
      <rect width="100%" height="40" fill="url(#p-temple)" />
    </svg>
  );
}

/** Fine running zari line, used for quieter transitions on ivory. */
export function ZariFine({ className = '', style }: { className?: string; style?: CSSProperties }) {
  return (
    <svg className={className} aria-hidden="true" focusable="false" width="100%" height="10"
      style={{ display: 'block', ...style }}>
      <rect width="100%" height="10" fill="url(#p-zari-fine)" />
    </svg>
  );
}

/** Lotus medallion flanked by tapering gold rules – the section divider. */
export function LotusDivider({ width = 220, tone = 'gold', className = '' }: {
  width?: number; tone?: 'gold' | 'light'; className?: string;
}) {
  const c = tone === 'gold' ? '#C49A45' : '#E8D5A3';
  return (
    <svg className={`lotus-divider ${className}`} viewBox="0 0 220 28" width={width}
      style={{ maxWidth: '100%', height: 'auto', display: 'block' }} aria-hidden="true" focusable="false">
      <path d="M0 14 H78" stroke={c} strokeWidth="0.8" opacity="0.55" />
      <path d="M142 14 H220" stroke={c} strokeWidth="0.8" opacity="0.55" />
      <path d="M60 14 H84" stroke={c} strokeWidth="1.4" />
      <path d="M136 14 H160" stroke={c} strokeWidth="1.4" />
      <circle cx="88" cy="14" r="1.6" fill={c} />
      <circle cx="132" cy="14" r="1.6" fill={c} />
      {/* lotus */}
      <g fill="none" stroke={c} strokeWidth="1" strokeLinejoin="round">
        <path d="M110 4 C104 10 104 18 110 23 C116 18 116 10 110 4 Z" fill={c} fillOpacity="0.18" />
        <path d="M110 23 C101 22 96 16 95 9 C101 11 106 15 110 23 Z" />
        <path d="M110 23 C119 22 124 16 125 9 C119 11 114 15 110 23 Z" />
        <path d="M110 23 C100 25 94 22 90 17 C97 16 104 18 110 23 Z" />
        <path d="M110 23 C120 25 126 22 130 17 C123 16 116 18 110 23 Z" />
      </g>
    </svg>
  );
}

/** Corner flourish for gold frames (paisley curl + bud). Rotate per corner. */
export function GoldCorner({ size = 64, tone = 'gold', style, className = '' }: {
  size?: number; tone?: 'gold' | 'light'; style?: CSSProperties; className?: string;
}) {
  const c = tone === 'gold' ? '#C49A45' : '#D9BE7C';
  return (
    <svg className={className} viewBox="0 0 64 64" width={size} height={size} aria-hidden="true" focusable="false"
      style={{ position: 'absolute', pointerEvents: 'none', ...style }}>
      <g fill="none" stroke={c} strokeLinecap="round">
        <path d="M2 62 V12 Q2 2 12 2 H62" strokeWidth="1.3" />
        <path d="M7 62 V16 Q7 7 16 7 H62" strokeWidth="0.7" opacity="0.6" />
        <path d="M13 13 C22 13 26 19 24 25 C22 30 15 29 15 24 C15 20 20 19 21 22" strokeWidth="1.1" />
        <path d="M24 25 C30 24 36 27 40 34" strokeWidth="0.8" opacity="0.7" />
        <path d="M25 24 C25 30 28 36 34 40" strokeWidth="0.8" opacity="0.7" />
      </g>
      <circle cx="13" cy="13" r="2.2" fill={c} />
      <path d="M44 7 L47 3.5 L50 7 L47 10.5 Z M7 44 L3.5 47 L7 50 L10.5 47 Z" fill={c} opacity="0.85" />
    </svg>
  );
}

/** Four corner flourishes positioned inside a relatively-positioned frame. */
export function FrameCorners({ size = 56, inset = 10, tone = 'gold' }: {
  size?: number; inset?: number; tone?: 'gold' | 'light';
}) {
  return (
    <>
      <GoldCorner size={size} tone={tone} style={{ top: inset, left: inset }} />
      <GoldCorner size={size} tone={tone} style={{ top: inset, right: inset, transform: 'scaleX(-1)' }} />
      <GoldCorner size={size} tone={tone} style={{ bottom: inset, left: inset, transform: 'scaleY(-1)' }} />
      <GoldCorner size={size} tone={tone} style={{ bottom: inset, right: inset, transform: 'scale(-1,-1)' }} />
    </>
  );
}

/** Kalasam (temple finial) – sits atop arches. */
export function Kalasam({ width = 44, className = '', style }: {
  width?: number; className?: string; style?: CSSProperties;
}) {
  return (
    <svg className={className} viewBox="0 0 44 60" width={width} aria-hidden="true" focusable="false"
      style={{ display: 'block', height: 'auto', ...style }}>
      <path d="M22 1 C19 6 19 9 22 12 C25 9 25 6 22 1 Z" fill="url(#g-foil-v)" />
      <rect x="20.6" y="12" width="2.8" height="5" fill="#A88238" />
      <path d="M12 26 C12 19 17 17 22 17 C27 17 32 19 32 26 C32 31 28 33 22 33 C16 33 12 31 12 26 Z" fill="url(#g-foil)" />
      <path d="M14 25 Q22 29 30 25" fill="none" stroke="#6E4E18" strokeWidth="0.7" opacity="0.6" />
      <rect x="16" y="33" width="12" height="3" rx="1" fill="#A88238" />
      <path d="M9 44 C9 38 14 36 22 36 C30 36 35 38 35 44 C35 49 30 51 22 51 C14 51 9 49 9 44 Z" fill="url(#g-foil)" />
      <path d="M11 43 Q22 48 33 43" fill="none" stroke="#6E4E18" strokeWidth="0.7" opacity="0.6" />
      <rect x="6" y="51" width="32" height="3.2" rx="1.2" fill="url(#g-foil-h)" />
      <rect x="2" y="55.6" width="40" height="3.2" rx="1.2" fill="url(#g-foil-h)" />
    </svg>
  );
}
