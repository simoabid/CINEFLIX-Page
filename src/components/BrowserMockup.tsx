import React from 'react';
import { useMockup } from '../contexts/MockupContext';
import { MOCKUP_BY_SECTION, type MockupSectionId } from '../config/site';
import { ProductFrame } from './ProductFrame';

/**
 * Scroll-linked product window for the hero — full screenshots, no edge crop.
 */
export const BrowserMockup: React.FC = () => {
  const { activeSection } = useMockup();
  const sectionKeys = Object.keys(MOCKUP_BY_SECTION) as MockupSectionId[];

  return (
    <div className="w-full max-w-none mx-auto">
      <ProductFrame size="hero" stage tilt loading="eager">
        {sectionKeys.map((key) => {
          const shot = MOCKUP_BY_SECTION[key];
          const isActive = activeSection === key;
          return (
            <img
              key={key}
              src={shot.src}
              alt={isActive ? shot.alt : ''}
              className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-500 ease-out ${
                isActive ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}

              loading={key === 'hero' ? 'eager' : 'lazy'}
              decoding="async"
            />
          );
        })}
      </ProductFrame>
    </div>
  );
};
