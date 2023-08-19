"use client";
import { useState, useEffect } from "react";

function useDeviceLocation() {
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(position);
    });

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          console.log(position);
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(latitude);
          setCoordinates({ latitude, longitude });
          setError(null); // Clear any previous errors
        },
        function (error) {
          if (error.code === 1) {
            setError("Permission denied. Please enable location access.");
          } else {
            setError(error.message);
          }
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  }, []);

  return { coordinates, error };
}

export default useDeviceLocation;
