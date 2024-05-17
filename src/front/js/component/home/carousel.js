import React, { useContext, useEffect, useState } from 'react';
import { Context } from '../../store/appContext';
import "./carousel.css";
import { useNavigate } from 'react-router-dom';

export const Carousel = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();
    const [index, setIndex] = useState(0);
// const
    const handleLearnMore = (id) => {
        navigate(`/events/${id}`);
    };

    useEffect(() => {
        actions.getAllEvents();
    }, []);



    return (
        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
            <div className="carousel-inner">
                {store.allEvents.map((event, idx) => (
                    <div key={idx} className={`carousel-item ${idx === index ? 'active' : ''} c-item`}>
                        <a onClick={() => handleLearnMore(event.id)}><img src={event.picture_url} className="d-block w-100 c-img" alt="foto" /></a>
                        <div className="carousel-caption cardContent">
                            <h5 className='text-center my-3'>{event.name}</h5>
                        </div>
                    </div>
                ))}
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>
        </div>
    );
};
