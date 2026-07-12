import React, { useEffect, useState } from 'react';
import { Check } from 'lucide-react';
import { useRegisterSection } from '../contexts/MockupContext';
import { DEEP_DIVES } from '../config/site';
import { STORY_BEATS } from '../config/content';
import { SectionHeading } from '../components/SectionHeading';
import { ProductFrame } from '../components/ProductFrame';
import { useI18n } from '../contexts/I18nContext';
import { useSectionSound } from '../hooks/useSectionSound';

function useTypedCaption(text: string, active: boolean) {
  const [shown, setShown] = useState('');

  useEffect(() => {
    if (!active) {
      setShown('');
      return;
    }
    const reduced =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      setShown(text);
      return;
    }
    setShown('');
    let i = 0;
    const id = window.setInterval(() => {
      i += 1;
      setShown(text.slice(0, i));
      if (i >= text.length) clearInterval(id);
    }, 16);
    return () => clearInterval(id);
  }, [text, active]);

  return shown;
}

const DeepDiveBlock: React.FC<{
  item: (typeof DEEP_DIVES)[number];
  beat: (typeof STORY_BEATS)[number];
  index: number;
}> = ({ item, beat, index }) => {
  const [inView, setInView] = useState(false);
  const caption = useTypedCaption(beat.caption, inView);

  useEffect(() => {
    const el = document.getElementById(`story-${item.id}`);
    if (!el) return;
    const obs = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setInView(true);
      },
      { threshold: 0.35 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [item.id]);

  return (
    <div
      id={`story-${item.id}`}
      className={`grid lg:grid-cols-2 gap-10 lg:gap-14 items-center ${
        item.reverse ? 'lg:[&>*:first-child]:order-2' : ''
      }`}
    >
      <div className="space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-block bg-accent-red/10 border border-accent-red/20 text-accent-red px-3 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider">
            {item.badge}
          </span>
          <span className="text-[10px] font-mono text-gray-500 uppercase tracking-wider">
            {String(index + 1).padStart(2, '0')} / {String(DEEP_DIVES.length).padStart(2, '0')}
          </span>
        </div>
        <h3 className="text-2xl sm:text-3xl font-bold font-display text-white leading-tight">
          {item.title}
        </h3>
        <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{item.description}</p>

        {/* Scroll-linked story caption */}
        <p
          className="min-h-[3.5rem] text-sm sm:text-base text-white/90 font-medium leading-relaxed border-s-2 border-accent-red ps-4"
          aria-live="polite"
        >
          {caption}
          {inView && caption.length < beat.caption.length ? (
            <span className="inline-block w-0.5 h-4 ms-0.5 bg-accent-red align-middle animate-pulse" />
          ) : null}
        </p>

        <ul className="space-y-3 pt-1">
          {item.bullets.map((bullet) => (
            <li key={bullet} className="flex items-start gap-2.5 text-sm text-gray-300">
              <span className="mt-0.5 w-5 h-5 rounded-full bg-accent-red/15 border border-accent-red/25 flex items-center justify-center shrink-0">
                <Check className="w-3 h-3 text-accent-red" aria-hidden="true" />
              </span>
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      <ProductFrame
        src={item.image}
        alt={item.imageAlt}
        size="feature"
        stage
        tilt={!item.reverse}
        loading="lazy"
      />
    </div>
  );
};

export const DeepDiveSection: React.FC = () => {
  const playerRef = useRegisterSection('player');
  const { t } = useI18n();
  useSectionSound('player');

  return (
    <section id="player" ref={playerRef} className="py-20 sm:py-24 bg-transparent relative">
      <div className="max-w-[1280px] mx-auto px-4 sm:px-6">
        <SectionHeading
          badge={t('deepDive.badge')}
          title={
            <>
              {t('deepDive.title')}{' '}
              <span className="text-accent-red font-extrabold">{t('deepDive.titleAccent')}</span>
            </>
          }
          description={t('deepDive.desc')}
        />

        <div className="space-y-20 sm:space-y-24">
          {DEEP_DIVES.map((item, index) => (
            <DeepDiveBlock
              key={item.id}
              item={item}
              beat={STORY_BEATS[index] ?? STORY_BEATS[0]}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
