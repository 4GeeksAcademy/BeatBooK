import React, { useRef, useState, useContext, useEffect } from 'react';
import { Context } from '../../store/appContext';
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
    
    useEffect(() => {
        actions.getUser(id).then((data) => {
        });
      },[]);


    return (
        <div className="container text-center">
            <div className="row">
                <div className="col">
                    <div className="cardContent">
                        <h5>Descripcion</h5>
                        <p>{store.singleUser.description}</p>
                        <div>
                            <a href={store.singleUser.instagram} className="card-link" target="_blank"> <i className="fa-brands  fa-instagram fa-2xl icono"></i></a>
                            <a href={store.singleUser.tiktok} className="card-link" target="_blank"><i className="fa-brands fa-tiktok fa-2xl icono"></i></a>
                        </div>
                    </div>
                    <div className="cardContent">
                        <h5>Informacion</h5>
                        <p>Ciudad: {store.singleUser.city}</p>
                        <p>Genero: {store.singleUser.gender}</p>
                        <p>Cumpleaños: {formatBirthdate(birthdate)}</p>
                    </div>
                    <div className="cardContent">
                        <h5>Interes musical</h5>
                    {/* Renderizar categorías musicales */}
                    <div className="d-flex flex-wrap  grid gap-2 row-gap-2">
                        {store.singleUser.user_categories && store.singleUser.user_categories.map(category => (
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
                <div className="col">
                    <div className="cardContent">
                        <h5>Proximos Eventos</h5>
                    </div>
                    {store.allEvents.map((event, index) => (
                        <div className="cardContent card mb-3" key={index}>
                            <div>
                                <Link to={`/events/${event.id}`} className="card-link">
                                    <img src={event.picture_url} alt="img" draggable="false" className="card-img-top eventPicture" />
                                </Link>
                            </div>
                            <div>
                                <h2>{event.name}</h2>
                                <p>{event.description}</p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
}





