import React from "react";
import Yellowblob from "../assets/yellowblob.png";
import Blueblob from "../assets/blueblob.png";
import Trivias from "../data";

export default function Questions(props) {
  const [questions, setQuestions] = React.useState([{}]);

  function populateQuestions() {}

  return (
    <section className="questions">
      <img className="yellow-blob" src={Yellowblob} />
      How would one say goodbye in Spanish?
      <img className="blue-blob" src={Blueblob} style={props.styles} />
    </section>
  );
}
