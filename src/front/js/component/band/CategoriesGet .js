import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { Context } from "../../store/appContext";

export const CategoriesGet = ({ onChange }) => {
  const [allCategories, setAllCategories] = useState([]);
  const { actions } = useContext(Context);


  useEffect(() => {
    actions.getMusicalCategories().then((data) => {
      if (Array.isArray(data)) {
        setAllCategories(data);
        console.log(data);
      } else {
        console.error("getMusicalCategories did not return an array:", data);
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

  const options = allCategories.map((category) => ({
    value: { id: category.id, name: category.name },
    label: category.name,
  }));
  return (
    <div>
      <label className="title_inputs">Estilo musical</label>
      <Select
        name="miembros"
        options={options}
        className="mutliSelect"
        onChange={onChange}
        styles={customStyles}
      />
    </div>
  );
};
