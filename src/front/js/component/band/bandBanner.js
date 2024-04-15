import React, { useRef, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
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

export const BandBanner = (props) => {
    const { id } = useParams();
    const { actions, store } = useContext(Context);
    const [bandData, setbandData] = useState(null);

    useEffect(() => {
        actions.getBand(id).then((data) => {
            setbandData(data);
            console.log("bandData", data);
        });
    }, [id]);

    const classes = useStyles();

    return (
        <div className='container'>
            <div className='banner-band'>
                <img src={store.band.banner_picture} className='img-fluid' ></img>
            </div>
            <div className='band-data row'>
                <div className='picture col-2'>
                    <img className='img' src={store.band.profile_picture} alt='perfil' />
                </div>
                <div className='band-name col-6 d-flex justify-content-start align-items-center'>
                    <h1 className='ms-2'>{store.band.name}</h1>
                </div>
                <div className='band-member col-4 d-flex flex-column align-items-end justify-content-end'>
                    <div className='members'>
                        <p className='me-5'><strong>Miembros</strong></p>
                    </div>
                    <div className="d-flex flrex-row">
                        {store.band.members && store.band.members.map((member, index) => (
                            <div className={classes.root} key={index}>
                                <Avatar className="avatar" alt={member.username} src={member.profile_image_url} />
                            </div>
                        ))}
                    </div>

                </div>
            </div>
            <div className="card-band-body container">
                <div className="card-band-content">
                    <h5 className="card-title">Detalles</h5>
                    <p className="card-text">{store.band.description}</p>
                    <h5>Redes sociales</h5>
                    <div className='social-network'>
                        <a href={store.band.instagram} className="card-link"> <i className="fa-brands  fa-instagram fa-2xl" style={{ color: "#000000" }}></i></a>
                        <a href={store.band.tiktok} className="card-link"><i className="fa-brands fa-tiktok fa-2xl" style={{ color: "#000000" }}></i></a>
                    </div>
                    <h5>Categoria musical</h5>
                    <button className="btns-music"><i className="fas fa-music" style={{ color: '#FFFFFF' }}></i> Pop </button>
                </div>

                <div className="band-events">
                    <nav className="navba navbar-expand-lg bg-body-tertiary my-3">
                        <div className="container-fluid d-flex justify-content-between align-items-center">
                            <h5>Eventos</h5>
                        </div>
                    </nav>
                    <div className="wrapper-e">
                        {store.band.events && store.band.events.map((event, index) => (
                        <ul className="carousel-e" key={index}>
                            <li className="card-e">
                                <div className="img">
                                    <img src={event.picture_url} alt="img" draggable="false" className="img" />
                                </div>
                                <div className="card-c-content">
                                    <h2 className="name">{event.name}</h2>
                                    <span className="description">{event.description}</span>
                                </div>
                            </li>
                        </ul>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}