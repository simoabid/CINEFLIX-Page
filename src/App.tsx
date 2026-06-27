import React, { useState, useEffect } from 'react';
import { Cursor } from './components/Cursor';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HeroParticles } from './components/HeroParticles';
import { HeroGlow } from './components/HeroGlow';
import { MockupSwitcher } from './components/MockupSwitcher';
import { MockupProvider, useRegisterSection } from './contexts/MockupContext';
import { MovieSearch } from './components/MovieSearch';
import { Accordion } from './components/Accordion';

// Simple Count-up Timer Component for statistics
const Counter: React.FC<{ target: number; suffix?: string; duration?: number }> = ({ target, suffix = '', duration = 1500 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const end = target;
    const stepTime = 20; // 50fps
    const totalSteps = duration / stepTime;
    const increment = end / totalSteps;

    const timer = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);

    return () => clearInterval(timer);
  }, [target, duration]);

  return <span>{count.toLocaleString()}{suffix}</span>;
};

const AppContent: React.FC = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Register sections for sticky mockup switcher
  const heroRef = useRegisterSection('hero');
  const featuresRef = useRegisterSection('features');
  const howItWorksRef = useRegisterSection('how-it-works');
  const screenshotsRef = useRegisterSection('screenshots');
  const techRef = useRegisterSection('tech');

  // Track scroll progress top bar
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        setScrollProgress((window.scrollY / totalHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="relative min-h-screen bg-background-primary text-white selection:bg-accent-red selection:text-white">
      {/* SKIP LINK FOR ACCESSIBILITY */}
      <a
        href="#hero"
        className="absolute left-6 -top-20 focus:top-6 bg-accent-red text-white py-2 px-6 rounded-lg font-semibold z-[9999] transition-all duration-300"
      >
        Skip to content
      </a>

      {/* SCROLL PROGRESS BAR */}
      <div
        className="fixed top-0 left-0 h-[3px] bg-accent-red z-[9999] transition-all duration-75 origin-left"
        style={{ width: `${scrollProgress}%` }}
      />

      {/* CUSTOM INTERACTIVE CURSOR */}
      <Cursor />

      {/* FIXED LIQUID GLASS NAVIGATION HEADER */}
      <Header />

      {/* GLOBAL BACKDROP GLOWS */}
      <HeroGlow />

      <main>
        {/* HERO SECTION */}
        <section
          id="hero"
          ref={heroRef}
          className="relative min-h-screen pt-32 pb-20 flex items-center overflow-hidden"
        >
          {/* INTERACTIVE BACKDROP */}
          <HeroParticles />

          <div className="max-w-[1200px] mx-auto px-6 w-full relative z-10 space-y-16">
            {/* Top row: Two columns for mobile-first layout */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
              {/* Left Column: Text content */}
              <div className="lg:col-span-7 space-y-8 text-center lg:text-left flex flex-col items-center lg:items-start">
                {/* Badge Tag */}
                <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-accent-red/20 bg-accent-red/5 text-[10px] sm:text-xs font-semibold uppercase tracking-wider text-accent-red">
                  <span className="w-1.5 h-1.5 rounded-full bg-accent-red animate-pulse" />
                  CINEFLIX
                </div>

                {/* Title */}
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.15] max-w-2xl font-display text-white">
                  Your Cinematic <br className="hidden sm:inline" />
                  Universe, <span className="text-accent-red">Reinvented</span>
                  <span className="block text-gray-300 text-xl sm:text-2xl lg:text-3xl font-normal font-sans mt-4">
                    — your open source cinema stack.
                  </span>
                </h1>
                
                {/* Subtitle / Description */}
                <p className="text-gray-400 text-sm sm:text-base lg:text-lg max-w-[62ch] leading-relaxed">
                  Dive into unlimited Movies & TV, more than 6,400+ collections. Track your watchlist. Discover hidden gems. CINEFLIX is the next-gen experience you've been waiting for — built for cinema enthusiasts.
                </p>

                {/* CTAs */}
                <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
                  <a
                    href="#download"
                    className="inline-flex items-center justify-center gap-2 bg-accent-red hover:bg-[#E0121A] text-white rounded-xl py-3 px-6 font-semibold shadow-lg shadow-accent-red/25 hover:-translate-y-0.5 active:scale-97 transition-all duration-200 interactive-target"
                  >
                    <svg className="w-5 h-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                    Download App
                  </a>
                  <a
                    href="https://github.com/simoabid/CINEFLIX-Mobile"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-xl py-3 px-6 font-semibold hover:-translate-y-0.5 active:scale-97 transition-all duration-200 interactive-target"
                  >
                    <svg className="w-5 h-5 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub Org
                  </a>
                </div>

                {/* Stats Row */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 pt-6 w-full border-t border-white/5">
                  <div className="space-y-1">
                    <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
                      <Counter target={6400} suffix="+" />
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold tracking-wider text-gray-500 uppercase font-mono">
                      Collections
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
                      <Counter target={16} />
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold tracking-wider text-gray-500 uppercase font-mono">
                      Genre Filters
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
                      <Counter target={100} suffix="%" />
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold tracking-wider text-gray-500 uppercase font-mono">
                      Free
                    </div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-3xl sm:text-4xl font-bold tracking-tight text-white font-sans">
                      ∞
                    </div>
                    <div className="text-[10px] sm:text-xs font-bold tracking-wider text-gray-500 uppercase font-mono">
                      Movies & TV
                    </div>
                  </div>
                </div>

                {/* Social Proof */}
                <div className="flex items-center gap-2 text-xs sm:text-sm text-gray-400">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>
                    <strong className="text-white font-semibold"><Counter target={12847} /></strong> people downloaded this week
                  </span>
                </div>
              </div>

              {/* Right Column: Sticky Mockup Frame Switcher */}
              <div className="lg:col-span-5 flex justify-center lg:justify-end w-full">
                <MockupSwitcher />
              </div>
            </div>

            {/* Bottom 3-Card Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12">
              {/* Card 1 */}
              <div className="bg-glass-card hover:bg-glass-card-hover border border-glass-border hover:border-glass-border-hover rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow group">
                <div className="text-[10px] font-extrabold tracking-wider text-accent-red uppercase mb-4">
                  Core Engine
                </div>
                <h3 className="text-lg font-bold font-display mb-3 text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                  Multi-source scraper
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  TMDB-compliant metadata resolver that pulls up to 100+ unique sources per movie or show with parallel execution.
                </p>
              </div>

              {/* Card 2 */}
              <div className="bg-glass-card hover:bg-glass-card-hover border border-glass-border hover:border-glass-border-hover rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow group">
                <div className="text-[10px] font-extrabold tracking-wider text-accent-red uppercase mb-4">
                  Experience
                </div>
                <h3 className="text-lg font-bold font-display mb-3 text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  Modern UI & flows
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Next-gen React Native user interface focused on fast loading, searching, and fluid animations.
                </p>
              </div>

              {/* Card 3 */}
              <div className="bg-glass-card hover:bg-glass-card-hover border border-glass-border hover:border-glass-border-hover rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow group">
                <div className="text-[10px] font-extrabold tracking-wider text-accent-red uppercase mb-4">
                  Ecosystem
                </div>
                <h3 className="text-lg font-bold font-display mb-3 text-white flex items-center gap-2">
                  <svg className="w-5 h-5 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
                  </svg>
                  Open-source building blocks
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Multiple repositories under cineflix-mobile — core scraping, client UI elements, and detailed setup guides.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* INFINITE SCROLLING HIGHLIGHTS TICKER */}
        <section className="bg-transparent py-5 border-y border-white/5 overflow-hidden">
          <div className="flex w-max animate-marquee">
            <div className="flex items-center gap-12 pr-12 text-sm text-gray-300 font-semibold tracking-wide">
              <span className="flex items-center gap-2 shrink-0">
                <svg className="w-4 h-4 fill-yellow-500" viewBox="0 0 24 24">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                4.8 Rating on Google Play
              </span>
              <span className="flex items-center gap-2 shrink-0">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Editor's Choice 2025
              </span>
              <span className="flex items-center gap-2 shrink-0">
                <svg className="w-4 h-4 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                5M+ Happy Users
              </span>
              <span className="flex items-center gap-2 shrink-0">
                <svg className="w-4 h-4 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                #1 Streaming App in 12 Countries
              </span>
              <span className="flex items-center gap-2 shrink-0">
                <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                4K Ultra HD + Dolby Atmos
              </span>
              <span className="flex items-center gap-2 shrink-0">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Offline Downloads
              </span>
            </div>
            {/* Duplicated track for loop */}
            <div className="flex items-center gap-12 pr-12 text-sm text-gray-300 font-semibold tracking-wide" aria-hidden="true">
              <span className="flex items-center gap-2 shrink-0">
                <svg className="w-4 h-4 fill-yellow-500" viewBox="0 0 24 24">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                4.8 Rating on Google Play
              </span>
              <span className="flex items-center gap-2 shrink-0">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                Editor's Choice 2025
              </span>
              <span className="flex items-center gap-2 shrink-0">
                <svg className="w-4 h-4 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                </svg>
                5M+ Happy Users
              </span>
              <span className="flex items-center gap-2 shrink-0">
                <svg className="w-4 h-4 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                </svg>
                #1 Streaming App in 12 Countries
              </span>
              <span className="flex items-center gap-2 shrink-0">
                <svg className="w-4 h-4 text-orange-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <rect x="2" y="3" width="20" height="14" rx="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                4K Ultra HD + Dolby Atmos
              </span>
              <span className="flex items-center gap-2 shrink-0">
                <svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                  <polyline points="7 10 12 15 17 10" />
                  <line x1="12" y1="15" x2="12" y2="3" />
                </svg>
                Offline Downloads
              </span>
            </div>
          </div>
        </section>

        {/* FEATURES GRID SECTION */}
        <section
          id="features"
          ref={featuresRef}
          className="py-24 bg-transparent relative"
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <span className="bg-accent-red/10 border border-accent-red/20 text-accent-red px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                Why CINEFLIX
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display mt-4 mb-2">
                Everything You Need to{' '}
                <span className="text-accent-red font-extrabold">
                  Stream
                </span>
              </h2>
              <p className="text-gray-400 max-w-[68ch] mx-auto text-sm sm:text-base">
                Built for movie lovers who want the best experience on Android.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Feature 1 */}
              <div className="bg-glass-card hover:bg-glass-card-hover border border-glass-border hover:border-glass-border-hover rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow group">
                <div className="w-12 h-12 rounded-xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red mb-6 group-hover:scale-110 transition-all">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <rect x="2" y="3" width="20" height="14" rx="2" />
                    <line x1="8" y1="21" x2="16" y2="21" />
                    <line x1="12" y1="17" x2="12" y2="21" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold font-display mb-3 text-white">Hero Carousel</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Auto-rotating hero with backdrop images, logos, and gradient overlays for trending content on the home screen.
                </p>
              </div>

              {/* Feature 2 */}
              <div className="bg-glass-card hover:bg-glass-card-hover border border-glass-border hover:border-glass-border-hover rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow group">
                <div className="w-12 h-12 rounded-xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red mb-6 group-hover:scale-110 transition-all">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold font-display mb-3 text-white">6,400+ Collections</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Infinite scroll discovery of TMDB collections with parallel API batch loading and smart deduplication.
                </p>
              </div>

              {/* Feature 3 */}
              <div className="bg-glass-card hover:bg-glass-card-hover border border-glass-border hover:border-glass-border-hover rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow group">
                <div className="w-12 h-12 rounded-xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red mb-6 group-hover:scale-110 transition-all">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold font-display mb-3 text-white">16 Genre Filters</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Filter chips for Action, Sci-Fi, Fantasy, Horror, Animation, Comedy, Drama, and more categories.
                </p>
              </div>

              {/* Feature 4 */}
              <div className="bg-glass-card hover:bg-glass-card-hover border border-glass-border hover:border-glass-border-hover rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow group">
                <div className="w-12 h-12 rounded-xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red mb-6 group-hover:scale-110 transition-all">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold font-display mb-3 text-white">Multi-Type Search</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Search movies, TV shows, and people in one query with debounced input and genre-based browsing.
                </p>
              </div>

              {/* Feature 5 */}
              <div className="bg-glass-card hover:bg-glass-card-hover border border-glass-border hover:border-glass-border-hover rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow group">
                <div className="w-12 h-12 rounded-xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red mb-6 group-hover:scale-110 transition-all">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M19 21l-7-5-7 5V5a2 2 0 012-2h10a2 2 0 012 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold font-display mb-3 text-white">My List</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Watchlist management with persistent storage, filter chips, and long-press preview modals.
                </p>
              </div>

              {/* Feature 6 */}
              <div className="bg-glass-card hover:bg-glass-card-hover border border-glass-border hover:border-glass-border-hover rounded-xl p-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-glow group">
                <div className="w-12 h-12 rounded-xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red mb-6 group-hover:scale-110 transition-all">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M12 2a10 10 0 100 20 10 10 0 000-20z" />
                    <path d="M12 8v4" />
                    <path d="M12 16h.01" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold font-display mb-3 text-white">Glassmorphism UI</h3>
                <p className="text-gray-400 text-sm leading-relaxed">
                  Premium dark mode and glassmorphism throughout — every card, input, chip, and modal uses translucent backgrounds.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* HOW IT WORKS SECTION */}
        <section
          id="how-it-works"
          ref={howItWorksRef}
          className="py-24 bg-transparent relative"
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <span className="bg-accent-red/10 border border-accent-red/20 text-accent-red px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                How It Works
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display mt-4 mb-2">
                Three Steps to <span className="text-accent-red font-extrabold">Streaming</span>
              </h2>
              <p className="text-gray-400 max-w-[68ch] mx-auto text-sm sm:text-base">
                Get started in under a minute. No account required for free plan.
              </p>
            </div>

            <div className="flex flex-col md:flex-row items-center justify-between gap-12 md:gap-4 relative max-w-4xl mx-auto">
              {/* Step 1 */}
              <div className="flex flex-col items-center text-center space-y-4 max-w-xs relative z-10">
                <span className="text-4xl sm:text-5xl font-extrabold text-white/5 leading-none">01</span>
                <div className="w-14 h-14 rounded-2xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                    <polyline points="7 10 12 15 17 10" />
                    <line x1="12" y1="15" x2="12" y2="3" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold font-display text-white">Download</h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Get CINEFLIX from Google Play or sideload the APK directly. Just 45MB.
                </p>
              </div>

              {/* Connector */}
              <div className="hidden md:block shrink-0 opacity-20">
                <svg width="60" height="2" viewBox="0 0 60 2">
                  <line x1="0" y1="1" x2="60" y2="1" stroke="white" strokeWidth="2" strokeDasharray="6 4" />
                </svg>
              </div>

              {/* Step 2 */}
              <div className="flex flex-col items-center text-center space-y-4 max-w-xs relative z-10">
                <span className="text-4xl sm:text-5xl font-extrabold text-white/5 leading-none">02</span>
                <div className="w-14 h-14 rounded-2xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="11" cy="11" r="8" />
                    <line x1="21" y1="21" x2="16.65" y2="16.65" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold font-display text-white">Browse</h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Explore 6,400+ collections across 16 genres. Search movies, shows, and people.
                </p>
              </div>

              {/* Connector */}
              <div className="hidden md:block shrink-0 opacity-20">
                <svg width="60" height="2" viewBox="0 0 60 2">
                  <line x1="0" y1="1" x2="60" y2="1" stroke="white" strokeWidth="2" strokeDasharray="6 4" />
                </svg>
              </div>

              {/* Step 3 */}
              <div className="flex flex-col items-center text-center space-y-4 max-w-xs relative z-10">
                <span className="text-4xl sm:text-5xl font-extrabold text-white/5 leading-none">03</span>
                <div className="w-14 h-14 rounded-2xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                </div>
                <h3 className="text-lg font-bold font-display text-white">Watch</h3>
                <p className="text-gray-400 text-xs sm:text-sm">
                  Stream in HD, download for offline viewing, and track your watchlist.
                </p>
              </div>
            </div>

            {/* INTEGRATED SEARCH SIMULATOR */}
            <MovieSearch />
          </div>
        </section>

        {/* SCREENSHOTS GALLERY SECTION */}
        <section
          id="content"
          ref={screenshotsRef}
          className="py-24 bg-transparent relative"
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <span className="bg-accent-red/10 border border-accent-red/20 text-accent-red px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                Screenshots
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display mt-4 mb-2">
                See CINEFLIX in <span className="text-accent-red font-extrabold">Action</span>
              </h2>
              <p className="text-gray-400 max-w-[68ch] mx-auto text-sm sm:text-base">
                Four core screens — Home, Collections, Search, and My List — all in premium glassmorphism.
              </p>
            </div>

            {/* Screenshots Scroll */}
            <div className="screenshots-scroll flex gap-6 overflow-x-auto pb-8 pt-4 snap-x snap-mandatory scrollbar-thin">
              {/* Home */}
              <div className="screenshot-item flex flex-col items-center gap-4 snap-center shrink-0 w-[240px] group/item">
                <div className="relative aspect-[9/19] w-full rounded-2xl border-[6px] border-slate-900 bg-slate-950 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] ring-1 ring-white/5 transition-all duration-355 hover:scale-[1.03] hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(255,30,39,0.15)] hover:border-slate-800">
                  <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05]" />
                  <div className="absolute inset-0 pointer-events-none z-25 bg-gradient-to-tr from-transparent via-white/[0.1] to-transparent -translate-x-full -translate-y-full group-hover/item:translate-x-full group-hover/item:translate-y-full transition-transform duration-1000 ease-out" />
                  <img src="/assets/screenshots/home.jpg" alt="Home Screen" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <span className="text-sm font-semibold text-gray-300 transition-colors duration-200 group-hover/item:text-accent-red">Home</span>
              </div>

              {/* Collections */}
              <div className="screenshot-item flex flex-col items-center gap-4 snap-center shrink-0 w-[240px] group/item">
                <div className="relative aspect-[9/19] w-full rounded-2xl border-[6px] border-slate-900 bg-slate-950 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] ring-1 ring-white/5 transition-all duration-355 hover:scale-[1.03] hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(255,30,39,0.15)] hover:border-slate-800">
                  <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05]" />
                  <div className="absolute inset-0 pointer-events-none z-25 bg-gradient-to-tr from-transparent via-white/[0.1] to-transparent -translate-x-full -translate-y-full group-hover/item:translate-x-full group-hover/item:translate-y-full transition-transform duration-1000 ease-out" />
                  <img src="/assets/screenshots/collections.jpg" alt="Collections Screen" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <span className="text-sm font-semibold text-gray-300 transition-colors duration-200 group-hover/item:text-accent-red">Collections</span>
              </div>

              {/* Search */}
              <div className="screenshot-item flex flex-col items-center gap-4 snap-center shrink-0 w-[240px] group/item">
                <div className="relative aspect-[9/19] w-full rounded-2xl border-[6px] border-slate-900 bg-slate-950 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] ring-1 ring-white/5 transition-all duration-355 hover:scale-[1.03] hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(255,30,39,0.15)] hover:border-slate-800">
                  <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05]" />
                  <div className="absolute inset-0 pointer-events-none z-25 bg-gradient-to-tr from-transparent via-white/[0.1] to-transparent -translate-x-full -translate-y-full group-hover/item:translate-x-full group-hover/item:translate-y-full transition-transform duration-1000 ease-out" />
                  <img src="/assets/screenshots/search.jpg" alt="Search Screen" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <span className="text-sm font-semibold text-gray-300 transition-colors duration-200 group-hover/item:text-accent-red">Search</span>
              </div>

              {/* My List */}
              <div className="screenshot-item flex flex-col items-center gap-4 snap-center shrink-0 w-[240px] group/item">
                <div className="relative aspect-[9/19] w-full rounded-2xl border-[6px] border-slate-900 bg-slate-950 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)] ring-1 ring-white/5 transition-all duration-355 hover:scale-[1.03] hover:shadow-[0_25px_60px_rgba(0,0,0,0.9),0_0_30px_rgba(255,30,39,0.15)] hover:border-slate-800">
                  <div className="absolute inset-0 pointer-events-none z-20 bg-gradient-to-tr from-transparent via-white/[0.02] to-white/[0.05]" />
                  <div className="absolute inset-0 pointer-events-none z-25 bg-gradient-to-tr from-transparent via-white/[0.1] to-transparent -translate-x-full -translate-y-full group-hover/item:translate-x-full group-hover/item:translate-y-full transition-transform duration-1000 ease-out" />
                  <img src="/assets/screenshots/mylist.jpg" alt="My List Screen" className="w-full h-full object-cover" loading="lazy" />
                </div>
                <span className="text-sm font-semibold text-gray-300 transition-colors duration-200 group-hover/item:text-accent-red">My List</span>
              </div>
            </div>
          </div>
        </section>

        {/* EXPLORE THE PROJECT ECOSYSTEM (CinePro Style) */}
        <section className="py-24 bg-transparent relative" id="ecosystem">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
              <div>
                <h2 className="text-3xl sm:text-4xl font-bold font-display text-white">
                  Explore the CineFlix project ecosystem
                </h2>
                <p className="text-gray-400 text-sm mt-3 max-w-[60ch]">
                  All core pieces live on GitHub under <span className="text-accent-red">cineflix-org</span> — mix and match what you need for your setup.
                </p>
              </div>
              <a
                href="https://github.com/simoabid/CINEFLIX-Mobile"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white hover:text-accent-red text-sm font-semibold flex items-center gap-1.5 transition-colors shrink-0 group interactive-target"
              >
                View all repositories
                <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
            </div>

            {/* Repos Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* core */}
              <div className="bg-[#070715]/40 border border-white/[0.08] hover:border-white/[0.15] rounded-xl p-6 transition-all duration-300 flex flex-col justify-between h-full group shadow-lg">
                <div>
                  <div className="flex items-center justify-between w-full mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                        </svg>
                      </div>
                      <span className="font-mono font-bold text-white text-base">core</span>
                    </div>
                    <span className="bg-accent-red/10 border border-accent-red/20 text-accent-red text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase">
                      TypeScript
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">
                    TMDB-compliant core scraping and streaming engine that powers the entire CineFlix ecosystem.
                  </p>
                </div>
              </div>

              {/* ui */}
              <div className="bg-[#070715]/40 border border-white/[0.08] hover:border-white/[0.15] rounded-xl p-6 transition-all duration-300 flex flex-col justify-between h-full group shadow-lg">
                <div>
                  <div className="flex items-center justify-between w-full mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                        </svg>
                      </div>
                      <span className="font-mono font-bold text-white text-base">ui</span>
                    </div>
                    <span className="bg-accent-red/10 border border-accent-red/20 text-accent-red text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase">
                      Frontend v2
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">
                    New CineFlix mobile UI built with Expo + Tailwind CSS — the future mobile UI for ui.cineflix.cc.
                  </p>
                </div>
              </div>

              {/* docs */}
              <div className="bg-[#070715]/40 border border-white/[0.08] hover:border-white/[0.15] rounded-xl p-6 transition-all duration-300 flex flex-col justify-between h-full group shadow-lg">
                <div>
                  <div className="flex items-center justify-between w-full mb-6">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-lg bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red">
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                        </svg>
                      </div>
                      <span className="font-mono font-bold text-white text-base">docs</span>
                    </div>
                    <span className="bg-accent-red/10 border border-accent-red/20 text-accent-red text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase">
                      MDX
                    </span>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed mb-4">
                    Mentally-backed documentation powering docs.cineflix.cc — API reference, guides, and deployment notes.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TECH STACK & METRICS SECTION */}
        <section
          id="tech"
          ref={techRef}
          className="py-24 bg-transparent relative"
        >
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <span className="bg-accent-red/10 border border-accent-red/20 text-accent-red px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                Built With
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display mt-4 mb-2">
                Powered by <span className="text-accent-red font-extrabold">Modern Tech</span>
              </h2>
              <p className="text-gray-400 max-w-[68ch] mx-auto text-sm sm:text-base">
                A carefully chosen stack for performance, type safety, and pixel-perfect UI.
              </p>
            </div>

            {/* Tech stack grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
              <div className="bg-[#070715]/40 border border-white/[0.08] hover:border-white/[0.15] rounded-xl p-6 flex items-start gap-4 transition-all duration-300 sm:col-span-2 hover:-translate-y-0.5 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-400">
                  <i className="devicon-react-original text-2xl"></i>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold font-display text-white text-sm">React Native</h4>
                    <span className="bg-white/5 border border-white/10 text-gray-400 text-[9px] px-1.5 py-0.5 rounded">0.81.5</span>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                    Cross-platform mobile framework for building native Android & iOS apps from a single codebase.
                  </p>
                </div>
              </div>

              <div className="bg-[#070715]/40 border border-white/[0.08] hover:border-white/[0.15] rounded-xl p-6 flex items-start gap-4 transition-all duration-300 sm:col-span-2 hover:-translate-y-0.5 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-white">
                  <i className="devicon-react-original text-2xl"></i>
                </div>
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-bold font-display text-white text-sm">Expo</h4>
                    <span className="bg-white/5 border border-white/10 text-gray-400 text-[9px] px-1.5 py-0.5 rounded">SDK 54</span>
                  </div>
                  <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
                    Development platform and toolchain for React Native with instant updates and easy builds.
                  </p>
                </div>
              </div>

              {/* Smaller Cards */}
              <div className="bg-[#070715]/40 border border-white/[0.08] hover:border-white/[0.15] rounded-xl p-6 flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center shrink-0 text-blue-500">
                  <i className="devicon-typescript-plain text-2xl"></i>
                </div>
                <div>
                  <h4 className="font-bold font-display text-white text-sm">TypeScript</h4>
                  <span className="text-gray-500 text-xs">v5.9</span>
                </div>
              </div>

              <div className="bg-[#070715]/40 border border-white/[0.08] hover:border-white/[0.15] rounded-xl p-6 flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/20 flex items-center justify-center shrink-0 text-sky-400">
                  <i className="devicon-tailwindcss-plain text-2xl"></i>
                </div>
                <div>
                  <h4 className="font-bold font-display text-white text-sm">NativeWind</h4>
                  <span className="text-gray-500 text-xs">v4.2</span>
                </div>
              </div>

              <div className="bg-[#070715]/40 border border-white/[0.08] hover:border-white/[0.15] rounded-xl p-6 flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-white/10 border border-white/20 flex items-center justify-center shrink-0 text-white">
                  <i className="devicon-reactnavigation-original text-2xl"></i>
                </div>
                <div>
                  <h4 className="font-bold font-display text-white text-sm">Expo Router</h4>
                  <span className="text-gray-500 text-xs">v6.0</span>
                </div>
              </div>

              <div className="bg-[#070715]/40 border border-white/[0.08] hover:border-white/[0.15] rounded-xl p-6 flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 border border-orange-500/20 flex items-center justify-center shrink-0 text-orange-500">
                  <i className="devicon-swift-plain text-2xl"></i>
                </div>
                <div>
                  <h4 className="font-bold font-display text-white text-sm">Reanimated</h4>
                  <span className="text-gray-500 text-xs">v4.1</span>
                </div>
              </div>

              <div className="bg-[#070715]/40 border border-white/[0.08] hover:border-white/[0.15] rounded-xl p-6 flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center shrink-0 text-emerald-400">
                  <i className="devicon-mysql-plain text-2xl"></i>
                </div>
                <div>
                  <h4 className="font-bold font-display text-white text-sm">TMDB API</h4>
                  <span className="text-gray-500 text-xs">v3 endpoint</span>
                </div>
              </div>

              <div className="bg-[#070715]/40 border border-white/[0.08] hover:border-white/[0.15] rounded-xl p-6 flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center shrink-0 text-green-500">
                  <i className="devicon-mongodb-plain text-2xl"></i>
                </div>
                <div>
                  <h4 className="font-bold font-display text-white text-sm">AsyncStorage</h4>
                  <span className="text-gray-500 text-xs">v2.2</span>
                </div>
              </div>

              <div className="bg-[#070715]/40 border border-white/[0.08] hover:border-white/[0.15] rounded-xl p-6 flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-green-600/10 border border-green-600/20 flex items-center justify-center shrink-0 text-green-400">
                  <i className="devicon-nodejs-plain text-2xl"></i>
                </div>
                <div>
                  <h4 className="font-bold font-display text-white text-sm">Axios</h4>
                  <span className="text-gray-500 text-xs">v1.13</span>
                </div>
              </div>

              <div className="bg-[#070715]/40 border border-white/[0.08] hover:border-white/[0.15] rounded-xl p-6 flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 shadow-lg">
                <div className="w-12 h-12 rounded-xl bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center shrink-0 text-yellow-400">
                  <i className="devicon-javascript-plain text-2xl"></i>
                </div>
                <div>
                  <h4 className="font-bold font-display text-white text-sm">Lucide Icons</h4>
                  <span className="text-gray-500 text-xs">v0.562</span>
                </div>
              </div>
            </div>

            {/* Architecture Metrics */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-12 border-t border-white/5 text-center">
              <div>
                <span className="block text-xl sm:text-2xl font-extrabold text-white">2,400+</span>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Lines in TMDB Service</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-extrabold text-white">390+</span>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">TypeScript Types</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-extrabold text-white">60fps</span>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Animations</span>
              </div>
              <div>
                <span className="block text-xl sm:text-2xl font-extrabold text-white">20</span>
                <span className="text-xs text-gray-500 font-medium uppercase tracking-wider">Concurrent API Calls</span>
              </div>
            </div>
          </div>
        </section>

        {/* TESTIMONIALS SECTION */}
        <section className="py-24 bg-transparent relative" id="reviews">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <span className="bg-accent-red/10 border border-accent-red/20 text-accent-red px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                Reviews
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display mt-4 mb-2">
                Loved by <span className="text-accent-red font-extrabold">Movies & TV enthusiasts</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {/* Testimonial 1 */}
              <div className="bg-glass-card border border-glass-border rounded-xl p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-glass-border-hover transition-colors duration-250">
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed italic">
                    "Best streaming app I've used on Android. The download feature is a lifesaver for my daily commute."
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <img
                    src="https://i.pravatar.cc/80?u=sarah.k"
                    alt="Sarah K."
                    className="w-10 h-10 rounded-full border border-white/10"
                  />
                  <div>
                    <span className="block text-white font-bold text-sm">Sarah K.</span>
                    <span className="text-gray-500 text-xs">Standard Plan</span>
                  </div>
                </div>
              </div>

              {/* Testimonial 2 */}
              <div className="bg-glass-card border border-glass-border rounded-xl p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-glass-border-hover transition-colors duration-250">
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed italic">
                    "The 4K quality is incredible. My kids love their profiles and I love the parental controls. Family plan is worth every penny."
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <img
                    src="https://i.pravatar.cc/80?u=marcus.t"
                    alt="Marcus T."
                    className="w-10 h-10 rounded-full border border-white/10"
                  />
                  <div>
                    <span className="block text-white font-bold text-sm">Marcus T.</span>
                    <span className="text-gray-500 text-xs">Family Plan</span>
                  </div>
                </div>
              </div>

              {/* Testimonial 3 */}
              <div className="bg-glass-card border border-glass-border rounded-xl p-6 sm:p-8 space-y-6 flex flex-col justify-between hover:border-glass-border-hover transition-colors duration-250">
                <div className="space-y-4">
                  {/* Stars */}
                  <div className="flex gap-1 text-yellow-500">
                    {[...Array(5)].map((_, i) => (
                      <svg key={i} className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                    ))}
                  </div>
                  <p className="text-gray-300 text-sm sm:text-base leading-relaxed italic">
                    "Switched from Netflix and haven't looked back. The AI recommendations are surprisingly good — always finds something I like."
                  </p>
                </div>

                <div className="flex items-center gap-3 pt-4 border-t border-white/5">
                  <img
                    src="https://i.pravatar.cc/80?u=aisha.r"
                    alt="Aisha R."
                    className="w-10 h-10 rounded-full border border-white/10"
                  />
                  <div>
                    <span className="block text-white font-bold text-sm">Aisha R.</span>
                    <span className="text-gray-500 text-xs">Standard Plan</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ACCORDION FAQ SECTION */}
        <section className="py-24 bg-transparent relative" id="faq">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <span className="bg-accent-red/10 border border-accent-red/20 text-accent-red px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                FAQ
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display mt-4 mb-2">
                Got <span className="text-accent-red font-extrabold">Questions</span>?
              </h2>
              <p className="text-gray-400 max-w-[68ch] mx-auto text-sm sm:text-base">
                Everything you need to know about CINEFLIX.
              </p>
            </div>

            <Accordion />
          </div>
        </section>

        {/* DEVELOPER DETAILS SECTION */}
        <section className="py-24 bg-transparent relative" id="developer">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="text-center mb-16">
              <span className="bg-accent-red/10 border border-accent-red/20 text-accent-red px-3 py-1 rounded-full text-xs font-semibold uppercase tracking-wider">
                The Developer
              </span>
              <h2 className="text-3xl sm:text-4xl font-bold font-display mt-4 mb-2">
                Built by <span className="text-accent-red font-extrabold">ABID.Dev</span>
              </h2>
              <p className="text-gray-400 max-w-[68ch] mx-auto text-sm sm:text-base">
                A passionate full-stack developer from Morocco who turns coffee into code.
              </p>
            </div>

            <div className="max-w-4xl mx-auto bg-[#070715]/40 border border-white/[0.08] hover:border-white/[0.15] rounded-xl p-6 sm:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start shadow-xl">
              <img
                src="https://avatars.githubusercontent.com/u/169913102?v=4"
                alt="Mohamed Amine Abid"
                className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl border-2 border-white/10 shrink-0"
              />
              
              <div className="flex-1 space-y-4 text-center md:text-left">
                <div>
                  <h3 className="text-xl sm:text-2xl font-bold text-white font-display">ABID.Dev</h3>
                  <p className="text-accent-red text-xs sm:text-sm font-semibold mt-1">
                    Full-Stack Developer &middot; Software Engineering Student
                  </p>
                  <p className="text-gray-500 text-xs flex items-center justify-center md:justify-start gap-1 mt-2">
                    <svg className="w-3.5 h-3.5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    Khenifra, Morocco
                  </p>
                </div>

                <p className="text-gray-400 text-xs sm:text-sm leading-relaxed max-w-[68ch]">
                  Specializing in React, Node.js, TypeScript, and modern web technologies. Building web apps, mobile apps, tools, and open-source projects. Currently learning the MERN stack and always exploring new technologies.
                </p>

                {/* Developer social links row */}
                <div className="flex flex-wrap items-center justify-center md:justify-start gap-4 pt-2 text-gray-400 text-xs font-semibold">
                  <a
                    href="https://abidev.dev"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-white transition-colors interactive-target"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <circle cx="12" cy="12" r="10" />
                      <line x1="2" y1="12" x2="22" y2="12" />
                      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
                    </svg>
                    Portfolio
                  </a>

                  <a
                    href="https://github.com/simoabid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-white transition-colors interactive-target"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    GitHub
                  </a>

                  <a
                    href="https://x.com/seemooabid"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-white transition-colors interactive-target"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                    X / Twitter
                  </a>

                  <a
                    href="https://linkedin.com/in/mohamed-amine-abidd"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1.5 hover:text-white transition-colors interactive-target"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                    </svg>
                    LinkedIn
                  </a>

                  <a
                    href="mailto:seemooabid@gmail.com"
                    className="flex items-center gap-1.5 hover:text-white transition-colors interactive-target"
                  >
                    <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    Email
                  </a>
                </div>
              </div>
            </div>

            {/* Coffee star section */}
            <div className="max-w-4xl mx-auto mt-8 bg-[#070715]/40 border border-white/[0.08] hover:border-white/[0.15] rounded-xl p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 transition-all duration-300 shadow-lg">
              <div className="flex items-center gap-4 shrink-0">
                <div className="w-12 h-12 rounded-xl bg-accent-red/10 border border-accent-red/20 flex items-center justify-center text-accent-red">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
                  </svg>
                </div>
                <div>
                  <h4 className="font-bold font-display text-white text-sm sm:text-base">Support CINEFLIX</h4>
                  <p className="text-gray-500 text-xs sm:text-sm">Keep this open-source project alive.</p>
                </div>
              </div>

              <div className="flex gap-4 w-full sm:w-auto">
                <a
                  href="https://www.buymeacoffee.com/seemoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-brand text-white rounded-xl py-3 px-5 text-sm font-semibold shadow-lg hover:bg-brand/90 hover:shadow-accent-red/35 active:scale-97 transition-all interactive-target"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                    <path d="M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8z" />
                    <line x1="6" y1="1" x2="6" y2="4" />
                    <line x1="10" y1="1" x2="10" y2="4" />
                    <line x1="14" y1="1" x2="14" y2="4" />
                  </svg>
                  Buy Me a Coffee
                </a>
                <a
                  href="https://github.com/simoabid/cineflix-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 sm:flex-initial inline-flex items-center justify-center gap-2 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-xl py-3 px-5 text-sm font-semibold active:scale-97 transition-all interactive-target"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Star on GitHub
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* DOWNLOAD CTA BANNER SECTION (CinePro Style) */}
        <section className="py-24 bg-transparent relative" id="download">
          <div className="max-w-[1200px] mx-auto px-6">
            <div className="bg-[#070715]/40 border border-white/[0.08] rounded-xl p-8 sm:p-12 md:p-16 relative overflow-hidden shadow-2xl flex flex-col md:flex-row justify-between items-center gap-12">
              <div className="absolute top-0 right-0 w-96 h-96 bg-accent-red rounded-full blur-[150px] opacity-10 -mr-20 -mt-20 pointer-events-none" />
              
              <div className="relative z-10 max-w-xl space-y-6 text-center md:text-left">
                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display leading-tight">
                  Ready to Start <span className="text-accent-red">Streaming</span>?
                </h2>
                <p className="text-gray-400 text-sm leading-relaxed max-w-[68ch]">
                  Start with the docs, pull the core, and download the app for your setup!
                </p>
              </div>

              {/* Right button column */}
              <div className="relative z-10 flex flex-col sm:flex-row gap-4 shrink-0 w-full sm:w-auto">
                <a
                  href="#"
                  className="inline-flex items-center justify-center gap-2.5 bg-accent-red hover:bg-[#E0121A] text-white rounded-xl py-3 px-6 text-sm font-semibold shadow-lg shadow-accent-red/25 hover:-translate-y-0.5 active:scale-97 transition-all duration-200 interactive-target"
                >
                  Quickstart
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </a>
                
                <a
                  href="https://github.com/simoabid/cineflix-app"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-xl py-3 px-6 text-sm font-semibold hover:-translate-y-0.5 active:scale-97 transition-all duration-200 interactive-target"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                  </svg>
                  Source Code
                </a>

                <a
                  href="https://cineflix.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-xl py-3 px-6 text-sm font-semibold hover:-translate-y-0.5 active:scale-97 transition-all duration-200 interactive-target"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  App UI
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER SECTION */}
      <Footer />
    </div>
  );
};

export default function App() {
  return (
    <MockupProvider>
      <AppContent />
    </MockupProvider>
  );
}
