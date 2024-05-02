// const axios = require("axios");;
import axios from "axios";

const getNearbyCafes = async (latitude, longitude, radius, type, apiKey) => {
  const url = `https://maps.googleapis.com/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=${radius}&type=${type}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    const data = response.data;

    if (data.results) {
      const cafesWithDistance = data.results.map(caf => ({
        ...caf,
        distance: getDistance(
            latitude,
            longitude,
          caf.geometry.location.lat,
          caf.geometry.location.lng
        )
      }));
      return cafesWithDistance;
    } else {
      throw new Error("No results found");
    }
  } catch (error) {
    console.error("Error fetching nearby cafes:", error.message);
    return [];
  }
};

const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRadians(lat1)) *
        Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    const distance = R * c; // Distance in kilometers
    return distance;
  };
  
  // Helper function to convert degrees to radians
  const toRadians = degrees => {
    return degrees * (Math.PI / 180);
  };

export default getNearbyCafes;