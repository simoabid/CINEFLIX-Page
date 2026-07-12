import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Check, Minus, X } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { COMPARE_ROWS } from '../config/content';
import { useI18n } from '../contexts/I18nContext';


function Cell({ value }: { value: boolean | string }) {
  if (value === true) {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-emerald-500/15 text-emerald-400">
        <Check className="w-4 h-4" aria-label="Yes" />
      </span>
    );
  }
  if (value === false) {
    return (
      <span className="inline-flex items-center justify-center w-7 h-7 rounded-full bg-white/5 text-gray-600">
        <X className="w-3.5 h-3.5" aria-label="No" />
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 text-xs text-gray-400 font-medium">
      <Minus className="w-3 h-3" aria-hidden="true" />
      {value}
    </span>
  );
}

export const CompareSection: React.FC = () => {
  const { t } = useI18n();
  const reduced = useReducedMotion();

  return (
    <section id="compare" className="py-20 sm:py-24 bg-transparent relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <SectionHeading
          badge={t('compare.badge')}
          title={
            <>
              {t('compare.title')}{' '}
              <span className="text-accent-red font-extrabold">{t('compare.titleAccent')}</span>
            </>
          }
          description={t('compare.desc')}
        />

        <motion.div
          className="overflow-x-auto rounded-2xl border border-white/[0.08] bg-[#070715]/40 shadow-xl"
          data-lenis-prevent
          initial={reduced ? false : { opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >

          <table className="w-full min-w-[640px] text-sm text-start">
            <thead>
              <tr className="border-b border-white/[0.08] text-xs uppercase tracking-wider text-gray-500">
                <th className="p-4 sm:p-5 font-semibold text-start">{t('compare.feature')}</th>
                <th className="p-4 sm:p-5 font-semibold text-center text-accent-red">
                  {t('compare.cineflix')}
                </th>
                <th className="p-4 sm:p-5 font-semibold text-center">{t('compare.tmdb')}</th>
                <th className="p-4 sm:p-5 font-semibold text-center">{t('compare.embed')}</th>
              </tr>
            </thead>
            <tbody>
              {COMPARE_ROWS.map((row, i) => (
                <motion.tr
                  key={row.feature}
                  className={`border-b border-white/[0.05] ${
                    i % 2 === 0 ? 'bg-white/[0.015]' : ''
                  }`}
                  initial={reduced ? false : { opacity: 0, x: -12 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.5 }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  whileHover={
                    reduced ? undefined : { backgroundColor: 'rgba(255,30,39,0.04)' }
                  }
                >
                  <td className="p-4 sm:p-5 text-gray-300 font-medium">{row.feature}</td>
                  <td className="p-4 sm:p-5 text-center">
                    <Cell value={row.cineflix} />
                  </td>
                  <td className="p-4 sm:p-5 text-center">
                    <Cell value={row.tmdb} />
                  </td>
                  <td className="p-4 sm:p-5 text-center">
                    <Cell value={row.embed} />
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

