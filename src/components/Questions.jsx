import React from "react";
import Yellowblob from "../assets/yellowblob.png";
import Blueblob from "../assets/blueblob.png";
import Trivias from "../data";
import { nanoid } from "nanoid";

export default function Questions(props) {
  const [questions, setQuestions] = React.useState(Trivias.trivias);

  console.log(questions);

  let list = questions.map((q) => (
    <div key={nanoid()} className="quiz-item">
      <h4 className="questions">{q.question}</h4>
      <label style={{ backgroundColor: "#d6dbf5" }}>
        {q.correct_answer}
        <input type="radio" name="answer" value={q.correct_answer} />
      </label>
      <label>
        {q.incorrect_answers[1]}
        <input type="radio" name="answer" value={q.incorrect_answers[1]} />
      </label>
      <label>
        {q.incorrect_answers[1]}
        <input type="radio" name="answer" value={q.incorrect_answers[2]} />
      </label>
      <label>
        {q.incorrect_answers[1]}
        <input type="radio" name="answer" value={q.incorrect_answers[3]} />
      </label>
      <hr />
    </div>
  ));

  return (
    <section className="questions">
      <img className="yellow-blob" src={Yellowblob} />
      {list}
      <img className="blue-blob" src={Blueblob} style={props.styles} />
    </section>
  );
}
