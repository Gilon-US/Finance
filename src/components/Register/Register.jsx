import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Register.css';

const Register = () => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    linkedInUrl: ''
  });

  useEffect(() => {
    const rawUser = localStorage.getItem('oauthUser');
    if (rawUser) {
      const parsed = JSON.parse(rawUser);
      setUserInfo({
        ...userInfo,
        firstName: parsed?.given_name || '',
        lastName: parsed?.family_name || '',
        email: parsed?.email || ''
      });
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const res = await fetch('http://localhost:3000/api/auth/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInfo)
    });

    const data = await res.json();
    if (data.success) {
      localStorage.removeItem('oauthUser');
      navigate('/dashboard');
    } else {
      alert('Registration failed.');
    }
  };

  return (
    <div className="registerPage">
      <h1>Register</h1>
      <form onSubmit={handleSubmit} className="registerForm">
        <input
          type="text"
          name="firstName"
          value={userInfo.firstName}
          onChange={handleChange}
          placeholder="First Name"
          required
        />
        <input
          type="text"
          name="lastName"
          value={userInfo.lastName}
          onChange={handleChange}
          placeholder="Last Name"
          required
        />
        <input
          type="email"
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          placeholder="Email"
          required
          disabled
        />
        <input
          type="url"
          name="linkedInUrl"
          value={userInfo.linkedInUrl}
          onChange={handleChange}
          placeholder="LinkedIn URL"
          required
        />
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
