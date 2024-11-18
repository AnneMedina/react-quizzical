import Yellowblob from "../assets/yellowBlob.png";
import Blueblob from "../assets/blueblob.png";

export default function Startpage(props) {
  return (
    <section className="start">
      <img className="yellow-blob" src={Yellowblob}></img>
      <h2 className="start-title">Quizzical</h2>
      <p className="start-description">
        Select the correct answers to the questions
      </p>
      <button onClick={props.startGame} className="start-button">
        Start quiz
      </button>
      <img className="blue-blob" src={Blueblob}></img>
    </section>
  );
}
