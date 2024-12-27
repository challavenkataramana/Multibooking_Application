import React, { useEffect, useState } from "react";
import { CardData } from "./hotel-data";
import { useNavigate } from "react-router-dom";
import "./hotel.css";
import { Header } from '../home/header';
import  BanquetHalls  from './Banquet-halls';
import  FunctionHalls from './function-halls';
import  ConferenceHalls from './conference-centers';
import Resorts from './resorts';
import Footer from '../home/footer';

const Hotels = ({ handleLogout }) => {
  const [cardData, setCardData] = useState(CardData);
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const fetchCardData = async () => {
    try {
      const imageResponse = await fetch(
        "https://script.google.com/macros/s/AKfycbzsUZhlA-4ZbOJMp6n2qSZHrcA_s31ZGpIG-R0DAouC4z7HEPoWlyZXnvCXnHkW5lUw/exec"
      );
      const imageData = await imageResponse.json();
      const combinedData = CardData.map((localCard) => {
        const image = imageData.find((item) => item.id === localCard.id);
        return {
          ...localCard,
          imgSrc: image ? image.imgSrc : "",
        };
      });
      setCardData(combinedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCardData();
  }, []);

  const handlecheckdeals = (id) => {
    navigate(`/hotel-details/${id}`);
  }
  return (

    <div className="hotel-container">
      <Header handleLogout={handleLogout} />
      <h2 className="hotel-group-color">Function Halls</h2>
      <Resorts handlecheckdeals={handlecheckdeals} />
      <h2 className="hotel-group-color">Banquet Halls</h2>
      <FunctionHalls handlecheckdeals={handlecheckdeals} />
      <h2 className="hotel-group-color">Conference Halls</h2>
      <BanquetHalls handlecheckdeals={handlecheckdeals} />
      <h2 className="hotel-group-color">Resorts</h2>
      <ConferenceHalls handlecheckdeals={handlecheckdeals} />
      <Footer />
    </div>
  );
};

export default Hotels;


