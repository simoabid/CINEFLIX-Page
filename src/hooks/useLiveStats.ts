import { useEffect, useState } from 'react';
import { SITE } from '../config/site';

export type LiveStats = {
  stars: number | null;
  forks: number | null;
  pushedAt: string | null;
  appOnline: boolean | null;
  loading: boolean;
  error: boolean;
};

const GITHUB_API = `https://api.github.com/repos/${SITE.github.replace('https://github.com/', '')}`;

export function useLiveStats(): LiveStats {
  const [state, setState] = useState<LiveStats>({
    stars: null,
    forks: null,
    pushedAt: null,
    appOnline: null,
    loading: true,
    error: false,
  });

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const [repoRes, healthResults] = await Promise.all([
          fetch(GITHUB_API, {
            headers: { Accept: 'application/vnd.github+json' },
          }),
          Promise.allSettled([
            fetch(SITE.url, { method: 'HEAD', mode: 'no-cors' }),
            fetch(`${SITE.url.replace(/\/$/, '')}/health`, { mode: 'cors' }).catch(() => null),
          ]),
        ]);

        if (cancelled) return;

        let stars: number | null = null;
        let forks: number | null = null;
        let pushedAt: string | null = null;
        let error = false;

        if (repoRes.ok) {
          const data = (await repoRes.json()) as {
            stargazers_count?: number;
            forks_count?: number;
            pushed_at?: string;
          };
          stars = data.stargazers_count ?? null;
          forks = data.forks_count ?? null;
          pushedAt = data.pushed_at ?? null;
        } else {
          error = true;
        }

        // no-cors HEAD succeeds as opaque if network reachable
        const head = healthResults[0];
        const health = healthResults[1];
        let appOnline: boolean | null = null;
        if (health.status === 'fulfilled' && health.value && health.value.ok) {
          appOnline = true;
        } else if (head.status === 'fulfilled') {
          appOnline = true; // opaque response still means reachable-ish
        } else {
          appOnline = false;
        }

        setState({
          stars,
          forks,
          pushedAt,
          appOnline,
          loading: false,
          error,
        });
      } catch {
        if (!cancelled) {
          setState((s) => ({ ...s, loading: false, error: true, appOnline: null }));
        }
      }
    }

    void load();
    return () => {
      cancelled = true;
    };
  }, []);

  return state;
}

export function formatRelativeDate(iso: string | null, locale: string): string {
  if (!iso) return '—';
  const date = new Date(iso);
  const diff = Date.now() - date.getTime();
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  try {
    const rtf = new Intl.RelativeTimeFormat(locale, { numeric: 'auto' });
    if (days < 1) {
      const hours = Math.max(1, Math.floor(diff / (1000 * 60 * 60)));
      return rtf.format(-hours, 'hour');
    }
    if (days < 30) return rtf.format(-days, 'day');
    const months = Math.floor(days / 30);
    return rtf.format(-months, 'month');
  } catch {
    return date.toLocaleDateString();
  }
}
