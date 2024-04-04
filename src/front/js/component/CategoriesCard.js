import React, { useState, useEffect } from 'react';

const CategoriesCard = () => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
        fetch(`${process.env.BACKEND_URL}api/musical_categories`)
            .then(response => response.json())
            .then(data => setCategories(data))
            .catch(error => console.error(error));
    }, []);

    return (
        <div>
            {categories.map((category, index) => (
                <div class="row">
                    <div class="col">
                    </div>
                        <div className="col">
                            <div className="card text-bg-dark" key={index}>
                                <img src={category.image_url} alt={category.name} className="card-img" />
                                    <div className="card-img-overlay">
                                        <h5 className="card-title">Card title</h5>
                                        <p className="card-text">This is a wider card with supporting text below as a natural lead-in to additional content. This content is a little bit longer.</p>
                                        <p className="card-text"><small>Last updated 3 mins ago</small></p>
                                    </div>
                            </div>
                        </div>
                        <div className="col">
                            3 of 3
                        </div>
                    </div>
            ))}
        </div>
    );
};

export default CategoriesCard;