import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../store/appContext";
import Modal from 'react-bootstrap/Modal';
import beatBox from './beatBoxVertical.png'

export const EventPlace = ({ eventData }) => {
    const { store, actions } = useContext(Context);
    const [place, setPlace] = useState(null);
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (eventData && eventData.place_id) {
            actions
                .getPlace(eventData.place_id)
                .then((placeData) => {
                    setPlace(placeData);
                })
                .catch((error) => console.log("Error en getPlace:", error));

        }
    }, [eventData]);

    return (
        <div className="pt-3">
            <h4>Lugar</h4>
            <div
                className="d-flex justify-content-center pt-3"
                style={{ listStyle: "none" }}
            >
                <div
                    className="me-3 teams"
                    style={{
                        backgroundImage: `url(${place ? place.profile_picture : beatBox
                            })`,
                    }}
                    onClick={handleShow}
                >
                    <p>{place ? place.name : "Cargando..."}</p>
                </div>
            </div>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{place ? place.name : "Cargando..."}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {place && (
                        <>
                            <img src={place.profile_picture} alt="Imagen del lugar" className="img-fluid" />
                            <p className="blacktext">Descripción: {place.description}</p>
                            <p className="blacktext">Dirección: {place.address}</p>
                            <p className="blacktext">Telefono: {place.phone}</p>
                            <p className="blacktext">Instagram: {place.instagram}</p>
                            <p className="blacktext">Tiktok: {place.tiktok}</p>
                        </>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
};