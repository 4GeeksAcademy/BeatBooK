import React, { useEffect, useState } from "react";
import "/workspaces/BeatBooK/src/front/styles/categorias.css";

export const CategoryEvents = () => {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await fetch(process.env.BACKEND_URL + `/api/musical_categories/${category_id}/events`);
                if (!response.ok) {
                    throw new Error("Failed to fetch events");
                }
                const data = await response.json();
                setEvents(data);
            } catch (error) {
                console.log(error);
            }
        };

        fetchEvents();
    }, []);

    return (
        <div className="container text-center">
            <br></br>
            <h1>Eventos</h1>
            <br></br>
            <div className='bentobox'>
                {events.map((event, index) => (
                    <div key={index} className='item'>
                        <img src={event.image_url} alt={event.name} className="image"/>
                    </div>
                ))}
            </div>
        </div>
    );
}