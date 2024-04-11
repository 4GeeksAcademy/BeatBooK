import React, { useRef, useState, useContext, useEffect } from 'react';
import { Context } from '../../store/appContext';
import "../profile/profile.css";

export const ProfileBody = (props) => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getAllEvents();
       
    }, []);


    return (
        <div className="container p-0">
            <div className="container row">
                <div className="details col-5">
                    <div className="card-detail my-4">
                        <div className="card-detail-content">
                            <h5 className="card-title">Detalles</h5>
                            <p className="card-text">{store.currentUser?.description}</p>
                            <a href="{store.currentUser?.instagram}" className="card-link"> <i className="fa-brands  fa-instagram fa-2xl" style={{color: "#000000"}}></i></a>
                            <a href="{store.currentUser?.tiktok}" className="card-link"><i class="fa-brands fa-tiktok fa-2xl" style={{color: "#000000"}}></i></a>
                        </div>
                    </div>
                    <div className="card-detail my-4">
                        <div className="card-detail-content">
                            <h5 className="card-title">Información</h5>
                            <p className="card-text">{store.currentUser?.city}</p>
                            <p className="card-text">{store.currentUser?.gender}</p>
                            <p className="card-text">{store.currentUser?.birthdate}</p>
                           
                        </div>
                    </div>

                    <div className="card-music mt-4">
                        <div className="card-music-detail">
                            <div className="d-flex">
                                <h5 className="card-title">Interes musical</h5>
                                <button className="btns-add"><i className="fas fa-plus" style={{ color: '#FFFFFF' }}></i></button>
                            </div>
                            <div className="d-flex flex-wrap grid gap-0 row-gap-2">
                                <button className="btns-music"><i className="fas fa-music" style={{ color: '#FFFFFF' }}></i> Pop </button>
                                <button className="btns-music"><i className="fas fa-music" style={{ color: '#FFFFFF' }}></i> Rock </button>
                                <button className="btns-music"><i className="fas fa-music" style={{ color: '#FFFFFF' }}></i> Salsa </button>
                                <button className="btns-music"><i className="fas fa-music" style={{ color: '#FFFFFF' }}></i> House </button>
                                <button className="btns-music"><i className="fas fa-music" style={{ color: '#FFFFFF' }}></i> R&B </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="events col-7">
                    <nav className="navbar navbar-expand-lg bg-body-tertiary my-3">
                        <div className="container-fluid">
                            <h5>Eventos</h5>
                            <button className="btns" type="submit">Filtrar</button>
                        </div>
                    </nav>
                    <div className="wrapper-e">
                        <ul className="carousel-e">
                            {store.allEvents.map((event, index) => (
                                <li className="card-e" key={index}>
                                    <div className="img">
                                        <img src={event.picture_url} alt="img" draggable="false" className="img" />
                                    </div>
                                    <div className="card-c-content">
                                        <h2 className="name">{event.name}</h2>
                                        <span className="description">{event.description}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="music col-6">
                    {/* Aquí va el contenido relacionado con la música */}
                </div>
            </div>
        </div>
    );
}





