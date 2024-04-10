import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import "../component/createEvent/createEvent.css";
// import { MembersGet } from "../component/createEvent/membersGet";
import { PlacesGet } from "../component/createEvent/PlacesGet";
import { BandsGet } from "../component/createEvent/BandsGet";
import { UploadMainImage } from "../component/createEvent/UploadMaintImage";
import { UploadMedia } from "../component/createEvent/UploadMedia";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";


export const CreateEvent = () => {
  const { store, actions } = useContext(Context); // Agrega actions aquí
  const navigate = useNavigate();

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [eventData, setEventData] = useState({
    name: "",
    date: "",
    description: "",
    price: "",
    picture_url: "",
    social_networks: "",
    creator_id: "",
    place_id: "",
    band_id: "",
    id: "",
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
      // Navega solo si no hay token
      navigate("/");
    }
  }, [navigate]); // Agrega navigate como dependencia

  const [selectedFiles, setSelectedFiles] = useState({
    main: null,
    media: [],
  });

  const handleMainImageUpload = (url) => {
    setEventData({ ...eventData, picture_url: url });
  };

  const handleChange = (e) => {
    const value = e.target.value || null; // Si el valor es una cadena vacía, usa null
    setEventData({ ...eventData, [e.target.name]: value });
  };

  // const handleMembersChange = (selected) => {
  //   setEventData({ ...eventData, members: selected.map((item) => item.value) });
  // };

  const xcreateEvent = async () => {
    // Combina los valores de street, city y country en una sola cadena
    const address = `${street}, ${city}, ${country}`;

    // Crea el evento
    const completeEventData = {
      ...eventData,
      user_id: store.user_id,
      address: address, // Añade la dirección completa a eventData
    };
    const data = await actions.createEvent(completeEventData);
    console.log(data);

    // Actualiza el estado con la respuesta de la creación del evento
    setEventData({ ...eventData, id: data.id });

    // Devuelve el ID del evento creado
    return data.id;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const eventId = await xcreateEvent();
      console.log("Evento creado con éxito");
      navigate(`/event/registre/media/${eventId}`);
      toast.success("Evento creado con éxito");
    } catch (error) {
      console.error("Error al crear el evento: ", error);
      toast.error("Error al crear el evento");
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
                Nombre del evento
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del evento"
                name="name"
                onChange={handleChange}
                className="myFormControlClass"
                required
              />
            </Form.Group>

            <Form.Group controlId="formEventDate">
              <Form.Label className="title_inputs">
                Fecha y hora del evento
              </Form.Label>
              <Form.Control
                type="datetime-local"
                placeholder="Fecha y hora del evento"
                name="date"
                onChange={handleChange}
                className="myFormControlClass"
                required
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
                required
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
                    onChange={(e) => setStreet(e.target.value)}
                    className="myFormControlClass"
                    required
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="Ciudad"
                    name="city"
                    onChange={(e) => setCity(e.target.value)}
                    className="myFormControlClass"
                    required
                  />
                </Col>
                <Col>
                  <Form.Control
                    type="text"
                    placeholder="País"
                    name="country"
                    onChange={(e) => setCountry(e.target.value)}
                    className="myFormControlClass"
                    required
                  />
                </Col>
              </Row>
            </Form.Group>

          </Col>

          <Col xs={12} md={6}>
            {/* Campos a la derecha */}
            <UploadMainImage onUpload={handleMainImageUpload} />
            {/* <UploadMedia
              onUpload={(urls) =>
                setEventData({ ...eventData, media: urls.join(",") })
              }
            /> */}
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

            {/* <Form.Group controlId="formEventYoutube">
              <Form.Label className="title_inputs">Youtube</Form.Label>
              <Form.Control
                type="text"
                placeholder="Link de Youtube"
                name="youtube"
                onChange={handleChange}
                className="myFormControlClass"
                required
              />
            </Form.Group> */}
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
            {/* <MembersGet onChange={handleMembersChange} /> */}

            <BandsGet
              onChange={(selected) =>
                setEventData({ ...eventData, band_id: selected.value })
              }
            />
            {/* <CreateMusicGroup /> */}
            <PlacesGet
              onChange={(selected) =>
                setEventData({ ...eventData, place_id: selected.value })
              }
              required
            />

            <Form.Group controlId="formEventPrice">
              <Form.Label className="title_inputs">
                Precio del evento
              </Form.Label>
              <Form.Control
                type="number"
                placeholder="Precio del evento"
                name="price"
                onChange={handleChange}
                className="myFormControlClass"
                required
              />
            </Form.Group>
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
