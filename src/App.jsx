import React from "react";
import "./App.css";
import Blueblob from "./assets/blueblob.png";
import Yellowblob from "./assets/yellowBlob.png";
import Startpage from "./components/Start";
import Questions from "./components/Questions";

export default function App() {
  const [page, setPage] = React.useState(1);

  function startGame() {
    console.log("start game");
    setPage(2);
  }

  return (
    <main className="main-container">
      <img className="yellow-blob" src={Yellowblob}></img>
      {page === 1 && <Startpage startGame={startGame} />}
      {page === 2 && <Questions />}

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
