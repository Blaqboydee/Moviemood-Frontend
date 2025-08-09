import React, { useState } from 'react';
import { Play, X } from 'lucide-react';

const YouTubeTrailerPopup = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  // You can change this to any YouTube video ID
  const videoId = 'dQw4w9WgXcQ'; // Example video ID
  
  const openModal = () => setIsOpen(true);
  const closeModal = () => setIsOpen(false);

  return (
    <div className="p-8">

      {/* Watch Trailer Button */}
      <button
        onClick={openModal}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-3 px-6 rounded-lg flex items-center gap-2 transition-colors duration-200 shadow-lg hover:shadow-xl transform hover:scale-105 mt-[300px]"
      >
        <Play size={20} />
        Watch Trailer
      </button>

      {/* Modal Overlay */}
      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
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
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={`https://www.youtube.com/embed/${videoId}?autoplay=1&rel=0`}
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

export default YouTubeTrailerPopup;