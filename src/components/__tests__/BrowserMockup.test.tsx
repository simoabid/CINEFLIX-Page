import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { BrowserMockup } from '../BrowserMockup';
import { MockupProvider } from '../../contexts/MockupContext';
import { MOCKUP_BY_SECTION } from '../../config/site';

describe('BrowserMockup', () => {
  it('renders laptop frame and hero screenshot as active by default', () => {
    const { container } = render(
      <MockupProvider>
        <BrowserMockup />
      </MockupProvider>,
    );

    // Laptop device frame asset
    const frame = container.querySelector('img[src="/computer_frame.png"]');
    expect(frame).toBeInTheDocument();

    const heroImg = screen.getByAltText(MOCKUP_BY_SECTION.hero.alt);
    expect(heroImg).toBeInTheDocument();
    expect(heroImg).toHaveAttribute('src', MOCKUP_BY_SECTION.hero.src);
    expect(heroImg.className).toMatch(/opacity-100/);
  });

  it('includes all section screenshots in the frame', () => {
    const { container } = render(
      <MockupProvider>
        <BrowserMockup />
      </MockupProvider>,
    );

    // Inactive frames use empty alt — count via DOM (exclude the laptop PNG)
    const images = container.querySelectorAll('img:not([src="/computer_frame.png"])');
    expect(images.length).toBe(Object.keys(MOCKUP_BY_SECTION).length);
  });
});
