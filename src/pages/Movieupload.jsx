import React, { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUpload } from "../hooks/useUpload";

const MovieUpload = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const {
    formData,
    handleChange,
    handleImageUpload,
    handleSubmit,
    handleCastChange,
    handleCastImageUpload,
  } = useUpload();

  const nextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return (
          formData.title &&
          formData.genre &&
          formData.description &&
          formData.price
        );
      case 2:
        return (
          formData.trailer &&
          formData.releasedate &&
          formData.duration &&
          formData.language &&
          formData.status
        );
      case 3:
        return (
          formData.cast.every((member) => member.name && member.image) &&
          formData.movieImage &&
          formData.movieBackdrop
        );
      default:
        return false;
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-blue-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Basic Information</h3>
            </div>

            <div className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Title</label>
                <input
                  type="text"
                  name="title"
                  placeholder="Movie Title"
                  value={formData.title || ""}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-2xl px-4 py-4 text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Genre</label>
                <input
                  name="genre"
                  placeholder="Genre (e.g., Action, Romance)"
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-2xl px-4 py-4 text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Description</label>
                <textarea
                  name="description"
                  placeholder="Movie Description"
                  value={formData.description || ""}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-2xl px-4 py-4 text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all duration-300 resize-none"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Ticket Price</label>
                <div className="relative">
                  <input
                    type="text"
                    name="price"
                    placeholder="e.g 1500"
                    value={formData.price || ""}
                    onChange={handleChange}
                    required
                    className="w-full bg-slate-900/60 border border-slate-700/50 rounded-2xl px-4 py-4 pl-12 text-white placeholder-slate-400 focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/20 focus:outline-none transition-all duration-300"
                  />
                  {/* <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 font-bold text-lg">₦</div> */}
                </div>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-purple-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7a1 1 0 01-1-1V5a1 1 0 011-1h4zM9 3v1h6V3H9zM5 7v11h14V7H5z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Movie Details</h3>
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Trailer Link</label>
                <input
                  type="text"
                  name="trailer"
                  placeholder="YouTube/Trailer URL"
                  value={formData.trailer || ""}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-2xl px-4 py-4 text-white placeholder-slate-400 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 focus:outline-none transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Release Date</label>
                <input
                  type="text"
                  name="releasedate"
                  placeholder="Release Date"
                  value={formData.releasedate || ""}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-2xl px-4 py-4 text-white placeholder-slate-400 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 focus:outline-none transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Duration</label>
                <input
                  type="text"
                  name="duration"
                  placeholder="Duration in minutes"
                  value={formData.duration || ""}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-2xl px-4 py-4 text-white placeholder-slate-400 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 focus:outline-none transition-all duration-300"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Language</label>
                <input
                  type="text"
                  name="language"
                  placeholder="Language (e.g., English, Yoruba)"
                  value={formData.language || ""}
                  onChange={handleChange}
                  required
                  className="w-full bg-slate-900/60 border border-slate-700/50 rounded-2xl px-4 py-4 text-white placeholder-slate-400 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 focus:outline-none transition-all duration-300"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Status</label>
              <input
                type="text"
                name="status"
                placeholder="Status (e.g., Now Showing, Coming Soon)"
                value={formData.status || ""}
                onChange={handleChange}
                required
                className="w-full bg-slate-900/60 border border-slate-700/50 rounded-2xl px-4 py-4 text-white placeholder-slate-400 focus:border-purple-500/50 focus:ring-4 focus:ring-purple-500/20 focus:outline-none transition-all duration-300"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                <svg className="w-5 h-5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-bold text-white">Cast & Media</h3>
            </div>

            <div className="space-y-6">
              <div className="bg-slate-900/30 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-emerald-400 mb-4 uppercase tracking-wide">Cast Members</h4>
                <div className="space-y-4">
                  {formData.cast.map((castMember, index) => (
                    <div key={index} className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/50">
                      <p className="text-sm font-semibold text-slate-300 uppercase tracking-wide mb-3">Cast {index + 1}:</p>
                      <div className="grid gap-4 sm:grid-cols-2">
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-slate-400">Name</label>
                          <input
                            type="text"
                            placeholder={`Cast ${index + 1} Name`}
                            value={castMember.name}
                            onChange={(e) =>
                              handleCastChange(index, "name", e.target.value)
                            }
                            required
                            className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-3 py-3 text-white placeholder-slate-400 focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-300"
                          />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium text-slate-400">Photo</label>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={(e) => handleCastImageUpload(e, index)}
                            required
                            className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-3 py-3 text-white file:mr-3 file:py-1 file:px-3 file:rounded-lg file:border-0 file:text-xs file:font-medium file:bg-emerald-500/20 file:text-emerald-400 hover:file:bg-emerald-500/30 file:cursor-pointer focus:border-emerald-500/50 focus:ring-2 focus:ring-emerald-500/20 focus:outline-none transition-all duration-300"
                          />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-slate-900/30 rounded-2xl p-6">
                <h4 className="text-lg font-bold text-amber-400 mb-4 uppercase tracking-wide">Poster and Backdrop</h4>
                <div className="grid gap-6 sm:grid-cols-2">
                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Movie Poster</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "movieImage")}
                      required
                      className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-4 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-amber-500/20 file:text-amber-400 hover:file:bg-amber-500/30 file:cursor-pointer focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/20 focus:outline-none transition-all duration-300"
                    />
                  </div>

                  <div className="space-y-3">
                    <label className="text-sm font-semibold text-slate-300 uppercase tracking-wide">Movie Backdrop</label>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, "movieBackdrop")}
                      required
                      className="w-full bg-slate-900/60 border border-slate-700/50 rounded-xl px-4 py-4 text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-amber-500/20 file:text-amber-400 hover:file:bg-amber-500/30 file:cursor-pointer focus:border-amber-500/50 focus:ring-4 focus:ring-amber-500/20 focus:outline-none transition-all duration-300"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-gray-950 via-gray-950/70 to-slate-950">
      <div className="w-full px-4 py-6 sm:px-6 lg:px-8 xl:px-10">
        <div>
          
          {/* Header */}
          <div className="mb-8">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg shadow-red-500/25">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1v9a2 2 0 01-2 2H5a2 2 0 01-2-2V7a1 1 0 01-1-1V5a1 1 0 011-1h4zM9 3v1h6V3H9zM5 7v11h14V7H5z" />
                </svg>
              </div>
              <div>
                <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-white via-red-200 to-white bg-clip-text text-transparent">
                  Upload Movies
                </h2>
                <p className="text-sm sm:text-base text-slate-400 mt-1">Add new movies to your cinema catalog</p>
              </div>
            </div>

            {/* Step Indicators */}
            <div className="flex justify-center mb-8">
              <div className="flex items-center gap-4">
                {[1, 2, 3].map((step) => (
                  <div key={step} className="flex items-center gap-4">
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold transition-all duration-300 ${
                        currentStep === step
                          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow-lg shadow-blue-500/25"
                          : currentStep > step
                          ? "bg-emerald-500 text-white shadow-lg shadow-emerald-500/25"
                          : "bg-slate-700/50 text-slate-400 border border-slate-600/50"
                      }`}>
                        {currentStep > step ? (
                          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          step
                        )}
                      </div>
                      <div className={`text-sm font-semibold transition-colors duration-300 ${
                        currentStep >= step ? "text-white" : "text-slate-400"
                      }`}>
                        {step === 1 && "Basic Info"}
                        {step === 2 && "Details"}
                        {step === 3 && "Cast & Media"}
                      </div>
                    </div>
                    {step < 3 && (
                      <div className={`w-8 h-0.5 transition-colors duration-300 ${
                        currentStep > step ? "bg-emerald-500" : "bg-slate-600/50"
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Step Content */}
          <div className="max-w-4xl mx-auto mb-8">
            <div className="bg-slate-800/40 backdrop-blur-xl border border-slate-700/50 rounded-3xl p-6 lg:p-8 shadow-2xl">
              {renderStep()}
            </div>
          </div>

          {/* Navigation Buttons */}
          <div className="max-w-4xl mx-auto">
            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <button
                type="button"
                onClick={prevStep}
                disabled={currentStep === 1}
                className="sm:w-auto w-full bg-slate-700/50 hover:bg-slate-700/70 disabled:bg-slate-800/30 disabled:text-slate-500 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:scale-105 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-3"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous
              </button>

              {currentStep < 3 ? (
                <button
                  type="button"
                  onClick={nextStep}
                  disabled={!isStepValid()}
                  className="sm:w-auto w-full bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 disabled:from-slate-500 disabled:to-slate-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-blue-500/25 hover:scale-105 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-3"
                >
                  Next
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  disabled={!isStepValid()}
                  className="sm:w-auto w-full bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 disabled:from-slate-500 disabled:to-slate-600 text-white font-bold py-4 px-8 rounded-2xl transition-all duration-300 hover:shadow-xl hover:shadow-emerald-500/25 hover:scale-105 disabled:cursor-not-allowed disabled:scale-100 flex items-center justify-center gap-3"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                  </svg>
                  Upload Movie
                </button>
              )}
            </div>
          </div>
        </div>
        
        <ToastContainer 
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          className="!mt-20"
        />
      </div>
    </div>
  );
};

export default MovieUpload;