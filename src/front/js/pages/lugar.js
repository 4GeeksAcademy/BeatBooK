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
                                        <div className="col-3 ">
                                            <div className="ProfilePictureContainer">
                                                <img src={place.profile_picture} className="ProfilePicture" alt="place_profile_picture" />
                                            </div>
                                        </div>
                                        <div className="col text-start">
                                            <h2>{place.name}</h2>
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
