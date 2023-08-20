"use client";
import { useRef, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

const accessToken =
  "pk.eyJ1Ijoic29zYXJpc3RpYyIsImEiOiJjbGxmNm9qaHcwcTU3M2RuMXJuemdhY3FvIn0.UGsqZ4uDjRxlXs68ImhqjA";

export default function test2() {
  const map = useRef(null);
  const [lng, setLng] = useState(77.378);
  const [lat, setLat] = useState(28.624);
  const [zoom, setZoom] = useState(12);

  const mapContainer = useRef();
  const start = [7.4112677, 6.8654786];

  useEffect(() => {
    mapboxgl.accessToken =
      "pk.eyJ1Ijoic29zYXJpc3RpYyIsImEiOiJjbGlvYXY2M2YwNzlyM2VwOGt4dmQ0dmRyIn0.vvWi_LR2n0v6l3YiS0H6oA";
    const map = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: start, // starting position
      zoom: 12,
    });

    const marker = new mapboxgl.Marker({
      color: "#FFFFFF",
      draggable: true,
    })
      .setLngLat([6.8654786, 7.4112677])
      .addTo(map);

    // set the bounds of the map
    // const bounds = [
    //   [-123.069003, 45.395273],
    //   [-122.303707, 45.612333],
    // ];
    // map.setMaxBounds(bounds);

    // an arbitrary start will always be the same
    // only the end or destination will change

    // this is where the code for the next step will go

    // create a function to make a directions request
    async function getRoute(end) {
      // make a directions request using cycling profile
      // an arbitrary start will always be the same
      // only the end or destination will change
      const query = await fetch(
        `https://api.mapbox.com/directions/v5/mapbox/cycling/${start[0]},${start[1]};${end[0]},${end[1]}?steps=true&geometries=geojson&access_token=${mapboxgl.accessToken}`,
        { method: "GET" }
      );
      const json = await query.json();
      const data = json.routes[0];
      const route = data.geometry.coordinates;
      const geojson = {
        type: "Feature",
        properties: {},
        geometry: {
          type: "LineString",
          coordinates: route,
        },
      };
      // if the route already exists on the map, we'll reset it using setData
      if (map.getSource("route")) {
        map.getSource("route").setData(geojson);
      }
      // otherwise, we'll make a new request
      else {
        map.addLayer({
          id: "route",
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
            "line-color": "#3887be",
            "line-width": 5,
            "line-opacity": 0.75,
          },
        });
      }
      // add turn instructions here at the end
    }

    map.on("load", () => {
      // make an initial directions request that
      // starts and ends at the same location
      getRoute(start);

      // Add starting point to the map
      map.addLayer({
        id: "point",
        type: "circle",
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: [
              {
                type: "Feature",
                properties: {},
                geometry: {
                  type: "Point",
                  coordinates: start,
                },
              },
            ],
          },
        },
        paint: {
          "circle-radius": 10,
          "circle-color": "#3887be",
        },
      });
      // this is where the code from the next step will go
    });

    map.on("click", (event) => {
      const coords = Object.keys(event.lngLat).map((key) => event.lngLat[key]);
      const end = {
        type: "FeatureCollection",
        features: [
          {
            type: "Feature",
            properties: {},
            geometry: {
              type: "Point",
              coordinates: coords,
            },
          },
        ],
      };
      if (map.getLayer("end")) {
        map.getSource("end").setData(end);
      } else {
        map.addLayer({
          id: "end",
          type: "circle",
          source: {
            type: "geojson",
            data: {
              type: "FeatureCollection",
              features: [
                {
                  type: "Feature",
                  properties: {},
                  geometry: {
                    type: "Point",
                    coordinates: coords,
                  },
                },
              ],
            },
          },
          paint: {
            "circle-radius": 10,
            "circle-color": "#f30",
          },
        });
      }
      getRoute(coords);
    });
  }, [map.current]);

  return (
    <div>
      <p>choose component page</p>
      <div
        ref={mapContainer}
        className="w-screen h-[60vh] lg:h-[30rem] lg:w-[40rem] mx-auto my-4"
      ></div>
    </div>
  );
}

// [-123.069003, 45.395273],
// [-122.303707, 45.612333],
// const start = [-122.662323, 45.523751];
