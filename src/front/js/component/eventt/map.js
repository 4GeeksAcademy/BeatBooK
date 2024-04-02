import React from "react";
import { useRef, useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Define el icono del marcador
const markerIcon = new L.Icon({
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

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
    }
  }, []);

  useEffect(() => {
    if (map) {
      getCoordinates(address).then((coordinates) => {
        map.setView(coordinates, 13);
        if (marker) {
          map.removeLayer(marker);
        }
        const newMarker = L.marker(coordinates, { icon: markerIcon }) // Usa el icono definido
          .addTo(map)
          .bindPopup("Aqui es el evento")
          .openPopup();
        setMarker(newMarker);
      });
    }
  }, [map, address]);

  return <div ref={mapRef} style={{ height: "100%", width: "100%" }}></div>;
};
