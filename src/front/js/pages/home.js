import React from "react";
import "../../styles/home.css";
import { Carousel } from "../component/home/carousel";
import { CardPlaces } from "../component/home/cardPlaces";
import { Cards } from "../component/home/cardBands";


export const Home = () => {

    return (
        <div className="container">
            <div className="container text-center">
                <h1>Descubre nuestros eventos</h1>
                <p>Elige el mejor plan</p>
            </div>
            <div className="container">
                <div className="row d-flex justify-content-center">
                    <div className="col">
                        <Carousel />
                    </div>
                </div>
            </div>
            <div className="container">
                <h1 className="locales text-start my-5"> Locales</h1>
                <div className="row justify-content-center">
                    <CardPlaces />

                </div>
                <h1 className="locales text-start my-5">Bandas</h1>
                <div className="row justify-content-center">
                    <Cards />
                </div>
            </div>
        </div>
    );
};