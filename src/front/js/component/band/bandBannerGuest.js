import React, { useRef, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { Context } from '../../store/appContext';
import { useNavigate } from 'react-router-dom';
import "../band/Bandstyle.css"
import "../profile/profile.css"
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";


const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(0.2),
        },
    },
}));

export const BandBannerGuest = (props) => {
    const { id } = useParams();
    const { actions, store } = useContext(Context);
    const [bandData, setbandData] = useState(null);
    const isMounted = useRef(true);

    useEffect(() => {

        const fetchData = async () => {
            try {
                const data = await actions.getBand(id);
                if (isMounted.current) {
                    setbandData(data);
                }
            } catch (error) {
                console.error('Error fetching band data:', error);
            }
        };

        fetchData();

        return () => {
            isMounted.current = false;
        };
    }, [id, actions]);

    const classes = useStyles();

    return (
        <div className='container'>
             <div className="row  text-start">
                <div className='col-12 Banner'>
                <img src={store.band.banner_picture} className='img-fluid' alt='Banner'></img>
            </div>
            </div>
            <div className="row mt-3 p-1" >
                <div className=" profileName col-12 col-md-12 col-xl-12 d-flex justify-content-start align-items-center grid gap-3 mb-4">
                        <img className='ProfilePicture p-3' src={store.band.profile_picture} alt='Perfil' />
                        <h1>{store.band.name}</h1>
                    </div>
                    </div>
                
            <div className="container text-center">
                <div className="row">
                <div className="col-12 col-md-12 col-xl-6">
                        <div className="card-detail">
                            <h5 className="card-title">Detalles</h5>
                            <p className="card-text">{store.band.description}</p>
                            <h5>Redes sociales</h5>
                            <div className='social-network'>
                                <a href={store.band.instagram} className="card-link" target='_blank'> <i className="fa-brands  fa-instagram icono fa-2xl"></i></a>
                                <a href={store.band.tiktok} className="card-link" target='_blank'><i className="fa-brands fa-tiktok icono fa-2xl"></i></a>
                            </div>
                        </div>
                        <div className="card-members">
                            <h5 className="card-title">Miembros</h5>
                            <div className="d-flex flrex-row justify-content-center align-items-center flex-wrap ">
                            {store.band.members && store.band.members.map((member, index) => (
                                <div className={classes.root} key={index}>
                                    <Link to={`/profile/${member.id}`}>
                                        <Avatar className="avatar" alt={member.username} src={member.profile_image_url} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                        </div>
                        <div className="card-music-band">
                            <h5>Categoria musical</h5>
                                {store.band.musical_categories && store.band.musical_categories.map(category => (
                            <button className="btns-music">
                                <i className="fas fa-music mx-1" style={{ color: '#FFFFFF' }}></i>
                                    <span key={category.id}>{category.name}</span>
                            </button>
                                ))}
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-xl-6">
                        <div className="cardEvent">
                            <h5>Proximos Eventos</h5>
                        </div>
                            {store.band.events && store.band.events.map((event, index) => (
                        <div className="cardEvent">
                                <div className="position-relative" key={index}>
                                    <Link to={`/events/${event.id}`}>
                                        <img src={event.picture_url} alt="img" draggable="false" className="card-img-top eventPicture" />
                                    </Link>
                                    <div className="card-body">
                                        <h5>{event.name}</h5>
                                        <p>{event.description}</p>
                                    </div>
                                </div>
                        </div>
                            ))}
                    </div>
                </div>
            </div>
        </div>
    );
}