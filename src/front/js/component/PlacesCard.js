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
        </div>
    );
};

export default CategoriesCard;