import React, { useEffect, useState } from "react";
import "../../styles/categorias.css";

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
            <h1>Grupos Musicales</h1>
            <br></br>
            <div className='bentobox'>
                {groups.map((band) => (
                    <div className="containerCard noselect item" onClick={() => window.location.href = `/grupos/${band.id}`}>
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
                                backgroundImage: `url(${band.profile_picture})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}>
                                <p id="prompt">{band.name}</p>
                                <div className="bottomGradient"></div>
                                <div className="title">{band.description}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
