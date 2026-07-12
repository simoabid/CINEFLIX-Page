import { useEffect, useRef } from 'react';
import { ensureGsapPlugins, gsap } from '../motion/gsapSetup';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

/**
 * Subtle GSAP parallax on a background / decorative element inside a section.
 */
export function useGsapSectionParallax<T extends HTMLElement>(speed = 0.15) {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    ensureGsapPlugins();

    const tween = gsap.to(el, {
      yPercent: speed * 100,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement ?? el,
        start: 'top bottom',
        end: 'bottom top',
        scrub: true,
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
    };
  }, [reduced, speed]);

  return ref;
}
