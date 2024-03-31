import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import ImagenPrueba from "../component/eventt/imagenEventoPrueba.png";
import "../component/eventt/evento.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInstagram, faYoutube } from "@fortawesome/free-brands-svg-icons";

export const Event = () => {
  // Asegúrate de reemplazar 'eventData' con los datos de tu evento
  const eventData = {
    name: "Luis Mola Mazo",
    date: "28/08/2024 20:00",
    description:
      "¡Ven a este evento increíble! ¡No te lo pierdas! ¡Trae a tus amigos! pop rock todo lo que te gusta 1 bebida incluida con tu entrada",
    members: ["Miembro 1", "Miembro 2"],
    price: "10$",
    location: "Canarias, España, Muy cerca de Luis",
    media: [
      "https://imgs.search.brave.com/pWU7M3Fbm2sDBzwUZ6RLgOy9vFxlRRPFcKzfnD7Wbkc/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9iaWxs/ZXR0by5lcy9ibG9n/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE5/LzA0L2hhbm55LW5h/aWJhaG8tMzg4NTc5/LXVuc3BsYXNoLWUx/NTU0NDYxMDYzNTE3/LTgwMHg0NDAuanBn",
      "https://imgs.search.brave.com/OxBEau_JAbPgCDg7yHVB7BnQ9m5RH9PRITLAu3MQZM0/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9iaWxs/ZXR0by5lcy9ibG9n/L3dwLWNvbnRlbnQv/dXBsb2Fkcy8yMDE5/LzA0L2Rlbi00NTM1/NTEtdW5zcGxhc2gt/ZTE1NTQyODY5NjU1/NjQtODAweDQ0MC5q/cGc",
    ],
    teams: ["AC/DC", "Queen"],
  };

  return (
    <Container className="pt-5">
      <Row>
        <Col
          md={6}
          className="d-flex-column justify-content-center align-items-center text-center"
        >
          <img
            src={ImagenPrueba}
            alt="Imagen del evento"
            className="img-event"
          />
          {/* <div className="pt-3">
            <h5>{eventData.date}</h5>
          </div> */}
          <hr />
          <div className="pt-3">
            <p className="px-4">{eventData.description}</p>
          </div>
          <div>
            <h4>
              Miembros(<span>{eventData.members.length}</span>)
            </h4>
            <ul className="d-flex pt-3 " style={{ listStyle: "none" }}>
              {eventData.members.map((member, index) => (
                <li key={index} className="me-3">
                  <img
                    className="img-members"
                    src="https://imgs.search.brave.com/c9wFuWkOoNuR2FNhCW0ztGtYymvVWqn_jiN2VX4YWXg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YWNlc2hvd2Jpei5j/b20vaW1hZ2VzL3Bo/b3RvL2RhdmlkX2d1/ZXR0YS5qcGc"
                  />
                  <p>{member}</p>
                </li>
              ))}
            </ul>
          </div>

          <div className="pt-3">
            <h4>
              Fotos y Videos(<span>{eventData.media.length}</span>)
            </h4>
            <div div className="d-flex justify-content-start pt-3">
              {eventData.media.map((imageUrl, index) => (
                <img
                  className="img-media me-3"
                  key={index}
                  src={imageUrl}
                  alt="Imagen del evento"
                />
              ))}
            </div>
          </div>
          <div className="pt-3  ">
            <h4>
              Grupos(<span>{eventData.teams.length}</span>)
            </h4>
            <div
              className="d-flex justify-content-start pt-3"
              style={{ listStyle: "none" }}
            >
              {eventData.teams.map((team, index) => (
                <div key={index} className="me-3 teams">
                  {/* <img
                    className="img-teams"
                    src="https://imgs.search.brave.com/PilnYXebBXizqnXHc5VYS_Dtd68tNsIM9kx_z84bR6I/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9zdDUu/ZGVwb3NpdHBob3Rv/cy5jb20vNzkyOTYw/OC82NDc1MS9pLzQ1/MC9kZXBvc2l0cGhv/dG9zXzY0NzUxNzA5/Ni1zdG9jay1waG90/by1oYXJkLXJvY2st/bmVvbi1zaWduLWlz/b2xhdGVkLmpwZw"
                  /> */}
                  <p>{team}</p>
                </div>
              ))}
            </div>
          </div>
        </Col>
        <Col
          md={6}
          className="d-flex-column justify-content-center align-items-center text-center"
        >
          <h2>{eventData.name}</h2>
          <div className="d-flex justify-content-center align-items-center">
            <div className="event-details">
              <h5 className="p-2">{eventData.date}</h5>
              <h5 className="p-2">{eventData.location}</h5>
              <h5 className="p-2">
                {eventData.price === "0" ? "Gratis" : eventData.price}
              </h5>
              <div className="event-map">Mapa aquí</div>
            </div>
          </div>
          <div className="d-flex-column justify-content-center align-items-center text-center">
            <div className="d-flex justify-content-center align-items-center text-center pt-3">
              <button className="asist-button">Asistir</button>
            </div>
            <div className="d-flex justify-content-center align-items-center text-center pt-3">
              <button className="share-button">Compartir</button>
            </div>
            <hr className="mt-5 " />
            <div className="d-flex justify-content-center align-items-center text-center pt-3">
              <button className="chat-button">Chat de evento</button>
            </div>
            <div
              className="d-flex justify-content-center align-items-center
            text-center pt-3"
            >
              <button className="report-button">Reportar evento</button>
            </div>
            <div className="pt-4">
              <h4>Redes Sociales</h4>
              <FontAwesomeIcon icon={faInstagram} className="icons" />
              <FontAwesomeIcon icon={faYoutube} className="icons" />
            </div>
          </div>
        </Col>
      </Row>
      <hr className="mt-5" />
    </Container>
  );
};
