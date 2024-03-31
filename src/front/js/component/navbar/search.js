import React, { useState } from "react";
import { SearchBar } from "./searchBar";
import { SearchResults } from "./SearchResults";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import "./search.css";

export const Search = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOutsideMousedown = (event) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };

  const handleSearchxocus = (event) => {
    event.stopPropagation();
    setIsOpen(true);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className={`overlay ${isOpen ? "show" : ""}`}
        onMouseDown={handleOutsideMousedown}
      >
        <SearchResults isOpen={isOpen} setIsOpen={setIsOpen} />
      </div>
      <div style={{ position: "relative" }}>
        <div className="busqueda_lupa" onClick={handleSearchxocus}>
          <FontAwesomeIcon
            className="lupa"
            icon={faSearch}
            onClick={() => setIsOpen(true)}
          />
        </div>
      </div>
    </div>
  );
};
