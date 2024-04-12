import React, { useRef, useState, useContext, useEffect } from 'react';
import { Context } from '../../store/appContext';
import "../profile/profile.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const ProfileBody = (props) => {
    const { store, actions } = useContext(Context);
    const [selectedCategories, setSelectedCategories] = useState([]);
    
    //Manejo del modal//
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    
    // Función para formatear la fecha en el formato deseado
    const birthdate = store.currentUser?.birthdate;
    const formatBirthdate = (birthdate) => {
        if (!birthdate) return ""; // Manejar el caso de que birthdate sea null o undefined
        const date = new Date(birthdate);
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    useEffect(() => {
        actions.getAllEvents();
    }, []);

    const handleCategoryClick = (categoryId) => {
        // Toggle de selección de categorías
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        } else {
            setSelectedCategories([...selectedCategories, categoryId]);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/user/${store.currentUser.id}/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ categories: selectedCategories })
            });
            if (!response.ok) {
                throw new Error('Error al enviar el formulario');
            }
            handleClose(); // Cierra el modal después de enviar el formulario
            // Actualizar estado de la aplicación o mostrar mensaje de éxito
        } catch (error) {
            // Manejar errores de solicitud
            console.error('Error al enviar el formulario:', error);
        }
    };
    

    return (
        <div className="container p-0">
            <div className="container row">
                <div className="details col-5">
                        {/* Card que renderiza los detalles */}
                    <div className="card-detail my-4">
                        <div className="card-detail-content">
                            <h5 className="card-title">Detalles</h5>
                            <p className="card-text">{store.currentUser?.description}</p>
                            <a href="{store.currentUser?.instagram}" className="card-link"> <i className="fa-brands  fa-instagram fa-2xl" style={{ color: "#000000" }}></i></a>
                            <a href="{store.currentUser?.tiktok}" className="card-link"><i className="fa-brands fa-tiktok fa-2xl" style={{ color: "#000000" }}></i></a>
                        </div>
                    </div>
                        {/* ---------------------------------- */}

                         {/* Card que renderiza la informacion*/}
                    <div className="card-info my-4">
                        <div className="card-detail-info">
                            <h5 className="card-title">Información</h5>
                            <p className="card-text"><strong>Ciudad:</strong> {store.currentUser?.city}</p>
                            <p className="card-text"><strong>Genero:</strong> {store.currentUser?.gender}</p>
                            <p className="card-text"><strong>Cumpleaños:</strong> {formatBirthdate(birthdate)}</p>
                        </div>
                    </div>
                     {/* ---------------------------------- */}

                      {/* Card que renderiza interes musical*/}
                    <div className="card-music mt-4">
                        <div className="card-music-detail">
                            <div className="d-flex">
                                <h5 className="card-title">Interes musical</h5>
                                <button className="btns-add" onClick={handleShow}><i className="fas fa-plus" style={{ color: '#FFFFFF' }}></i></button>
                            </div>
                            {/* Renderizar categorías musicales */}
                            <div className="d-flex flex-wrap grid gap-0 row-gap-2">
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
                    {/* ---------------------------------- */}
                </div>

                <div className="events col-7">
                    <nav className="navba navbar-expand-lg bg-body-tertiary my-3">
                        <div className="container-fluid d-flex justify-content-center align-items-center">
                            <h5>Eventos</h5>
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
                {/* Modal para editar categoria musical */}
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title><h2>Selecciona tus categorías musicales favoritas</h2></Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <form onSubmit={handleSubmit}>
                            {store.allCategories.map(category => (
                                <div key={category.id} className="category-item">
                                    <input
                                        type="checkbox"
                                        id={category.id}
                                        value={category.id}
                                        checked={selectedCategories.includes(category.id)}
                                        onChange={() => handleCategoryClick(category.id)}
                                    />
                                    <label htmlFor={category.id}>{category.name}</label>
                                </div>
                            ))}
                            <button className='btns' type="submit">Guardar</button>
                        </form>
                    </Modal.Body>
                </Modal>
                {/* ---------------------------------- */}
            </div>
        </div>
    );
}





