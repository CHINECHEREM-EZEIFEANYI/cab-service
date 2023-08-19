"use client";
import React, { useEffect, useRef, useState } from "react";
import ReactMapGl, {
  GeolocateControl,
  Marker,
  NavigationControl,
  FullscreenControl,
  Popup,
  Layer,
  Source,
} from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import Geocoder from "./Geocoder";

import { useAppContext } from "@/context/AppContext";
import axios from "axios";
import useDeviceLocation from "@/hooks/useDeviceLocation";
import Map from "./Map";
export default function page() {
  const { coordinates, error } = useDeviceLocation();
  const geoControlRef = useRef();
  const mapRef = useRef();
  const {
    location: { latitude, longitude },
    setLocation,
  } = useAppContext();

  const [endCoords, setEndCoords] = useState(null);
  const [coords, setCoords] = useState([]);
  console.log(coords);
  useEffect(() => {
    if (coordinates) {
      setLocation({
        latitude: coordinates.latitude,
        longitude: coordinates.longitude,
      });
    }
  }, [coordinates]);

  useEffect(() => {
    if (endCoords != null) {
      getDirections();
    }
  }, [endCoords]);

  useEffect(() => {
    // Activate as soon as the control is loaded
    geoControlRef.current?.trigger();
  }, [geoControlRef.current]);

  function getDirections() {
    axios
      .get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${latitude},${longitude};${endCoords[0]},${endCoords[1]}?geometries=geojson&access_token=pk.eyJ1Ijoic29zYXJpc3RpYyIsImEiOiJjbGlvYXY2M2YwNzlyM2VwOGt4dmQ0dmRyIn0.vvWi_LR2n0v6l3YiS0H6oA`
      )
      .then((response) => {
        const data = response.data.routes[0].geometry.coordinates;
        setCoords(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  const geojson = {
    type: "Feature",
    properties: {},
    geometry: {
      type: "LineString",
      coordinates: coords,
    },
  };

  const lineStyle = {
    id: "roadLayer",
    type: "line",
    source: {
      type: "geojson",
      data: geojson,
    },
    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "blue",
      "line-width": 4,
      "line-opacity": 0.75,
    },
  };

  const handleMapClicked = (e) => {
    const values = e.lngLat;
    const arrValues = Object.values(values);
    console.log(arrValues);
    setEndCoords(arrValues);
    // getDirections();
  };

  const handleLocateUser = (e) => {
    const coords = e.coords;
    console.log(coords);
    setLocation({
      latitude: coords.latitude,
      longitude: coords.longitude,
    });
  };

  return (
    <div>
      <p>choose a location</p>
      <p>
        lat: {latitude}
        lon: {longitude}
      </p>
      <div className="w-screen h-[60vh] lg:h-[30rem] lg:w-[40rem] mx-auto my-4">
        <ReactMapGl
          onClick={handleMapClicked}
          mapboxAccessToken="pk.eyJ1Ijoic29zYXJpc3RpYyIsImEiOiJjbGlvYXY2M2YwNzlyM2VwOGt4dmQ0dmRyIn0.vvWi_LR2n0v6l3YiS0H6oA"
          initialViewState={{ latitude: latitude, longitude: longitude, zoom: 12 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <Geocoder setLocation={setLocation} />
          <Marker
            latitude={latitude}
            longitude={longitude}
            draggable
            onDrag={(e) => setLocation({ latitude: e.lngLat.lat, longitude: e.lngLat.lng })}
          />

          <Source id="routeSource" type="geojson" data={geojson}>
            <Layer {...lineStyle} />
          </Source>

          <NavigationControl />
          <GeolocateControl
            ref={geoControlRef}
            showUserLocation
            trackUserLocation
            onGeolocate={handleLocateUser}
          />
          <FullscreenControl />
          {/* <Popup longitude={longitude} latitude={latitude} anchor="top"></Popup> */}
        </ReactMapGl>
      </div>
    </div>
  );
}
