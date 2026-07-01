import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import App from '../App';

describe('CINEFLIX Landing Page E2E flows', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('runs complete cross-feature user interaction flow', () => {
    render(<App />);

    // 1. Initial render check
    expect(screen.getByText('Your Cinematic Universe,')).toBeInTheDocument();

    // 3. Live app preview — embedded real cineflix.dev
    const previewFrame = screen.getByTitle('CINEFLIX — live app preview');
    expect(previewFrame).toHaveAttribute('src', 'https://cineflix.dev');
    expect(previewFrame.tagName).toBe('IFRAME');

    // 4. FAQ Accordion interaction
    const faqQuestion = screen.getByRole('button', { name: /Is CINEFLIX really free\?/i });
    expect(faqQuestion).toHaveAttribute('aria-expanded', 'false');

    // Click to open FAQ
    fireEvent.click(faqQuestion);
    expect(faqQuestion).toHaveAttribute('aria-expanded', 'true');
    expect(screen.getByText(/Yes! CINEFLIX offers a free plan/i)).toBeInTheDocument();

    // Click again to close FAQ
    fireEvent.click(faqQuestion);
    expect(faqQuestion).toHaveAttribute('aria-expanded', 'false');
  });
});
