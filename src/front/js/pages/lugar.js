import React, { useEffect, useState, useContext } from "react";
import "/workspaces/BeatBooK/src/front/styles/lugar.css";
import { useParams } from "react-router-dom";
import { Context } from "/workspaces/BeatBooK/src/front/js/store/appContext.js";
import { Link } from "react-router-dom";

export const Lugar = () => {
    const [place, setPlace] = useState(null);
    const [events, setEvents] = useState([]);
    const { place_id } = useParams();
    const { actions } = useContext(Context);

    useEffect(() => {
        actions.getPlace(place_id)
            .then((data) => {
                if (data) {
                    setPlace(data);
                } else {
                    console.error(`Place with ID ${place_id} not found`);
                    setPlace(null);
                }
            })
            .catch((error) => {
                console.error('Error fetching place:', error);
                setPlace(null);
            });

        actions.getPlaceEvents(place_id)
            .then((data) => {
                if (Array.isArray(data)) {
                    setEvents(data);
                } else {
                    console.error('Data is not an array:', data);
                    setEvents([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching events:', error);
                setEvents([]);
            });
    }, [place_id]);

    return (
        <div className="container">
            {place && (
                <div>
                    <div className="container text-center">
                        <div className="row">
                            <div className="col">
                            </div>
                            <div className="col-9">
                                <div className="bannerContainer">
                                    <img src={place.banner_picture} className="BannerPicture" alt="place_banner_picture" />
                                </div>
                                <div className="container">
                                    <div className="row align-items-center borderBottom">
                                        <div className="col-3">
                                            <div className="ProfilePictureContainer">
                                                <img src={place.profile_picture} className="ProfilePicture" alt="place_profile_picture" />
                                            </div>
                                        </div>
                                        <div className="col text-start">
                                            <h1>{place.name}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div class="container text-center">
                                    <div class="row">
                                        <div class="col">
                                            <div className="card-band-content">
                                                <h5 className="card-title">Detalles</h5>
                                                <p className="card-text">{place.description}</p>
                                                <h5>Redes sociales</h5>
                                                <div className='social-network'>
                                                    <a href={place.instagram} className="card-link"> <i className="fa-brands  fa-instagram fa-2xl" style={{ color: "#000000" }}></i></a>
                                                    <a href={place.tiktok} className="card-link"><i className="fa-brands fa-tiktok fa-2xl" style={{ color: "#000000" }}></i></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div className="container">
                                                <div className="card"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                            </div>
                        </div>
                    </div>
                    <div class="container text-center align-items-center">
                        <div class="row">
                            <div class="col">
                                <div className="cardContent">
                                    <h5>Mapa</h5>
                                    <p>{place.address}</p>
                                </div>
                                <div className="cardContent">
                                    <h5>Teléfono</h5>
                                    <p>{place.phone}</p>
                                    <h5>Redes sociales</h5>
                                    <div className='socialNetwork'>
                                        <a href={place.instagram} className="card-link"> <i className="fa-brands  fa-instagram fa-2xl" style={{ color: "#000000" }}></i></a>
                                        <a href={place.tiktok} className="card-link"><i className="fa-brands fa-tiktok fa-2xl" style={{ color: "#000000" }}></i></a>
                                    </div>
                                </div>
                            </div>
                            <div class="col">
                                <div className="cardContent">
                                    <h5>Próximos Eventos</h5>
                                </div>
                                {/*Card eventos*/}
                                <div className="eventCardContent card mb-3">
                                    {events.map((event) => (
                                        <div key={event.id} className="position-relative">
                                            <Link to={`/eventos/${event.id}`}>
                                                <img src={event.picture_url} className="card-img-top eventPicture" alt="event_picture"></img>
                                            </Link>
                                            <div class="card-body">
                                                <h5>{event.name}</h5>
                                                <p>{event.description}</p>
                                            </div>
                                            <div className="gradient-overlay"></div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            {/*Fin Card eventos*/}
                        </div>
                    </div>

                </div>
            )
            }
        </div >
    );
}
