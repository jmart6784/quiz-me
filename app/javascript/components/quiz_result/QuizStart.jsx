import React, { useEffect, useState, useContext } from "react";
import UserContext from "../context/UserContext";
import secondsToTime from "../quiz/form_helpers/secondsToTime";
import quizStartObjects from "./quiz_start_helper/quizStartObjects";
import Options from "./quiz_start_helper/Options";

const QuizStart = (props) => {
  const [user, setUser] = useContext(UserContext);

  const quizObjects = quizStartObjects();

  const [quiz, setQuiz] = useState(quizObjects[0]);
  const [quizResult, setQuizResult] = useState(quizObjects[1]);
  const [questionResults, setQuestionResults] = useState(quizObjects[2]);
  const [page, setPage] = useState(1);

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
    
    fetch(`/api/v1/question_results/quiz_question_results/${props.match.params.id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setQuestionResults(response))
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

  const submitQuestion = (e, question) => {
    console.log(question);

    // const formData = new FormData();
    // formData.append(
    //   "question_result[correct]",

    // );

    // const token = document.querySelector('meta[name="csrf-token"]').content;

    // fetch("/api/v1/question_results/create", {
    //   method: "POST",
    //   headers: {
    //     "X-CSRF-Token": token,
    //   },
    //   body: formData,
    // })
    //   .then((response) => {
    //     if (response.ok) {
    //       return response.json();
    //     }
    //     throw new Error("Network response was not ok.");
    //   })
    //   .catch((error) => console.log(error.message));
  };

  let timeLeft = secondsToTime(quizResult["time"]);
  let hours = timeLeft.hours <= 9 ? `0${timeLeft.hours}` : timeLeft.hours;
  let minutes = timeLeft.minutes <= 9 ? `0${timeLeft.minutes}` : timeLeft.minutes;
  let seconds = timeLeft.seconds <= 9 ? `0${timeLeft.seconds}` : timeLeft.seconds;
  let question = quiz["questions"][page - 1];

  return (
    <div>
      <h1>Quiz name: {quiz.name}</h1>
      <p>Time left: {`${hours}:${minutes}:${seconds}`}</p>
      <p>{`${page}/${quiz.questions.length}`}</p>
      
      <div>
        <h3>Question #{page}</h3>
        <p>Question: {question["question"]}</p>

        <Options
          question={question}
          submitQuestion={submitQuestion}
          questionResults={questionResults} 
        />
        <br />
        <button
          onClick={() => {
            page > 1 ? setPage(prevState => prevState - 1) : ""
          }}
          disabled={page === 1}
        >Previous</button>

        <button
          onClick={() => { 
            quiz.questions.length >= page ? setPage(prevState => prevState + 1) : ""
          }}
          disabled={page === quiz.questions.length}
        >Next</button>
      </div>
    </div>
  )
};

export default QuizStart;