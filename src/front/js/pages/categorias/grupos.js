import React, { useEffect, useState } from "react";
import "/workspaces/BeatBooK/src/front/styles/categorias.css";

export const Grupos = () => {
    const [groups, setGroups] = useState([]);

    useEffect(() => {
        fetch(process.env.BACKEND_URL + "/api/bands/")
            .then(response => response.json())
            .then(data => setGroups(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="container text-center">
            <br></br>
            <h1>Grupos</h1>
            <br></br>
            <div className='bentobox'>
                {groups.map((band, index) => (
                    <div key={index} className='item'>
                        <img src={band.profile_picture} alt={band.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}