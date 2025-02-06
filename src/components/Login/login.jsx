import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import "./login.css";
import { Loginimagedata } from "./image";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        "https://multibooking-application-backend.onrender.com/auth/login",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, password }),
        }
      );

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem("token", data.token);
        alert("Login successful! Redirecting to Home Page...");
        navigate("/Home", { replace: true });
      } else {
        alert(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error(error);
      alert("Error during login");
    }
  };

  //Google Login ....

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Decoded Google Token:", decoded);

    fetch("https://multibooking-application-backend.onrender.com/auth/google-login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: decoded.email,
        name: decoded.name,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem("token", data.token);
          navigate("/Home", { replace: true });
        } else {
          alert("Error with Google login");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        alert("Error during Google login");
      });
  };

  const handleGoogleLoginError = () => {
    console.error("Google Login failed.");
    alert("Google Login failed. Please try again.");
  };

  // const googleLogin = useGoogleLogin({
  //   flow: "implicit",
  //   ux_mode: "popup", // ✅ Ensures a popup is used instead of redirect
  //   onSuccess: handleGoogleLoginSuccess,
  //   onError: handleGoogleLoginError,
  //   prompt: "select_account",
  // });

  // const openGooglePopup = () => {
  //   const googleWindow = window.open(
  //     "https://accounts.google.com/o/oauth2/v2/auth?client_id=YOUR_CLIENT_ID&redirect_uri=YOUR_REDIRECT_URI",
  //     "_blank",
  //     "width=500,height=600"
  //   );

  //   // Set window.name to ensure proper handling of popups
  //   googleWindow.name = "googleLoginPopup";
  // };

  return (
    <div className="login-container">
      <Loginimagedata type="Login" />
      <div className="logo-box">
        <h3 id="website-name">MultiBooking Application</h3>
        <h4 id="quote">Unlock more Savings as a member</h4>
        <button className="google-login-btn">
        <GoogleLogin
          className="google-login-btn"
          onSuccess={handleGoogleLoginSuccess}
          onError={handleGoogleLoginError}
        />
        </button>
        <div className="or-continue">
          <hr />
          <span>or continue</span>
          <hr />
        </div>
        <form id="loginForm" onSubmit={handleSubmit}>
          <input
            type="email"
            id="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            name="email"
            required
          />
          <input
            type="password"
            id="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            name="password"
            required
          />
          <button id="submit" type="submit">
            <b>Login</b>
          </button>
          <div className="register-route">
            Don't Have an account?
            <button
              id="sign-up"
              type="button"
              onClick={() => navigate("/register")}
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
