import React, { useRef, useState, useContext, useEffect } from 'react';
import { Context } from '../../store/appContext';
import { useNavigate } from 'react-router-dom';
import "/workspaces/BeatBooK/src/front/js/component/home/card.css"



export const Cards = () => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const firstCardRef = useRef(null);
  const { store, actions } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    actions.getAllBands();

  }, []);

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


  const handleLearnMore = (id) => {
    navigate(`/banda/${id}`);
  };


  return (
    <div className="wrapper">
      <ul className='carousel' onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onTransitionEnd={handleTransitionEnd} ref={carouselRef}>
        {store.bands.map((band, index) => (
         <li className="card-c" key={index} ref={firstCardRef}>
         <div className='img'>
           <img src={band.profile_picture} alt='img' draggable="false" className='img' />
         </div>
         <div className='card-c-content'>
         <h2>{band.name}</h2>
         <p className='description'>{band.description}</p>
         </div>
         <div className='card-c-footer'>
         <button className='button' onClick={() => handleLearnMore(band.id)}>Saber mas</button>
         </div>
       </li>
      ))}
      </ul>

    </div>
  );
}