import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { Context } from "../../store/appContext";

export const BandsGet = ({ onChange }) => {
  const [bands, setBands] = useState([]);
  const { actions } = useContext(Context);
  useEffect(() => {
    actions.getAllBands().then((data) => {
      if (Array.isArray(data)) {
        setBands(data);
      } else {
        console.error("getAllBands did not return an array:", data);
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

  const options = bands.map((band) => ({
    value: band.id,
    label: band.name,
  }));

  return (
    <div>
      <label className="title_inputs">Bandas</label>
      <Select
        name="band"
        options={options}
        className="mutliSelect"
        onChange={onChange}
        styles={customStyles}
      />
    </div>
  );
};
