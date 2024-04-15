import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom"; // Importa useParams y useNavigate
import { ProfileBanner } from "../component/profile/profileBanner";
import { ProfileBody } from "../component/profile/profileBody";
import { Context } from "../store/appContext";
import { BandBanner } from "../component/band/bandBanner";

export const BandPage = () => {


    return (
        <div className="container">
            <div>
               <BandBanner/>
            </div>
            <div className="container">
                
            </div>
        </div>
    );
};
