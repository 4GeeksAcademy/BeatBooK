import React,  { useEffect } from "react";
import "/workspaces/BeatBooK/src/front/js/component/home/carousel.css"


export const Carousel = () => {
  return (
      <div id="carouselExampleFade" className="carousel slide carousel-fade mt-5" data-bs-ride="carousel" data-bs-interval="3000">
          <div className="carousel-inner">
              <div className="carousel-item active">
                  <img src="https://images.pexels.com/photos/5650791/pexels-photo-5650791.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                  <img src="https://images.pexels.com/photos/274192/pexels-photo-274192.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="d-block w-100" alt="..." />
              </div>
              <div className="carousel-item">
                  <img src="https://images.pexels.com/photos/6173868/pexels-photo-6173868.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" className="d-block w-100" alt="..." />
              </div>
          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleFade" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
          </button>
      </div>
  );
};
