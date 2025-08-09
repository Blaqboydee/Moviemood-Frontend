import React, { useState } from 'react'


const Youtubemodal = () => {
        const [isOpen, setIsOpen] = useState(false);
      
    
      
      const openModal = () =>{
      setIsOpen(true);
      } 
    
  return (
    <div>
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
            <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
              <iframe
                className="absolute top-0 left-0 w-full h-full"
                src={``}
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
  )
}

export default Youtubemodal