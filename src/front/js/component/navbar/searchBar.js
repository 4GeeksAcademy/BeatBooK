import React from "react";
import "./searchBar.css";

export const SearchBar = ({ setIsOpen }) => {
  const handleSearchFocus = (event) => {
    event.stopPropagation();
    setIsOpen(true);
  };

  return (
    <input
      className="barraBusqueda "
      type="text"
      placeholder="Buscar"
      onFocus={handleSearchFocus}
    />
  );
};
