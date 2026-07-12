import React from 'react';
import { AppPreview } from '../components/AppPreview';
import { SectionHeading } from '../components/SectionHeading';

export const LivePreviewSection: React.FC = () => {
  return (
    <section id="live-preview" className="py-12 sm:py-16 bg-transparent relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeading
          badge="Live product"
          title={
            <>
              See the real app at{' '}
              <span className="text-accent-red font-extrabold">cineflix.dev</span>
            </>
          }
          description="Embedded live preview when your browser allows it — or open the full experience in a new tab."
        />
        <AppPreview />
      </div>
    </section>
  );
};
