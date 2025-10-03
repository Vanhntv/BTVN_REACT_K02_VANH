import React, { useState } from "react";
import "./DiceGame.css";

function DiceRace() {
  const [soNguoi, setSoNguoi] = useState(2);
  const [nguoiChoi, setNguoiChoi] = useState([]);
  const [luotHienTai, setLuotHienTai] = useState(0);
  const [lichSu, setLichSu] = useState([]);
  const [winner, setWinner] = useState("");
  const [daBatDau, setDaBatDau] = useState(false);
  const [roll, setRoll] = useState(null);

  const batDauGame = () => {
    const ds = Array.from({ length: soNguoi }, (_, i) => ({
      id: i,
      name: `Người chơi ${i + 1}`,
      position: 0,
    }));
    setNguoiChoi(ds);
    setLuotHienTai(0);
    setLichSu([]);
    setWinner("");
    setRoll(null);
    setDaBatDau(true);
  };

  const tungXucXac = () => {
    if (winner) return;
    const rollNumber = Math.floor(Math.random() * 6) + 1;
    setRoll(rollNumber);

    setNguoiChoi((old) =>
      old.map((p, idx) =>
        idx === luotHienTai
          ? { ...p, position: Math.min(p.position + rollNumber, 30) }
          : p
      )
    );

    const nguoi = nguoiChoi[luotHienTai];
    setLichSu((old) => [
      ...old,
      `${nguoi.name} tung được ${rollNumber}, đến ô ${Math.min(
        nguoi.position + rollNumber,
        30
      )}`,
    ]);

    if (nguoi.position + rollNumber >= 30) {
      setWinner(`${nguoi.name} đã chiến thắng!`);
      return;
    }

    if (rollNumber !== 6) {
      setLuotHienTai((idx) => (idx + 1) % nguoiChoi.length);
    }
  };

  const choiLai = () => {
    setDaBatDau(false);
    setNguoiChoi([]);
    setWinner("");
    setLichSu([]);
    setLuotHienTai(0);
    setRoll(null);
  };

  return (
    <div className="race-game">
      <h2>Cuộc đua xúc xắc</h2>

      {!daBatDau ? (
        <div className="setup">
          <label>Nhập số người chơi (tối đa 6): </label>
          <input
            type="number"
            value={soNguoi}
            min="2"
            max="6"
            onChange={(e) => {
              const value = Math.min(6, Math.max(2, Number(e.target.value)));
              setSoNguoi(value);
            }}
          />
          <button onClick={batDauGame}>Bắt đầu</button>
        </div>
      ) : (
        <>
          
          <div className="board">
            {Array.from({ length: 30 }, (_, i) => {
              const o = i + 1;
              const playersAtCell = nguoiChoi.filter((p) => p.position === o);
              return (
                <div key={o} className="cell">
                  <span className="cell-num">{o}</span>
                  <div className="tokens">
                    {playersAtCell.map((p) => (
                      <span key={p.id} className={`token player-${p.id}`}>
                        -
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          <div className="players">
            {nguoiChoi.map((p, idx) => (
              <div
                key={p.id}
                className={`player ${idx === luotHienTai ? "current" : ""}`}
              >
                <strong>{p.name}</strong> - Ô: {p.position}
                {idx === luotHienTai && <span> 🎲 </span>}
              </div>
            ))}
          </div>

          <div className="dice">
            {roll && <div className="dice-face">{roll}</div>}
          </div>

          {!winner && (
            <button className="roll-btn" onClick={tungXucXac}>
              Tung xúc xắc
            </button>
          )}
          {winner && <h2 className="winner">{winner}</h2>}

          <button onClick={choiLai}>Chơi lại</button>

          <h3>Lịch sử tung xúc xắc</h3>
          <ul>
            {lichSu.map((item, i) => (
              <li key={i}>{item}</li>
            ))}
          </ul>
        </>
      )}
      <div className="legend">
        <h3>Chú thích quân cờ:</h3>
        <ul>
          {nguoiChoi.map((p) => (
            <li key={p.id}>
              <span className={`legend-color player-${p.id}`}></span>
              {p.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default DiceRace;
