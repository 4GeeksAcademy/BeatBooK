import React, { useRef, useState, useContext, useEffect } from 'react';
import { Context } from '../../store/appContext';
import "../profile/profile.css";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

export const ProfileBody = (props) => {
    const { store, actions } = useContext(Context);
    const [selectedCategories, setSelectedCategories] = useState([]);

    useEffect(() => { actions.getPrivateData(); }, []);

    // Manejo del modal de agregar categorías
    const [showAddModal, setShowAddModal] = useState(false);
    const handleShowAddModal = () => setShowAddModal(true);
    const handleCloseAddModal = () => setShowAddModal(false);

    // Manejo del modal de eliminar categorías
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const handleShowDeleteModal = () => setShowDeleteModal(true);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);

    const handleShow = () => {
        const defaultSelectedCategories = store.currentUser.user_categories.map(category => category.id);
        setSelectedCategories(defaultSelectedCategories);
        setShow(true);
    };
    const handleShowDelete = () => {
        const defaultSelectedCategories = store.currentUser.user_categories.map(category => category.id);
        setSelectedCategories(defaultSelectedCategories);
        setShow(true);
    };

    // Función para formatear la fecha en el formato deseado
    const birthdate = store.currentUser?.birthdate;
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

        actions.getAllEvents();
    }, [store.currentUser]);


    const handleCategoryClick = (categoryId) => {
        // Toggle de selección de categorías
        if (selectedCategories.includes(categoryId)) {
            setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
        } else {
            setSelectedCategories([categoryId]);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(selectedCategories)
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/user/${store.currentUser.id}/categories`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ category_id: selectedCategories })
            });
            if (!response.ok) {
                throw new Error('Error al enviar el formulario');
            }
            handleCloseAddModal();
            const updatedUserResponse = await fetch(`${process.env.BACKEND_URL}/api/users/${store.currentUser.id}`);
            const updatedUserData = await updatedUserResponse.json();
            actions.getPrivateData(updatedUserData);

        } catch (error) {
            // Manejar errores de solicitud
            console.error('Error al enviar el formulario:', error);
        }
    };
    const handleDeleteCategory = async (categoryId) => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/user/${store.currentUser.id}/categories`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ category_id: categoryId }) // Usar categoryId en lugar de userId
            });
            if (!response.ok) {
                throw new Error('Error al eliminar la categoría musical');
            }
            // Actualizar el estado o realizar cualquier acción adicional necesaria
            console.log('Categoría musical eliminada exitosamente');
            handleCloseDeleteModal();
            const updatedUserResponse = await fetch(`${process.env.BACKEND_URL}/api/users/${store.currentUser.id}`);
            const updatedUserData = await updatedUserResponse.json();
            actions.getPrivateData(updatedUserData);

        } catch (error) {
            // Manejar errores de solicitud
            console.error('Error al eliminar la categoría musical:', error);
        }
    };


    return (
        <div className="container text-center">
            <div className="row">
                <div className="col-12 col-md-12 col-xl-6">
                    <div className="card-detail">
                        <h5>Descripción</h5>
                        <p>{store.currentUser?.description}</p>
                        <div>
                            <a href={store.currentUser?.instagram} className="card-link" target="_blank"> <i className="fa-brands  fa-instagram fa-2xl icono"></i></a>
                            <a href={store.currentUser?.tiktok} className="card-link" target="_blank"><i className="fa-brands fa-tiktok fa-2xl icono"></i></a>
                        </div>
                    </div>
                    <div className="card-info">
                        <h5>Información</h5>
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
                        <h5>Interés musical</h5>
                        <div className="container d-flex justify-content-center mb-3">
                            <div className="d-flex align-items-center">
                                <button className="btns-add" onClick={handleShowAddModal}><i className="fas fa-plus" style={{ color: '#FFFFFF' }}></i></button>
                                <button className="btns-add" onClick={handleShowDeleteModal}><i className="fas fa-minus" style={{ color: '#FFFFFF' }}></i></button>
                            </div>
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
                        <h5>Próximos Eventos</h5>
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
            <Modal show={showAddModal} onHide={handleCloseAddModal}>
                <Modal.Header className='modal-bg' closeButton>
                    <div className='delete-title'>
                        <Modal.Title><h2>Selecciona tus categorías musicales favoritas</h2></Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body className='modal-bg'>
                    <form onSubmit={handleSubmit}>
                        {store.allCategories.map(category => (
                            <div key={category.id} className="category-item">
                                <input
                                    type="radio"
                                    id={category.id}
                                    name={category.name}
                                    value={category.id}
                                    checked={selectedCategories.includes(category.id)}
                                    onChange={() => handleCategoryClick(category.id)}
                                />
                                <label className="ms-3" htmlFor={category.id}> {category.name}</label>
                            </div>
                        ))}
                        <Button className='btns' type="submit">Guardar</Button>
                    </form>
                </Modal.Body>
            </Modal>
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header className='modal-bg' closeButton>
                    <div className='delete-title'>
                        <Modal.Title><h2>Selecciona tus categorias musicales favoritas</h2></Modal.Title>
                    </div>
                </Modal.Header>
                <Modal.Body className='modal-bg'>
                    <form onSubmit={handleSubmit}>
                        {store.allCategories.map(category => (

                            <div key={category.id} className="category-item d-flex justify-content-between align-items-center
                                    ">
                                <input
                                    type="checkbox"
                                    id={category.id}
                                    value={category.id}
                                    checked={selectedCategories.includes(category.id)}
                                    onChange={() => handleCategoryClick(category.id)}
                                />
                                <label htmlFor={category.id}>{category.name}</label>
                                <button className="btns" onClick={() => handleDeleteCategory(category.id)}>Eliminar</button>
                            </div>
                        ))}
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
}