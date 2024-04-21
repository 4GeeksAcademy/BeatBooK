import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import "../component/createEvent/createEvent.css";
import { toast } from "react-toastify";

export const CreatePlace = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const [placeData, setPlaceData] = useState({
        name: "",
        description: "",
        address: "",
        phone: "",
        instagram: "",
        tiktok: "",
        profile_picture: null,
        banner_picture: null,
    });

    const handleChange = (e) => {
        const value = e.target.value;
        setPlaceData({ ...placeData, [e.target.name]: value });
    };

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            const response = await fetch(`${process.env.BACKEND_URL}api/places`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(placeData),
            });
            if (response.status === 400) {
                toast.error("Ya tienes una banda creada.");
            } else if (response.status === 409) {
                toast.error('Miembros en otra banda.');
            } else {
                // Extraer el ID de la banda de la respuesta del servidor
                const { id } = await response.json();
                const nextPageUrl = `/lugar/registre/media/${id}`;
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
                        <Form.Group controlId="formBandtName">
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
                        <Form.Group controlId="formEventAddress">
                            <Form.Label className="title_inputs">Dirección del lugar</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Dirección del lugar"
                                name="address"
                                onChange={handleChange}
                                className="myFormControlClass"
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formEventDescription">
                            <Form.Label className="title_inputs">
                                Descripción de lugar
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
                        <Form.Group controlId="formEventPhone">
                            <Form.Label className="title_inputs">Teléfono</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Teléfono"
                                name="phone"
                                onChange={handleChange}
                                className="myFormControlClass"
                                required
                            />
                        </Form.Group>
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
