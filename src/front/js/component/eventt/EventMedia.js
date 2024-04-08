import React from "react";

export const EventMedia = ({ eventData }) => {
  return (
    <div className="pt-3">
      <h4>
        Fotos y Videos(<span>{eventData.media.length}</span>)
      </h4>
      <div className="d-flex justify-content-start pt-3">
        {eventData.media.map((mediaObject, index) => (
          <div className="img-media-container me-3" key={index}>
            <img
              className="img-media img-fluid"
              src={mediaObject.url} // Accede a la propiedad 'url' aquí
              alt="Imagen del evento"
            />
          </div>
        ))}
      </div>
    </div>
  );
};
