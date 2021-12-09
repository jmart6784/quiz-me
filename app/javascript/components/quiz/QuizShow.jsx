import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const QuizShow = (props) => {
  const [quiz, setQuiz] = useState({
    id: "",
    name: "",
    description: "",
    cover: { url: "" },
    user: {
      id: "",
      username: "",
    },
  });

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

  const deleteQuiz = () => {
    const {
      match: {
        params: { id },
      },
    } = props;
    const url = `/api/v1/quizzes/destroy/${id}`;
    const token = document.querySelector('meta[name="csrf-token"]').content;

    fetch(url, {
      method: "DELETE",
      headers: {
        "X-CSRF-Token": token,
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then(() => props.history.push("/"))
      .catch((error) => console.log(error.message));
  };

  let questionsJsx = "";

  if (quiz.questions) {
    questionsJsx = quiz.questions.map((question) => {
      let options = [];

      for (let i = 1; i <= 10; i++) {
        if (question[`option_${i}`] != "") {
          options.push(
            <p key={`question-${question.id}-option-${i}`}>
              {question[`option_${i}`]}
            </p>
          );
        }
      }

      return (
        <div key={`question-${question.id}`}>
          <p>{question.question}</p>
          {options}
        </div>
      );
    });
  }

  useEffect(() => console.log(quiz), [quiz]);
  return (
    <div>
      <h1>Quiz Show</h1>
      <h3>Name: {quiz.name}</h3>
      <p>Description: {quiz.description}</p>
      <Link to={`/quizzes/edit/${quiz.id}`}>Edit</Link>
      <button onClick={deleteQuiz}>Delete</button>
      <p>
        Created by:{" "}
        <Link to={`/users/${quiz.user.id}`}>{quiz.user.username}</Link>
      </p>
      <img src={quiz.cover.url} alt="quiz cover" height="400" width="600" />
      {questionsJsx}
    </div>
  );
};

export default QuizShow;
