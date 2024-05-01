import React, { useEffect, useState, useContext } from "react";
import "../../../styles/categorias.css";
import { useParams } from "react-router-dom";
import { Context } from "../../store/appContext";

export const CategoryEvents = () => {
    const [events, setEvents] = useState([]);
    const [categoryName, setCategoryName] = useState("");

    const { actions } = useContext(Context);
    const { category_id } = useParams();

    useEffect(() => {

        actions.getPlaceEvents(category_id)
            .then((data) => {
                if (Array.isArray(data)) {
                    setEvents(data);
                } else {
                    console.error('Data is not an array:', data);
                    setEvents([]);
                }
            })
            .catch((error) => {
                console.error('Error fetching events:', error);
                setEvents([]);
            });

        actions.getCategory(category_id)
            .then((category) => {
                if (category) {
                    setCategoryName(category.name);
                } else {
                    console.error(`Category with ID ${category_id} not found`);
                    setCategoryName("");
                }
            })
            .catch((error) => {
                console.error('Error fetching category:', error);
                setCategoryName("");
            });
    }, [category_id, actions]);

    return (
        <div className="container text-center">
            <br />
            <h1>Eventos de musica {categoryName}</h1>
            <br />
            <div className='bentobox'>
                {events.map((event) => (
                    <div class="containerCard noselect item" onClick={() => window.location.href = `/events/${event.id}`}>
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
                                backgroundImage: `url(${event.picture_url})`,
                                backgroundSize: 'cover',
                                backgroundPosition: 'center',
                                backgroundRepeat: 'no-repeat',
                            }}>
                                <p id="prompt">{event.name}</p>
                                <div className="bottomGradient"></div>
                                <div class="title">{event.description}</div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}