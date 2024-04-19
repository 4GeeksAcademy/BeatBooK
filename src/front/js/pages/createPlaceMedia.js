import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Form, Col, Row, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UploadMedia } from "../component/createEvent/UploadMedia";
import { UploadMainImage } from "../component/createEvent/UploadMaintImage";
import { toast } from 'react-toastify';

export const CreatePlaceMedia = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const { id } = useParams();
    const [uploadSuccessful, setUploadSuccessful] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    const handleUpload = async (url) => {
        setIsLoading(true);
        if (url) {
            setUploadSuccessful(true);

        } else {
            toast.error("Error al subir la imagen");
        }
        setIsLoading(false);
    };

    const handleSubmit = (place) => {
        place.preventDefault();
        if (uploadSuccessful) {
            navigate(`/places/${id}`);
        }
    };

    return (
        <Container className="mt-5 create_place_container">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col xs={12} md={12}>
                        <UploadMainImage onUpload={handleUpload} />
                        <UploadMedia onUpload={handleUpload} setUploadSuccessful={setUploadSuccessful} />
                    </Col>
                </Row>
                <div className="create_place">
                    <button className="create_place_button" type="submit" disabled={!uploadSuccessful}  >
                        Subir Media
                    </button>
                </div>
            </Form>
        </Container>
    );
};