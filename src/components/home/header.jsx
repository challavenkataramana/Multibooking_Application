import React from 'react';
import { useNavigate } from 'react-router-dom';
export const Header = ({ handleLogout }) => {
    const navigate = useNavigate();
    const hotels = () => {
        navigate("/hotels");
    }
    return (
        <header className="header">
            <div className="app-name">Booking Portal</div>
            <nav className="nav-buttons">
                <button className="nav-button" onClick={hotels}>Hotels</button>
                <button className="nav-button">Sports Grounds</button>
                <button className="logout-button" onClick={handleLogout}>
                    Logout
                </button>
            </nav>
        </header>
    )
}