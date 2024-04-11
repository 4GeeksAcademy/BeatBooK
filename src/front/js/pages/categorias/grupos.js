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
            <h1>Grupos Musicales</h1>
            <br></br>
            <div className='bentobox'>
                {groups.map((band) => (
                    <div class="containerCard noselect item">
                        <div class="canvas">
                            <div class="tracker tr-1"></div>
                            <div class="tracker tr-2"></div>
                            <div class="tracker tr-3"></div>
                            <div class="tracker tr-4"></div>
                            <div class="tracker tr-5"></div>
                            <div class="tracker tr-6"></div>
                            <div class="tracker tr-7"></div>
                            <div class="tracker tr-8"></div>
                            <div class="tracker tr-9"></div>
                            <div class="tracker tr-10"></div>
                            <div class="tracker tr-11"></div>
                            <div class="tracker tr-12"></div>
                            <div class="tracker tr-13"></div>
                            <div class="tracker tr-14"></div>
                            <div class="tracker tr-15"></div>
                            <div class="tracker tr-16"></div>
                            <div class="tracker tr-17"></div>
                            <div class="tracker tr-18"></div>
                            <div class="tracker tr-19"></div>
                            <div class="tracker tr-20"></div>
                            <div class="tracker tr-21"></div>
                            <div class="tracker tr-22"></div>
                            <div class="tracker tr-23"></div>
                            <div class="tracker tr-24"></div>
                            <div class="tracker tr-25"></div>
                            <div class="card-container"></div>
                            <div id="card" style={{
                                backgroundImage: `url(${band.profile_picture})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}>
                                <p id="prompt">{band.name}</p>
                                <div className="bottomGradient"></div>
                                <div class="title">{band.description}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}