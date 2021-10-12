import React, { useEffect, useState } from "react";

const QuizShow = (props) => {
  const [quiz, setQuiz] = useState("");

  useEffect(() => {
    const {
      match: {
        params: { id },
      },
    } = props;

    const url = `/api/v1/quizzes/show/${id}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setQuiz(response))
      .catch(() => props.history.push("/"));
  }, []);

  return (
    <div>
      <h1>Quiz Show</h1>
      <h3>Name: {quiz.name}</h3>
      <p>Description: {quiz.description}</p>
    </div>
  );
};

export default QuizShow;