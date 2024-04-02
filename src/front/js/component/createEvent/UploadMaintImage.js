import React, { useEffect, useState } from "react";

export const UploadMainImage = ({ onUpload }) => {
  const [publicId, setPublicId] = useState("");
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
      },
      (error, result) => {
        if (!error && result && result.event === "success") {
          setPublicId(result.info.public_id);
          onUpload(result.info.secure_url);
        }
      }
    );
    widget.open();
  };

  return (
    <div>
      <button onClick={handleUpload}>Subir imagen principal</button>
      {publicId && (
        <img
          src={`https://res.cloudinary.com/${cloudName}/image/upload/${publicId}`}
          alt="Uploaded"
        />
      )}
    </div>
  );
};
