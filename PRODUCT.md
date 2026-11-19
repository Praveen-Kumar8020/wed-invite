# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users
Family and friends of Karthikeyan and Kaushika Bharathi who receive the invitation as a link, mostly shared over WhatsApp and opened on a phone. Desktop is secondary. Their job: feel invited, learn the date, time and venue, and find their way to R.C. Mahal, Madurai.

## Product Purpose
A single-page digital wedding invitation (Tamil / South Indian traditional wedding, 06 December 2026, Muhurtham 10:30 AM – 12:00 Noon, R.C. Mahal, Madurai). Success: a guest opens it, is moved by it, remembers the date, and can get directions in one tap.

## Positioning
A personal invitation for one couple, not a template: real portraits and photos of the couple, Tamil heading (திருமண அழைப்பிதழ்), and the rituals and materials of a Tamil wedding mandapam.

## Operating Context
Opened from a chat app on a phone, often on mid-range Android devices and mobile data. The page is read once or twice before the wedding, then revisited for directions on the day.

## Capabilities and Constraints
- React 19 + Vite + Tailwind 4, framer-motion and GSAP ScrollTrigger already installed.
- Sections: preloader, navbar, hero, couple, wedding details, countdown, gallery with lightbox, venue with Google Maps embed and directions link, final invitation, footer. Optional background music toggle (shows only if `/music/*.mp3` exists).
- All existing copy, names, dates, times, venue and address are frozen: no rewriting, removing or adding content.
- No family-details content exists; none is to be added (confirmed by the user).

## Brand Commitments
User-pinned direction (binding): luxury South Indian traditional wedding — temple / mandapam aesthetics, antique gold ornament, jasmine (mallipoo) garlands, realistic rose petals, pink and white blossoms, Nadaswaram and Thavil, kuthu vilakku brass lamps, mango-leaf toran, subtle silk texture. Palette given by the user: Antique Gold #C49A45, Deep Maroon #641C2B, Burgundy #781F35, Ivory Cream #FFF8EC, Blush #F5DDE0, Champagne #E8D5A3, Deep Green #234B38. Realistic, never cartoon; cinematic but not flashy.

## Evidence on Hand
- Couple photos: `public/images/1.jpeg`, `2.jpeg`, `3.jpeg`, `4.jpeg`, `groom.jpeg`, `bride.png.jpeg`, illustrated portrait `animate.jpeg`.
- Decorative rasters: `public/images/garland3.png` (realistic marigold + mango-leaf toran), `leaf1/3.png` (banana leaves); `garland1/2.png`, `leaf2.png` are flat/cartoon.

## Product Principles
1. The content is sacred; design serves it and never alters it.
2. Phone first: every effect must hold on a 320px screen and a mid-range device.
3. Ceremony over spectacle: motion should feel like entering a decorated mandapam, not a game.
4. Directions must always be one tap away.

## Accessibility & Inclusion
Respect `prefers-reduced-motion`; decorative layers never block text or taps; readable contrast for older relatives.
