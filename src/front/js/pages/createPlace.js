import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import "../component/createEvent/createEvent.css";
import { UserGet } from "../component/band/UserGet";
import { EventGet } from "../component/band/EventGet";
import { CategoriesGet } from "../component/band/CategoriesGet ";
import { toast } from "react-toastify";

export const CreatePlace = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [placeData, setPlaceData] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    profile_picture: "",
    banner_picture: "",
    instagram: "",
    tiktok: "",
    members: [],
    events: [],
    musical_categories: []
  });

  const handleChange = (e) => {
    const value = e.target.value;
    setPlaceData({ ...placeData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(placeData);
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/places`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(placeData)
      });

      if (response.status === 400) {
        toast.error("Ya tienes un lugar creado.");
      } else if (response.status === 409) {
        toast.error('Miembros en otro lugar.');
      } else {
        const { id } = await response.json();
        const nextPageUrl = `/lugar/registre/media/${id}`;
        navigate(nextPageUrl);
        toast.success("Lugar creado con éxito");
      }
    } catch (error) {
      console.error("Error al crear la lugar: ", error);
      toast.error("Error al crear la lugar");
    }
  };

  return (
    <Container className="mt-5 create_event_container">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={6}>
            <Form.Group controlId="formEventName">
              <Form.Label className="title_inputs">Nombre del lugar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del lugar"
                name="name"
                onChange={handleChange}
                className="myFormControlClass"
                required
              />
            </Form.Group>

            {/* Other form groups for left side */}

            <UserGet
              onChange={(selected) => {
                selected.map((member, index) => {
                  setPlaceData({
                    ...placeData,
                    members: [
                      ...placeData.members,
                      {
                        id: member.value.id,
                        username: member.value.username,
                        profile_image_url: member.value.profile_image_url
                      }
                    ]
                  })
                })
              }}
            />
          </Col>

          <Col xs={12} md={6}>
            <Form.Group controlId="formEventInstagram mt-0">
              <Form.Label className="title_inputs">Instagram</Form.Label>
              <Form.Control
                type="text"
                placeholder="Link de Instagram"
                name="instagram"
                onChange={handleChange}
                className="myFormControlClass"
                required
              />
            </Form.Group>

            {/* Other form groups for right side */}

            <EventGet
              onChange={(selected) => {
                setPlaceData({
                  ...placeData,
                  events: [
                    ...placeData.events,
                    {
                      id: selected.value.id,
                      name: selected.value.name,
                      description: selected.value.description,
                      picture_url: selected.value.picture_url
                    }
                  ]
                });
              }}
            />

            <CategoriesGet
              onChange={(selected) => {
                setPlaceData({
                  ...placeData,
                  musical_categories: [
                    ...placeData.musical_categories,
                    {
                      id: selected.value.id,
                      name: selected.value.name,
                    }
                  ]
                })
              }}
            />
          </Col>
        </Row>
        <div className="create_event">
          <Button className="create_event_button" type="submit">
            Crear lugar
          </Button>
        </div>
      </Form>
    </Container>
  );
};
