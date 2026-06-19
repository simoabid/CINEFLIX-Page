import { render, screen, fireEvent, act } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { Pricing } from '../Pricing';

describe('Pricing Component', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('renders monthly pricing by default', () => {
    render(<Pricing />);

    // Check plan names
    expect(screen.getByText('Free')).toBeInTheDocument();
    expect(screen.getByText('Standard')).toBeInTheDocument();
    expect(screen.getByText('Family')).toBeInTheDocument();

    // Check default monthly prices
    expect(screen.getByText('$0.00')).toBeInTheDocument();
    expect(screen.getByText('$9.99')).toBeInTheDocument();
    expect(screen.getByText('$15.99')).toBeInTheDocument();

    // Check monthly subtext
    expect(screen.getAllByText('Cancel anytime')).toHaveLength(2);
    expect(screen.getByText('No credit card needed')).toBeInTheDocument();
  });

  it('toggles to annual pricing when clicking the Annual button', () => {
    render(<Pricing />);

    const annualButton = screen.getByRole('button', { name: /^Annual/ });
    fireEvent.click(annualButton);

    // Fast-forward the animation timeout
    act(() => {
      vi.advanceTimersByTime(250);
    });

    // Check annual prices
    expect(screen.getByText('$0.00')).toBeInTheDocument();
    expect(screen.getByText('$6.99')).toBeInTheDocument();
    expect(screen.getByText('$11.19')).toBeInTheDocument();

    // Check annual billing subtext
    expect(screen.getByText('Billed annually ($83.88)')).toBeInTheDocument();
    expect(screen.getByText('Billed annually ($134.28)')).toBeInTheDocument();

    // Check discount badge is visible
    expect(screen.getByText('Save 30%')).toBeInTheDocument();
  });

  it('toggles to annual pricing when clicking the switch toggle', () => {
    render(<Pricing />);

    const toggleButton = screen.getByRole('button', { name: /Toggle annual pricing/i });
    fireEvent.click(toggleButton);

    // Fast-forward animation timeout
    act(() => {
      vi.advanceTimersByTime(250);
    });

    // Check annual prices
    expect(screen.getByText('$6.99')).toBeInTheDocument();
    expect(screen.getByText('$11.19')).toBeInTheDocument();

    // Click again to return to monthly
    fireEvent.click(toggleButton);
    act(() => {
      vi.advanceTimersByTime(250);
    });

    expect(screen.getByText('$9.99')).toBeInTheDocument();
    expect(screen.getByText('$15.99')).toBeInTheDocument();
  });

  it('toggles back to monthly when clicking Monthly button from annual mode', () => {
    render(<Pricing />);

    // Switch to annual first
    const annualButton = screen.getByRole('button', { name: /^Annual/ });
    fireEvent.click(annualButton);
    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(screen.getByText('$6.99')).toBeInTheDocument();

    // Switch back to monthly
    const monthlyButton = screen.getByRole('button', { name: /Monthly/i });
    fireEvent.click(monthlyButton);
    act(() => {
      vi.advanceTimersByTime(250);
    });
    expect(screen.getByText('$9.99')).toBeInTheDocument();
  });
});
