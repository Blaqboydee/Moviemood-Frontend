import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import axios from "axios";

export default function GoogleSignIn() {
  const API_URL = import.meta.env.VITE_API_URL;
  
  const [showModal, setShowModal] = useState(false);
  const [isAdminFlow, setIsAdminFlow] = useState(false);
  const [adminPassword, setAdminPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [pendingCredential, setPendingCredential] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSuccess = async (credentialResponse) => {
    // Store the credential and show modal to ask if user is admin
    setPendingCredential(credentialResponse);
    setShowModal(true);
  };

  const handleAdminChoice = (isAdmin) => {
    setIsAdminFlow(isAdmin);
    if (!isAdmin) {
      // Not admin, proceed directly to login
      proceedWithLogin(null);
    }
    // If admin, keep modal open for password input
  };

  const handleAdminPasswordSubmit = () => {
    if (adminPassword.trim() === "") {
      setPasswordError("Please enter admin password");
      return;
    }
    proceedWithLogin(adminPassword);
  };

  const proceedWithLogin = async (adminPassword) => {
    setIsLoading(true);
    setPasswordError("");
    
    try {
      const token = pendingCredential.credential;
      
      // Send token and admin password to backend for verification
      const res = await axios.post(`${API_URL}/auth/google-login`, { 
        token,
        adminPassword // Send admin password to backend (null if not admin)
      });
      
      console.log("Login success:", res.data);
      
      // Store user data in localStorage
      localStorage.setItem("authToken", res.data.token);
      localStorage.setItem("isAdmin", res.data.user.isAdmin.toString());
      localStorage.setItem("user", JSON.stringify(res.data.user));
      
      // Close modal and reset state
      resetModalState();
      
      // Redirect after login
      window.location.href = "/";
    } catch (err) {
      console.error("Login failed:", err.response?.data || err.message);
      
      if (err.response?.status === 401 && err.response?.data?.message === "Invalid admin password") {
        setPasswordError("Incorrect admin password");
        setAdminPassword(""); // Clear the password field
      } else {
        // Other errors, close modal and show general error
        resetModalState();
        alert("Login failed. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  const resetModalState = () => {
    setShowModal(false);
    setIsAdminFlow(false);
    setAdminPassword("");
    setPasswordError("");
    setPendingCredential(null);
    setIsLoading(false);
  };

  const handleError = () => {
    console.log("Google Sign-In failed");
  };

  return (
    <div>
      <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
      
      {/* Admin Modal */}
      {showModal && (
        <div className="modal-overlay" style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          zIndex: 1000
        }}>
          <div className="modal-content" style={{
            backgroundColor: 'white',
            padding: '20px',
            borderRadius: '8px',
            minWidth: '300px',
            maxWidth: '400px',
            position: 'relative'
          }}>
            {!isAdminFlow ? (
              // Initial admin choice
              <div>
                <h3 style={{ marginTop: 0 }}>Login Type</h3>
                <p>Are you an admin?</p>
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <button 
                    onClick={() => handleAdminChoice(true)}
                    disabled={isLoading}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: isLoading ? '#ccc' : '#007bff',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: isLoading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Yes
                  </button>
                  <button 
                    onClick={() => handleAdminChoice(false)}
                    disabled={isLoading}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: isLoading ? '#ccc' : '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: isLoading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isLoading ? 'Logging in...' : 'No'}
                  </button>
                </div>
              </div>
            ) : (
              // Admin password input
              <div>
                <h3 style={{ marginTop: 0 }}>Admin Verification</h3>
                <p>Please enter the admin password:</p>
                <input
                  type="password"
                  value={adminPassword}
                  onChange={(e) => setAdminPassword(e.target.value)}
                  placeholder="Admin password"
                  disabled={isLoading}
                  style={{
                    width: '100%',
                    padding: '8px',
                    marginBottom: '10px',
                    border: passwordError ? '1px solid red' : '1px solid #ccc',
                    borderRadius: '4px',
                    opacity: isLoading ? 0.6 : 1
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter' && !isLoading) {
                      handleAdminPasswordSubmit();
                    }
                  }}
                />
                {passwordError && (
                  <p style={{ color: 'red', marginBottom: '10px', fontSize: '14px' }}>
                    {passwordError}
                  </p>
                )}
                <div style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
                  <button 
                    onClick={handleAdminPasswordSubmit}
                    disabled={isLoading}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: isLoading ? '#ccc' : '#28a745',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: isLoading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {isLoading ? 'Verifying...' : 'Submit'}
                  </button>
                  <button 
                    onClick={() => setIsAdminFlow(false)}
                    disabled={isLoading}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: isLoading ? 'not-allowed' : 'pointer'
                    }}
                  >
                    Back
                  </button>
                </div>
              </div>
            )}
            
            {/* Close button */}
            <button 
              onClick={resetModalState}
              disabled={isLoading}
              style={{
                position: 'absolute',
                top: '10px',
                right: '15px',
                background: 'none',
                border: 'none',
                fontSize: '18px',
                cursor: isLoading ? 'not-allowed' : 'pointer',
                opacity: isLoading ? 0.5 : 1
              }}
            >
              ×
            </button>
          </div>
        </div>
      )}
    </div>
  );
}