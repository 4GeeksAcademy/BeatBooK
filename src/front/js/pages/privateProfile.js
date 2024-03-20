import React from "react";
import { useState } from "react";
import "../../styles/signup.css";

export const PrivateProfile = () => {



    return (
        <div className="container">
            <div>
                <img src="https://images.pexels.com/photos/1407322/pexels-photo-1407322.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="img-fluid" alt="Foto de portada" id="banner"></img>
            </div>
            <div className="row border-bottom border-2">
                <div className="col-6">
                    <img src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" class="float-start" alt="..." id="profilepicture" />
                    <button type="button" className="btn btn-info" id="btnprofile"><i className="fa-solid fa-camera" style={{ color: "#000000" }}></i></button>
                    <div className="username">
                        <h2 className="mb-1">Nombre de usuario</h2>
                        <p className=" mt-1">Follower</p>
                    </div>

                </div>
                <div className="col-6 grid gap-3 d-flex align-items-end justify-content-end mb-5">
                    <button type="button" className="btn btn-primary">+ Añadir eventos</button>
                    <button type="button" className="btn btn-light">Editar perfil</button>
                </div>
            </div>
            <div>
                <nav>
                    <div className="nav nav-tabs" id="nav-tab" role="tablist">
                        <button className="nav-link active" id="nav-home-tab" data-bs-toggle="tab" data-bs-target="#nav-publicaciones" type="button" role="tab" aria-controls="nav-publicaciones" aria-selected="true">Publicaciones</button>
                        <button className="nav-link" id="nav-informacion-tab" data-bs-toggle="tab" data-bs-target="#nav-informacion" type="button" role="tab" aria-controls="nav-informacion" aria-selected="false">Información</button>
                        <button className="nav-link" id="nav-amigos-tab" data-bs-toggle="tab" data-bs-target="#nav-amigos" type="button" role="tab" aria-controls="nav-amigos" aria-selected="false">Amigos</button>
                        <button className="nav-link" id="nav-eventos-tab" data-bs-toggle="tab" data-bs-target="#nav-eventos" type="button" role="tab" aria-controls="nav-eventos" aria-selected="false">Amigos</button>
                    </div>
                </nav>
                <div className="tab-content" id="nav-tabContent">
                    <div className="tab-pane fade show active" id="nav-publicaciones" role="tabpanel" aria-labelledby="nav-publicaciones-tab" tabindex="0">
                        <div className="row">
                            <div className="col-3 border border-2 mt-5 ms-3 ">
                                <h1> esta es la seccion de detalles</h1>
                            </div>
                            <div className="col-9 border border-2 mt-5">
                                <h1> Esto es la seccion de prublicaciones</h1>
                            </div>
                        </div>
                    </div>
                    <div className="tab-pane fade" id="nav-informacion" role="tabpanel" aria-labelledby="nav-informacion-tab" tabindex="0">vista 2</div>
                    <div className="tab-pane fade" id="nav-amigos" role="tabpanel" aria-labelledby="nav-amigos-tab" tabindex="0">vista 3</div>
                    <div className="tab-pane fade" id="nav-eventos" role="tabpanel" aria-labelledby="nav-eventos-tab" tabindex="0">vista 4</div>
                </div>
            </div>
        </div>

    );

}