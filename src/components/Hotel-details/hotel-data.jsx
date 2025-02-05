import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import Footer from "../home/footer";
import { HotelFeatures } from "./Hotel-features-box";
import { useHotelData } from "./Hall-Images-data";
import { jwtDecode } from "jwt-decode";
import { Header } from "../home/header";
import "./hotel-data.css";

export const HotelData = ({ handleLogout }) => {
  const location = useLocation();
  const { hotel, hallType, startDate, endDate } = location.state || {};
  console.log("startDate", startDate);
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  // const [message, setMessage] = useState("");
  const { additionalImages, loading } = useHotelData(hotel.id, hallType);

  const [isProcessing, setIsProcessing] = useState(false);
  const [isBooked, setIsBooked] = useState(false);

  const sheetName =
    hallType === "Function-Halls"
      ? "functionHalls"
      : hallType === "Banquet-Halls"
      ? "banquetHalls"
      : hallType === "Resorts"
      ? "resorts"
      : hallType === "Cricket-Grounds"
      ? "cricketGrounds"
      : hallType === "Conference-Halls"
      ? "conferenceHalls"
      : "";

  const sheetName2 =
    hallType === "Function-Halls"
      ? "functionHall"
      : hallType === "Banquet-Halls"
      ? "banquetHall"
      : hallType === "Resorts"
      ? "resort"
      : hallType === "Cricket-Grounds"
      ? "cricketGround"
      : hallType === "Conference-Halls"
      ? "conferenceHall"
      : "";

  const token = localStorage.getItem("token");
  let userId = null;
  if (token) {
    const decoded = jwtDecode(token);
    userId = decoded.id;
  }
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!customerName || !customerEmail) {
      setMessage("Please fill in all the required fields.");
      return;
    }

    setIsProcessing(true);

    const bookingDetails = {
      userId: userId,
      hotelId: hotel.id,
      hotelName: hotel.title,
      startDate: startDate,
      endDate: endDate,
      customerName,
      customerEmail,
      price: hotel.price,
      location: hotel.location,
      capacity: hotel.capacity,
      imgSrc: hotel.imgSrc,
    };

    try {
      const response = await fetch(
        `https://api.sheety.co/f66a20c2cec36c5c18f352bc96c9a03c/bookingHalls/${sheetName}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ [sheetName2]: bookingDetails }),
        }
      );

      if (response.ok) {
        setIsBooked(true); 
      } else {
        const errorData = await response.json();
        setMessage(`Booking failed: ${errorData.error || "Unknown error"}`);
      }

      const googleScriptUrl = new URL(
        "https://script.google.com/macros/s/AKfycbw1EJ3oISV6pzY5ufZ0ZT3XvqiJlSpjkjHRH6OWJdGM9NZYY1Ir0jONnrooItXm49W4/exec"
      );

      googleScriptUrl.searchParams.append("hallName", hotel.title);
      googleScriptUrl.searchParams.append("startDate", startDate);
      googleScriptUrl.searchParams.append("endDate", endDate);
      googleScriptUrl.searchParams.append("userName", customerName);
      googleScriptUrl.searchParams.append("userEmail", customerEmail);

      await fetch(googleScriptUrl, { method: "GET" });
    } catch (error) {
      console.log("An error occurred. Please try again.");
      console.log(error);
    } finally {
      setIsProcessing(false);
    }
  };

  if (!hotel) return <p>Hotel information is missing.</p>;

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className="hotel-container">
      <Header handleLogout={handleLogout} />
      <h2 className="hotel-title">{hotel.title}</h2>
      <div className="hotel-images">
        <div className="image-group">
          <div className="hotel-main-image">
            <img
              className="main-image"
              src={hotel.imgSrc}
              alt={`Main ${hotel.title}`}
            />
          </div>
        </div>
        <div className="additional-images-container">
          <div className="additional-images">
            {additionalImages.length > 0 ? (
              additionalImages.map((image, index) => (
                <img
                  className="child-images"
                  key={index}
                  src={image}
                  alt={`${hotel.title} ${index + 1}`}
                />
              ))
            ) : (
              <p>No additional Images</p>
            )}
          </div>
        </div>
      </div>

      <div className="content-row">
        <HotelFeatures
          price={hotel.price}
          location={hotel.location}
          description={hotel.description}
          capacity={hotel.capacity}
        />
        <div className="booking-form-container">
          <form className="booking-form" onSubmit={handleSubmit}>
            <h3>Book your Destination</h3>
            <div className="form-group">
              <p id="place-holder-label">Name:</p>
              <input
                type="text"
                className="search-input-field"
                placeholder="Your Name"
                value={customerName}
                onChange={(e) => setCustomerName(e.target.value)}
              />
            </div>
            <div className="form-group">
              <p id="place-holder-label">Email:</p>
              <input
                type="email"
                className="search-input-field"
                placeholder="Your Email"
                value={customerEmail}
                onChange={(e) => setCustomerEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="book-button"
              disabled={isProcessing || isBooked}
            >
              {isProcessing
                ? "Processing..."
                : isBooked
                ? "Booking Successful!"
                : "Book"}
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};
