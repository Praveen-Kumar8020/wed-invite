import SectionHeading from './SectionHeading';
import MelamCrest from './decor/Instruments';
import { FrameCorners, LotusDivider, ZariFine } from './decor/Ornaments';
import { FloralCorner } from './decor/Flowers';

const cards = [
  { label: 'DATE', primary: 'Sunday', secondary: '06 December 2026' },
  { label: 'TIME', primary: '10:30 AM', secondary: '– 12:00 Noon (Muhurtham)' },
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

        {/* One printed invitation card, three columns divided by gold rules */}
        <div className="inv-card" data-reveal="tilt" style={{ ['--d' as string]: 150 }}>
          <FrameCorners size={52} inset={12} />
          <FloralCorner className="inv-bloom tl" size={150} style={{ position: 'absolute' }} />
          <FloralCorner className="inv-bloom br" size={150} style={{ position: 'absolute' }} />
          <div className="inv-grid">
            {cards.map(({ label, primary, secondary }, i) => (
              <div key={label} className="inv-cell" data-reveal="fade" style={{ ['--d' as string]: 350 + i * 160 }}>
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
