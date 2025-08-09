import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const MovieContext = createContext();

export const MovieProvider = ({ children }) => {
  const [allmovies, setallmovies] = useState([]);
  const [nowShowing, setNowShowing] = useState([]);
  const [comingSoon, setComingSoon] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [backdropIndex, setBackdropIndex] = useState(0);

  const [showtimes, setShowtimes] = useState([]);
  const [showtimeLoading, setShowtimeLoading] = useState(true);
  const [showtimeError, setShowtimeError] = useState(null);
  const API_URL = import.meta.env.VITE_API_URL;

  // 🔁 Fetch showtimes from API
  const fetchShowtimes = async () => {
    try {
      setShowtimeLoading(true);
      const response = await axios.get(`${API_URL}/showtime/fetchshowtime`);
      setShowtimes(response.data || []);
    } catch (err) {
      setShowtimeError(err);
    } finally {
      setShowtimeLoading(false);
    }
  };

  // 🔁 Fetch movies from API
  const fetchMovies = async () => {
    try {
      const res = await axios.get(`${API_URL}/movie/fetch`);
      const movies = res.data?.data || [];

      setallmovies(movies);

      const nowShowingMovies = movies.filter(
        (movie) => movie.status?.toLowerCase() === 'now showing'
      );

      const comingSoonMovies = movies.filter(
        (movie) => movie.status?.toLowerCase() === 'coming soon'
      );

      setNowShowing(nowShowingMovies);
      setComingSoon(comingSoonMovies);
    } catch (err) {
      console.error('Failed to fetch movies', err);
      setallmovies([]);
      setNowShowing([]);
      setComingSoon([]);
    }
  };

  // 📦 Load movies and showtimes on mount
  useEffect(() => {
    fetchMovies();
    fetchShowtimes();
  }, []);

  // 🎞️ Handle carousel animation
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // ⏱️ Auto-increment carousel index
  useEffect(() => {
    if (allmovies.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % allmovies.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [allmovies.length]);

  // 🎬 Auto-increment backdrop index
  useEffect(() => {
    if (allmovies.length === 0) return;

    const interval = setInterval(() => {
      setBackdropIndex((prev) => (prev + 1) % allmovies.length);
    }, 6000);

    return () => clearInterval(interval);
  }, [allmovies.length]);

  return (
    <MovieContext.Provider
      value={{
        // 🎥 Movies
        allmovies,
        nowShowing,
        comingSoon,
        setallmovies,

        // 🎠 Carousel
        currentIndex,
        setCurrentIndex,
        isAnimating,
        setIsAnimating,
        backdropIndex,

        // 🕒 Showtimes
        showtimes,
        fetchShowtimes,
        showtimeLoading,
        showtimeError,
      }}
    >
      {children}
    </MovieContext.Provider>
  );
};

// Hook to access context
export const useMovies = () => useContext(MovieContext);
