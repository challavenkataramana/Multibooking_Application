import React, { useState, useEffect } from "react";

export const Datepick = () => {
    const [startDate, setstartDate] = useState("");
    const [endDate, setendDate] = useState("");



    useEffect(() => {
        const today = new Date().toISOString().split("T")[0];
        setstartDate(today);
        setendDate(getNextDate(today));
    }, []);

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
    return (
        <div className="search-bar" >
            <div className="group" tabindex="0" >
                <p id="place-holder">Destination </p>
                <input
                    type="text"
                    placeholder="Where to ?"
                    className="search-input"
                />
            </div>
            <div className="group" tabindex="0" >
                <p id="place-holder">Check in </p>
                <input
                    type="date"
                    className="search-input"
                    value={startDate}
                    onChange={handleStartDateChange}
                    min={new Date().toISOString().split("T")[0]}
                />
            </div>
            <div className="group" tabindex="0" >
                <p id="place-holder">Check out </p>
                <input
                    type="date"
                    className="search-input"
                    value={endDate}
                    onChange={handleEndDateChange}
                    min={startDate ? getNextDate(startDate) : ""}
                />
            </div>
            <div className="group" tabindex="0" >
                <p id="place-holder">Guests and Rooms </p>
                <input
                    type="text"
                    placeholder="Enter"
                    className="search-input"
                />
            </div>
            <button className="search-button">Search</button>
        </div>
    )
}
