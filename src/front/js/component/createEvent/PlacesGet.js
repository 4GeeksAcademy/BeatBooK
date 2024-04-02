import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { Context } from "../../store/appContext";

export const PlacesGet = ({ onChange }) => {
  const [places, setPlaces] = useState([]);
  const { actions } = useContext(Context);
  useEffect(() => {
    actions.getAllPlaces().then((data) => {
      if (Array.isArray(data)) {
        setPlaces(data);
      } else {
        console.error("getAllPlaces did not return an array:", data);
      }
    });
  }, []);

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "40px",
      marginTop: "10px",
    }),
    option: (provided) => ({
      ...provided,
    }),
  };

  const options = places.map((place) => ({
    value: place.id,
    label: place.name,
  }));

  return (
    <div>
      <label className="title_inputs">Lugar del Evento</label>
      <Select
        name="place"
        options={options}
        className="mutliSelect"
        onChange={onChange}
        styles={customStyles}
      />
    </div>
  );
};
