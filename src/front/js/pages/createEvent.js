import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import "../component/createEvent/createEvent.css";
import { MembersGet } from "../component/createEvent/membersGet";
import { PlacesGet } from "../component/createEvent/PlacesGet";
import { BandsGet } from "../component/createEvent/BandsGet";
import { UploadMainImage } from "../component/createEvent/UploadMaintImage";
import { UploadMedia } from "../component/createEvent/UploadMedia";
import { CreateMusicGroup } from "../component/createEvent/createMusicGroup";
import { jwtDecode } from "jwt-decode";

export const CreateEvent = () => {
  const { store, actions } = useContext(Context); // Agrega actions aquí
  const navigate = useNavigate();

  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    description: "",
    address: "",
    price: "",
    picture_url: "",
    social_networks: "",
    creator_id: "",
    place_id: "",
    band_id: "",
  });

  const [selectedFiles, setSelectedFiles] = useState({
    main: null,
    media: [],
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");

    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      console.log(decodedToken.sub);

      if (decodedToken.sub) {
        setEventData((prevState) => {
          const updatedState = { ...prevState, creator_id: decodedToken.sub };
          // console.log(updatedState); // Debería mostrar el estado actualizado
          return updatedState;
        });
      } else {
        console.log("El token decodificado no contiene la propiedad sub");
      }
    } else {
      navigate("/");
    }
  }, []);

  const handleChange = (e) => {
    const value = e.target.value || null; // Si el valor es una cadena vacía, usa null
    setEventData({ ...eventData, [e.target.name]: value });
  };

  const handleMembersChange = (selected) => {
    setEventData({ ...eventData, members: selected.map((item) => item.value) });
  };

  const uploadFilesAndCreateEvent = async () => {
    let mainImageUrl = "";
    if (selectedFiles.mainImage) {
      const data = await actions.uploadEventPicture(selectedFiles.mainImage);
      mainImageUrl = data.url;
    }

    // Sube los archivos de medios
    const mediaUrls = [];
    for (let i = 0; i < selectedFiles.media.length; i++) {
      const data = await actions.uploadEventMedia(selectedFiles.media[i]);
      mediaUrls.push(data.url);
    }

    // Crea el evento con las URLs de los archivos subidos
    const completeEventData = {
      ...eventData,
      user_id: store.user_id,
      picture_url: mainImageUrl,
      media: mediaUrls.join(","),
    };
    const data = await actions.createEvent(completeEventData);
    console.log(data);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    uploadFilesAndCreateEvent();
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
                <PlacesGet
                  onChange={(selected) =>
                    setEventData({ ...eventData, place_id: selected.value })
                  }
                />
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
            <UploadMainImage
              onUpload={(url) =>
                setEventData({ ...eventData, picture_url: url })
              }
            />
            <UploadMedia
              onUpload={(urls) =>
                setEventData({ ...eventData, media: urls.join(",") })
              }
            />
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
            <Form.Group controlId="formEventTiktok">
              <Form.Label className="title_inputs">Tiktok</Form.Label>
              <Form.Control
                type="text"
                placeholder="Link de Tiktok"
                name="tiktok"
                onChange={handleChange}
                className="myFormControlClass"
              />
            </Form.Group>
            <MembersGet onChange={handleMembersChange} />

            <BandsGet
              onChange={(selected) =>
                setEventData({ ...eventData, band_id: selected.value })
              }
            />
            {/* <CreateMusicGroup /> */}
          </Col>
        </Row>
        <div className="create_event">
          <button className="create_event_button" type="submit">
            Crear evento
          </button>
        </div>
      </Form>
    </Container>
  );
};
