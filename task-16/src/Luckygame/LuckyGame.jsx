import React, { useState } from "react";
import CardLucky from "./CardLucky";

function LuckyGame() {
  const [boBai, setBoBai] = useState(taoBoBai());
  const [luotLat, setLuotLat] = useState(3);
  const [ketQua, setKetQua] = useState("");

  function taoBoBai() {
    const viTriVang = Math.floor(Math.random() * 12);
    return Array.from({ length: 12 }, (_, i) => ({
      id: i,
      daLat: false,
      laVang: i === viTriVang,
    }));
  }

  const xuLyLat = (id) => {
    if (ketQua || luotLat === 0) return;

    const laChon = boBai.find((la) => la.id === id);

    if (laChon.daLat) return;

    setBoBai((cu) =>
      cu.map((la) => (la.id === id ? { ...la, daLat: true } : la))
    );

    if (laChon.laVang) {
      setKetQua("Bạn đã bóc trúng secret!");
    } else {
      if (luotLat - 1 === 0) {
        setKetQua("Thua rồi! Đừng cố chấp.");
      }
      setLuotLat((x) => x - 1);
    }
  };

  const choiLai = () => {
    setBoBai(taoBoBai());
    setLuotLat(3);
    setKetQua("");
  };

  return (
    <div className="game">
      <h2>Trò chơi Lật Lá Vàng</h2>
      <p>Số lượt còn lại: {luotLat}</p>
      <div className="board">
        {boBai.map((la) => (
          <CardLucky
            key={la.id}
            id={la.id}
            daLat={la.daLat}
            laVang={la.laVang}
            xuLyLat={xuLyLat}
          />
        ))}
      </div>
      {ketQua && <h2>{ketQua}</h2>}
      <button onClick={choiLai}>Chơi lại</button>
    </div>
  );
}

export default LuckyGame;
