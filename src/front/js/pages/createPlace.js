import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";
import { Form, Button, Col, Row, Container } from "react-bootstrap";
import "../component/createEvent/createEvent.css";
// import { MembersGet } from "../component/createEvent/membersGet";
import { EventGet } from "../component/band/EventGet";
import { UserGet } from "../component/band/UserGet";
import { CategoriesGet } from "../component/band/CategoriesGet ";
import { UploadBandProfile } from "../component/band/UploadBandProfile";
import { UploadMedia } from "../component/createEvent/UploadMedia";
import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";


export const CreatePlace = () => {

  
  return (
    <div>   

    </div>
  );
};

