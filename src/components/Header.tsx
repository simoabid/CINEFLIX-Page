import React, { useEffect, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ExternalLink, Menu, X } from 'lucide-react';
import { SITE } from '../config/site';
import { useI18n } from '../contexts/I18nContext';
import { LanguageSwitcher } from './LanguageSwitcher';
import { SoundToggle } from './SoundToggle';
import { easeSnappy } from '../motion/variants';


const NAV = [
  { id: 'home', href: '#hero', labelKey: 'nav.home' },
  { id: 'features', href: '#features', labelKey: 'nav.features' },
  { id: 'player', href: '#player', labelKey: 'nav.player' },
  { id: 'content', href: '#content', labelKey: 'nav.screenshots' },
  { id: 'security', href: '#security', labelKey: 'nav.security' },
  { id: 'roadmap', href: '#roadmap', labelKey: 'nav.roadmap' },
  { id: 'faq', href: '#faq', labelKey: 'nav.faq' },
] as const;

export const Header: React.FC = () => {
  const { t } = useI18n();
  const reduced = useReducedMotion();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('home');


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);

      const sections = [
        'hero',
        'features',
        'player',
        'content',
        'security',
        'roadmap',
        'faq',
        'developer',
      ];
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  const closeMenu = () => setIsMenuOpen(false);

  const navId = (href: string) => (href === '#hero' ? 'home' : href.replace('#', ''));

  return (
    <>
      <motion.header
        className="fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 sm:py-4"
        initial={reduced ? false : { y: -24, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
      >
        <motion.div
          layout
          className={`max-w-[1280px] mx-auto rounded-2xl py-2.5 sm:py-3 px-3 sm:px-6 flex items-center justify-between gap-2 transition-[background-color,border-color,box-shadow] duration-350 ${
            isScrolled
              ? 'bg-white/[0.06] backdrop-blur-xl border border-white/15 shadow-[0_12px_40px_rgba(0,0,0,0.35),inset_0_1px_0_rgba(255,255,255,0.1)]'
              : 'bg-white/[0.02] backdrop-blur-lg border border-white/5 shadow-[0_8px_32px_rgba(0,0,0,0.15),inset_0_1px_0_rgba(255,255,255,0.03)]'
          }`}
        >
          <a
            href="#hero"
            className="flex items-center shrink-0 interactive-target"
            onClick={closeMenu}
          >
            <img src="/assets/logo.png" alt="CINEFLIX" className="h-7 sm:h-8 w-auto" />
          </a>

          <nav
            className="hidden lg:flex items-center gap-1 text-sm font-medium text-gray-300"
            aria-label="Primary"
          >
            {NAV.map((link) => {
              const id = navId(link.href);
              const isActive = activeSection === id;
              return (
                <a
                  key={link.id}
                  href={link.href}
                  className={`px-2.5 py-1.5 rounded-full text-xs font-semibold transition-all duration-300 interactive-target min-h-[36px] flex items-center ${
                    isActive
                      ? 'bg-white text-black shadow-md'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {t(link.labelKey)}
                </a>
              );
            })}
          </nav>

          <div className="flex items-center gap-1.5 sm:gap-2">
            <div className="hidden sm:block">
              <LanguageSwitcher compact />
            </div>
            <SoundToggle />
            <motion.a
              href={SITE.url}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center gap-1.5 bg-accent-red hover:bg-[#E0121A] text-white text-xs font-semibold rounded-full px-3.5 py-2 interactive-target min-h-[40px]"
              whileHover={reduced ? undefined : { scale: 1.05 }}
              whileTap={reduced ? undefined : { scale: 0.97 }}
              transition={easeSnappy}
            >
              {t('cta.launch')}
              <ExternalLink className="w-3.5 h-3.5" aria-hidden="true" />
            </motion.a>


            <button
              type="button"
              className="lg:hidden inline-flex items-center justify-center w-11 h-11 rounded-xl border border-white/10 bg-white/5 text-white interactive-target"
              aria-expanded={isMenuOpen}
              aria-controls="mobile-nav"
              aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
              onClick={() => setIsMenuOpen((v) => !v)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </motion.div>
      </motion.header>


      <div
        id="mobile-nav"
        className={`fixed inset-0 z-40 lg:hidden transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <button
          type="button"
          className="absolute inset-0 bg-black/70 backdrop-blur-sm"
          aria-label="Close menu overlay"
          onClick={closeMenu}
        />
        <nav
          className={`absolute top-24 left-4 right-4 rounded-2xl border border-white/10 bg-[#0A0A1F]/95 backdrop-blur-xl p-4 shadow-2xl transition-transform duration-300 ${
            isMenuOpen ? 'translate-y-0' : '-translate-y-4'
          }`}
          aria-label="Mobile"
        >
          <div className="mb-3 flex justify-center sm:hidden">
            <LanguageSwitcher />
          </div>
          <ul className="space-y-1">
            {NAV.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  onClick={closeMenu}
                  className="flex items-center min-h-[48px] px-4 rounded-xl text-sm font-semibold text-gray-200 hover:bg-white/5 hover:text-white interactive-target"
                >
                  {t(link.labelKey)}
                </a>
              </li>
            ))}
          </ul>
          <a
            href={SITE.url}
            target="_blank"
            rel="noopener noreferrer"
            onClick={closeMenu}
            className="mt-3 flex items-center justify-center gap-2 min-h-[48px] rounded-xl bg-accent-red text-white text-sm font-semibold interactive-target"
          >
            {t('cta.launch')}
            <ExternalLink className="w-4 h-4" aria-hidden="true" />
          </a>
        </nav>
      </div>
    </>
  );
};
