import React from "react";
import { Navbar, Nav, FormControl, Button, Form } from "react-bootstrap";

export const AppNavbar = () => {
  return (
    <Navbar
      bg="light"
      expand="lg"
      className="rounded"
      style={{ justifyContent: "space-between" }}
    >
      {/* Logo o nombre de la aplicación */}
      <Navbar.Brand href="/">Mi App</Navbar.Brand>

      {/* Botón para colapsar el menú en dispositivos pequeños */}
      <Navbar.Toggle aria-controls="basic-navbar-nav" />

      {/* Contenido del menú */}
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          {/* Vistas de la página */}
          <Nav.Link href="/">Inicio</Nav.Link>
          <Nav.Link href="/recomendados">Recomendados</Nav.Link>
        </Nav>

        {/* Barra de búsqueda */}
        <Form className="mb-3 d-flex" style={{ width: "50%" }}>
          <FormControl
            type="text"
            placeholder="Buscar"
            aria-label="Buscar"
            aria-describedby="basic-addon2"
            className="mr-sm-2"
          />
          <Button variant="outline-success">
            <span className="glyphicon glyphicon-search"></span>
          </Button>
        </Form>

        {/* Botones de registro e inicio de sesión */}
        <Nav>
          <Nav.Link href="/registro">Registro</Nav.Link>
          <Nav.Link href="/inicio-sesion">Iniciar Sesión</Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};
