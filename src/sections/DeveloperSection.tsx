import React, { useEffect, useState } from 'react';
import { Coffee, Github, Heart, Mail, Star } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { SITE } from '../config/site';
import { useI18n } from '../contexts/I18nContext';
import { useSectionSound } from '../hooks/useSectionSound';

export const DeveloperSection: React.FC = () => {
  const { author, github } = SITE;
  const { t } = useI18n();
  const [starPulse, setStarPulse] = useState(false);
  useSectionSound('developer');

  useEffect(() => {
    const el = document.getElementById('developer');
    if (!el) return;
    let tmr = 0;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setStarPulse(true);
          window.clearTimeout(tmr);
          tmr = window.setTimeout(() => setStarPulse(false), 4000);
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => {
      obs.disconnect();
      window.clearTimeout(tmr);
    };
  }, []);


  return (
    <section id="developer" className="py-20 sm:py-24 bg-transparent relative">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <SectionHeading
          badge={t('dev.badge')}
          title={
            <>
              {t('dev.title')}{' '}
              <span className="text-accent-red font-extrabold">{author.name}</span>
            </>
          }
          description={t('dev.desc')}
        />

        <div className="max-w-4xl mx-auto bg-[#070715]/40 border border-white/[0.08] hover:border-white/[0.15] rounded-xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start shadow-xl">
          <img
            src={author.avatar}
            alt={author.fullName}
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-white/10 shrink-0"
            width={112}
            height={112}
            loading="lazy"
          />

          <div className="flex-1 space-y-4 text-center md:text-start">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-display">
                {author.name}
              </h3>
              <p className="text-accent-red text-xs sm:text-sm font-semibold mt-1">{author.role}</p>
              <p className="text-gray-500 text-xs mt-2">{author.location}</p>
            </div>

            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-[68ch]">
              {author.bio}
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-1 text-gray-400 text-xs font-semibold">
              <a
                href={author.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors interactive-target"
              >
                Portfolio
              </a>
              <a
                href={author.github}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors interactive-target"
              >
                GitHub
              </a>
              <a
                href={author.twitter}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors interactive-target"
              >
                X / Twitter
              </a>
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-white transition-colors interactive-target"
              >
                LinkedIn
              </a>
              <a
                href={author.email}
                className="inline-flex items-center gap-1 hover:text-white transition-colors interactive-target"
              >
                <Mail className="w-3.5 h-3.5" aria-hidden="true" />
                Email
              </a>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto mt-8 bg-[#070715]/40 border border-white/[0.08] hover:border-white/[0.15] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-300 shadow-lg">
          <div className="flex items-center gap-4 shrink-0">
            <div className="w-12 h-12 rounded-xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red">
              <Heart className="w-5 h-5" aria-hidden="true" />
            </div>
            <div>
              <h4 className="font-bold font-display text-white text-sm sm:text-base">
                {t('dev.support')}
              </h4>
              <p className="text-gray-500 text-xs sm:text-sm">{t('dev.supportDesc')}</p>
            </div>
          </div>

          <div className="flex gap-3 w-full sm:w-auto">
            <a
              href={author.coffee}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-brand text-white rounded-xl py-3 px-5 text-sm font-semibold shadow-lg hover:bg-brand/90 active:scale-[0.98] transition-all interactive-target min-h-[44px]"
            >
              <Coffee className="w-4 h-4" aria-hidden="true" />
              {t('dev.coffee')}
            </a>
            <a
              id="star-repo-cta"
              href={github}
              target="_blank"
              rel="noopener noreferrer"
              className={[
                'flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-xl py-3 px-5 text-sm font-semibold active:scale-[0.98] transition-all interactive-target min-h-[44px]',
                starPulse
                  ? 'ring-2 ring-accent-red/70 shadow-[0_0_28px_rgba(255,30,39,0.45)] scale-[1.03] animate-pulse'
                  : '',
              ].join(' ')}
            >
              <Star
                className={`w-4 h-4 ${starPulse ? 'text-accent-red fill-accent-red' : ''}`}
                aria-hidden="true"
              />
              <Github className="w-4 h-4 sm:hidden" aria-hidden="true" />
              <span className="hidden sm:inline">{t('cta.star')}</span>
              <span className="sm:hidden">{t('cta.star')}</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
