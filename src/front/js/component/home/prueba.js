import React from "react";
import '/workspaces/BeatBooK/src/front/js/component/home/prueba.scss'



export const Prueba = () => {
    return (
        <div className="card-wrapper mt-3">
            <div className="card-top">
                <img className="image" src="https://images.pexels.com/photos/12366583/pexels-photo-12366583.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" />
            </div>

            <div className="card-bottom">
                <span className="top-text">Premium Membership</span><br />
                <span className="bottom-text">Join our membership program to download music for free, listen offline and skip songs</span>
                <br />
                <button className="button">Join Us</button>
            </div>
        </div>
    );
};



