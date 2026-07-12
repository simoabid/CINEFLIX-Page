import { useEffect } from 'react';
import { SITE } from '../config/site';
import { useI18n } from '../contexts/I18nContext';

/**
 * Keeps document title + social meta in sync with locale.
 * Absolute OG image URLs improve Discord/Twitter/LinkedIn previews.
 */
export function SeoMeta() {
  const { locale, t } = useI18n();

  useEffect(() => {
    const title = `CINEFLIX — ${t('hero.titleAccent')} | Stream & Discover`;
    const description = t('hero.subline');
    // Prefer absolute URL for crawlers; falls back to path for local dev.
    const origin =
      typeof window !== 'undefined' ? window.location.origin : 'https://cineflix.dev';
    const ogImage = `${origin}/assets/og-image.png`;
    const pageUrl = typeof window !== 'undefined' ? window.location.href : SITE.url;

    document.title = title;

    const setMeta = (selector: string, attr: string, value: string) => {
      let el = document.querySelector(selector) as HTMLMetaElement | null;
      if (!el) {
        el = document.createElement('meta');
        if (selector.includes('property=')) {
          el.setAttribute('property', selector.match(/property="([^"]+)"/)![1]);
        } else if (selector.includes('name=')) {
          el.setAttribute('name', selector.match(/name="([^"]+)"/)![1]);
        }
        document.head.appendChild(el);
      }
      el.setAttribute(attr, value);
    };

    setMeta('meta[name="description"]', 'content', description);
    setMeta('meta[property="og:title"]', 'content', title);
    setMeta('meta[property="og:description"]', 'content', description);
    setMeta('meta[property="og:image"]', 'content', ogImage);
    setMeta('meta[property="og:url"]', 'content', pageUrl);
    setMeta('meta[property="og:locale"]', 'content', locale === 'ar' ? 'ar_AR' : locale === 'fr' ? 'fr_FR' : 'en_US');
    setMeta('meta[name="twitter:title"]', 'content', title);
    setMeta('meta[name="twitter:description"]', 'content', description);
    setMeta('meta[name="twitter:image"]', 'content', ogImage);
    setMeta('meta[name="twitter:card"]', 'content', 'summary_large_image');

    // Alternate locales for crawlers
    ['en', 'fr', 'ar'].forEach((lang) => {
      let link = document.querySelector(`link[rel="alternate"][hreflang="${lang}"]`) as HTMLLinkElement | null;
      if (!link) {
        link = document.createElement('link');
        link.rel = 'alternate';
        link.hreflang = lang;
        document.head.appendChild(link);
      }
      link.href = `${origin}/?lang=${lang}`;
    });
  }, [locale, t]);

  return null;
}
