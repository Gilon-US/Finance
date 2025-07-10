import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleLogin } from '@react-oauth/google';
import './Landing.css';

const Landing = () => {
  const navigate = useNavigate();

  const handleSuccess = async () => {
    const mockGoogleResponse = {
      exists: false, // change to true to test existing user
      user: {
        given_name: 'Testy',
        family_name: 'Userman',
        email: 'test@fake.com'
      }
    };

    if (mockGoogleResponse.exists) {
      navigate('/dashboard');
    } else {
      localStorage.setItem('oauthUser', JSON.stringify(mockGoogleResponse.user));
      navigate('/register');
    }
  };

  return (
    <div className="landingPage">
      <h1>Welcome to the Finance App</h1>
      <GoogleLogin onSuccess={handleSuccess} onError={() => alert('Login Failed')} />
    </div>
  );
};

export default Landing;
