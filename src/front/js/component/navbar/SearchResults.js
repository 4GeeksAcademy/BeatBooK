import React, { useEffect, useRef } from "react";
import "./searchBar.css";
export const SearchResults = ({ isOpen, setIsOpen }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleBlur = () => {
    setIsOpen(false);
  };

  if (!isOpen) {
    return null;
  }

  // Aquí puedes agregar las búsquedas recientes de ejemplo
  const recentSearches = ["Búsqueda 1", "Búsqueda 2", "Búsqueda 3"];

  return (
    <form
      style={{ position: "absolute", top: 0, width: "100%" }}
      className="total"
    >
      <input
        className="barraBusqueda1"
        ref={inputRef}
        type="text"
        placeholder="Buscar"
        onBlur={handleBlur}
      />
      <div className="busqueda">
        <h3>Busquedas recientes</h3>
        {recentSearches.map((search, index) => (
          <p className="" key={index}>
            {search}
          </p>
        ))}
      </div>
    </form>
  );
};
