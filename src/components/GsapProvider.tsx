import { useEffect } from 'react';
import { ensureGsapPlugins, gsap, ScrollTrigger } from '../motion/gsapSetup';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * Global GSAP defaults + refresh on resize / font load.
 * Section-level animations live in useGsapScrollReveal / components.
 */
export function GsapProvider({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (reduced) return;
    ensureGsapPlugins();

    gsap.defaults({
      ease: 'power3.out',
      duration: 0.8,
    });

    ScrollTrigger.config({ ignoreMobileResize: true });

    const onLoad = () => ScrollTrigger.refresh();
    window.addEventListener('load', onLoad);
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 400);

    return () => {
      window.removeEventListener('load', onLoad);
      window.clearTimeout(t);
    };
  }, [reduced]);

  return <>{children}</>;
}
