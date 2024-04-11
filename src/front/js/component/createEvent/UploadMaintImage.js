import React from "react";
import { useContext, useState } from "react";
import { Context } from "../../store/appContext";
import "./createEvent.css";
import { toast } from "react-toastify";

export const UploadMainImage = ({ onUpload }) => {
  const { actions } = useContext(Context); // Agrega actions aquí
  const [isImageSelected, setIsImageSelected] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para controlar el cargador

  const handleFileChange = async (e) => {
    setIsLoading(true); // Inicia la carga
    const file = e.target.files[0];
    console.log(file); // Nuevo registro de consola

    // Sube la imagen y obtén la URL de la imagen subida
    const data = await actions.uploadEventPicture(file);

    if (data) {
      console.log(data); // Nuevo registro de consola (opcional)
      const imageUrl = data.url;

      // Pasa la URL de la imagen subida a handleMainImageUpload
      onUpload(imageUrl);

      // Establece isImageSelected en true
      setIsImageSelected(true);
      toast.success("Imagen subida con éxito"); // Muestra un toast de éxito
    } else {
      console.error("Error uploading image");
      toast.error("Error al subir la imagen"); // Muestra un toast de error
    }
    setIsLoading(false); // Termina la carga
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
      {isLoading && <div className="text-center pt-2">
        <div className="spinner-border" style={{ width: '2rem', height: '2rem' }} role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>} {/* Muestra el cargador si isLoading es true */}
    </div>
  );
};