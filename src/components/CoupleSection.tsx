import SmartImage from './SmartImage';
import SectionHeading from './SectionHeading';
import { Kalasam, LotusDivider } from './decor/Ornaments';
import { FloralCorner, Rose } from './decor/Flowers';

function PortraitCard({ src, alt, label, name, side, speed, delay }: {
  src: string; alt: string; label: string; name: string;
  side: 'left' | 'right'; speed: number; delay: number;
}) {
  return (
    <div data-speed={speed} style={{ width: '100%', display: 'flex', justifyContent: 'center' }}>
      <div className="portrait" data-reveal={side} style={{ ['--d' as string]: delay }}>
        {/* Temple-arch frame: photo, double gold line, kalasam finial, flowers at the base */}
        <div className="arch-frame">
          <Kalasam width={36} className="arch-kalasam" />
          <div className="arch-line" aria-hidden="true" />
          <div className="arch-line2" aria-hidden="true" />
          <div className="arch-photo">
            <SmartImage src={src} alt={alt} loading="lazy" decoding="async" />
          </div>
          <FloralCorner size={118} style={{
            position: 'absolute', bottom: -40, zIndex: 3,
            ...(side === 'left' ? { left: -40, transform: 'scaleY(-1)' } : { right: -40, transform: 'scale(-1,-1)' }),
          }} />
        </div>

        <p className="portrait-role">{label}</p>
        <h3 className="portrait-name">{name}</h3>
      </div>
    </div>
  );
}

export default function CoupleSection() {
  return (
    <section id="couple" className="panel silk-ivory">
      <div className="panel-inner center">
        <SectionHeading title="THE COUPLE" sub="Together in Love" />

        <div className="couple-grid">
          <PortraitCard src="/images/groom.jpeg" alt="Karthikeyan - Groom" label="The Groom" name="Karthikeyan" side="left" speed={-0.18} delay={100} />
          <div className="couple-knot" aria-hidden="true" data-reveal="zoom" style={{ ['--d' as string]: 400 }}>
            <span style={{ width: 1, height: 70, background: 'linear-gradient(transparent, #C49A45)' }} />
            <Rose size={46} rotate={18} />
            <span style={{ width: 1, height: 70, background: 'linear-gradient(#C49A45, transparent)' }} />
          </div>
          <PortraitCard src="/images/bride.png.jpeg" alt="Kaushika Bharathi - Bride" label="The Bride" name="Kaushika Bharathi" side="right" speed={0.18} delay={260} />
        </div>

        {/* Together photo */}
        <div className="together">
          <div data-reveal="curtain" style={{ marginBottom: 40 }}><LotusDivider width={240} /></div>
          <div className="together-frame" data-reveal="zoom">
            <FloralCorner className="corner-bloom tl" size={150} style={{ position: 'absolute' }} />
            <div className="inner" data-reveal="clip" style={{ ['--d' as string]: 200 }}>
              <SmartImage src="/images/4.jpeg" alt="Karthikeyan and Kaushika Bharathi" loading="lazy" decoding="async" />
            </div>
            <FloralCorner className="corner-bloom br" size={150} style={{ position: 'absolute' }} />
          </div>
          <p className="together-cap" data-reveal="fade" style={{ ['--d' as string]: 300 }}>Two souls, one journey</p>
        </div>
      </div>
    </section>
  );
}
