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

const accessToken =
  "pk.eyJ1Ijoic29zYXJpc3RpYyIsImEiOiJjbGxmNm9qaHcwcTU3M2RuMXJuemdhY3FvIn0.UGsqZ4uDjRxlXs68ImhqjA";
export default function page() {
  const { coordinates, error } = useDeviceLocation();
  const geoControlRef = useRef();
  const mapRef = useRef();
  const {
    location: { latitude, longitude },
    setLocation,
  } = useAppContext();
  const [start, setStart] = useState([7.4112677, 6.8654786]);
  const [endCoords, setEndCoords] = useState([7.4112677, 6.8654786]);
  const [coords, setCoords] = useState([]);

  useEffect(() => {
    getDirections(endCoords);
  }, [start]);

  useEffect(() => {
    // Activate as soon as the control is loaded
    geoControlRef.current?.trigger();
  }, [geoControlRef.current]);

  function getDirections(end) {
    axios
      .get(
        `https://api.mapbox.com/directions/v5/mapbox/driving/${start[0]},${start[1]};${end[0]},${end[1]}?geometries=geojson&access_token=${accessToken}`
      )
      .then((response) => {
        const data = response.data.routes[0].geometry.coordinates;
        console.log(data);
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
      coordinates: [...coords],
    },
  };

  const lineStyle = {
    id: "roadLayer",
    type: "line",

    layout: {
      "line-join": "round",
      "line-cap": "round",
    },
    paint: {
      "line-color": "blue",
      "line-width": 2,
      "line-opacity": 0.75,
    },
  };

  const handleMapClicked = (e) => {
    const values = e.lngLat;
    const arrValues = Object.values(values);
    console.log(arrValues);
    setEndCoords(arrValues);
    getDirections(arrValues);
  };

  const handleLocateUser = (e) => {
    const coords = e.coords;

    setStart([coords.longitude, coords.latitude]);
  };

  return (
    <div>
      <p>choose a location</p>
      <p>
        lat: {start[1]}
        lon: {start[0]}
      </p>
      <div className="w-screen h-[60vh] lg:h-[30rem] lg:w-[40rem] mx-auto my-4">
        <ReactMapGl
          onClick={handleMapClicked}
          mapboxAccessToken={accessToken}
          initialViewState={{ latitude: start[0], longitude: start[1], zoom: 12 }}
          mapStyle="mapbox://styles/mapbox/streets-v9"
        >
          <Geocoder setLocation={setLocation} />
          <Marker
            latitude={start[1]}
            longitude={start[0]}
            draggable
            onDragEnd={(e) => setStart([e.lngLat.lng, e.lngLat.lat])}
          />

          <Source id="routeSource" type="geojson" data={geojson}>
            <Layer {...lineStyle} />
          </Source>

          <NavigationControl />
          <GeolocateControl trackUserLocation showUserLocation onGeolocate={handleLocateUser} />
          <FullscreenControl />
          {/* <Popup longitude={longitude} latitude={latitude} anchor="top"></Popup> */}
        </ReactMapGl>
      </div>
    </div>
  );
}
