import React, { useRef, useState, useContext, useEffect } from 'react';
import { Context } from '../../store/appContext';
import "../profile/profile.css";
import "/workspaces/BeatBooK/src/front/styles/paginasEspecificas.css";
import Modal from 'react-bootstrap/Modal';
import { Link } from 'react-router-dom';

export const ProfileBody = (props) => {
    const { store, actions } = useContext(Context);
    const [selectedCategories, setSelectedCategories] = useState([]);

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
        if (!birthdate) return "";
        const date = new Date(birthdate);
        return date.toLocaleDateString('es-ES', { year: 'numeric', month: 'long', day: 'numeric' });
    }

    useEffect(() => {
        actions.getAllEvents();
        console.log(store.currentUser);
    }, [store.currentUser]);


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
                body: JSON.stringify({ category_id: categoryId })
            });
            if (!response.ok) {
                throw new Error('Error al eliminar la categoría musical');
            }
            console.log('Categoría musical eliminada exitosamente');
            handleCloseDeleteModal();
            const updatedUserResponse = await fetch(`${process.env.BACKEND_URL}/api/users/${store.currentUser.id}`);
            const updatedUserData = await updatedUserResponse.json();
            actions.getPrivateData(updatedUserData);

        } catch (error) {

            console.error('Error al eliminar la categoría musical:', error);
        }
    };
    const User = JSON.parse(localStorage.getItem('user'));
    const userId = User.user_id;


    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchPrivateData = async () => {
            try {
                await actions.getPrivateData();
                console.log("esta info esta actual ", store.currentUser);
            } catch (error) {
                console.error('Error al obtener datos privados:', error);
            }
        }
        fetchPrivateData();
    }, []);

    useEffect(() => {
        const fetchMusicalCategories = async () => {
            try {
                await actions.getMusicalCategories();
            } catch (error) {
                console.error('Error al obtener las categorías musicales:', error);
            }
        }
        fetchMusicalCategories();
    }, []);

    useEffect(() => {
        console.log("esta info esta actual2 ", store.currentUser);
        console.log(store.allCategories);
    }, [store.currentUser, store.allCategories]);


    return (
        <div class="container text-center">
            <div class="row">
                <div class="col">
                    <div className="cardContent">
                        <h5>Descripcion</h5>
                        <p>{store.currentUser?.description}</p>
                        <div>
                            <a href={store.currentUser?.instagram} className="card-link"> <i className="fa-brands  fa-instagram fa-2xl icono"></i></a>
                            <a href={store.currentUser?.tiktok} className="card-link"><i className="fa-brands fa-tiktok fa-2xl icono"></i></a>
                        </div>
                    </div>
                    <div className="cardContent">
                        <h5>Informacion</h5>
                        <p>Ciudad: {store.currentUser?.city}</p>
                        <p>Genero:{store.currentUser?.gender}</p>
                        <p>Cumpleaños: {store.currentUser?.birthdate}</p>
                    </div>
                    <div className="cardContent">
                        <h5>Interes musical</h5>
                        <div className="container d-flex justify-content-center">
                            <div className="d-flex align-items-center">
                                <button className="btns-add" onClick={handleShowAddModal}><i className="fas fa-plus" style={{ color: '#FFFFFF' }}></i></button>
                                <button className="btns-add" onClick={handleShowDeleteModal}><i className="fas fa-minus" style={{ color: '#FFFFFF' }}></i></button>
                            </div>
                        </div>
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
                    <Modal show={showAddModal} onHide={handleCloseAddModal}>
                        <Modal.Header closeButton>
                            <Modal.Title><h2>Selecciona tus categorías musicales favoritas</h2></Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <form onSubmit={handleSubmit}>
                                {store.allCategories.map(category => (
                                    <div key={category.id} className="category-item">
                                        <input
                                            type="radio"
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
                    <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
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
                                        <button className="btn" onClick={() => handleDeleteCategory(category.id)}>Eliminar</button>
                                    </div>
                                ))}
                            </form>
                        </Modal.Body>
                    </Modal>
                </div>
                <div class="col">
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