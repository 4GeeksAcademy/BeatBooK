import React, { useState, useContext, useEffect } from 'react';
import { Context } from '../../store/appContext';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";

import "../profile/profile.css"
import { Link } from 'react-router-dom';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({


    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(0.2),
        },
    },
}));

export const ProfileBanner = () => {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    const [isImageSelected, setIsImageSelected] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [formData, setFormData] = useState({
        birthdate: '',
        description: '',
        gender: '',
        city: '',
        profile_image_url: '',
        banner_picture: '',
        instagram: '',
        tiktok: '',
    });


    const handleFileChange = async (e) => {
        setIsLoading(true);
        const file = e.target.files[0];

        const data = await actions.uploadUserPicture(file, id);

        if (data) {
            const imageUrl = data.url;
            setIsImageSelected(true);
            toast.success("Imagen subida con éxito");
        } else {
            console.error("Error uploading image");
            toast.error("Error al subir la imagen");
        }
        setIsLoading(false);
    };

    const handleBannerChange = async (e) => {
        setIsLoading(true);
        const file = e.target.files[0];

        // Pasa el ID del evento al método uploadEventPicture
        const data = await actions.uploadBannerPicture(file, id);

        if (data) {
            const bannerUrl = data.url;
            setIsImageSelected(true);
            toast.success("Imagen subida con éxito");
        } else {
            console.error("Error uploading image");
            toast.error("Error al subir la imagen");
        }
        setIsLoading(false);
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/users/${store.currentUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            if (!response.ok) {
                throw new Error('Error al enviar el formulario');
            }
            handleClose();

            const updatedUserResponse = await fetch(`${process.env.BACKEND_URL}/api/users/${store.currentUser.id}`);
            const updatedUserData = await updatedUserResponse.json();
            actions.getPrivateData(updatedUserData);

            toast.success("Cambios guardados con éxito");
        } catch (error) {
            console.error('Error al enviar el formulario:', error);
            toast.error("Error al guardar los cambios");
        }
    };

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const classes = useStyles();

    return (

        <div className="container text-center">
            <div className='Banner'>
                <img src={store.currentUser?.banner_picture} className='img-fluid' ></img>
            </div>
            <div className="container">

                <div className="row  text-start data">
                    <div className="col-12 col-md-4 col-xl-2">
                        <img className='ProfilePicture' src={store.currentUser?.profile_image_url} alt='perfil' />
                    </div>
                    <div className="col-12 col-md-8 col-xl-4 align-items-center">

                        <h1>{store.currentUser?.username}</h1>
                        <p>Puedes escucharme en:</p>
                        {store.currentUser && store.currentUser.created_band && (
                            <div className={classes.root}>

                                <Link to={`/banda/${store.currentUser?.created_band.id}`}>
                                    <Avatar className="avatar ms-2" alt={store.currentUser.username} src={store.currentUser.created_band.profile_picture} />
                                </Link>
                                <p className=' ms-1 mt-2'>{store.currentUser?.created_band.name}</p>
                            </div>
                        )}
                    </div>
                    <div className="col-12 col-md-12 col-l-6 d-flex align-items-end justify-content-end my-3">
                        

                        <button className='btns' onClick={handleShow}>
                            <i className="fa-solid fa-user-pen" style={{ color: '#ffffff' }}></i> Editar perfil
                        </button>


                        <div className="dropup-center dropup">
                        <button className="btns dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Construye Tu Sueño
                        </button>
                        <ul className="dropdown-menu d-item">
                            <li><a className="dropdown-item" href='/event/registre'>Crear un evento</a></li>
                            <li><a className="dropdown-item" href='/banda/registre'>Crear una banda</a></li>
                            <li><a className="dropdown-item" href="/lugar/registre">Crear un local</a></li>
                        </ul>
                    
                        </div>
                        </div>
                        {/* Modal para editar Información */}
                        <Modal show={show} onHide={handleClose} onSubmit={handleSubmit} className="custom-modal" >
                            <Modal.Header className='modal-bg' closeButton >
                                <Modal.Title className='modal-title'>Editar perfil</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className='modal-bg' >
                                <div className='edit-image'>
                                    <div className='image-title'>
                                        <h6 className='text-light-emphasis'>Foto de perfil</h6>

                                        <input
                                            type="file"
                                            onChange={handleFileChange}
                                            accept="image/*"

                                        />
                                    </div>
                                    <div className='modal-img'>
                                        <img className='img' src={store.currentUser?.profile_image_url} alt='perfil' />
                                    </div>
                                    {isLoading && <div className="text-center pt-2">
                                        <div className="spinner-border" style={{ width: '2rem', height: '2rem' }} role="status">
                                            <span className="visually-hidden">Loading...</span>
                                        </div>
                                    </div>}
                                </div>
                                <div className='edit-banner'>
                                    <div className='image-title'>
                                        <h6>Foto de portada</h6>
                                        <input
                                            type="file"
                                            onChange={handleBannerChange}
                                            accept="image/*"
                                        />
                                    </div>

                                    <div className='banner-img'>
                                        <img src={store.currentUser?.banner_picture} className="img-fluid" alt="fotoBanner" />
                                    </div>
                                </div>
                                <form onSubmit={e => handleSubmit(e)}>
                                    <div className='edit-info'>
                                        <div className='edit-detail'>
                                            <div className='image-title'>
                                                <h6>Detalles</h6>
                                            </div>
                                            <div className='modal-detail'>
                                                <textarea name='description' value={formData.description} onChange={handleChange}></textarea>
                                            </div>
                                        </div>
                                        <div className='image-title'>
                                            <h6>Información</h6>
                                        </div>
                                        <div className='modal-info'>
                                            <div className="inputGroup">
                                                <input placeholder="Fecha de nacimiento" className="input" name="birthdate" type="date" value={formData.birthdate} onChange={handleChange} />
                                                <input placeholder="Género" className="input" name="gender" type="text" value={formData.gender} onChange={handleChange} />
                                                <input placeholder="Ciudad" className="input" name="city" type="text" value={formData.city} onChange={handleChange} />
                                                <input placeholder="Instagram" className="input" name="instagram" type="text" value={formData.instagram} onChange={handleChange} />
                                                <input placeholder="Tiktok" className="input" name="tiktok" type="text" value={formData.tiktok} onChange={handleChange} />
                                            </div>
                                        </div>
                                    </div>
                                    <Modal.Footer>
                                        <Button className='btns' type="submit">Guardar cambios</Button>
                                    </Modal.Footer>
                                </form>
                            </Modal.Body>

                    

                </div>
            </div>
        </div>

    );
}