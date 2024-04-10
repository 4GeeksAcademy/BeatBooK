import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Form, Col, Row, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UploadMedia } from "../component/createEvent/UploadMedia";
import { Puff } from 'react-loader-spinner'; // Importa Puff en lugar de Loader

export const CreateEventMedia = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();
    const [uploadSuccessful, setUploadSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false); // Nuevo estado para controlar la carga

    const handleUpload = async (urls) => {
        setIsLoading(true); // Comienza la carga
        console.log('Cargando:', isLoading); // Agrega esta línea
        // Tu código aquí...
        setUploadSuccessful(true);
        setIsLoading(false); // Termina la carga
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        if (uploadSuccessful) {
            navigate(`/events/${id}`);
        }
    };

    return (
        <Container className="mt-5 create_event_container">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col xs={12} md={12}>
                        <UploadMedia onUpload={handleUpload} />
                    </Col>
                </Row>
                <div className="create_event">
                    {isLoading ? (
                        <div className="text-center mt-5 pt-5 pb-5">
                            <div className="spinner-border" style={{ width: '5rem', height: '5rem' }} role="status">
                                <span className="visually-hidden">Loading...</span>
                            </div>
                        </div>
                    ) : (
                        <button className="create_event_button" type="submit" disabled={!uploadSuccessful}>
                            Subir Media
                        </button>
                    )}
                </div>
            </Form>
        </Container>
    );
};