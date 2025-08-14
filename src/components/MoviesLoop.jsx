import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { useMovies } from "../Context/MovieContext";
import { CiPlay1 } from "react-icons/ci";
import Watchtrailerbutton from "./Watchtrailerbutton";

const MoviesLoop = () => {
  const { allmovies, currentIndex, isAnimating, setCurrentIndex } = useMovies();

  // Show nothing or a loader until movies load
 // Show loader until movies load
if (allmovies.length === 0) {
  return (
    <div className="h-screen bg-black flex items-center justify-center">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white"></div>
        <p className="text-white text-lg">Loading movies...</p>
      </div>
    </div>
  );
}

  return (
    <div>
      {/* Carousel Container */}
      <div className="absolute top-[20%] lg:top-[30%] right-0 w-full max-w-[600px] mx-auto p-2.5 md:p-4">
        {/* Carousel Wrapper */}
        <div className="relative overflow-hidden rounded-lg p-0 h-[400px]  max-h-[800px] ">
          {/* Carousel Track */}
          <div className="relative w-full h-full lg:right-0 md:right-[-200px]">
            {allmovies.map((movie, index) => {
              let position = index - currentIndex;
              if (position < 0) position += allmovies.length;

              return (
                <div
                  key={index}
                  className={`
                    movie-slide position-${position} hidden md:block
                    absolute transition-all duration-1000 ease-in-out
                    p-[6px] xs:p-2 sm:p-3 lg:p-4
                    rounded-[20px] bg-white/10 backdrop-blur-[10px]
                    w-[250px]
                    ${
                      position === 0
                        ? "opacity-100 scale-100"
                        : "opacity-70 scale-90"
                    }
                  `}
                  style={{
                    left: `${9 + position * 12}rem`,
                    zIndex: allmovies.length - position,
                  }}
                >
                  <img
                    className="w-[200px] xs:w-[200px] sm:w-[200px] md:w-[200px] lg:w-[200px] xl:w-[200px] 2xl:w-[200px] 
                               h-[300px] 
                               object-cover rounded-[20px] transition-all duration-1000 ease-in-out"
                    src={movie?.movieImage}
                    alt={movie?.title || ""}
                  />
                  <p
                    className="text-white text-center mt-2 xs:mt-2.5 
                                text-[10px] xs:text-xs sm:text-sm lg:text-[15px] 
                                font-semibold"
                  >
                    {movie?.title}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Carousel Indicators */}
        <div className="hidden md:flex justify-center mt-6 gap-2 items-center">
          {allmovies.map((_, index) => (
            <button
              key={index}
              className={`
                rounded-full border-none cursor-pointer transition-colors duration-300
                hover:bg-gray-600
                ${
                  index === currentIndex
                    ? "bg-blue-500 w-[14px] h-[14px] lg:w-[18px] lg:h-[18px]"
                    : "bg-gray-300 w-[8px] h-[8px] lg:w-[10px] lg:h-[10px]"
                }
              `}
              onClick={() => setCurrentIndex(index)}
            />
          ))}
        </div>
      </div>

      {/* Movie Details Section */}
      <div
        className="absolute top-[10%] xs:top-[12%] sm:top-[15%] md:top-[20%] lg:top-[30%] xl:top-[35%] 
                      left-[3%] sm:left-[5%] lg:left-[4%] 
                      w-[94%] sm:w-[90%] lg:w-[60%]"
      >
        <div
          className={`
  transition-all duration-500 ease-out
  flex flex-col justify-center
  py-2 xs:py-3 sm:py-4 lg:py-8
  mt-[10vh] md:mt-[7vh] lg:mt-[5vh]
  gap-2 xs:gap-2.5 sm:gap-3 md:gap-4 lg:gap-5
  ${
    isAnimating
      ? "transform -translate-y-5 opacity-0"
      : "transform translate-y-0 opacity-100"
  }
`}
        >
          <h1
            className="text-white font-extrabold leading-tight
                         md:w-[60%] sm:w-80%
                         text-4xl  xs:text-5xl sm:text-5xl md:text-5xl lg:text-4xl xl:text-5xl 2xl:text-6xl max-[2xl]:text-[80px]"
          >
            {allmovies[currentIndex]?.title}
          </h1>
          <p
            className="text-white text-left font-medium leading-relaxed
                        text-[10px] xs:text-xs sm:text-[8px] md:text-[14px] lg:text-[15px]
                        md:w-[60%] lg:w-[80%]"
          >
            {allmovies[currentIndex]?.description}
          </p>
        </div>

        {/* Buttons */}
        <div className="flex sm:flex-row items-start sm:items-center gap-2 sm:gap-2.5">
          <Link
            className="bg-white border-4  text-black rounded-3xl font-semibold
                       text-[10px] xs:text-xs sm:text-[12px] lg:text-[15px]
                       py-1.5 xs:py-2 lg:py-2.5
                       px-3 xs:px-4 lg:px-[15px]
                       min-w-[100px] sm:min-w-[120px] sm:p-3 text-center
                       sm:w-auto no-underline"
                      
            to={`/test/${allmovies[currentIndex].movieSlug}`}
          >
            Buy ticket
          </Link>
          <Watchtrailerbutton/>
        </div>
      </div>
    </div>
  );
};

export default MoviesLoop;
