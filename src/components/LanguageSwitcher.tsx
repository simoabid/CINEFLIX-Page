import React from 'react';
import { LOCALES } from '../i18n';
import { useI18n } from '../contexts/I18nContext';

export const LanguageSwitcher: React.FC<{ compact?: boolean }> = ({ compact }) => {
  const { locale, setLocale, t } = useI18n();

  return (
    <div
      className={`flex items-center gap-0.5 rounded-full border border-white/10 bg-white/[0.03] p-0.5 ${
        compact ? '' : ''
      }`}
      role="group"
      aria-label={t('lang.label')}
    >
      {LOCALES.map((l) => {
        const active = locale === l.code;
        return (
          <button
            key={l.code}
            type="button"
            onClick={() => setLocale(l.code)}
            className={`min-h-[32px] min-w-[36px] px-2 rounded-full text-[10px] sm:text-xs font-bold tracking-wide transition-all interactive-target ${
              active
                ? 'bg-white text-black shadow-sm'
                : 'text-gray-400 hover:text-white'
            }`}
            aria-pressed={active}
            title={l.label}
          >
            {l.native}
          </button>
        );
      })}
    </div>
  );
};
