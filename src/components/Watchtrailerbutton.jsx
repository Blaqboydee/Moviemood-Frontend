import React, { useState } from "react";
import { ChevronLeft, Play, Star, X } from "lucide-react";
import { useMovies } from "../Context/MovieContext";

const Watchtrailerbutton = ({ buttonStyle }) => {
  const { allmovies, currentIndex } = useMovies();
  const [isOpen, setIsOpen] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    localStorage.setItem("index", currentIndex);
  };

  const indexOfTrailer = localStorage.getItem("index");
  const closeModal = () => setIsOpen(false);
  return (
    <div>
      <button
        onClick={openModal}
        className="backdrop-blur-3xl bg-black/10 border-4 border-green-700  text-white  py-1.5 xs:py-2 lg:py-2.5
                       px-3 xs:px-4 lg:px-[15px]
                        rounded-full flex items-center justify-center gap-2 transition-all hover:bg-white/20
                        min-w-[100px] sm:min-w-[120px] w-full sm:w-auto"
      >
        <Play className="w-4 h-4 sm:w-5 sm:h-5" />
        <span
          className="text-[10px] sm:text-base 
                         xs:text-xs sm:text-[12px] lg:text-[15px]
        
        "
        >
          Watch trailer
        </span>
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed w-full inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
          {/* Modal Content */}
          <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden">
            {/* Close Button */}
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-2 rounded-full transition-all duration-200"
            >
              <X size={24} />
            </button>

            {/* Responsive iframe container */}
            <div
              className="relative w-full"
              style={{ paddingBottom: "56.25%" }}
            >
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={allmovies[indexOfTrailer].trailer}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              ></iframe>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Watchtrailerbutton;
