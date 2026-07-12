import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Github, X } from 'lucide-react';
import { SITE } from '../config/site';
import { useI18n } from '../contexts/I18nContext';
import { Magnetic } from './motion/Magnetic';
import { easeSnappy } from '../motion/variants';

const DISMISS_KEY = 'cineflix-sticky-cta-dismissed';

/**
 * Appears after ~40% scroll. Dismissible for the session.
 */
export const StickyCta: React.FC = () => {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  useEffect(() => {
    try {
      if (sessionStorage.getItem(DISMISS_KEY) === '1') setDismissed(true);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    if (dismissed) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const pct = total > 0 ? window.scrollY / total : 0;
        setVisible(pct >= 0.4);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);


  const dismiss = () => {
    setDismissed(true);
    setVisible(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, '1');
    } catch {
      /* ignore */
    }
  };

  return (
    <AnimatePresence>
      {!dismissed && visible ? (
        <motion.div
          className="fixed bottom-4 inset-x-0 z-[90] px-4 pointer-events-none flex justify-center"
          role="region"
          aria-label={t('sticky.label')}
          initial={reduced ? false : { y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 60, opacity: 0 }}
          transition={{ type: 'spring', stiffness: 320, damping: 28 }}
        >
          <div className="pointer-events-auto max-w-xl w-full flex items-center gap-2 sm:gap-3 rounded-2xl border border-white/15 bg-[#0A0A1F]/92 backdrop-blur-xl shadow-[0_20px_50px_rgba(0,0,0,0.55)] px-3 sm:px-4 py-2.5 sm:py-3">
            <p className="hidden sm:block text-xs text-gray-400 font-medium shrink-0 pe-1">
              {t('sticky.label')}
            </p>
            <Magnetic strength={0.2} className="flex-1 sm:flex-initial">
              <motion.a
                href={SITE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-1.5 min-h-[40px] px-3 sm:px-4 rounded-xl bg-accent-red hover:bg-[#E0121A] text-white text-xs sm:text-sm font-semibold interactive-target"
                whileHover={reduced ? undefined : { scale: 1.03 }}
                whileTap={reduced ? undefined : { scale: 0.97 }}
                transition={easeSnappy}
              >
                {t('cta.launch')}
                <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
              </motion.a>
            </Magnetic>
            <Magnetic strength={0.2} className="flex-1 sm:flex-initial">
              <motion.a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex w-full items-center justify-center gap-1.5 min-h-[40px] px-3 sm:px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 text-white text-xs sm:text-sm font-semibold interactive-target"
                whileHover={reduced ? undefined : { scale: 1.03 }}
                whileTap={reduced ? undefined : { scale: 0.97 }}
                transition={easeSnappy}
              >
                <Github className="w-3.5 h-3.5" aria-hidden="true" />
                {t('cta.star')}
              </motion.a>
            </Magnetic>
            <button
              type="button"
              onClick={dismiss}
              className="shrink-0 w-9 h-9 rounded-lg text-gray-400 hover:text-white hover:bg-white/5 interactive-target flex items-center justify-center"
              aria-label={t('cta.dismiss')}
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
};
