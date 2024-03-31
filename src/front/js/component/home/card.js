import React, { useRef, useState } from 'react';
import "/workspaces/BeatBooK/src/front/js/component/home/card.css"



export const Cards = () => {
  const carouselRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const firstCardRef = useRef(null);

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
    if (carouselRef.current.scrollLeft === 0) {
      carouselRef.current.scrollLeft = carouselRef.current.scrollWidth / 2;
    } else if (carouselRef.current.scrollLeft === carouselRef.current.scrollWidth - carouselRef.current.offsetWidth) {
      carouselRef.current.scrollLeft = carouselRef.current.scrollWidth / 2 - cardWidth;
    }
  };

  return (
    <div className="wrapper">
      
       <ul className='carousel' onMouseDown={handleMouseDown} onMouseMove={handleMouseMove} onMouseUp={handleMouseUp} onTransitionEnd={handleTransitionEnd} ref={carouselRef}>
        <li className="card" ref={firstCardRef}>
          <div className='img'>
            <img src='https://images.unsplash.com/photo-1485686531765-ba63b07845a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVifGVufDB8fDB8fHww' alt='img' draggable="false" />
          </div>
          <h2 className='name'>Pub ingles</h2>
          <span className='description'>Unsplash utiliza cookies y tecnologías similares para proteger nuestro sitio, proporcionar funciones útiles a los usuarios de licencias gratuitas y de pago, y garantizar un rendimiento óptimo.</span>
          <button className='button'>Saber mas</button>
        </li>
        <li className="card">
          <div className='img'>
            <img src='https://images.unsplash.com/photo-1485686531765-ba63b07845a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVifGVufDB8fDB8fHww' alt='img' draggable="false" />
          </div>
          <h2 className='name'>Pub ingles</h2>
          <span className='description'>Unsplash utiliza cookies y tecnologías similares para proteger nuestro sitio, proporcionar funciones útiles a los usuarios de licencias gratuitas y de pago, y garantizar un rendimiento óptimo.</span>
          <button className='button'>Saber mas</button>
        </li>
        <li className="card">
          <div className='img'>
            <img src='https://images.unsplash.com/photo-1485686531765-ba63b07845a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVifGVufDB8fDB8fHww' alt='img' draggable="false" />
          </div>
          <h2 className='name'>Pub ingles</h2>
          <span className='description'>Unsplash utiliza cookies y tecnologías similares para proteger nuestro sitio, proporcionar funciones útiles a los usuarios de licencias gratuitas y de pago, y garantizar un rendimiento óptimo.</span>
          <button className='button'>Saber mas</button>
        </li>
        <li className="card">
          <div className='img'>
            <img src='https://images.unsplash.com/photo-1485686531765-ba63b07845a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVifGVufDB8fDB8fHww' alt='img' draggable="false" />
          </div>
          <h2 className='name'>Pub ingles</h2>
          <span className='description'>Unsplash utiliza cookies y tecnologías similares para proteger nuestro sitio, proporcionar funciones útiles a los usuarios de licencias gratuitas y de pago, y garantizar un rendimiento óptimo.</span>
          <button className='button'>Saber mas</button>
        </li>
        <li className="card">
          <div className='img'>
            <img src='https://images.unsplash.com/photo-1485686531765-ba63b07845a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVifGVufDB8fDB8fHww' alt='img' draggable="false" />
          </div>
          <h2 className='name'>Pub ingles</h2>
          <span className='description'>Unsplash utiliza cookies y tecnologías similares para proteger nuestro sitio, proporcionar funciones útiles a los usuarios de licencias gratuitas y de pago, y garantizar un rendimiento óptimo.</span>
          <button className='button'>Saber mas</button>
        </li>
        <li className="card">
          <div className='img'>
            <img src='https://images.unsplash.com/photo-1485686531765-ba63b07845a7?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8cHVifGVufDB8fDB8fHww' alt='img' draggable="false" />
          </div>
          <h2 className='name'>Pub ingles</h2>
          <span className='description'>Unsplash utiliza cookies y tecnologías similares para proteger nuestro sitio, proporcionar funciones útiles a los usuarios de licencias gratuitas y de pago, y garantizar un rendimiento óptimo.</span>
          <button className='button'>Saber mas</button>
        </li>
      </ul>
     
    </div>
  );
}