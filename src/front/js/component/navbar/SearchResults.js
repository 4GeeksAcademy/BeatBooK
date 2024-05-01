import React, { useState, useContext } from "react";
import { Context } from "../../store/appContext";
import { Link } from "react-router-dom";

export const SearchResults = ({ handleClose }) => {
  const { actions } = useContext(Context);
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = async (event) => {
    setSearchTerm(event.target.value);
    const data = await actions.getEvents(event.target.value);
    setEvents(data);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Buscar por ciudad o dirección"
        onChange={handleSearchChange}
        style={{ width: '100%' }}
      />

      <div className="busqueda pt-3">
        <h3>Eventos</h3>
        <ul>
          {events
            .filter((event) =>
              event.address.toLowerCase().includes(searchTerm.toLowerCase())
            )
            .slice(0, 6)
            .map((event, index) => (
              <li key={index} onClick={handleClose}>
                <Link className="text-black" to={`/events/${event.id}`}>{event.name}</Link>
              </li>
            ))
          }
        </ul>
      </div>
    </div>
  );
};