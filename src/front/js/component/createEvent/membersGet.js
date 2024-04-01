import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { Context } from "../../store/appContext";

export const MembersGet = () => {
  const [users, setUsers] = useState([]);
  const { actions } = useContext(Context);

  useEffect(() => {
    actions.getAllUsers().then((data) => setUsers(data));
  }, []);

  const options = users.map((user) => ({
    value: user.id,
    label: user.username,
  }));

  const handleChange = (selected) => {
    // Aquí puedes manejar los usuarios seleccionados
    console.log(selected);
  };

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

  return (
    <div>
      <label className="title_inputs">Miembros</label>
      <Select
        isMulti
        name="members"
        options={options}
        className="mutliSelect"
        onChange={handleChange}
        styles={customStyles}
      />
    </div>
  );
};
