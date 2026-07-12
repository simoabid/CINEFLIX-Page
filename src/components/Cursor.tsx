import { useEffect, useRef, useState } from 'react';

/**
 * Custom spring cursor for fine pointers only.
 * rAF only while moving / interpolating — not a permanent 60fps loop.
 */
export function Cursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');

    const update = () => {
      setEnabled(finePointer.matches && !reducedMotion.matches);
    };

    update();
    finePointer.addEventListener('change', update);
    reducedMotion.addEventListener('change', update);
    return () => {
      finePointer.removeEventListener('change', update);
      reducedMotion.removeEventListener('change', update);
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let isHovering = false;
    let isVisible = false;
    let animationFrameId = 0;
    let scheduled = false;

    const isInteractive = (target: EventTarget | null) => {
      if (!(target instanceof HTMLElement)) return false;
      return Boolean(
        target.closest('a') ||
          target.closest('button') ||
          target.closest('[role="button"]') ||
          target.closest('.interactive-target'),
      );
    };

    const tick = () => {
      scheduled = false;
      dot.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0) translate(-50%, -50%) scale(${isHovering ? 0.5 : 1})`;
      ringX += (mouseX - ringX) * 0.2;
      ringY += (mouseY - ringY) * 0.2;
      const scale = isHovering ? 52 / 36 : 1;
      ring.style.transform = `translate3d(${ringX}px, ${ringY}px, 0) translate(-50%, -50%) scale(${scale})`;
      ring.style.borderColor = isHovering
        ? 'rgba(255, 30, 39, 0.6)'
        : 'rgba(255, 30, 39, 0.4)';

      if (Math.abs(mouseX - ringX) > 0.5 || Math.abs(mouseY - ringY) > 0.5) {
        scheduled = true;
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    const schedule = () => {
      if (!scheduled) {
        scheduled = true;
        animationFrameId = requestAnimationFrame(tick);
      }
    };

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = '1';
        ring.style.opacity = '1';
      }
      schedule();
    };

    const onMouseOver = (e: MouseEvent) => {
      if (isInteractive(e.target)) isHovering = true;
    };

    const onMouseOut = (e: MouseEvent) => {
      if (isInteractive(e.target)) isHovering = false;
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    window.addEventListener('mouseover', onMouseOver);
    window.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', onMouseOver);
      window.removeEventListener('mouseout', onMouseOut);
      cancelAnimationFrame(animationFrameId);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 bg-accent-red rounded-full pointer-events-none z-[9999] opacity-0 transition-opacity duration-300"
        style={{ transform: 'translate(-50%, -50%)' }}
        aria-hidden="true"
      />
      <div
        ref={ringRef}
        className="fixed top-0 left-0 border-2 border-accent-red/40 rounded-full pointer-events-none z-[9998] opacity-0 transition-[border-color,opacity] duration-200 ease-out"
        style={{ width: '36px', height: '36px', transform: 'translate(-50%, -50%)' }}
        aria-hidden="true"
      />
    </>
  );
}
