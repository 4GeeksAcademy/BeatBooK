import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { useParams } from "react-router-dom";
import { toast } from 'react-toastify'; // Importa toast de react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Importa los estilos de react-toastify


export const UploadMedia = ({ onUpload }) => {
  const { actions } = useContext(Context);
  const { id } = useParams(); // Extrae el id de la URL
  const [isLoading, setIsLoading] = useState(false); // Nuevo estado para controlar la carga
  const [selectedFiles, setSelectedFiles] = useState([]); // Nuevo estado para almacenar los archivos seleccionados
  const [filesSelected, setFilesSelected] = useState(false); // Nuevo estado para rastrear si se han seleccionado archivos

  const handleFileChange = async (event) => {
    setIsLoading(true); // Comienza la carga
    const files = Array.from(event.target.files);
    setSelectedFiles(files); // Almacena los archivos seleccionados
    if (files.length > 0) {
      setFilesSelected(true); // Se han seleccionado archivos
    }
    if (files.length > 4) {
      alert('No puedes subir más de 4 imágenes a la vez.');
      setIsLoading(false); // Termina la carga si hay un error
      return;
    }
    const urls = await actions.uploadEventMedia(files, id); // Reemplaza "eventId" con el id del evento real
    onUpload(urls);
    setIsLoading(false); // Termina la carga
    toast.success('Los medios han sido subidos'); // Muestra un mensaje de éxito
  };

  return (
    <div>
      <p className="p_upload">Media Evento <span>"Sube hasta 4 imágenes"</span></p>
      {isLoading ? (
        <div className="text-center mt-5 pt-5 pb-5">
          <div className="spinner-border" style={{ width: '5rem', height: '5rem' }} role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <input
          className="upload_selector"
          type="file"
          multiple
          required={!filesSelected} // Solo es requerido si no se han seleccionado archivos
          accept="image/*"
          onChange={handleFileChange}
        />
      )}
      {selectedFiles.map((file, index) => (
        <p className="text-white" key={index}>{file.name}</p> // Muestra los nombres de los archivos seleccionados
      ))}
    </div>
  );
};