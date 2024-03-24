import React from "react";
import "/workspaces/BeatBooK/src/front/js/component/home/cardHome.css"



export const CardHome = () => {
    return (
        <div className="card-wrapper-home mt-3">
            <div className="card-top-home">
                <img className="image-home" src="https://images.unsplash.com/photo-1499676763409-c0211693a66b?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=80" />
            </div>

            <div className="card-bottom-home">
                <span className="top-text-home">Premium Membership</span><br />
                <span className="bottom-text-home">Join our membership program to download music for free, listen offline and skip songs</span>
                <br />
                <button className="button-home">Join Us</button>
            </div>
        </div>
    );
};



