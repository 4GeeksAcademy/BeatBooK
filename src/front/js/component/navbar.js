import React from "react";
import { Link } from "react-router-dom";

import { Search } from "./navbar/search";
import { Login } from "./navbar/login";
import "./navbar/buttonJoin.css";
import LogoHorizontal from "./navbar/beatBoxHorizontal.png";
import "./navbar/logo.css";
import { SecondaryNavbar } from "./navbar/navbarSecondary";

export const AppNavbar = () => {
  return (
    <div className="container mb-3 mt-3">
      <div className="row">
        <nav
          className="navbar navbar-expand bg-light rounded-top p-3 d-flex justify-content-between mt-3"
          style={{
            boxShadow: "0 0 10px rgba(0,0,0,0.1)",
            marginBottom: "0",
            paddingBottom: "0",
          }}
        >
          {/* Logo o nombre de la aplicación */}
          <Link to="/" className="navbar-brand">
            <img
              src={LogoHorizontal}
              alt="My Image"
              className="logoHorizontal"
            />
          </Link>

          {/* Barra de búsqueda */}
          <div className="d-flex flex-grow-1 justify-content-center">
            <Search />
          </div>

          {/* Botones de registro e inicio de sesión */}
          <div className="d-flex justify-content-end">
            <Login />
          </div>
        </nav>
      </div>
      <div className="row">
        <SecondaryNavbar />
      </div>
    </div>
  );
};
