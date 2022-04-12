import React, { useEffect, useState } from "react";

const QuizResultShow = (props) => {
  const [quizResult, setQuizResult] = useState({
    id: "",
    start: "",
    end: "",
    completed_at: "",
    finished: false,
    user_id: "",
    quiz_id: "",
    created_at: "",
    updated_at: ""
  });

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

  return <div><h1>QUIZ RESULT SHOW</h1></div>
}

export default QuizResultShow;