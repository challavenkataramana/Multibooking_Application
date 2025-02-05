import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './SearchResults.css';
import { Header } from '../home/header';
import { Datepick } from '../home/dates';
import { FaMapMarkerAlt } from 'react-icons/fa';
import Filter from '../Hotels-Page/filter-page';
import MapComponent from "./destination_map";
import Footer from '../home/footer';

const SearchResults = ({ handleLogout }) => {
    const location = useLocation();
    const { destination, startDate, endDate, hallType } = location.state || {};
    const [results, setResults] = useState([]);
    const [filteredResults, setFilteredResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchData, setSearchData] = useState({ destination, startDate, endDate, hallType });
    const navigate = useNavigate();
    
    if(!destination && !startDate & !endDate && !hallType)  console.log("hi",searchData);
    

    const sheetName = hallType === "Function-Halls" ? "functionHalls" :
        hallType === "Banquet-Halls" ? "banquetHalls" :
            hallType === "Resorts" ? "resorts" :
                hallType === "Cricket-Grounds" ? "cricketGrounds" :
                    hallType === "Conference-Halls" ? "conferenceHalls" : "";

    useEffect(() => {
        if (destination && hallType) {
            fetchData();
        }
    }, [destination, hallType]);

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch(`https://script.google.com/macros/s/AKfycbwiILpaFDVM7aO__6iOrdYtMTsrlzbM_Fd7oCzoiNsT6sDowEzKkR_AujD3sAkz9Oc/exec?sheet=${hallType}`);
            const data = await response.json();
            const filteredHotels = data.filter(item => item.location === destination);

            const bookingResponse = await fetch(`https://api.sheety.co/f66a20c2cec36c5c18f352bc96c9a03c/bookingHalls/${sheetName}`);
            const bookings = await bookingResponse.json();
            const availableHotels = filteredHotels.filter(hotel =>
                isHotelAvailable(hotel, bookings[sheetName], startDate, endDate)
            );

            setResults(availableHotels);
            setFilteredResults(availableHotels);

        } catch (error) {
            console.error("Error fetching data:", error);
        }
        setLoading(false);
    };

    const isHotelAvailable = (hotel, bookings, startDate, endDate) => {
        const hotelBookings = bookings.filter(
            booking => String(booking.hotelId) === String(hotel.id)
        );
        return !hotelBookings.some(booking =>
            datesOverlap(booking.startDate, booking.endDate, startDate, endDate)
        );
    };

    const datesOverlap = (bookedStart, bookedEnd, selectedStart, selectedEnd) => {
        const bookedStartDate = new Date(bookedStart);
        const bookedEndDate = new Date(bookedEnd);
        const selectedStartDate = new Date(selectedStart);
        const selectedEndDate = new Date(selectedEnd);

        return (
            (selectedStartDate >= bookedStartDate && selectedStartDate <= bookedEndDate) ||
            (selectedEndDate >= bookedStartDate && selectedEndDate <= bookedEndDate) ||
            (bookedStartDate >= selectedStartDate && bookedStartDate <= selectedEndDate)
        );
    };

    const handleSearch = (searchData) => {
        navigate(`/search-results`, { state: { ...searchData } });
    };

    const handleApplyFilter = ({ priceRange, capacityRange }) => {
        const filtered = results.filter(result =>
            result.price >= priceRange[0] &&
            result.price <= priceRange[1] &&
            result.capacity >= capacityRange[0] &&
            result.capacity <= capacityRange[1]
        );
        setFilteredResults(filtered);
    };

    const handleCheckDeals = (hotel) => {
        let recentHotels = JSON.parse(localStorage.getItem("recentlyViewed")) || [];
        recentHotels = recentHotels.filter(item => item.id !== hotel.id);        
        recentHotels.unshift(hotel);
        if (recentHotels.length > 5) {
            recentHotels.pop();
        }
        localStorage.setItem("recentlyViewed", JSON.stringify(recentHotels));
        navigate(`/hotel-details`, { state: { hotel, hallType, startDate, endDate } });
    };

    return (
        <div className="SearchResults-container">
            <Header handleLogout={handleLogout} />
            <section className="search-section1">
                <Datepick handleSearch={handleSearch} searchData={searchData} />
            </section>
            <div className="search-header">
                <div className="search-header-content">
                    {console.log("searchData", hallType)}
                    <Filter onApplyFilter={handleApplyFilter} halltype={hallType}/>
                    <p className="result-location">Searched Results for {hallType} in <b>{destination}</b></p>
                </div>
            </div>
            <div className="matched-cards">
                <div className="results-page">
                    {loading ? (
                       <div style={{width:"500x"}}>Loading...</div>
                    ) : results.length > 0 ? (
                        <div className="results-list">
                            {filteredResults.map(result => (
                                <div key={result.id} className="result-card">
                                    <div className="result-image">
                                        <img src={result.imgSrc} alt={result.title} />
                                    </div>
                                    <div className="result-details">
                                        <div className="result-header">
                                            <h3>{result.title}</h3>
                                        </div>
                                        <div className="stars">
                                            {Array.from({ length: Math.floor(5) }, (_, i) => (
                                                <span key={i}>&#9733;</span> // Unicode star
                                            ))}
                                            &nbsp;<b id="classity-type">Hotel</b>
                                        </div>

                                        <p className="result-description">{result.description}</p>
                                        <div className="feature-item">
                                            <FaMapMarkerAlt className="feature-icon" />
                                            <span className="feature-text">{result.location}</span>
                                        </div>
                                        <div className="result-rating">
                                            <div className="rating-score">9.0</div>
                                            <div className="rating-text">
                                                Excellent <span className="reviews">(20384 reviews)</span>
                                            </div>
                                        </div>

                                    </div>
                                    <div className="result-cta">
                                        <span className="result-price">₹{result.price}</span>
                                        <button
                                            className="check-deals-btn"
                                            onClick={() => handleCheckDeals(result)}
                                        >
                                            Book Now
                                        </button>

                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <p>No results found or all hotels are booked for the selected dates.</p>
                    )}
                </div>
                <div className="city-map">
                    <MapComponent destination={destination} />
                </div>

            </div>
            <Footer />
        </div>
    );
};

export default SearchResults;
