import React from "react";
import { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button } from "react-bootstrap";
import ImagenPrueba from "../component/eventt/imagenEventoPrueba.png";
import "../component/eventt/evento.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faInstagram,
  faYoutube,
  faTiktok,
} from "@fortawesome/free-brands-svg-icons";
import { MapComponent } from "../component/eventt/map";
import "leaflet/dist/leaflet.css";
import { EventDetails } from "../component/eventt/EventDetails";
import { EventMedia } from "../component/eventt/EventMedia";
import { EventMembers } from "../component/eventt/EventMembers";
import { EventTeams } from "../component/eventt/EventTeams";
import { EventComments } from "../component/eventt/EventComments";

async function getCoordinates(address) {
  const response = await fetch(
    `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
  );
  const data = await response.json();
  if (data[0]) {
    return [data[0].lat, data[0].lon];
  } else {
    console.error(
      `No se pudo encontrar ninguna ubicación para la dirección: ${address}`
    );
    return null;
  }
}

export const Event = () => {
  // Asegúrate de reemplazar 'eventData' con los datos de tu evento
  const { id } = useParams();
  const { actions } = useContext(Context);
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    actions.getEvent(id).then(setEventData);
  }, [id, actions]);
  // const eventData = {
  //   name: "Luis Mola Mazo",
  //   date: "28/08/2024 20:00",
  //   description:
  //     "¡Ven a este evento increíble! ¡No te lo pierdas! ¡Trae a tus amigos! pop rock todo lo que te gusta 1 bebida incluida con tu entrada",
  //   members: ["Miembro 1", "Miembro 2"],
  //   price: "10$",
  //   location: "Sa sinia 11,Soller,Baleares,España",
  //   media: [
  //     "https://imgs.search.brave.com/pWU7M3Fbm2sDBzwUZ6RLgOy9vFxlRRPFcKzfnD7Wbkc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9iaWxs/ZXR0by5lcy9ibG9n/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE5/LzA0L2hhbm55LW5h/aWJhaG8tMzg4NTc5/LXVuc3BsYXNoLWUx/NTU0NDYxMDYzNTE3/LTgwMHg0NDAuanBn",
  //     "https://imgs.search.brave.com/OxBEau_JAbPgCDg7yHVB7BnQ9m5RH9PRITLAu3MQZM0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9iaWxs/ZXR0by5lcy9ibG9n/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE5/LzA0L2Rlbi00NTM1/NTEtdW5zcGxhc2gt/ZTE1NTQyODY5NjU1/NjQtODAweDQ0MC5q/cGc",
  //   ],
  //   teams: ["AC/DC", "Queen"],
  // };
  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    if (!eventData) {
      return;
    }

    getCoordinates(eventData.address).then(setCoordinates);
  }, [eventData]);

  function isUserLoggedIn() {
    // Comprueba si hay un token en el almacenamiento local
    const token = localStorage.getItem("jwt-token");
    return token !== null;
  }

  if (!eventData) {
    return <div>Cargando...</div>;
  }

  return (
    <Container className="pt-5 evento">
      <Row>
        <Col
          md={6}
          className="d-flex-column justify-content-center align-items-center text-center"
        >
          <div className="img-container">
            {" "}
            <img
              className="img-event"
              src={ImagenPrueba}
              alt="Descripción de la imagen"
            />{" "}
          </div>

          <EventMedia eventData={eventData} />
          <EventMembers eventData={eventData} />
          <EventTeams eventData={eventData} />
        </Col>
        <Col
          md={6}
          className="d-flex-column justify-content-center align-items-center text-center pt-3"
        >
          {" "}
          <h2>{eventData.name}</h2>{" "}
          <div className="d-flex justify-content-center align-items-center">
            {" "}
            <div className="event-details">
              {" "}
              <h5 className="p-2">{eventData.date}</h5>{" "}
              <h5 className="p-2">{eventData.location}</h5>{" "}
              <h5 className="p-2">
                {" "}
                {eventData.price === "0" ? "Gratis" : eventData.price}{" "}
              </h5>{" "}
              <div className="event-map">
                {" "}
                {coordinates && (
                  <MapComponent address={eventData.location} />
                )}{" "}
              </div>{" "}
            </div>{" "}
          </div>{" "}
          <div className="d-flex-column justify-content-center align-items-center text-center">
            {" "}
            <div className="d-flex justify-content-center align-items-center text-center pt-3">
              {" "}
              <button className="asist-button">Asistir</button>{" "}
            </div>{" "}
            <div className="d-flex justify-content-center align-items-center text-center pt-3">
              {" "}
              <button className="share-button">Compartir</button>{" "}
            </div>{" "}
            <hr className="mt-5 " />{" "}
            <div className="d-flex justify-content-center align-items-center text-center pt-3">
              {" "}
              <button className="chat-button">Chat de evento</button>{" "}
            </div>{" "}
            <div className="d-flex justify-content-center align-items-center text-center pt-3">
              {" "}
              <button className="report-button">Reportar evento</button>{" "}
            </div>{" "}
            <div className="pt-4">
              {" "}
              <h4>Redes Sociales</h4>{" "}
              <FontAwesomeIcon icon={faInstagram} className="icons" />{" "}
              <FontAwesomeIcon icon={faTiktok} className="icons" />{" "}
              <FontAwesomeIcon icon={faYoutube} className="icons" />{" "}
            </div>{" "}
          </div>{" "}
        </Col>
      </Row>
      <hr className="mt-5" />
      <Row>
        <Col>
          <EventComments isUserLoggedIn={isUserLoggedIn} />
        </Col>
      </Row>
    </Container>
  );
};
