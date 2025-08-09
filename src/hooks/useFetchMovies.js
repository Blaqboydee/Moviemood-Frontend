import { useState, useEffect, useRef } from 'react';
import axios from 'axios';

export const useFetchMovies = () => {
  const [allmovies, setAllMovies] = useState([]);
  const [nowshowing, setNowShowing] = useState([]);
  const [comingsoon, setComingSoon] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
   const [backdropIndex, setbackdropIndex] = useState(0)

  const prevMoviesRef = useRef([]);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        const res = await axios.get("http://localhost:6176/movie/fetch");
        const movies = res.data.data;

        // Avoid unnecessary updates
        const prev = prevMoviesRef.current;
        const current = movies;

        if (JSON.stringify(prev) !== JSON.stringify(current)) {
          prevMoviesRef.current = current;
          setAllMovies(current);

          const filteredNow = current.filter(movie =>
            movie.status?.toLowerCase().trim().startsWith("n")
          );
          setNowShowing(filteredNow);

          const filteredSoon = current.filter(movie =>
            movie.status?.toLowerCase().trim().startsWith("c")
          );
          setComingSoon(filteredSoon);
        }

      } catch (error) {
        console.log("Error fetching movies:", error.message);
      }
    };

    fetchMovies();
  }, []);

  // Trigger animation when currentIndex changes
  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => setIsAnimating(false), 500);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  // Auto-increment current index every 5 seconds
  // useEffect(() => {
  //   if (allmovies.length === 0) return;

  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % allmovies.length);
  //   }, 5000);

  //   return () => clearInterval(interval);
  // }, [allmovies.length]);


    useEffect(() => {
    if (allmovies.length === 0) return;
      
  
      const interval = setInterval(() => {
        setbackdropIndex((prevIndex) => (prevIndex + 1) % allmovies.length);
      }, 6000);

  
      return () => clearInterval(interval);
    }, [allmovies.length]);

  return {

  allmovies,
  nowshowing,
  comingsoon,
  currentIndex,
  setCurrentIndex, // <-- Add this
  isAnimating,
  backdropIndex


  };
};
