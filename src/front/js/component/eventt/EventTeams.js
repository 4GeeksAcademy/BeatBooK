import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";

export const EventTeams = ({ eventData }) => {
  const { store, actions } = useContext(Context);
  const [band, setBand] = useState(null);

  useEffect(() => {
    // console.log("eventData:", eventData); // Agrega esto
    if (eventData && eventData.band_id) {
      // console.log("band_id:", eventData.band_id); // Agrega esto
      actions
        .getBand(eventData.band_id)
        .then((bandData) => {
          // console.log("Datos recibidos de getBand:", bandData);
          setBand(bandData);
        })
        .catch((error) => console.log("Error en getBand:", error)); // Modifica esto
    }
  }, [1]);

  return (
    <div className="pt-3">
      <h4>Grupo</h4>
      <div
        className="d-flex justify-content-start pt-3"
        style={{ listStyle: "none" }}
      >
        <div
          className="me-3 teams"
          style={{
            backgroundImage: `url(${band ? band.profile_picture : "defaultImage.jpg"
              })`,
          }}
        >
          <p>{band ? band.name : "Cargando..."}</p>
        </div>
      </div>
    </div>
  );
};
