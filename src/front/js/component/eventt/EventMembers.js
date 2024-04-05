import React from "react";

export const EventMembers = ({ eventData }) => {
  // Comprueba si eventData y eventData.members están definidos
  if (!eventData || !eventData.members) {
    return <div>Cargando...</div>;
  }

  return (
    <div className="mt-3">
      <h4>
        Miembros(<span>{eventData.members.length}</span>)
      </h4>
      <ul className="d-flex pt-3 " style={{ listStyle: "none" }}>
        {eventData.members.map((member, index) => (
          <li key={index} className="me-3">
            <img
              className="img-members"
              src="https://imgs.search.brave.com/c9wFuWkOoNuR2FNhCW0ztGtYymvVWqn_jiN2VX4YWXg/rs:fit:500:0:0/g:ce/aHR0cHM6Ly93d3cu/YWNlc2hvd2Jpei5j/b20vaW1hZ2VzL3Bo/b3RvL2RhdmlkX2d1/ZXR0YS5qcGc"
            />
            <p>{member}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
