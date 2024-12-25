import React, { useEffect, useState } from "react";
import { localCardData } from './Top_rated-hotels/hot-deals';
import {useNavigate} from "react-router-dom";

export const Cards = ({ handleLogout }) => {

    const [cardData, setCardData] = useState(localCardData);
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate=useNavigate();

    const fetchCardData = async () => {
        try {
            const imageResponse = await fetch(
                "https://script.google.com/macros/s/AKfycbzsUZhlA-4ZbOJMp6n2qSZHrcA_s31ZGpIG-R0DAouC4z7HEPoWlyZXnvCXnHkW5lUw/exec"
            );
            const imageData = await imageResponse.json();
            const combinedData = localCardData.map((localCard) => {
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


    const prevSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex === 0 ? cardData.length - 3 : prevIndex - 3
        );
    };

    const nextSlide = () => {
        setCurrentIndex((prevIndex) =>
            prevIndex + 3 >= cardData.length ? 0 : prevIndex + 3
        );
    };

    const handlecheckdeals=(id)=>{
        navigate(`/hotel-details/${id}`);
    }

    return (
        <div className="carousel">
            <button className="prev" onClick={prevSlide}>❮</button>
            <div className="carousel-cards">
                {cardData.slice(currentIndex, currentIndex + 3).map((card) => (
                    <div className="carousel-card" key={card.id}>
                        {card.imgSrc ? (<img src={card.imgSrc} alt={card.title} />
                        ) : (<div className="placeholder-image"></div>)}
                        <h3>{card.title}</h3>
                        <p>{card.description}</p>
                        <p>{card.price}</p><span><p>goa</p></span>
                        <button className="check-deals-button" onClick={()=>handlecheckdeals(card.id)}>Check Deals</button>
                    </div>
                ))}
            </div>
            <button className="next" onClick={nextSlide}>❯</button>
        </div>
    );
};
