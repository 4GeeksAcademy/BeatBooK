import React, { useEffect, useState } from "react";
import "/workspaces/BeatBooK/src/front/styles/categorias.css";

export const Eventos = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        fetch(process.env.BACKEND_URL + "/api/events")
            .then(response => response.json())
            .then(data => setEvents(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="container text-center">
            <br></br>
            <h1>Eventos</h1>
            <br></br>
            <div className='bentobox'>
                {events.map((event, index) => (
                    <div key={index} className='item'>
                        <img src={event.picture_url} alt={event.name} />
                    </div>
                ))}
            </div>
        </div>
    );
}