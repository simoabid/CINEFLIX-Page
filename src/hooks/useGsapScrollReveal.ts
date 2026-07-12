import { useEffect, useRef } from 'react';
import { ensureGsapPlugins, gsap, ScrollTrigger } from '../motion/gsapSetup';
import { usePrefersReducedMotion } from './usePrefersReducedMotion';

type RevealOptions = {
  y?: number;
  delay?: number;
  stagger?: number;
  /** Child selector for stagger (relative to root) */
  childSelector?: string;
  start?: string;
  once?: boolean;
};

/**
 * GSAP ScrollTrigger fade-up on mount. Targets the ref root or its children.
 */
export function useGsapScrollReveal<T extends HTMLElement>(options: RevealOptions = {}) {
  const ref = useRef<T>(null);
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    ensureGsapPlugins();

    const {
      y = 40,
      delay = 0,
      stagger = 0.08,
      childSelector,
      start = 'top 88%',
      once = true,
    } = options;

    const targets = childSelector
      ? Array.from(el.querySelectorAll<HTMLElement>(childSelector))
      : [el];

    if (!targets.length) return;

    gsap.set(targets, { opacity: 0, y, force3D: true });

    const tween = gsap.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      delay,
      stagger: childSelector ? stagger : 0,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: el,
        start,
        once,
        toggleActions: once ? 'play none none none' : 'play none none reverse',
      },
    });

    return () => {
      tween.scrollTrigger?.kill();
      tween.kill();
      ScrollTrigger.getAll().forEach((st) => {
        if (st.trigger === el) st.kill();
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- options spread intentionally one-shot per mount
  }, [reduced]);

  return ref;
}
