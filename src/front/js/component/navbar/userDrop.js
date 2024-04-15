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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const UserDrop = () => {
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  const handleLogOut = () => {
    actions.logOut();
    localStorage.removeItem("jwt-token");
    toast.success("Has cerrado sesión correctamente");
    navigate("/");
  };

  useEffect(() => {
    console.log("store.user", store.user);
    if (!store.user) {
      actions.getUser(); // obtén los datos del usuario cuando el componente se monta
    }
    console.log("store.user", store.user.username);
  }, []); // pasa un array vacío como segundo argumento pa



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
            <span className="username text-light">
              {store.user ? store.user.username : "Acceder"}
            </span>
            {store.user && store.user.profileimage ? (
              <img
                className="profile-image"
                src={store.user.profileimage}
                alt="Profile image"
              ></img>
            ) : (
              <FontAwesomeIcon icon={faUser} className="faUser" />
            )}
          </Dropdown.Toggle>

          <Dropdown.Menu align="end">
            <Dropdown.Item href="/profile/">Perfil</Dropdown.Item>
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
