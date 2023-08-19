import MapboxGeocoder from "@mapbox/mapbox-gl-geocoder";
import "@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css";
import { useControl } from "react-map-gl";

export default function Geocoder({ setLocation }) {
  const ctrl = new MapboxGeocoder({
    accessToken:
      "pk.eyJ1Ijoic29zYXJpc3RpYyIsImEiOiJjbGlvYXY2M2YwNzlyM2VwOGt4dmQ0dmRyIn0.vvWi_LR2n0v6l3YiS0H6oA",
    marker: false,
    collapsed: true,
  });

  useControl(() => ctrl);
  ctrl.on("result", (e) => {
    const coords = e.result.geometry.coordinates;
    setLocation({ latitude: coords[1], longitude: coords[0] });
    console.log(coords);
  });

  return null;
}
