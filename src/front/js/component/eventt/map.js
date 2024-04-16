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

export const MapComponent = ({ coordinates }) => {
  const mapRef = useRef(null);
  const [map, setMap] = useState(null);
  const [marker, setMarker] = useState(null);

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
    if (map && coordinates) {
      map.setView(coordinates, 13);
      if (marker) {
        map.removeLayer(marker);
      }
      const newMarker = L.marker(coordinates, { icon: markerIcon }) // Usa el icono definido
        .addTo(map)
        .bindPopup("Aqui es el evento")
        .openPopup();
      setMarker(newMarker);
    }
    console.log('Cordenadas', coordinates)
  }, [map, coordinates]);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div ref={mapRef} style={{ height: "100%", width: "100%" }}></div>
    </div>
  );
};
