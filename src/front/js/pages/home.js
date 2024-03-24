import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Carousel } from "../component/home/carousel";
import { CardHome } from "../component/home/cardHome";
import { CardLarge } from "../component/home/cardLarge";
import { CardSmall } from "../component/home/cardSmall";
import { Prueba } from "../component/home/prueba";


export const Home = () => {

    return (
        <div className="container ">
                    <div className="text-center mt-5">
                    <h1 className="display-2 fw-bold">¿Necesitas un plan?</h1>
                    <h6>Elije el mejor</h6>                        
                    </div>
                   <div><Carousel /></div> 
            <h1 className="text-start my-5 fw-bold">Mejores locales</h1>
            <div className="row mt-3">
                <div className="col-12 col-md-12 col-lg-6">
                    <Prueba />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <CardHome />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <CardHome />
                </div>
            </div>
            <div className="row">
                <div className="col-6 col-md-6 col-lg-3">
                    <CardHome />
                </div>
                <div className="col-12 col-md-6 col-lg-3">
                    <CardHome />
                </div>
                <div className="col-6 col-md-12 col-lg-6">
                    <Prueba />
                </div>
            </div>
            <h1 className="text-start my-5 fw-bold">Mejores grupos</h1>
            <div className="row">
                <div className="col-4 col-md-6 col-lg-3">
                    <CardHome />
                </div>
                <div className="col-4 col-md-6 col-lg-3">
                    <CardHome />
                </div>
                <div className="col-4 col-md-6 col-lg-3">
                <CardHome />
                </div>
                <div className="col-4 col-md-6 col-lg-3">
                    <CardHome />
                </div>
            </div>
            <div className="row">
                <div className="col-12 col-md-12 col-lg-6">
                    <Prueba />
                </div>
                <div className="col-12 col-md-12 col-lg-6">
                    <Prueba/>
                </div>
               
            </div>
        </div>
    );
};
