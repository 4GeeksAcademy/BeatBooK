import React, { useContext } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";

export const UploadMedia = ({ onUpload }) => {
  const { actions } = useContext(Context);
  const { id } = useParams(); // Extrae el id de la URL

  const handleFileChange = async (event) => {
    const files = Array.from(event.target.files);
    if (files.length > 4) {
      alert('No puedes subir más de 4 imágenes a la vez.');
      return;
    }
    const urls = await actions.uploadEventMedia(files, id); // Reemplaza "eventId" con el id del evento real
    onUpload(urls);
  };

  return (
    <div>
      <p className="p_upload">Media Evento <span>"Sube hasta 4 imágenes"</span></p>

      <input
        className="upload_selector"
        type="file"
        multiple
        required
        accept="image/*"
        onChange={handleFileChange}
      />
    </div>
  );
};
