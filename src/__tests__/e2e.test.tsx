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
    


    // 3. Movie Search interaction
    const searchInput = screen.getByPlaceholderText('Search movies by title...');
    expect(screen.getByText('Interstellar')).toBeInTheDocument();

    // Type "Inception"
    fireEvent.change(searchInput, { target: { value: 'Inception' } });
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.queryByText('Interstellar')).not.toBeInTheDocument();

    // Clear search
    const clearButton = screen.getByRole('button', { name: /Clear search/i });
    fireEvent.click(clearButton);
    expect(screen.getByText('Interstellar')).toBeInTheDocument();

    // Filter by Sci-Fi
    const sciFiButton = screen.getByRole('button', { name: 'Sci-Fi' });
    fireEvent.click(sciFiButton);
    expect(screen.getByText('Interstellar')).toBeInTheDocument();
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.queryByText('The Dark Knight')).not.toBeInTheDocument();

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
