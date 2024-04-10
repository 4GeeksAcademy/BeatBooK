import React, { useRef, useState, useContext } from 'react';
import { Context } from '../../store/appContext';
import { useNavigate } from 'react-router-dom';
import "../profile/profile.css"
import { ProfileBody } from './profileBody';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';



export const ProfileBanner = () => {
    const [bannerImage, setBannerImage] = useState("https://images.pexels.com/photos/18323371/pexels-photo-18323371/free-photo-of-mujer-musica-guitarra-actuacion.jpeg?auto=compress&cs=tinysrgb&w=600");
    const [show, setShow] = useState(false);
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);

    const [formData, setFormData] = useState({
        birthdate: '',
        description: '',
        gender: '',
        city: '',
        profile_image_url: '',
        banner_picture: '',
        instagram: '',
        tiktok: ''
    });

      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`/api/users/${store.currentUser.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
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



    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);



    const handleUploadImage = () => {
        // Aimplementar  lógica para subir una imagen

        alert('Subir una imagen');
    }

    const handleDeleteImage = () => {
        // implementar lógica para eliminar la imagen

        setBannerImage("");  // ¿manejarlo asi o de otra manera?
        alert('Eliminar imagen');
    }

    const handleCreateEvent = () => {
        navigate('/event/registre')
    }

    const handleCreateBand = () => {
        navigate('/band/registre')
    }

    return (
        <div className="container d-flex flex-column justify-content-center">
            <div className='row'>
                <div className='banner-profile col-12 col-md-12 col-lx-12 '>
                    <img src={bannerImage} className="img-fluid" alt="fotoBanner" />
                </div>
            </div>
            <div className='row profile-picture'>
                <div className='col-12 col-md-4 col-xl-2 picture'>
                    <div className='container'>
                        <img className='img' src={store.currentUser?.profile_image_url} alt='perfil' />
                    </div>
                </div>
                <div className='col-12 col-md-4 col-xl-4 m-3 p-5 d-flex align-items-center justify-content-start' id='username'>
                    <div className=''>
                        <h1>{store.currentUser?.username}</h1>
                    </div>
                </div>
                <div className='col-12 col-md-4 col-xl-5 d-flex align-items-end justify-content-end' id="botones">
                    <button className='btns' onClick={handleShow}><i className="fa-solid fa-user-pen" style={{ color: '#ffffff' }}></i> Editar perfil</button>

                    <button className='btns'
                        onClick={() => { handleCreateEvent() }}>
                        <i className="fa-solid fa-plus" style={{ color: '#ffffff' }}>
                        </i> Crear evento
                    </button>

                    <button className='btns'
                        onClick={() => { handleCreateBand() }}>
                        <i className="fa-solid fa-plus" style={{ color: '#ffffff' }}></i>
                        Crear Banda
                    </button>
                </div>
                <Modal show={show} onHide={handleClose} onSubmit={handleSubmit}>
                    <Modal.Header closeButton>
                        <Modal.Title className='modal-title'>Editar perfil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='edit-image'>
                            <div className='image-title'>
                                <h6>Foto de perfil</h6>
                                <Button className='btns'>Editar</Button>
                            </div>
                            <div className='modal-img'>
                                <img className='img' src="" alt='perfil' />
                            </div>
                        </div>
                        <div className='edit-banner'>
                            <div className='image-title'>
                                <h6>Foto de portada</h6>
                                <Button className='btns'>Editar</Button>
                            </div>
                            <div className='banner-img'>
                                <img src={bannerImage} className="img-fluid" alt="fotoBanner" />
                            </div>
                        </div>
                        <div className='edit-detail'>
                            <div className='image-title'>
                                <h6>Detalles</h6>
                                <Button className='btns'>Editar</Button>
                            </div>
                            <div className='modal-detail'>
                                <textarea>{store.currentUser?.description}</textarea>
                            </div>
                        </div>
                        <form onSubmit={handleSubmit}>
                        <div className='edit-info'>
                            <div className='image-title'>
                                <h6>Información</h6>
                                <Button className='btns' type="submit">Guardar cambios</Button>
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
                    </form>
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
            </div>
        </div>

    );
}
