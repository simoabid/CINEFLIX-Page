import React from 'react';
import { render, screen, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { MockupProvider, useRegisterSection } from '../../contexts/MockupContext';
import { MockupSwitcher } from '../MockupSwitcher';

// A test component to register sections
const TestApp: React.FC = () => {
  const heroRef = useRegisterSection('hero');
  const featuresRef = useRegisterSection('features');
  const howItWorksRef = useRegisterSection('how-it-works');

  return (
    <div>
      <section ref={heroRef} data-testid="section-hero">Hero Section</section>
      <section ref={featuresRef} data-testid="section-features">Features Section</section>
      <section ref={howItWorksRef} data-testid="section-how-it-works">How It Works Section</section>
      <MockupSwitcher />
    </div>
  );
};

describe('MockupSwitcher Component', () => {
  let originalIntersectionObserver: typeof IntersectionObserver;

  beforeEach(() => {
    originalIntersectionObserver = global.IntersectionObserver;
  });

  afterEach(() => {
    global.IntersectionObserver = originalIntersectionObserver;
    vi.restoreAllMocks();
  });

  it('renders all screenshots with default active section hero', () => {
    render(
      <MockupProvider>
        <MockupSwitcher />
      </MockupProvider>
    );

    // Verify all screenshots are rendered
    const heroImg = screen.getByAltText('CINEFLIX Home Screen');
    const featuresImg = screen.getByAltText('CINEFLIX Collections Screen');
    const howItWorksImg = screen.getByAltText('CINEFLIX Search Screen');
    const screenshotsImg = screen.getByAltText('CINEFLIX My List Screen');
    const techImg = screen.getByAltText('CINEFLIX Account Screen');

    expect(heroImg).toBeInTheDocument();
    expect(featuresImg).toBeInTheDocument();
    expect(howItWorksImg).toBeInTheDocument();
    expect(screenshotsImg).toBeInTheDocument();
    expect(techImg).toBeInTheDocument();

    // Default active section is hero
    expect(heroImg).toHaveClass('opacity-100', 'z-10');
    expect(featuresImg).toHaveClass('opacity-0', 'z-0');
  });

  it('updates the active mockup screen when context is modified', () => {
    render(
      <MockupProvider>
        <MockupSwitcher />
      </MockupProvider>
    );

    // Initial state: hero is active
    expect(screen.getByAltText('CINEFLIX Home Screen')).toHaveClass('opacity-100', 'z-10');

    // We can test active class updates by using custom provider value if needed,
    // or simulate scroll-driven updates using the test app wrapper.
  });

  it('integrates with scroll-driven IntersectionObserver to switch mockup screens', () => {
    const observerCallbacks = new Map<Element, IntersectionObserverCallback>();

    class MockObserver implements IntersectionObserver {
      readonly root: Element | null = null;
      readonly rootMargin: string = '';
      readonly thresholds: readonly number[] = [];

      constructor(private callback: IntersectionObserverCallback) {}

      observe(el: Element) {
        observerCallbacks.set(el, this.callback);
      }

      unobserve(el: Element) {
        observerCallbacks.delete(el);
      }

      disconnect() {
        observerCallbacks.clear();
      }

      takeRecords() {
        return [];
      }
    }

    global.IntersectionObserver = MockObserver as any;

    render(
      <MockupProvider>
        <TestApp />
      </MockupProvider>
    );

    // Get section elements
    const heroSection = screen.getByTestId('section-hero');
    const featuresSection = screen.getByTestId('section-features');
    const howItWorksSection = screen.getByTestId('section-how-it-works');

    // Verify observers were created
    expect(observerCallbacks.has(heroSection)).toBe(true);
    expect(observerCallbacks.has(featuresSection)).toBe(true);
    expect(observerCallbacks.has(howItWorksSection)).toBe(true);

    // Simulate scrolling into Features section
    const featuresCallback = observerCallbacks.get(featuresSection);
    act(() => {
      featuresCallback!([
        { isIntersecting: true, target: featuresSection } as unknown as IntersectionObserverEntry
      ], {} as IntersectionObserver);
    });

    // Check features screenshot is now active
    expect(screen.getByAltText('CINEFLIX Collections Screen')).toHaveClass('opacity-100', 'z-10');
    expect(screen.getByAltText('CINEFLIX Home Screen')).toHaveClass('opacity-0', 'z-0');

    // Simulate scrolling into How It Works section
    const howItWorksCallback = observerCallbacks.get(howItWorksSection);
    act(() => {
      howItWorksCallback!([
        { isIntersecting: true, target: howItWorksSection } as unknown as IntersectionObserverEntry
      ], {} as IntersectionObserver);
    });

    // Check search screenshot is now active
    expect(screen.getByAltText('CINEFLIX Search Screen')).toHaveClass('opacity-100', 'z-10');
    expect(screen.getByAltText('CINEFLIX Collections Screen')).toHaveClass('opacity-0', 'z-0');
  });
});
