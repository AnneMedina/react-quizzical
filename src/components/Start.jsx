import React from "react";

export default function Startpage(props) {
  return (
    <section>
      <h2 className="start-title">Quizzical</h2>
      <p className="start-description">
        Select the correct answers to the questions
      </p>
      <button
        onClick={props.startGame}
        className="start-button"
        style={{ zIndex: "10" }}
      >
        Start Game
      </button>
    </section>
  );
}
