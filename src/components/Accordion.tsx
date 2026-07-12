import React, { useState } from 'react';
import { FAQ_ITEMS, SITE } from '../config/site';

export const Accordion: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleIndex = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <div className="max-w-3xl mx-auto space-y-4">
      {FAQ_ITEMS.map((item, idx) => {
        const isOpen = openIndex === idx;
        const btnId = `faq-btn-${idx}`;
        const panelId = `faq-panel-${idx}`;
        const isLast = idx === FAQ_ITEMS.length - 1;

        return (
          <div
            key={item.question}
            className="bg-glass-card border border-glass-border hover:border-glass-border-hover rounded-xl overflow-hidden transition-colors duration-300"
          >
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleIndex(idx)}
                className="w-full flex items-center justify-between gap-4 p-5 sm:p-6 text-left font-semibold text-white hover:text-accent-red focus-visible:text-accent-red transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-accent-red/50 rounded-xl text-sm sm:text-base min-h-[56px]"
              >
                <span>{item.question}</span>
                <svg
                  className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-accent-red' : ''
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  aria-hidden="true"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </h3>

            <div
              id={panelId}
              role="region"
              aria-labelledby={btnId}
              aria-hidden={!isOpen}
              className={`grid transition-[grid-template-rows] duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
                isOpen ? 'grid-rows-[1fr] border-t border-glass-border' : 'grid-rows-[0fr]'
              }`}
            >
              <div className="overflow-hidden">
                <div className="p-5 sm:p-6 text-xs sm:text-sm text-gray-400 leading-relaxed">
                  {item.answer}
                  {isLast ? (
                    <span className="block mt-3">
                      Report issues on{' '}
                      <a
                        href={SITE.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-red hover:underline interactive-target"
                      >
                        GitHub
                      </a>{' '}
                      or reach out on{' '}
                      <a
                        href={SITE.author.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-accent-red hover:underline interactive-target"
                      >
                        X/Twitter
                      </a>
                      .
                    </span>
                  ) : null}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
