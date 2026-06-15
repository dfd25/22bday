import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Audio manager using Web Audio API for procedural ocean ambience
 * and a free music track for background music.
 * Falls back gracefully if audio cannot be loaded.
 */
export function useAudio() {
  const [oceanEnabled, setOceanEnabled] = useState(false);
  const [musicEnabled, setMusicEnabled] = useState(false);
  const audioCtxRef = useRef(null);
  const oceanNodesRef = useRef(null);
  const musicNodesRef = useRef(null);

  // Initialize AudioContext lazily (must be triggered by user gesture)
  const getAudioCtx = useCallback(() => {
    if (!audioCtxRef.current) {
      try {
        audioCtxRef.current = new (window.AudioContext || window.webkitAudioContext)();
      } catch {
        console.warn('Web Audio API not available');
      }
    }
    if (audioCtxRef.current?.state === 'suspended') {
      audioCtxRef.current.resume();
    }
    return audioCtxRef.current;
  }, []);

  // Create procedural ocean waves using Web Audio API
  const createOceanSound = useCallback(() => {
    const ctx = getAudioCtx();
    if (!ctx) return null;

    // Create a filtered noise source that sounds like ocean waves
    const bufferSize = 2 * ctx.sampleRate;
    const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const data = buffer.getChannelData(0);

    // Fill with noise
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const noiseSource = ctx.createBufferSource();
    noiseSource.buffer = buffer;
    noiseSource.loop = true;

    // Low-pass filter for that deep ocean rumble
    const lowpass = ctx.createBiquadFilter();
    lowpass.type = 'lowpass';
    lowpass.frequency.value = 400;
    lowpass.Q.value = 0.5;

    // LFO to modulate the filter for wave-like rhythm
    const lfo = ctx.createOscillator();
    lfo.type = 'sine';
    lfo.frequency.value = 0.12; // Slow wave rhythm
    const lfoGain = ctx.createGain();
    lfoGain.gain.value = 150;
    lfo.connect(lfoGain);
    lfoGain.connect(lowpass.frequency);

    // Second LFO for volume swell (wave crashes)
    const lfo2 = ctx.createOscillator();
    lfo2.type = 'sine';
    lfo2.frequency.value = 0.08;
    const lfoGain2 = ctx.createGain();
    lfoGain2.gain.value = 0.06;

    // Main volume
    const gainNode = ctx.createGain();
    gainNode.gain.value = 0.12;
    lfo2.connect(lfoGain2);
    lfoGain2.connect(gainNode.gain);

    // Connect: noise → lowpass → gain → output
    noiseSource.connect(lowpass);
    lowpass.connect(gainNode);
    gainNode.connect(ctx.destination);

    // Start all oscillators
    noiseSource.start();
    lfo.start();
    lfo2.start();

    return { noiseSource, lfo, lfo2, gainNode, lowpass };
  }, [getAudioCtx]);

  const createMusic = useCallback(() => {
    const ctx = getAudioCtx();
    if (!ctx) return null;

    const master = ctx.createGain();
    master.gain.setValueAtTime(0, ctx.currentTime);
    master.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 1.2);
    master.connect(ctx.destination);

    const frequencies = [196, 246.94, 293.66, 369.99];
    const oscillators = frequencies.map((frequency, index) => {
      const oscillator = ctx.createOscillator();
      const gain = ctx.createGain();
      oscillator.type = index % 2 === 0 ? 'sine' : 'triangle';
      oscillator.frequency.value = frequency;
      oscillator.detune.value = index % 2 === 0 ? -4 : 4;
      gain.gain.value = index === 0 ? 0.34 : 0.18;
      oscillator.connect(gain);
      gain.connect(master);
      oscillator.start();
      return oscillator;
    });

    const pulse = ctx.createOscillator();
    const pulseGain = ctx.createGain();
    pulse.type = 'sine';
    pulse.frequency.value = 0.09;
    pulseGain.gain.value = 0.025;
    pulse.connect(pulseGain);
    pulseGain.connect(master.gain);
    pulse.start();

    return { master, oscillators, pulse };
  }, [getAudioCtx]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (oceanNodesRef.current) {
        try {
          oceanNodesRef.current.noiseSource.stop();
          oceanNodesRef.current.lfo.stop();
          oceanNodesRef.current.lfo2.stop();
        } catch {
          // Nodes may already be stopped during unmount.
        }
      }
      if (musicNodesRef.current) {
        musicNodesRef.current.oscillators.forEach((oscillator) => oscillator.stop());
        musicNodesRef.current.pulse.stop();
        musicNodesRef.current = null;
      }
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  const toggleOcean = useCallback(() => {
    if (oceanEnabled) {
      // Stop ocean
      if (oceanNodesRef.current) {
        try {
          oceanNodesRef.current.gainNode.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 0.5);
          setTimeout(() => {
            try {
              oceanNodesRef.current.noiseSource.stop();
              oceanNodesRef.current.lfo.stop();
              oceanNodesRef.current.lfo2.stop();
            } catch {
              // Nodes may already be stopped after a rapid toggle.
            }
            oceanNodesRef.current = null;
          }, 600);
        } catch {
          // Ignore shutdown races from repeated taps.
        }
      }
    } else {
      // Start ocean
      oceanNodesRef.current = createOceanSound();
    }
    setOceanEnabled(!oceanEnabled);
  }, [oceanEnabled, createOceanSound]);

  const toggleMusic = useCallback(() => {
    if (musicEnabled) {
      if (musicNodesRef.current && audioCtxRef.current) {
        const { master, oscillators, pulse } = musicNodesRef.current;
        master.gain.cancelScheduledValues(audioCtxRef.current.currentTime);
        master.gain.linearRampToValueAtTime(0, audioCtxRef.current.currentTime + 0.4);
        setTimeout(() => {
          oscillators.forEach((oscillator) => {
            try { oscillator.stop(); } catch {
              // Oscillator was already stopped.
            }
          });
          try { pulse.stop(); } catch {
            // Pulse was already stopped.
          }
        }, 450);
        musicNodesRef.current = null;
      }
      setMusicEnabled(false);
    } else {
      const music = createMusic();
      if (music) {
        musicNodesRef.current = music;
        setMusicEnabled(true);
      }
    }
  }, [musicEnabled, createMusic]);

  return {
    oceanEnabled,
    musicEnabled,
    toggleOcean,
    toggleMusic,
    isLoaded: true,
  };
}
