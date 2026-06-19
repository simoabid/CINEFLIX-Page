import React from 'react';
import { useMockup, SectionType } from '../contexts/MockupContext';

export const MockupSwitcher: React.FC = () => {
  const { activeSection } = useMockup();

  const screenshots: Record<SectionType, { src: string; alt: string }> = {
    hero: { src: '/assets/screenshots/home.jpg', alt: 'CINEFLIX Home Screen' },
    features: { src: '/assets/screenshots/collections.jpg', alt: 'CINEFLIX Collections Screen' },
    'how-it-works': { src: '/assets/screenshots/search.jpg', alt: 'CINEFLIX Search Screen' },
    screenshots: { src: '/assets/screenshots/mylist.jpg', alt: 'CINEFLIX My List Screen' },
    tech: { src: '/assets/screenshots/account.jpg', alt: 'CINEFLIX Account Screen' },
  };

  return (
    <div className="scroll-phone-wrapper flex justify-center items-center w-full relative group">
      {/* Neon Aura behind mockup */}
      <div className="absolute w-[240px] xs:w-[260px] ssm:w-[280px] aspect-[9/19] bg-gradient-to-tr from-accent-red/25 via-transparent to-violet-600/20 blur-3xl rounded-[28px] opacity-60 group-hover:opacity-90 group-hover:scale-[1.03] transition-all duration-500 pointer-events-none" />

      <div className="phone-mockup relative w-[240px] xs:w-[260px] ssm:w-[280px] aspect-[9/19] rounded-[28px] border-[8px] border-slate-900 bg-slate-950 p-2.5 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.9),0_0_50px_rgba(229,9,20,0.15)] ring-1 ring-white/10 transition-all duration-500 hover:scale-[1.02] hover:shadow-[0_30px_70px_-10px_rgba(0,0,0,0.95),0_0_60px_rgba(229,9,20,0.25)]">
        <div className="phone-screen-real relative w-full h-full rounded-[20px] overflow-hidden bg-slate-950">

          {/* Glass Reflection Sheen */}
          <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.06]" />

          {/* Diagonal Sweep Shine */}
          <div className="absolute inset-0 pointer-events-none z-25 bg-gradient-to-tr from-transparent via-white/[0.12] to-transparent -translate-x-full -translate-y-full group-hover:translate-x-full group-hover:translate-y-full transition-transform duration-1200 ease-out" />

          {(Object.keys(screenshots) as SectionType[]).map((key) => {
            const isActive = activeSection === key;
            return (
              <img
                key={key}
                src={screenshots[key].src}
                alt={screenshots[key].alt}
                className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ease-in-out ${
                  isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
                loading={key === 'hero' ? 'eager' : 'lazy'}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
};
