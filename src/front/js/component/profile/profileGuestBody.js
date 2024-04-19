import React, { useRef, useState, useContext, useEffect } from 'react';
import { Context } from '../../store/appContext';
import { useParams } from 'react-router-dom';
import "../profile/profile.css";

export const ProfileGuestBody = () => {
    
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const [selectedCategories, setSelectedCategories] = useState([]);


    // Función para formatear la fecha en el formato deseado
    const birthdate = store.currentUser?.birthdate;
    const formatBirthdate = (birthdate) => {
        if (!birthdate) return ""; // Manejar el caso de que birthdate sea null o undefined
        const date = new Date(birthdate);
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    }
    
    useEffect(() => {
        actions.getUser(id).then((data) => {
          console.log("userData", data);
        });
      },[]);


    return (
        <div className="container p-0">
            <div className="container row">
                <div className="details col-5">
                    {/* Card que renderiza los detalles */}
                    <div className="card-detail my-4">
                        <div className="card-detail-content">
                            <h5 className="card-title">Detalles</h5>
                            <p className="card-text">{store.singleUser.description}</p>
                        </div>
                        <div className='redes-footer'>
                            <a href={store.singleUser.instagram} className="card-link"> <i className="fa-brands  fa-instagram fa-2xl" style={{ color: "#000000" }}></i></a>
                            <a href={store.singleUser.tiktok} className="card-link"><i className="fa-brands fa-tiktok fa-2xl" style={{ color: "#000000" }}></i></a>
                        </div>
                    </div>
                    {/* ---------------------------------- */}

                    {/* Card que renderiza la informacion*/}
                    <div className="card-info my-4">
                        <div className="card-detail-info">
                            <h5 className="card-title">Información</h5>
                            <p className="card-text"><strong>Ciudad:</strong> {store.singleUser.city}</p>
                            <p className="card-text"><strong>Genero:</strong> {store.singleUser.gender}</p>
                            <p className="card-text"><strong>Cumpleaños:</strong> {formatBirthdate(birthdate)}</p>
                        </div>
                    </div>
                    {/* ---------------------------------- */}

                    {/* Card que renderiza interes musical*/}
                    <div className="card-music mt-4">
                        <div className="card-music-detail">
                            <div className="d-flex">
                                <h5 className="card-title">Interes musical</h5>
                                
                            </div>
                            {/* Renderizar categorías musicales */}
                            <div className="d-flex flex-wrap grid gap-0 row-gap-2">
                                {store.singleUser.user_categories && store.singleUser.user_categories.map(category => (
                                    <button
                                        key={category.id}
                                        className={`btns-music ${selectedCategories.includes(category.id) ? 'selected' : ''}`}
                                    >
                                        <i className="fas fa-music" style={{ color: '#FFFFFF' }}></i> {category.name}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    {/* ---------------------------------- */}
                </div>

                <div className="events col-7">
                    <nav className="navba navbar-expand-lg bg-body-tertiary my-3">
                        <div className="container-fluid d-flex justify-content-center align-items-center">
                            <h5>¡Eventos en mi radar!</h5>
                        </div>
                    </nav>
                    <div className="wrapper-e">
                        <ul className="carousel-e">
                            {store.allEvents.map((event, index) => (
                                <li className="card-e" key={index}>
                                    <div className="img">
                                        <img src={event.picture_url} alt="img" draggable="false" className="img" />
                                    </div>
                                    <div className="card-c-content">
                                        <h2 className="name">{event.name}</h2>
                                        <span className="description">{event.description}</span>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}





