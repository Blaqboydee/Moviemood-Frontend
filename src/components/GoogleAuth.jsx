import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";


export default function GoogleSignIn() {
  const API_URL = import.meta.env.VITE_API_URL;

  const handleSuccess = async (credentialResponse) => {
    try {
      // Get the token from Google
      const token = credentialResponse.credential;

      // Send token to backend for verification & user creation/login
      const res = await axios.post(`${API_URL}/auth/google-login`, { token });

      console.log("Login success:", res.data);

      // Store user data in localStorage
      localStorage.setItem("authToken", res.data.token); // JWT from backend
      localStorage.setItem("isAdmin", res.data.user?.isAdmin); // Boolean
      localStorage.setItem("user", JSON.stringify(res.data.user)); // Full user object

      // Optional: redirect after login
      window.location.href = "/";
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
    }
  };

  const handleError = () => {
    console.log("Google Sign-In failed");
  };

  return (
    <div>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
    </div>
  );
}
