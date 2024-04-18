import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import "../component/createEvent/createEvent.css";
// import { MembersGet } from "../component/createEvent/membersGet";
import { EventGet } from "../component/band/EventGet";
import { UserGet } from "../component/band/UserGet";
import { CategoriesGet } from "../component/band/CategoriesGet ";
import { UploadBandProfile } from "../component/band/UploadBandProfile";
import { UploadMedia } from "../component/createEvent/UploadMedia";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";


export const CreateBand = () => {
  const { store, actions } = useContext(Context); // Agrega actions aquí
  const navigate = useNavigate();


  const [bandData, setBandData] = useState({
    name: "",
    description: "",
    profile_picture: "",
    banner_picture: "",
    creator_id: "",
    instagram: "",
    tiktok: "",
    members: [],
    events: [],
    musical_categories: [],
    creator_id: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");

    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      console.log(decodedToken.sub);

      if (decodedToken.sub) {
        setBandData((prevState) => {
          const updatedState = { ...prevState, creator_id: decodedToken.sub };
          //console.log(updatedState); 
          return updatedState;
        });
      } else {
        console.log("El token decodificado no contiene la propiedad sub");
      }

    } else {
      // Navega solo si no hay token
      navigate("/");
    }

  }, [navigate]); // Agrega navigate como dependencia


  const handleChange = (e) => {
    const value = e.target.value;
    setBandData({ ...bandData, [e.target.name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(bandData);
    try {
      const response = await fetch(`${process.env.BACKEND_URL}/api/bands`, {
        method: 'POST',
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(bandData)
      });
      
      if (response.status === 400) {
        toast.error("Ya tienes una banda creada.");
      } else if (response.status === 409) {
        toast.error('Miembros en otra banda.');
      } else {
        // Extraer el ID de la banda de la respuesta del servidor
        const { id } = await response.json();
        const nextPageUrl = `/banda/registre/media/${id}`;
        navigate(nextPageUrl);
        toast.success("Banda creada con éxito");
      }
    } catch (error) {
      console.error("Error al crear la banda: ", error);
      toast.error("Error al crear la banda");
    }
  };
  




  return (
    <Container className="mt-5 create_event_container">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={6}>
            {/* Campos a la izquierda */}
            <Form.Group controlId="formEventName">
              <Form.Label className="title_inputs">
                Nombre de la banda
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre de la banda"
                name="name"
                onChange={handleChange}
                className="myFormControlClass"
                required
              />
            </Form.Group>

            <Form.Group controlId="formEventDescription">
              <Form.Label className="title_inputs">
                Descripción de la banda
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Descripción de la banda"
                name="description"
                onChange={handleChange}
                maxLength={2500}
                className=" myFormControlClass_textarea"
                required
              />
            </Form.Group>

            <UserGet
              onChange={(selected) => {
                selected.map((member, index) => {
                  console.log(member.value)
                  setBandData({
                    ...bandData,
                    members: [
                      ...bandData.members,
                      {
                        id: member.value.id,
                        username: member.value.username,
                        profile_image_url: member.value.profile_image_url
                      }
                    ]
                  })
                })
              }
              }
            />
          </Col>

          <Col xs={12} md={6}>
            {/* Campos a la derecha */}
            <Form.Group controlId="formEventInstagram mt-0">
              <Form.Label className="title_inputs ">Instagram</Form.Label>
              <Form.Control
                type="text"
                placeholder="Link de Instagram"
                name="instagram"
                onChange={handleChange}
                className="myFormControlClass"
                required
              />
            </Form.Group>

            <Form.Group controlId="formEventTiktok">
              <Form.Label className="title_inputs">Tiktok</Form.Label>
              <Form.Control
                type="text"
                placeholder="Link de Tiktok"
                name="tiktok"
                onChange={handleChange}
                className="myFormControlClass"
                required
              />
            </Form.Group>


            <EventGet
              onChange={(selected) => {
                setBandData({
                  ...bandData,
                  events: [
                    ...bandData.events,
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
                console.log(selected.value)
                setBandData({
                  ...bandData,
                  musical_categories: [
                    ...bandData.musical_categories,
                    {
                      id: selected.value.id,
                      name: selected.value.name,
                    }
                  ]
                })
              }
              }
            />

          </Col>

        </Row>
        <div className="create_event">
          <button className="create_event_button" type="submit">
            Crear Banda
          </button>
        </div>
      </Form>
    </Container>
  );
};

