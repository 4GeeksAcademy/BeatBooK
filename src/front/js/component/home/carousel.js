import React, {useContext, useEffect} from 'react';
import { Context } from '../../store/appContext';
import "/workspaces/BeatBooK/src/front/js/component/home/carousel.css";
import { useNavigate } from 'react-router-dom';

export const Carousel = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate()

    useEffect(() => {
        actions.getEvents();
    }, []);

    const handleLearnMore = (id) => {
        navigate(`/api/events/${id}`); // Navega a la página de detalles del evento.
      };

    return (
        <div id="carouselExampleIndicators" className="carousel slide">
            <div className="carousel-inner">
                {store.events.map((event, index) => (
                    <div key={index} className={`carousel-item ${index === 0 ? 'active' : ''} c-item`}>
                        <a onClick={() => handleLearnMore(event.id)}><img src={event.pictures} className="d-block w-100 c-img" alt="foto" /></a> 
                        <div className="carousel-caption d-none d-md-block">
                           <h5 className='title'>{event.name}</h5>
                            <p className='description'>{event.description}</p>
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
