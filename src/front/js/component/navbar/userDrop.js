import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useContext } from "react";
import { Context } from "../../store/appContext";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export const UserDrop = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();
  const handleLogOut = () => {
    actions.logOut();
    localStorage.removeItem("jwt-token");
    toast.success("Has cerrado sesión correctamente");
    navigate("/");
  };
  // useEffect(() => {
  //   actions.getPrivateData();
  // }, []);
  //este useEffect me tira error

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Nav className="ms-auto">
        <NavDropdown
          title={store.user ? store.user.username : "Acceder"}
          id="basic-nav-dropdown"
        >
          <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
          <NavDropdown.Divider />
          <NavDropdown.Item onClick={handleLogOut}>
            Cerrar sesión
          </NavDropdown.Item>
        </NavDropdown>
      </Nav>
    </Navbar>
  );
};
