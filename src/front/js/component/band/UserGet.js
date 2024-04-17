import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { Context } from "../../store/appContext";

export const UserGet = ({ onChange }) => {
  const [allUsers, setAllUsers] = useState([]);
  const { actions,store } = useContext(Context);


  useEffect(() => {
    actions.getAllUsers().then((data) => {
      if (Array.isArray(data)) {
        setAllUsers(data);
        console.log(data);
      } else {
        console.error("getAllUsers did not return an array:", data);
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

  const options = allUsers.map((user) => ({
  value: { id: user.id, username: user.username, profile_image_url: user.profile_image_url },
  label: user.username,
}));
console.log('AQUI ESTAN TUS DATOS!!!!!!!!!')
console.log(options);
  return (
    <div>
      <label className="title_inputs">Miembros</label>
      <Select
        name="members"
        options={options}
        className="mutliSelect"
        onChange={onChange}
        styles={customStyles}
        isMulti
      />
    </div>
  );
};
