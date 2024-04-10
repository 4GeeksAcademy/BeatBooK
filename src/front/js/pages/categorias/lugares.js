import React, { useEffect, useState } from "react";
import "/workspaces/BeatBooK/src/front/styles/categorias.css";

export const Lugares = () => { 
    const [places, setPlaces] = useState([]);

    useEffect(() => {
        fetch(process.env.BACKEND_URL + "/api/places")
            .then(response => response.json())
            .then(data => setPlaces(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="container text-center">
            <br></br>
            <h1>Lugares</h1>
            <br></br>
            <div className='bentobox'>
                {places.map((place, index) => (
                    <div key={index} className='item'>
                        <img src={place.profile_picture} alt={place.name} className="image"/>
                    </div>
                ))}
            </div>
        </div>
    );
}