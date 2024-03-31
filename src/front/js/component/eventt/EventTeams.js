import React from "react";

export const EventTeams = ({ eventData }) => {
  return (
    <div className="pt-3  ">
      <h4>
        Grupos(<span>{eventData.teams.length}</span>)
      </h4>
      <div
        className="d-flex justify-content-start pt-3"
        style={{ listStyle: "none" }}
      >
        {eventData.teams.map((team, index) => (
          <div key={index} className="me-3 teams">
            <p>{team}</p>
          </div>
        ))}
      </div>
    </div>
  );
};
