import React from "react";

export const EventMedia = ({ eventData }) => {
  return (
    <div className="pt-3">
      <h4>
        Fotos y Videos(<span>{eventData.media.length}</span>)
      </h4>
      <div className="d-flex justify-content-start pt-3">
        {eventData.media.map((imageUrl, index) => (
          <div className="img-media-container me-3" key={index}>
            <img className="img-media" src={imageUrl} alt="Imagen del evento" />
          </div>
        ))}
      </div>
    </div>
  );
};
