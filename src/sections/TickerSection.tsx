import React from 'react';
import { TICKER_ITEMS } from '../config/site';

export const TickerSection: React.FC = () => {
  const track = (
    <div className="flex items-center gap-10 pr-10 text-sm text-gray-300 font-semibold tracking-wide">
      {TICKER_ITEMS.map((item) => (
        <span key={item} className="flex items-center gap-2 shrink-0">
          <span className="w-1.5 h-1.5 rounded-full bg-accent-red shrink-0" aria-hidden="true" />
          {item}
        </span>
      ))}
    </div>
  );

  return (
    <section
      className="bg-transparent py-5 border-y border-white/5 overflow-hidden"
      aria-label="Product highlights"
    >
      <div className="flex w-max animate-marquee">
        {track}
        <div aria-hidden="true">{track}</div>
      </div>
    </section>
  );
};
