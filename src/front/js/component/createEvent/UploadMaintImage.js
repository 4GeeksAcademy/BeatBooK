import React from "react";
import { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import "./createEvent.css";

export const UploadMainImage = ({ onUpload }) => {
  const { actions } = useContext(Context); // Agrega actions aquí
  const [isImageSelected, setIsImageSelected] = useState(false);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    console.log(file); // Nuevo registro de consola

    // Sube la imagen y obtén la URL de la imagen subida
    const data = await actions.uploadEventPicture(file);

    if (data) {
      const imageUrl = data.url;

      // Pasa la URL de la imagen subida a handleMainImageUpload
      onUpload(imageUrl);

      // Establece isImageSelected en true
      setIsImageSelected(true);
    } else {
      console.error("Error uploading image");
    }
  };

  return (
    <div className=" ">
      <p className="p_upload">Imagen Evento</p>
      <input
        className="upload_selector"
        type="file"
        onChange={handleFileChange}
        required
        accept="image/*"
        disabled={isImageSelected}
      />
    </div>
  );
};
