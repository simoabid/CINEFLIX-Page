/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';

const STORAGE_KEY = 'cineflix-landing-sound';

type SoundContextValue = {
  enabled: boolean;
  setEnabled: (v: boolean) => void;
  playWhoosh: () => void;
};

const SoundContext = createContext<SoundContextValue | undefined>(undefined);

/** Soft whoosh via Web Audio — no external files. */
function playTone(ctx: AudioContext) {
  const now = ctx.currentTime;
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  const filter = ctx.createBiquadFilter();

  osc.type = 'sine';
  osc.frequency.setValueAtTime(220, now);
  osc.frequency.exponentialRampToValueAtTime(80, now + 0.28);

  filter.type = 'lowpass';
  filter.frequency.setValueAtTime(1200, now);
  filter.frequency.exponentialRampToValueAtTime(400, now + 0.28);

  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(0.04, now + 0.03);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.3);

  osc.connect(filter);
  filter.connect(gain);
  gain.connect(ctx.destination);
  osc.start(now);
  osc.stop(now + 0.32);
}

export const SoundProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [enabled, setEnabledState] = useState(false);
  const audioRef = useRef<AudioContext | null>(null);
  const lastPlay = useRef(0);

  useEffect(() => {
    try {
      setEnabledState(localStorage.getItem(STORAGE_KEY) === '1');
    } catch {
      /* ignore */
    }
  }, []);

  const setEnabled = useCallback((v: boolean) => {
    setEnabledState(v);
    try {
      localStorage.setItem(STORAGE_KEY, v ? '1' : '0');
    } catch {
      /* ignore */
    }
  }, []);

  const playWhoosh = useCallback(() => {
    if (!enabled) return;
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) return;

    const now = Date.now();
    if (now - lastPlay.current < 450) return;
    lastPlay.current = now;

    try {
      if (!audioRef.current) {
        audioRef.current = new AudioContext();
      }
      const ctx = audioRef.current;
      if (ctx.state === 'suspended') void ctx.resume();
      playTone(ctx);
    } catch {
      /* audio unavailable */
    }
  }, [enabled]);

  const value = useMemo(
    () => ({ enabled, setEnabled, playWhoosh }),
    [enabled, setEnabled, playWhoosh],
  );

  return <SoundContext.Provider value={value}>{children}</SoundContext.Provider>;
};

export function useSound(): SoundContextValue {
  const ctx = useContext(SoundContext);
  if (!ctx) throw new Error('useSound must be used within SoundProvider');
  return ctx;
}
