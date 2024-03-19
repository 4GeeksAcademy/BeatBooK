import React, { useState } from "react";
import { Button, Modal, Form, Container } from "react-bootstrap";
// import "./buttonJoin.css";
import "./modalJoin.css";
import "./flipCard.css";

export const Login = ({ onClick }) => {
  const [show, setShow] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClose = () => {
    setShow(false);
    setIsFlipped(false);
  };
  const handleShow = (event) => {
    event.stopPropagation();
    setShow(true);
  };

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  const handleClick = (event) => {
    event.preventDefault();
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
        {/* <Modal.Header closeButton>
          {/* <Modal.Title>Iniciar sesión</Modal.Title> */}
        {/* </Modal.Header> */}

        <div
          className={`flip-card ${isFlipped ? "flipped" : ""}`}
          // onClick={handleClick}
        >
          <div className="flip-card-inner">
            <div className="flip-card-front">
              {/* Aquí va el contenido del frente de la tarjeta */}

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
                <div className="flex-row">
                  <p className="p col">¿No tienes cuenta?</p>
                  <button class="button-submit col" onClick={handleClick}>
                    Registrate
                  </button>
                </div>
                {/* <p className="p line">O con</p>

                <div className="flex-row">
                  <button className="btn google">Google</button>
                  <button className="btn apple">Apple</button>
                </div> */}
              </form>
            </div>
            <div className="flip-card-back">
              <form className="form">
                {/* Aquí va tu formulario de registro */}
                <div className="flex-column">
                  <label>Username </label>
                </div>
                <div className="inputForm">
                  <input
                    type="text"
                    className="inputx bg-transparent "
                    placeholder="pon tu Username"
                  />
                </div>
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
                <div className="flex-column">
                  <label>Confirmar Contraseña </label>
                </div>
                <div className="inputForm">
                  <input
                    type="password"
                    className="inputx"
                    placeholder="Confirma tu contraseña"
                  />
                </div>
                <button className="button-submit" onClick={handleClose}>
                  Registrar
                </button>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </Container>
  );
};
