import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import "../component/createEvent/createEvent.css";
import { PlacesGet } from "../component/createEvent/PlacesGet";
import { BandsGet } from "../component/createEvent/BandsGet";
import { UploadMainImage } from "../component/createEvent/UploadMaintImage";
import { UploadMedia } from "../component/createEvent/UploadMedia";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";


export const CreatePlace = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [placeData, setplaceData] = useState({
    name: "",
    description: "",
    address: "",
    phone: "",
    profile_picture: "",
    banner_picture: "",
    instagram: "",
    tiktok: "",
  });

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");

    if (token) {
      const decodedToken = jwtDecode(token);
      console.log(decodedToken);
      console.log(decodedToken.sub);

      if (decodedToken.sub) {
        setplaceData((prevState) => {
          const updatedState = { ...prevState, creator_id: decodedToken.sub };
          return updatedState;
        });
      } else {
        console.log("El token decodificado no contiene la propiedad sub");
      }
    } else {
      navigate("/");
    }
  }, [navigate]);

  const [selectedFiles, setSelectedFiles] = useState({
    main: null,
    media: [],
  });

  const handleChange = (e) => {
    const value = e.target.value || null;
    setplaceData({ ...placeData, [e.target.name]: value });
  };

  const xcreatePlace = async () => {

    const address = `${street}, ${city}, ${country}`;
 
    const completePlaceData = {
      ...placeData,
      user_id: store.user_id,
      address: address,
    };
    const data = await actions.createPlace(completePlaceData);
    console.log(data);

    setPlaceData({ ...placeData, id: data.id });

    return data.id;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const placeId = await xcreatePlace();
      console.log("lugar creado con éxito");
      navigate(`/place/registre/media/${placeId}`);
      toast.success("lugar creado con éxito");
    } catch (error) {
      console.error("Error al crear el lugar: ", error);
      toast.error("Error al crear el lugar");
    }
  };

  return (
    <Container className="mt-5 create_place_container">
      <Form onSubmit={handleSubmit}>
        <Row>
          <Col xs={12} md={6}>
            {/* Campos a la izquierda */}
            <Form.Group controlId="formPlaceName">
              <Form.Label className="title_inputs">
                Nombre del lugar
              </Form.Label>
              <Form.Control
                type="text"
                placeholder="Nombre del lugar"
                name="name"
                onChange={handleChange}
                className="myFormControlClass"
                required
              />
            </Form.Group>

            <Form.Group controlId="formPlaceDescription">
              <Form.Label className="title_inputs">
                Descripción del lugar
              </Form.Label>
              <Form.Control
                as="textarea"
                placeholder="Descripción del lugar"
                name="description"
                onChange={handleChange}
                maxLength={2500}
                className=" myFormControlClass_textarea"
                required
              />
            </Form.Group>

            <Form.Group controlId="formPlaceAddress">
              <Form.Label className="title_inputs">
                Dirección del lugar
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
{/* Campos a la derecha */}
    

          <Col xs={12} md={6}>
          <Form.Group controlId="formPlacePhone mt-0">
              <Form.Label className="title_inputs ">Telefono</Form.Label>
              <Form.Control
                type="text"
                placeholder="Telefono"
                name="phone"
                onChange={handleChange}
                className="myFormControlClass"
                required
              />
            </Form.Group>

            <Form.Group controlId="formPlaceInstagram mt-0">
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

            <Form.Group controlId="formPlaceTiktok">
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
            

          </Col>
        </Row>
        <div className="create_place">
          <button className="create_place_button" type="submit">
            Crear lugar
          </button>
        </div>
      </Form>
    </Container>
  );
};
