import { useEffect, useState } from 'react';
import SectionHeading from './SectionHeading';
import KuthuVilakku from './decor/Lamp';
import { LotusDivider, ZariBorder } from './decor/Ornaments';

interface TimeLeft { days: number; hours: number; minutes: number; seconds: number }

function getTimeLeft(): TimeLeft {
  const wedding = new Date('2026-12-06T10:30:00+05:30').getTime();
  const diff = Math.max(0, wedding - Date.now());
  return {
    days:    Math.floor(diff / 86400000),
    hours:   Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

function CountUnit({ value, label, d }: { value: number; label: string; d: number }) {
  const display = String(value).padStart(2, '0');
  return (
    <div className="count-unit" data-reveal="tilt" style={{ ['--d' as string]: d }}>
      <div className="count-niche">
        <span className="count-num tabular">{display}</span>
      </div>
      <p className="count-label">{label}</p>
    </div>
  );
}

function Separator() {
  return <div className="count-sep" aria-hidden="true">:</div>;
}

export default function Countdown() {
  const [time, setTime] = useState<TimeLeft>(getTimeLeft());

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft()), 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="panel silk-maroon" style={{ paddingTop: 'clamp(110px, 14vw, 170px)', paddingBottom: 'clamp(110px, 14vw, 170px)' }}>
      <ZariBorder className="zari-edge top" />

      <div className="count-lamp left" data-speed="-0.15" aria-hidden="true"><KuthuVilakku width={84} style={{ width: '100%' }} /></div>
      <div className="count-lamp right" data-speed="-0.15" aria-hidden="true"><KuthuVilakku width={84} style={{ width: '100%' }} /></div>

      <div className="panel-inner center">
        <SectionHeading title="THE CELEBRATION BEGINS IN" sub="Mark Your Calendar" dark />

        <div className="count-row" role="timer" aria-live="off">
          <CountUnit value={time.days} label="Days" d={0} />
          <Separator />
          <CountUnit value={time.hours} label="Hours" d={120} />
          <Separator />
          <CountUnit value={time.minutes} label="Minutes" d={240} />
          <Separator />
          <CountUnit value={time.seconds} label="Seconds" d={360} />
        </div>

        <div data-reveal="fade" style={{ ['--d' as string]: 400, marginTop: 'clamp(44px, 6vw, 64px)', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <LotusDivider width={170} tone="light" />
          <p className="count-foot-1" style={{ marginTop: 18 }}>06 December 2026 · Sunday</p>
          <p className="count-foot-2">10:30 AM IST · R.C. Mahal, Madurai</p>
        </div>
      </div>

      <ZariBorder className="zari-edge bottom" flip />
    </section>
  );
}
