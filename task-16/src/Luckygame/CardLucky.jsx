import React from "react";
import "./luckygame.css";

function CardLucky({ id, daLat, laVang, xuLyLat }) {
  return (
    <div className="card" onClick={() => xuLyLat(id)}>
      <div className={`card-box ${daLat ? "lat" : ""}`}>
        <div className="card-front">?</div>
        <div className={`card-back ${laVang ? "gold-card" : "pink-card"}`}>
          {laVang ? "💛" : "💖"}
        </div>
      </div>
    </div>
  );
}

export default CardLucky;
