import React from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

export default function Questions() {
  const [questions, setQuestions] = React.useState([]);

  function fetchQuestions() {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => {
        if (!res.ok) {
          // Throw an error for non-200 status codes
          throw new Error(`HTTP error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => setQuestions(data.results || []))
      .catch((error) => {
        console.error("Error fetching data: ", error);
        console.log("Retrying in 5 seconds..."); // Log when retry is triggered
        setTimeout(() => {
          console.log("Retrying now..."); // Log right before the retry
          fetchQuestions();
        }, 5000);
      });
  }

  React.useEffect(fetchQuestions, []);

  function randomizeAnswers(q) {
    const randomAnswers = [...q.incorrect_answers, q.correct_answer];

    console.log("possible answers %o, ", randomAnswers);

    for (let i = randomAnswers.length - 1; i > 0; i--) {
      const randomIndex = Math.floor(Math.random() * (i + 1)); //get a random index
      // console.log("random index " + randomIndex);
      [randomAnswers[i], randomAnswers[randomIndex]] = [
        randomAnswers[randomIndex],
        randomAnswers[i],
      ];
    }

    return randomAnswers;
  }

  if (questions.length > 0) {
    // console.log(questions[0]);
    // const shuffledAnswers = questions.map((q) => {
    //   return { ...q, shuffledAnswers: randomizeAnswers(q) };
    // });

    let shuffledAnswerObj;
    // for (let c = 0; c <= questions.length; c++) {
    shuffledAnswerObj = randomizeAnswers(questions[0]);
    // console.log(shuffledAnswerObj);
    // }
    console.log("shuffled answers %o", shuffledAnswerObj);
  }

  return (
    <section className="quiz">
      {/* {questions.length === 0 ? ( // Check if questions are available
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

              <label style={{ backgroundColor: "#b76e795e" }}>
                {q.correct_answer}
                <input type="radio" name="answer" value={q.correct_answer} />
              </label>
            </div>

            <hr />
          </div>
        ))
      )} */}
    </section>
  );
}
