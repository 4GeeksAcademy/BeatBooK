import React from "react";

export const EventComments = ({ isUserLoggedIn }) => {
  const loggedIn = isUserLoggedIn();
  return (
    <div>
      <h2>Comentarios</h2>
      <div className="d-flex justify-content-center align-items-center text-center pt-3">
        <textarea
          className="comment-box"
          placeholder={
            isUserLoggedIn()
              ? "Escribe tu comentario aquí"
              : "Inicia sesión o regístrate para comentar"
          }
          disabled={!isUserLoggedIn()}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center text-center pt-3">
        <button className="comment-button" disabled={!isUserLoggedIn()}>
          Comentar
        </button>
      </div>
    </div>
  );
};
