import React, { useCallback, useEffect, useState } from 'react';
import { Pause, Play } from 'lucide-react';
import { ProductFrame } from './ProductFrame';
import { REEL_FRAMES } from '../config/content';
import { useI18n } from '../contexts/I18nContext';
import { useSound } from '../contexts/SoundContext';

const SLIDE_MS = 3200;

/**
 * Silent product reel — cinematic crossfade of real screenshots.
 * Optional real video: place public/assets/reel.mp4 and it takes priority.
 */
export const ProductReel: React.FC = () => {
  const { t } = useI18n();
  const { playWhoosh } = useSound();
  const [index, setIndex] = useState(0);
  const [playing, setPlaying] = useState(true);
  const [hasVideo, setHasVideo] = useState(false);
  const [videoFailed, setVideoFailed] = useState(false);

  useEffect(() => {
    // Probe for optional real reel file
    fetch('/assets/reel.mp4', { method: 'HEAD' })
      .then((r) => {
        if (r.ok) setHasVideo(true);
      })
      .catch(() => setHasVideo(false));
  }, []);

  useEffect(() => {
    if (!playing || hasVideo) return;
    const id = window.setInterval(() => {
      setIndex((i) => {
        const next = (i + 1) % REEL_FRAMES.length;
        return next;
      });
      playWhoosh();
    }, SLIDE_MS);
    return () => clearInterval(id);
  }, [playing, hasVideo, playWhoosh]);

  const toggle = useCallback(() => setPlaying((p) => !p), []);

  const frame = REEL_FRAMES[index];
  const progress = ((index + 1) / REEL_FRAMES.length) * 100;

  return (
    <div className="w-full max-w-[1180px] mx-auto">
      <div className="relative">
        {hasVideo && !videoFailed ? (
          <ProductFrame size="showcase" stage>
            <video
              className="absolute inset-0 w-full h-full object-cover"
              src="/assets/reel.mp4"
              autoPlay
              muted
              loop
              playsInline
              onError={() => setVideoFailed(true)}
            />
          </ProductFrame>
        ) : (
          <ProductFrame size="showcase" stage>
            {REEL_FRAMES.map((f, i) => (
              <img
                key={f.src}
                src={f.src}
                alt={i === index ? f.alt : ''}
                className={`absolute inset-0 w-full h-full object-cover object-center transition-opacity duration-700 ease-out ${
                  i === index ? 'opacity-100 z-10' : 'opacity-0 z-0'
                }`}
                loading={i === 0 ? 'eager' : 'lazy'}
              />
            ))}
          </ProductFrame>
        )}

        {/* Transport bar */}
        <div className="mt-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={toggle}
              className="inline-flex items-center gap-2 min-h-[40px] px-4 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 text-sm font-semibold interactive-target"
              aria-pressed={playing}
            >
              {playing ? (
                <>
                  <Pause className="w-4 h-4" aria-hidden="true" />
                  {t('reel.pause')}
                </>
              ) : (
                <>
                  <Play className="w-4 h-4" aria-hidden="true" />
                  {t('reel.play')}
                </>
              )}
            </button>
            <span className="text-xs text-gray-500">{t('reel.muteNote')}</span>
          </div>

          {!hasVideo || videoFailed ? (
            <p className="text-sm font-semibold text-white">
              {frame.label}
              <span className="text-gray-500 font-normal ms-2">
                {index + 1}/{REEL_FRAMES.length}
              </span>
            </p>
          ) : null}
        </div>

        {!hasVideo || videoFailed ? (
          <div
            className="mt-3 h-1 rounded-full bg-white/10 overflow-hidden"
            role="progressbar"
            aria-valuenow={Math.round(progress)}
            aria-valuemin={0}
            aria-valuemax={100}
            aria-label={frame.label}
          >
            <div
              className="h-full bg-accent-red transition-[width] duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
};
