import React, { useRef, useState, useContext, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { Context } from '../../store/appContext';
import { useNavigate } from 'react-router-dom';
import "../band/Bandstyle.css"
import "../profile/profile.css"
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { toast } from "react-toastify";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(0.2),
        },
    },
}));

export const BandBanner = (props) => {
    const { id } = useParams();
    const navigate = useNavigate()
    const { actions, store } = useContext(Context);
    const [bandData, setbandData] = useState(null);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [isImageSelected, setIsImageSelected] = useState(false);
   
    const [formData, setFormData] = useState({
        description: '',
        profile_picture: '',
        banner_picture: '',
        instagram: '',
        tiktok: '',
    });

    useEffect(() => {
        actions.getBand(id).then((data) => {
            setbandData(data);
           
        });
    }, [id]);

    // Handlers para mostrar y ocultar los modales respectivos
    const handleShowEditModal = () => setShowEditModal(true);
    const handleCloseEditModal = () => setShowEditModal(false);
    const handleShowDeleteModal = () => setShowDeleteModal(true);
    const handleCloseDeleteModal = () => setShowDeleteModal(false);

    const handleBannerChange = async (e) => {
        setIsLoading(true);
        const file = e.target.files[0];

        // Pasa el ID del evento al método uploadEventPicture
        const data = await actions.uploadBannerBand(file, id);

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

    const handleFileChange = async (e) => {
        setIsLoading(true);
        const file = e.target.files[0];

        // Pasa el ID del evento al método uploadEventPicture
        const data = await actions.uploadBandPicture(file, id);

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

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
       
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/bands/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            
            handleCloseEditModal(); // Cierra el modal después de enviar el formulario

            // Actualizar datos de usuario en el estado de la aplicación
            const updatedBandResponse = await fetch(`${process.env.BACKEND_URL}/api/bands/${id}`);
            const updatedBandData = await updatedBandResponse.json();
            actions.getBand(id)
            toast.success("Cambios guardados con éxito");
        } catch (error) {
            // Manejar errores de solicitud
            console.error('Error al enviar el formulario:', error);
            toast.error("Error al guardar los cambios");
        }
    };

    const handleDeleteBand = async () => {
        try {
            const response = await fetch(`${process.env.BACKEND_URL}/api/bands/${id}`, {
                method: 'DELETE'
            });
            
            if (response.ok) {
                navigate('/home');
                toast.error("Banda Eliminada!");
            } else {
                // Si la eliminación falla (por ejemplo, si la banda no se encuentra),
                // puedes mostrar un mensaje de error al usuario.
                toast.error("Error al eliminar la banda");
            }
        } catch (error) {
            console.error('Error al eliminar la banda:', error);
            toast.error("Error al eliminar la banda");
        }
    };

    const classes = useStyles();

    return (
        <div className='container'>
            <div className="row  text-start">
                <div className='col-12 Banner'>
                <img src={store.band.banner_picture} className='img-fluid' alt='Banner'></img>
            </div>
            </div>
            <div className="row mt-3 p-1" >
                <div className=" profileName col-12 col-md-12 col-xl-12 d-flex justify-content-start align-items-center grid gap-3 mb-4">
                        <img className='ProfilePicture p-3' src={store.band.profile_picture} alt='Perfil' />

                        <h1>{store.band.name}</h1>
                        <button className='btns ms-3' onClick={handleShowEditModal}>
                            <i className="fa-solid fa-user-pen" style={{ color: '#ffffff' }}></i>
                        </button>
                    </div>
                    </div>
    
            <div className="container text-center">
                <div className="row">
                <div className="col-12 col-md-12 col-xl-6">
                        <div className="card-detail">
                            <h5 className="card-title">Detalles</h5>
                            <p className="card-text">{store.band.description}</p>
                            <h5>Redes sociales</h5>
                            <div className='social-network'>
                                <a href={store.band.instagram} className="card-link" target='_blank'> <i className="fa-brands  fa-instagram icono fa-2xl"></i></a>
                                <a href={store.band.tiktok} className="card-link" target='_blank'><i className="fa-brands fa-tiktok icono fa-2xl"></i></a>
                            </div>
                        </div>
                        <div className="card-members">
                            <h5 className="card-title">Miembros</h5>
                            <div className="d-flex flrex-row justify-content-center align-items-center flex-wrap ">
                            {store.band.members && store.band.members.map((member, index) => (
                                <div className={classes.root} key={index}>
                                    <Link to={`/profile/${member.id}`}>
                                        <Avatar className="avatar" alt={member.username} src={member.profile_image_url} />
                                    </Link>
                                </div>
                            ))}
                        </div>
                        </div>
                        <div className="card-music-band">
                            <h5>Categoría musical</h5>
                                {store.band.musical_categories && store.band.musical_categories.map(category => (
                            <button className="btns-music">
                                <i className="fas fa-music mx-1" style={{ color: '#FFFFFF' }}></i>
                                    <span key={category.id}>{category.name}</span>
                            </button>
                                ))}
                        </div>
                    </div>
                    <div className="col-12 col-md-12 col-xl-6">
                        <div className="cardEvent">
                            <h5>Próximos Eventos</h5>
                        </div>
                            {store.band.events && store.band.events.map((event, index) => (
                        <div className="cardEvent">
                                <div className="position-relative" key={index}>
                                    <Link to={`/events/${event.id}`}>
                                        <img src={event.picture_url} alt="img" draggable="false" className="card-img-top eventPicture" />
                                    </Link>
                                    <div className="card-body">
                                        <h5>{event.name}</h5>
                                        <p>{event.description}</p>
                                    </div>
                                </div>
                        </div>
                            ))}
                    </div>
                </div>
            </div>
            {/* Modal para editar Información */}
            <Modal show={showEditModal} onHide={handleCloseEditModal} onSubmit={handleSubmit} className="custom-modal">
                <Modal.Header className='modal-bg' closeButton>
                    <Modal.Title className='modal-title'>Editar perfil</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-bg'>
                    <div className='edit-image'>
                        <div className='image-title'>
                            <h6>Foto de perfil</h6>
                            <input
                                type="file"
                                onChange={handleFileChange}
                                accept="image/*"
                            />
                        </div>
                        <div className='modal-img'>
                            <img className='img' src={store.band.profile_picture} alt='perfil' />
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
                            <img src={store.band.banner_picture} className="img-fluid" alt="fotoBanner" />
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
                                    <input placeholder="Instagram" className="input" name="instagram" type="text" value={formData.instagram} onChange={handleChange} />
                                    <input placeholder="Tiktok" className="input" name="tiktok" type="text" value={formData.tiktok} onChange={handleChange} />
                                </div>
                            </div>
                        </div>
                        <Modal.Footer>
                            <Button className='btns' type="submit">Guardar cambios</Button>
                            <Button className="btns" onClick={handleShowDeleteModal}>Eliminar Banda</Button>
                        </Modal.Footer>
                    </form>
                </Modal.Body>
            </Modal>

            {/* Modal para confirmar eliminación */}
            <Modal show={showDeleteModal} onHide={handleCloseDeleteModal}>
                <Modal.Header className='modal-bg' closeButton>
                    <Modal.Title>Confirmar Eliminación</Modal.Title>
                </Modal.Header>
                <Modal.Body className='modal-bg'>¿Estás seguro de que deseas eliminar esta banda?</Modal.Body>
                <Modal.Footer className='modal-bg'>
                    <Button className="btns" onClick={handleCloseDeleteModal}>
                        Cancelar
                    </Button>
                    <Button className="btns" onClick={handleDeleteBand}>
                        Eliminar
                    </Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

