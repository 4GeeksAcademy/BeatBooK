import React, { useContext, useState, useEffect } from "react";
import { Context } from "../../store/appContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

export const EventComments = ({ eventData, onNewComment }) => {
  const { store, actions } = useContext(Context);
  const [comment, setComment] = useState("");


  const handleCommentChange = (event) => {
    setComment(event.target.value);
  };

  const handleCommentSubmit = async () => {
    const user = JSON.parse(localStorage.getItem("user"));
    const userId = user ? user.user_id : null;

    const username = localStorage.getItem("username");
    const reviewData = {
      user_id: userId,
      username: username,
      event_id: eventData.id,
      title: "Título de la revisión",
      rating: 5,
      comment: comment
    };

    try {
      const response = await actions.createReview(reviewData);
      console.log(response);
      onNewComment(); // Notificar al componente padre que se ha enviado un nuevo comentario
    } catch (error) {
      console.error("Error creating review", error);
    }
  };



  return (
    <div>
      <h2>Comentarios</h2>

      {eventData.reviews.map((review, index) => (
        <div key={index} className="d-flex align-items-start mb-2">
          {review.user_profile_image ? (
            <img src={review.user_profile_image} alt={review.user} className="rounded-circle mr-2 me-1" width="30" height="30" />
          ) : (
            <FontAwesomeIcon icon={faUser} className="faUser me-1" />
          )}
          <div>
            <h5 className="mb-0">{review.user}</h5>
            <p>{review.comment}</p>
          </div>
        </div>
      ))}

      <div className="d-flex justify-content-center align-items-center text-center pt-3">
        <textarea
          className="comment-box"
          placeholder="Escribe tu comentario aquí"
          value={comment}
          onChange={handleCommentChange}
        />
      </div>
      <div className="d-flex justify-content-center align-items-center text-center pt-3">
        <button className="comment-button" onClick={handleCommentSubmit}>
          Comentar
        </button>
      </div>
    </div>
  );
};