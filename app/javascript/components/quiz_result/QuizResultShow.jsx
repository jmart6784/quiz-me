import React, { useEffect, useState } from "react";
import quizStartObjects from "./quiz_start_helper/quizStartObjects";

const QuizResultShow = (props) => {
  const [quizResult, setQuizResult] = useState(quizStartObjects()[1]);

  useEffect(() => {
    fetch(`/api/v1/quiz_results/show/${props.match.params.id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setQuizResult(response))
      .catch(() => props.history.push("/"));
  }, []);

  useEffect(() => console.log(quizResult), [quizResult]);

  return (
    <div>
      <h1>QUIZ RESULT SHOW</h1>
      
      <div>
        <p>Quiz name: {quizResult.quiz.name}</p>
      </div>
    </div>
  );
}

export default QuizResultShow;