import React, { useState, useEffect } from "react";

export const Datepick = ({ handleSearch, searchData }) => {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [destination, setDestination] = useState("");
  const [hallType, setHallType] = useState("Function-Halls");
  const [locations, setLocations] = useState([]);
  const [loadingLocations, setLoadingLocations] = useState(true);
  useEffect(() => {
    if (searchData && searchData.startDate && searchData.endDate) {
      setStartDate(searchData.startDate);
      setEndDate(searchData.endDate);
      setHallType(searchData.hallType);
      fetchLocations(searchData.hallType, searchData.destination);
    } else {
      const today = new Date().toISOString().split("T")[0];
      setStartDate(today);
      setEndDate(getNextDate(today));
      setHallType(hallType);
      fetchLocations(hallType, "");
    }
  }, [searchData]);

  useEffect(() => {
    if (!searchData) {
      fetchLocations(hallType, "");
    }
  }, [hallType]);

  const fetchLocations = async (selectedHallType, selectedDestination) => {
    setLoadingLocations(true);
    setLocations([]);
    try {
      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbwIyAU4fS1WxxZ1ZjqPBhCeTLlp-mRbvO499E0Tw42zjSVYdOIJHiClYx4GJn42FjT_/exec?sheet=${selectedHallType}`
      );
      const data = await response.json();
      const uniqueLocations = [...new Set(data.map((hall) => hall.location))];

      setLocations(uniqueLocations);

      if (
        selectedDestination &&
        uniqueLocations.includes(selectedDestination)
      ) {
        setDestination(selectedDestination);
      } else {
        setDestination(uniqueLocations[0] || "");
      }
    } catch (error) {
      console.error("Error fetching locations:", error);
    } finally {
      setLoadingLocations(false);
    }
  };

  const getNextDate = (date) => {
    const nextDay = new Date(date);
    nextDay.setDate(nextDay.getDate() + 1);
    return nextDay.toISOString().split("T")[0];
  };

  const handleStartDateChange = (e) => {
    const selectedStartDate = e.target.value;
    setStartDate(selectedStartDate);
    setEndDate(getNextDate(selectedStartDate));
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleHallTypeChange = (e) => {
    const newHallType = e.target.value;
    setHallType(newHallType);
    fetchLocations(newHallType, "");
  };

  const handleSearchClick = () => {
    handleSearch({ destination, startDate, endDate, hallType });
  };

  return (
    <div className="search-bar">
      <div className="group">
        <p id="place-holder">Hall Type</p>
        <select
          className="search-input"
          value={hallType}
          onChange={handleHallTypeChange}
          disabled={loadingLocations}
        >
          <option value="Function-Halls">Function Halls</option>
          <option value="Banquet-Halls">Banquet Halls</option>
          <option value="Conference-Halls">Conference Halls</option>
          <option value="Resorts">Resorts</option>
          <option value="Cricket-Grounds">Cricket Grounds</option>
          <option value="Trending-Hotels">Trending Hotels</option>
          <option value="Hot-Deals">Hot Deals</option>
        </select>
      </div>

      <div className="group">
        <p id="place-holder">Check-in</p>
        <input
          type="date"
          className="search-input"
          value={startDate}
          onChange={handleStartDateChange}
          min={new Date().toISOString().split("T")[0]}
        />
      </div>

      <div className="group">
        <p id="place-holder">Check-out</p>
        <input
          type="date"
          className="search-input"
          value={endDate}
          onChange={handleEndDateChange}
          min={startDate ? getNextDate(startDate) : ""}
        />
      </div>

      <div className="group">
        <p id="place-holder">Destination</p>
        <select
          value={destination}
          className="search-input"
          onChange={(e) => setDestination(e.target.value)}
          disabled={loadingLocations}
        >
          {loadingLocations ? (
            <option>Loading...</option>
          ) : locations.length > 0 ? (
            locations.map((loc, index) => (
              <option key={index} value={loc}>
                {loc}
              </option>
            ))
          ) : (
            <option>No locations found</option>
          )}
        </select>
      </div>

      <button
        className="search-button"
        onClick={handleSearchClick}
        disabled={loadingLocations}
      >
        Search
      </button>
    </div>
  );
};
