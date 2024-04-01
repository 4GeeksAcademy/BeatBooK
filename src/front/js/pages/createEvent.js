import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import "../component/createEvent/createEvent.css";
import { MembersGet } from "../component/createEvent/membersGet";
import { CreateMusicGroup } from "../component/createEvent/createMusicGroup";

export const CreateEvent = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");

    if (!token) {
      navigate("/");
    }
  }, []);

  //   Comentar de la Linea 8 a la 17 si quieres trabajar tranquilamente en el view si no te pedira que inicies sesion

  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    description: "",
    address: "",
    price: "",
    pictures: "",
    media: "",
    social_networks: "",
    user_id: "",
    place_id: "",
    band_id: "",
  });

  const handleChange = (e) => {
    setEventData({ ...eventData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/events", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(eventData),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <Container className="mt-5 create_event_container">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={6}>
            {/* Campos a la izquierda */}
            <Form.Group controlId="formEventName">
              <Form.Label className="title_inputs">
                Nombre del evento
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del evento"
                name="name"
                onChange={handleChange}
                className="myFormControlClass"
              />
            </Form.Group>

            <Form.Group controlId="formEventDate">
              <Form.Label className="title_inputs">Fecha del evento</Form.Label>
              <Form.Control
                type="date"
                placeholder="Fecha del evento"
                name="date"
                onChange={handleChange}
                className="myFormControlClass"
              />
            </Form.Group>

            <Form.Group controlId="formEventDescription">
              <Form.Label className="title_inputs">
                Descripción del evento
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Descripción del evento"
                name="description"
                onChange={handleChange}
                maxLength={2500}
                className=" myFormControlClass_textarea"
              />
            </Form.Group>

            <Form.Group controlId="formEventAddress">
              <Form.Label className="title_inputs">
                Dirección del evento
              </Form.Label>
              <Row>
                <Col xs="12">
                  <Form.Control
                    type="text"
                    placeholder="Calle"
                    name="address"
                    onChange={handleChange}
                    className="myFormControlClass"
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Ciudad"
                    name="city"
                    onChange={handleChange}
                    className="myFormControlClass"
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="País"
                    name="country"
                    onChange={handleChange}
                    className="myFormControlClass"
                  />
                </Col>
              </Row>
            </Form.Group>

            <Form.Group controlId="formEventPrice">
              <Form.Label className="title_inputs">
                Precio del evento
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Precio del evento"
                name="price"
                onChange={handleChange}
                className="myFormControlClass"
              />
            </Form.Group>
          </Col>

          <Col xs={12} md={6}>
            {/* Campos a la derecha */}
            <Form.Group>
              <Form.Label className="title_inputs">
                Imagen principal del evento
              </Form.Label>
              <Form.Control
                type="file"
                name="mainImage"
                onChange={handleChange}
                className="myFormControlClass"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label className="title_inputs">Fotos y videos</Form.Label>
              <Form.Control
                type="file"
                name="media"
                onChange={handleChange}
                className="myFormControlClass"
                multiple
              />
            </Form.Group>

            {/* Aquí puedes agregar los campos para los miembros y los grupos */}

            <Form.Group controlId="formEventInstagram">
              <Form.Label className="title_inputs">Instagram</Form.Label>
              <Form.Control
                type="text"
                placeholder="Link de Instagram"
                name="instagram"
                onChange={handleChange}
                className="myFormControlClass"
              />
            </Form.Group>

            <Form.Group controlId="formEventYoutube">
              <Form.Label className="title_inputs">Youtube</Form.Label>
              <Form.Control
                type="text"
                placeholder="Link de Youtube"
                name="youtube"
                onChange={handleChange}
                className="myFormControlClass"
              />
            </Form.Group>
            <Form.Group controlId="formEventYoutube">
              <Form.Label className="title_inputs">Tiktok</Form.Label>
              <Form.Control
                type="text"
                placeholder="Link de Tiktok"
                name="youtube"
                onChange={handleChange}
                className="myFormControlClass"
              />
            </Form.Group>
            <MembersGet />
            {/* <CreateMusicGroup /> */}
          </Col>
        </Row>
        <div className="create_event">
          <button className="create_event_button">Crear evento</button>
        </div>
      </Form>
    </Container>
  );
};
