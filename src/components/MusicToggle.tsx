import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Volume2, VolumeX } from 'lucide-react';

export default function MusicToggle() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasAudio, setHasAudio] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Check if music file exists in /music/ folder
    const audio = new Audio();
    const sources = ['/music/wedding.mp3', '/music/music.mp3', '/music/bg.mp3'];
    let found = false;

    for (const src of sources) {
      try {
        audio.src = src;
        // We'll handle via the canplaythrough event
      } catch {
        continue;
      }
    }

    audio.addEventListener('canplaythrough', () => {
      if (!found) {
        found = true;
        audioRef.current = audio;
        audio.loop = true;
        audio.volume = 0.3;
        setHasAudio(true);
      }
    });

    audio.addEventListener('error', () => {
      // No music file available, hide the toggle
      setHasAudio(false);
    });

    // Try the first source
    audio.src = sources[0];
    audio.load();

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const toggleMusic = () => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(() => {
        // Autoplay blocked
      });
    }
    setIsPlaying(!isPlaying);
  };

  if (!hasAudio) return null;

  return (
    <motion.button
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 4, duration: 0.5 }}
      onClick={toggleMusic}
      className="music-btn"
      aria-label={isPlaying ? 'Pause music' : 'Play music'}
    >
      {isPlaying ? (
        <Volume2 size={20} strokeWidth={1.5} />
      ) : (
        <VolumeX size={20} strokeWidth={1.5} />
      )}
      {isPlaying && (
        <motion.div
          className="ring"
          animate={{ scale: [1, 1.3, 1], opacity: [0.5, 0, 0.5] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}
    </motion.button>
  );
}
