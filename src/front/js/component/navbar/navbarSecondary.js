import React from "react";
import "./buttonJoin.css";
import { useState } from "react";

export const SecondaryNavbar = () => {
  return (
    <div
      className="secondary-navbar rounded-bottom container bg-light pb-2 pt-2"
      expand="lg"
      style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
    >
      <div className="row">
        <div className=" d-flex justify-content-around">
          <button className="buttonSpecial text-center text-nowrap p-1">
            Todas las categorías
          </button>
          <a href="#category1">Rock</a>
          <a href="#category2">Pop</a>
          <a href="#category3">Latina</a>
          <a href="#category4">Electrónica</a>
          <a href="#category5">Clásica</a>
        </div>
      </div>
    </div>
  );
};
