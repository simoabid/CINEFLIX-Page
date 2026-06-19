import { vi } from 'vitest'
import '@testing-library/jest-dom'

// Mock matchMedia (used for media queries, prefers-reduced-motion, etc.)
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query: string): MediaQueryList => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  } as unknown as MediaQueryList)),
})

// Mock IntersectionObserver (used for scroll animations and mockup switcher)
const mockIntersectionObserver = vi.fn().mockImplementation(function (
  _callback: IntersectionObserverCallback,
  _options?: IntersectionObserverInit
): IntersectionObserver {
  void _callback
  void _options
  const entries: IntersectionObserverEntry[] = []
  return {
    observe: vi.fn((el: Element): void => {
      entries.push({
        isIntersecting: true,
        target: el,
        boundingClientRect: el.getBoundingClientRect(),
        intersectionRatio: 1,
        intersectionRect: el.getBoundingClientRect(),
        rootBounds: null,
        time: Date.now(),
      } as unknown as IntersectionObserverEntry)
    }),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
    takeRecords: vi.fn((): IntersectionObserverEntry[] => []),
    root: null,
    rootMargin: '',
    thresholds: [],
  }
})

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  value: mockIntersectionObserver,
})

// Mock window.scrollTo
Object.defineProperty(window, 'scrollTo', {
  writable: true,
  value: vi.fn(),
})
