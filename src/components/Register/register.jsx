import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";
import application_logo from "./application-logo.png";
import './register.css';

export const Register = (props) => {
    const [name, setName] = useState('');
    const [phone_number, setPhonenumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:3000/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    name,
                    phone_number,
                    email,
                    password,
                }),
            });

            const data = await response.json();
            if (response.ok) {
                alert("Registration Successful! Please log in.");
                navigate('/login');
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
        <>
            <div className="login-container">
                <div className="logo-box">
                  
                    <h2>Register Here</h2>
                    <button className="google-login-button">
                        <GoogleLogin
                            className="google-login-btn"
                            onSuccess={handleGoogleLoginSuccess}
                            onError={handleGoogleLoginError}
                        />
                    </button>
                    <hr></hr>
                    <span>Or</span>

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
                            value={phone_number}
                            onChange={(e) => setPhonenumber(e.target.value)}
                            type="tel"
                            placeholder="Enter Your Contact Number..."
                            id="phone_number"
                            name="phone_number"
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
                        <button id="submit" type="submit">Register</button>
                        <p>Have an account? <button id="sign-in" type="button" onClick={() => navigate('/login')}>Sign In</button></p>
                    </form>
                </div>
            </div>
        </>
    );
};




/*
 <h1>User Registration</h1>
            <form id="registerForm" onSubmit={handleSubmit}>
                <GoogleLogin
                    className="google-container"
                    onSuccess={handleGoogleLoginSuccess}
                    onError={handleGoogleLoginError}
                />

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
                    value={phone_number}
                    onChange={(e) => setPhonenumber(e.target.value)}
                    type="tel"
                    placeholder="Enter Your Contact Number..."
                    id="phone_number"
                    name="phone_number"
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
                <button id="submit" type="submit">Register</button>
                <p>Have an account? <button id="sign-in" type="button" onClick={() => navigate('/login')}>Sign In</button></p>
            </form>*/