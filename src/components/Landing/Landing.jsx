import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import './Landing.css';

// Helper to decode JWT
function decodeJwt(token) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split('')
      .map(c => `%${('00' + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join('')
  );
  return JSON.parse(jsonPayload);
}

const Landing = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState(null); // "signup" or "login"

  const handleSuccess = async (credentialResponse) => {
    const token = credentialResponse?.credential;
    if (!token) {
      alert('No token received from Google.');
      return;
    }

    const decoded = decodeJwt(token);

    if (mode === 'signup') {
      const user = {
        firstName: decoded.given_name,
        lastName: decoded.family_name,
        email: decoded.email
      };
      localStorage.setItem('oauthUser', JSON.stringify(user));
      navigate('/register');
    }

    if (mode === 'login') {
      setLoading(true);
      try {
        const res = await fetch(import.meta.env.VITE_API_LOGIN_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            user_email: decoded.email,
            user_password: 'FromGoogleOAuth!',
            user_first_name: decoded.given_name,
            user_last_name: decoded.family_name,
            linkedin_url: ''
          })
        });

        const data = await res.json();

        if (data.success) {
          // You might want to store the investments here for the dashboard
          navigate('/dashboard');
        } else {
          alert('Login failed.');
        }
      } catch (err) {
        console.error('Login error:', err);
        alert('Something went wrong during login.');
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="landingPage">
      <h1>Welcome to the Finance App</h1>

      {mode === null && (
        <div style={{ display: 'flex', gap: '1rem' }}>
          <button onClick={() => setMode('signup')}>Sign Up with Google</button>
          <button onClick={() => setMode('login')}>Log In with Google</button>
        </div>
      )}

      {mode !== null && !loading && (
        <div style={{ marginTop: '1rem' }}>
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => alert('Google login failed')}
          />
          <p style={{ marginTop: '0.5rem' }}>
            <button onClick={() => setMode(null)}>← Back</button>
          </p>
        </div>
      )}

      {loading && <p>Loading...</p>}
    </div>
  );
};

export default Landing;
