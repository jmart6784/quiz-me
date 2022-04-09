import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import secondsToTime from "./form_helpers/secondsToTime";

const QuizShow = (props) => {
  const [quiz, setQuiz] = useState({
    id: "",
    name: "",
    description: "",
    hours: "0",
    minutes: "0",
    seconds: "0",
    cover: { url: "" },
    user: {
      id: "",
      username: "",
    },
  });

  const [quizResults, setQuizResults] = useState([]);

  useEffect(() => {
    fetch(`/api/v1/quizzes/show/${props.match.params.id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        let { hours, minutes, seconds } = secondsToTime(
          parseInt(response.time)
        );
        setQuiz({ ...response, hours, minutes, seconds });
      })
      .catch(() => props.history.push("/"));
  }, []);

  useEffect(() => {
    fetch(`/api/v1/quiz_results/quiz_results_by_quiz_id/${props.match.params.id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setQuizResults(response))
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

  let quizResultsJsx = <p>No Results Yet.</p>;

  quizResultsJsx = quizResults.map((result) => {
    let d = new Date(result.completed_at)
    let date = d.toLocaleDateString('en-us',{day: 'numeric'})
    let month = d.toLocaleDateString('en-us',{month: 'long'})
    let year = d.toLocaleDateString('en-us',{year: 'numeric'})
    let formattedDate = `${month} ${date}, ${year}`

    return (
      <div key={`result-#${result.id}`}>
        <h3>Quiz Result</h3>
        <p>Quiz name: {result.quiz.name}</p>
        <p>{formattedDate}</p>
      </div>
    );
  });

  const startQuiz = () => {
    const formData = new FormData();
    formData.append("quiz_result[quiz_id]", quiz.id);

    fetch("/api/v1/quiz_results/create", {
      method: "POST",
      headers: {
        "X-CSRF-Token":  document.querySelector('meta[name="csrf-token"]').content,
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        props.history.push(`/quiz_start/${response.id}`)
      })
      .catch((error) => console.log(error.message));
  };

  useEffect(() => console.log(quizResults), [quizResults]);

  return (
    <div>
      <h1>Quiz Show</h1>
      <h3>Name: {quiz.name}</h3>
      <p>Description: {quiz.description}</p>
      {
        quiz.time > 0 ?
          <p>Time: {`${quiz.hours}:${quiz.minutes}:${quiz.seconds}`}</p>
          :
          <p>Not timed</p>
      }
      <Link to={`/quizzes/edit/${quiz.id}`}>Edit</Link>
      <button onClick={deleteQuiz}>Delete</button>
      <p>
        Created by:{" "}
        <Link to={`/users/${quiz.user.id}`}>{quiz.user.username}</Link>
      </p>
      <button onClick={startQuiz}>Start Quiz</button>
      <br />
      <img src={quiz.cover.url} alt="quiz cover" height="400" width="600" />
      {quizResultsJsx}
    </div>
  );
};

export default QuizShow;
