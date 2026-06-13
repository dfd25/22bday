import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Audio manager using Web Audio API (no external dep needed for simple use).
 * Falls back gracefully if audio cannot be loaded.
 */
export function useAudio() {
  const [oceanEnabled, setOceanEnabled] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const oceanRef = useRef(null);
  const musicRef = useRef(null);

  // Create audio elements on mount
  useEffect(() => {
    // We'll use simple HTML5 Audio for reliability
    // Audio files will be in public/audio/
    try {
      oceanRef.current = new Audio();
      oceanRef.current.loop = true;
      oceanRef.current.volume = 0.2;
      // Soft ocean waves sound
      oceanRef.current.src = 'https://cdn.pixabay.com/audio/2022/01/18/audio_d076f2df3e.mp3';
      oceanRef.current.crossOrigin = 'anonymous';

      musicRef.current = new Audio();
      musicRef.current.loop = true;
      musicRef.current.volume = 0.15;
      // Gentle, warm acoustic/piano music
      musicRef.current.src = 'https://cdn.pixabay.com/audio/2022/03/15/audio_228f416edb.mp3';
      musicRef.current.crossOrigin = 'anonymous';

      setIsLoaded(true);
    } catch {
      console.warn('Audio not available');
    }

    return () => {
      if (oceanRef.current) { oceanRef.current.pause(); oceanRef.current = null; }
      if (musicRef.current) { musicRef.current.pause(); musicRef.current = null; }
    };
  }, []);

  const toggleOcean = useCallback(() => {
    if (!oceanRef.current) return;
    if (oceanEnabled) {
      oceanRef.current.pause();
    } else {
      oceanRef.current.play().catch(() => {});
    }
    setOceanEnabled(!oceanEnabled);
  }, [oceanEnabled]);

  const toggleMusic = useCallback(() => {
    if (!musicRef.current) return;
    if (musicEnabled) {
      musicRef.current.pause();
    } else {
      musicRef.current.play().catch(() => {});
    }
    setMusicEnabled(!musicEnabled);
  }, [musicEnabled]);

  return {
    oceanEnabled,
    musicEnabled,
    toggleOcean,
    toggleMusic,
    isLoaded,
  };
}
