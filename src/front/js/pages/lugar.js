import React, { useEffect, useState, useContext } from "react";
import "../../styles/paginasEspecificas.css";
import { useParams } from "react-router-dom";
import { Context } from "../store/appContext";
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
                    <div className='Banner'>
                        <img src={place.banner_picture} className='img-fluid' ></img>
                    </div>
                    <div class="container text-start placeData">
                        <div class="row align-items-center">
                            <div class="col">
                                <img className='ProfilePicture' src={place.profile_picture} alt='perfil' />
                            </div>
                            <div class="col-8">
                                <h1 className='ms-2'>{place.name}</h1>
                                <p className='ms-2'>{place.description}</p>
                            </div>
                            <div class="col">
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
                                <div className="cardContent card mb-3">
                                    {events.map((event) => (
                                        <div key={event.id} className="position-relative">
                                            <Link to={`/eventos/${event.id}`}>
                                                <img src={event.picture_url} className="card-img-top eventPicture" alt="event_picture" />
                                            </Link>
                                            <div className="card-body">
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
