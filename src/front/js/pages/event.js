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
import { EventPlace } from "../component/eventt/EventPlace";
import { EventTeams } from "../component/eventt/EventTeams";
import { EventComments } from "../component/eventt/EventComments";
import { EventDescription } from "../component/eventt/EventDescription";
import { EventAssistance } from "../component/eventt/EventAssitance";
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

export const Event = (props) => {

  const { id } = useParams();
  const { actions } = useContext(Context);
  const [eventData, setEventData] = useState(null);
  const [refreshComments, setRefreshComments] = useState(false);
  const [refreshAssistances, setRefreshAssistances] = useState(false);



  useEffect(() => {
    actions.getEvent(id).then((data) => {
      setEventData(data);
      console.log("eventData", data);
    });
  }, [id, refreshComments, refreshAssistances]);

  const handleNewComment = () => {
    setRefreshComments(!refreshComments);
  };

  const handleAssistanceChange = () => {
    setRefreshAssistances(!refreshAssistances);
  };

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



  function isLoggedIn() {
    const token = localStorage.getItem("jwt-token");
    const user = JSON.parse(localStorage.getItem("user"));
    return token !== null && user !== null;
  }

  const formatEventDate = (eventDate) => {
    if (!eventDate) return "";
    const date = new Date(eventDate);
    return date.toLocaleString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };



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
        <div className="d-flex justify-content-center mb-3">
          <h1>{eventData.name}</h1>{" "}
        </div>
        <Col
          md={6}
          className="d-flex-column justify-content-center align-items-center text-center pt-2 pb-5
          "
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
          <Row>
            <Col md={6} xs={12}>
              <EventTeams eventData={eventData} />
            </Col>
            <Col md={6} xs={12}>
              <EventPlace eventData={eventData} />
            </Col>
          </Row>
        </Col>
        <Col
          md={6}
          className="d-flex-column justify-content-center align-items-center text-center"
        >
          {" "}

          <div className="d-flex justify-content-center align-items-center">
            {" "}
            <div className="event-details">
              {" "}
              <h5 className="p-2"> Fecha: {formatEventDate(eventData.date)}</h5>{" "}

              <h5 className="p-2">
                Precio: {" "}
                {eventData.price === "0" ? "Gratis" : eventData.price}{" "} €
              </h5>{" "}
              <div className="event-map">
                <h4 className="pb-1">Dirección: {eventData.address}</h4>
                {coordinates && <MapComponent coordinates={coordinates} />}
              </div>
            </div>{" "}
          </div>{" "}
          <div className="d-flex-column justify-content-center align-items-center text-center mt-5  pt-5">
            {" "}<h5>Asistentes <span>{eventData.assistances.length}</span></h5>{" "}
            <div className="d-flex justify-content-center align-items-center text-center pt-3">
              {isLoggedIn() && eventData && <EventAssistance eventId={eventData.id} assistances={eventData.assistances} onAssistanceChange={handleAssistanceChange} />}
            </div>
            <div className="d-flex justify-content-center align-items-center text-center pt-3">
              {" "}
              <button className="share-button">Compartir</button>{" "}
            </div>{" "}
            <hr className="mt-5 " />{" "}

            <div className="d-flex justify-content-center align-items-center text-center pt-3">
              {" "}
              <button className="report-button">Reportar evento</button>{" "}
            </div>{" "}
            <div className="pt-4">
              {" "}
              <h4>Redes Sociales</h4>{" "}
              <a href={eventData.instagram} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faInstagram} className="icons" />
              </a>{" "}
              <a href={eventData.tiktok} target="_blank" rel="noopener noreferrer">
                <FontAwesomeIcon icon={faTiktok} className="icons" />
              </a>{" "}
              {/* <FontAwesomeIcon icon={faYoutube} className="icons" />{" "} */}
            </div>{" "}
          </div>{" "}
        </Col>
      </Row>
      <hr className="mt-5" />
      <Row>
        <Col>
          {isLoggedIn() && <EventComments eventData={eventData} onNewComment={handleNewComment} />}
        </Col>
      </Row>
    </Container>
  );
};
