import { useState, type CSSProperties, type ImgHTMLAttributes, type ReactNode } from 'react';

type Props = ImgHTMLAttributes<HTMLImageElement> & {
  src: string;
  alt: string;
  /** 'photo' shows a silk-and-gold placeholder; 'decor' hides itself; 'none' renders the fallback node. */
  fallback?: 'photo' | 'decor';
  /** Optional replacement node for decorative images. */
  fallbackNode?: ReactNode;
  frameStyle?: CSSProperties;
};

/**
 * <img> that keeps the original file path but degrades gracefully when the
 * file is missing: photos become a woven-silk placeholder with a gold lotus,
 * decorative rasters disappear or swap to an SVG stand-in.
 */
export default function SmartImage({ src, alt, fallback = 'photo', fallbackNode, frameStyle, className, style, ...rest }: Props) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    if (fallback === 'decor') return fallbackNode ? <>{fallbackNode}</> : null;
    return (
      <div role="img" aria-label={alt} className={`photo-fallback ${className ?? ''}`} style={{ ...style, ...frameStyle }}>
        <svg viewBox="0 0 60 60" width="56" height="56" aria-hidden="true" focusable="false">
          <g fill="none" stroke="#C49A45" strokeWidth="1.1" strokeLinejoin="round">
            <path d="M30 12 C24 20 24 32 30 40 C36 32 36 20 30 12 Z" fill="#C49A45" fillOpacity="0.2" />
            <path d="M30 40 C20 39 14 31 13 22 C20 25 26 31 30 40 Z" />
            <path d="M30 40 C40 39 46 31 47 22 C40 25 34 31 30 40 Z" />
            <path d="M30 40 C18 43 10 39 6 33 C14 32 23 35 30 40 Z" />
            <path d="M30 40 C42 43 50 39 54 33 C46 32 37 35 30 40 Z" />
            <path d="M18 47 H42" />
          </g>
        </svg>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={style}
      onError={() => setFailed(true)}
      {...rest}
    />
  );
}
