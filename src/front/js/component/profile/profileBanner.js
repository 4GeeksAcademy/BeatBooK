import React, { useRef, useState, useContext } from 'react';
import { Context } from '../../store/appContext';
import { useNavigate } from 'react-router-dom';
import "../profile/profile.css"



export const ProfileBanner = () => {
    const [bannerImage, setBannerImage] = useState("https://images.pexels.com/photos/18323371/pexels-photo-18323371/free-photo-of-mujer-musica-guitarra-actuacion.jpeg?auto=compress&cs=tinysrgb&w=600");
    const navigate = useNavigate();

    const handleUploadImage = () => {
        // Aquí puedes implementar la lógica para subir una imagen
        // Puedes usar una librería para manejar la subida de archivos o hacer una solicitud a un servidor
        alert('Subir una imagen');
    }

    const handleDeleteImage = () => {
        // Aquí puedes implementar la lógica para eliminar la imagen
        // Por ejemplo, puedes restablecer el estado a una imagen predeterminada
        setBannerImage(""); // Esto eliminará la imagen
        alert('Eliminar imagen');
    }

    return (
        <div className="container">
            <div className='banner-profile'>
                <img src={bannerImage} className="img" alt="fotoBanner" />
                <div class="paste-button">
                    <button class="button">Editar foto de portada</button>
                    <div class="dropdown-content">
                        <button id='top' className="dropdown-item" onClick={handleUploadImage}>Subir una imagen</button>
                        <button id='bottom' className="dropdown-item" onClick={handleDeleteImage}>Eliminar imagen</button>
                    </div>
                </div>
                </div>
            <div className='row profile-picture'>
                <div className='col-4 picture'>
                <div classname='image'></div>
                <div classname='upload'></div>
                </div>
                <div className='col-4 Username'></div>
                <div className='col-4 event'></div>
            </div>
        </div>
        
    );
}

