import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { SectionHeading } from '../components/SectionHeading';
import { useRegisterSection } from '../contexts/MockupContext';
import { STACK } from '../config/site';
import { useI18n } from '../contexts/I18nContext';
import { easeSnappy, fadeUp, staggerContainer } from '../motion/variants';

function stackIconUrl(icon: string, color: string): string {
  return `https://cdn.simpleicons.org/${icon}/${color}`;
}

export const StackSection: React.FC = () => {
  const techRef = useRegisterSection('tech');
  const { t } = useI18n();
  const reduced = useReducedMotion();

  return (
    <section id="tech" ref={techRef} className="py-20 sm:py-24 bg-transparent relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeading
          badge={t('stack.badge')}
          title={
            <>
              {t('stack.title')}{' '}
              <span className="text-accent-red font-extrabold">{t('stack.titleAccent')}</span>
            </>
          }
          description={t('stack.desc')}
        />

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-5"
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.15 }}
        >
          {STACK.map((item) => (
            <motion.div
              key={item.name}
              variants={reduced ? undefined : fadeUp}
              whileHover={
                reduced
                  ? undefined
                  : {
                      y: -6,
                      scale: 1.02,
                      borderColor: 'rgba(255,255,255,0.18)',
                      transition: easeSnappy,
                    }
              }
              className="group bg-[#070715]/40 border border-white/[0.08] rounded-xl p-5 shadow-lg flex items-start gap-3.5 will-change-transform"
            >
              <motion.div
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-xl bg-white/[0.04] border border-white/[0.08] flex items-center justify-center shrink-0"
                whileHover={reduced ? undefined : { rotate: [0, -8, 8, 0], scale: 1.08 }}
                transition={{ duration: 0.45 }}
              >
                <img
                  src={stackIconUrl(item.icon, item.color)}
                  alt=""
                  width={22}
                  height={22}
                  className="w-[22px] h-[22px] object-contain"
                  loading="lazy"
                  decoding="async"
                />
              </motion.div>
              <div className="min-w-0 pt-0.5">
                <h4 className="font-bold font-display text-white text-sm mb-0.5 truncate">
                  {item.name}
                </h4>
                <span className="text-gray-500 text-xs">{item.detail}</span>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 mt-12 border-t border-white/5 text-center"
          initial={reduced ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          {[
            { value: 'MERN', label: 'Full stack' },
            { value: '50+', label: 'Providers' },
            { value: 'PWA', label: 'Installable' },
            { value: 'CI', label: 'Lint · Test · Build' },
          ].map((m) => (
            <motion.div key={m.label} whileHover={reduced ? undefined : { y: -3 }}>
              <span className="block text-xl sm:text-2xl font-extrabold text-white">{m.value}</span>
              <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">
                {m.label}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
