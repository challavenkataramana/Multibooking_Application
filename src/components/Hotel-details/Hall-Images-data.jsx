import { useState, useEffect } from "react";

export const useHotelData = (id, hotelType) => {
 
  const [additionalImages, setAdditionalImages] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchAdditionalImages = async () => {
    try {

      const response = await fetch(
        `https://script.google.com/macros/s/AKfycbx-ZetqOwdbCHkalmWr_hGDhB7t9NIQQutj1SGbd5FTyXlbEp4cuZdQR3OtyHf-thB-/exec?sheet=${hotelType}`
      );
      const data = await response.json();

      const filteredImages = data
        .filter((entry) => String(entry.id) === String(id))
        .map((entry) => entry.imgSrc);
      if (filteredImages.length === 0) {
        console.warn(`No additional images found for id: ${id}`);
      }

      return filteredImages;
    } catch (error) {
      console.error("Error fetching additional images:", error);
      return [];
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const images = await fetchAdditionalImages();
      setAdditionalImages(images);
      setLoading(false);
    };

    fetchData();
  }, [id, hotelType]);

  return { additionalImages, loading };
};
