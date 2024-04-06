import React from "react";
import { ProfileBanner } from "../component/profile/profileBanner";
import { ProfileBody } from "../component/profile/profileBody";


export const Profile = () => {



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