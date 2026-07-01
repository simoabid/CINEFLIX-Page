import React, { useEffect, useRef, useState } from 'react';

const PREVIEW_URL = 'https://cineflix.dev';
const IFRAME_W = 1440;
const IFRAME_H = 900;

export const AppPreview: React.FC = () => {
  const [loaded, setLoaded] = useState(false);
  const [blocked, setBlocked] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const loadTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Scale the 1440×900 iframe down so it always fits its container width
  useEffect(() => {
    const wrapper = wrapperRef.current;
    if (!wrapper) return;

    const applyScale = () => {
      const containerWidth = wrapper.clientWidth;
      const scale = Math.min(1, containerWidth / IFRAME_W);
      wrapper.style.setProperty('--iframe-scale', String(scale));
      // Set the wrapper's height to the scaled iframe height so the overlay + fallback align
      wrapper.style.height = `${IFRAME_H * scale}px`;
    };

    applyScale();
    const observer = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(applyScale) : null;
    if (observer) {
      observer.observe(wrapper);
      return () => observer.disconnect();
    }
  }, []);

  // If the iframe never fires onLoad within a few seconds, assume the host
  // environment blocked the embed (some browsers / extensions strip it) and
  // surface the fallback card so the section never looks broken.
  useEffect(() => {
    loadTimer.current = setTimeout(() => {
      if (!loaded) setBlocked(true);
    }, 6000);
    return () => {
      if (loadTimer.current) clearTimeout(loadTimer.current);
    };
  }, [loaded]);

  const handleOpen = () => {
    window.open(PREVIEW_URL, '_blank', 'noopener,noreferrer');
  };

  return (
    <div className="bg-cardBg border border-cardBorder rounded-2xl max-w-4xl mx-auto my-12 shadow-2xl relative overflow-hidden animate-fade-in-up">
      {/* Faux browser chrome */}
      <div className="flex items-center gap-3 px-4 sm:px-5 py-3 border-b border-cardBorder bg-gradient-to-b from-black/40 to-transparent">
        {/* Traffic lights */}
        <div className="flex items-center gap-1.5 shrink-0">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>

        {/* URL bar */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 bg-badgeBg border border-badgeBorder rounded-lg px-3 py-1.5 max-w-md mx-auto">
            <svg className="w-3.5 h-3.5 text-gray-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
            <span className="text-xs text-gray-300 font-mono truncate select-all">cineflix.dev</span>
            <span className="ml-auto flex items-center gap-1 text-[10px] text-emerald-400 font-semibold shrink-0">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
          </div>
        </div>

        {/* Open-in-new-tab action */}
        <button
          onClick={handleOpen}
          className="shrink-0 inline-flex items-center gap-1.5 text-gray-400 hover:text-white text-xs font-semibold transition-colors interactive-target"
          aria-label="Open cineflix.dev in a new tab"
          title="Open in new tab"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l-7 7M14 5h-4m4 0v4M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6" />
          </svg>
          <span className="hidden sm:inline">Open</span>
        </button>
      </div>

      {/* The live product, embedded */}
      <div ref={wrapperRef} className="relative bg-background-secondary overflow-hidden">
        {/* Loading shimmer */}
        {!loaded && !blocked && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-background-secondary gap-4 aspect-[16/10]">
            <div className="w-10 h-10 rounded-full border-2 border-accent-red/20 border-t-accent-red animate-spin" />
            <p className="text-gray-400 text-xs font-semibold">Loading cineflix.dev&hellips;</p>
          </div>
        )}

        {/* The real embed — rendered at desktop 1440×900, CSS-scaled to fit */}
        {!blocked && (
          <iframe
            ref={iframeRef}
            src={PREVIEW_URL}
            title="CINEFLIX — live app preview"
            loading="lazy"
            onLoad={() => setLoaded(true)}
            width="1440"
            height="900"
            className="border-0 origin-top-left absolute top-0 left-0"
            style={{
              width: '1440px',
              height: '900px',
              transform: 'scale(var(--iframe-scale, 1))',
              transformOrigin: 'top left',
              pointerEvents: 'none',
            }}
            sandbox="allow-scripts allow-same-origin"
            referrerPolicy="no-referrer"
          />
        )}

        {/* Transparent overlay — every click opens cineflix.dev in a new tab */}
        <a
          href={PREVIEW_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="absolute inset-0 z-10"
          aria-label="Open cineflix.dev in a new tab"
        />

        {/* Fallback card if embedding is blocked in the viewer's environment */}
        {blocked && (
          <div className="w-full aspect-[16/10] flex flex-col items-center justify-center text-center px-8 gap-5 bg-background-secondary">
            <div className="w-16 h-16 rounded-2xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red">
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                <circle cx="12" cy="12" r="10" />
              </svg>
            </div>
            <div className="space-y-1.5">
              <h3 className="text-white font-bold font-display text-lg">The live preview couldn&apos;t load here</h3>
              <p className="text-gray-400 text-sm max-w-sm mx-auto leading-relaxed">
                Your browser or an extension blocked the embedded preview. Open the real CINEFLIX app directly instead.
              </p>
            </div>
            <a
              href={PREVIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 bg-accent-red hover:bg-[#E0121A] text-white rounded-xl py-3 px-6 text-sm font-semibold shadow-lg shadow-accent-red/25 hover:-translate-y-0.5 active:scale-97 transition-all interactive-target"
            >
              Launch cineflix.dev
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l-7 7M14 5h-4m4 0v4M5 13v6a2 2 0 002 2h10a2 2 0 002-2v-6" />
              </svg>
            </a>
          </div>
        )}
      </div>

      {/* Caption */}
      <div className="px-5 sm:px-6 py-3.5 border-t border-cardBorder flex flex-col sm:flex-row items-center justify-between gap-2 text-center sm:text-left">
        <p className="text-gray-400 text-xs">
          This is the <span className="text-white font-semibold">live CINEFLIX app</span> — explore it right here, fully interactive.
        </p>
        <button
          onClick={handleOpen}
          className="text-accent-red hover:text-accent-red-light text-xs font-semibold inline-flex items-center gap-1.5 transition-colors interactive-target group"
        >
          Open full experience
          <svg className="w-3.5 h-3.5 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>
    </div>
  );
};
