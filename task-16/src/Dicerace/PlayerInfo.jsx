import React from "react";

function PlayerInfo({ name, position, isCurrent }) {
  return (
    <div className={`player ${isCurrent ? "current" : ""}`}>
      <strong>{name}</strong> - Vị trí: {position}
      {isCurrent && <span> 🎲</span>}
    </div>
  );
}

export default PlayerInfo;
