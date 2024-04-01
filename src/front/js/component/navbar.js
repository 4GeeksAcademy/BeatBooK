import React from "react";
import { Link } from "react-router-dom";

import { Search } from "./navbar/search";
import { Login } from "./navbar/login";
import "./navbar/buttonJoin.css";
import LogoHorizontal from "./navbar/beatBoxHorizontal.png";
import LogoHorizontalBlanco from "./navbar/beatBoxHorizontalBlanco.png";
import "./navbar/logo.css";
import { SecondaryNavbar } from "./navbar/navbarSecondary";

export const AppNavbar = () => {
  return (
    <div
      style={{
        position: "sticky",
        top: 0,
        zIndex: 1000,
      }}
    >
      {" "}
      <div className="container-fluid">
        <div className="row ">
          <nav
            className="navbar navbar-expand bg-black rounded-top p-1 d-flex justify-content-between align-items-center"
            style={{
              boxShadow: "0 0 10px rgba(0,0,0,0.1)",
              marginBottom: "0",
              paddingBottom: "0",
            }}
          >
            {" "}
            <div className="d-flex justify-content-start ps-3">
              {/* Logo o nombre de la aplicación */}
              <Link to="/" className="ps-3">
                <img
                  src={LogoHorizontalBlanco}
                  alt="My Image"
                  className="logoHorizontal"
                />
              </Link>
              <button className="white-button text-center text-nowrap ">
                Categorías
              </button>
            </div>
            {/* Barra de búsqueda */}
            <div className="d-flex justify-content-center"></div>
            {/* Botones de registro e inicio de sesión */}
            <div className="d-flex">
              <Search />
              <Login />
            </div>
          </nav>
        </div>
      </div>
      {/* <div className="row">
       <SecondaryNavbar />
       </div> */}
    </div>
  );
};
