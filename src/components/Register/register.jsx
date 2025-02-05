import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin,useGoogleLogin } from "@react-oauth/google";
import { FaGoogle } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";
import { Loginimagedata } from "../Login/image";

import "./register.css";

export const Register = (props) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("https://multibooking-application.onrender.com/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        alert("Registration Successful! Please log in.");
        navigate("/login");
      } else {
        alert("Registration Failed: " + data.error);
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred during registration.");
    }
  };

  const handleGoogleLoginSuccess = (credentialResponse) => {
    const decoded = jwtDecode(credentialResponse.credential);
    console.log("Decoded Google Token:", decoded);

    fetch("https://multibooking-application.onrender.com/auth/google-login", {
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
  //   onSuccess: handleGoogleLoginSuccess,
  //   onError: handleGoogleLoginError,
  // });

  return (
    <>
      <div className="register-container">
        <Loginimagedata type="Register" />
        <div className="register-box">
          <h3 id="website-name">MultiBooking Application</h3>
          <h4 id="quote">Unlock more Savings as a member</h4>
          {/* <button onClick={() => googleLogin()} id="google-login-btn">
            <FaGoogle className="google-icon" />
            Sign up with Google
          </button> */}
           <GoogleLogin
                        className="google-login-btn"
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginError}
                    />

          <div className="or-continue">
            <hr />
            <span>or continue</span>
            <hr />
          </div>

          <form id="registrationForm" onSubmit={handleSubmit}>
            <input
              value={name}
              onChange={(e) => setName(e.target.value)}
              type="text"
              placeholder="Enter Your Name.."
              id="name"
              name="name"
              required
            />
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type="email"
              placeholder="youremail@gmail.com"
              id="email"
              name="email"
              required
            />
            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type="password"
              placeholder="Your password"
              id="password"
              name="password"
              required
            />
            <button id="submit" type="submit">
              Register
            </button>
            <div className="login-route">
              Have an account?
              <button
                id="sign-in"
                type="button"
                onClick={() => navigate("/login")}
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};
