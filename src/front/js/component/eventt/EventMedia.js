import React, { useState } from "react";
import Modal from 'react-bootstrap/Modal';

export const EventMedia = ({ eventData }) => {
  const [show, setShow] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = (url) => {
    setSelectedImage(url);
    setShow(true);
  };

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
              src={mediaObject.url}
              alt="Imagen del evento"
              onClick={() => handleShow(mediaObject.url)}
            />
          </div>
        ))}
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Imagen del evento</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <img src={selectedImage} alt="Imagen ampliada del evento" className="img-fluid" />
        </Modal.Body>
      </Modal>
    </div>
  );
};