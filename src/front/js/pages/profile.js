import React, { useContext, useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ProfileBanner } from "../component/profile/profileBanner";
import { ProfileBody } from "../component/profile/profileBody";
import { Context } from "../store/appContext";

export const Profile = () => {
    const { actions, store } = useContext(Context);
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        const token = localStorage.getItem("jwt-token");
    
        if (token) {
            setIsLoggedIn(true);
        } else {
            setIsLoggedIn(false);
            navigate("/");
        }
    }, []);

    return (
        <div className="container">
            {isLoggedIn && (
                <>
                    <div>
                        <ProfileBanner />
                    </div>
                    <div className="">
                        <ProfileBody />
                    </div>
                </>
            )}
        </div>
    );
};
