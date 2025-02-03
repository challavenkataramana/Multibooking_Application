import React from 'react';
import { useNavigate } from 'react-router-dom';
import {Logout} from './Logout/logout';
export const Header = ({ handleLogout }) => {
    // const navigate = useNavigate();
    // const hotels = () => {
    //     navigate("/hotels");
    // }
    // const sportsGrounds = () => {
    //     navigate("/sports-ground");
    // }

    return (
        <header className="header">
            <div className="app-name">Booking Portal</div>
            <nav className="nav-buttons">
                {/* <button className="nav-button" onClick={hotels}>Hotels</button>
                <button className="nav-button" onClick={sportsGrounds}>Sports Grounds</button> */}
                <Logout handleLogout={handleLogout} />    
            </nav>
        </header>
    )
}