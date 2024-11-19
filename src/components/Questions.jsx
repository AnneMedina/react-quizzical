import React from "react";
import Trivias from "../data";
import { nanoid } from "nanoid";

export default function Questions() {
  const [questions, setQuestions] = React.useState(Trivias.trivias);

  React.useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => setQuestions(data.results))
      .catch((error) => {
        console.error("Error fetching data: ", error);
        setQuestions(Trivias.trivias);
      });
  }, []);

  console.log(questions);

  let list = questions.map((q) => (
    <div key={nanoid()} className="quiz-item">
      <h4 className="question-item">{q.question}</h4>
      <div className="question-answers">
        {q.incorrect_answers.map((incorrect, index) => (
          <label key={index}>
            {incorrect}
            <input type="radio" name="answer" value={q.incorrect_answers[0]} />
          </label>
        ))}
        <label style={{ backgroundColor: "#d6dbf5" }}>
          {q.correct_answer}
          <input type="radio" name="answer" value={q.correct_answer} />
        </label>
      </div>
      <hr />
    </div>
  ));

  return <section className="questions">{list}</section>;
}
