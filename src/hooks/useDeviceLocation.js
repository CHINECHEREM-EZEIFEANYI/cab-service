"use client";
import { useState, useEffect } from "react";

function useDeviceLocation() {
  const [coordinates, setCoordinates] = useState(null);
  const [appMounted, setAppMounted] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setAppMounted(true);
  }, []);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        function (position) {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          console.log(latitude);
          setCoordinates({ latitude, longitude });
          setError(null);
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
  }, [appMounted]);

  return { coordinates, error };
}

export default useDeviceLocation;
