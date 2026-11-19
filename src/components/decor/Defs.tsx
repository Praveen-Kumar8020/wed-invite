/**
 * Shared SVG paint servers. Rendered once at the app root so every
 * ornament can reference the same gold foil, jasmine and petal gradients
 * by id without duplicating <defs>.
 */
export default function Defs() {
  return (
    <svg width="0" height="0" aria-hidden="true" focusable="false"
      style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }}>
      <defs>
        {/* Antique gold foil: dark edge → bright crest → dark edge */}
        <linearGradient id="g-foil" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7A5620" />
          <stop offset="0.22" stopColor="#C49A45" />
          <stop offset="0.42" stopColor="#F3E2AE" />
          <stop offset="0.58" stopColor="#C9A14E" />
          <stop offset="0.8" stopColor="#8C6A2A" />
          <stop offset="1" stopColor="#D8B868" />
        </linearGradient>
        <linearGradient id="g-foil-v" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#F3E2AE" />
          <stop offset="0.35" stopColor="#C49A45" />
          <stop offset="0.7" stopColor="#8C6A2A" />
          <stop offset="1" stopColor="#C9A14E" />
        </linearGradient>
        <linearGradient id="g-foil-h" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0" stopColor="#8C6A2A" />
          <stop offset="0.3" stopColor="#D8B868" />
          <stop offset="0.5" stopColor="#F3E2AE" />
          <stop offset="0.7" stopColor="#C49A45" />
          <stop offset="1" stopColor="#7A5620" />
        </linearGradient>

        {/* Lamp flame */}
        <radialGradient id="g-flame" cx="0.5" cy="0.78" r="0.75">
          <stop offset="0" stopColor="#FFFDF0" />
          <stop offset="0.3" stopColor="#FFE9A3" />
          <stop offset="0.62" stopColor="#FFB238" />
          <stop offset="1" stopColor="#E0601A" />
        </radialGradient>
        <radialGradient id="g-glow" cx="0.5" cy="0.5" r="0.5">
          <stop offset="0" stopColor="#FFD27A" stopOpacity="0.55" />
          <stop offset="0.45" stopColor="#FFB040" stopOpacity="0.18" />
          <stop offset="1" stopColor="#FFB040" stopOpacity="0" />
        </radialGradient>

        {/* Jasmine bud: waxy white with a green-cream base */}
        <linearGradient id="g-bud" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#FFFFFF" />
          <stop offset="0.55" stopColor="#F7F3E6" />
          <stop offset="0.85" stopColor="#E3DCC2" />
          <stop offset="1" stopColor="#B8BE8E" />
        </linearGradient>
        <radialGradient id="g-jas-petal" cx="0.5" cy="0.9" r="0.95">
          <stop offset="0" stopColor="#EDE6CF" />
          <stop offset="0.4" stopColor="#FBF8EF" />
          <stop offset="1" stopColor="#FFFFFF" />
        </radialGradient>

        {/* Blossom (arali / nerium pink) */}
        <radialGradient id="g-blossom-pink" cx="0.5" cy="0.95" r="1">
          <stop offset="0" stopColor="#B8455E" />
          <stop offset="0.35" stopColor="#E59AAA" />
          <stop offset="0.75" stopColor="#F5DDE0" />
          <stop offset="1" stopColor="#FFF4F4" />
        </radialGradient>
        <radialGradient id="g-blossom-white" cx="0.5" cy="0.95" r="1">
          <stop offset="0" stopColor="#E9C46A" />
          <stop offset="0.3" stopColor="#F7EBC8" />
          <stop offset="0.7" stopColor="#FFFDF7" />
          <stop offset="1" stopColor="#FFFFFF" />
        </radialGradient>

        {/* Rose */}
        <radialGradient id="g-rose-outer" cx="0.5" cy="1" r="1.05">
          <stop offset="0" stopColor="#4E0A18" />
          <stop offset="0.45" stopColor="#8E1A30" />
          <stop offset="0.85" stopColor="#B83148" />
          <stop offset="1" stopColor="#D2566A" />
        </radialGradient>
        <radialGradient id="g-rose-inner" cx="0.5" cy="1" r="1">
          <stop offset="0" stopColor="#3C0612" />
          <stop offset="0.6" stopColor="#7A1426" />
          <stop offset="1" stopColor="#A52640" />
        </radialGradient>

        {/* Leaf */}
        <linearGradient id="g-leaf" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#4F7A3A" />
          <stop offset="0.5" stopColor="#2F5B33" />
          <stop offset="1" stopColor="#1B3D28" />
        </linearGradient>

        {/* Marigold (toran fallback) */}
        <radialGradient id="g-marigold" cx="0.42" cy="0.38" r="0.7">
          <stop offset="0" stopColor="#FFD45C" />
          <stop offset="0.55" stopColor="#F59A1B" />
          <stop offset="1" stopColor="#B8560C" />
        </radialGradient>
        <radialGradient id="g-marigold-y" cx="0.42" cy="0.38" r="0.7">
          <stop offset="0" stopColor="#FFF0A0" />
          <stop offset="0.55" stopColor="#F9C623" />
          <stop offset="1" stopColor="#C98A0A" />
        </radialGradient>

        {/* Kanchipuram temple border tile: gold gopuram triangles on silk */}
        <pattern id="p-temple" width="32" height="40" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="32" height="2.4" fill="#C49A45" />
          <rect x="0" y="4.4" width="32" height="0.8" fill="#C49A45" opacity="0.8" />
          <path d="M3 33 Q13 27 15.2 12 L16 9.5 L16.8 12 Q19 27 29 33 Z" fill="url(#g-foil-v)" />
          <path d="M8.5 33 Q14.4 28.5 16 19 Q17.6 28.5 23.5 33" fill="none" stroke="#5A1424" strokeWidth="0.9" opacity="0.75" />
          <circle cx="16" cy="7.6" r="1.5" fill="#E8D5A3" />
          <rect x="0" y="33" width="32" height="2.6" fill="#C49A45" />
          <rect x="0" y="37.4" width="32" height="0.8" fill="#C49A45" opacity="0.8" />
          <circle cx="0" cy="22" r="1.1" fill="#C49A45" opacity="0.7" />
          <circle cx="32" cy="22" r="1.1" fill="#C49A45" opacity="0.7" />
        </pattern>

        {/* Small zari dot-and-diamond running band */}
        <pattern id="p-zari-fine" width="18" height="10" patternUnits="userSpaceOnUse">
          <rect x="0" y="0" width="18" height="0.8" fill="#C49A45" />
          <path d="M9 2.2 L11.6 5 L9 7.8 L6.4 5 Z" fill="#C49A45" />
          <circle cx="0" cy="5" r="0.9" fill="#C49A45" />
          <circle cx="18" cy="5" r="0.9" fill="#C49A45" />
          <rect x="0" y="9.2" width="18" height="0.8" fill="#C49A45" />
        </pattern>
      </defs>
    </svg>
  );
}
