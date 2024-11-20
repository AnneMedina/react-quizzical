import React from "react";
import Trivias from "../data";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

export default function Questions() {
  const [questions, setQuestions] = React.useState([]);

  console.log(questions);

  React.useEffect(() => {
    fetchQuestions();
  }, []);

  function fetchQuestions() {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => res.json())
      .then((data) => setQuestions(data.results || []))
      .catch((error) => {
        console.error("Error fetching data: ", error);
        //try again after 5 seconds
        setTimeout(() => fetchQuestions(), 5000);
      });
  }

  return (
    <section className="quiz">
      {questions.length === 0 ? ( // Check if questions are available
        <p>Loading questions...</p>
      ) : (
        questions.map((q) => (
          <div key={nanoid()} className="quiz-item">
            <h4 className="quiz-question">{decode(q.question)}</h4>
            <div className="quiz-answers">
              {q.incorrect_answers.map((incorrect, index) => (
                <label key={index}>
                  {incorrect}
                  <input
                    type="radio"
                    name="answer"
                    value={q.incorrect_answers[0]}
                  />
                </label>
              ))}
              <label style={{ backgroundColor: "#d6dbf5" }}>
                {q.correct_answer}
                <input type="radio" name="answer" value={q.correct_answer} />
              </label>
            </div>
            <hr />
          </div>
        ))
      )}
    </section>
  );
}
