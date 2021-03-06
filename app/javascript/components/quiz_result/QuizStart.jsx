import React, { useEffect, useState } from "react";
import secondsToTime from "../quiz/form_helpers/secondsToTime";
import quizStartObjects from "./quiz_start_helper/quizStartObjects";
import Options from "./quiz_start_helper/Options";

const QuizStart = (props) => {
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
    fetch(`/api/v1/quiz_results/show/${props.match.params.id}`)
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
      .then((response) => response.length === 0 ?
        setQuestionResults([{
          id: "",
          correct: false,
          answer: "[]",
          user_answer: "[]",
          question_id: "",
          quiz_id: "",
          quiz_result_id: "",
          user_id: "",
        }]) : setQuestionResults(response))
      .catch(() => props.history.push("/"));
  }, []);

  useEffect(() => {
    if (quizResult.completed_at != null && quizResult.completed_at != "") { 
      props.history.push('/');
    }

    if (quiz.time > 0) {
      const quizTimer = setInterval(() => {
        if (quizResult["time"] > 0) {
          setQuizResult(prevState => (
            prevState["time"] > 0 ?
              { ...prevState, time: prevState["time"] - 1 }
            : prevState
          ));
        } else {
          clearInterval(quizTimer);
          fetch(`/api/v1/quiz_results/update/${props.match.params.id}`, {
            method: "PUT",
            headers: {
              "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
            }
          })
            .then((response) => {
              if (response.ok) {
                return response.json();
              }
              throw new Error("Network response was not ok.");
            })
            .then(() => props.history.push(`/quiz_result/${quizResult.id}`))
            .catch((error) => console.log(error.message));
        }
      }, 1000);

      return () => clearInterval(quizTimer); 
    }
  }, [quizResult, quiz]);

  const submitQuestion = (e, question) => {
    const formData = new FormData();
    formData.append("question_result[question_id]", question["id"]);
    formData.append("question_result[user_answer]", JSON.stringify([e.target.value]));
    formData.append("question_result[quiz_result_id]", props.match.params.id);

    fetch("/api/v1/question_results/create", {
      method: "POST",
      headers: {
        "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
      },
      body: formData,
    })
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => setQuestionResults(response))
      .catch((error) => console.log(error.message));
  };

  let timeLeft = secondsToTime(quizResult["time"]);
  let hours = timeLeft.hours <= 9 ? `0${timeLeft.hours}` : timeLeft.hours;
  let minutes = timeLeft.minutes <= 9 ? `0${timeLeft.minutes}` : timeLeft.minutes;
  let seconds = timeLeft.seconds <= 9 ? `0${timeLeft.seconds}` : timeLeft.seconds;
  let question = quiz["questions"][page - 1];

  let btnLogic = (
    <div className="btn-logic-disabled">
      <p>Answer all questions before submitting </p>
      <button disabled={true}>Submit</button>
    </div>
  );

  let filteredQuestions = quiz.questions;

  for (var i = 0; i < filteredQuestions.length; i++){
    if (filteredQuestions[i].created_at > quizResult.start){
        filteredQuestions.splice(i, 1);
        i--;
    }
  }

  if (questionResults.length === filteredQuestions.length && questionResults[0]['id'] != '') {
    btnLogic = <button onClick={() => {
      fetch(`/api/v1/quiz_results/update/${props.match.params.id}`, {
        method: "PUT",
        headers: {
          "X-CSRF-Token": document.querySelector('meta[name="csrf-token"]').content,
        }
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error("Network response was not ok.");
        })
        .then(() => props.history.push(`/quiz_result/${quizResult.id}`))
        .catch((error) => console.log(error.message));
    }}
      className="qs-submit-btn"
    >Submit</button>
  }

  return (
    <div className="qs-parent-div">
      <h3 className="qs-quiz-title">{quiz.name}</h3>
      {quiz.time > 0 ? <p className="qs-time">Time: {`${hours}:${minutes}:${seconds}`}</p> : ""}
      
      <div className="qs-question-div">
        <h3 className="qs-question">Question #{`${page} out of ${filteredQuestions.length}`}</h3>
        <p className="qs-question">{question["question"]}</p>

        <Options
          question={question}
          submitQuestion={submitQuestion}
          questionResults={questionResults}
        />

        {
          filteredQuestions.length > 1 ?
          <div className="qs-naviagtion">
            <button
                onClick={() => {
                  page > 1 ? setPage(prevState => prevState - 1) : ""
                }}
                disabled={page === 1}
                className="qs-nav-btn"
            >Previous</button>

            <button
              onClick={() => { 
                filteredQuestions.length >= page ? setPage(prevState => prevState + 1) : ""
              }}
              disabled={page === filteredQuestions.length}
              className="qs-nav-btn"
            >Next</button>
          </div>
          : ""
        }

        {btnLogic}
      </div>
    </div>
  )
};

export default QuizStart;