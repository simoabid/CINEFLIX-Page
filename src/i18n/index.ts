import { en } from './en';
import { fr } from './fr';
import { ar } from './ar';
import type { Locale, TranslationDict } from './types';

export type { Locale, TranslationDict } from './types';
export { LOCALES } from './types';

export const dictionaries: Record<Locale, TranslationDict> = { en, fr, ar };

export function translate(locale: Locale, key: string, fallback?: string): string {
  return dictionaries[locale][key] ?? dictionaries.en[key] ?? fallback ?? key;
}
