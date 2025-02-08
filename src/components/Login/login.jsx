import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import { Alert } from "@mui/material"; 
import "./login.css";
import { Loginimagedata } from "./image";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [alertMessage, setAlertMessage] = useState(null); 
  const [alertSeverity, setAlertSeverity] = useState("info"); 
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

        setAlertMessage("Login successful! Redirecting to Home Page...");
        setAlertSeverity("success");

        setTimeout(() => {
          navigate("/Home", { replace: true });
        }, 2000); 
      } else {
        
        setAlertMessage(`Error: ${data.error}`);
        setAlertSeverity("error");
      }
    } catch (error) {
      console.error(error);
      setAlertMessage("Error during login");
      setAlertSeverity("error");
    }
  };

  // Google Login
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
          
          setAlertMessage("Google login successful! Redirecting...");
          setAlertSeverity("success");

          setTimeout(() => {
            navigate("/Home", { replace: true });
          }, 2000);
        } else {
          setAlertMessage("Error with Google login");
          setAlertSeverity("error");
        }
      })
      .catch((err) => {
        console.error("Error:", err);
        setAlertMessage("Error during Google login");
        setAlertSeverity("error");
      });
  };

  const handleGoogleLoginError = () => {
    console.error("Google Login failed.");
    setAlertMessage("Google Login failed. Please try again.");
    setAlertSeverity("error");
  };

  return (
    <div className="login-container">
      <Loginimagedata type="Login" />
      <div className="logo-box">
        <h3 id="website-name">MultiBooking Application</h3>
        <h4 id="quote">Unlock more Savings as a member</h4>

       
        {alertMessage && (
          <Alert severity={alertSeverity} style={{ marginBottom: "10px" }}>
            {alertMessage}
          </Alert>
        )}

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
