import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { Accordion } from '../Accordion';

describe('Accordion Component', () => {
  it('renders all FAQ items collapsed by default', () => {
    render(<Accordion />);

    const buttons = screen.getAllByRole('button');
    expect(buttons).toHaveLength(6);

    buttons.forEach((button, idx) => {
      expect(button).toHaveAttribute('aria-expanded', 'false');
      
      const panelId = button.getAttribute('aria-controls');
      expect(panelId).toBe(`faq-panel-${idx}`);
      
      const panel = document.getElementById(panelId!);
      expect(panel).toBeInTheDocument();
      expect(panel).toHaveAttribute('aria-hidden', 'true');
    });
  });

  it('expands an FAQ item when clicked, updating ARIA states', () => {
    render(<Accordion />);

    const firstButton = screen.getByRole('button', { name: /Is CINEFLIX really free\?/i });
    const firstPanelId = firstButton.getAttribute('aria-controls');
    const firstPanel = document.getElementById(firstPanelId!);

    // Click to expand
    fireEvent.click(firstButton);

    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    expect(firstPanel).toHaveAttribute('aria-hidden', 'false');

    // Other items should remain collapsed
    const secondButton = screen.getByRole('button', { name: /Does it work on iOS\?/i });
    const secondPanelId = secondButton.getAttribute('aria-controls');
    const secondPanel = document.getElementById(secondPanelId!);

    expect(secondButton).toHaveAttribute('aria-expanded', 'false');
    expect(secondPanel).toHaveAttribute('aria-hidden', 'true');
  });

  it('collapses an expanded FAQ item when clicked again', () => {
    render(<Accordion />);

    const firstButton = screen.getByRole('button', { name: /Is CINEFLIX really free\?/i });
    const firstPanelId = firstButton.getAttribute('aria-controls');
    const firstPanel = document.getElementById(firstPanelId!);

    // Expand first
    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');

    // Collapse
    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    expect(firstPanel).toHaveAttribute('aria-hidden', 'true');
  });

  it('closes the open FAQ item when another item is clicked', () => {
    render(<Accordion />);

    const firstButton = screen.getByRole('button', { name: /Is CINEFLIX really free\?/i });
    const firstPanelId = firstButton.getAttribute('aria-controls');
    const firstPanel = document.getElementById(firstPanelId!);

    const secondButton = screen.getByRole('button', { name: /Does it work on iOS\?/i });
    const secondPanelId = secondButton.getAttribute('aria-controls');
    const secondPanel = document.getElementById(secondPanelId!);

    // Expand first
    fireEvent.click(firstButton);
    expect(firstButton).toHaveAttribute('aria-expanded', 'true');
    expect(firstPanel).toHaveAttribute('aria-hidden', 'false');

    // Expand second, should close first
    fireEvent.click(secondButton);
    
    expect(secondButton).toHaveAttribute('aria-expanded', 'true');
    expect(secondPanel).toHaveAttribute('aria-hidden', 'false');
    
    expect(firstButton).toHaveAttribute('aria-expanded', 'false');
    expect(firstPanel).toHaveAttribute('aria-hidden', 'true');
  });
});
