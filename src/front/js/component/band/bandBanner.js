import React, { useRef, useState, useContext } from 'react';
import { Context } from '../../store/appContext';
import { useNavigate } from 'react-router-dom';
import "../band/Bandstyle.css"
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(0.2),
        },
    },
}));

export const BandBanner = () => {
    const classes = useStyles();

    return (
        <div className='container'>
            <div className='banner-band'>
                <img src="https://images.pexels.com/photos/1763075/pexels-photo-1763075.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="img-fluid" alt="Foto de la banda"></img>
            </div>
            <div className='band-data row'>
                <div className='picture col-2'>
                    <img className='img' src="https://images.pexels.com/photos/5650953/pexels-photo-5650953.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" alt='perfil' />
                </div>
                <div className='band-name col-6 d-flex justify-content-start align-items-center'>
                    <h1 className='ms-2'>La banda pop</h1>
                </div>
                <div className='band-member col-4 d-flex flex-column align-items-end justify-content-end'>
                    <p className='me-5'><strong>Miembros</strong></p>
                    <div className={classes.root}>
                        <Avatar className="avatar" alt="Remy Sharp" src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=800" />
                        <Avatar alt="Travis Howard" src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800" />
                        <Avatar alt="Cindy Baker" src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800" />
                        <Avatar className="avatar" alt="Remy Sharp" src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=800" />
                        <Avatar alt="Travis Howard" src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800" />
                        <Avatar alt="Cindy Baker" src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800" />
                    </div>
                </div>
            </div>
            <div className="card-band-body container">
                <div className="card-band-content">
                        <h5 className="card-title">Detalles</h5>
                        <p className="card-text">Banda indie alternativa que fusiona elementos de dream pop con letras introspectivas.
                            Sus melodías etéreas y atmósferas envolventes transportan a los oyentes a un viaje emocional único.
                            Con influencias que van desde la música electrónica hasta el rock experimental,
                            Luminous Echoes crea una experiencia auditiva hipnótica que deja una impresión duradera en su audiencia.</p>
                            <h5>Redes sociales</h5>
                            <div className='social-network'>
                        <a href="#" className="card-link"> <i className="fa-brands  fa-instagram fa-2xl" style={{ color: "#000000" }}></i></a>
                        <a href="#" className="card-link"><i className="fa-brands fa-tiktok fa-2xl" style={{ color: "#000000" }}></i></a> 
                            </div>
                        <h5>Categoria musical</h5>
                        <button className="btns-music"><i className="fas fa-music" style={{ color: '#FFFFFF' }}></i> Pop </button>
                        </div>
                
                <div className="band-events">
                    <nav className="navba navbar-expand-lg bg-body-tertiary my-3">
                        <div className="container-fluid d-flex justify-content-between align-items-center">
                            <h5>Eventos</h5>
                            <button className="btns" type="submit">Filtrar</button>
                        </div>
                    </nav>
                    <div className="wrapper-e">
                        <ul className="carousel-e">
                                <li className="card-e">
                                    <div className="img">
                                        <img src="https://i.pinimg.com/564x/97/0a/03/970a035f8595f1f1108262379c26a760.jpg" alt="img" draggable="false" className="img" />
                                    </div>
                                    <div className="card-c-content">
                                        <h2 className="name">Conciertos a tutiplen</h2>
                                        <span className="description">Mini Festival al aire libre</span>
                                    </div>
                                </li>
                        </ul>
                        <ul className="carousel-e">
                                <li className="card-e">
                                    <div className="img">
                                        <img src="https://i.pinimg.com/564x/97/0a/03/970a035f8595f1f1108262379c26a760.jpg" alt="img" draggable="false" className="img" />
                                    </div>
                                    <div className="card-c-content">
                                        <h2 className="name">Conciertos a tutiplen</h2>
                                        <span className="description">Mini Festival al aire libre</span>
                                    </div>
                                </li>
                        </ul>
                        <ul className="carousel-e">
                                <li className="card-e">
                                    <div className="img">
                                        <img src="https://i.pinimg.com/564x/97/0a/03/970a035f8595f1f1108262379c26a760.jpg" alt="img" draggable="false" className="img" />
                                    </div>
                                    <div className="card-c-content">
                                        <h2 className="name">Conciertos a tutiplen</h2>
                                        <span className="description">Mini Festival al aire libre</span>
                                    </div>
                                </li>
                        </ul>
                    </div>
                    </div>
                </div>
            </div>
    );
}