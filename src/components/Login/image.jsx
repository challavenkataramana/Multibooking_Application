import React, { useState, useEffect } from "react";
import { FaTag, FaSearch, FaMobileAlt } from "react-icons/fa";

export const Loginimagedata = ({type}) => {
  const [loginImage, setLoginImage] = useState("");

  useEffect(() => {
    fetch(
      `https://script.google.com/macros/s/AKfycbzyzVpS-jJG8ahrHPmH9gABUvoJwNHLDaHRP27YKsLnebejOlbIpJ7Bq7BFIUY1d9X6xw/exec?type=${type}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.imgSrc) {
          setLoginImage(data.imgSrc);
        } else {
          console.error("Error:", data.error);
        }
      })
      .catch((error) => console.error("Error fetching login image:", error));
  }, [type]);

  return (
    <div className="login-image-container">
      {loginImage && (
        <img className="login-image" src={loginImage} alt={type} />
      )}
      <div className="login-benefits">
        <h4 id="login-text">Get Ready to:</h4>
        <p id="benefits">
          <FaTag className="benefit-icon" /> Unlock our member prices and
          loyalty deals
        </p>
        <p id="benefits">
          <FaSearch className="benefit-icon" /> Easily pick up your search again
          from any device
        </p>
        <p id="benefit-last">
          <FaMobileAlt className="benefit-icon" /> Save big with price alerts on
          our app
        </p>
      </div>
    </div>
  );
};
