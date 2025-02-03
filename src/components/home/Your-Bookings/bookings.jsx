//
import React, { useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { Header } from "../header";
import { FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import "./booking.css";

export const YourBookings = ({ handleLogout }) => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const getUserIdFromToken = () => {
   
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      return decoded.id;
    }
    return null;
  };

  const fetchBookings = async () => {
    const userId = getUserIdFromToken();
    if (!userId) {
      setError("User not logged in!");
      setLoading(false);
      return;
    }

    try {
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbxXgM-cCIcub-eXQmN_bQG_jMTusq0s80-zMM4czmzTn49dWsh7xGVl3eEgg-RN51Ex/exec?userId=${userId}`
      );
      const data = await response.json();
      if (data.success) {
        setBookings(data.bookings);
      } else {
        setError(data.message || "Error fetching bookings");
      }
    } catch (error) {
      setError("Error fetching bookings");
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBookings();
  }, []);

  const handlesearchstays=()=>{
      navigate('/search-results');
  }

  return (
    <div className="bookingResults-container">
      <Header handleLogout={handleLogout} />
      <h3 id="your-booking-heading">Your Bookings</h3>
      <div className="booked-cards">
        <div className="bookings-page">
          {loading ? (
            <div>Loading...</div>
          ) : bookings.length > 0 ? (
            <div className="bookings-list">
              {bookings.map((result) => (
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
                        Excellent{" "}
                        <span className="booking-reviews">(20384 reviews)</span>
                      </div>
                    </div>
                    <div className="booking-dates">
                      <div className="booking-startDate">
                        {result.startDate}
                      </div>
                      <p>to</p>
                      <div className="booking-endDate">{result.endDate}</div>
                    </div>
                  </div>
                  <div className="booking-cta">
                    <span className="booking-price">₹{result.price}</span>
                    <button className="booking-invoice-btn">
                      View Invoice
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="no-bookings">
              {error
                ? error
                : "Explore stays and we’ll save them here so you can easily continue your search later."}
            </p>
          )}
        </div>
        <div className="your-booking-image">
            <div className="image-con">
                <img  src="https://mailmktg.makemytrip.com/images/htl-booking2-060123.png" alt="Visit Us again" />
            </div>
            <div >
                <button className="redirect-button" onClick={handlesearchstays}>
                    <b>Search Stays</b>
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};
