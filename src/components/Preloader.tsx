import { useEffect, useState } from 'react';
import { motion, type Variants } from 'framer-motion';
import KuthuVilakku from './decor/Lamp';
import { FrameCorners, LotusDivider } from './decor/Ornaments';

const ease = [0.65, 0, 0.35, 1] as const;

const root: Variants = { show: { opacity: 1 }, hide: { opacity: 0, transition: { delay: 1.75, duration: 0.2 } } };
const leftDoor: Variants = { show: { x: 0 }, hide: { x: '-101%', transition: { duration: 1.5, ease, delay: 0.3 } } };
const rightDoor: Variants = { show: { x: 0 }, hide: { x: '101%', transition: { duration: 1.5, ease, delay: 0.3 } } };
const core: Variants = {
  show: { opacity: 1, scale: 1 },
  hide: { opacity: 0, scale: 1.04, transition: { duration: 0.45, ease: 'easeIn' } },
};

/** Carved door face: double gold panel, corner flourishes, lotus medallion. */
function DoorFace({ side }: { side: 'left' | 'right' }) {
  return (
    <div className="door-panel">
      <FrameCorners size={46} inset={10} tone="light" />
      {/* brass ring handle */}
      <div style={{
        position: 'absolute', top: '78%', [side === 'left' ? 'right' : 'left']: 18,
        width: 26, height: 26, borderRadius: '50%',
        border: '2.5px solid #C49A45', boxShadow: '0 2px 4px rgba(0,0,0,0.35), inset 0 0 0 1px rgba(243,226,174,0.6)',
      }} />
    </div>
  );
}

export default function Preloader() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) { clearInterval(interval); return 100; }
        return prev + 2.5;
      });
    }, 55);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div className="preloader" variants={root} initial="show" animate="show" exit="hide">
      <motion.div className="door left" variants={leftDoor}><DoorFace side="left" /></motion.div>
      <motion.div className="door right" variants={rightDoor}><DoorFace side="right" /></motion.div>

      <motion.div className="preloader-core" variants={core}>
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}
        >
          <KuthuVilakku width={46} style={{ marginBottom: 22 }} />
          <p className="pl-name">KARTHIKEYAN</p>
          <p className="pl-amp">&</p>
          <p className="pl-name">KAUSHIKA BHARATHI</p>
          <div style={{ marginTop: 24 }}><LotusDivider width={150} tone="light" /></div>
          <div className="pl-bar">
            <div style={{ transform: `scaleX(${progress / 100})`, transition: 'transform 0.08s linear' }} />
          </div>
          <p className="pl-caption">Opening your invitation</p>
        </motion.div>
      </motion.div>
    </motion.div>
  );
}
