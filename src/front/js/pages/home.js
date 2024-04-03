import React, { useState, useContext, useEffect } from "react"; // Importa useContext de 'react'
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import "../../styles/home.css";
import { Carousel } from "../component/home/carousel";
import { Cards } from "../component/home/cardBands";
import { Login } from "../component/navbar/sessionLog";
import { CardPlaces } from "../component/home/cardPlaces";

export const Home = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate()
    const { store, actions } = useContext(Context);
  
 

    const checkAuthentication = () => {
        const token = localStorage.getItem('jwt-token');
        console.log(token)
        if (token) {
            return true;
        } else {
            return false;
        }
    };

    const handleOpenModal = () => {
        const loggedIn = checkAuthentication();
        console.log(loggedIn);
        if (!loggedIn) {
            setShowModal(true);
            console.log('No autenticado!!!!!');
        } else {
            console.log("El usuario está autenticado. No se mostrará el modal.");
        }
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    

    return (
        <div className="container">
            <div className="container text-center">
                <a href="#" onClick={handleOpenModal}>
                    <h1 className="display-2 fw-bold pt-5">¿Necesitas un plan?</h1>
                </a>
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
					<CardPlaces/>
                    
                </div>
                <h1 className="locales text-start my-5">Mejores Bandas</h1>
                <div className="row justify-content-center">
                    <Cards />
                </div>
                {showModal && <Login />}
            </div>
        </div>
    );
};

