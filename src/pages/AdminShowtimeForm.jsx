import React, { useEffect, useState } from "react";
import axios from "axios";
import { useFetchMovies } from "../hooks/useFetchMovies";

const AdminShowtimeForm = () => {
  const { allmovies, nowshowing, comingsoon } = useFetchMovies();

  const [formData, setFormData] = useState({
    movieId: "",
    date: "",
    time: "",
  });

  const [message, setMessage] = useState("");
  const API_URL = import.meta.env.VITE_API_URL;

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${API_URL}/movie/showtime`, formData);
      setMessage(`Showtime created successfully for ${formData.time}`);
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-950/70 to-slate-950">
      <div className="w-full px-4 py-6 sm:px-6 lg:px-8 xl:px-10 flex items-center justify-center min-h-screen">
        
        <div className="w-full max-w-2xl">
          <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 lg:p-8 shadow-2xl">
            
            <div className="flex items-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-indigo-500 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-white via-purple-200 to-white bg-clip-text text-transparent">Create Showtime</h2>
            </div>

            {message && (
              <div className={`mb-6 p-4 rounded-2xl border ${
                message.includes('successfully') 
                  ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-400' 
                  : 'bg-red-500/10 border-red-500/30 text-red-400'
              }`}>
                <p className="text-sm text-center font-medium">{message}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">Select Movie:</label>
                <div className="relative">
                  <select
                    className="w-full bg-slate-900/60 border border-slate-700/50 rounded-2xl px-4 py-4 text-white focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 focus:outline-none transition-all duration-300 appearance-none"
                    name="movieId"
                    value={formData.movieId}
                    onChange={handleChange}
                    required
                  >
                    <option value="">-- Choose a Movie --</option>
                    {nowshowing ? (
                      nowshowing.map((movie) => (
                        <option key={movie._id} value={movie._id}>
                          {movie.title}
                        </option>
                      ))
                    ) : (
                      <option disabled>Loading...</option>
                    )}
                  </select>
                  <div className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="grid gap-6 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">Date:</label>
                  <input
                    type="date"
                    className="w-full bg-slate-900/60 border border-slate-700/50 rounded-2xl px-4 py-4 text-white focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 focus:outline-none transition-all duration-300"
                    name="date"
                    value={formData.date}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">Time:</label>
                  <input
                    type="time"
                    className="w-full bg-slate-900/60 border border-slate-700/50 rounded-2xl px-4 py-4 text-white focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 focus:outline-none transition-all duration-300"
                    name="time"
                    value={formData.time}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-purple-500/25 hover:scale-105"
              >
                Add Showtime
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminShowtimeForm;