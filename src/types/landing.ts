import type { FeatureIcon, MockupSectionId } from '../config/site';

export type { FeatureIcon, MockupSectionId };

export interface NavLink {
  id: string;
  href: string;
  label: string;
}

export interface FeatureItem {
  icon: FeatureIcon;
  title: string;
  description: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}
