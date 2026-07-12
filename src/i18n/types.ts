export type Locale = 'en' | 'fr' | 'ar';

export const LOCALES: { code: Locale; label: string; native: string; dir: 'ltr' | 'rtl' }[] = [
  { code: 'en', label: 'English', native: 'EN', dir: 'ltr' },
  { code: 'fr', label: 'Français', native: 'FR', dir: 'ltr' },
  { code: 'ar', label: 'العربية', native: 'AR', dir: 'rtl' },
];

export type TranslationDict = Record<string, string>;
