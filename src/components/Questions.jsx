import React from "react";
import { nanoid } from "nanoid";
import { decode } from "html-entities";
import Blueblob from "../assets/blueblob.png";
import Yellowblob from "../assets/yellowblob.png";

export default function Questions() {
  const [questions, setQuestions] = React.useState([]);
  const [checkPage, setCheckPage] = React.useState(false);
  const [score, setScore] = React.useState(0);
  const total = 5; //set of 5 questions for now. This can be dynamically configured

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
          /** I processed the data as soon as I got it and added some properties for easier manipulation later */
          const shuffledAnswers = data.results.map((q) => ({
            ...q,
            id: nanoid(),
            correct_answer: decode(q.correct_answer),
            incorrect_answers: q.incorrect_answers.map((i) => decode(i)),
            shuffled_answers: randomizeAnswers(q),
            selected_answer: "",
            score: 0,
          }));

          setQuestions(shuffledAnswers);
        } else {
          setTimeout(() => {
            console.log("Retrying now..."); // Log right before the retry
            fetchQuestions();
          }, 5000);
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

  function markAnswer(e) {
    /** If answers have been checked, disable clicking on other answers  */
    checkPage ? e.stopImmediagePropagation() : e.preventDefault();

    const label = e.target;
    const selectedAnswer = label.innerText;

    const radioButton = label.querySelector("input[type='radio']");
    radioButton.checked = true;

    setQuestions((prevQuestions) =>
      prevQuestions.map((q) => {
        return q.id === radioButton.name
          ? {
              ...q,
              selected_answer: selectedAnswer,
              score: selectedAnswer === q.correct_answer ? 1 : 0,
            }
          : { ...q };
      })
    );
  }

  function checkAnswers() {
    setCheckPage(true);
    const initialScore = 0;
    const totalScore = questions.reduce(
      (accumulator, q) => accumulator + q.score,
      initialScore
    );

    setScore(totalScore);
  }

  function playAgain() {
    setCheckPage(false);
    setQuestions([]);
    fetchQuestions();
  }

  return (
    <section>
      <img className="yellow-blob" src={Yellowblob}></img>
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
                                  ? "0.1rem solid #94D7A2"
                                  : a === q.selected_answer
                                  ? "0.1rem solid rgba(183, 110, 121, 0.37)"
                                  : "0.1rem solid #b76e79e",
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
                You scored {`${score}/${total}`} correct answers{" "}
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
      <img
        className="blue-blob"
        src={Blueblob}
        style={{
          left: "-70px",
          bottom: "-50px",
        }}
      />
    </section>
  );
}
