import React from "react";
import { Carousel } from "../component/home/carousel";
import { Cards } from "../component/home/card";

export const Home = () => {
    return (
        <div className="container">
            <div className="container text-center">
                <a href=""> <h1 className="display-2 fw-bold pt-5">¿Necesitas un plan?</h1></a>
                <h6 className="mb-5">Elije el mejor</h6>
            </div>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col">
                        <Carousel />
                    </div>
                </div>
            </div>
            <div className="container">
                <h1 className="locales text-start my-5">Mejores locales</h1>
                <div className="row justify-content-center">
                    <Cards />
                </div>
                <h1 className="locales text-start my-5">Mejores Bandas</h1>
                <div className="row justify-content-center">
                    <Cards />
                </div>
            </div>
        </div>
    );
};
