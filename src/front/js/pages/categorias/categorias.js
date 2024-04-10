import React, { useEffect, useState } from "react";
import "/workspaces/BeatBooK/src/front/styles/categorias.css";

export const Categorias = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(process.env.BACKEND_URL + "/api/musical_categories")
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.log(error));
    }, []);

    return (
        <div className="container text-center">
            <br></br>
            <h1>Categorias</h1>
            <br></br>
            <div className='bentobox'>
                {categories.map((category) => (
                    <div className="card item categoryCard">
                        <img src={category.image_url} alt={category.name} className="image" />
                        <div class="card-img-overlay">
                            <h1>{category.name}</h1>
                            <p>{category.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
