import React from 'react';
import { FeatureCard } from '../components/FeatureCard';
import { SectionHeading } from '../components/SectionHeading';
import { RevealGroup } from '../components/motion/Reveal';
import { useRegisterSection } from '../contexts/MockupContext';
import { FEATURES } from '../config/site';
import { useI18n } from '../contexts/I18nContext';
import { useSectionSound } from '../hooks/useSectionSound';

export const FeaturesSection: React.FC = () => {
  const featuresRef = useRegisterSection('features');
  const { t } = useI18n();
  useSectionSound('features');

  return (
    <section id="features" ref={featuresRef} className="py-20 sm:py-24 bg-transparent relative">
      <div className="max-w-[1200px] mx-auto px-6">
        <SectionHeading
          badge={t('features.badge')}
          title={
            <>
              {t('features.title')}{' '}
              <span className="text-accent-red font-extrabold">{t('features.titleAccent')}</span>
            </>
          }
          description={t('features.desc')}
        />

        <RevealGroup className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6" fast>
          {FEATURES.map((feature) => (
            <FeatureCard
              key={feature.title}
              icon={feature.icon}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </RevealGroup>
      </div>
    </section>
  );
};
