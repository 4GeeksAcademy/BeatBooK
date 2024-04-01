import React from "react";
import "./buttonJoin.css";
import { useState } from "react";

export const SecondaryNavbar = () => {
  return (
    <div
      className="secondary-navbar rounded-bottom container bg-black pb-1 pt-2 border-top border-secondary"
      expand="lg"
      style={{ boxShadow: "0 0 10px rgba(0,0,0,0.1)" }}
    >
      <div className="row">
        <div className=" d-flex justify-content-start align-items-center ">
          <button className="white-button text-center text-nowrap ">
            Todas las categorías
          </button>
          <button href="#category1" className="white-button">
            Rock
          </button>
          <button href="#category2" className="white-button">
            Pop
          </button>
          <button href="#category3" className="white-button">
            Latina
          </button>
          <button href="#category4" className="white-button">
            Electrónica
          </button>
          <button href="#category5" className="white-button">
            Clásica
          </button>
        </div>
      </div>
    </div>
  );
};
