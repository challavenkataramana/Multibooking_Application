import React from 'react';
import {Logout} from './Logout/logout';
export const Header = ({ handleLogout }) => {
    return (
        <header className="header">
            <div className="app-name">Booking Portal</div>
            <nav className="nav-buttons">
                <Logout handleLogout={handleLogout} />    
            </nav>
        </header>
    )
}