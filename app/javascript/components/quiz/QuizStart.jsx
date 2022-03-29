import React, { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";
import secondsToTime from "./form_helpers/secondsToTime";

const QuizStart = (props) => {
  const [user, setUser] = useContext(UserContext);

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
    questions: [],
  });

  const [quizResult, setQuizResult] = useState({
    id: "",
    start: "",
    end: "",
    completed_at: "",
    finished: false,
    quiz_id: "",
    user_id: "",
    quiz: {
      id: "",
      name: "",
      description: "",
      cover: { url: "" },
      time: 0,
    },
    user: {
      id: "",
      avatar: { url: "" },
      bio: "",
      email: "",
      first_name: "",
      last_name: "",
      username: "",
    }
  });

  const getQuiz = (id) => {
    const url = `/api/v1/quizzes/show/${id}`;

    fetch(url)
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
  };

  useEffect(() => {
    const url = `/api/v1/quiz_results/show/${props.match.params.id}`;

    fetch(url)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        setQuizResult({ ...response });
        getQuiz(response.quiz_id);
      })
      .catch(() => props.history.push("/"));
  }, []);

  return (
    <div>
      <h1>Quiz Start</h1>
    </div>
  )
};

export default QuizStart;