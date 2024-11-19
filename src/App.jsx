import React from "react";
import "./App.css";
import Blueblob from "./assets/blueblob.png";
import Yellowblob from "./assets/yellowBlob.png";
import Startpage from "./components/Start";
import Questions from "./components/Questions";
import Answers from "./components/Answers";

export default function App() {
  const [page, setPage] = React.useState(2);

  // const styles = { left: "-70px", bottom: "-50px" };

  function startGame() {
    console.log("start game");
    setPage(2);
  }

  function checkAnswers() {}

  return (
    <main className="main-container">
      <img className="yellow-blob" src={Yellowblob}></img>
      {page === 1 && <Startpage startGame={startGame} />}
      {page === 2 && <Questions />}
      {page === 3 && <Answers startGame={startGame} />}

      <button
        onClick={page == 2 ? checkAnswers : startGame}
        className={page > 1 ? "action-button" : "start-button"}
      >
        {page == 1 ? "Start Quiz" : page === 2 ? "Check Answers" : "Play Again"}
      </button>
      <img
        className="blue-blob"
        src={Blueblob}
        style={{
          left: page > 1 ? "-70px" : "0px",
          bottom: page > 1 ? "-50px" : "0px",
        }}
      />
    </main>
  );
}
