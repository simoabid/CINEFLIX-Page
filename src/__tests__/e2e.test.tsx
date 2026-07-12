import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from '../App';
import { SITE } from '../config/site';

describe('CINEFLIX Landing Page E2E flows', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true });
    vi.stubGlobal(
      'fetch',
      vi.fn(async (input: RequestInfo) => {
        const url = String(input);
        if (url.includes('api.github.com')) {
          return {
            ok: true,
            json: async () => ({
              stargazers_count: 42,
              forks_count: 7,
              pushed_at: new Date().toISOString(),
            }),
          } as Response;
        }
        if (url.includes('reel.mp4')) {
          return { ok: false } as Response;
        }
        return { ok: true, status: 200 } as Response;
      }),
    );
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.unstubAllGlobals();
    sessionStorage.clear();
  });

  it('renders web-focused hero and live preview', async () => {
    render(<App />);

    expect(screen.getByRole('heading', { level: 1 })).toHaveTextContent(/Cinematic|Univers|عالم/i);
    expect(screen.getAllByText(/open-source web platform|Plateforme web|منصة ويب/i).length).toBeGreaterThan(0);

    const launchLinks = screen.getAllByRole('link', { name: /Launch App|Ouvrir|افتح/i });
    expect(launchLinks.length).toBeGreaterThan(0);
    expect(launchLinks[0]).toHaveAttribute('href', SITE.url);

    const previewFrame = screen.getByTitle('CINEFLIX — live app preview');
    expect(previewFrame).toHaveAttribute('src', 'https://cineflix.dev');
  });

  it('supports FAQ accordion interaction with web copy', () => {
    render(<App />);

    const faqQuestion = screen.getByRole('button', { name: /Is CINEFLIX really free\?/i });
    expect(faqQuestion).toHaveAttribute('aria-expanded', 'false');

    fireEvent.click(faqQuestion);
    expect(faqQuestion).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/There are no paid subscription tiers/i)).toBeInTheDocument();

    fireEvent.click(faqQuestion);
    expect(faqQuestion).toHaveAttribute('aria-expanded', 'false');
  });

  it('does not market Android, Google Play, or paid plans', () => {
    render(<App />);

    expect(screen.queryByText(/Google Play/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/React Native/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Download App/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Family Plan/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/Standard Plan/i)).not.toBeInTheDocument();
  });

  it('renders new next-level sections', async () => {
    render(<App />);

    expect(document.getElementById('live-stats')).toBeTruthy();
    expect(document.getElementById('reel')).toBeTruthy();
    expect(document.getElementById('compare')).toBeTruthy();
    expect(document.getElementById('roadmap')).toBeTruthy();
    expect(document.getElementById('security')).toBeTruthy();

    await waitFor(() => {
      expect(screen.getByText('42')).toBeInTheDocument();
    });
  });

  it('can switch language to French', () => {
    render(<App />);
    const frButtons = screen.getAllByRole('button', { name: 'FR' });
    fireEvent.click(frButtons[0]);
    expect(screen.getAllByText(/Plateforme web open source|Ouvrir l’app|Propulsé/i).length).toBeGreaterThan(0);
  });
});
