import React, { useEffect, useRef, useState, useContext } from "react";
import { Context } from "../../store/appContext"; // Asegúrate de usar la ruta correcta a tu tienda
import { Link } from "react-router-dom";
// ...

export const SearchResults = ({ isOpen, setIsOpen }) => {
  const { actions } = useContext(Context);
  const [events, setEvents] = useState([]);
  const [recentAccesses, setRecentAccesses] = useState([]);
  const [searchTerm, setSearchTerm] = useState(""); // Añade esta línea
  const inputRef = useRef(null);
  // ...

  const handleGetEvents = async () => {
    const data = await actions.getEvents(searchTerm); // Ahora puedes usar searchTerm aquí
    setEvents(data);
  };

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    handleGetEvents();
  };

  const handleAccessEvent = (event) => {
    setRecentAccesses((prevAccesses) => [event, ...prevAccesses].slice(0, 3));
  };

  useEffect(() => {
    if (isOpen) {
      handleGetEvents();
    }
  }, [isOpen]);

  const handleBlur = () => {
    setIsOpen(false);
  };
  if (!isOpen) {
    return null;
  }

  // ...

  return (
    <form
      style={{
        position: "fixed",
        top: "15%",
        left: "50%",
        transform: "translate(-50%, -50%)",
        width: "100%",
      }}
      className="total"
    >
      <input
        className="barraBusqueda1"
        ref={inputRef}
        type="text"
        placeholder="Buscar"
        onBlur={handleBlur}
        onChange={handleSearchChange}
      />

      <div className="busqueda">
        <h3>Eventos</h3>
        {searchTerm && // Solo muestra los eventos si searchTerm no está vacío
          events
            .filter((event) =>
              event.address.toLowerCase().includes(searchTerm.toLowerCase())
            ) // Filtra los eventos antes de mapearlos
            .map((event, index) => (
              <p key={index} onClick={() => handleAccessEvent(event)}>
                <Link to={`/event/${event.name}`}>{event.name}</Link>
              </p>
            ))}
        <h3>Accesos recientes</h3>
        {recentAccesses.map((event, index) => (
          <p key={index}>{event.name}</p>
        ))}
      </div>
    </form>
  );
};
