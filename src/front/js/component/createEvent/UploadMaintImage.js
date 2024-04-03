import React from "react";
import { useContext } from "react";
import { Context } from "../../store/appContext";

export const UploadMainImage = ({ onUpload }) => {
  const { actions } = useContext(Context); // Agrega actions aquí

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log(file); // Nuevo registro de consola

    // Sube la imagen y obtén la URL de la imagen subida
    const data = await actions.uploadEventPicture(file);
    const imageUrl = data.url;

    // Pasa la URL de la imagen subida a handleMainImageUpload
    onUpload(imageUrl);
  };

  return <input type="file" onChange={handleFileChange} />;
};
