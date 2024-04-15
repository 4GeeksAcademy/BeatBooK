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
                                1 of 3
                            </div>
                            <div className="col-9 bannerContainer">
                                <img src={place.banner_picture} className="BannerPicture" alt="place_banner_picture" />
                            </div>
                            <div className="col">
                                3 of 3
                            </div>
                        </div>
                    </div>
                </div>
            )}
            <br></br>
        </div>
    );
};
