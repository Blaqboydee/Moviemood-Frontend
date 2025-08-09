// SelectSeatsPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useLocation, Link } from "react-router-dom";
import { useMovies } from "../Context/MovieContext";
import { useTicket } from "../Context/Ticketcontext";

const SelectSeatsPage = () => {
  const { showtimeId, movieId } = useParams();
  const { showtimes, fetchShowtimes, allmovies } = useMovies();
  const { selectedSeats, setSelectedSeats, setticketForMovie, setticketShowtime, selectedShowtime, setSelectedShowtime } = useTicket();
  // const [selectedShowtime, setSelectedShowtime] = useState(null);
  const [reservedSeats, setReservedSeats] = useState([]);
  const [seatsDisabled, setSeatsDisabled] = useState(false);
  const [seatsloaading, setSeatsLoading] = useState(5);
  const [movieToWatch, setmovieToWatch] = useState({})

  const location = useLocation();

  useEffect(() => {
    fetchShowtimes(); // Refresh on every visit
    // Countdown logic
    setSelectedSeats([])
    setSeatsLoading(5); // Start countdown from 5 seconds
    const countdown = setInterval(() => {
      setSeatsLoading((prev) => {
        if (prev <= 1) {
          clearInterval(countdown); // Stop countdown
          return 0;
        }
        return prev - 1;
      });
    }, 1000); // 1 second interval

    // Enable seats after 20 seconds
    // const timer = setTimeout(() => {
    //   setSeatsDisabled(false);
    // }, 20000);

    // Cleanup
    return () => {
      clearInterval(countdown);
      // clearTimeout(timer);
    };
  }, [location.key]);

  // Find the specific showtime from already fetched showtimes
  useEffect(() => {
    const findmovie = allmovies.find((mov)=> mov._id == movieId)
    if (findmovie) {
      setmovieToWatch(findmovie)
      setticketForMovie(findmovie)
    }
    // console.log("movieId:", movieId);
    // console.log("allmovies:", allmovies);
    
  
    
    const found = showtimes?.data?.find((st) => st._id === showtimeId);
    if (found) {
      setSelectedShowtime(found);
      setticketShowtime(found)
      const reserved = found.seats
        .filter((seat) => seat.isBooked)
        .map((seat) => seat.number);
      setReservedSeats(reserved);
    }
  }, [showtimes, showtimeId, location.key]);

  // Reset seats disabled state when location changes
  // useEffect(() => {
  //   setSeatsDisabled(true);
  // }, [location.key]);

const toggleSeat = (seatNum) => {
  const label = formatSeatLabel(seatNum);
  setSelectedSeats((prev) =>
    prev.includes(label)
      ? prev.filter((s) => s !== label)
      : [...prev, label]
  );
};



  const formatSeatLabel = (number) => {
    const seatsPerRow = 10; // adjust to match your actual grid
    const rowIndex = Math.floor((number - 1) / seatsPerRow); // 0-based
    const rowLetter = String.fromCharCode(65 + rowIndex); // 'A', 'B', 'C', ...
    const seatIndex = ((number - 1) % seatsPerRow) + 1;
    return `${rowLetter}${seatIndex}`;
  };

  return (
    <div 
      className="min-h-screen w-full overflow-x-hidden py-4 px-2 sm:py-6 sm:px-4 lg:py-8 bg-gradient-to-br from-gray-900 via-black to-gray-900 bg-cover bg-center bg-no-repeat relative"
      style={{
        backgroundImage: `linear-gradient(to bottom right, rgba(17, 24, 39, 0.9), rgba(0, 0, 0, 0.9), rgba(17, 24, 39, 0.9)), url(${movieToWatch.movieBackdrop})`
      }}
    >
      <div className="mt-24 w-full max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mt-2 mb-4 sm:mt-4 sm:mb-6 lg:mt-8 lg:mb-8 px-2">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold bg-gradient-to-r from-gray-200 via-white to-gray-300 bg-clip-text text-transparent mb-2 leading-tight">
            Choose Your Seats
          </h1>
          <div className="w-16 sm:w-20 md:w-24 h-0.5 sm:h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto rounded-full"></div>
        </div>

        {selectedShowtime ? (
          <div className="bg-black/20 backdrop-blur-lg border border-gray-700/50 rounded-2xl sm:rounded-3xl p-3 sm:p-4 md:p-6 lg:p-8 shadow-2xl mx-1 sm:mx-2">
            {/* Showtime Info */}
            <div className="mb-4 sm:mb-6 lg:mb-8 text-center">
              <div className="inline-flex flex-col sm:flex-row items-center gap-2 sm:gap-4 bg-black/10 backdrop-blur-sm border border-gray-700/30 rounded-xl sm:rounded-2xl px-3 sm:px-4 lg:px-6 py-2 sm:py-3 w-full sm:w-auto">
                <div className="flex items-center gap-2 text-gray-300">
                  <div className="w-2 h-2 bg-gray-400 rounded-full animate-pulse"></div>
                  <span className="text-xs sm:text-sm font-medium">SHOWTIME</span>
                </div>
                
                <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-4 text-center sm:text-left">
                  <div className="text-white font-semibold text-base sm:text-lg">
                    {selectedShowtime.time}
                  </div>
                  <div className="hidden sm:block w-px h-6 bg-gray-600"></div>
                  <div className="text-gray-300 font-medium text-sm sm:text-base">
                    {selectedShowtime.date}
                  </div>
                  <div className="hidden sm:block w-px h-6 bg-gray-600"></div>
                  <div className="text-white font-semibold text-sm sm:text-base lg:text-lg">
                    Ticket Price: ₦{movieToWatch.price}
                  </div>
                </div>
              </div>
            </div>

            {/* Screen Indicator */}
            <div className="text-center mb-4 sm:mb-6 lg:mb-8">
              <div className="inline-block">
                <div className="bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400 text-black px-4 sm:px-6 lg:px-8 py-2 sm:py-3 rounded-t-2xl sm:rounded-t-3xl font-bold text-sm sm:text-base lg:text-lg shadow-lg">
                  🎬 SCREEN
                </div>
                <div className="text-gray-300 text-xs sm:text-sm mt-1 sm:mt-2 font-medium">
                  ⬇️ This Way ⬇️
                </div>
              </div>
            </div>

            {/* Seat Grid - Ultra Responsive */}
            <div className="mb-4 sm:mb-6 lg:mb-8 overflow-x-auto">
              <div className="min-w-fit mx-auto">
                <div className="grid grid-cols-10 gap-1 xs:gap-2 sm:gap-2 md:gap-3 lg:gap-4 w-fit mx-auto">
                  {selectedShowtime.seats.map((seat) => {
                     const seatLabel = formatSeatLabel(seat.number);
                    const isReserved = seat.isBooked;
                    const isSelected = selectedSeats.includes(seatLabel);

                    return (
                      <button
                        key={seat.number}
                        onClick={() => toggleSeat(seat.number)}
                        disabled={isReserved || seatsDisabled}
                        className={`
                          w-7 h-7 xs:w-8 xs:h-8 sm:w-10 sm:h-10 md:w-12 md:h-12 lg:w-14 lg:h-14
                          rounded-lg sm:rounded-xl text-[8px] xs:text-[10px] sm:text-xs md:text-sm lg:text-base
                          font-bold transition-all duration-300 transform hover:scale-110 active:scale-95 shadow-lg
                          flex items-center justify-center
                          ${
                            isReserved
                              ? "bg-gradient-to-br from-red-500 to-red-600 text-white cursor-not-allowed opacity-60 shadow-red-500/25"
                              : seatsDisabled
                              ? "bg-gradient-to-br from-gray-400 to-gray-500 text-gray-300 cursor-not-allowed opacity-50"
                              : isSelected
                              ? "bg-gradient-to-br from-green-400 to-green-500 text-white shadow-green-500/50 ring-1 sm:ring-2 ring-green-300/50 scale-110"
                              : "bg-gradient-to-br from-slate-300 to-slate-400 text-slate-700 hover:from-blue-400 hover:to-blue-500 hover:text-white shadow-slate-400/25 hover:shadow-blue-500/50"
                          }
                        `}
                      >
                        <span className="leading-none">
                          {formatSeatLabel(seat.number)}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Legend */}
            <div className="flex flex-wrap justify-center gap-2 sm:gap-4 lg:gap-6 mb-4 sm:mb-6 lg:mb-8 text-xs sm:text-sm px-2">
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-gradient-to-br from-slate-300 to-slate-400 rounded-md sm:rounded-lg shadow-lg flex-shrink-0"></div>
                <span className="text-gray-200 font-medium whitespace-nowrap">Available</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-gradient-to-br from-green-400 to-green-500 rounded-md sm:rounded-lg shadow-lg flex-shrink-0"></div>
                <span className="text-gray-200 font-medium whitespace-nowrap">Selected</span>
              </div>
              <div className="flex items-center gap-1 sm:gap-2">
                <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-gradient-to-br from-red-500 to-red-600 rounded-md sm:rounded-lg shadow-lg opacity-60 flex-shrink-0"></div>
                <span className="text-gray-200 font-medium whitespace-nowrap">Reserved</span>
              </div>
            </div>

            {seatsloaading > 0 && (
              <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
                <div className="bg-black/10 backdrop-blur-lg border border-gray-700/30 rounded-2xl sm:rounded-3xl p-4 sm:p-6 lg:p-8 text-center shadow-2xl max-w-sm sm:max-w-md w-full mx-4">
                  <div className="mb-4">
                    <div className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 bg-gradient-to-r from-gray-600 to-gray-800 rounded-full flex items-center justify-center animate-pulse text-lg sm:text-2xl">
                      🎬
                    </div>
                    <p className="text-white text-base sm:text-lg font-medium mb-2">
                      Get Ready to Choose Your Seats
                    </p>
                    <p className="text-gray-300 text-xs sm:text-sm">
                      Seats will be available in:
                    </p>
                  </div>

                  <div className="relative">
                    <div className="text-4xl sm:text-6xl lg:text-8xl font-bold bg-gradient-to-r from-gray-300 via-white to-gray-400 bg-clip-text text-transparent animate-pulse">
                      {seatsloaading}
                    </div>
                    <div className="absolute inset-0 text-4xl sm:text-6xl lg:text-8xl font-bold text-white/20 blur-sm">
                      {seatsloaading}
                    </div>
                  </div>

                  <div className="mt-2 sm:mt-4 text-gray-300 text-xs sm:text-sm">seconds</div>

                  {/* Animated progress ring */}
                  <div className="mt-4 sm:mt-6 relative w-16 h-16 sm:w-24 sm:h-24 mx-auto">
                    <svg className="transform -rotate-90 w-16 h-16 sm:w-24 sm:h-24">
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="transparent"
                        className="text-gray-600 sm:hidden"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="transparent"
                        className="text-gray-600 hidden sm:block"
                      />
                      <circle
                        cx="32"
                        cy="32"
                        r="28"
                        stroke="currentColor"
                        strokeWidth="3"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 28}`}
                        strokeDashoffset={`${2 * Math.PI * 28 * (seatsloaading / 5)}`}
                        className="text-gray-300 transition-all duration-1000 ease-in-out sm:hidden"
                        strokeLinecap="round"
                      />
                      <circle
                        cx="48"
                        cy="48"
                        r="40"
                        stroke="currentColor"
                        strokeWidth="4"
                        fill="transparent"
                        strokeDasharray={`${2 * Math.PI * 40}`}
                        strokeDashoffset={`${2 * Math.PI * 40 * (seatsloaading / 5)}`}
                        className="text-gray-300 transition-all duration-1000 ease-in-out hidden sm:block"
                        strokeLinecap="round"
                      />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-2 h-2 sm:w-3 sm:h-3 bg-gray-300 rounded-full animate-ping"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Selection Summary & Buy Button - Ultra Responsive */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 lg:gap-6 py-4 sm:py-6 px-2 sm:px-4 rounded-xl">
              {selectedSeats.length > 0 && (
                <div className="bg-black/10 backdrop-blur-sm border border-gray-700/30 rounded-xl sm:rounded-2xl w-full sm:w-auto px-4 sm:px-6 py-3 sm:py-4 text-center sm:text-left order-2 sm:order-1">
                  <div className="text-gray-300 text-xs sm:text-sm font-medium mb-1">
                    SELECTED SEATS
                  </div>
                  <div className="text-white font-bold text-sm sm:text-base lg:text-lg break-words">
                    {selectedSeats.sort().join(", ")}
                  </div>
                  <div className="text-gray-300 text-xs sm:text-sm mt-1">
                    {selectedSeats.length} seat{selectedSeats.length !== 1 ? "s" : ""} selected
                  </div>
                </div>
              )}

              <Link
                to={selectedSeats.length > 0 ? "/foodsanddrinks" : "#"}
                onClick={(e) => {
                  if (!selectedSeats.length) e.preventDefault();
                }}
                className={`
                  w-full sm:w-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4 rounded-xl sm:rounded-2xl 
                  font-bold text-sm sm:text-base lg:text-lg transition-all duration-300 transform 
                  shadow-xl no-underline text-center whitespace-nowrap order-1 sm:order-2
                  ${
                    selectedSeats.length
                      ? "bg-gradient-to-r from-gray-700 via-gray-800 to-black text-white hover:from-gray-600 hover:via-gray-700 hover:to-gray-900 hover:scale-105 hover:shadow-2xl active:scale-95"
                      : "bg-gradient-to-r from-gray-500 to-gray-600 text-gray-300 cursor-not-allowed opacity-50"
                  }
                `}
              >
                <span className="block sm:hidden">
                  {selectedSeats.length > 0
                    ? `Buy ${selectedSeats.length} Ticket${selectedSeats.length !== 1 ? "s" : ""} 🎫`
                    : "Select Seats"}
                </span>
                <span className="hidden sm:block">
                  {selectedSeats.length > 0
                    ? `Buy ${selectedSeats.length} Ticket${selectedSeats.length !== 1 ? "s" : ""} 🎫`
                    : "Select Seats to Continue"}
                </span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 sm:py-12 px-4">
            <div className="bg-black/10 backdrop-blur-lg border border-gray-700/30 rounded-2xl sm:rounded-3xl p-6 sm:p-8 inline-block">
              <div className="animate-spin w-8 h-8 sm:w-12 sm:h-12 border-2 sm:border-4 border-gray-400 border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-gray-200 text-base sm:text-lg font-medium">
                Loading showtime information...
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectSeatsPage;