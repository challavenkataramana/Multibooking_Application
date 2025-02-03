import React from 'react';
import { FaMapMarkerAlt, FaDollarSign, FaUsers, FaHotel } from 'react-icons/fa';  // Importing icons

export const HotelFeatures = ({ description, location, price, capacity }) => {
    return (
        <div className="features-box">
            <div className="features-header">
                <h3 className="features-title">Hotel Features</h3>
            </div>
            <div className="features-content">
                {/* Location Feature */}
                <div className="feature-item">
                    <FaMapMarkerAlt className="feature-icon" />
                    <span className="feature-text">{location}</span>
                </div>

                {/* Price Feature */}
                <div className="feature-item">
                    <FaDollarSign className="feature-icon" />
                    <span className="feature-text">₹ {price} / day</span>
                </div>

                {/* Capacity Feature */}
                <div className="feature-item">
                    <FaUsers className="feature-icon" />
                    <span className="feature-text">Capacity: {capacity} people</span>
                </div>

                {/* Description Feature */}
                <div className="feature-item">
                    <FaHotel className="feature-icon" />
                    <span className="feature-text">{description}</span>
                </div>
            </div>

            {/* Price Note */}
            <div className="price-note">
                <p>Note: The price is per day.</p>
            </div>
        </div>
    );
};
