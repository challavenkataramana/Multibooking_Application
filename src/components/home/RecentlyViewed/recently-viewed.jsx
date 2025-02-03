import React, { useState, useEffect } from "react";
import { Header } from "../header";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


export const RecentlyViewed = ({ handleLogout }) => {
    const [recentHotels, setRecentHotels] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        
        const storedHotels = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
        setRecentHotels(storedHotels);
    }, []);

    const handlesearchstays = () => {
        navigate('/search-results');
    };

    return (
        <div className="bookingResults-container">
            <Header handleLogout={handleLogout} />
            <h3 id="your-booking-heading">Recently Viewed</h3>
            <div className="booked-cards">
                <div className="bookings-page">
                    {recentHotels.length > 0 ? (
                        <div className="bookings-list">
                            {recentHotels.map((result) => (
                                <div key={result.id} className="booking-card">
                                    <div className="booking-image">
                                        {result.imgSrc ? (
                                            <img src={result.imgSrc} alt={result.hallName} />
                                        ) : (
                                            <div className="fallback-image">No Image Available</div>
                                        )}
                                    </div>
                                    <div className="booking-details">
                                        <div className="booking-header">
                                            <h3>{result.hallName}</h3>
                                        </div>
                                        <div className="booking-stars">
                                            {Array.from({ length: Math.floor(5) }, (_, i) => (
                                                <span key={i}>&#9733;</span> // Unicode star
                                            ))}
                                            &nbsp;<b id="booking-classify-type">Hotel</b>
                                        </div>
                                        <div className="booking-feature-item">
                                            <FaMapMarkerAlt className="booking-feature-icon" />
                                            <span className="booking-feature-text">
                                                {result.location}
                                            </span>
                                        </div>
                                        <div className="booking-rating">
                                            <div className="booking-rating-score">9.0</div>
                                            <div className="booking-rating-text">
                                                Excellent <span className="booking-reviews">(20384 reviews)</span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="booking-cta">
                                        <span className="booking-price">₹{result.price}</span>
                                        <button className="booking-invoice-btn">
                                             Search Stays
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p className="no-bookings">
                            Explore stays and we’ll save them here so you can easily continue your search later.
                        </p>
                    )}
                </div>
                <div className="your-booking-image">
                    <div className="image-con">
                        <img src="https://mailmktg.makemytrip.com/images/htl-booking2-060123.png" alt="Visit Us again" />
                    </div>
                </div>
            </div>
        </div>
    );
};
