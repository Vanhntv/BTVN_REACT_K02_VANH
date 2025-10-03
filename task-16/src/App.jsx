import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LuckyGame from "./Luckygame/LuckyGame";
import DiceRace from "./Dicerace/DiceRace";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h2>Trò Chơi Xúc Sắc Và Lật Bài Cùng Vanh</h2>
      <LuckyGame />
      <DiceRace />
    </div>
  );
}

export default App;
