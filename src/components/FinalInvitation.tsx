import KuthuVilakku from './decor/Lamp';
import { FrameCorners, Kalasam, LotusDivider, ZariBorder } from './decor/Ornaments';
import { JasmineString } from './decor/Flowers';

const STRINGS = [
  { len: 220, seed: 21, d: '7s', cls: '' },
  { len: 160, seed: 23, d: '6s', cls: '' },
  { len: 260, seed: 27, d: '8.4s', cls: 's-extra' },
];

export default function FinalInvitation() {
  return (
    <section className="panel silk-maroon" style={{ paddingTop: 'clamp(120px, 14vw, 180px)', paddingBottom: 'clamp(110px, 13vw, 170px)' }}>
      <ZariBorder className="zari-edge top" />

      {/* Jasmine strings framing the blessing */}
      {(['left', 'right'] as const).map((side) => (
        <div key={side} className={`final-strings ${side}`} data-speed="-0.2" aria-hidden="true">
          {STRINGS.map((s, i) => (
            <div key={i} className={`sway ${s.cls}`} style={{ ['--sway-d' as string]: s.d, ['--sway-delay' as string]: `${-i * 1.7}s` }}>
              <JasmineString length={s.len} seed={s.seed + (side === 'right' ? 11 : 0)} />
            </div>
          ))}
        </div>
      ))}

      <div className="final-lamp left" data-speed="-0.12" aria-hidden="true"><KuthuVilakku width={90} style={{ width: '100%' }} /></div>
      <div className="final-lamp right" data-speed="-0.12" aria-hidden="true"><KuthuVilakku width={90} style={{ width: '100%' }} /></div>

      <div className="panel-inner center">
        <div className="final-frame center" data-reveal="zoom">
          <div className="rule" aria-hidden="true" />
          <div className="rule2" aria-hidden="true" />
          <FrameCorners size={60} inset={14} tone="light" />
          <Kalasam width={38} style={{ position: 'absolute', top: -46, left: '50%', transform: 'translateX(-50%)' }} />

          {/* TWO HEARTS headline */}
          <div style={{ marginBottom: 'clamp(16px, 3vw, 28px)' }}>
            <h2 className="final-k" data-reveal="fade" style={{ ['--d' as string]: 200 }}>TWO HEARTS</h2>
            <h3 className="final-h" data-reveal="tilt" style={{ ['--d' as string]: 320 }}>One Beautiful Journey</h3>
            <p className="final-sub" data-reveal="fade" style={{ ['--d' as string]: 480 }}>A Lifetime of Togetherness</p>
          </div>

          <div data-reveal="curtain" style={{ ['--d' as string]: 560, margin: 'clamp(14px, 3vw, 26px) 0' }}>
            <LotusDivider width={190} tone="light" />
          </div>

          {/* Names */}
          <p className="final-names" data-reveal="fade" style={{ ['--d' as string]: 640, marginBottom: 'clamp(16px, 3vw, 28px)' }}>
            Karthikeyan{' '}
            <span className="amp">&</span>{' '}
            Kaushika Bharathi
          </p>

          {/* Wedding */}
          <div data-reveal="fade" style={{ ['--d' as string]: 720, marginBottom: 'clamp(10px, 2vw, 18px)', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p className="final-label">WEDDING</p>
            <p className="final-date">06 DECEMBER 2026</p>
            <p className="final-time">10:30 AM – 12:00 NOON</p>
            <p className="final-place">R.C. Mahal, Madurai</p>
          </div>

          {/* Slim gold rule between events */}
          <span data-reveal="fade" style={{ ['--d' as string]: 780, display: 'block', width: 48, height: 1, background: 'linear-gradient(90deg, transparent, rgba(196,154,69,0.6), transparent)', margin: 'clamp(10px, 2vw, 16px) auto' }} aria-hidden="true" />

          {/* Reception */}
          <div data-reveal="fade" style={{ ['--d' as string]: 820, marginBottom: 'clamp(24px, 4vw, 40px)', display: 'flex', flexDirection: 'column', gap: 4 }}>
            <p className="final-label">RECEPTION</p>
            <p className="final-date">05 DECEMBER 2026</p>
            <p className="final-time">6:00 PM – 8:30 PM</p>
            <p className="final-place">R.C. Mahal, Madurai</p>
          </div>

          {/* Invitation message */}
          <p className="final-msg" data-reveal="fade" style={{ ['--d' as string]: 920, marginBottom: 'clamp(28px, 4vw, 44px)' }}>
            We would be delighted to have your presence and blessings on our special day.
          </p>

          <div data-reveal="fade" style={{ ['--d' as string]: 1040, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 10 }}>
            <span style={{ width: 60, height: 1, background: 'linear-gradient(90deg, transparent, #C49A45, transparent)' }} aria-hidden="true" />
            <p className="final-love">With Love</p>
            <p className="final-sign">Karthikeyan & Kaushika Bharathi</p>
          </div>
        </div>
      </div>
    </section>
  );
}
