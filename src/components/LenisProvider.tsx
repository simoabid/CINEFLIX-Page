import React, { useEffect } from 'react';
import { ReactLenis, useLenis } from 'lenis/react';
import 'lenis/dist/lenis.css';
import { ensureGsapPlugins, ScrollTrigger } from '../motion/gsapSetup';
import { usePrefersReducedMotion } from '../hooks/usePrefersReducedMotion';

/**
 * Lightweight Lenis ↔ ScrollTrigger sync.
 * Single RAF owner (Lenis autoRaf) — dual GSAP ticker was a major lag source.
 */
function LenisGsapBridge(): null {
  const lenis = useLenis();
  const reduced = usePrefersReducedMotion();

  useEffect(() => {
    if (!lenis || reduced) return;

    ensureGsapPlugins();

    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on('scroll', onScroll);

    const t = window.setTimeout(() => ScrollTrigger.refresh(), 200);

    return () => {
      lenis.off('scroll', onScroll);
      window.clearTimeout(t);
    };
  }, [lenis, reduced]);

  useEffect(() => {
    if (!lenis) return;

    const syncFromBody = () => {
      if (document.body.style.overflow === 'hidden') {
        lenis.stop();
      } else {
        lenis.start();
      }
    };

    const observer = new MutationObserver(syncFromBody);
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['style'],
    });
    syncFromBody();

    return () => observer.disconnect();
  }, [lenis]);

  return null;
}

/**
 * Snappy Lenis root scroll.
 * Tuned for responsiveness (higher lerp, shorter duration) rather than heavy inertia.
 */
export function LenisProvider({ children }: { children: React.ReactNode }) {
  const reduced = usePrefersReducedMotion();

  if (reduced) {
    return <>{children}</>;
  }

  return (
    <ReactLenis
      root
      options={{
        autoRaf: true,
        // Snappier: higher lerp = less trailing lag
        lerp: 0.14,
        duration: 0.85,
        smoothWheel: true,
        wheelMultiplier: 1.1,
        // Closer to native on touch devices
        touchMultiplier: 1.15,
        syncTouch: false,
        infinite: false,
        anchors: true,
        prevent: (node: HTMLElement | null) => {
          if (!node) return false;
          return (
            node.closest('.screenshots-scroll') != null ||
            node.closest('[data-lenis-prevent]') != null
          );
        },
      }}
    >
      <LenisGsapBridge />
      {children}
    </ReactLenis>
  );
}
