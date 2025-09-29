import React, { useState } from "react";

const GuessingGame = () => {
  const [secret, setSecret] = useState(null);
  const [input, setInput] = useState("");
  const [attempts, setAttempts] = useState(10);
  const [status, setStatus] = useState("idle");
  const [guesses, setGuesses] = useState([]);
  const [range, setRange] = useState(0);


  const handleStart = (mode) => {
    let max = 50;
    if (mode === "medium") max = 100;
    if (mode === "hard") max = 200;

    const randomNumber = Math.floor(Math.random() * max) + 1;
    console.log("Secret number:", randomNumber);

    setSecret(randomNumber);
    setRange(max);
    setAttempts(10);
    setGuesses([]);
    setStatus("playing");
    setInput("");
  };

  const handleGuess = () => {
    if (!input) return;
    const num = parseInt(input, 10);
    if (isNaN(num)) return;

    const diff = Math.abs(secret - num);

    
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


  const getColor = (gap) => {
    if (gap === 0) return "green";
    if (gap >= 1 && gap <= 3) return "darkgreen";
    if (gap >= 4 && gap <= 6) return "lightgreen";
    return "red";
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Trò chơi đoán số</h2>

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
          <h3 style={{ color: "green" }}>Bạn đã bóc trúng secret là số {secret}!</h3>
          <button onClick={() => setStatus("idle")}>Chơi lại</button>
        </div>
      )}

      {status === "lose" && (
        <div>
          <h3 style={{ color: "red" }}>Bạn đã thuaT^T Số bí mật là {secret}</h3>
          <button onClick={() => setStatus("idle")}>Chơi lại</button>
        </div>
      )}
    </div>
  );
};

export default GuessingGame;