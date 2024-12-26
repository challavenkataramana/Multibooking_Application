import React, { useState, useEffect } from "react";
import './App.css';
import { Login } from "./components/Login/login";
import { Register } from "./components/Register/register";
import { Home } from "./components/home/home";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { HotelData } from './components/Hotel-details/hotel-data';
import Hotels from './components/Hotels/hotels';
import {PrivateRoute} from './components/privatecomponent';

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsAuthenticated(!!token);
  }, [location]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <div className="App">
      <Routes>
        <Route
          path="/home"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Home handleLogout={handleLogout} />
            </PrivateRoute>
          }
        />
        <Route
          path="/hotel-details/:id"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <HotelData handleLogout={handleLogout} />
            </PrivateRoute>
          }
        /> 
        <Route
          path="/hotels"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <Hotels handleLogout={handleLogout}/>
            </PrivateRoute>
          }
        /> 

        <Route
          path="/Login"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <Login />}
        />
        <Route
          path="/Register"
          element={isAuthenticated ? <Navigate to="/home" replace /> : <Register />}
        />

        <Route
          path="*"
          element={<Navigate to={isAuthenticated ? "/home" : "/Login"} replace />}
        />
      </Routes>
    </div>
  );
}

export default App;


