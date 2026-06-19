import React, { useState, useMemo } from 'react';
import { Movie } from '../types/landing';

const GENRES = ['All', 'Action', 'Sci-Fi', 'Fantasy', 'Horror', 'Comedy', 'Drama', 'Animation', 'Thriller', 'Mystery'];

const MOCK_MOVIES: Movie[] = [
  { id: '1', title: 'Interstellar', genres: ['Sci-Fi', 'Drama'], rating: 8.7, year: 2014, img: 'bg-gradient-to-br from-indigo-900 to-purple-900' },
  { id: '2', title: 'The Dark Knight', genres: ['Action', 'Drama', 'Thriller'], rating: 9.0, year: 2008, img: 'bg-gradient-to-br from-slate-900 to-zinc-800' },
  { id: '3', title: 'Spirited Away', genres: ['Animation', 'Fantasy'], rating: 8.6, year: 2001, img: 'bg-gradient-to-br from-teal-900 to-amber-900' },
  { id: '4', title: 'Inception', genres: ['Sci-Fi', 'Action'], rating: 8.8, year: 2010, img: 'bg-gradient-to-br from-blue-950 to-indigo-950' },
  { id: '5', title: 'Get Out', genres: ['Horror', 'Mystery', 'Thriller'], rating: 7.8, year: 2017, img: 'bg-gradient-to-br from-red-950 to-neutral-900' },
  { id: '6', title: 'Superbad', genres: ['Comedy'], rating: 7.6, year: 2007, img: 'bg-gradient-to-br from-yellow-900 to-orange-900' },
  { id: '7', title: 'Spider-Man: Into the Spider-Verse', genres: ['Animation', 'Action', 'Sci-Fi'], rating: 8.4, year: 2018, img: 'bg-gradient-to-br from-rose-900 to-violet-950' },
  { id: '8', title: 'Parasite', genres: ['Drama', 'Thriller'], rating: 8.6, year: 2019, img: 'bg-gradient-to-br from-emerald-950 to-zinc-900' },
  { id: '9', title: 'Blade Runner 2049', genres: ['Sci-Fi', 'Mystery'], rating: 8.0, year: 2017, img: 'bg-gradient-to-br from-cyan-950 to-pink-950' },
];

export const MovieSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('All');

  const filteredMovies = useMemo(() => {
    return MOCK_MOVIES.filter((movie) => {
      const matchesSearch = movie.title.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesGenre = selectedGenre === 'All' || movie.genres.includes(selectedGenre);
      return matchesSearch && matchesGenre;
    });
  }, [searchQuery, selectedGenre]);

  return (
    <div className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-6 sm:p-8 rounded-2xl max-w-4xl mx-auto my-12 shadow-2xl relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-accent-red/5 to-transparent pointer-events-none" />
      
      <div className="relative z-10">
        <h3 className="text-xl font-bold mb-4 font-display text-white text-center sm:text-left">
          Instant Browser Simulator
        </h3>
        <p className="text-gray-400 text-sm mb-6 text-center sm:text-left">
          Test the client-side search capabilities of the mobile app here. Try searching for "Inception" or filtering by "Sci-Fi".
        </p>

        {/* Search Input */}
        <div className="relative mb-6">
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search movies by title..."
            className="w-full bg-slate-950/80 border border-white/10 rounded-xl px-4 py-3 pl-11 text-white focus:outline-none focus:border-accent-red focus:ring-1 focus:ring-accent-red/30 transition-all placeholder-gray-500 text-sm"
          />
          <svg
            className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 pointer-events-none"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-white transition-colors"
              aria-label="Clear search"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>

        {/* Genre Scroll Tabs */}
        <div className="flex gap-2 overflow-x-auto pb-3 mb-6 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-white/10">
          {GENRES.map((genre) => {
            const isActive = selectedGenre === genre;
            return (
              <button
                key={genre}
                onClick={() => setSelectedGenre(genre)}
                className={`px-4 py-2 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-200 active:scale-95 ${
                  isActive
                    ? 'bg-accent-red text-white shadow-lg shadow-accent-red/25'
                    : 'bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white'
                }`}
              >
                {genre}
              </button>
            );
          })}
        </div>

        {/* Movie Results Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 min-h-[300px]">
          {filteredMovies.length > 0 ? (
            filteredMovies.map((movie, index) => (
              <div
                key={movie.id}
                style={{ animationDelay: `${index * 50}ms` }}
                className="bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 hover:border-white/10 rounded-xl overflow-hidden transition-all duration-300 group hover:-translate-y-1 shadow-md hover:shadow-xl hover:shadow-black/40 flex flex-col justify-between animate-fade-in-up"
              >
                {/* Poster / Gradient Representation */}
                <div className={`aspect-[4/3] ${movie.img} relative flex items-center justify-center p-4 overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  <svg
                    className="w-10 h-10 text-white/20 group-hover:text-white/40 group-hover:scale-110 transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M7 4v16M17 4v16M3 8h4m10 0h4M3 12h18M3 16h4m10 0h4M4 20h16a1 1 0 001-1V5a1 1 0 00-1-1H4a1 1 0 00-1 1v14a1 1 0 001 1z" />
                  </svg>
                  <div className="absolute bottom-2 left-2 flex flex-wrap gap-1">
                    {movie.genres.map((g) => (
                      <span key={g} className="bg-black/60 backdrop-blur-md text-white text-[9px] px-1.5 py-0.5 rounded">
                        {g}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Details */}
                <div className="p-4 flex-1 flex flex-col justify-between">
                  <h4 className="font-bold text-sm text-white group-hover:text-accent-red transition-colors truncate">
                    {movie.title}
                  </h4>
                  <div className="flex items-center justify-between mt-3 text-xs text-gray-400">
                    <span>{movie.year}</span>
                    <span className="flex items-center gap-1 text-yellow-500 font-semibold">
                      <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                      </svg>
                      {movie.rating.toFixed(1)}
                    </span>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-full flex flex-col items-center justify-center p-12 text-center">
              <svg
                className="w-16 h-16 text-gray-600 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <h4 className="text-white font-bold text-base mb-1">No movies match your criteria</h4>
              <p className="text-gray-500 text-sm">
                Try searching for a different title or clearing your filters.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
