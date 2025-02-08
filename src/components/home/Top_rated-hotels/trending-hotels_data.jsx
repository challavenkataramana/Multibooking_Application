// import React, { useEffect, useState } from "react";

// export const CardData = ({handledata,city}) => {
//   const [cardData, setCardData] = useState([]);
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const fetchCardData = async () => {
//     try {
//       const response = await fetch(
//          `https://script.google.com/macros/s/AKfycbwIyAU4fS1WxxZ1ZjqPBhCeTLlp-mRbvO499E0Tw42zjSVYdOIJHiClYx4GJn42FjT_/exec?sheet=Trending-Hotels`
//       );
//       const data = await response.json();
//       const filteredData = data.filter((hotel) => hotel.location.toLowerCase() === city.toLowerCase());
//       setCardData(filteredData);
//     } catch (error) {
//       console.error("Error fetching data:", error);
//     }
//   };

//   useEffect(() => {
//     fetchCardData();
//   }, [city]); 
  
//   const handleCardClick = (hotel) => {
//     handledata(hotel);  
//   };

//   const prevSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex === 0 ? cardData.length - 3 : prevIndex - 3
//     );
//   };

//   const nextSlide = () => {
//     setCurrentIndex((prevIndex) =>
//       prevIndex + 3 >= cardData.length ? 0 : prevIndex + 3
//     );
//   };

//   return (
//     <div className="home-container">
//       <section className="carousel-section">
//         <div className="carousel">
//           <button className="prev" onClick={prevSlide}>❮</button>
//           <div className="carousel-cards">
//             {cardData.slice(currentIndex, currentIndex + 3).map((card) => (
//               <div className="carousel-card" key={card.id}>
//                 {card.imgSrc ? (
//                   <img src={card.imgSrc} alt={card.title} />
//                 ) : (
//                   <div  className="placeholder-image"></div>
//                 )}
//                 <h3>{card.title}</h3>
//                 <p>{card.description}</p>
//                 <p>{card.price}</p><span><p>goa</p></span>
//                 <button className="check-deals-button" onClick={() => handleCardClick(card)}>Check Deals</button>
//               </div>
//             ))}
//           </div>
//           <button className="next" onClick={nextSlide}>❯</button>
//         </div>
//       </section>
//     </div>
//   );
// };








import React, { useEffect, useState } from "react";

export const CardData = ({ handledata, city }) => {
  const [cardData, setCardData] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const fetchCardData = async () => {
    try {
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbwxIPMvGlhG92GR36zg7oqkePH_8FToWeLDtjjhZdwLQvKHw_Ib4ZUPtxxu5Ue_1qcU/exec?sheet=Trending-Hotels`
      );
      const data = await response.json();
      const filteredData = data.filter(
        (hotel) => hotel.location.toLowerCase() === city.toLowerCase()
      );
      setCardData(filteredData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchCardData();
  }, [city]);

  const handleCardClick = (hotel) => {
   
    handledata(hotel);
  };

  const prevSlide = () => {
    if (!isMobile) {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? cardData.length - 3 : prevIndex - 3
      );
    }
  };

  const nextSlide = () => {
    if (!isMobile) {
      setCurrentIndex((prevIndex) =>
        prevIndex + 3 >= cardData.length ? 0 : prevIndex + 3
      );
    }
  };

  return (
    <div className="home-container">
      <section className="carousel-section">
        <div className="carousel">
          {!isMobile && (
            <button className="prev" onClick={prevSlide}>
              ❮
            </button>
          )}
          <div className={`carousel-cards ${isMobile ? "mobile-scroll" : ""}`}>
            {isMobile
              ? cardData.map((card) => (
                  <div className="carousel-card" key={card.id}>
                    {card.imgSrc ? (
                      <img src={card.imgSrc} alt={card.title} />
                    ) : (
                      <div className="placeholder-image"></div>
                    )}
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <p>{card.price}</p>
                    <button
                      className="check-deals-button"
                      onClick={() => handleCardClick(card)}
                    >
                      Check Deals
                    </button>
                  </div>
                ))
              : cardData
                  .slice(currentIndex, currentIndex + 3)
                  .map((card) => (
                    <div className="carousel-card" key={card.id}>
                      {card.imgSrc ? (
                        <img src={card.imgSrc} alt={card.title} />
                      ) : (
                        <div className="placeholder-image"></div>
                      )}
                      <h3>{card.title}</h3>
                      <p>{card.description}</p>
                      <p>{card.price}</p>
                      <button
                        className="check-deals-button"
                        onClick={() => handleCardClick(card)}
                      >
                        Check Deals
                      </button>
                    </div>
                  ))}
          </div>
          {!isMobile && (
            <button className="next" onClick={nextSlide}>
              ❯
            </button>
          )}
        </div>
      </section>
    </div>
  );
};
