import React from 'react';
import { Accordion } from '../components/Accordion';
import { SectionHeading } from '../components/SectionHeading';

export const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="py-20 sm:py-24 bg-transparent relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeading
          badge="FAQ"
          title={
            <>
              Got <span className="text-accent-red font-extrabold">questions</span>?
            </>
          }
          description="Straight answers about the web app — free, open source, and browser-first."
        />
        <Accordion />
      </div>
    </section>
  );
};
