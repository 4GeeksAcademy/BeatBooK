import React, { useRef, useState, useContext, useEffect } from 'react';
import { Context } from '../../store/appContext';
import "/workspaces/BeatBooK/src/front/js/component/home/card.css"



export const CardPlaces = () => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const firstCardRef = useRef(null);
  const { store, actions } = useContext(Context);




  const handleMouseDown = (e) => {
    setIsDragging(true);
    setStartX(e.pageX);
    setStartScrollLeft(carouselRef.current.scrollLeft);
    carouselRef.current.classList.add('dragging');
  };

  const handleMouseMove = (e) => {
    if (!isDragging) return;
    const movementX = e.pageX - startX;
    carouselRef.current.scrollLeft = startScrollLeft - movementX;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    carouselRef.current.classList.remove('dragging');
  };

  
  const handleTransitionEnd = () => {
    const cardWidth = firstCardRef.current.offsetWidth;
    if (carouselRef.current.scrollLeft === 0) {
      carouselRef.current.scrollLeft = carouselRef.current.scrollWidth / 2;
    } else if (carouselRef.current.scrollLeft === carouselRef.current.scrollWidth - carouselRef.current.offsetWidth) {
      carouselRef.current.scrollLeft = carouselRef.current.scrollWidth / 2 - cardWidth;
    }
  };

  return (
    <div className="wrapper">
       <ul className='carousel' onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onTransitionEnd={handleTransitionEnd} ref={carouselRef}>
       {store.places.map((place, index) => (
        <li className="card" key={index} ref={firstCardRef}>
          <div className='img'>
            <img src={place.pictures} alt='img' draggable="false" className='img' />
          </div>
          <h2 className='name'>{place.name}</h2>
          <span className='description'>{place.description}</span>
          <button className='button'>Saber mas</button>
        </li>
      ))}
      </ul>
    </div>
  );
}