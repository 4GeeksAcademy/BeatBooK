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
            <div className='band-data'>
                <div className='band-name'>
                    <h1>La banda pop</h1>
                </div>
                <div className='band-member'>
                    <p><strong>Miembros</strong></p>
                    <div className={classes.root}>
                        <Avatar className="avatar" alt="Remy Sharp" src="https://images.pexels.com/photos/771742/pexels-photo-771742.jpeg?auto=compress&cs=tinysrgb&w=800" />
                        <Avatar alt="Travis Howard" src="https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=800" />
                        <Avatar alt="Cindy Baker" src="https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=800" />
                    </div>
                </div>
            </div>
            <div className="card-detail my-4">
                <div className='row'>
                        <div className="card-detail-content col-6">
                                <h5 className="card-title">Detalles</h5>
                                <p className="card-text">Banda indie alternativa que fusiona elementos de dream pop con letras introspectivas. 
                                Sus melodías etéreas y atmósferas envolventes transportan a los oyentes a un viaje emocional único. 
                                Con influencias que van desde la música electrónica hasta el rock experimental, 
                                Luminous Echoes crea una experiencia auditiva hipnótica que deja una impresión duradera en su audiencia.</p>
                                <a href="#" className="card-link"> <i className="fab fa-instagram"></i> bandaPop</a>
                                <a href="#" className="card-link"><i className="fab fa-tiktok"></i> bandaPop</a>
                        </div>
                        <div className="card-detail-content col-6">

                        <a href="#" className="card-link"> <i className="fab fa-instagram"></i> bandaPop</a>
                                <a href="#" className="card-link"><i className="fab fa-tiktok"></i> bandaPop</a>
                        </div>

                </div>
                    </div>
        </div>
    );
}