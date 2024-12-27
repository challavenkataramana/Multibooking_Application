import React from "react";
import { useParams } from "react-router-dom";
import { useHotelData } from './useHoteldata';
import "./hotel-data.css";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';
import Footer from '../home/footer'
import "../home/footer.css";

export const HotelData = ({ handleLogout }) => {
    const { id } = useParams();
    const { hotelName, description, mainImage, additionalImages, loading } =
        useHotelData(id);
    if (loading) {
        return <p>Loading...</p>;
    }
    return (
        <div class="hotel-container">
            <header className="header">
                <div className="app-name">Booking Portal</div>
                <nav className="nav-buttons">
                    <button className="nav-button">Hotels</button>
                    <button className="nav-button">Sports Grounds</button>
                    <button className="logout-button" onClick={handleLogout}>
                        Logout
                    </button>
                </nav>
            </header>
            <h2 className="hotel-title">{hotelName}</h2>
            <div className="hotel-images">
                <div className="image-group">
                    {mainImage ? (
                        <div className="hotel-main-image">
                            <img class="main-image" src={mainImage} alt={`Main ${hotelName}`} />
                        </div>
                    ) : (
                        <p>No main image available.</p>
                    )}
                </div>
                <div className="additional-images-container">
                    <div className="additional-images">
                        {additionalImages.length > 0 ? (
                            additionalImages.map((image, index) => (
                                <img className="child-images"
                                    key={index}
                                    src={image}
                                    alt={`Additional ${hotelName} ${index + 1}`}
                                />
                            ))
                        ) : (
                            <p>No additional images available.</p>
                        )}
                    </div>
                </div>
            </div>
            <div className="content-row">
                <div className="box">
                    <div className="box-title">
                        Most Famous Features
                    </div>
                    <div className="box-content">
                        Non-Smoking Area
                    </div>
                </div>
                <div className="booking-form-container">
                    <form className="booking-form">
                        <div className="form-group">
                            <label htmlFor="checkin-date">Check-in Date:</label>
                            <input type="date" id="checkin-date" className="input-field" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="checkout-date">Check-out Date:</label>
                            <input type="date" id="checkout-date" className="input-field" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name:</label>
                            <input type="text" id="name" className="input-field" placeholder="Your Name" />
                        </div>
                        <div className="form-group">
                            <label htmlFor="email">Email:</label>
                            <input type="email" id="email" className="input-field" placeholder="Your Email" />
                        </div>
                        <div className="form-group">
                            <button type="submit" className="book-button">Book</button>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};











{/* <FontAwesomeIcon icon={faMapMarkerAlt} style={{ color: 'black', fontSize: '18px' }} />
            <span>Location</span></p> */}