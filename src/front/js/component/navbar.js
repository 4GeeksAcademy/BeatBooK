import React from "react";
import { Navbar, Nav, Container, Col, Row } from "react-bootstrap";

import { Search } from "./navbar/search";
import { Login } from "./navbar/login";
import "./navbar/buttonJoin.css";

export const AppNavbar = () => {
  return (
    <Container className="mb-3 mt-3 ">
      <Navbar
        bg="light"
        expand="lg"
        className="rounded p-3"
        style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
      >
        {/* Logo o nombre de la aplicación */}
        <Navbar.Brand href="/">BeatBooK</Navbar.Brand>

        {/* Botón para colapsar el menú en dispositivos pequeños */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        {/* Contenido del menú */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Container fluid>
            <Row className="align-items-center flex-column flex-lg-row">
              {/* Categorías */}
              <Col xs={12} lg={3}>
                <Nav
                  className="me-auto my-2 my-lg-0"
                  style={{ maxHeight: "100px" }}
                  navbarScroll
                >
                  <Nav>Todas las categorías</Nav>
                </Nav>
              </Col>

              {/* Barra de búsqueda */}
              <Col xs={12} lg={6}>
                <Search />
              </Col>

              {/* Botones de registro e inicio de sesión */}
              <Col xs={12} lg={3} className="d-flex justify-content-end">
                <Nav className="ps-2 pe-0 m-0">
                  <Login />
                </Nav>
              </Col>
            </Row>
          </Container>
        </Navbar.Collapse>
      </Navbar>
    </Container>
  );
};
