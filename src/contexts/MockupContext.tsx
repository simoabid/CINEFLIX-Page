/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useState, useEffect, useRef } from 'react';

export type SectionType = 'hero' | 'features' | 'how-it-works' | 'screenshots' | 'tech';

interface MockupContextType {
  activeSection: SectionType;
  setActiveSection: (section: SectionType) => void;
}

const MockupContext = createContext<MockupContextType | undefined>(undefined);

export const MockupProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<SectionType>('hero');

  return (
    <MockupContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </MockupContext.Provider>
  );
};

export const useMockup = () => {
  const context = useContext(MockupContext);
  if (!context) {
    throw new Error('useMockup must be used within a MockupProvider');
  }
  return context;
};

export const useRegisterSection = (section: SectionType) => {
  const { setActiveSection } = useMockup();
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(section);
          }
        });
      },
      {
        rootMargin: '-20% 0px -40% 0px',
        threshold: 0.15,
      }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
    };
  }, [section, setActiveSection]);

  return ref;
};
