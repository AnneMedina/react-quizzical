import React from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

export default function Questions() {
  const [questions, setQuestions] = React.useState([]);

  // console.log("new %o, ", questions);

  function fetchQuestions() {
    fetch("https://opentdb.com/api.php?amount=5")
      .then((res) => {
        if (!res.ok) {
          // Throw an error for non-200 status codes
          throw new Error(`HTTP error: ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        if (data.results.length > 0) {
          // setQuestions(data.results);

          const shuffledAnswers = data.results.map((q) => ({
            ...q,
            id: nanoid(),
            question: decode(q.question),
            correct_answer: decode(q.correct_answer),
            incorrect_answers: q.incorrect_answers.map((i) => decode(i)),
            shuffled_answers: randomizeAnswers(q),
            selected_answer: "",
          }));

          setQuestions(shuffledAnswers);
        } else {
          setTimeout(() => {
            console.log("Retrying now..."); // Log right before the retry
            fetchQuestions();
          }, 5000);
          // setQuestions([]);
        }
      })
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
    // return item.map((q) => {
    const possibleAnswers = [...q.incorrect_answers]; // Copy incorrect answers
    const randomIndex = Math.floor(
      Math.random() * (possibleAnswers.length + 1)
    ); // Get random index
    possibleAnswers.splice(randomIndex, 0, q.correct_answer); // Insert correct answer randomly
    // return { ...q, shuffled_answers: possibleAnswers }; //
    // console.log("possible answers %o", possibleAnswers);
    return possibleAnswers;
    // });
  }

  React.useEffect(() => {
    console.log(questions);
  }, [questions]);

  function markAnswer(e) {
    e.preventDefault();
    const label = e.target;
    const selectedAnswer = label.innerText;
    console.log(selectedAnswer);

    const radioButton = label.querySelector("input[type='radio']");
    radioButton.checked = true;

    console.log(radioButton.name);

    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        return q.id === radioButton.name
          ? {
              ...q,
              selected_answer: selectedAnswer,
            }
          : { ...q };
      })
    );
  }

  return (
    <section className="quiz">
      <form>
        {questions.length === 0 ? ( // Check if questions are available
          <p>Loading questions...</p>
        ) : (
          questions.map((q) => (
            <div key={nanoid()} className="quiz-item">
              <h4 className="quiz-question">{q.question}</h4>
              <div className="quiz-answers">
                {q.shuffled_answers.map((a, index) => (
                  <label
                    onClick={(e) => markAnswer(e)}
                    key={`${q.id}_${index}`}
                    style={{
                      backgroundColor:
                        a === q.selected_answer ? "#b76e795e" : "",
                    }}
                  >
                    {a}
                    <input type="radio" name={q.id} value={a} />
                  </label>
                ))}
              </div>

              <hr />
            </div>
          ))
        )}
      </form>
    </section>
  );
}
