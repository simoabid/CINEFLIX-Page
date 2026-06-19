import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import { MovieSearch } from '../MovieSearch';

describe('MovieSearch Component', () => {
  it('renders all default movies on initial load', () => {
    render(<MovieSearch />);

    expect(screen.getByPlaceholderText('Search movies by title...')).toBeInTheDocument();
    
    // Check if the mock movies are rendered
    expect(screen.getByText('Interstellar')).toBeInTheDocument();
    expect(screen.getByText('The Dark Knight')).toBeInTheDocument();
    expect(screen.getByText('Spirited Away')).toBeInTheDocument();
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('Get Out')).toBeInTheDocument();
    expect(screen.getByText('Superbad')).toBeInTheDocument();
    expect(screen.getByText('Spider-Man: Into the Spider-Verse')).toBeInTheDocument();
    expect(screen.getByText('Parasite')).toBeInTheDocument();
    expect(screen.getByText('Blade Runner 2049')).toBeInTheDocument();
  });

  it('filters movies based on search input', () => {
    render(<MovieSearch />);
    
    const searchInput = screen.getByPlaceholderText('Search movies by title...');
    
    // Type "Inception"
    fireEvent.change(searchInput, { target: { value: 'Inception' } });

    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.queryByText('Interstellar')).not.toBeInTheDocument();
    expect(screen.queryByText('The Dark Knight')).not.toBeInTheDocument();
  });

  it('displays "No movies match your criteria" message for unmatched search queries', () => {
    render(<MovieSearch />);
    
    const searchInput = screen.getByPlaceholderText('Search movies by title...');
    
    // Type a non-existent title
    fireEvent.change(searchInput, { target: { value: 'Avatar' } });

    expect(screen.getByText('No movies match your criteria')).toBeInTheDocument();
    expect(screen.getByText('Try searching for a different title or clearing your filters.')).toBeInTheDocument();
  });

  it('allows clearing search via the clear button', () => {
    render(<MovieSearch />);
    
    const searchInput = screen.getByPlaceholderText('Search movies by title...');
    
    // Type "Get Out"
    fireEvent.change(searchInput, { target: { value: 'Get Out' } });
    expect(screen.queryByText('Interstellar')).not.toBeInTheDocument();

    // Clear search using clear button
    const clearButton = screen.getByRole('button', { name: /Clear search/i });
    fireEvent.click(clearButton);

    expect(searchInput).toHaveValue('');
    expect(screen.getByText('Interstellar')).toBeInTheDocument();
  });

  it('filters movies based on genre chips', () => {
    render(<MovieSearch />);
    
    // Find and click the Sci-Fi genre button
    const sciFiButton = screen.getByRole('button', { name: 'Sci-Fi' });
    fireEvent.click(sciFiButton);

    // Verify only Sci-Fi movies are rendered
    expect(screen.getByText('Interstellar')).toBeInTheDocument();
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('Spider-Man: Into the Spider-Verse')).toBeInTheDocument();
    expect(screen.getByText('Blade Runner 2049')).toBeInTheDocument();

    expect(screen.queryByText('The Dark Knight')).not.toBeInTheDocument();
    expect(screen.queryByText('Spirited Away')).not.toBeInTheDocument();
  });

  it('combines search input and genre chip filtering', () => {
    render(<MovieSearch />);
    
    // Filter by Action first
    const actionButton = screen.getByRole('button', { name: 'Action' });
    fireEvent.click(actionButton);

    // Action movies are: The Dark Knight, Inception, Spider-Man: Into the Spider-Verse
    expect(screen.getByText('The Dark Knight')).toBeInTheDocument();
    expect(screen.getByText('Inception')).toBeInTheDocument();
    expect(screen.getByText('Spider-Man: Into the Spider-Verse')).toBeInTheDocument();

    // Now search for "Spider"
    const searchInput = screen.getByPlaceholderText('Search movies by title...');
    fireEvent.change(searchInput, { target: { value: 'Spider' } });

    expect(screen.getByText('Spider-Man: Into the Spider-Verse')).toBeInTheDocument();
    expect(screen.queryByText('The Dark Knight')).not.toBeInTheDocument();
    expect(screen.queryByText('Inception')).not.toBeInTheDocument();
  });
});
