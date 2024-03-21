import React, { useContext } from "react";
import { Context } from "../store/appContext";
import rigoImageUrl from "../../img/rigo-baby.jpg";
import "../../styles/home.css";
import { Carousel } from "../component/home/carousel";
import { CardHome } from "../component/home/cardHome";

export const Home = () => {
	
	return (
		<div className="container text-center mt-5">
    <div className="row">
		<div className="col-sm-12">
        <h1 className="mb-4">¿Necesitas un plan?</h1>
        <h6>Elije el mejor</h6>
        <Carousel />
		</div>
    </div>
    <h1 className="text-start mt-5">Mejores locales</h1>
    <div className="d-flex flex-column flex-sm-row">
        <CardHome />
        <CardHome />
        <CardHome />
    </div>
    <h1 className="text-start mt-5">Mejores grupos</h1>
    <div className="d-flex flex-column flex-sm-row">
        <CardHome />
        <CardHome />
        <CardHome />
    </div>
</div>

	);
};
