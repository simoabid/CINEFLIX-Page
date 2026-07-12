import { useEffect, useRef } from 'react';
import { useSound } from '../contexts/SoundContext';

/** Play opt-in whoosh when a section first enters the viewport. */
export function useSectionSound(sectionId: string) {
  const { playWhoosh } = useSound();
  const played = useRef(false);

  useEffect(() => {
    const el = document.getElementById(sectionId);
    if (!el) return;

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !played.current) {
          played.current = true;
          playWhoosh();
        }
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [sectionId, playWhoosh]);
}
