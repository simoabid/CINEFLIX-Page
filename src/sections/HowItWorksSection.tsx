import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { HOW_IT_WORKS } from '../config/site';
import { useI18n } from '../contexts/I18nContext';
import { easeSnappy, fadeUp, staggerContainer } from '../motion/variants';

export const HowItWorksSection: React.FC = () => {
  const { t } = useI18n();
  const reduced = useReducedMotion();

  return (
    <section id="how-it-works" className="py-20 sm:py-24 bg-transparent relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeading
          badge={t('how.badge')}
          title={
            <>
              {t('how.title')}{' '}
              <span className="text-accent-red font-extrabold">{t('how.titleAccent')}</span>
            </>
          }
          description={t('how.desc')}
        />

        <motion.div
          className="flex flex-col md:flex-row items-stretch justify-between gap-10 md:gap-4 relative max-w-4xl mx-auto"
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          {HOW_IT_WORKS.map((step, index) => (
            <React.Fragment key={step.step}>
              <motion.div
                variants={reduced ? undefined : fadeUp}
                whileHover={reduced ? undefined : { y: -8, transition: easeSnappy }}
                className="flex flex-col items-center text-center space-y-4 max-w-xs mx-auto relative z-10 flex-1"
              >
                <span className="text-4xl sm:text-5xl font-extrabold text-white/5 leading-none">
                  {step.step}
                </span>
                <motion.div
                  className="w-14 h-14 rounded-2xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red font-bold text-lg"
                  whileHover={reduced ? undefined : { scale: 1.12, rotate: 6 }}
                  transition={easeSnappy}
                >
                  {index + 1}
                </motion.div>
                <h3 className="text-lg font-bold font-display text-white">{step.title}</h3>
                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                  {step.description}
                </p>
              </motion.div>
              {index < HOW_IT_WORKS.length - 1 ? (
                <div
                  className="hidden md:flex items-center shrink-0 opacity-20 self-center"
                  aria-hidden="true"
                >
                  <motion.div
                    className="w-12 h-0.5 bg-white origin-left"
                    initial={reduced ? false : { scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 + index * 0.15 }}
                  />
                </div>
              ) : null}
            </React.Fragment>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
