import React from "react";
import { MapComponent } from "./map";

export const EventDetails = ({ eventData, coordinates }) => {
  return (
    <div>
      <h2>{eventData.name}</h2>
      <div className="d-flex justify-content-center align-items-center">
        <div className="event-details">
          <h5 className="p-2">{eventData.date}</h5>
          <h5 className="p-2">{eventData.location}</h5>
          <h5 className="p-2">
            {eventData.price === "0" ? "Gratis" : eventData.price}
          </h5>
          <div className="event-map">
            {coordinates && <MapComponent address={eventData.location} />}
          </div>
        </div>
      </div>
      // ... Resto del código
    </div>
  );
};
