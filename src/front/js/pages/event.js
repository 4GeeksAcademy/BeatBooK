import React from "react";
import { useEffect, useState, useContext } from "react";
import { Context } from "../store/appContext";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Button, Modal } from "react-bootstrap";
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
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InstagramIcon from '@material-ui/icons/Instagram';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import FacebookIcon from '@material-ui/icons/Facebook';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';



const shareUrl = window.location.href;
const shareText = 'Mira este increíble evento!';

const shareOnWhatsApp = () => {
  const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(shareText)}%20${encodeURIComponent(shareUrl)}`;
  window.open(whatsappUrl);
};

function shareOnFacebook() {
  const url = 'https://www.facebook.com/sharer/sharer.php?u=' + encodeURIComponent(document.URL);
  window.open(url, '_blank');
}

function copyToClipboard() {
  const dummy = document.createElement('input');
  document.body.appendChild(dummy);
  dummy.value = window.location.href;
  dummy.select();
  document.execCommand('copy');
  document.body.removeChild(dummy);
  toast('Enlace copiado al portapapeles. Pégalo en tu publicación de Instagram o Donde tu quieras.');
}



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
  const { actions, store } = useContext(Context);
  const [eventData, setEventData] = useState(null);
  const [refreshComments, setRefreshComments] = useState(false);
  const [refreshAssistances, setRefreshAssistances] = useState(false);


  useEffect(() => {
    const fetchPrivateData = async () => {
      try {
        await actions.getPrivateData();

      } catch (error) {
        console.error('Error al obtener datos privados:', error);
      }
    }
    fetchPrivateData();
  }, []);

  useEffect(() => {
    actions.getEvent(id).then((data) => {
      setEventData(data);
      console.log("eventData", data);
    });
  }, [id, refreshComments, refreshAssistances]);

  const navigate = useNavigate();



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
    console.log("currentUser", store.currentUser);

  }, [eventData]);





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

  const [showModal, setShowModal] = useState(false);

  const handleDeleteEvent = async () => {
    try {
      await actions.deleteEvent(eventData.id);
      navigate('/home');
      toast.success('Evento borrado correctamente');
    } catch (error) {
      console.error('Error al borrar el evento:', error);

    }
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleConfirmDelete = () => {
    handleDeleteEvent();
    setShowModal(false);
  };


  if (!eventData) {
    return <div className="text-center mt-5 pt-5 pb-5">
      <div className="spinner-border" style={{ width: '5rem', height: '5rem' }} role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>;
  }

  return (
    <Container className="pt-5 evento">
      <Row>
        <div className="d-flex justify-content-center align-items-center text-center pt-3">
          {store.user && eventData.creator_id === store.user.id && (
            <button onClick={handleOpenModal} className="report-button">Borrar evento</button>
          )}

        </div>

        <Modal show={showModal} onHide={handleCloseModal}>
          <Modal.Header closeButton>
            <Modal.Title>Confirmar borrado</Modal.Title>
          </Modal.Header>
          <Modal.Body>¿Estás seguro de que quieres borrar tu evento?</Modal.Body>
          <Modal.Footer>
            <button type="button" className="btn btn-primary text-black" onClick={handleCloseModal}>
              No
            </button>
            <button type="button" className="btn btn-danger text-black" onClick={handleConfirmDelete}>
              Sí
            </button>
          </Modal.Footer>
        </Modal>


        <div className="d-flex justify-content-center mb-3">
          <h1>{eventData.name}</h1>
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
              <h5  >Compartir en:</h5>
            </div>
            <button style={{ background: 'none', border: 'none' }} onClick={shareOnWhatsApp}>
              <div style={{ color: '#25D366', transition: 'color 0.3s ease-in-out' }} onMouseOver={(e) => e.currentTarget.style.color = '#128C7E'} onMouseOut={(e) => e.currentTarget.style.color = '#25D366'}>
                <WhatsAppIcon style={{ fontSize: 40 }} />
              </div>
            </button>
            <button style={{ background: 'none', border: 'none' }} onClick={shareOnFacebook} className="p-2">
              <div style={{ color: '#3b5998', transition: 'color 0.3s ease-in-out' }} onMouseOver={(e) => e.currentTarget.style.color = '#8b9dc3'} onMouseOut={(e) => e.currentTarget.style.color = '#3b5998'}>
                <FacebookIcon style={{ fontSize: 40 }} />
              </div>
            </button>
            <button style={{ background: 'none', border: 'none' }} onClick={copyToClipboard}>
              <div style={{ color: '#C13584', transition: 'color 0.3s ease-in-out' }} onMouseOver={(e) => e.currentTarget.style.color = '#E1306C'} onMouseOut={(e) => e.currentTarget.style.color = '#C13584'}>
                <InstagramIcon style={{ fontSize: 40 }} />
              </div>
            </button>


            <hr className="mt-5 " />{" "}

            <div className="d-flex justify-content-center align-items-center text-center pt-3">

              {" "}
              <Link to="/paginafalsa" className="report-button fs-3">
                Reportar evento
              </Link>
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
