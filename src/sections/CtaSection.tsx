import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { SITE } from '../config/site';
import { useI18n } from '../contexts/I18nContext';
import { Magnetic } from '../components/motion/Magnetic';
import { easeSnappy } from '../motion/variants';

export const CtaSection: React.FC = () => {
  const { t } = useI18n();
  const reduced = useReducedMotion();

  return (
    <section id="get-started" className="py-20 sm:py-24 bg-transparent relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <motion.div
          className="bg-[#070715]/40 border border-white/[0.08] rounded-xl p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl flex flex-col md:flex-row justify-between items-center gap-10"
          initial={reduced ? false : { opacity: 0, y: 40, scale: 0.98 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          whileHover={
            reduced
              ? undefined
              : {
                  borderColor: 'rgba(255,255,255,0.14)',
                  boxShadow: '0 30px 80px rgba(255,30,39,0.12)',
                }
          }
        >
          <motion.div
            className="absolute top-0 end-0 w-96 h-96 bg-accent-red rounded-full blur-[150px] opacity-10 -me-20 -mt-20 pointer-events-none"
            aria-hidden="true"
            animate={
              reduced
                ? undefined
                : {
                    scale: [1, 1.15, 1],
                    opacity: [0.08, 0.16, 0.08],
                  }
            }
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
          />

          <div className="relative z-10 max-w-xl space-y-4 text-center md:text-start">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display leading-tight">
              {t('cta.title')} <span className="text-accent-red">{t('cta.titleAccent')}</span>?
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed max-w-[68ch]">{t('cta.desc')}</p>
          </div>

          <div className="relative z-10 flex flex-col sm:flex-row gap-3 shrink-0 w-full sm:w-auto">
            <Magnetic strength={0.28}>
              <motion.a
                href={SITE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-accent-red hover:bg-[#E0121A] text-white rounded-xl py-3 px-6 text-sm font-semibold shadow-lg shadow-accent-red/25 interactive-target min-h-[44px] w-full sm:w-auto"
                whileHover={
                  reduced
                    ? undefined
                    : { scale: 1.05, boxShadow: '0 16px 48px rgba(255,30,39,0.4)' }
                }
                whileTap={reduced ? undefined : { scale: 0.97 }}
                transition={easeSnappy}
              >
                {t('cta.launch')}
                <ExternalLink className="w-4 h-4" aria-hidden="true" />
              </motion.a>
            </Magnetic>
            <Magnetic strength={0.22}>
              <motion.a
                href={SITE.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-xl py-3 px-6 text-sm font-semibold interactive-target min-h-[44px] w-full sm:w-auto"
                whileHover={reduced ? undefined : { scale: 1.04 }}
                whileTap={reduced ? undefined : { scale: 0.97 }}
                transition={easeSnappy}
              >
                <Github className="w-4 h-4" aria-hidden="true" />
                {t('cta.source')}
              </motion.a>
            </Magnetic>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
