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
    const value = e.target.value || null;
    setBandData({ ...bandData, [e.target.name]: value });
  };



  const xcreateBand = async () => {
    try {
      const completeBandData = { ...bandData };
      console.log("completeBandData:", completeBandData);
      const data = await actions.createBand(completeBandData);
      if (data && data.id) {
        setBandData({ ...bandData, id: data.id });
        console.log("Band data with ID:", bandData);
        return data.id;
      } else {
        throw new Error("Los datos de la banda no son válidos");
      }
    } catch (error) {
      console.error("Error al crear la banda: ", error);
      throw error; // Propaga el error para que pueda ser manejado por la función handleSubmit
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const bandId = await xcreateBand();
      console.log("Banda creada con éxito");
      navigate(`/banda/registre/media/${bandId}`); // cambiar a register
      toast.success("Banda creada con éxito");
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
  onChange={(selected) =>
    setBandData({
      ...bandData,
      members: [
        ...bandData.members,
        {
          user_id: selected.id,
          user_username: selected.username,
          user_profile_image_url: selected.profile_image_url
        }
      ]
    })
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
              onChange={(selected) =>
                setBandData({ ...bandData, events_id: selected.value })
              }
            />

            <CategoriesGet
              onChange={(selected) =>
                setBandData({
                  ...bandData,
                  musical_categories: [
                    ...bandData.musical_categories,
                    {
                      musical_category_id: selected.value.id,
                      musical_category_name: selected.value.name,
                    }
                  ]
                })
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

