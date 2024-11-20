// import React from "react";

export default function Answers(props) {
  const score = 0;
  const total = 5;

  return (
    <section className="quiz">
      {props.questions}
      <p className=""> You scored {`${score}/${total}`} correct answers </p>
    </section>
  );
}
