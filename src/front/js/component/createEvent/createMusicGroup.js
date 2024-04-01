import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { Context } from "../../store/appContext";
import { Form } from "react-bootstrap";
import "./createEvent.css";

export const CreateMusicGroup = () => {
  const [users, setUsers] = useState([]);
  const [groupName, setGroupName] = useState("");
  const [groupImage, setGroupImage] = useState(null);
  const [groups, setGroups] = useState([]);
  const { actions } = useContext(Context);

  useEffect(() => {
    actions.getAllUsers().then((data) => setUsers(data));
  }, []);

  const options = users.map((user) => ({
    value: user.id,
    label: user.username,
  }));

  const handleMembersChange = (selected) => {
    // Aquí puedes manejar los miembros seleccionados
    console.log(selected);
  };

  const handleGroupNameChange = (event) => {
    setGroupName(event.target.value);
  };

  const handleGroupImageChange = (event) => {
    setGroupImage(event.target.files[0]);
  };

  const handleCreateGroup = () => {
    // Aquí puedes crear un nuevo grupo con los miembros seleccionados
    // Por ahora, solo agregaremos un grupo con el nombre y la imagen ingresados a la lista de grupos
    if (groupImage) {
      setGroups((prevGroups) => [
        ...prevGroups,
        { name: groupName, image: URL.createObjectURL(groupImage) },
      ]);
    } else {
      setGroups((prevGroups) => [...prevGroups, { name: groupName }]);
    }
    setGroupName(""); // Limpia el campo de entrada del nombre del grupo
    setGroupImage(null); // Limpia el campo de entrada de la imagen del grupo
  };

  const handleDeleteGroup = (index) => {
    // Aquí puedes manejar la eliminación de grupos
    setGroups((prevGroups) => prevGroups.filter((group, i) => i !== index));
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      borderRadius: "40px",
      marginTop: "10px",
    }),
    option: (provided) => ({
      ...provided,
      borderRadius: "40px",
    }),
  };

  return (
    <div>
      <div className="row d-flex align-items-center">
        <Form.Group className="col-12 title_input_group">
          <Form.Label className="title_input_group">
            Nombre del grupo
          </Form.Label>
          <Form.Control
            type="text"
            value={groupName}
            className="myFormControlClassGroup"
            onChange={handleGroupNameChange}
            placeholder="Nombre del grupo"
          />
        </Form.Group>
        <Form.Group className="col-12 title_input_group">
          <Form.Label className="title_input_group">
            Imagen del grupo
          </Form.Label>
          <Form.Control
            type="file"
            onChange={handleGroupImageChange}
            className="myFormControlClass"
          />
        </Form.Group>
        <div className="col-12 d-flex-column">
          <label className="title_inputs">Miembros del grupo</label>
          <Select
            isMulti
            name="members"
            options={options}
            className="mutliSelect"
            onChange={handleMembersChange}
            styles={customStyles}
          />
        </div>
      </div>
      <div className="row">
        <div className="col-12 d-flex justify-content-center mt-4">
          <button onClick={handleCreateGroup} className="create_event_button">
            Crear grupo
          </button>
        </div>
      </div>
      <div className="row ">
        <div className="col card_group">
          {groups.map((group, index) => (
            <div className="card_group_text" key={index}>
              <img src={group.image} alt={group.name} className="img_group" />
              {group.name}
              <button
                className="button_delete_group"
                onClick={() => handleDeleteGroup(index)}
              >
                X
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
