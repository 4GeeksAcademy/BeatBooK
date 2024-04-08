import React, { useState, useContext } from "react";
import { Modal, Form } from "react-bootstrap";
import { Context } from "../../store/appContext";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./modalJoin.css";
import "./flipCard.css";
import LogoVertical from "./beatBoxVertical.png";
import "./logo.css";
import "./modal.css";

export const LoginModal = ({
  show,
  handleClose,
  handleLogin,
  handleSignUp,
  email,
  setEmail,
  password,
  setPassword,
  username,
  setUsername,
  passwordConfirmation,
  setPasswordConfirmation,
  isFlipped,
  setIsFlipped,
  showPassword,
  setShowPassword,
}) => {
  const navigate = useNavigate();

  const handleModalClick = (event) => {
    event.stopPropagation();
  };

  const handleClick = (event) => {
    event.preventDefault();
    setIsFlipped(!isFlipped);
  };

  return (
    <Modal
      show={show}
      onHide={handleClose}
      onClick={handleModalClick}
      className="my-modal"
    >
      <div className={`flip-card ${isFlipped ? "flipped" : ""}`}>
        <div className="flip-card-inner">
          <div className="flip-card-front">
            <form className="form" onSubmit={handleLogin}>
              <div className="flex justify-content-center">
                <img
                  src={LogoVertical}
                  alt="My Image"
                  className="logoVertical"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              <div className="flex-column">
                <label>Contraseña </label>
              </div>
              <div className="inputForm">
                <input
                  type={showPassword ? "text" : "password"}
                  className="inputx"
                  placeholder="Pon tu contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <i onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? "Ocultar" : "Mostrar"}
                </i>
              </div>

              <button className="button-submit" type="submit">
                Iniciar sesión
              </button>
              <div className="flex-row">
                <p className="p col">¿No tienes cuenta?</p>
                <button className="button-submit col" onClick={handleClick}>
                  Registrate
                </button>
              </div>
            </form>
          </div>
          <div className="flip-card-back">
            <form className="form" onSubmit={handleSignUp}>
              <div className="flex justify-content-center">
                <img
                  src={LogoVertical}
                  alt="My Image"
                  className="logoVertical"
                />
              </div>
              <div className="flex-column">
                <label>Username </label>
              </div>
              <div className="inputForm">
                <input
                  type="text"
                  className="inputx bg-transparent "
                  placeholder="pon tu Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
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
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
              </div>
              <button className="button-submit" type="submit">
                Registrar
              </button>
            </form>
          </div>
        </div>
      </div>
    </Modal>
  );
};
