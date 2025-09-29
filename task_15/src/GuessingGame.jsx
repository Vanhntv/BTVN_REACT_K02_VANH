import React, { useState } from "react";

const GuessingGame = () => {
  // Các state riêng biệt để dễ hiểu
  const [secret, setSecret] = useState(null);       // số bí mật
  const [input, setInput] = useState("");           // số người dùng nhập
  const [attempts, setAttempts] = useState(10);     // số lượt còn lại
  const [status, setStatus] = useState("idle");     // idle | playing | win | lose
  const [guesses, setGuesses] = useState([]);       // lịch sử đoán
  const [range, setRange] = useState(0);            // phạm vi độ khó

  // Hàm bắt đầu game mới
  const handleStart = (mode) => {
    let max = 50;
    if (mode === "medium") max = 100;
    if (mode === "hard") max = 200;

    const randomNumber = Math.floor(Math.random() * max) + 1;
    console.log("🔒 Secret number:", randomNumber);

    setSecret(randomNumber);
    setRange(max);
    setAttempts(10);
    setGuesses([]);
    setStatus("playing");
    setInput("");
  };

  // Hàm xử lý đoán số
  const handleGuess = () => {
    if (!input) return;
    const num = parseInt(input, 10);
    if (isNaN(num)) return;

    const diff = Math.abs(secret - num);

    // Cập nhật lịch sử đoán
    setGuesses((prev) => [...prev, { value: num, diff }]);

    if (num === secret) {
      setStatus("win");
    } else {
      if (attempts - 1 === 0) {
        setStatus("lose");
      }
      setAttempts(attempts - 1);
    }

    setInput("");
  };

  // Xác định màu sắc của lịch sử đoán
  const getColor = (gap) => {
    if (gap === 0) return "green"; // đúng
    if (gap >= 1 && gap <= 3) return "darkgreen"; // rất gần
    if (gap >= 4 && gap <= 6) return "lightgreen"; // gần
    return "red"; // xa
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>🎮 Game Đoán Số</h2>

      {status === "idle" && (
        <div>
          <p>Chọn độ khó:</p>
          <button onClick={() => handleStart("easy")}>Dễ (1-50)</button>
          <button onClick={() => handleStart("medium")}>Trung bình (1-100)</button>
          <button onClick={() => handleStart("hard")}>Khó (1-200)</button>
        </div>
      )}

      {status === "playing" && (
        <div>
          <p>Đoán số trong khoảng 1 - {range}</p>
          <p>Lượt còn lại: {attempts}</p>

          <input
            type="number"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button onClick={handleGuess}>Đoán</button>

          <h3>Lịch sử đoán:</h3>
          <ul>
            {guesses.map((g, i) => (
              <li key={i} style={{ color: getColor(g.diff) }}>
                Bạn đoán {g.value}
              </li>
            ))}
          </ul>
        </div>
      )}

      {status === "win" && (
        <div>
          <h3 style={{ color: "green" }}>🎉 Bạn đã đoán đúng số {secret}!</h3>
          <button onClick={() => setStatus("idle")}>Chơi lại</button>
        </div>
      )}

      {status === "lose" && (
        <div>
          <h3 style={{ color: "red" }}>😢 Bạn đã thua! Số bí mật là {secret}</h3>
          <button onClick={() => setStatus("idle")}>Chơi lại</button>
        </div>
      )}
    </div>
  );
};

export default GuessingGame;