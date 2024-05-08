import React, { useContext, useEffect } from 'react';
import { Context } from '../../store/appContext';
import { useParams } from "react-router-dom";
import "../profile/profile.css"
import { Link } from 'react-router-dom';
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
    const { store, actions } = useContext(Context);
    const { id } = useParams();

    useEffect(() => {
        actions.getUser(id).then((data) => {
            console.log(data)
        });
      },[]);


    
    return (
        <div className="container text-center">
              <div className="row  text-start">
                <div className='col-12 Banner'>
                    <img src={store.currentUser?.banner_picture} className='img-fluid' ></img>
                </div>
                </div>
                <div className="row mt-3 p-1" >
                <div className=" profileName col-12 col-md-12 col-xl-12 d-flex justify-content-start align-items-center grid gap-3 mb-4">
                    <img className='ProfilePicture p-3' src={store.currentUser?.profile_image_url} alt='perfil' />
                    <h1>{store.currentUser?.username}</h1>
                </div>
                </div>
            </div>

    );
}



