import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Dropdown from "react-bootstrap/Dropdown"; // Mueve esta línea aquí
import { useContext } from "react";
import { Context } from "../../store/appContext";
import { useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import "./profileImage.css";

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
  //   if (!store.user) {
  //     actions.getUser(); // obtén los datos del usuario cuando el componente se monta
  //   }
  // }, []); // pasa un array vacío como segundo argumento pa

  // ...

  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Nav className="ms-auto">
        <Dropdown>
          <Dropdown.Toggle
            className="p-0 m-0"
            variant=""
            id=""
            style={{ border: "none", backgroundColor: "transparent" }}
          >
            <span className="username">
              {store.user ? store.user.username : "Acceder"}
            </span>
            {store.user && store.user.profile_image_url ? (
              <img
                className="profile-image"
                src={store.user.profile_image_url}
                alt="Profile image"
              ></img>
            ) : (
              <img
                className="profile-image"
                src="/beatBoxVertical.png"
                alt="Default profile image"
              ></img>
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="#action/3.1">Perfil</Dropdown.Item>
            <Dropdown.Item href="#action/3.2">Eventos</Dropdown.Item>
            <Dropdown.Item href="#action/3.3">Something</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={handleLogOut}>Cerrar sesión</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </Nav>
    </Navbar>
  );
};