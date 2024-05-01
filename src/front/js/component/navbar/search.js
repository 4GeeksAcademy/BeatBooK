import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { Modal } from "react-bootstrap";
import { SearchResults } from "./SearchResults";
import "./search.css";

export const Search = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleSearchClick = () => {
    setIsOpen(true);
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ position: "relative" }}>
        <div className="busqueda_lupa" onClick={handleSearchClick}>
          <FontAwesomeIcon
            className="lupa"
            icon={faSearch}
          />
        </div>
      </div>
      <Modal show={isOpen} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Search</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <SearchResults handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </div>
  );
};