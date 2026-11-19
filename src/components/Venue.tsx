import SmartImage from './SmartImage';
import SectionHeading from './SectionHeading';
import { FrameCorners, LotusDivider } from './decor/Ornaments';
import { ToranFallback } from './decor/Flowers';

export default function Venue() {
  const query = encodeURIComponent('R.C. Mahal, Gnanaolivupuram, A.A. Road, Madurai, Tamil Nadu, India');
  const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${query}`;
  const embedUrl = `https://www.google.com/maps?q=${query}&output=embed`;

  return (
    <section id="venue" className="panel silk-ivory silk-plain">
      <div className="panel-inner center">
        <SectionHeading title="THE WEDDING DESTINATION" sub="Where It All Happens" />

        {/* Venue card – a toran hung over the entrance to the hall */}
        <div className="venue-card" data-reveal="tilt" style={{ ['--d' as string]: 120, marginTop: 56 }}>
          <div className="venue-toran" aria-hidden="true">
            <SmartImage src="/images/garland3.png" alt="" fallback="decor" fallbackNode={<ToranFallback />} loading="lazy" />
          </div>

          <div className="venue-map">
            <iframe
              src={embedUrl}
              width="100%" height="100%"
              allowFullScreen loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="R.C. Mahal, Madurai"
            />
          </div>

          <div className="venue-body" style={{ position: 'relative' }}>
            <FrameCorners size={46} inset={12} />


            <h3 className="venue-name">R.C. MAHAL</h3>

            <LotusDivider width={150} />

            <p className="venue-addr">
              Gnanaolivupuram, A.A. Road,<br />
              Madurai, Tamil Nadu, India.
            </p>

            {/* Directions button */}
            <a className="btn-gold" href={mapsUrl} target="_blank" rel="noopener noreferrer">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <polygon points="3 11 22 2 13 21 11 13 3 11"/>
              </svg>
              GET DIRECTIONS
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
