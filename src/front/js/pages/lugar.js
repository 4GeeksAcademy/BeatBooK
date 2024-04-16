import React, { useEffect, useState, useContext } from "react";
import "/workspaces/BeatBooK/src/front/styles/lugar.css";
import { useParams } from "react-router-dom";
import { Context } from "/workspaces/BeatBooK/src/front/js/store/appContext.js";

export const Lugar = () => {
    const [place, setPlace] = useState(null);
    const [events, setEvents] = useState([]); // Definir el estado para los eventos
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
                    setEvents(data); // Actualizar el estado de los eventos
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
        <div className="container text-center">
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
                                        <div className="col">
                                            <div className="container">
                                                {/* Renderizar los eventos */}
                                                {events.map((event) => (
                                                    <div className="card" key={event.id}>
                                                        <div className="card-body">
                                                            <h5 className="card-title">{event.title}</h5>
                                                            <p className="card-text">{event.description}</p>
                                                            <p className="card-text">{event.date}</p>
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <br></br>
        </div>
    );
};
