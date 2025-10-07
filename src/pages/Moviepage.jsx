import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import { useMovies } from "../Context/MovieContext";
import { ChevronLeft, Play, Star, X, Calendar, Clock, Users } from "lucide-react";

const MoviePage = () => {
  const params = useParams();
  const location = useLocation();
  const { allmovies, showtimes } = useMovies();
  const [themovie, setthemovie] = useState({});
  const [themovieshowtime, setthemovieshowtime] = useState([]);
  const [isCheckingAvailability, setIsCheckingAvailability] = useState(true);
  const [selectedDate, setSelectedDate] = useState("");
  const [availableTimes, setAvailableTimes] = useState([]);
  const [isLargeScreen, setIsLargeScreen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [formatted, setFormatted] = useState([]);
  const fakeNow = new Date('2025-08-05T00:00:00'); //pretending the date is august fifth
  const [validShowtimes, setValidShowtimes] = useState([]);

    useEffect(() => {
    const checkScreenSize = () => {
      setIsLargeScreen(window.innerWidth >= 768); 
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const openModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => setIsOpen(false);
  
  //date formatter
  useEffect(() => {
    //  setIsCheckingAvailability(true);
    const getDayWithSuffix = (day) => {
      const suffixes = ["th", "st", "nd", "rd"];
      const v = day % 100;
      return day + (suffixes[(v - 20) % 10] || suffixes[v] || suffixes[0]);
    };

    const formatDate = (dateString) => {
      const date = new Date(dateString);
      const day = getDayWithSuffix(date.getDate());
      const month = date.toLocaleString("en-US", { month: "long" });
      const year = date.getFullYear();
      return `${day}, ${month} ${year}`;
    };

    const formatTime = (timeString) => {
      const [hour, minute] = timeString.split(":");
      const date = new Date();
      date.setHours(hour, minute);
      return date.toLocaleString("en-US", {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    };

    let globalIndex = 0;

    const result = Object.values(
      validShowtimes.reduce((acc, { date, time }) => {
        const formattedDate = formatDate(date);
        const formattedTime = formatTime(time);

        if (!acc[formattedDate]) {
          acc[formattedDate] = { date: formattedDate, times: [] };
        }

        acc[formattedDate].times.push({
          index: globalIndex++,
          time: formattedTime
        });

        return acc;
      }, {})
    );

    setFormatted(result);
    console.log(result);
  }, [themovieshowtime]);

  const handleDateChange = (e) => {
    const selected = e.target.value;
    setSelectedDate(selected);

    const found = formatted.find((s) => s.date === selected);
    setAvailableTimes(found?.times);
    //  setIsCheckingAvailability(false);
  };



useEffect(() => {
    setIsCheckingAvailability(true);

  if (themovie?._id && showtimes.data?.length > 0) {
    const filtered = showtimes.data.filter(
      (show) => show.movieId === themovie._id
    );
    setthemovieshowtime(filtered);
    console.log("Filtered showtimes:", filtered);

    const valid = filtered.filter((show) => {
      const showDatetime = new Date(`${show.date}T${show.time}`);
      return showDatetime > fakeNow;
    });

    setValidShowtimes(valid); 
    setIsCheckingAvailability(false);

    console.log("Valid showtimes:", valid);
  }
}, [themovie, showtimes.data]);






  useEffect(() => {
    if (params.movieSlug && allmovies.length > 0) {
      const foundMovie = allmovies.find(
        (movie) => movie.movieSlug === params.movieSlug
      );
      setthemovie(foundMovie || {});
    }
  }, [params.movieSlug, allmovies]);

  if (!themovie || Object.keys(themovie).length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black flex items-center justify-center">
        <div className="text-white text-center">
          <div className="animate-spin w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-xl">Loading movie details...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <div 
          className={`w-full h-full bg-cover bg-center bg-no-repeat ${!isLargeScreen ? 'hidden' : ''}`}
          style={{
            backgroundImage: isLargeScreen ? `url(${themovie.movieBackdrop})` : "none",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/50 to-black/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-transparent to-black/60" />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Header Navigation */}
        <header className="absolute top-0 left-0 right-0 z-50 p-4 md:p-6">
          <Link
            to={"/"}
            className="mt-6 lg:mt-24 flex items-center gap-3 text-white hover:text-blue-400 transition-colors group no-underline"
          >
            <div className="p-2 rounded-full bg-black/30 backdrop-blur-sm group-hover:bg-black/50 transition-colors">
              <ChevronLeft className="w-5 h-5" />
            </div>
            <span className="font-medium hidden sm:inline">Go back</span>
          </Link>
        </header>

        {/* Main Content Container */}
        <div className="pt-20 md:pt-32 pb-8">
          <div className="container mx-auto px-4 md:px-6 lg:px-8">
            
            {/* Mobile Layout */}
            <div className="block lg:hidden">
              {/* Movie Poster Card - Mobile */}
              <div className="relative mx-auto mb-8 w-72 h-96 rounded-2xl overflow-hidden shadow-2xl">
                <img 
                  src={themovie.movieImage} 
                  alt={themovie.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                <button
                  onClick={openModal}
                  className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white  py-3 w-52 rounded-full flex items-center justify-center gap-1 hover:bg-white/30 transition-all"
                >
                  <Play className="w-5 h-5 fill-current" />
                  <span className="font-medium">Watch Trailer</span>
                </button>
              </div>

              {/* Movie Info - Mobile */}
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-4 text-center lg:text-left">
                    {themovie.title}
                  </h1>
                </div>

                {/* Genres - Mobile */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-3 tracking-wider flex items-center gap-2">
                    <Star className="w-4 h-4" />
                    GENRES
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {themovie.genre?.map((genre, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-medium"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Synopsis - Mobile */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-3 tracking-wider">SYNOPSIS</h3>
                  <p className="text-gray-200 leading-relaxed text-sm text-left font-semibold lg:text-left">
                    {themovie.description}
                  </p>
                </div>

                {/* Cast - Mobile */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-4 tracking-wider flex items-center gap-2">
                    <Users className="w-4 h-4" />
                    CAST
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    {themovie.cast?.map((actor, index) => (
                      <div key={index} className="text-center">
                        <div className="w-20 h-20 mx-auto mb-2 rounded-full overflow-hidden ring-2 ring-blue-500/30">
                          <img
                            src={actor.image}
                            alt={actor.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <p className="text-xs font-medium text-gray-300">{actor.name}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Showtimes - Mobile */}
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-800">
                  <h3 className="text-sm font-semibold text-gray-300 mb-4 tracking-wider flex items-center gap-2">
                    <Calendar className="w-4 h-4" />
                    SELECT SHOW DATE
                  </h3>

                  {isCheckingAvailability ? (<div className="text-center py-8 text-gray-500">Loading showtimes...</div>) : formatted.length > 0 ? (
                    <div className="space-y-4">
                      <select
                        className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 text-base focus:border-blue-500 focus:outline-none transition-colors"
                        value={selectedDate}
                        onChange={handleDateChange}
                      >
                        <option value="">-- Choose a Date --</option>
                        {formatted.map((s) => (
                          <option key={s.date} value={s.date}>
                            {s.date}
                          </option>
                        ))}
                      </select>

                      { availableTimes.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-300 tracking-wider flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            AVAILABLE SHOWTIMES
                          </h4>
                          <div className="grid grid-cols-3 gap-2">
                            {availableTimes.map((time, index) => (
                              <Link 
                                to={`/select-seats/${themovie._id}/${themovieshowtime[time.index]._id}`}
                                key={index}
                                className="text-center no-underline px-3 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105"
                              >
                                {time.time}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-8">
                      <Calendar className="w-12 h-12 text-gray-600 mx-auto mb-3" />
                      <p className="text-red-400 font-medium">This Movie is not showing yet</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden lg:grid lg:grid-cols-2 lg:gap-12 xl:gap-16">
              
              {/* Left Column - Poster & Showtimes */}
              <div className="space-y-8">
                <div className="relative group">
                  <div className="relative w-full max-w-md mx-auto">
                    <div className="aspect-[2/3] rounded-2xl overflow-hidden shadow-2xl ring-1 ring-white/10">
                      <img 
                        src={themovie.movieImage} 
                        alt={themovie.title}
                        className="w-full h-full object-cover transition-transform group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
                      <button
                        onClick={openModal}
                        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-md text-white px-8 py-4 rounded-full flex items-center gap-3 hover:bg-white/30 transition-all hover:scale-110"
                      >
                        <Play className="w-6 h-6 fill-current" />
                        <span className="font-semibold">Watch Trailer</span>
                      </button>
                    </div>
                  </div>
                </div>

                {/* Showtimes - Desktop */}
                <div className="bg-black/40 backdrop-blur-sm rounded-2xl p-6 border border-gray-800 max-w-md mx-auto">
                  <h3 className="text-sm font-semibold text-gray-300 mb-6 tracking-wider flex items-center gap-2">
                    <Calendar className="w-5 h-5" />
                    SELECT SHOW DATE
                  </h3>

                  {isCheckingAvailability ? (<div className="text-center py-8 text-gray-500">Loading showtimes...</div>) : formatted.length > 0 ? (
                    <div className="space-y-4">
                      <select
                        className="w-full bg-gray-800 text-white px-4 py-3 rounded-xl border border-gray-700 text-base focus:border-blue-500 focus:outline-none transition-colors"
                        value={selectedDate}
                        onChange={handleDateChange}
                      >
                        <option value="">-- Choose a Date --</option>
                        {formatted.map((s) => (
                          <option key={s.date} value={s.date}>
                            {s.date}
                          </option>
                        ))}
                      </select>

                      {availableTimes.length > 0 && (
                        <div className="space-y-3">
                          <h4 className="text-sm font-semibold text-gray-300 tracking-wider flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            AVAILABLE SHOWTIMES
                          </h4>
                          <div className="grid grid-cols-2 gap-3">
                            {availableTimes.map((time, index) => (
                              <Link 
                                to={`/select-seats/${themovie._id}/${themovieshowtime[time.index]._id}`}
                                key={index}
                                className="text-center no-underline px-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 shadow-lg"
                              >
                                {time.time}
                              </Link>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  ) : (
                    <div className="text-center py-12">
                      <Calendar className="w-16 h-16 text-gray-600 mx-auto mb-4" />
                      <p className="text-red-400 font-medium text-lg">This Movie is not showing yet</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Right Column - Movie Details */}
              <div className="space-y-8 pt-8">
                <div>
                  <h1 className="text-5xl xl:text-6xl font-bold mb-6 leading-tight">
                    {themovie.title}
                  </h1>
                </div>

                {/* Genres - Desktop */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-4 tracking-wider flex items-center gap-2">
                    <Star className="w-5 h-5" />
                    GENRE
                  </h3>
                  <div className="flex flex-wrap gap-3">
                    {themovie.genre?.map((genre, index) => (
                      <span
                        key={index}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-medium hover:from-blue-700 hover:to-purple-700 transition-all"
                      >
                        {genre}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Synopsis - Desktop */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-4 tracking-wider">SYNOPSIS</h3>
                  <p className="text-gray-200 leading-relaxed text-md font-semibold text-left">
                    {themovie.description}
                  </p>
                </div>

                {/* Cast - Desktop */}
                <div>
                  <h3 className="text-sm font-semibold text-gray-300 mb-6 tracking-wider flex items-center gap-2">
                    <Users className="w-5 h-5" />
                    CAST
                  </h3>
                  <div className="flex flex-wrap gap-6">
                    {themovie.cast?.map((actor, index) => (
                      <div key={index} className="text-center group cursor-pointer">
                        <div className="w-24 h-24 mb-3 rounded-full overflow-hidden ring-2 ring-blue-500/30 group-hover:ring-blue-500/60 transition-all">
                          <img
                            src={actor.image}
                            alt={actor.name}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform"
                          />
                        </div>
                        <p className="font-medium text-gray-300 group-hover:text-white transition-colors text-sm w-24">
                          {actor.name}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Trailer Modal */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="relative w-full max-w-6xl bg-black rounded-2xl overflow-hidden shadow-2xl">
            <button
              onClick={closeModal}
              className="absolute top-4 right-4 z-10 bg-black/50 hover:bg-black/80 text-white p-3 rounded-full transition-all"
            >
              <X size={24} />
            </button>
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={themovie.trailer}
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

export default MoviePage;