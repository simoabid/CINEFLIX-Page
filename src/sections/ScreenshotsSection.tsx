import React, { useCallback, useEffect, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ProductFrame } from '../components/ProductFrame';
import { useRegisterSection } from '../contexts/MockupContext';
import { SCREENSHOTS } from '../config/site';

/**
 * Spotlight gallery: one large floating product frame + thumbnail rail.
 * More modern than a flat horizontal phone-style strip.
 */
export const ScreenshotsSection: React.FC = () => {
  const screenshotsRef = useRegisterSection('content');
  const [active, setActive] = useState(0);
  const total = SCREENSHOTS.length;
  const current = SCREENSHOTS[active];

  const go = useCallback(
    (dir: -1 | 1) => {
      setActive((i) => (i + dir + total) % total);
    },
    [total],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const section = document.getElementById('content');
      if (!section) return;
      const rect = section.getBoundingClientRect();
      const inView = rect.top < window.innerHeight && rect.bottom > 0;
      if (!inView) return;
      if (e.key === 'ArrowLeft') go(-1);
      if (e.key === 'ArrowRight') go(1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go]);

  return (
    <section id="content" ref={screenshotsRef} className="py-20 sm:py-24 bg-transparent relative overflow-hidden">
      {/* Full-bleed stage wash */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      >
        <div className="absolute left-1/2 top-[42%] -translate-x-1/2 -translate-y-1/2 w-[min(100%,900px)] h-[min(70%,520px)] bg-[radial-gradient(ellipse_at_center,rgba(88,28,135,0.22)_0%,rgba(255,30,39,0.08)_40%,transparent_70%)]" />
      </div>

      <div className="max-w-[1280px] mx-auto px-4 sm:px-6 relative z-10">
        <SectionHeading
          badge="Screenshots"
          title={
            <>
              CINEFLIX in <span className="text-accent-red font-extrabold">action</span>
            </>
          }
          description="A cinematic tour of the web app — home, collections, search, watch, My List, and account."
        />

        {/* Featured spotlight — full-width so native 1905×962 shots stay uncropped */}
        <div className="relative w-full max-w-[1180px] mx-auto">
          <ProductFrame
            key={current.src}
            src={current.src}
            alt={current.alt}
            size="showcase"
            stage
            loading="lazy"
            className="animate-fade-in"
          />


          {/* Side arrows — desktop / tablet */}
          <div className="hidden sm:flex absolute inset-y-0 left-0 lg:-left-14 items-center z-20 pl-2 lg:pl-0">
            <button
              type="button"
              onClick={() => go(-1)}
              className="w-11 h-11 rounded-full border border-white/10 bg-black/55 backdrop-blur-md text-white hover:bg-white/10 hover:border-white/20 transition-colors interactive-target items-center justify-center shadow-lg flex"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
          </div>
          <div className="hidden sm:flex absolute inset-y-0 right-0 lg:-right-14 items-center z-20 pr-2 lg:pr-0 justify-end">
            <button
              type="button"
              onClick={() => go(1)}
              className="w-11 h-11 rounded-full border border-white/10 bg-black/55 backdrop-blur-md text-white hover:bg-white/10 hover:border-white/20 transition-colors interactive-target items-center justify-center shadow-lg flex"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Active label + dots + mobile arrows */}
        <div className="mt-8 flex flex-col items-center gap-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => go(-1)}
              className="sm:hidden w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white interactive-target flex items-center justify-center"
              aria-label="Previous screenshot"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <p className="text-sm font-semibold text-white tracking-wide min-w-[8rem] text-center">
              {current.label}
              <span className="text-gray-500 font-normal ml-2">
                {active + 1} / {total}
              </span>
            </p>
            <button
              type="button"
              onClick={() => go(1)}
              className="sm:hidden w-10 h-10 rounded-full border border-white/10 bg-white/5 text-white interactive-target flex items-center justify-center"
              aria-label="Next screenshot"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

          <div className="flex items-center gap-2" role="tablist" aria-label="Screenshot slides">
            {SCREENSHOTS.map((shot, i) => (
              <button
                key={shot.label}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Show ${shot.label}`}
                onClick={() => setActive(i)}
                className={`h-1.5 rounded-full transition-all duration-300 interactive-target ${
                  i === active
                    ? 'w-8 bg-accent-red'
                    : 'w-1.5 bg-white/20 hover:bg-white/40'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Thumbnail rail */}
        <div
          className="mt-10 flex gap-3 sm:gap-4 overflow-x-auto pb-2 justify-start sm:justify-center screenshots-scroll"
          data-lenis-prevent
        >

          {SCREENSHOTS.map((shot, i) => {
            const isActive = i === active;
            return (
              <button
                key={shot.label}
                type="button"
                onClick={() => setActive(i)}
                className={[
                  'group/thumb relative shrink-0 w-[120px] sm:w-[140px] rounded-xl overflow-hidden transition-all duration-300 interactive-target',
                  'focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-red/60',
                  isActive
                    ? 'ring-2 ring-accent-red shadow-[0_0_24px_rgba(255,30,39,0.25)] scale-105'
                    : 'ring-1 ring-white/10 opacity-70 hover:opacity-100 hover:ring-white/25',
                ].join(' ')}
                aria-label={`View ${shot.label} screenshot`}
                aria-current={isActive ? 'true' : undefined}
              >
                <div className="relative w-full aspect-[1536/1024] bg-transparent">
                  <img
                    src={shot.src}
                    alt=""
                    className="absolute object-cover object-center"
                    style={{
                      top: '16.11%',
                      left: '15.30%',
                      width: '69.27%',
                      height: '58.79%',
                    }}
                    loading="lazy"
                    decoding="async"
                  />
                  <img
                    src="/computer_frame.png"
                    alt=""
                    className="absolute inset-0 w-full h-full object-fill pointer-events-none"
                    draggable={false}
                    loading="lazy"
                  />
                </div>

                <span
                  className={[
                    'absolute inset-x-0 bottom-0 py-1.5 text-[10px] font-semibold text-center z-10',
                    'bg-gradient-to-t from-black/90 to-transparent',
                    isActive ? 'text-white' : 'text-gray-300',
                  ].join(' ')}
                >
                  {shot.label}
                </span>

              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
