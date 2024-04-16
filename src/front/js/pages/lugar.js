import React, { useEffect, useState } from "react";
import "/workspaces/BeatBooK/src/front/styles/lugar.css";
import { useParams } from "react-router-dom";

export const Lugar = () => {
    const [place, setPlace] = useState(null);
    const { place_id } = useParams();

    useEffect(() => {
        if (place_id) {
            fetch(process.env.BACKEND_URL + `/api/places/${place_id}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Failed to fetch place');
                    }
                    return response.json();
                })
                .then(data => setPlace(data))
                .catch(error => console.error(error));
        }
    }, [place_id]);

    return (
        <div className="container text-center">
            {place && (
                <div>
                    <div className="container text-center">
                        <div className="row">
                            <div className="col">
                            </div>
                            <div className="col-9">
                                <div className="bannerContainer">
                                    <img src={place.banner_picture} className="BannerPicture" alt="place_banner_picture" />
                                </div>
                                <div className="container">
                                    <div className="row align-items-center borderBottom">
                                        <div className="col-3">
                                            <div className="ProfilePictureContainer">
                                                <img src={place.profile_picture} className="ProfilePicture" alt="place_profile_picture" />
                                            </div>
                                        </div>
                                        <div className="col text-start">
                                            <h1>{place.name}</h1>
                                        </div>
                                    </div>
                                </div>
                                <div class="container text-center">
                                    <div class="row">
                                        <div class="col">
                                            <div className="card-band-content">
                                                <h5 className="card-title">Detalles</h5>
                                                <p className="card-text">{place.description}</p>
                                                <h5>Redes sociales</h5>
                                                <div className='social-network'>
                                                    <a href={place.instagram} className="card-link"> <i className="fa-brands  fa-instagram fa-2xl" style={{ color: "#000000" }}></i></a>
                                                    <a href={place.tiktok} className="card-link"><i className="fa-brands fa-tiktok fa-2xl" style={{ color: "#000000" }}></i></a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col">
                                            <div className="container">
                                                <div className="card"></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col">
                            </div>
                        </div>
                    </div>

                </div>
            )}
            <br></br>
        </div>
    );
};
