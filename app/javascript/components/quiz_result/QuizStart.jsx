import React, { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";
import secondsToTime from "../quiz/form_helpers/secondsToTime";
import quizStartObjects from "./quiz_start_helper/quizStartObjects";

const QuizStart = (props) => {
  const [user, setUser] = useContext(UserContext);

  const [quiz, setQuiz] = useState(quizStartObjects()[0]);

  const [quizResult, setQuizResult] = useState(quizStartObjects()[1]);

  const getQuiz = (id) => {
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
        let current = new Date();
        let end = new Date(response.end);
        let seconds = Math.round((end.getTime() - current.getTime()) / 1000);

        setQuizResult({
          ...response,
          time: seconds > 0 ? seconds : 0,
        });
        getQuiz(response.quiz_id);
      })
      .catch(() => props.history.push("/"));
  }, []);

  useEffect(() => {

    const quizTimer = setInterval(() => {
      if (quizResult["time"] > 0) {
        setQuizResult(prevState => (
          prevState["time"] > 0 ?
            { ...prevState, time: prevState["time"] - 1 }
          : prevState
        ));
      } else {
        clearInterval(quizTimer);
      }
    }, 1000);

    return () => clearInterval(quizTimer);
  }, [quizResult]);

  // useEffect(() => console.log("QUIZ TIME: ", quiz), [quiz]);

  let timeLeft = secondsToTime(quizResult["time"]);
  let hours = timeLeft.hours <= 9 ? `0${timeLeft.hours}` : timeLeft.hours;
  let minutes = timeLeft.minutes <= 9 ? `0${timeLeft.minutes}` : timeLeft.minutes;
  let seconds = timeLeft.seconds <= 9 ? `0${timeLeft.seconds}` : timeLeft.seconds;

  let question = quiz["questions"][0];
  let options = [];

  for (let i = 1; i <= 10; i++) {
    if (question[`option_${i}`] != "") { 
      options.push(<p key={`option_${i}`}>{question[`option_${i}`]}</p>);
    }
  }

  return (
    <div>
      <h1>Quiz Start</h1>
      <p>Time left: {`${hours}:${minutes}:${seconds}`}</p>
      
      <div>
        <h3>Question #</h3>
        <p>{question.question}</p>
        
        <div>{options}</div>
      </div>
    </div>
  )
};

export default QuizStart;