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


export const CreateEventMedia = () => {
    const { store, actions } = useContext(Context); // Agrega actions aquí
    const navigate = useNavigate();






    return (
        <Container className="mt-5 create_event_container">
            <Form >
                <Row>
                    <Col xs={12} md={12}>
                        <UploadMedia />
                    </Col>
                </Row>
                <div className="create_event">
                    <button className="create_event_button" type="submit">
                        Subir Media
                    </button>
                </div>
            </Form>
        </Container>

    );
};
