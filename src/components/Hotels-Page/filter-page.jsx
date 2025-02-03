
import React, { useState, useEffect } from "react";
import "./hotel.css";

const Filter = ({ onApplyFilter, halltype }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [hallTypeRanges, setHallTypeRanges] = useState({});
  const [priceRange, setPriceRange] = useState([0, 0]);
  const [capacityRange, setCapacityRange] = useState([0, 0]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHallTypes();
  }, []);

  const fetchHallTypes = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbwiILpaFDVM7aO__6iOrdYtMTsrlzbM_Fd7oCzoiNsT6sDowEzKkR_AujD3sAkz9Oc/exec`
      );
      const data = await response.json();
      setHallTypeRanges(data);
      console.log("Hall Data:", data);
    } catch (error) {
      console.error("Error fetching hall data:", error);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (hallTypeRanges[halltype]) {
      const ranges = hallTypeRanges[halltype];
      setPriceRange([...ranges.price]);
      setCapacityRange([...ranges.capacity]);
    }
  }, [halltype, hallTypeRanges]);

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleApplyFilter = () => {
    onApplyFilter({ priceRange, capacityRange });
    toggleModal();
  };

  // Handle range changes
  const handlePriceChange = (e, type) => {
    const value = Number(e.target.value);
    setPriceRange((prevRange) => {
      let newPriceRange = [...prevRange];
      if (type === "min" && value < newPriceRange[1]) {
        newPriceRange[0] = value;
      } else if (type === "max" && value > newPriceRange[0]) {
        newPriceRange[1] = value;
      }
      return [...newPriceRange];
    });
  };

  const handleCapacityChange = (e, type) => {
    const value = Number(e.target.value);
    setCapacityRange((prevRange) => {
      let newCapacityRange = [...prevRange];
      if (type === "min" && value < newCapacityRange[1]) {
        newCapacityRange[0] = value;
      } else if (type === "max" && value > newCapacityRange[0]) {
        newCapacityRange[1] = value;
      }
      return [...newCapacityRange];
    });
  };

  const ranges = hallTypeRanges[halltype] || {
    price: [0, 0],
    capacity: [0, 0],
  };

  return (
    <div className="filter-container">
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <button onClick={toggleModal} className="filter-button">
            Filter
          </button>

          {isModalOpen && (
            <div
              className={`modal-overlay ${isModalOpen ? "show" : ""}`}
              onClick={toggleModal}
            >
              <div
                className={`modal-content ${isModalOpen ? "show" : ""}`}
                onClick={(e) => e.stopPropagation()}
              >
                <button className="close-button" onClick={toggleModal}>
                  &times;
                </button>

                <div className="filter-form">
                  {/* Price Range */}
                  <div>
                    <label>Price Range:</label>
                    <div className="range-slider">
                      <input
                        type="range"
                        min={ranges.price[0]}
                        max={ranges.price[1]}
                        step="100"
                        value={priceRange[0]}
                        onChange={(e) => handlePriceChange(e, "min")}
                        className="slider"
                      />
                      <input
                        type="range"
                        min={ranges.price[0]}
                        max={ranges.price[1]}
                        step="100"
                        value={priceRange[1]}
                        onChange={(e) => handlePriceChange(e, "max")}
                        className="slider"
                      />
                    </div>
                    <div className="price-values">
                      <span>
                        <b>Min:</b> Rs.{priceRange[0]}
                      </span>
                      <span>
                        <b>Max:</b> Rs.{priceRange[1]}
                      </span>
                    </div>
                  </div>

                  {/* Capacity Range */}
                  <div>
                    <label>Capacity Range:</label>
                    <div className="range-slider">
                      <input
                        type="range"
                        min={ranges.capacity[0]}
                        max={ranges.capacity[1]}
                        step="10"
                        value={capacityRange[0]}
                        onChange={(e) => handleCapacityChange(e, "min")}
                        className="slider"
                      />
                      <input
                        type="range"
                        min={ranges.capacity[0]}
                        max={ranges.capacity[1]}
                        step="10"
                        value={capacityRange[1]}
                        onChange={(e) => handleCapacityChange(e, "max")}
                        className="slider"
                      />
                    </div>
                    <div className="price-values">
                      <span>
                        <b>Min:</b> {capacityRange[0]} (people)
                      </span>
                      <span>
                        <b>Max:</b> {capacityRange[1]} (people)
                      </span>
                    </div>
                  </div>

                  <button
                    onClick={handleApplyFilter}
                    className="apply-filter-button"
                  >
                    Apply Filter
                  </button>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Filter;
