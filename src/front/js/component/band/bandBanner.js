import React, { useRef, useState, useContext } from 'react';
import { Link, useParams } from 'react-router-dom';
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
            <div class="container container text-start data">
                <div class="row align-items-center">
                    <div class="col">
                        <div className='picture col-2'>
                            <img className='img' src={store.band.profile_picture} alt='perfil' />
                        </div>
                    </div>
                    <div class="col">
                        <h1>{store.band.name}</h1>
                    </div>
                    <div class="col">
                        <div className='members'>
                            <p className='me-5'><strong>Miembros</strong></p>
                        </div>
                        <div className="d-flex flrex-row">
                            {store.band.members && store.band.members.map((member, index) => (
                                <div className={classes.root} key={index}>
                                    <Link to={`/profile/${member.id}`}>
                                        <Avatar className="avatar" alt={member.username} src={member.profile_image_url} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
            <div class="container text-center">
                <div class="row">
                    <div class="col">
                        <div className="cardContent">
                            <h5 className="card-title">Detalles</h5>
                            <p className="card-text">{store.band.description}</p>
                            <h5>Redes sociales</h5>
                            <div className='social-network'>
                                <a href={store.band.instagram} className="card-link"> <i className="fa-brands  fa-instagram icono fa-2xl"></i></a>
                                <a href={store.band.tiktok} className="card-link"><i className="fa-brands fa-tiktok icono fa-2xl"></i></a>
                            </div>
                        </div>
                        <div className="cardContent">
                            <h5>Categoria musical</h5>
                            <button className="btns-music">
                                <i className="fas fa-music mx-1" style={{ color: '#FFFFFF' }}></i>
                                {store.band.musical_categories && store.band.musical_categories.map(category => (
                                    <span key={category.id}>{category.name}</span>
                                ))}
                            </button>
                        </div>
                    </div>
                    <div class="col">
                        <div className="cardContent">
                            <h5>Proximos Eventos</h5>
                        </div>
                        <div className="cardContent">
                        {store.band.events && store.band.events.map((event, index) => (
                            <div className="position-relative" key={index}>
                                <div className="card-e">
                                    <div className="img">
                                        <Link to={`/events/${event.id}`}>
                                            <img src={event.picture_url} alt="img" draggable="false"className="card-img-top eventPicture" />
                                        </Link>
                                    </div>
                                    <div className="card-body">
                                        <h2 className="name">{event.name}</h2>
                                        <a className="description">{event.description}</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}