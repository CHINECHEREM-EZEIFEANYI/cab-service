import { useState, useEffect, useLayoutEffect } from "react";
import { useAppContext } from "@/context/AppContext";

export default function useDeviceCoords() {
  const [deviceCoords, setdeviceCoords] = useState(null);
  const { setLocation } = useAppContext();

  useLayoutEffect(() => {
    function getCoordinates() {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      }
    }

    getCoordinates();
  }, []);

  function showPosition(position) {
    const coords = position.coords;
    // setLocation({
    //   latitude: coords.latitude,
    //   longitude: coords.longitude,
    // });
  }
}
