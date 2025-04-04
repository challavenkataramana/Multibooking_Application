import React, { useState } from "react";
import "./home.css";
import { CardData } from './Top_rated-hotels/trending-hotels_data.jsx';
import Footer from './footer';
import { Datepick } from './dates';
import { Cards } from './cards.jsx';
import { useNavigate } from "react-router-dom";
import { Header } from './header';

export const Home = ({ handleLogout }) => {

  const [currentTab, setCurrentTab] = useState("banglore");

  const [datesData, setDatesData] = useState({
    startDate: new Date().toISOString().split("T")[0], 
    endDate: new Date(new Date().setDate(new Date().getDate() + 1))
      .toISOString()
      .split("T")[0], 
  });
  const navigate = useNavigate();
  
  const handleSubmit = (city) => {
    setCurrentTab(city);
  }

  const handleSearch = (searchData) => {
    const { destination, startDate, endDate, hallType } = searchData;
    console.log("home page",searchData);
    navigate(`/search-results`, {
      state: {
        destination,
        startDate,
        endDate,
        hallType,
      },
    });
  };


  const handletrendingdata=(hotel)=>{
    const hallType="Trending-Hotels";
    navigate(`/search-results`, {
      state: {
        destination:hotel.location,
        startDate:datesData.startDate,
        endDate:datesData.endDate,
        hallType,
        hotelId:hotel.id,
      },
    });
  }

  const handlehotdealsdata=(hotel)=>{
    const hallType="Hot-Deals";
    navigate(`/search-results`, {
      state: {
        destination:hotel.location,
        startDate:datesData.startDate,
        endDate:datesData.endDate,
        hallType,
        hotelId:hotel.id,
      },
    });
  }

  return (
    <div className="home-container">
      {/* Header Section */}
      <Header handleLogout={handleLogout} />

      <div className="intro">
        <h2>Save up to 55% on your next hotel stay</h2>
        <p>We compare hotel prices from over 100 sites</p>
      </div>
      <section className="search-section">
        <Datepick handleSearch={handleSearch} searchData={{}}  />
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
           <Cards handledata={handlehotdealsdata} />
      </section>

      <section className="top-hotels">
        <h2>Have a look at these top-rated hotels</h2>
        <div className="cities-tabs">
          <button className={`city-tab ${currentTab === "banglore" ? "active" : ""}`} onClick={() => { handleSubmit("banglore") }}>Banglore</button>
          <button className={`city-tab ${currentTab === "hyderabad" ? "active" : ""}`} onClick={() => { handleSubmit("hyderabad") }}>Hyderabad</button>
          <button className={`city-tab ${currentTab === "mumbai" ? "active" : ""}`} onClick={() => { handleSubmit("mumbai") }}>Mumbai</button>
        </div>
        <div className="selected-cities">
          {/* {currentTab === "mumbai" && <Mumbai />}
          {currentTab === "banglore" && <Banglore />}
          {currentTab === "hyderabad" && <Hyderabad />} */}
            <CardData handledata={handletrendingdata} city={currentTab} />
        </div>
      </section>
      <Footer />  {/* Footer Section */}
    </div>
  );
};
