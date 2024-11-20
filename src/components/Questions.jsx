import React from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";

export default function Questions() {
  const [questions, setQuestions] = React.useState([]);
  const [checkPage, setCheckPage] = React.useState(false);

  console.log("new %o, ", questions);

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
            // question: decode(q.question),
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

  React.useEffect(() => {
    if (questions.length == 0) {
      fetchQuestions();
    }
  }, []);

  function randomizeAnswers(q) {
    const possibleAnswers = q.incorrect_answers.map((i) => decode(i)); // Copy incorrect answers
    const randomIndex = Math.floor(
      Math.random() * (possibleAnswers.length + 1)
    ); // Get random index
    possibleAnswers.splice(randomIndex, 0, decode(q.correct_answer)); // Insert correct answer randomly
    return possibleAnswers;
  }

  // React.useEffect(() => {
  //   console.log(questions);
  // }, [questions]);

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

  function checkAnswers() {
    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        return { ...q, score: q.selected_answer === q.correct_answer ? 1 : 0 };
      })
    );

    setCheckPage(true);
    console.log(questions);
  }

  function playAgain() {
    setCheckPage(false);
    setQuestions([]);
    fetchQuestions();
  }

  return (
    <section>
      {/* <form> */}
      {questions.length === 0 ? ( // Check if questions are available
        <p>Loading questions...</p>
      ) : (
        <>
          <div className="quiz">
            {questions.map((q) => (
              <div key={nanoid()} className="quiz-item">
                <h4 className="quiz-question">{decode(q.question)}</h4>
                <div className="quiz-answers">
                  {q.shuffled_answers.map((a, index) => (
                    <label
                      onClick={(e) => markAnswer(e)}
                      key={`${q.id}_${index}`}
                      style={
                        checkPage
                          ? {
                              backgroundColor:
                                a === q.correct_answer
                                  ? "#94D7A2"
                                  : a === q.selected_answer
                                  ? "#b76e795e"
                                  : "none",
                              border:
                                a === q.correct_answer
                                  ? "#94D7A2"
                                  : "0.1rem solid #b76e79",
                            }
                          : a === q.selected_answer
                          ? {
                              backgroundColor: "#b76e795e",
                            }
                          : {
                              backgroundColor: "none",
                            }
                      }
                    >
                      {decode(a)}
                      <input type="radio" name={q.id} value={a} />
                    </label>
                  ))}
                </div>

                <hr />
              </div>
            ))}
          </div>
          {checkPage ? (
            <>
              <p className="score-message">
                {/* You scored {`${score}/${total}`} correct answers{" "} */}
                You scored correct answers{" "}
              </p>
              <button
                onClick={playAgain}
                className="action-button"
                style={{ zIndex: "10" }}
              >
                Play Again
              </button>
            </>
          ) : (
            <button
              onClick={checkAnswers}
              className="action-button"
              style={{ zIndex: "10" }}
            >
              Check Answers
            </button>
          )}
        </>
      )}

      {/* </form> */}
    </section>
  );
}
