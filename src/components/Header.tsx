import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      // Active section scroll tracking
      const sections = ['hero', 'features', 'content', 'ecosystem', 'reviews', 'faq', 'developer'];
      const scrollPos = window.scrollY + 200;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section === 'hero' ? 'home' : section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <>
      <header
        className="fixed top-0 left-0 right-0 z-50 transition-[transform] duration-300 px-4 sm:px-6 py-4"
      >
        <div
          className={`max-w-[1200px] mx-auto rounded-2xl py-3 px-6 sm:px-8 flex items-center justify-between transition-[background-color,border-color,box-shadow] duration-350 ${
            isScrolled
              ? 'bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.1)]'
              : 'bg-white/[0.02] backdrop-blur-lg border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.03)]'
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center shrink-0 interactive-target">
            <img src="/assets/logo.png" alt="CINEFLIX" className="h-7 sm:h-8 w-auto" />
          </a>

          {/* Desktop Links (Capsule hovers and active pill buttons) */}
          <nav className="hidden md:flex items-center gap-2 text-sm font-medium text-gray-300">
            <a
              href="#hero"
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 interactive-target ${
                activeSection === 'home'
                  ? 'bg-white text-black shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              Home
            </a>

            <a
              href="#features"
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 interactive-target ${
                activeSection === 'features'
                  ? 'bg-white text-black shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
              </svg>
              Features
            </a>
            
            <a
              href="#content"
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 interactive-target ${
                activeSection === 'content'
                  ? 'bg-white text-black shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Screenshots
            </a>

            <a
              href="#ecosystem"
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 interactive-target ${
                activeSection === 'ecosystem'
                  ? 'bg-white text-black shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              Ecosystem
            </a>

            <a
              href="#reviews"
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 interactive-target ${
                activeSection === 'reviews'
                  ? 'bg-white text-black shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.36 1.246.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.572-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z" />
              </svg>
              Reviews
            </a>

            <a
              href="#faq"
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 interactive-target ${
                activeSection === 'faq'
                  ? 'bg-white text-black shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              FAQ
            </a>

            <a
              href="#developer"
              className={`px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1.5 interactive-target ${
                activeSection === 'developer'
                  ? 'bg-white text-black shadow-md'
                  : 'text-gray-300 hover:text-white hover:bg-white/5'
              }`}
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Developer
            </a>

            <a
              href="https://github.com/simoabid/CINEFLIX-Mobile"
              target="_blank"
              rel="noopener noreferrer"
              className="px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 flex items-center gap-1 text-gray-300 hover:text-white hover:bg-white/5 interactive-target"
            >
              <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Source
            </a>

            <a
              href="https://www.buymeacoffee.com/seemoo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-brand hover:bg-[#E0121A] text-white px-4 py-1.5 rounded-full text-xs font-semibold shadow-md shadow-brand/20 transition-all duration-200 hover:-translate-y-0.5 active:scale-97 interactive-target"
            >
              Support
            </a>
          </nav>

          {/* Mobile Hamburguer Toggle */}
          <button
            onClick={toggleMenu}
            className="md:hidden flex flex-col justify-center items-center gap-1.5 w-8 h-8 focus:outline-none cursor-pointer interactive-target"
            aria-label="Toggle navigation menu"
            aria-expanded={isMenuOpen}
          >
            <span
              className={`w-6 h-0.5 bg-white transition-transform duration-300 ${
                isMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-opacity duration-300 ${isMenuOpen ? 'opacity-0' : ''}`}
            />
            <span
              className={`w-6 h-0.5 bg-white transition-transform duration-300 ${
                isMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </button>
        </div>
      </header>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 bg-background-primary transition-[opacity,transform] duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:hidden flex flex-col justify-center px-8 space-y-6 text-xl font-semibold ${
          isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <a href="#hero" onClick={closeMenu} className="hover:text-accent-red transition-colors text-white flex items-center gap-3">
          Home
        </a>
        <a href="#features" onClick={closeMenu} className="hover:text-accent-red transition-colors text-white flex items-center gap-3">
          Features
        </a>
        <a href="#content" onClick={closeMenu} className="hover:text-accent-red transition-colors text-white flex items-center gap-3">
          Screenshots
        </a>
        <a href="#ecosystem" onClick={closeMenu} className="hover:text-accent-red transition-colors text-white flex items-center gap-3">
          Ecosystem
        </a>
        <a href="#reviews" onClick={closeMenu} className="hover:text-accent-red transition-colors text-white flex items-center gap-3">
          Reviews
        </a>
        <a href="#faq" onClick={closeMenu} className="hover:text-accent-red transition-colors text-white flex items-center gap-3">
          FAQ
        </a>
        <a href="#developer" onClick={closeMenu} className="hover:text-accent-red transition-colors text-white flex items-center gap-3">
          Developer
        </a>
        <div className="h-[1px] bg-white/10 w-full my-4" />
        <a
          href="https://github.com/simoabid/CINEFLIX-Mobile"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
          className="flex items-center justify-center gap-2 bg-white/5 border border-white/10 rounded-xl py-3 text-white text-base hover:bg-white/10"
        >
          Source Code
        </a>
        <a
          href="https://www.buymeacoffee.com/seemoo"
          target="_blank"
          rel="noopener noreferrer"
          onClick={closeMenu}
          className="bg-brand rounded-xl py-3 text-white text-base font-semibold text-center hover:bg-brand/90 shadow-lg shadow-brand/20"
        >
          Support Developer
        </a>
      </div>
    </>
  );
};
