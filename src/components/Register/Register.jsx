import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";

const Register = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [userInfo, setUserInfo] = useState({
    firstName: "",
    lastName: "",
    email: "",
    linkedInUrl: "",
    password: "",
  });

  useEffect(() => {
    const rawUser = localStorage.getItem("oauthUser");
    if (rawUser) {
      const parsed = JSON.parse(rawUser);
      setUserInfo((prev) => ({
        ...prev,
        firstName: parsed?.given_name || "",
        lastName: parsed?.family_name || "",
        email: parsed?.email || "",
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch(import.meta.env.VITE_API_REGISTER_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userInfo),
      });

      let data;
      try {
        data = await res.json();
      } catch (jsonError) {
        console.error("Could not parse JSON:", jsonError);
        throw new Error("Invalid JSON response from server.");
      }

      if (!res.ok) {
        console.error("Server returned an error:", res.status, data);
        alert(data.message || "Registration failed.");
        return;
      }

      if (data.success) {
        localStorage.removeItem("oauthUser");
        navigate("/dashboard");
      } else {
        alert(data.message || "Registration failed.");
      }
    } catch (err) {
      console.error("Fetch failed or unknown error:", err);
      alert("An error occurred while registering.");
    } finally {
      setLoading(false);
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
        <input
          type="password"
          name="password"
          value={userInfo.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
        <button type="submit" disabled={loading}>
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

export default Register;
