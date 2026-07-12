import { SCREENSHOTS } from './site';

/** Roadmap buckets + changelog (product + landing) */
export const ROADMAP = {
  shipped: [
    'Smart Player with multi-source scraping + classic fallback',
    'Watch parties over Socket.IO with host controls',
    'httpOnly cookie auth + server-side API proxies',
    'Web-only landing page with desktop product frames',
  ],
  next: [
    'Provider health dashboard for self-hosters',
    'Richer continue-watching recommendations',
    'Landing page performance: WebP screenshots + CDN',
  ],
  exploring: [
    'Official self-host install wizard',
    'Public API docs for third-party clients',
    'Optional social profiles / friends list',
  ],
  changelog: [
    {
      date: '2026-07',
      title: 'Landing modernization',
      items: [
        'Web-only narrative (no mobile store fiction)',
        'Spotlight screenshot gallery + full-frame mockups',
        'Live GitHub stats, roadmap, compare, i18n EN/FR/AR',
      ],
    },
    {
      date: '2026-06',
      title: 'Platform security pass',
      items: [
        'Cookie-only JWT sessions',
        'SSRF-hardened media proxies',
        'Rate limiting + Helmet CSP',
      ],
    },
    {
      date: '2026-05',
      title: 'Smart Player & PWA',
      items: [
        'Dual-mode native + classic player',
        'PWA installability with Workbox',
        'Watch party WebSocket auth',
      ],
    },
  ],
} as const;

export const COMPARE_ROWS: {
  feature: string;
  cineflix: boolean | string;
  tmdb: boolean | string;
  embed: boolean | string;
}[] = [
  { feature: 'TMDB-powered discovery', cineflix: true, tmdb: true, embed: true },
  { feature: '6,400+ franchise collections', cineflix: true, tmdb: false, embed: false },
  { feature: 'Multi-source Smart Player', cineflix: true, tmdb: false, embed: false },
  { feature: 'Classic iframe fallback', cineflix: true, tmdb: false, embed: true },
  { feature: 'My List + continue watching', cineflix: true, tmdb: false, embed: false },
  { feature: 'Realtime watch parties', cineflix: true, tmdb: false, embed: false },
  { feature: 'Accounts (cookie JWT / OAuth)', cineflix: true, tmdb: false, embed: false },
  { feature: 'Server-side API key proxy', cineflix: true, tmdb: false, embed: false },
  { feature: 'PWA installable', cineflix: true, tmdb: false, embed: false },
  { feature: 'Open-source full stack', cineflix: true, tmdb: 'Partial', embed: 'Rare' },
];

export const SECURITY_DETAILS = [
  {
    id: 'cookies',
    title: 'httpOnly JWT cookies',
    body: 'Sessions live in Secure, httpOnly cookies — not localStorage. That closes a common XSS token-theft path and matches how modern web apps authenticate.',
  },
  {
    id: 'keys',
    title: 'Server-side secrets',
    body: 'TMDB, OMDb, and provider secrets stay on Express. The browser only talks to your API. Never ship API keys in VITE_ variables.',
  },
  {
    id: 'ssrf',
    title: 'SSRF-hardened proxies',
    body: 'Media and generic proxies resolve destinations, block private/reserved IPs, and cap redirects so attackers cannot scan your internal network.',
  },
  {
    id: 'limits',
    title: 'Rate limits & headers',
    body: 'Global and auth-sensitive rate limiting, Helmet CSP tailored for embeds, and CORS allowlists keep abuse surface small.',
  },
  {
    id: 'privacy',
    title: 'What we store',
    body: 'With an account: profile, My List, preferences, watch progress, party metadata. Without an account: you can still browse. No sold ad profiles.',
  },
  {
    id: 'content',
    title: 'What we do not host',
    body: 'CINEFLIX does not host movie files. Metadata comes from TMDB; streams are resolved from third-party sources. Users must comply with local law.',
  },
] as const;

export const REEL_FRAMES = SCREENSHOTS.map((s) => ({
  src: s.src,
  label: s.label,
  alt: s.alt,
}));

export const STORY_BEATS = [
  {
    id: 'collections',
    caption:
      'Collections turn TMDB franchises into browsable timelines — not just another poster grid.',
  },
  {
    id: 'player',
    caption:
      'Smart Player ranks sources, plays native HLS, and falls back to classic embeds when needed.',
  },
  {
    id: 'social',
    caption:
      'My List, progress, and watch parties keep the experience personal — and shared when you want company.',
  },
] as const;
