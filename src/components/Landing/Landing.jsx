// src/components/Landing/Landing.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import './Landing.css';

// Helper to decode a JWT’s payload
function decodeJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map((c) => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join('')
  );
  return JSON.parse(jsonPayload);
}

const Landing = () => {
  const navigate = useNavigate();
  const [mode, setMode] = useState(null); // "signup" or "login"
  const [loading, setLoading] = useState(false);

  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse?.credential;
    if (!token) return alert('No token received from Google.');

    const decoded = decodeJwt(token);

    if (mode === 'signup') {
      // For registration we need firstName, lastName, email, linkedInUrl, status="new"
      const payload = {
        status: 'new',
        firstName: decoded.given_name,
        lastName: decoded.family_name,
        email: decoded.email,
        linkedInUrl: ''
      };
      localStorage.setItem('oauthUser', JSON.stringify(payload));
      return navigate('/register');
    }

    // mode === 'login'
    setLoading(true);
    try {
      // Only email and status are strictly required
      const payload = {
        status: 'exists',
        email: decoded.email
      };
      const res = await fetch(import.meta.env.VITE_API_LOGIN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      const data = await res.json();
      if (data.success) {
        navigate('/dashboard');
      } else {
        alert(data.message || 'Login failed.');
      }
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong during login.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="landingPage">
      <h1>Welcome to the Finance App</h1>

      {/* Choose flow */}
      {mode === null && (
        <div className="modeButtons">
          <button onClick={() => setMode('signup')}>Sign Up with Google</button>
          <button onClick={() => setMode('login')}>Log In with Google</button>
        </div>
      )}

      {/* Google button */}
      {mode !== null && !loading && (
        <div className="googleButtonWrapper">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => alert('Google login failed')}
          />
          <button className="backButton" onClick={() => setMode(null)}>
            ← Back
          </button>
        </div>
      )}

      {loading && <p>Loading…</p>}
    </div>
  );
};

export default Landing;
