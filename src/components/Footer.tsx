import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-transparent border-t border-white/[0.06] pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-10 md:gap-8 mb-16">
          {/* Brand Column */}
          <div className="space-y-5 col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-3">
            <a href="#" className="flex items-center gap-2 shrink-0 interactive-target">
              <span className="text-accent-red font-bold font-display text-2xl tracking-wider uppercase">
                CINEFLIX
              </span>
            </a>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Your premium movie and TV companion. Discover unlimited Movies & TV, More than 6,400+ collections, track your watchlist, and explore trending content — powered by TMDB.
            </p>
          </div>

          {/* Product Column */}
          <div className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-white font-extrabold font-display tracking-wider text-xs uppercase mb-4">Product</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li>
                <a href="#features" className="hover:text-accent-red transition-colors interactive-target">
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-accent-red transition-colors interactive-target">
                  How It Works
                </a>
              </li>
              <li>
                <a href="#content" className="hover:text-accent-red transition-colors interactive-target">
                  Screenshots
                </a>
              </li>
              <li>
                <a href="#faq" className="hover:text-accent-red transition-colors interactive-target">
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/simoabid/CINEFLIX-Mobile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-red transition-colors interactive-target"
                >
                  Source Code
                </a>
              </li>
            </ul>
          </div>

          {/* Developer Column */}
          <div className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-white font-extrabold font-display tracking-wider text-xs uppercase mb-4">Developer</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li>
                <a
                  href="https://abidev.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-red transition-colors interactive-target"
                >
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/simoabid"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-red transition-colors interactive-target"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-red transition-colors interactive-target"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* CONTACT & SUPPORT Column */}
          <div className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-white font-extrabold font-display tracking-wider text-xs uppercase mb-4">CONTACT & SUPPORT</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li>
                <a
                  href="mailto:seemooabid@gmail.com"
                  className="hover:text-accent-red transition-colors flex items-center gap-1.5 interactive-target"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  Contact
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/simoabid/CINEFLIX-Mobile/discussions"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-red transition-colors flex items-center gap-1.5 interactive-target"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                  GitHub Discussions
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/simoabid/CINEFLIX-Mobile/issues"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-red transition-colors flex items-center gap-1.5 interactive-target"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                  Report an Issue
                </a>
              </li>
              <li>
                <a
                  href="https://www.buymeacoffee.com/seemoo"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-red transition-colors flex items-center gap-1.5 interactive-target"
                >
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
                  </svg>
                  Buy Me a Coffee
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/simoabid/CINEFLIX-Mobile/blob/main/LICENSE"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-red transition-colors flex items-center gap-1.5 interactive-target"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                  Legal & MIT License
                </a>
              </li>
            </ul>
          </div>
          {/* GITHUB & SERVICES Column */}
          <div className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-3">
            <h4 className="text-white font-extrabold font-display tracking-wider text-xs uppercase mb-4">GITHUB & SERVICES</h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li>
                <a
                  href="https://github.com/simoabid/CINEFLIX-Mobile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-red transition-colors interactive-target"
                >
                  cineflix-org
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/simoabid/CINEFLIX-Mobile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-red transition-colors interactive-target"
                >
                  core repo
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/simoabid/CINEFLIX-Mobile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-red transition-colors interactive-target"
                >
                  ui components
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/simoabid/CINEFLIX-Mobile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-red transition-colors interactive-target"
                >
                  docs markdown
                </a>
              </li>
              <li>
                <a
                  href="https://abidev.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-red transition-colors flex items-center gap-1.5 interactive-target"
                >
                  <svg className="w-3.5 h-3.5 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                  docs.cineflix.cc
                </a>
              </li>
              <li>
                <a
                  href="https://abidev.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-accent-red transition-colors flex items-center gap-1.5 interactive-target"
                >
                  <svg className="w-3.5 h-3.5 text-accent-red" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  ui.cineflix.cc
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Panel */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs sm:text-sm font-medium">
            &copy; 2026 CINEFLIX &middot; Built by <span className="text-white font-semibold">ABID.Dev</span>
          </p>

          <div className="flex items-center gap-5 text-gray-500">
            <a
              href="https://github.com/simoabid"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
              aria-label="GitHub"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://x.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
              aria-label="X (formerly Twitter)"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
              aria-label="LinkedIn"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.779-1.75-1.75s.784-1.75 1.75-1.75 1.75.779 1.75 1.75-.784 1.75-1.75 1.75zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href="https://www.buymeacoffee.com/seemoo"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200"
              aria-label="Buy Me a Coffee"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 8h1a4 4 0 0 1 0 8h-1M2 8h16v9a4 4 0 0 1-4 4H6a4 4 0 0 1-4-4V8zM6 1v3M10 1v3M14 1v3" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
