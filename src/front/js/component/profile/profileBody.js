import React, { useRef, useState, useContext, useEffect } from 'react';
import { Context } from '../../store/appContext';
import "../profile/profile.css";

export const ProfileBody = () => {
    const { store, actions } = useContext(Context);



    useEffect(() => {
        actions.getEvents();
    }, []);

    return (
        <div className="container p-0">
              <div className="container row">
                        <div className="details col-5">
                            <div className="card-detail my-4">
                                <div className="card-detail-content">
                                    <h5 className="card-title">Detalles</h5>
                                    <p className="card-text">Versátil artista con un estilo musical único. Destaca en el canto y domina el piano con pasión. 🎶🎤🎹</p>
                                    <a href="#" className="card-link"> <i className="fab fa-instagram"></i> Miritzila</a>
                                    <a href="#" className="card-link"><i className="fab fa-tiktok"></i> Musicmiri</a>
                                </div>
                            </div>
                            <div className="card-music mt-4">
                                <div className="card-music-detail">
                                    <div className='d-flex'>
                                        <h5 className="card-title">Interes musical</h5>
                                        <button className='btns-add'><i className="fas fa-plus" style={{ color: '#ffffff' }}></i></button>
                                    </div>
                                    <div className='d-flex flex-wrap grid gap-0 row-gap-2'>
                                        <button className='btns-music'><i className="fas fa-music" style={{ color: '#ffffff' }}></i> Pop </button>
                                        <button className='btns-music'><i className="fas fa-music" style={{ color: '#ffffff' }}></i> Rock </button>
                                        <button className='btns-music'><i className="fas fa-music" style={{ color: '#ffffff' }}></i> Salsa </button>
                                        <button className='btns-music'><i className="fas fa-music" style={{ color: '#ffffff' }}></i> House </button>
                                        <button className='btns-music'><i className="fas fa-music" style={{ color: '#ffffff' }}></i> R&B </button>
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
                            <ul className='carousel-e'>
                                    {store.events.map((event, index) => (
                                        <li className="card-e" key={index}>
                                            <div className='img'>
                                                <img src={event.pictures} alt='img' draggable="false" className='img' />
                                            </div>
                                            <div className='card-c-content'>
                                                <h2 className='name'>{event.name}</h2>
                                                <span className='description'>{event.description}</span>
                                            </div>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                        <div className="music col-6">

                        </div>
                    </div>
        </div>
    );
}


