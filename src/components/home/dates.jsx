import React, { useState, useEffect } from "react";

export const Datepick = ({ handleSearch, searchData }) => {

    const [startDate, setstartDate] = useState("");
    const [endDate, setendDate] = useState("");
    const [destination, setDestination] = useState("Srikakulam");
    const [hallType, setHallType] = useState("Function-Halls");

 
    useEffect(() => {
        if (searchData && searchData.startDate && searchData.endDate) {
            setDestination(searchData.destination);
            setstartDate(searchData.startDate);
            setendDate(searchData.endDate);
            setHallType(searchData.hallType);
        } else {
            const today = new Date().toISOString().split("T")[0];
            setstartDate(today);
            setendDate(getNextDate(today));
        }
    }, [searchData]);



    const getNextDate = (date) => {
        const nextDay = new Date(date);
        nextDay.setDate(nextDay.getDate() + 1);
        return nextDay.toISOString().split("T")[0];
    };

    const handleStartDateChange = (e) => {
        const selectedStartDate = e.target.value;
        if (!selectedStartDate) return;
        setstartDate(selectedStartDate);
        setendDate(getNextDate(selectedStartDate));
    };

    const handleEndDateChange = (e) => {
        const selectedEndDate = e.target.value;
        if (!selectedEndDate) return;
        setendDate(selectedEndDate);
    };

    const handleDestinationChange = (e) => {
        setDestination(e.target.value);
    };

    const handleHallTypeChange = (e) => {
        setHallType(e.target.value);
    };

    const onSearch = () => {
        handleSearch({ destination, startDate, endDate, hallType });
    };
    return (
        <div className="search-bar">
            <div className="group" tabIndex="0">
                <p id="place-holder">Destination </p>
                <select
                    className="search-input"
                    value={destination}
                    onChange={handleDestinationChange}
                >
                    <option value="Srikakulam">Srikakulam</option>
                    <option value="Vizianagaram">Vizianagaram</option>
                    <option value="Vishakapatnam">Vishakapatnam</option>
                    <option value="Nellore">Nellore</option>
                </select>
            </div>
            <div className="group" tabIndex="0">
                <p id="place-holder">Check in </p>
                <input
                    type="date"
                    className="search-input"
                    value={startDate}
                    onChange={handleStartDateChange}
                    min={new Date().toISOString().split("T")[0]}
                />
            </div>
            <div className="group" tabIndex="0">
                <p id="place-holder">Check out </p>
                <input
                    type="date"
                    className="search-input"
                    value={endDate}
                    onChange={handleEndDateChange}
                    min={startDate ? getNextDate(startDate) : ""}
                />
            </div>
            <div className="group" tabIndex="0">
                <p id="place-holder">Hall Type </p>
                <select
                    className="search-input"
                    value={hallType}
                    onChange={handleHallTypeChange}
                >
                    <option value="Function-Halls">Function Halls</option>
                    <option value="Banquet-Halls">Banquet Halls</option>
                    <option value="Conference-Halls">Conference Halls</option>
                    <option value="Resorts">Resorts</option>
                    <option value="Cricket-Grounds">Cricket Grounds</option>
                </select>
            </div>
            <button className="search-button" onClick={onSearch}>Search</button>
        </div>
    );
};
