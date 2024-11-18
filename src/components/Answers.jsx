import yellowBlob from "../assets/yellowblob.png";
import blueBlob from "../assets/blueblob.png";

export default function Answers(props) {
  return (
    <section className="questions">
      <img className="yellow-blob" src={yellowBlob} />
      How would one say goodbye in Spanish?
      <img className="blue-blob" src={blueBlob} style={props.styles} />
      <button onClick={props.startGame}></button>
    </section>
  );
}
