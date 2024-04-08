import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export const PaginaFalsa = () => {
    return (
        <div className="container text-center">
            <br></br>
            <h1>Bienvenido a la página falsa</h1>
            <br></br>
            <div class="row">
                <div class="col">
                <img src="https://i.pinimg.com/564x/3c/5d/68/3c5d6864e32b32f8cb3e24cc7d0b115f.jpg" alt="Imagen" />
                </div>
                <div class="col">
                    <p>Esta página no tiene ninguna funcionalidad real.</p>
                    <p>La hemos creado para poder darle un sentido a los enlaces del footer. Siento que no hayas podido contactar con nuestro servicio de atención al cliente ¡No existe!</p>
                    <p>Esta es una página diseñada como proyecto final del bootcamp Full Stack Developer de la academia 4geeks. Esperamos que te guste.</p>
                    <FontAwesomeIcon icon={faHeart} size="2xl"/>
                </div>
            </div>
        </div>
    );
}
