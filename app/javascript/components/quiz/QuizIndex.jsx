import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const QuizIndex = () => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect((props) => {
    const url = "/api/v1/quizzes/index";
    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setQuizzes(response))
      .catch(() => props.history.push("/"));
  }, []);

  let allQuizzes = quizzes.map((quiz) => (
    <div key={quiz.id}>
      <p>Name: {quiz.name}</p>
      <p>Description: {quiz.description}</p>
      <Link to={`/quiz/${quiz.id}`}>Show</Link>
    </div>
  ));

  let noQuizzes = (
    <h1>
      No Quizzes yet. Why not <Link to="/">create one</Link>
    </h1>
  );

  return (
    <div>
      <h1>Quiz Index</h1>
      {quizzes.length > 0 ? allQuizzes : noQuizzes}
    </div>
  );
};

export default QuizIndex;
