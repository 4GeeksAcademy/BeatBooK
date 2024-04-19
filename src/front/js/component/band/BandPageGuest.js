import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { BandBannerGuest } from "./bandBannerGuest"; 


export const BandPageGuest= () => {
    

    const navigate = useNavigate()

     useEffect(() => {
    const token = localStorage.getItem("jwt-token");

    if (!token) {
      navigate("/");
    }
  }, []);


    return (
        <div className="container">
            <div>
               <BandBannerGuest/>
            </div>
        </div>
    );
};
