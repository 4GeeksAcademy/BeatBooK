import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ProfileBanner } from "../component/profile/profileBanner";
import { ProfileBody } from "../component/profile/profileBody";
import { Context } from "../store/appContext";



export const Profile = () => {
    const { actions, store} = useContext(Context)
    

    const navigate = useNavigate();

    useEffect(() => {
      const token = localStorage.getItem("jwt-token");

      if (!token) {
        navigate("/");
      }
    }, []);


    return (
        <div className="container">
            <div>
               <ProfileBanner/>
            </div>
            <div className="">
                <ProfileBody />
            </div>
        </div>

    );

}