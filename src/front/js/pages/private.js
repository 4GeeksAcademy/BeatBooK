import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Private = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("jwt-token");

    if (!token) {
      navigate("/");
    }
  }, []);

  return (
    <div className="container">
      <h1>Private</h1>
    </div>
  );
};
