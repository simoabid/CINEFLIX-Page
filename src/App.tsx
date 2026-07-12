import React from 'react';
import { Cursor } from './components/Cursor';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroGlow } from './components/HeroGlow';
import { StickyCta } from './components/StickyCta';
import { SeoMeta } from './components/SeoMeta';
import { ScrollProgress } from './components/ScrollProgress';
import { GsapProvider } from './components/GsapProvider';
import { LenisProvider } from './components/LenisProvider';
import { MockupProvider } from './contexts/MockupContext';
import { I18nProvider, useI18n } from './contexts/I18nContext';
import { SoundProvider } from './contexts/SoundContext';

import {
  HeroSection,
  TickerSection,
  FeaturesSection,
  DeepDiveSection,
  HowItWorksSection,
  LivePreviewSection,
  ScreenshotsSection,
  StackSection,
  SecuritySection,
  BenefitsSection,
  FaqSection,
  DeveloperSection,
  CtaSection,
  LiveStatsSection,
  ReelSection,
  CompareSection,
  RoadmapSection,
} from './sections';

const AppContent: React.FC = () => {
  const { t } = useI18n();

  return (
    <div className="relative min-h-screen bg-background-primary text-white selection:bg-accent-red selection:text-white">
      <SeoMeta />
      <a
        href="#hero"
        className="absolute left-6 -top-20 focus:top-6 bg-accent-red text-white py-2 px-6 rounded-lg font-semibold z-[9999] transition-all duration-300"
      >
        {t('skip')}
      </a>

      <ScrollProgress />

      <Cursor />
      <Header />
      <HeroGlow />

      <main>
        <HeroSection />
        <LiveStatsSection />
        <TickerSection />
        <ReelSection />
        <FeaturesSection />
        <DeepDiveSection />
        <HowItWorksSection />
        <LivePreviewSection />
        <ScreenshotsSection />
        <CompareSection />
        <StackSection />
        <SecuritySection />
        <RoadmapSection />
        <BenefitsSection />
        <FaqSection />
        <DeveloperSection />
        <CtaSection />
      </main>

      <Footer />
      <StickyCta />
    </div>
  );
};

export default function App() {
  return (
    <I18nProvider>
      <SoundProvider>
        <GsapProvider>
          <LenisProvider>
            <MockupProvider>
              <AppContent />
            </MockupProvider>
          </LenisProvider>
        </GsapProvider>
      </SoundProvider>
    </I18nProvider>
  );
}
