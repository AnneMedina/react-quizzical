import React from "react";
import Blueblob from "../assets/blueblob.png";
import Yellowblob from "../assets/yellowblob.png";
import Questions from "../components/Questions";

export default function Startpage() {
  const [gameHasStarted, setGameHasStarted] = React.useState(false);

  function startGame() {
    setGameHasStarted(true);
  }

  return gameHasStarted ? (
    <Questions />
  ) : (
    <section>
      <img className="yellow-blob" src={Yellowblob}></img>
      <h2 className="start-title">Quizzical</h2>
      <p className="start-description">
        Select the correct answers to the questions
      </p>
      <button
        onClick={startGame}
        className="start-button"
        style={{ zIndex: "10" }}
      >
        Start Game
      </button>

      <img
        className="blue-blob"
        src={Blueblob}
        style={{
          left: "0px",
          bottom: "0px",
        }}
      />
    </section>
  );
}
