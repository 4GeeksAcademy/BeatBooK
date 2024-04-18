import React, { useState, useEffect, useContext } from "react";
import Select from "react-select";
import { Context } from "../../store/appContext";

export const EventGet = ({ onChange }) => {
  const [allEvents, setAllEvents] = useState([]);
  const { actions } = useContext(Context);


  useEffect(() => {
    actions.getAllEvents().then((data) => {
      if (Array.isArray(data)) {
        setAllEvents(data);
        console.log(data);
      } else {
        console.error("getAllEvents did not return an array:", data);
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

  const options = allEvents.map((event) => ({
  value: { id: event.id, name: event.name, description: event.description, picture_url: event.picture_url },
  label: event.name,
}));
  return (
    <div>
      <label className="title_inputs">Evento</label>
      <Select
        name="events"
        options={options}
        className="mutliSelect"
        onChange={onChange}
        styles={customStyles}
      />
    </div>
  );
};
