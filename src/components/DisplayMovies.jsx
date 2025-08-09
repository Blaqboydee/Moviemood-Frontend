import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useMovies } from "../Context/MovieContext";

const DisplayMovies = () => {
  const { allmovies, nowShowing, comingSoon } = useMovies();
  
  const [displayedmovies, setdisplayedmovies] = useState();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGenre, setSelectedGenre] = useState('');
  const [activeFilter, setActiveFilter] = useState('allmovies');
  const [filteredMovies, setFilteredMovies] = useState([]);

  useEffect(() => {
    setdisplayedmovies(allmovies);
    setFilteredMovies(allmovies);
  }, [allmovies]);

  // Combined filter function that handles search, genre, and category
  useEffect(() => {
    let movies = [];
    
    // First get the base movies based on active filter
    switch (activeFilter) {
      case 'allmovies':
        movies = allmovies || [];
        break;
      case 'comingsoon':
        movies = comingSoon || [];
        break;
      case 'nowshowing':
        movies = nowShowing || [];
        break;
      default:
        movies = allmovies || [];
    }

    // Apply search filter
    if (searchTerm.trim() !== '') {
      movies = movies.filter(movie =>
        movie.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply genre filter
    if (selectedGenre !== '') {
      movies = movies.filter(movie =>
        movie.genre && movie.genre.some(g =>
          g.toLowerCase().includes(selectedGenre.toLowerCase())
        )
      );
    }

    setFilteredMovies(movies);
    setdisplayedmovies(movies);
  }, [activeFilter, searchTerm, selectedGenre, allmovies, nowShowing, comingSoon]);

  const filtermovies = (moviestype) => {
    console.log(moviestype);
    setActiveFilter(moviestype);
    // Clear search and genre when switching categories
    if (moviestype !== activeFilter) {
      setSearchTerm('');
      setSelectedGenre('');
    }
  };

  // Handle search functionality
  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  // Handle genre filtering
  const handleGenreFilter = (e) => {
    setSelectedGenre(e.target.value);
  };

  return (
    <>
      <div className="bg-gradient-to-b from-gray-700 to-gray-800 pt-4 sm:pt-6 min-h-screen">
        {/* Filter Controls */}
        <div className="backdrop-blur-sm w-full py-4 px-3 sm:px-6 lg:px-8 border-gray-600">
          <div className="max-w-7xl mx-auto">
            {/* Category Buttons */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {[
                  { key: 'allmovies', label: 'All Movies' },
                  { key: 'comingsoon', label: 'Coming Soon' },
                  { key: 'nowshowing', label: 'Now Showing' }
                ].map((filter) => (
                  <button
                    key={filter.key}
                    onClick={() => filtermovies(filter.key)}
                    className={`px-3 sm:px-4 py-2 rounded-lg font-medium text-[12px] sm:text-base transition-all duration-300 transform hover:scale-105 ${
                      activeFilter === filter.key
                        ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30'
                        : 'bg-white text-gray-900 hover:bg-gray-100 hover:shadow-md'
                    }`}
                  >
                    {filter.label}
                  </button>
                ))}
              </div>

              {/* Genre and Search Controls */}
              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full sm:w-auto">
                {/* Genre Dropdown */}
                <select
                  value={selectedGenre}
                  onChange={handleGenreFilter}
                  className="px-3 py-2 rounded-lg border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-[12px] sm:text-base min-w-0 sm:min-w-[140px]"
                >
                  <option value="">All Genres</option>
                  <option value="action">Action</option>
                  <option value="adventure">Adventure</option>
                  <option value="animation">Animation</option>
                  <option value="comedy">Comedy</option>
                  <option value="crime">Crime</option>
                  <option value="documentary">Documentary</option>
                  <option value="drama">Drama</option>
                  <option value="family">Family</option>
                  <option value="fantasy">Fantasy</option>
                  <option value="history">History</option>
                  <option value="horror">Horror</option>
                  <option value="music">Music</option>
                  <option value="mystery">Mystery</option>
                  <option value="romance">Romance</option>
                  <option value="science-fiction">Science Fiction</option>
                  <option value="tv-movie">TV Movie</option>
                  <option value="thriller">Thriller</option>
                  <option value="war">War</option>
                  <option value="western">Western</option>
                </select>

                {/* Search Input */}
                <div className="relative">
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={handleSearch}
                    placeholder="Search by title..."
                    className="pl-10 pr-4 py-2 rounded-lg  border border-gray-300 bg-white text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base w-full sm:w-64"
                  />
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <svg className="h-4 w-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Movies Grid */}
        <div className="max-w-7xl mx-auto px-0 sm:px-6 lg:px-8 py-6">
          {displayedmovies && displayedmovies.length > 0 ? (
            <div className="grid px-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4 xl:grid-cols-4 2xl:grid-cols-5 gap-4 sm:gap-6 lg:gap-8">
              {displayedmovies.map((movie) => (
                <Link
                  to={`/test/${movie.movieSlug}`}
                  key={movie._id}
                  className="no-underline border-2 border-gray-700 bg-gray-800 backdrop-blur-sm rounded-3xl p-[15px] lg:p-4 sm:p-2 md:p-2 2xl:p-4  shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 hover:bg-gray-800/80"
                >
                  {/* Movie Image */}
                  <div className="relative overflow-hidden rounded-lg mb-2 aspect-[2.5/3] lg:aspect-[2/3] lg:mb-3">
                    <img
                      className="w-full rounded-2xl h-full object-cover transition-transform duration-300 hover:scale-110"
                      src={movie.movieImage}
                      alt={movie.title}
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                  </div>

                  {/* Movie Title */}
                  <h3 className="text-white font-semibold text-sm sm:text-base text-center mb-2  line-clamp-2 leading-tight">
                    {movie.title}
                  </h3>

                  {/* Genres */}
                  <div className="flex flex-wrap justify-center gap-1 sm:gap-2">
                    {movie.genre?.slice(0, 3).map((genre, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 text-[9px] lg:text-[12px] bg-gray-600/80 text-gray-400 text-xs rounded-full font-medium backdrop-blur-sm"
                      >
                        {genre}
                      </span>
                    ))}
                    {movie.genre?.length > 3 && (
                      <span className="px-2 py-1 bg-gray-600/80 text-white text-xs rounded-full font-medium backdrop-blur-sm">
                        +{movie.genre.length - 3}
                      </span>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <div className="text-gray-400 text-lg mb-2">No movies found</div>
              <div className="text-gray-500 text-sm">
                {searchTerm || selectedGenre 
                  ? 'Try adjusting your filters or search terms' 
                  : 'No movies available at the moment'
                }
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DisplayMovies;