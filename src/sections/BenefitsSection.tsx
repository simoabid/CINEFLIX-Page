import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { BENEFITS } from '../config/site';
import { useI18n } from '../contexts/I18nContext';
import { easeSnappy, fadeUp, staggerContainer } from '../motion/variants';

export const BenefitsSection: React.FC = () => {
  const { t } = useI18n();
  const reduced = useReducedMotion();

  return (
    <section id="benefits" className="py-20 sm:py-24 bg-transparent relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeading
          badge={t('benefits.badge')}
          title={
            <>
              {t('benefits.title')}{' '}
              <span className="text-accent-red font-extrabold">{t('benefits.titleAccent')}</span>
            </>
          }
          description={t('benefits.desc')}
        />

        <motion.div
          className="grid md:grid-cols-3 gap-6"
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {BENEFITS.map((item, i) => (
            <motion.article
              key={item.title}
              variants={reduced ? undefined : fadeUp}
              whileHover={
                reduced
                  ? undefined
                  : {
                      y: -8,
                      borderColor: 'rgba(255,255,255,0.15)',
                      transition: easeSnappy,
                    }
              }
              className="bg-glass-card border border-glass-border rounded-xl p-6 sm:p-8 space-y-4 h-full will-change-transform"
            >
              <span className="text-3xl font-extrabold text-white/10 font-display">
                0{i + 1}
              </span>
              <h3 className="text-lg font-bold font-display text-white">{item.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{item.description}</p>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
