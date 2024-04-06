import React, { useContext, useEffect } from 'react';
import { Context } from '../../store/appContext';
import "../profile/profile.css";

export const ProfileBody = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getEvents();
    }, []);

    return (
        <div className="container p-0">
            <div className='myTab'>
                <ul className="nav nav-tabs " id="myTab" role="tablist">
                    <li className="nav-item" role="presentation">
                        <button className="nav-link active" id="home-tab" data-bs-toggle="tab" data-bs-target="#home-tab-pane" type="button" role="tab" aria-controls="home-tab-pane" aria-selected="true">Perfil</button>
                    </li>
                    <li className="nav-item" role="presentation">
                        <button className="nav-link" id="profile-tab" data-bs-toggle="tab" data-bs-target="#profile-tab-pane" type="button" role="tab" aria-controls="profile-tab-pane" aria-selected="false">Informacion</button>
                    </li>
                </ul>
            </div>
            <div className="tab-content" id="myTabContent">
                <div className="tab-pane fade show active" id="home-tab-pane" role="tabpanel" aria-labelledby="home-tab" tabIndex="0">
                    <div className="container row">
                        <div className="details col-6">
                            <div className="card-detail my-4">
                                <div className="card-detail-content">
                                    <h5 className="card-title">Detalles</h5>
                                    <p className="card-text">Versátil artista con un estilo musical único. Destaca en el canto y domina el piano con pasión. 🎶🎤🎹</p>
                                    <a href="#" className="card-link"> <i className="fab fa-instagram"></i> Miritzila</a>
                                    <a href="#" className="card-link"><i className="fab fa-tiktok"></i> Musicmiri</a>
                                </div>
                            </div>
                            <div className="card-music mt-3">
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
                        <div className="events col-6">
                            <nav className="navbar navbar-expand-lg bg-body-tertiary my-3">
                                <div className="container-fluid">
                                    <h5>Eventos</h5>
                                    <button className="btns" type="submit">Filtrar</button>
                                </div>
                            </nav>
                            <div className="wrapper-e">
                                <ul className='carousel-e '>
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
                <div className="tab-pane fade" id="profile-tab-pane" role="tabpanel" aria-labelledby="profile-tab" tabIndex="0">
                    <div className='container'>
                        <h6>Informacion</h6>
                        <label for="inputPassword5" class="form-label">Fecha de naciemiento</label>
                        <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock" />
                        <label for="inputPassword5" class="form-label">Ciudad</label>
                        <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock" />
                        <label for="inputPassword5" class="form-label">Sexo</label>
                        <select class="form-select" aria-label="Default select example">
                            <option selected>Selecciona</option>
                            <option value="1">Hombre</option>
                            <option value="2">Mujer</option>
                            <option value="3">Otros</option>
                        </select>
                        <label for="inputPassword5" class="form-label">Pronombre</label>
                        <input type="password" id="inputPassword5" class="form-control" aria-describedby="passwordHelpBlock" />
                    </div>
                </div>
            </div>
        </div>
    );
}


