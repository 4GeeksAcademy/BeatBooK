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
                <div className="card" key={index}>
                    <h3>{category.name}</h3>
                    <img src={category.image_url} alt={category.name} />
                </div>
            ))}
        </div>
    );
};

export default CategoriesCard;