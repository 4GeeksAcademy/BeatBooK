import React from "react";
import { Button } from "react-bootstrap";

import "./searchBar.css";

export const SearchBar = ({ setIsOpen }) => {
  const handleSearchFocus = (event) => {
    event.stopPropagation();
    setIsOpen(true);
  };

  return (
    <input
      className="barraBusqueda d-none d-lg-block"
      type="text"
      placeholder="Buscar"
      onFocus={handleSearchFocus}
    />
  );
};
