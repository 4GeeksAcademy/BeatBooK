import React from "react";
import "../../styles/footer.css";
import beatBoxHorizontalBlanco from "./navbar/beatBoxHorizontalBlanco.png"
import Logo_Facebook from "../../../../docs/assets/Logo_Facebook.png"
import Logo_Twitter from "../../../../docs/assets/Logo_Twitter.png"
import Logo_Instagram from "../../../../docs/assets/Logo_Instagram.png"

export const Footer = () => {
    return (
        <footer className="mt-5 estilofooter">
            <div className="container">
                <div className="row">
                    <div className="col align-items-center d-flex justify-content-center">
                        <a href="/"><img src={beatBoxHorizontalBlanco} alt="logo_beatbook" className="logo" /></a>
                    </div>
                    <div className="col">
                        <ul className="sinPuntos">
                            <h4>Beatbook</h4>
                            <li><a href="/paginafalsa">Quiénes somos</a></li>
                            <li><a href="/paginafalsa">Cómo funciona</a></li>
                            <li><a href="/paginafalsa">Blog</a></li>
                            <li><a href="/paginafalsa">Empleo</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <ul className="sinPuntos">
                            <h4>Soporte</h4>
                            <li><a href="/paginafalsa">Centro de ayuda</a></li>
                            <li><a href="/paginafalsa">Reglas de publicación</a></li>
                            <li><a href="/paginafalsa">Consejos de Seguridad</a></li>
                        </ul>
                    </div>
                    <div className="col">
                        <ul className="sinPuntos">
                            <h4>Legal</h4>
                            <li><a href="/paginafalsa">Politica de privacidad</a></li>
                            <li><a href="/paginafalsa">Condiciones de uso</a></li>
                            <li><a href="/paginafalsa">Politica de cookies</a></li>
                        </ul>
                    </div>
                    <div className="col align-items-center d-flex justify-content-center">
                        <div className="container text-center">
                            <div className="row">
                                <div className="col">
                                    <a href="https://www.facebook.com/">
                                        <img src={Logo_Facebook} alt="Facebook" className="redesSociales" />
                                    </a>
                                </div>
                                <div className="col">
                                    <a href="https://www.twitter.com/">
                                        <img src={Logo_Twitter} alt="Twitter" className="redesSociales" />
                                    </a>
                                </div>
                                <div className="col">
                                    <a href="https://www.instagram.com/">
                                        <img src={Logo_Instagram} alt="Instagram" className="redesSociales" />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};
