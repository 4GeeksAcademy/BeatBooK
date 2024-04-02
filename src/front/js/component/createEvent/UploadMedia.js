import React, { useEffect, useState, useContext } from "react";
import { Context } from "../../store/appContext";

export const UploadMedia = ({ onUpload }) => {
  const [publicIds, setPublicIds] = useState([]);
  const [urls, setUrls] = useState([]);
  const { actions } = useContext(Context);
  const cloudName = "daxbjkj1j"; // Reemplaza con el nombre de tu nube
  const uploadPreset = "u25sxqdb"; // Reemplaza con tu propio preset de subida

  useEffect(() => {
    // Carga el script del widget de Cloudinary
    const script = document.createElement("script");
    script.src = "https://widget.cloudinary.com/v2.0/global/all.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  const handleUpload = () => {
    const widget = window.cloudinary.createUploadWidget(
      {
        cloudName: cloudName,
        uploadPreset: uploadPreset,
        multiple: true,
      },
      async (error, result) => {
        if (!error && result && result.event === "success") {
          setPublicIds((ids) => [...ids, result.info.public_id]);

          // Obtener el archivo de la URL
          const response = await fetch(result.info.secure_url);
          const blob = await response.blob();
          const file = new File([blob], "image.jpg", { type: "image/jpeg" });

          // Llamar a uploadEventMedia con el archivo
          const data = await actions.uploadEventMedia(file);

          if (data && data.url) {
            setUrls((prevUrls) => [...prevUrls, data.url]);
            onUpload(urls);
          } else {
            console.error("Error subiendo la imagen al backend");
          }
        }
      }
    );
    widget.open();
  };

  return (
    <div>
      <button onClick={handleUpload}>Subir medios</button>
    </div>
  );
};
