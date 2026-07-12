import React from 'react';
import { Volume2, VolumeX } from 'lucide-react';
import { useI18n } from '../contexts/I18nContext';
import { useSound } from '../contexts/SoundContext';

export const SoundToggle: React.FC = () => {
  const { enabled, setEnabled, playWhoosh } = useSound();
  const { t } = useI18n();

  return (
    <button
      type="button"
      onClick={() => {
        const next = !enabled;
        setEnabled(next);
        if (next) playWhoosh();
      }}
      className="inline-flex items-center justify-center w-9 h-9 rounded-full border border-white/10 bg-white/[0.03] text-gray-300 hover:text-white hover:bg-white/5 interactive-target"
      aria-pressed={enabled}
      aria-label={enabled ? t('sound.on') : t('sound.off')}
      title={t('sound.hint')}
    >
      {enabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
    </button>
  );
};
