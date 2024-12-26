import { useState, useEffect } from "react";
import { localCardData } from '../home/Top_rated-hotels/card-data';
export const useHotelData = (id) => {
    const [hotelName, setHotelName] = useState("");
    const [description, setDescription] = useState("");
    const [mainImage, setMainImage] = useState("");
    const [additionalImages, setAdditionalImages] = useState([]);
    const [loading, setLoading] = useState(true);
    const fetchHotelImages = async () => {
        try {
            const response = await fetch(
                "https://script.google.com/macros/s/AKfycbwAh7bZKZSMXBx00kJfIuuLo1HHG9BN2SC8IBB5pWEUzfVvpICqEfrvXKncgDFLGiwPEw/exec"
            );
            const imageData = await response.json();
            const filteredImages = imageData.filter((image) => {
                return String(image.id) === String(id);
            });
            if (filteredImages.length === 0) {
                console.warn(`No images found for id: ${id}`);
                return [];
            }
            return filteredImages.map((image) => image.imgSrc);
        } catch (error) {
            console.error("Error fetching images:", error);
            return [];
        }
    };
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const hotel = localCardData.find((hotel) => String(hotel.id) === String(id));
            if (hotel) {
                setHotelName(hotel.title);
                setDescription(hotel.description);
            }
            const images = await fetchHotelImages();
            if (images.length > 0) {
                setMainImage(images[0]);
                setAdditionalImages(images.slice(1));
            }
            setLoading(false);
        };
        fetchData();
    },[id]);
    return { hotelName, description, mainImage, additionalImages, loading };
};
