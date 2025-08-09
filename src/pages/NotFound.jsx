// NotFound.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate()
  return (
 <div className="flex items-center justify-center h-screen bg-gray-800 flex-col">
  <h1 className="text-6xl font-extrabold text-white mb-4">404</h1>
  <p className="text-lg text-gray-400 mx-1 mb-6">Oops! Page not found. Wetin you find reach here?</p>

  <button
    onClick={() => navigate("/")}
    className="px-6 py-2 bg-red-500 text-white font-semibold rounded-lg shadow-md hover:bg-red-600 hover:scale-105 transition-transform duration-200 ease-in-out"
  >
    Go Home
  </button>
</div>

  );
};

export default NotFound;
