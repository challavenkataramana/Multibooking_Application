import React from 'react';
import { FaMapMarkerAlt, FaDollarSign, FaUsers, FaHotel } from 'react-icons/fa';  // Importing icons

export const HotelFeatures = ({ description, location, price, capacity }) => {
    return (
        <div className="features-box">
            <div className="features-header">
                <h3 className="features-title">Hotel Features</h3>
            </div>
            <div className="features-content">
                <div className="feature-item">
                    <FaMapMarkerAlt className="feature-icon" />
                    <span className="feature-text">{location}</span>
                </div>

                <div className="feature-item">
                    <FaDollarSign className="feature-icon" />
                    <span className="feature-text">₹ {price} / day</span>
                </div>

                <div className="feature-item">
                    <FaUsers className="feature-icon" />
                    <span className="feature-text">Capacity: {capacity} people</span>
                </div>

                <div className="feature-item">
                    <FaHotel className="feature-icon" />
                    <span className="feature-text">{description}</span>
                </div>
            </div>

            <div className="price-note">
                <p>Note: The price is per day.</p>
            </div>
        </div>
    );
};
