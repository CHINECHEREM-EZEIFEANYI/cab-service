"use client";

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
import useDeviceCoords from "@/hooks/useDeviceLocation";

export default function Map() {
  const { deviceCoords } = useDeviceCoords();

  return (
    <div>
      <ReactMapGl
        mapboxAccessToken="pk.eyJ1Ijoic29zYXJpc3RpYyIsImEiOiJjbGlvYXY2M2YwNzlyM2VwOGt4dmQ0dmRyIn0.vvWi_LR2n0v6l3YiS0H6oA"
        initialViewState={{ latitude: deviceCoords[0], longitude: deviceCoords[1], zoom: 12 }}
        mapStyle="mapbox://styles/mapbox/streets-v9"
      >
        {/* <Marker
            latitude={latitude}
            longitude={longitude}
            draggable
            onDrag={(e) => setLocation({ latitude: e.lngLat.lat, longitude: e.lngLat.lng })}
          /> */}
      </ReactMapGl>
    </div>
  );
}
