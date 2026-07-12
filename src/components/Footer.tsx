import React from 'react';
import {
  BookOpen,
  Bug,
  Code2,
  Coffee,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  MessageCircle,
  Monitor,
  Shield,
  Sparkles,
  Zap,
} from 'lucide-react';
import { SITE } from '../config/site';

const linkClass =
  'hover:text-accent-red transition-colors flex items-center gap-1.5 interactive-target min-h-[28px]';

const XIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg className={className} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const Footer: React.FC = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-transparent border-t border-white/[0.06] pt-16 pb-8 relative overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-6 relative z-10">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-12 gap-10 md:gap-8 mb-16">
          {/* Brand */}
          <div className="space-y-5 col-span-2 sm:col-span-3 md:col-span-4 lg:col-span-3">
            <a href="#hero" className="flex items-center gap-2 shrink-0 interactive-target">
              <span className="text-accent-red font-bold font-display text-2xl tracking-wider uppercase">
                CINEFLIX
              </span>
            </a>
            <p className="text-gray-400 text-xs sm:text-sm leading-relaxed">
              Your premium movie and TV web platform. Discover unlimited movies &amp; TV, more than
              6,400+ collections, track your watchlist, and stream with the Smart Player — powered by
              TMDB.
            </p>
          </div>

          {/* Product */}
          <div className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-white font-extrabold font-display tracking-wider text-xs uppercase mb-4">
              Product
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li>
                <a href="#features" className={linkClass}>
                  <Sparkles className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  Features
                </a>
              </li>
              <li>
                <a href="#how-it-works" className={linkClass}>
                  <Zap className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  How It Works
                </a>
              </li>
              <li>
                <a href="#content" className={linkClass}>
                  <Monitor className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  Screenshots
                </a>
              </li>
              <li>
                <a href="#faq" className={linkClass}>
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  FAQ
                </a>
              </li>
              <li>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <Code2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  Source Code
                </a>
              </li>
            </ul>
          </div>

          {/* Developer */}
          <div className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-white font-extrabold font-display tracking-wider text-xs uppercase mb-4">
              Developer
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li>
                <a
                  href={SITE.author.portfolio}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  Portfolio
                </a>
              </li>
              <li>
                <a
                  href={SITE.author.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <Github className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  GitHub
                </a>
              </li>
              <li>
                <a
                  href={SITE.author.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <Linkedin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Support */}
          <div className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-2">
            <h4 className="text-white font-extrabold font-display tracking-wider text-xs uppercase mb-4">
              Contact &amp; Support
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li>
                <a href={SITE.author.email} className={linkClass}>
                  <Mail className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  Contact
                </a>
              </li>
              <li>
                <a
                  href={`${SITE.github}/discussions`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <MessageCircle className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  GitHub Discussions
                </a>
              </li>
              <li>
                <a
                  href={`${SITE.github}/issues`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <Bug className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  Report an Issue
                </a>
              </li>
              <li>
                <a
                  href={SITE.author.coffee}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <Coffee className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  Buy Me a Coffee
                </a>
              </li>
              <li>
                <a
                  href={`${SITE.github}/blob/main/LICENSE`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <Shield className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  Legal &amp; MIT License
                </a>
              </li>
            </ul>
          </div>

          {/* GitHub & Services */}
          <div className="col-span-1 sm:col-span-1 md:col-span-2 lg:col-span-3">
            <h4 className="text-white font-extrabold font-display tracking-wider text-xs uppercase mb-4">
              GitHub &amp; Services
            </h4>
            <ul className="space-y-2 text-xs sm:text-sm text-gray-400">
              <li>
                <a
                  href={SITE.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <Github className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  CINEFLIX GitHub Repo
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/simoabid/cineflix-core"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <Code2 className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  CINEFLIX Core Repo
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/simoabid/cineflix-cli"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <FileText className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  CINEFLIX CLI Repo
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/simoabid/cineflix-docs"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <BookOpen className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  CINEFLIX Docs Repo
                </a>
              </li>
              <li>
                <a
                  href="https://docs.cineflix.dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={linkClass}
                >
                  <ExternalLink className="w-3.5 h-3.5 shrink-0 text-accent-red" aria-hidden="true" />
                  docs.cineflix.dev
                </a>
              </li>
              <li>
                <a href={SITE.url} target="_blank" rel="noopener noreferrer" className={linkClass}>
                  <Monitor className="w-3.5 h-3.5 shrink-0 text-accent-red" aria-hidden="true" />
                  cineflix.dev
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06] pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-xs sm:text-sm font-medium">
            &copy; {year} CINEFLIX &middot; Built by{' '}
            <a
              href={SITE.author.portfolio}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white font-semibold hover:text-accent-red transition-colors interactive-target"
            >
              ABID.Dev
            </a>
          </p>

          <div className="flex items-center gap-5 text-gray-500">
            <a
              href={SITE.author.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200 interactive-target"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href={SITE.author.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200 interactive-target"
              aria-label="X (formerly Twitter)"
            >
              <XIcon className="w-4 h-4" />
            </a>
            <a
              href={SITE.author.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200 interactive-target"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-4 h-4" />
            </a>
            <a
              href={SITE.author.coffee}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors duration-200 interactive-target"
              aria-label="Buy Me a Coffee"
            >
              <Coffee className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
