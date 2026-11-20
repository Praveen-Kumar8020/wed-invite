import SectionHeading from './SectionHeading';
import MelamCrest from './decor/Instruments';
import { FrameCorners, LotusDivider, ZariFine } from './decor/Ornaments';
import { FloralCorner } from './decor/Flowers';

const weddingCards = [
  { label: 'DATE', primary: 'Sunday', secondary: '06 December 2026' },
  { label: 'TIME', primary: '10:30 AM', secondary: '– 12:00 Noon (Muhurtham)' },
  { label: 'VENUE', primary: 'R.C. Mahal', secondary: 'Gnanaolivupuram, A.A. Road\nMadurai, Tamil Nadu' },
];

const receptionCards = [
  { label: 'DATE', primary: 'Saturday', secondary: '05 December 2026' },
  { label: 'TIME', primary: '6:00 PM', secondary: '– 8:30 PM' },
  { label: 'VENUE', primary: 'R.C. Mahal', secondary: 'Gnanaolivupuram, A.A. Road\nMadurai, Tamil Nadu' },
];

export default function WeddingDetails() {
  return (
    <section id="wedding" className="panel silk-ivory silk-plain">
      <ZariFine className="zari-edge top" style={{ top: 18, opacity: 0.8 }} />

      <div className="panel-inner center">
        {/* Nadaswaram & Thavil – the melam that plays at the Muhurtham */}
        <div className="melam" data-reveal="zoom" aria-hidden="true">
          <MelamCrest width={250} style={{ width: '100%' }} />
        </div>

        <SectionHeading title="A DAY TO REMEMBER" sub="Our Wedding Celebration" />

        <p className="lead-line" data-reveal="fade" style={{ marginTop: -24 }}>
          Our families joyfully invite you to celebrate the beginning of our forever.
        </p>

        {/* Wedding card */}
        <div className="inv-card" data-reveal="tilt" style={{ ['--d' as string]: 150 }}>
          <FrameCorners size={52} inset={12} />
          <FloralCorner className="inv-bloom tl" size={150} style={{ position: 'absolute' }} />
          <FloralCorner className="inv-bloom br" size={150} style={{ position: 'absolute' }} />
          <div className="inv-grid">
            {weddingCards.map(({ label, primary, secondary }, i) => (
              <div key={label} className="inv-cell" data-reveal="fade" style={{ ['--d' as string]: 350 + i * 160 }}>
                <p className="inv-label">{label}</p>
                <h3 className="inv-primary">{primary}</h3>
                <p className="inv-secondary">{secondary}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Divider between wedding and reception */}
        <div className="inv-foot" data-reveal="curtain" style={{ ['--d' as string]: 200 }}>
          <LotusDivider width={200} />
        </div>

        {/* Reception heading */}
        <div data-reveal="fade" style={{ ['--d' as string]: 250, marginBottom: 'clamp(28px, 4vw, 44px)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
          <p className="inv-label" style={{ fontSize: 'clamp(13px, 1.6vw, 15px)', letterSpacing: '0.32em' }}>RECEPTION</p>
          <p className="sec-sub" style={{ fontSize: 'clamp(17px, 2vw, 21px)' }}>An Evening of Celebration</p>
        </div>

        {/* Reception card */}
        <div className="inv-card" data-reveal="tilt" style={{ ['--d' as string]: 300 }}>
          <FrameCorners size={52} inset={12} />
          <FloralCorner className="inv-bloom tl" size={150} style={{ position: 'absolute' }} />
          <FloralCorner className="inv-bloom br" size={150} style={{ position: 'absolute' }} />
          <div className="inv-grid">
            {receptionCards.map(({ label, primary, secondary }, i) => (
              <div key={label} className="inv-cell" data-reveal="fade" style={{ ['--d' as string]: 500 + i * 160 }}>
                <p className="inv-label">{label}</p>
                <h3 className="inv-primary">{primary}</h3>
                <p className="inv-secondary">{secondary}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="inv-foot" data-reveal="curtain" style={{ ['--d' as string]: 200 }}>
          <LotusDivider width={200} />
        </div>
      </div>

      <ZariFine className="zari-edge bottom" style={{ bottom: 18, opacity: 0.8 }} />
    </section>
  );
}
