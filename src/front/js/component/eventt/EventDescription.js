import React from "react";

export const EventDescription = ({ eventData }) => {
  return (
    <div className="event-description mt-3">
      <h2>Descripción del evento</h2>
      <p>
        {eventData.description ||
          "¡Ven a este evento increíble! ¡No te lo pierdas! ¡Trae a tus amigos! pop rock todo lo que te gusta 1 bebida incluida con tu entrada"}
      </p>
    </div>
  );
};
