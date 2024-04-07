import React, { useRef, useState, useContext } from 'react';
import { Context } from '../../store/appContext';
import { useNavigate } from 'react-router-dom';
import "../profile/profile.css"

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
                    <button className='btns'><i className="fa-solid fa-plus" style={{ color: '#ffffff' }}></i> Crear evento </button>
                    <button className='btns'><i className="fa-solid fa-plus" style={{ color: '#ffffff' }}></i> Crear Banda </button>
                </div>
                <Modal show={show} onHide={handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Editar perfil</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <div className='picture'>
                            <h6 className='modal-title'>Foto de perfil</h6>
                            <img className='img' src='https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=600' alt='perfil' />
                        </div>




                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleClose}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={handleClose}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>

    );
}
