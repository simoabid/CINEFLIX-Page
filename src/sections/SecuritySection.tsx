import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { SECURITY_DETAILS } from '../config/content';
import { useI18n } from '../contexts/I18nContext';
import { useSectionSound } from '../hooks/useSectionSound';
import { easeSnappy, fadeUp, staggerContainer } from '../motion/variants';

export const SecuritySection: React.FC = () => {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  useSectionSound('security');

  return (
    <section id="security" className="py-20 sm:py-24 bg-transparent relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <SectionHeading
          badge={t('security.badge')}
          title={
            <>
              {t('security.title')}{' '}
              <span className="text-accent-red font-extrabold">{t('security.titleAccent')}</span>
            </>
          }
          description={t('security.desc')}
        />

        <motion.div
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.12 }}
        >
          {SECURITY_DETAILS.map((point) => (
            <motion.article
              key={point.id}
              variants={reduced ? undefined : fadeUp}
              whileHover={reduced ? undefined : { y: -6, transition: easeSnappy }}
              className="flex flex-col gap-3 bg-glass-card border border-glass-border hover:border-glass-border-hover rounded-xl p-6 h-full will-change-transform"
            >
              <motion.div
                className="w-10 h-10 rounded-lg bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red shrink-0"
                whileHover={reduced ? undefined : { scale: 1.1, rotate: -6 }}
              >
                <ShieldCheck className="w-5 h-5" aria-hidden="true" />
              </motion.div>
              <h3 className="font-bold text-white text-sm sm:text-base">{point.title}</h3>
              <p className="text-gray-400 text-xs sm:text-sm leading-relaxed flex-1">{point.body}</p>
            </motion.article>
          ))}
        </motion.div>


        <div className="mt-10 rounded-xl border border-white/[0.08] bg-[#070715]/40 p-6 sm:p-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-accent-red mb-2">
            {t('security.principle')}
          </p>
          <p className="text-sm text-gray-400 leading-relaxed max-w-3xl">
            Defense in depth: validate at the edge, keep secrets server-side, never trust client input
            for proxy destinations, and fail closed on auth. The landing page markets the product — the
            Express backend enforces these rules in production.
          </p>
        </div>
      </div>
    </section>
  );
};
