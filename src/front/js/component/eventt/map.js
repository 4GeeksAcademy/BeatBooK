import React from "react";
import { useRef, useEffect, useState } from "react";
import L from "leaflet";

export const MapComponent = ({ address }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

  async function getCoordinates(address) {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
    );
    const data = await response.json();
    return [data[0].lat, data[0].lon];
  }

  useEffect(() => {
    if (mapRef.current) {
      const initialMap = L.map(mapRef.current).setView([0, 0], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(initialMap);
      setMap(initialMap);

      getCoordinates(address).then((coordinates) => {
        initialMap.setView(coordinates, 13);
        if (marker) {
          initialMap.removeLayer(marker);
        }
        const newMarker = L.marker(coordinates)
          .addTo(initialMap)
          .bindPopup("Aqui es el evento")
          .openPopup();
        setMarker(newMarker);
      });
    }
  }, [address]);

  return <div ref={mapRef} style={{ height: "100%", width: "100%" }}></div>;
};
