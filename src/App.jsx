import React from "react";
import "./App.css";
import Startpage from "./components/Start";
import Questions from "./components/Questions";
import Answers from "./components/Answers";

export default function App() {
  const [page, setPage] = React.useState(1);

  const styles = { left: "-70px", bottom: "-50px" };
  function startGame() {
    console.log("start game");
    setPage(2);
  }

  return (
    <main className="main-container">
      {page === 1 && <Startpage startGame={startGame} />}
      {page === 2 && <Questions styles={styles} />}
      {page === 3 && <Answers startGame={startGame} styles={styles} />}
    </main>
  );
}
