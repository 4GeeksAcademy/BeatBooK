import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../../styles/landingPage.css";
import beatBoxHorizontalBlanco from "/workspaces/BeatBooK/src/front/js/component/navbar/beatBoxHorizontalBlanco.png"


export const LandingPage = () => {
    const [videoUrl, setVideoUrl] = useState("https://videos.pexels.com/video-files/7722744/7722744-uhd_3840_2160_25fps.mp4");

    return (
        <div className="container-fluid text-center m-0 p-0">
            <div className="row">
                <div className="position-relative">
                    <video
                        autoPlay
                        muted
                        loop
                        className="w-100">
                        <source src={videoUrl} type="video/mp4" />
                    </video>
                    <img className="image-landing" src={beatBoxHorizontalBlanco} alt="superposición" />
                    <div className="overlay-text">
                        <p>Conecta con músicos y locales, crea eventos y da vida a la música en tu comunidad.<br /> <strong>¡Sé parte del movimiento!</strong></p>
                        <Link to="/home">
                            <button className='btns-landing'>Hazte Escuchar</button>
                        </Link>
                    </div>
                </div>
                <div className="justify-content-center">
                    <h1 className="text-center">Beatbook te permite crear una comunidad facilmente</h1>
                </div>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-10 col-sm-6 col-md-4 col-xl-3 d-flex justify-content-center mb-2">
                            <div className="card-l">
                                <img src="https://images.pexels.com/photos/4353618/pexels-photo-4353618.jpeg?auto=compress&cs=tinysrgb&w=800" className="card-img-l" alt="Comunidad" />
                                <div className="card-body">
                                    <h5 className="card-title ">Llega a personas nuevas</h5>
                                    <p className="card-text">Conecta con personas de tu zona que sientan pasión por la música.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 col-sm-6 col-md-4 col-xl-3 d-flex justify-content-center mb-2">
                            <div className="card-l">
                                <img src="https://images.pexels.com/photos/2883051/pexels-photo-2883051.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="card-img-l" alt="Eventos" />
                                <div className="card-body">
                                    <h5 className="card-title">Una aplicacion para organizar</h5>
                                    <p className="card-text"> Gestiona la asistencia y actualiza tus eventos.</p>
                                </div>
                            </div>
                        </div>
                        <div className="col-10 col-sm-6 col-md-4 col-xl-3 d-flex justify-content-center mb-2">
                            <div className="card-l">
                                <img src="https://images.pexels.com/photos/976866/pexels-photo-976866.jpeg?auto=compress&cs=tinysrgb&w=800" className="card-img-l" alt="Crecimiento" />
                                <div className="card-body">
                                    <h5>Crecimiento continuo</h5>
                                    <p>Continuaremos impulsando la visibilidad de tu grupo en nuestra red, fomentando su crecimiento.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
