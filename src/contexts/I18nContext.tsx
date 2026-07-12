/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { LOCALES, translate, type Locale } from '../i18n';

const STORAGE_KEY = 'cineflix-landing-locale';

type I18nContextValue = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, fallback?: string) => string;
  dir: 'ltr' | 'rtl';
};

const I18nContext = createContext<I18nContextValue | undefined>(undefined);

function detectLocale(): Locale {
  try {
    const params = new URLSearchParams(window.location.search);
    const q = params.get('lang') as Locale | null;
    if (q && LOCALES.some((l) => l.code === q)) return q;

    const saved = localStorage.getItem(STORAGE_KEY) as Locale | null;
    if (saved && LOCALES.some((l) => l.code === saved)) return saved;
  } catch {
    /* ignore */
  }
  const nav = typeof navigator !== 'undefined' ? navigator.language.toLowerCase() : 'en';
  if (nav.startsWith('fr')) return 'fr';
  if (nav.startsWith('ar')) return 'ar';
  return 'en';
}


export const I18nProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [locale, setLocaleState] = useState<Locale>(() =>
    typeof window !== 'undefined' ? detectLocale() : 'en',
  );

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* ignore */
    }
  }, []);

  const dir = LOCALES.find((l) => l.code === locale)?.dir ?? 'ltr';

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = dir;
  }, [locale, dir]);

  const t = useCallback((key: string, fallback?: string) => translate(locale, key, fallback), [locale]);

  const value = useMemo(() => ({ locale, setLocale, t, dir }), [locale, setLocale, t, dir]);

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
};

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error('useI18n must be used within I18nProvider');
  return ctx;
}
