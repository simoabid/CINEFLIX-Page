/**
 * Central content & URLs for the CINEFLIX web landing page.
 * Product truth: full-stack MERN web app at cineflix.dev — not mobile.
 */

export const SITE = {
  name: 'CINEFLIX',
  tagline: 'Your Cinematic Universe, Reinvented',
  subline: 'The open-source web platform to browse, stream, collect, and watch together.',
  description:
    'Premium streaming & discovery web app — 6,400+ franchise collections, Smart Player with 50+ sources, watch parties, My List, and secure accounts. Built with React, Vite, Express, and MongoDB.',
  url: 'https://cineflix.dev',
  github: 'https://github.com/simoabid/cineflix-app',
  author: {
    name: 'ABID.Dev',
    fullName: 'Mohamed Amine Abid',
    role: 'Full-Stack Developer · Software Engineering Student',
    location: 'Khenifra, Morocco',
    bio: 'Specializing in React, Node.js, TypeScript, and modern web technologies. Building open-source streaming experiences and full-stack products.',
    portfolio: 'https://abidev.dev',
    github: 'https://github.com/simoabid',
    twitter: 'https://x.com/seemooabid',
    linkedin: 'https://linkedin.com/in/mohamed-amine-abidd',
    email: 'mailto:seemooabid@gmail.com',
    avatar: 'https://avatars.githubusercontent.com/u/169913102?v=4',
    coffee: 'https://www.buymeacoffee.com/seemoo',
  },
} as const;

export const NAV_LINKS = [
  { id: 'home', href: '#hero', label: 'Home' },
  { id: 'features', href: '#features', label: 'Features' },
  { id: 'player', href: '#player', label: 'Player' },
  { id: 'content', href: '#content', label: 'Screenshots' },
  { id: 'faq', href: '#faq', label: 'FAQ' },
] as const;

export const STATS = [
  { value: 6400, suffix: '+', label: 'Collections' },
  { value: 50, suffix: '+', label: 'Stream Sources' },
  { value: 2, suffix: '', label: 'Player Modes' },
  { value: 100, suffix: '%', label: 'Open Source' },
] as const;

export const TICKER_ITEMS = [
  'Smart Player · Native HLS',
  '50+ Streaming Sources',
  'Watch Parties · Socket.IO',
  '6,400+ Franchise Collections',
  'My List & Continue Watching',
  'httpOnly Cookie Auth',
  'PWA Installable',
  'Server-side API Proxies',
  'Open Source · Free Forever',
] as const;

export type FeatureIcon =
  | 'sparkles'
  | 'layers'
  | 'search'
  | 'play'
  | 'list'
  | 'users'
  | 'shield'
  | 'monitor'
  | 'wifi';

export const FEATURES: {
  icon: FeatureIcon;
  title: string;
  description: string;
}[] = [
  {
    icon: 'sparkles',
    title: 'Cinematic Discovery',
    description:
      'Hero carousels, category rows, and hover-intent preview cards with trailers — a premium browse experience on every screen size.',
  },
  {
    icon: 'layers',
    title: '6,400+ Collections',
    description:
      'Infinite-scroll franchise discovery powered by TMDB — filter by genre, open timelines, and track sagas from start to finish.',
  },
  {
    icon: 'search',
    title: 'Multi-Type Search',
    description:
      'Find movies, TV shows, and people in one query with debounced results and intelligent fuzzy ranking.',
  },
  {
    icon: 'play',
    title: 'Smart Player',
    description:
      'In-app HLS playback with 50+ providers, quality selection, subtitles, automatic fallback, and classic iframe mode.',
  },
  {
    icon: 'list',
    title: 'My List & Progress',
    description:
      'Watchlist, favorites, continue watching, per-episode tracking, bulk tools, and personal stats — synced to your account.',
  },
  {
    icon: 'users',
    title: 'Watch Parties',
    description:
      'Create or join rooms, sync play/pause/seek, and chat live over WebSockets with host controls.',
  },
  {
    icon: 'shield',
    title: 'Secure Accounts',
    description:
      'Email + Google OAuth with JWT in httpOnly cookies — no tokens in localStorage. Server-side TMDB and OMDb keys.',
  },
  {
    icon: 'monitor',
    title: 'PWA & Polish',
    description:
      'Installable Progressive Web App, i18n-ready UI, SEO meta, gamepad navigation, and smooth cinema-style motion.',
  },
  {
    icon: 'wifi',
    title: 'Dual Player Modes',
    description:
      'Native Smart Player when sources resolve — sandboxed classic embeds when you need a reliable iframe fallback.',
  },
];

export const DEEP_DIVES = [
  {
    id: 'collections',
    badge: 'Collections',
    title: 'Franchise timelines, not just grids',
    description:
      'Browse thousands of TMDB collections with infinite scroll, genre chips, and detail pages that map every film in a saga. Built for completionists and casual explorers alike.',
    bullets: [
      '6,400+ franchises with smart discovery',
      'Genre filters and featured heroes',
      'Timeline views and collection stats',
    ],
    image: '/assets/screenshots/web/collections.png',
    imageAlt: 'CINEFLIX collections discovery page',
    reverse: false,
  },
  {
    id: 'player',
    badge: 'Smart Player',
    title: 'Playback engineered for reliability',
    description:
      'The Smart Player scrapes and ranks sources client-side, plays native HLS streams, supports captions and quality picks, and falls back to classic embeds when needed.',
    bullets: [
      '50+ modular streaming providers',
      'HLS.js native playback + quality control',
      'Scraping overlay with automatic retries',
    ],
    image: '/assets/screenshots/web/watch.png',
    imageAlt: 'CINEFLIX Smart Player watch experience',
    reverse: true,
  },
  {
    id: 'social',
    badge: 'List · Parties · Accounts',
    title: 'Track alone. Watch together.',
    description:
      'Save titles, resume progress, and invite friends to a synchronized room. Accounts use modern cookie auth so your list stays yours.',
    bullets: [
      'My List with filters, tags, and bulk actions',
      'Continue watching across movies and TV',
      'Realtime watch parties with live chat',
    ],
    image: '/assets/screenshots/web/mylist.png',
    imageAlt: 'CINEFLIX My List page',
    reverse: false,
  },
] as const;

export const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Open',
    description: 'Visit cineflix.dev in any modern browser — no install required. Optionally install the PWA.',
  },
  {
    step: '02',
    title: 'Browse',
    description: 'Explore trending rows, 6,400+ collections, and multi-type search across movies, TV, and people.',
  },
  {
    step: '03',
    title: 'Watch',
    description: 'Hit play for Smart Player sources or classic embeds. Sign in to sync lists, progress, and parties.',
  },
] as const;

export const SCREENSHOTS = [
  { src: '/assets/screenshots/web/home.png', label: 'Home', alt: 'CINEFLIX home with hero carousel' },
  { src: '/assets/screenshots/web/collections.png', label: 'Collections', alt: 'Collections discovery grid' },
  { src: '/assets/screenshots/web/search.png', label: 'Search', alt: 'Multi-type search results' },
  { src: '/assets/screenshots/web/watch.png', label: 'Watch', alt: 'Smart Player watch page' },
  { src: '/assets/screenshots/web/mylist.png', label: 'My List', alt: 'Personal watchlist' },
  { src: '/assets/screenshots/web/account.png', label: 'Account', alt: 'Account settings' },
] as const;

/** Section IDs that drive the hero browser mockup image */
export type MockupSectionId = 'hero' | 'features' | 'player' | 'content' | 'tech';

export const MOCKUP_BY_SECTION: Record<MockupSectionId, { src: string; alt: string }> = {
  hero: { src: '/assets/screenshots/web/home.png', alt: 'CINEFLIX home screen' },
  features: { src: '/assets/screenshots/web/collections.png', alt: 'CINEFLIX collections' },
  player: { src: '/assets/screenshots/web/watch.png', alt: 'CINEFLIX Smart Player' },
  content: { src: '/assets/screenshots/web/search.png', alt: 'CINEFLIX search' },
  tech: { src: '/assets/screenshots/web/account.png', alt: 'CINEFLIX account' },
};

/**
 * Tech stack for the Built With section.
 * `icon` = Simple Icons slug (cdn.simpleicons.org); `color` = brand hex without #.
 */
export const STACK = [
  { name: 'React', detail: '18 · SPA UI', icon: 'react', color: '61DAFB' },
  { name: 'TypeScript', detail: 'Strict mode', icon: 'typescript', color: '3178C6' },
  { name: 'Vite', detail: '8 · Fast builds', icon: 'vite', color: '646CFF' },
  { name: 'Tailwind CSS', detail: 'Design tokens', icon: 'tailwindcss', color: '38BDF8' },
  { name: 'Express', detail: 'API + proxies', icon: 'express', color: 'FFFFFF' },
  { name: 'MongoDB', detail: 'Mongoose ODM', icon: 'mongodb', color: '47A248' },
  { name: 'Socket.IO', detail: 'Watch parties', icon: 'socketdotio', color: 'FFFFFF' },
  { name: 'HLS.js', detail: 'Native playback', icon: 'html5', color: 'E34F26' },
  { name: 'TMDB API', detail: 'Metadata engine', icon: 'themoviedatabase', color: '01B4E4' },
  { name: 'PWA', detail: 'Workbox cache', icon: 'pwa', color: '5A0FC8' },
  { name: 'JWT Cookies', detail: 'httpOnly auth', icon: 'jsonwebtokens', color: 'FFFFFF' },
  { name: 'Vitest + CI', detail: 'Quality gates', icon: 'vitest', color: '6E9F18' },
] as const;


export const SECURITY_POINTS = [
  {
    title: 'httpOnly JWT cookies',
    description: 'Session tokens never live in localStorage — safer XSS posture by design.',
  },
  {
    title: 'Server-side API keys',
    description: 'TMDB, OMDb, and provider secrets stay on Express; the browser only hits your API.',
  },
  {
    title: 'SSRF-hardened proxies',
    description: 'Outbound media/proxy fetches validate public destinations and block private IPs.',
  },
  {
    title: 'Rate limits & Helmet',
    description: 'Global and auth rate limiting plus CSP-aware security headers on the API.',
  },
] as const;

export const BENEFITS = [
  {
    title: 'Discover deeper',
    description:
      'Go beyond “trending” with franchise collections, timelines, and rich detail pages for movies and series.',
  },
  {
    title: 'Play smarter',
    description:
      'A dual-mode player that tries native multi-source streams first and falls back to classic embeds.',
  },
  {
    title: 'Stay in control',
    description:
      'Your list, progress, and preferences — with optional watch parties when you want company.',
  },
] as const;

export type FaqItem = {
  question: string;
  answer: string;
};

export const FAQ_ITEMS: FaqItem[] = [
  {
    question: 'What is CINEFLIX?',
    answer:
      'CINEFLIX is a free, open-source web platform for discovering and streaming movies and TV. It combines a Netflix-inspired React frontend with an Express API, MongoDB user data, and a multi-source Smart Player.',
  },
  {
    question: 'Is CINEFLIX really free?',
    answer:
      'Yes. The web app is free to use and the source is open on GitHub. There are no paid subscription tiers on the landing page or in the product.',
  },
  {
    question: 'Do I need an account?',
    answer:
      'You can browse and watch without signing in. Create an account to sync My List, continue watching, preferences, and watch parties across sessions.',
  },
  {
    question: 'How does playback work?',
    answer:
      'The Smart Player resolves streams from many providers and plays them with HLS.js when possible. If a native source fails, you can use classic sandboxed iframe embeds as a fallback.',
  },
  {
    question: 'Does CINEFLIX host movies or shows?',
    answer:
      'No. Metadata and posters come from TMDB (and related APIs via server proxies). Stream URLs are resolved from third-party sources. You are responsible for complying with local laws and provider terms.',
  },
  {
    question: 'Which browsers are supported?',
    answer:
      'Any modern evergreen browser (Chrome, Firefox, Edge, Safari). You can also install CINEFLIX as a Progressive Web App for a standalone window and offline shell caching.',
  },
];
