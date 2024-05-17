import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import Modal from 'react-bootstrap/Modal';
import beatBox from './beatBoxVertical.png'

export const EventTeams = ({ eventData }) => {
  const { store, actions } = useContext(Context);
  const [band, setBand] = useState(null);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (eventData && eventData.band_id) {
      actions
        .getBand(eventData.band_id)
        .then((bandData) => {
          setBand(bandData);
        })
        .catch((error) => console.log("Error en getBand:", error));

    }
  }, [eventData]);

  return (
    <div className="pt-3">
      <h4>Grupo</h4>
      <div
        className="d-flex justify-content-center pt-3"
        style={{ listStyle: "none" }}
      >
        <div
          className="me-3 teams"
          style={{
            backgroundImage: `url(${band ? band.profile_picture : beatBox
              })`,
          }}
          onClick={handleShow}
        >
          <p>{band ? band.name : "Cargando..."}</p>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{band ? band.name : "Cargando..."}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {band && (
            <>
              <img src={band.profile_picture} alt="Imagen del grupo" className="img-fluid" />
              <p className="blacktext">Descripción: {band.description}</p>
              <p className="blacktext">Instagram: {band.instagram}</p>
              <p className="blacktext">TikTok: {band.tiktok}</p>
              <p className="blacktext">Categoría musical: {band.music_category}</p>
              <div className="d-flex flex-row flex-wrap">
                <h5 className="blacktext">Miembros:</h5>
                {band.members.map(member => (
                  <div key={member.id} className="me-3" style={{ flex: '0 0 calc(33.33% - 1rem)' }}>
                    <img
                      src={member.profile_image_url ? member.profile_image_url : beatBox}
                      alt={member.username}
                      style={{ width: '50px', height: '50px' }}
                    />
                    <p className="mt-2 blacktext">{member.username}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </Modal.Body>
      </Modal>
    </div>
  );
};