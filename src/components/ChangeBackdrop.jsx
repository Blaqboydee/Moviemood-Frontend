import React, { useEffect, useState } from 'react';
import { useMovies } from '../Context/MovieContext'
// import "../components/DisplayMovies.css";

const ChangeBackdrop = () => {
  const { allmovies, backdropIndex, currentIndex } = useMovies();
  const [backdrop, setBackdrop] = useState(0);


 

  // Debugging: only logs when movies actually change
  // useEffect(() => {
  //   console.log("All movies updated:", allmovies);
  // }, [allmovies]);

  // Auto cycle backdrop index
  useEffect(() => {
    if (allmovies.length === 0) return;

    const interval = setInterval(() => {
      setBackdrop((prevIndex) =>
        prevIndex === allmovies.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);

    return () => clearInterval(interval);
  }, [allmovies.length]);


  

  // Fallback if movies haven't loaded yet
  if (allmovies.length === 0) {
    return <div style={{ height: '95vh', width: '100%', backgroundColor: "#000" }} />;
  }

  // Get backdrop URL safely
  const backdropUrl = allmovies[backdropIndex]?.movieBackdrop;

  return (
    <div
  className="w-full h-[65vh] md:h-[95vh] transition-all duration-1000"
  style={{
    backgroundImage: `url(${backdropUrl})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundBlendMode: 'darken',
    backgroundColor: 'rgba(6, 6, 6, 0.65)',
  }}
/>

  );
};

export default ChangeBackdrop;
