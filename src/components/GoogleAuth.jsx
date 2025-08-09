import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function GoogleSignIn() {
  const handleSuccess = async (credentialResponse) => {
    try {
      // Get the token from Google
      console.log(credentialResponse);
      
      const token = credentialResponse.credential;

      // Send token to backend
      const res = await axios.post("http://localhost:6176/auth/google-login", { token });

      console.log("Login success:", res.data);
      // store user localStorage
    localStorage.setItem("authToken", res.data.token); // your app’s JWT
    localStorage.setItem("user", JSON.stringify(res.data.user)); // optional: store user info

    // Redirect or update UI
    window.location.href = "/"; 
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleError = () => {
    console.log("Google Sign-In failed");
  };

  return (
   <div className="flex flex-col items-center bg-slate-800/60 backdrop-blur-xl border border-slate-700/50 rounded-2xl shadow-2xl p-4 sm:p-6 w-full max-w-sm mx-auto hover:bg-slate-800/80 hover:border-purple-500/30 transition-all duration-300 hover:shadow-purple-500/10">
      
      {/* Header */}
      <div className="text-center mb-0 lg:mb-6">
        <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 via-indigo-500 to-purple-500 rounded-xl mb-4 shadow-lg hover:scale-110 transition-transform duration-300">
          <svg className="w-4 h-4 lg:w-6 lg:h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
        </div>
        
        <h2 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-white to-slate-200 bg-clip-text text-transparent mb-2">
          Sign in with Google
        </h2>
        <p className="text-slate-400 text-sm">
          Quick and secure access to your account
        </p>
      </div>

      {/* Google Login Button Placeholder */}
      <div className="w-full">
        <button className="w-full bg-white hover:bg-gray-50 text-gray-800 font-semibold py-3 px-6 rounded-xl border border-gray-200 hover:border-gray-300 transition-all duration-200 flex items-center justify-center gap-3 shadow-lg hover:shadow-xl hover:scale-105 group">
          <svg className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" viewBox="0 0 24 24">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
            <path fill="#FBBC04" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
          </svg>
          <span className="text-[11px] sm:text-base">Continue with Google</span>
        </button>
      </div>

      {/* Security Badge */}
      <div className="flex items-center gap-2 mt-4 text-slate-500">
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
        <span className="text-xs">Secured by Google OAuth</span>
      </div>
    </div>
  );
}
