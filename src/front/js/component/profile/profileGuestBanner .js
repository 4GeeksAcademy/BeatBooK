import React, { useRef, useState, useContext, useEffect } from 'react';
import { Context } from '../../store/appContext';
import { useNavigate } from 'react-router-dom';
import { useParams } from "react-router-dom";
import "../profile/profile.css"
import { ProfileBody } from './profileBody';
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

export const ProfileGuestBanner = () => {
    const navigate = useNavigate();
    const { store, actions } = useContext(Context);
    const { id } = useParams();
    

    useEffect(() => {
        actions.getUser(id).then((data) => {
          console.log("userData", data);
        });
      },[]);


    return (
        <div className="container d-flex flex-column justify-content-center">
            <div className='row'>
                <div className='banner-profile col-12 col-md-12 col-lx-12 '>
                    <img src={store.singleUser.banner_picture} className="img-fluid" alt="fotoBanner" />
                </div>
            </div>
            <div className='row profile-picture'>
                {/* Foto de perfil */}
                <div className='col-12 col-md-4 col-xl-2 picture'>
                    <div className='container'>
                        <img className='img' src={store.singleUser.profile_image_url} alt='perfil' />
                    </div>
                </div>
                <div className='col-12 col-md-4 col-xl-4 m-3 p-5 d-flex align-items-center justify-content-start' id='username'>
                    <div className=''>
                        <h1>{store.singleUser.username}</h1>
                        {/* <div className='d-flex flex-column justify-content-start'>
                            <p className='mb-0 ms-2'><strong>Puedes escucharme</strong></p>
                            {store.currentUser && store.currentUser.created_band && (
                                <div className={classes.root}>
                                    <Link to={`/banda/${store.currentUser.created_band.id}`}>
                                        <Avatar className="avatar ms-2" alt={store.currentUser.username} src={store.currentUser.created_band.profile_picture} />
                                    </Link>
                                    <p className='mt-1'>{store.currentUser?.created_band.name}</p>
                                </div>
                            )}
                        </div> */}
                    </div>
                </div>
            </div>
        </div>

    );
}



