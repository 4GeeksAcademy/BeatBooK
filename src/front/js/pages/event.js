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
import { EventDescription } from "../component/eventt/EventDescription";
import L from "leaflet";

async function getCoordinates(address) {
  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${address}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    if (data[0]) {
      return [data[0].lat, data[0].lon];
    } else {
      console.error(
        `No se pudo encontrar ninguna ubicación para la dirección: ${address}`
      );
      return null;
    }
  } catch (error) {
    console.error("Ha ocurrido un error:", error);
    return null;
  }
}

export const Event2 = () => {
  // Asegúrate de reemplazar 'eventData' con los datos de tu evento
  const { id } = useParams();
  const { actions } = useContext(Context);
  const [eventData, setEventData] = useState(null);

  useEffect(() => {
    actions.getEvent(id).then((data) => {
      setEventData(data);
      console.log("eventData", data);
    });
  }, [id]);

  const [coordinates, setCoordinates] = useState(null);

  useEffect(() => {
    if (!eventData) {
      return;
    }

    getCoordinates(eventData.address).then(setCoordinates);
  }, [eventData]);

  useEffect(() => {
    console.log("coordinates2", coordinates);
  }, [coordinates]);

  function isUserLoggedIn() {
    // Comprueba si hay un token en el almacenamiento local
    const token = localStorage.getItem("jwt-token");
    return token !== null;
  }

  if (!eventData) {
    return <div class="text-center mt-5 pt-5 pb-5">
      <div class="spinner-border" style={{ width: '5rem', height: '5rem' }} role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>;
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
              src={eventData.picture_url || ImagenPrueba}
              alt="Descripción de la imagen"
            />{" "}
          </div>
          <EventDescription eventData={eventData} />
          <EventMedia eventData={eventData} />
          {/* <EventMembers eventData={eventData} /> */}
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
                <h4>{eventData.address}</h4>
                {coordinates && <MapComponent coordinates={coordinates} />}
              </div>
            </div>{" "}
          </div>{" "}
          <div className="d-flex-column justify-content-center align-items-center text-center mt-5">
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
              {/* <FontAwesomeIcon icon={faYoutube} className="icons" />{" "} */}
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
