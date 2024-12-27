import React, { useState, useEffect } from "react";
import { CardData } from "./hotel-data";

const BanquetHalls = ({ handlecheckdeals }) => {
    const [cardData, setCardData] = useState(CardData);
    const [currentIndex, setCurrentIndex] = useState(0);
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
    return (
        <section className="hotels-carousel-section">
            <div className="hotels-carousel">
                <button className="hotels-prev" onClick={prevSlide}>❮</button>
                <div className="hotels-carousel-cards">
                    {cardData.slice(currentIndex, currentIndex + 3).map((card) => (
                        <div className="hotels-carousel-card" key={card.id}>
                            {card.imgSrc ? (<img src={card.imgSrc} alt={card.title} />
                            ) : (<div className="hotels-placeholder-image"></div>)}
                            <h3>{card.title}</h3>
                            <p>{card.description}</p>
                            <p>{card.price}</p><span><p>goa</p></span>
                            <button className="hotels-check-deals-button" onClick={() => handlecheckdeals(card.id)}>Check Deals</button>
                        </div>
                    ))}
                </div>
                <button className="hotels-next" onClick={nextSlide}>❯</button>
            </div>
        </section>
    );
};
export default BanquetHalls;