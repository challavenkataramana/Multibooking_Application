import React from 'react';
import {Logout} from './Logout/logout';
import { useNavigate } from "react-router-dom";

export const Header = ({ handleLogout }) => {
    
     const navigate = useNavigate();
    const handleroute=()=>{
        navigate("/Home");
    }
    return (
        <header className="header">
            <div className="app-name" onClick={handleroute}>Booking Portal</div>
            <nav className="nav-buttons">
                <Logout handleLogout={handleLogout} />    
            </nav>
        </header>
    )
}