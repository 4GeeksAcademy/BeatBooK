import React, { useState } from "react";
import { Button, Modal, Form, Container } from "react-bootstrap";
import "./buttonJoin.css";
import "./modalJoin.css";
import { SessionLog } from "./sessionLog";

export const Login = ({ onClick }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = (event) => {
    event.stopPropagation();
    setShow(true);
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Container
      className="login d-flex align-items-center justify-content-center"
      style={{ height: "100%" }}
    >
      <button
        className="buttonSpecial"
        onClick={
          onClick
            ? (event) => {
                event.stopPropagation();
                onClick(event);
              }
            : handleShow
        }
      >
        Inicia sesión
      </button>

      <Modal show={show} onHide={handleClose} onClick={handleModalClick}>
        <Modal.Header closeButton>
          <Modal.Title>Iniciar sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body closeButton>
          <form className="form">
            <div className="flex-column">
              <label>Email </label>
            </div>
            <div className="inputForm">
              <input
                type="text"
                className="inputx bg-transparent "
                placeholder="pon tu Email"
              />
            </div>

            <div className="flex-column">
              <label>Contraseña </label>
            </div>
            <div className="inputForm">
              <input
                type="password"
                className="inputx"
                placeholder="Pon tu contraseña"
              />
            </div>

            <div className="flex-row">
              <div>
                <input className="pe-1 me-1" type="checkbox" />
                <label>Recuerdame </label>
              </div>
              <span className="span">¿Olvidaste la contraseña?</span>
            </div>
            <button className="button-submit" onClick={handleClose}>
              Iniciar sesión
            </button>
            <p className="p">
              ¿No tienes cuenta?{" "}
              <button className="span" onClick={handleShow}>
                Registrate
              </button>
            </p>
            <p className="p line">O con</p>

            <div className="flex-row">
              <button className="btn google">Google</button>
              <button className="btn apple">Apple</button>
            </div>
          </form>
        </Modal.Body>
        {/* <Modal.Footer></Modal.Footer> */}
      </Modal>
    </Container>
  );
};
