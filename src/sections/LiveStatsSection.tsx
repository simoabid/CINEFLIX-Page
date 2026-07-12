import React from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { Activity, GitFork, GitBranch, Star } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { TiltCard } from '../components/motion/TiltCard';
import { useI18n } from '../contexts/I18nContext';
import { formatRelativeDate, useLiveStats } from '../hooks/useLiveStats';
import { SITE } from '../config/site';
import { easeSnappy, fadeUp, staggerContainer } from '../motion/variants';

export const LiveStatsSection: React.FC = () => {
  const { t, locale } = useI18n();
  const stats = useLiveStats();
  const reduced = useReducedMotion();

  const cards = [
    {
      icon: Star,
      label: t('liveStats.stars'),
      value: stats.loading
        ? t('liveStats.loading')
        : stats.stars != null
          ? stats.stars.toLocaleString()
          : t('liveStats.unknown'),
      href: SITE.github,
    },
    {
      icon: GitFork,
      label: t('liveStats.forks'),
      value: stats.loading
        ? t('liveStats.loading')
        : stats.forks != null
          ? stats.forks.toLocaleString()
          : t('liveStats.unknown'),
      href: `${SITE.github}/forks`,
    },
    {
      icon: GitBranch,
      label: t('liveStats.updated'),
      value: stats.loading
        ? t('liveStats.loading')
        : formatRelativeDate(stats.pushedAt, locale),
      href: SITE.github,
    },
    {
      icon: Activity,
      label: t('liveStats.status'),
      value: stats.loading
        ? t('liveStats.loading')
        : stats.appOnline === true
          ? t('liveStats.online')
          : stats.appOnline === false
            ? t('liveStats.offline')
            : t('liveStats.unknown'),
      href: SITE.url,
      online: stats.appOnline,
    },
  ];

  return (
    <section id="live-stats" className="py-16 sm:py-20 bg-transparent relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <SectionHeading
          badge={t('liveStats.badge')}
          title={t('liveStats.title')}
          description={t('liveStats.desc')}
        />

        <motion.div
          className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5"
          variants={reduced ? undefined : staggerContainer}
          initial={reduced ? false : 'hidden'}
          whileInView="visible"
          viewport={{ once: true, amount: 0.25 }}
        >
          {cards.map((card) => {
            const Icon = card.icon;
            return (
              <TiltCard key={card.label} maxTilt={6} className="group h-full">
                <motion.a
                  href={card.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={reduced ? undefined : fadeUp}
                  whileHover={reduced ? undefined : { scale: 1.02 }}
                  transition={easeSnappy}
                  className="block h-full bg-[#070715]/50 border border-white/[0.08] hover:border-white/[0.16] rounded-xl p-5 interactive-target"
                >
                  <div className="flex items-center gap-2 text-gray-500 text-xs font-semibold uppercase tracking-wider mb-3">
                    <Icon className="w-3.5 h-3.5 text-accent-red" aria-hidden="true" />
                    {card.label}
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-white flex items-center gap-2">
                    {'online' in card && card.online === true ? (
                      <span className="relative flex h-2.5 w-2.5">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500" />
                      </span>
                    ) : null}
                    {card.value}
                  </div>
                </motion.a>
              </TiltCard>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
};
