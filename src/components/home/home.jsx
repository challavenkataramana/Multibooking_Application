import React, { useState } from "react";
import "./home.css";
import { Banglore } from './Top_rated-hotels/banglore';
import { Hyderabad } from './Top_rated-hotels/hyderabad';
import { Mumbai } from './Top_rated-hotels/mumbai';
import Footer from './footer';
import { Datepick } from './dates';
import { Cards } from './cards.jsx';

export const Home = ({ handleLogout }) => {

  const [currentTab, setCurrentTab] = useState("banglore");


  const handleSubmit = (city) => {
    setCurrentTab(city);
  }

  return (
    <div className="home-container">
      {/* Header Section */}
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

      <div className="intro">
        <h2>Save up to 55% on your next hotel stay</h2>
        <p>We compare hotel prices from over 100 sites</p>
      </div>
      <section className="search-section">
        <Datepick />
      </section>

      <section className="providers-section">
        <div className="provider-logos">
          <img width="60" height="16" src="https://imgcy.trivago.com/image/upload/hardcodedimages/mpm-localised-logos-dark/395.png" alt="Agoda" />
          <img width="100" height="16" src="https://imgcy.trivago.com/image/upload/hardcodedimages/mpm-localised-logos-dark/3340.png" alt="Hotels.com" />
          <img width="60" height="16" src="https://imgcy.trivago.com/image/upload/hardcodedimages/mpm-localised-logos-dark/14.png" alt="booking.com" />
          <img width="100" height="16" src="https://imgcy.trivago.com/image/upload/hardcodedimages/mpm-localised-logos-dark/626.png" alt="make-life.com" />
          <img width="100" height="16" src="https://imgcy.trivago.com/image/upload/hardcodedimages/mpm-localised-logos-dark/2192.png" alt="MakeMyTrip" />
          <img width="60" height="16" src="https://imgcy.trivago.com/image/upload/hardcodedimages/mpm-localised-logos-dark/2452.png" alt="OYO" />
          <img width="70" height="16" src="https://imgcy.trivago.com/image/upload/hardcodedimages/mpm-localised-logos-dark/634.png" alt="Trip.com" />

        </div>
      </section>
      <h2 className="hot-deals">Hot deals right now</h2>
      <section className="carousel-section">
        <Cards />
      </section>

      <section className="top-hotels">
        <h2>Have a look at these top-rated hotels</h2>
        <div className="cities-tabs">
          <button className={`city-tab ${currentTab === "banglore" ? "active" : ""}`} onClick={() => { handleSubmit("banglore") }}>Banglore</button>
          <button className={`city-tab ${currentTab === "hyderabad" ? "active" : ""}`} onClick={() => { handleSubmit("hyderabad") }}>Hyderabad</button>
          <button className={`city-tab ${currentTab === "mumbai" ? "active" : ""}`} onClick={() => { handleSubmit("mumbai") }}>Mumbai</button>
        </div>
        <div className="selected-cities">
          {currentTab === "mumbai" && <Mumbai />}
          {currentTab === "banglore" && <Banglore />}
          {currentTab === "hyderabad" && <Hyderabad />}
        </div>
      </section>
      <Footer />  {/* Footer Section */}
    </div>
  );
};
