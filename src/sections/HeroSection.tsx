import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Github } from 'lucide-react';
import { HeroParticles } from '../components/HeroParticles';
import { BrowserMockup } from '../components/BrowserMockup';
import { Counter } from '../components/Counter';
import { Magnetic } from '../components/motion/Magnetic';
import { Floating } from '../components/motion/Floating';
import { useRegisterSection } from '../contexts/MockupContext';
import { SITE, STATS } from '../config/site';
import { useI18n } from '../contexts/I18nContext';
import { heroItem, staggerContainer, easeSnappy } from '../motion/variants';

const STAT_LABEL_KEYS = [
  'hero.stat.collections',
  'hero.stat.sources',
  'hero.stat.modes',
  'hero.stat.open',
] as const;

export const HeroSection: React.FC = () => {
  const heroRef = useRegisterSection('hero');
  const { t } = useI18n();
  const reduced = useReducedMotion();

  return (
    <section
      id="hero"
      ref={heroRef}
      className="relative min-h-screen pt-28 sm:pt-32 pb-16 sm:pb-20 flex items-center overflow-hidden"
    >
      <HeroParticles />

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 w-full relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-center">
          <motion.div
            className="lg:col-span-5 space-y-7 text-center lg:text-start flex flex-col items-center lg:items-start"
            variants={reduced ? undefined : staggerContainer}
            initial={reduced ? false : 'hidden'}
            animate="visible"
          >
            <motion.div
              variants={reduced ? undefined : heroItem}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent-red/20 bg-accent-red/5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-accent-red"
            >
              <span
                className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse"
                aria-hidden="true"
              />
              {t('hero.badge')}
            </motion.div>

            <motion.h1
              variants={reduced ? undefined : heroItem}
              className="text-4xl sm:text-5xl lg:text-[3.25rem] font-bold tracking-tight leading-[1.12] max-w-xl font-display text-white"
            >
              {t('hero.title1')}{' '}
              <span className="sm:whitespace-nowrap">
                {t('hero.title2')}{' '}
                <span className="text-accent-red">{t('hero.titleAccent')}</span>
              </span>
              <span className="block text-gray-300 text-lg sm:text-xl lg:text-2xl font-normal font-sans mt-4 leading-snug">
                {t('hero.subline')}
              </span>
            </motion.h1>

            <motion.p
              variants={reduced ? undefined : heroItem}
              className="text-gray-400 text-sm sm:text-base max-w-[58ch] leading-relaxed"
            >
              {t('hero.body')}{' '}
              <span className="text-white font-medium">cineflix.dev</span>.
            </motion.p>

            <motion.div
              variants={reduced ? undefined : heroItem}
              className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto"
            >
              <Magnetic strength={0.25}>
                <motion.a
                  href={SITE.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-accent-red hover:bg-[#E0121A] text-white rounded-xl py-3 px-6 font-semibold shadow-lg shadow-accent-red/25 interactive-target min-h-[44px] w-full sm:w-auto"
                  whileHover={reduced ? undefined : { scale: 1.04, boxShadow: '0 12px 40px rgba(255,30,39,0.35)' }}
                  whileTap={reduced ? undefined : { scale: 0.97 }}
                  transition={easeSnappy}
                >
                  <ExternalLink className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {t('cta.launch')}
                </motion.a>
              </Magnetic>
              <Magnetic strength={0.2}>
                <motion.a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-xl py-3 px-6 font-semibold interactive-target min-h-[44px] w-full sm:w-auto"
                  whileHover={reduced ? undefined : { scale: 1.03 }}
                  whileTap={reduced ? undefined : { scale: 0.97 }}
                  transition={easeSnappy}
                >
                  <Github className="w-4 h-4 shrink-0" aria-hidden="true" />
                  {t('cta.source')}
                </motion.a>
              </Magnetic>
            </motion.div>

            <motion.div
              variants={reduced ? undefined : heroItem}
              className="grid grid-cols-2 sm:grid-cols-4 gap-5 sm:gap-6 pt-6 w-full border-t border-white/5"
            >
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  className="space-y-1"
                  whileHover={reduced ? undefined : { y: -2 }}
                >
                  <div className="text-2xl sm:text-3xl font-bold tracking-tight text-white font-sans">
                    <Counter target={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-[10px] sm:text-xs font-bold tracking-wider text-gray-500 uppercase font-mono">
                    {t(STAT_LABEL_KEYS[i])}
                  </div>
                </motion.div>
              ))}
            </motion.div>

            <motion.p
              variants={reduced ? undefined : heroItem}
              className="flex items-center gap-2 text-xs sm:text-sm text-gray-400"
            >
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              {t('hero.liveAt')}{' '}
              <a
                href={SITE.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white font-semibold hover:text-accent-red transition-colors interactive-target"
              >
                cineflix.dev
              </a>
            </motion.p>
          </motion.div>

          <motion.div
            className="lg:col-span-7 flex justify-center lg:justify-end w-full min-w-0"
            initial={reduced ? false : { opacity: 0, x: 48, scale: 0.96 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <Floating y={8} duration={5.5} className="w-full">
              <BrowserMockup />
            </Floating>
          </motion.div>
        </div>

        <motion.div
          className="grid grid-cols-1 md:grid-cols-3 gap-5 pt-14"
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {[
            {
              label: t('hero.pillar.player'),
              title: t('hero.pillar.playerTitle'),
              body: t('hero.pillar.playerBody'),
            },
            {
              label: t('hero.pillar.discover'),
              title: t('hero.pillar.discoverTitle'),
              body: t('hero.pillar.discoverBody'),
            },
            {
              label: t('hero.pillar.together'),
              title: t('hero.pillar.togetherTitle'),
              body: t('hero.pillar.togetherBody'),
            },
          ].map((card) => (
            <motion.div
              key={card.label}
              variants={reduced ? undefined : heroItem}
              whileHover={
                reduced
                  ? undefined
                  : {
                      y: -6,
                      borderColor: 'rgba(255,255,255,0.15)',
                      transition: easeSnappy,
                    }
              }
              className="bg-glass-card border border-glass-border rounded-xl p-6 sm:p-7 will-change-transform"
            >
              <div className="text-[10px] font-extrabold tracking-wider text-accent-red uppercase mb-3">
                {card.label}
              </div>
              <h3 className="text-base sm:text-lg font-bold font-display mb-2 text-white">
                {card.title}
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
