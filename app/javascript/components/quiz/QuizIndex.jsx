import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import secondsToTime from "./form_helpers/secondsToTime";

const QuizIndex = (props) => {
  const [quizzes, setQuizzes] = useState([]);

  useEffect(() => {
    fetch("/api/v1/quizzes/index")
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setQuizzes(response))
      .catch(() => console.log("Error getting quiz index"));
  }, []);

  const deleteQuiz = (id) => {
    fetch(`/api/v1/quizzes/destroy/${id}`, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => window.location.reload())
      .catch((error) => console.log(error.message));
  };

  let allQuizzes = quizzes.map((quiz) => (
    <div key={quiz.id}>
      <p>Name: {quiz.name}</p>
      <p>Description: {quiz.description}</p>
      {quiz.time > 0 ? (
        <p>
          Time:{" "}
          {`${secondsToTime(quiz.time).hours}:${
            secondsToTime(quiz.time).minutes
          }:${secondsToTime(quiz.time).seconds}`}
        </p>
      ) : (
        <p>Not Timed</p>
      )}
      <Link to={`/quizzes/${quiz.id}`}>Show</Link>
      <Link to={`/quizzes/edit/${quiz.id}`}>Edit</Link>
      <button onClick={() => deleteQuiz(quiz.id)}>Delete</button>
      <br />
      <p>
        By: <Link to={`/users/${quiz.user.id}`}>{quiz.user.username}</Link>
      </p>

      <img src={quiz.cover.url} alt="quiz cover" height="400" width="600" />
    </div>
  ));

  let noQuizzes = <h1>No Quizzes yet.</h1>;

  return (
    <div>
      <h1>Quiz Index</h1>
      {quizzes.length > 0 ? allQuizzes : noQuizzes}
    </div>
  );
};

export default QuizIndex;
