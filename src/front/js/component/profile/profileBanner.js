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
                        <img className='img' src='https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600' alt='perfil' />
                    </div>
                </div>
                <div className='col-12 col-md-4 col-xl-4 m-3 p-5 d-flex align-items-center justify-content-start' id='username'>
                    <div className=''>
                        <h1>Miritzila</h1>
                        <p>Miriam concepcion</p>
                    </div>
                </div>
                <div className='col-12 col-md-4 col-xl-5 d-flex align-items-end justify-content-end' id="botones">
                    <button className='btns' onClick={handleShow}><i className="fa-solid fa-user-pen" style={{ color: '#ffffff' }}></i> Editar perfil</button>
                    
                    <button className='btns' onClick={() => {handleCreateEvent()}}><i className="fa-solid fa-plus" style={{ color: '#ffffff' }}></i> Crear evento </button>
                   
                    <button className='btns' onClick={() => {handleCreateBand()}}><i className="fa-solid fa-plus" style={{ color: '#ffffff' }}></i> Crear Banda </button>
                </div>
                <Modal show={show} onHide={handleClose}>
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
                                <img className='img' src='https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600' alt='perfil' />
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
                                <textarea>Versátil artista con un estilo musical único. Destaca en el canto y domina el piano con pasión. 🎶🎤🎹</textarea>
                            </div>
                        </div>
                        <div className='edit-info'>
                            <div className='image-title'>
                                <h6>Información</h6>
                                <Button className='btns'>Editar</Button>
                            </div>
                            <div className='modal-info'>
                                <div class="inputGroup">
                                    <input placeholder="Fecha de nacimiento" class="input" name="fecha" type="text" />
                                    <input placeholder="Genero" class="input" name="genero" type="text" />
                                    <input placeholder="Ciudad" class="input" name="ciudad" type="text" />
                                    <input placeholder="Instagram" class="input" name="instagram" type="text" />
                                    <input placeholder="Tiktok" class="input" name="tiktok" type="text" />
                                </div>
                            </div>
                        </div>
                    </Modal.Body>
                    <Modal.Footer>

                    </Modal.Footer>
                </Modal>
            </div>
        </div>

    );
}

