import React, { useRef, useState, useContext, useEffect } from 'react';
import { Context } from '../../store/appContext';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import "../profile/profile.css";

export const ProfileGuestBody = () => {
    
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const [selectedCategories, setSelectedCategories] = useState([]);


    // Función para formatear la fecha en el formato deseado
    const birthdate = store.singleUser.birthdate;
    const formatBirthdate = (birthdate) => {
        if (!birthdate) return ""; // Manejar el caso de que birthdate sea null o undefined
        const date = new Date(birthdate);
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    const formatEventDate = (eventDate) => {
        if (!eventDate) return "";
        const date = new Date(eventDate);
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
    
    useEffect(() => {
        actions.getUser(id).then((data) => {
        });
      },[]);
      useEffect(() => {

        actions.getAllEvents();
        console.log(store.currentUser);
    }, [store.currentUser]);


    return (
        <div className="container text-center">
            <div className="row">
                <div className="col-12 col-md-12 col-xl-6">
                    <div className="card-detail">
                        <h5>Descripcion</h5>
                        <p>{store.currentUser?.description}</p>
                        <div>
                            <a href={store.currentUser?.instagram} className="card-link" target="_blank"> <i className="fa-brands  fa-instagram fa-2xl icono"></i></a>
                            <a href={store.currentUser?.tiktok} className="card-link" target="_blank"><i className="fa-brands fa-tiktok fa-2xl icono"></i></a>
                        </div>
                    </div>
                    <div className="card-info">
                        <h5>Informacion</h5>
                        <p>Ciudad: {store.currentUser?.city}</p>
                        <p>Genero: {store.currentUser?.gender}</p>
                        <p>Cumpleaños: {formatBirthdate(birthdate)}</p>
                        <p>Puedes escucharme en:</p>
                    {store.currentUser && store.currentUser.created_band && (
                            <Link to={`/banda/${store.currentUser?.created_band.id}`}>
                                <button className='btns'>{store.currentUser?.created_band.name}</button>
                            </Link>   
                    )}
                    </div>
                    <div className="card-music">
                        <h5>Interes musical</h5>
                        <div className="container d-flex justify-content-center mb-3">
                        </div>
                        {/* Renderizar categorías musicales */}
                        <div className="d-flex flex-wrap  grid gap-2 row-gap-2">
                            {store.currentUser?.user_categories.map(category => (
                                <button
                                    key={category.id}
                                    className={`btns-music ${selectedCategories.includes(category.id) ? 'selected' : ''}`}
                                    onClick={() => handleCategoryClick(category.id)}
                                >
                                    <i className="fas fa-music" style={{ color: '#FFFFFF' }}></i> {category.name}
                                </button>
                            ))}
                        </div>

                    </div>
                </div>
                <div className="col-12 col-md-12 col-xl-6">
                    <div className="cardEvent">
                        <h5>Proximos Eventos</h5>
                    </div>
                    {store.allEvents
                        .filter(event => event.assistances.some(assistance => store.currentUser && assistance.user_id === store.currentUser.id))
                        .sort((a, b) => new Date(a.date) - new Date(b.date))
                        .map((event, index) => (
                            <div className="cardEvent card mb-3" key={index}>
                                <div>
                                    <Link to={`/events/${event.id}`} className="card-link">
                                        <img src={event.picture_url} alt="img" draggable="false" className="card-img-top eventPicture" />
                                    </Link>
                                </div>
                                <div>
                                    <h2>{event.name}</h2>
                                    <p>{event.description}</p>
                                    <p>{formatEventDate(event.date)}</p>
                                </div>
                            </div>
                        ))}

                </div>
            </div>
        </div>
    );
}





