import React, { useState } from 'react';

interface FAQItem {
  question: string;
  answer: string | React.ReactNode;
}

const FAQ_ITEMS: FAQItem[] = [
  {
    question: 'Is CINEFLIX really free?',
    answer: 'Yes! CINEFLIX offers a free plan with access to the full TMDB library in 720p. No credit card required. You can upgrade to Standard or Family for 4K, offline downloads, and ad-free streaming.'
  },
  {
    question: 'Does it work on iOS?',
    answer: 'CINEFLIX is currently Android-only. An iOS version is on the roadmap — follow the GitHub repo for updates.'
  },
  {
    question: 'Is it legal to stream content?',
    answer: 'CINEFLIX uses the TMDB API for metadata and discovery. Actual streaming sources are publicly available. We comply with all TMDB attribution requirements.'
  },
  {
    question: 'How do offline downloads work?',
    answer: 'Standard and Family plan users can download movies and episodes for offline viewing. Downloads are stored locally on your device and available for 30 days.'
  },
  {
    question: 'What devices are supported?',
    answer: "CINEFLIX requires Android 8.0 or higher. It's optimized for phones and tablets. The app is just 45MB and runs smoothly on mid-range devices."
  },
  {
    question: 'How can I report a bug or request a feature?',
    answer: (
      <span>
        Open an issue on the{' '}
        <a
          href="https://github.com/simoabid/CINEFLIX-Mobile"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-red hover:underline"
        >
          GitHub repository
        </a>{' '}
        or reach out on{' '}
        <a
          href="https://x.com/seemooabid"
          target="_blank"
          rel="noopener noreferrer"
          className="text-accent-red hover:underline"
        >
          X/Twitter
        </a>
        . We respond to all reports within 48 hours.
      </span>
    )
  }
];

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

        return (
          <div
            key={idx}
            className="bg-glass-card border border-glass-border hover:border-glass-border-hover rounded-xl overflow-hidden transition-colors duration-300"
          >
            <h3>
              <button
                id={btnId}
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                onClick={() => toggleIndex(idx)}
                className="w-full flex items-center justify-between p-5 sm:p-6 text-left font-semibold text-white hover:text-accent-red focus:text-accent-red transition-colors duration-200 focus:outline-none cursor-pointer text-sm sm:text-base"
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
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </button>
            </h3>
            
            {/* Accessible Expandable Panel */}
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
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
