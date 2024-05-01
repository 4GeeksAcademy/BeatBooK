import React, { useEffect, useState } from "react";
import "../../../styles/categorias.css";

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
                {events.map((event) => (
                    <div className="containerCard noselect item" onClick={() => window.location.href = `/events/${event.id}`}>
                        <div className="canvas">
                            <div className="tracker tr-1"></div>
                            <div className="tracker tr-2"></div>
                            <div className="tracker tr-3"></div>
                            <div className="tracker tr-4"></div>
                            <div className="tracker tr-5"></div>
                            <div className="tracker tr-6"></div>
                            <div className="tracker tr-7"></div>
                            <div className="tracker tr-8"></div>
                            <div className="tracker tr-9"></div>
                            <div className="tracker tr-10"></div>
                            <div className="tracker tr-11"></div>
                            <div className="tracker tr-12"></div>
                            <div className="tracker tr-13"></div>
                            <div className="tracker tr-14"></div>
                            <div className="tracker tr-15"></div>
                            <div className="tracker tr-16"></div>
                            <div className="tracker tr-17"></div>
                            <div className="tracker tr-18"></div>
                            <div className="tracker tr-19"></div>
                            <div className="tracker tr-20"></div>
                            <div className="tracker tr-21"></div>
                            <div className="tracker tr-22"></div>
                            <div className="tracker tr-23"></div>
                            <div className="tracker tr-24"></div>
                            <div className="tracker tr-25"></div>
                            <div className="card-container"></div>
                            <div id="card" style={{
                                backgroundImage: `url(${event.picture_url})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}>
                                <p id="prompt">{event.name}</p>
                                <div className="bottomGradient"></div>
                                <div className="title">{event.description}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
