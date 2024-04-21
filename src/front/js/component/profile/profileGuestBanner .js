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

    const classes = useStyles();
    
    return (
        <div className="container text-center">
            <div className='Banner'>
                <img src={store.singleUser.banner_picture} className='img-fluid' ></img>
            </div>
            <div className="container">
                <div className="row  text-start data">
                    <div className="col-12 col-md-4 col-xl-2">
                        <img className='ProfilePicture' src={store.singleUser.profile_image_url} alt='perfil' />
                    </div>
                    <div className="col-12 col-md-8 col-xl-4 align-items-center">
                        <h1>{store.singleUser.username}</h1>
                        <p>Puedes escucharme en:</p>
                        {store.singleUser && store.singleUser.created_band && (
                            <div className={classes.root}>
                                <Link to={`/banda/${store.singleUser.created_band.id}`}>
                                    <Avatar className="avatar ms-2" alt={store.singleUser.username} src={store.singleUser.created_band.profile_picture} />
                                </Link>
                                <p className=' ms-1 mt-2'>{store.singleUser.created_band.name}</p>
                            </div>
                        )}
                    </div>
                        </div>
                </div>
            </div>

    );
}



