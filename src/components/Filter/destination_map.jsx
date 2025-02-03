import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Marker.prototype.options.icon = L.icon({
    iconUrl: markerIcon,
    iconRetinaUrl: markerIcon2x,
    shadowUrl: markerShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
});


const MapCenterUpdater = ({ center }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, map.getZoom());
    }, [center, map]);
    return null;
};

const MapComponent = ({ destination }) => {
    const [location, setLocation] = useState({ lat: 17.385044, lng: 78.486671 });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (destination) {
            fetchCoordinates(destination);
        }
    }, [destination]);

    const fetchCoordinates = async (destination) => {
        try {
            const response = await fetch(`https://nominatim.openstreetmap.org/search?city=${destination}&format=json`);
            const data = await response.json();
            if (data.length > 0) {
                const { lat, lon } = data[0];
                setLocation({ lat: parseFloat(lat), lng: parseFloat(lon) });
            } else {
                console.error("No coordinates found for the destination.");
            }
        } catch (error) {
            console.error("Error fetching coordinates:", error);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div>Loading map...</div>; 
    }

    return (
        <MapContainer
            center={[location.lat, location.lng]}
            zoom={14}
            style={{ height: "100%", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <MapCenterUpdater center={[location.lat, location.lng]} />
            <Marker position={[location.lat, location.lng]}>
                <Popup>{`Location: ${destination}`}</Popup>
            </Marker>
        </MapContainer>
    );
};

export default MapComponent;
