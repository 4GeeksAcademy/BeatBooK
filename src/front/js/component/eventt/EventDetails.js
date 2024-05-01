import React from "react";
import { MapComponent } from "./map";

export const EventDetails = ({ eventData, coordinates }) => {
  return (
    <div>

      <div className="event-map">
        {coordinates && <MapComponent address={eventData.location} />}
      </div>


      // ... Resto del código
    </div>
  );
};
