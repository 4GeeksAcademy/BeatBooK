import React from "react";
import "../../styles/footer.css";
import beatBoxHorizontalBlanco from "./navbar/beatBoxHorizontalBlanco.png"
import Logo_Facebook from "../../../../docs/assets/Logo_Facebook.png"
import Logo_Twitter from "../../../../docs/assets/Logo_Twitter.png"
import Logo_Instagram from "../../../../docs/assets/Logo_Instagram.png"
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';


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

                <div className="row d-flex align-items-center justify-content-center">
                    <div className="col-12" style={{ display: 'flex', alignItems: 'center' }}>
                        <hr className="text-white flex-grow-1" />
                        <h5 className="px-2 text-white">Creado por: CtrlSonic</h5>
                        <hr className="text-white flex-grow-1" />
                    </div>
                    <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
                        <p className="p-3 d-flex align-items-center justify-content-center">Luis Guilarte
                            <a href="https://www.linkedin.com/in/luisgr10/" target="_blank" rel="noopener noreferrer">
                                <LinkedInIcon fontSize="large" className="px-1" />
                            </a>
                            <a href="https://github.com/Luisgr10" target="_blank" rel="noopener noreferrer">
                                <GitHubIcon />
                            </a>
                        </p>
                    </div>
                    <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
                        <p className="p-3 d-flex align-items-center justify-content-center">Miriam Asencio
                            <a href="https://www.linkedin.com/in/miriam-asencio/" target="_blank" rel="noopener noreferrer">
                                <LinkedInIcon fontSize="large" className="px-1" />
                            </a>
                            <a href="https://github.com/Miritzila" target="_blank" rel="noopener noreferrer">
                                <GitHubIcon />
                            </a>
                        </p>
                    </div>
                    <div className="col-12 col-md-4 d-flex align-items-center justify-content-center">
                        <p className="p-3 d-flex align-items-center justify-content-center">
                            Heyson Betancourt
                            <a href="https://www.linkedin.com/in/heyson-betancourt-9b266a299/" target="_blank" rel="noopener noreferrer">
                                <LinkedInIcon fontSize="large" className="px-1" />
                            </a>
                            <a href="https://github.com/heysonbr" target="_blank" rel="noopener noreferrer">
                                <GitHubIcon />
                            </a>
                        </p>
                    </div>
                    <div className="col-12 d-flex align-items-center justify-content-center pt-5">
                        <p className="text-white">© 2024 Beatbook. Todos los derechos reservados.</p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
