import React, { useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import "./Landing.css";

// Helper to decode JWT
function decodeJwt(token) {
  const base64Url = token.split(".")[1];
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const jsonPayload = decodeURIComponent(
    atob(base64)
      .split("")
      .map((c) => `%${("00" + c.charCodeAt(0).toString(16)).slice(-2)}`)
      .join("")
  );
  return JSON.parse(jsonPayload);
}

export default function Landing() {
  const navigate = useNavigate();
  const [mode, setMode] = useState(null);       // "signup" or "login"
  const [loading, setLoading] = useState(false);

  const handleSuccess = useCallback(
    async (credentialResponse) => {
      const token = credentialResponse?.credential;
      if (!token) return alert("No token received from Google.");

      const decoded = decodeJwt(token);

      if (mode === "signup") {
        const payload = {
          status: "new",
          firstName: decoded.given_name,
          lastName: decoded.family_name,
          email: decoded.email,
          linkedInUrl: ""
        };
        localStorage.setItem("oauthUser", JSON.stringify(payload));
        return navigate("/register");
      }

      // ——— Login flow ———
      setLoading(true);
      try {
        const payload = { status: "exists", email: decoded.email };
        const res = await fetch(import.meta.env.VITE_API_LOGIN_URL, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (data.success) {
          // **Save full session** (user_id + investments array)
          localStorage.setItem("sessionData", JSON.stringify(data));
          navigate("/dashboard");
        } else {
          alert(data.message || "Login failed.");
        }
      } catch (err) {
        console.error("Login error:", err);
        alert("Something went wrong during login.");
      } finally {
        setLoading(false);
      }
    },
    [mode, navigate]
  );

  return (
    <div className="landingPage">
      <h1>Welcome to the Finance App</h1>

      {mode === null && (
        <div className="modeButtons">
          <button onClick={() => setMode("signup")}>Sign Up with Google</button>
          <button onClick={() => setMode("login")}>Log In with Google</button>
        </div>
      )}

      {mode !== null && !loading && (
        <div className="googleButtonWrapper">
          <GoogleLogin
            onSuccess={handleSuccess}
            onError={() => alert("Google login failed")}
          />
          <button className="backButton" onClick={() => setMode(null)}>
            ← Back
          </button>
        </div>
      )}

      {loading && <p>Loading…</p>}
    </div>
  );
}
