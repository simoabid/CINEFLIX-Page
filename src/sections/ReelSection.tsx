import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { ProductReel } from '../components/ProductReel';
import { useI18n } from '../contexts/I18nContext';

export const ReelSection: React.FC = () => {
  const { t } = useI18n();
  const reduced = useReducedMotion();

  return (
    <section id="reel" className="py-16 sm:py-20 bg-transparent relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[min(100%,900px)] h-[60%] bg-[radial-gradient(ellipse_at_center,rgba(88,28,135,0.2)_0%,rgba(255,30,39,0.06)_45%,transparent_70%)]" />
      </div>
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          badge={t('reel.badge')}
          title={t('reel.title')}
          description={t('reel.desc')}
        />
        <motion.div
          initial={reduced ? false : { opacity: 0, y: 36, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.25 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <ProductReel />
        </motion.div>
      </div>
    </section>
  );
};

