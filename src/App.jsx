import { useState } from "react";
import Home from "./pages/home";
import Quiz from "./pages/quiz";
import "./App.css";

function App() {
  const [gameState, setGameState] = useState(false);

  const changeGameState = () => {
    setGameState((prevState) => !prevState);
  };
  return (
    <main className="App">
      <div className="decorate-head"></div>
      {gameState ? <Quiz /> : <Home start={changeGameState} />}
      <div className="decorate-foot"></div>
    </main>
  );
}

export default App;
