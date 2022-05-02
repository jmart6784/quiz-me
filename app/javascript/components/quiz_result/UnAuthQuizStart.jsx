import React, { useEffect, useState } from "react";
import UaOptions from "./quiz_start_helper/UaOptions";
import quizStartObjects from "./quiz_start_helper/quizStartObjects";
import secondsToTime from "../quiz/form_helpers/secondsToTime";

const UnAuthQuizStart = (props) => {
  const quizObjects = quizStartObjects();

  const [quiz, setQuiz] = useState(quizObjects[0]);
  const [quizResult, setQuizResult] = useState(quizObjects[1]);
  const [questionResults, setQuestionResults] = useState([]);
  const [page, setPage] = useState(1);

  useEffect(() => {
    fetch(`/api/v1/quizzes/show/${props.match.params.id}`)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error("Network response was not ok.");
      })
      .then((response) => {
        let quiz = response;

        let start = new Date();
        let end = new Date(start.getTime() + parseInt(quiz.time) * 1000);

        setQuizResult({
          ...quizResult, start, end, quiz_id: quiz.id, time: quiz.time
        });
        
        setQuiz(quiz);
      })
      .catch(() => props.history.push("/"));
  }, []);

  useEffect(() => {
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
          props.history.push({ pathname: "/ua_quiz_result", state: { questionResults, quizResult, quiz } });
        }
      }, 1000);

      return () => clearInterval(quizTimer);
    }
  }, [quiz, questionResults, quizResult]);

  const submitQuestion = (e, question) => {
    let answer = e.target.value;
    let questionResult = {
      id: "",
      correct: "",
      answer: question['answer'],
      user_answer: "[]",
      question_id: question.id,
      quiz_id: props.match.params.id,
      quiz_result_id: "",
      user_id: ""
    };

    if (questionResults.length > 0) {
      for (let i = 0; i < questionResults.length; i++) {
        const qr = questionResults[i];
        if (qr.question_id === question.id) {
          questionResult = qr;
        }
      }
    }

    if (question["question_type"] === "one answer") {
      questionResult['user_answer'] = JSON.stringify([answer]);
    } else if (question["question_type"] === "multiple answers") { 
      let userAnswer = JSON.parse(questionResult['user_answer'])

      if (userAnswer.includes(answer)) {
        let index = userAnswer.indexOf(answer);
        if (index !== -1) {
          userAnswer.splice(index, 1);
          questionResult['user_answer'] = JSON.stringify(userAnswer);
        }
      } else { 
        userAnswer.push(answer);
        userAnswer = JSON.stringify([...new Set(userAnswer.sort((a, b) => a - b))]);
        questionResult['user_answer'] = userAnswer;
      }
    }
    questionResult['correct'] = questionResult['answer'] === questionResult['user_answer'];

    // Sort array by question id and remove repeat values by usiing Set
    let finalResult = [...new Set([...questionResults, questionResult])].sort((a, b) => (a.question_id > b.question_id) ? 1 : -1);

    setQuestionResults(finalResult);
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

  if (questionResults.length === quiz.questions.length && questionResults[0]['answer'] != '') {
    btnLogic = <button onClick={() => { 
      props.history.push({ pathname: "/ua_quiz_result", state: { questionResults, quizResult, quiz}});
    }}
      className="qs-submit-btn"
    >Submit</button>
  }
  
  return (
    <div className="qs-parent-div">
      <h3 className="qs-quiz-title">{quiz.name}</h3>
      {quiz.time > 0 ? <p className="qs-time">Time: {`${hours}:${minutes}:${seconds}`}</p> : ""}

      <div className="qs-question-div">
        <h3 className="qs-question">Question #{`${page} out of ${quiz.questions.length}`}</h3>
        <p className="qs-question">{question["question"]}</p>

        <UaOptions
          question={question}
          questionResults={questionResults}
          submitQuestion={submitQuestion} 
        />

        {
          quiz.questions.length > 1 ?
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
                quiz.questions.length >= page ? setPage(prevState => prevState + 1) : ""
              }}
              disabled={page === quiz.questions.length}
              className="qs-nav-btn"
            >Next</button>
          </div>
          : ""
        }

        {btnLogic}
      </div>
    </div>
  );
};

export default UnAuthQuizStart;