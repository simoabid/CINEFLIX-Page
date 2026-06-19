import React, { useState, useEffect } from 'react';

export const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 ${
          isScrolled ? 'py-3' : 'py-5'
        }`}
      >
        <div
          className={`max-w-[1200px] mx-auto rounded-2xl py-3 px-6 sm:px-8 flex items-center justify-between transition-all duration-350 ${
            isScrolled
              ? 'bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.1)]'
              : 'bg-white/[0.02] backdrop-blur-lg border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.03)]'
          }`}
        >
          {/* Logo */}
          <a href="#" className="flex items-center shrink-0 interactive-target">
            <img src="/assets/logo.png" alt="CINEFLIX" className="h-7 sm:h-8 w-auto" />
          </a>

          {/* Desktop Links */}
          <nav className="hidden md:flex items-center gap-6 lg:gap-8 text-sm font-medium text-gray-300">
            <a href="#features" className="hover:text-accent-red transition-colors duration-200 interactive-target">
              Features
            </a>
            <a href="#content" className="hover:text-accent-red transition-colors duration-200 interactive-target">
              Screenshots
            </a>
            <a href="#developer" className="hover:text-accent-red transition-colors duration-200 interactive-target">
              Developer
            </a>
            <a
              href="https://github.com/simoabid/CINEFLIX-Mobile"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 text-white rounded-xl py-2 px-4 transition-all duration-200 active:scale-97 interactive-target"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
              Source
            </a>
            <a
              href="https://www.buymeacoffee.com/seemoo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-gradient-to-r from-accent-red to-accent-red-dark text-white rounded-xl py-2 px-5 font-semibold transition-all duration-200 hover:shadow-lg hover:shadow-accent-red/20 active:scale-97 interactive-target"
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
        className={`fixed inset-0 z-40 bg-background-primary transition-all duration-500 md:hidden flex flex-col justify-center px-8 space-y-6 text-xl font-semibold ${
          isMenuOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-full pointer-events-none'
        }`}
      >
        <a href="#features" onClick={closeMenu} className="hover:text-accent-red transition-colors text-white">
          Features
        </a>
        <a href="#how-it-works" onClick={closeMenu} className="hover:text-accent-red transition-colors text-white">
          How It Works
        </a>
        <a href="#content" onClick={closeMenu} className="hover:text-accent-red transition-colors text-white">
          Screenshots
        </a>
        <a href="#faq" onClick={closeMenu} className="hover:text-accent-red transition-colors text-white">
          FAQ
        </a>
        <a href="#developer" onClick={closeMenu} className="hover:text-accent-red transition-colors text-white">
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
          className="bg-accent-red rounded-xl py-3 text-white text-base font-semibold text-center hover:bg-accent-red-light shadow-lg shadow-accent-red/20"
        >
          Support Developer
        </a>
      </div>
    </>
  );
};
