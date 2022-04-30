import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import QuizResultCard from "./components/QuizResultCard";
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

  return (
    <div>
      <h1>Quiz Result Show</h1>
      <Link to={`/quizzes/${quizResult.quiz_id}`}>Back</Link>

      <div className="quiz-result-card-parent">
        <QuizResultCard quizResult={quizResult} />
      </div>
    </div>
  );
}

export default QuizResultShow;