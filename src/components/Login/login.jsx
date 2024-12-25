import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import google_icon from './google.png';
import application_logo from "./application-logo.png"
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import './login.css';

export const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            navigate('/home', { replace: true });
        }
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            if (response.ok) {
                localStorage.setItem('token', data.token);
                alert('Login successful! Redirecting to Home Page...');
                navigate('/Home', { replace: true });
            } else {
                alert(`Error: ${data.error}`);
            }
        } catch (error) {
            console.error(error);
            alert('Error during login');
        }
    };

    const handleGoogleLoginSuccess = (credentialResponse) => {
        const decoded = jwtDecode(credentialResponse.credential);
        console.log("Decoded Google Token:", decoded);

        // Send Google login info to backend
        fetch('http://localhost:3000/auth/google-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                email: decoded.email,
                name: decoded.name
            })
        }).then(response => response.json())
            .then(data => {
                if (data.token) {
                    localStorage.setItem('token', data.token);
                    navigate('/Home', { replace: true });
                } else {
                    alert('Error with Google login');
                }
            })
            .catch(err => {
                console.error('Error:', err);
                alert('Error during Google login');
            });
    };

    const handleGoogleLoginError = () => {
        console.error("Google Login failed.");
        alert("Google Login failed. Please try again.");
    };

    return (
        <div className="login-container">
            <div className="logo-box">
                <img className="application-logo" src={application_logo} alt="application-logo" ></img>
                <h2>Sign in to Application</h2>
                <button className="google-login-button">
                    <GoogleLogin
                        className="google-login-btn"
                        onSuccess={handleGoogleLoginSuccess}
                        onError={handleGoogleLoginError}
                    />
                </button>
                <hr></hr>
                <span>Or</span>

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
                    <button id="submit" type="submit">Login</button>
                    <p>Don't Have an account?<button id="sign-up" type="button" onClick={() => navigate('/register')}>Sign Up</button></p>

                </form>

            </div>
        </div>
    );
};
