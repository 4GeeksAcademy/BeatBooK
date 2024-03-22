import React from "react";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./searchBar.css";

export const SearchBar = ({ setIsOpen }) => {
  const handleSearchFocus = (event) => {
    event.stopPropagation();
    setIsOpen(true);
  };

  return (
    <>
      <input
        className="barraBusqueda d-none d-lg-block"
        type="text"
        placeholder="Buscar"
        onFocus={handleSearchFocus}
      />
      <button className="d-block d-lg-none" onClick={handleSearchFocus}>
        <FontAwesomeIcon icon={faSearch} />
      </button>
    </>
  );
};
