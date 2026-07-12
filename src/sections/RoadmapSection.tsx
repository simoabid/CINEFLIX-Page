import React from 'react';
import { Compass, Rocket, Sparkles } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ROADMAP } from '../config/content';
import { useI18n } from '../contexts/I18nContext';

export const RoadmapSection: React.FC = () => {
  const { t } = useI18n();

  const columns = [
    {
      key: 'shipped' as const,
      title: t('roadmap.shipped'),
      icon: Sparkles,
      items: ROADMAP.shipped,
      accent: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/10',
    },
    {
      key: 'next' as const,
      title: t('roadmap.next'),
      icon: Rocket,
      items: ROADMAP.next,
      accent: 'text-accent-red border-accent-red/20 bg-accent-red/10',
    },
    {
      key: 'exploring' as const,
      title: t('roadmap.exploring'),
      icon: Compass,
      items: ROADMAP.exploring,
      accent: 'text-sky-400 border-sky-500/20 bg-sky-500/10',
    },
  ];

  return (
    <section id="roadmap" className="py-20 sm:py-24 bg-transparent relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <SectionHeading
          badge={t('roadmap.badge')}
          title={
            <>
              {t('roadmap.title')}{' '}
              <span className="text-accent-red font-extrabold">{t('roadmap.titleAccent')}</span>
            </>
          }
          description={t('roadmap.desc')}
        />

        <div className="grid md:grid-cols-3 gap-5 mb-14">
          {columns.map((col) => {
            const Icon = col.icon;
            return (
              <div
                key={col.key}
                className="bg-[#070715]/40 border border-white/[0.08] rounded-xl p-6 flex flex-col"
              >
                <div
                  className={`inline-flex items-center gap-2 self-start px-2.5 py-1 rounded-full border text-xs font-semibold uppercase tracking-wider mb-4 ${col.accent}`}
                >
                  <Icon className="w-3.5 h-3.5" aria-hidden="true" />
                  {col.title}
                </div>
                <ul className="space-y-3 text-sm text-gray-400 leading-relaxed flex-1">
                  {col.items.map((item) => (
                    <li key={item} className="flex gap-2">
                      <span className="text-accent-red mt-1.5 shrink-0">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            );
          })}
        </div>

        <h3 className="text-lg font-bold font-display text-white mb-5">
          {t('roadmap.changelog')}
        </h3>
        <ol className="relative border-s border-white/10 ms-3 space-y-8">
          {ROADMAP.changelog.map((entry) => (
            <li key={entry.date} className="ms-6">
              <span className="absolute -start-1.5 mt-1.5 w-3 h-3 rounded-full bg-accent-red ring-4 ring-background-primary" />
              <time className="text-xs font-mono text-accent-red font-semibold">{entry.date}</time>
              <h4 className="text-base font-bold text-white mt-1 mb-2">{entry.title}</h4>
              <ul className="space-y-1.5 text-sm text-gray-400">
                {entry.items.map((item) => (
                  <li key={item}>— {item}</li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
};
