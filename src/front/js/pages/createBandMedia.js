import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Form, Col, Row, Container } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { UploadBandBanner } from "../component/band/UploadBandBanner";
import { UploadBandProfile } from "../component/band/UploadBandProfile";
import { toast } from 'react-toastify';

export const CreateBandMedia = () => {
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

    const handleSubmit = (band) => {
        band.preventDefault();
        if (uploadSuccessful) {
            navigate(`/banda/${id}`);
        }
    };

    return (
        <Container className="mt-5 create_event_container">
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col xs={12} md={12}>
                        <UploadBandProfile onUpload={handleUpload} />
                        <UploadBandBanner onUpload={handleUpload} setUploadSuccessful={setUploadSuccessful} />
                    </Col>
                </Row>
                <div className="create_event">
                    <button className="create_event_button" type="submit" disabled={!uploadSuccessful}  >
                        Subir Media
                    </button>
                </div>
            </Form>
        </Container>
    );
};