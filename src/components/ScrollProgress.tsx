import { useEffect, useRef } from 'react';
import { useLenis } from 'lenis/react';
import { useI18n } from '../contexts/I18nContext';

/**
 * Progress bar driven by Lenis without React setState every frame
 * (setState on every rAF was a major scroll lag source).
 */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const { t } = useI18n();
  const lenis = useLenis();

  useEffect(() => {
    const bar = barRef.current;
    if (!bar) return;

    // Fallback: native scroll when Lenis is off (reduced motion)
    if (!lenis) {
      const onScroll = () => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const pct = total > 0 ? (window.scrollY / total) * 100 : 0;
        bar.style.width = `${pct}%`;
        bar.setAttribute('aria-valuenow', String(Math.round(pct)));
      };
      window.addEventListener('scroll', onScroll, { passive: true });
      onScroll();
      return () => window.removeEventListener('scroll', onScroll);
    }

    const onScroll = (instance: { progress: number }) => {
      const pct = Math.min(100, Math.max(0, instance.progress * 100));
      bar.style.width = `${pct}%`;
      bar.setAttribute('aria-valuenow', String(Math.round(pct)));
    };

    lenis.on('scroll', onScroll);
    // Initial
    onScroll(lenis);

    return () => {
      lenis.off('scroll', onScroll);
    };
  }, [lenis]);

  return (
    <div
      ref={barRef}
      className="fixed top-0 left-0 h-[3px] bg-accent-red z-[9999] origin-left"
      style={{ width: '0%', willChange: 'width' }}
      role="progressbar"
      aria-valuenow={0}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={t('scrollProgress')}
    />
  );
}
