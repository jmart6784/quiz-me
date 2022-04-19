import React, { useEffect, useState } from "react";
import UaOptions from "./quiz_start_helper/UaOptions";
import quizStartObjects from "./quiz_start_helper/quizStartObjects";
import secondsToTime from "../quiz/form_helpers/secondsToTime";

const UnAuthQuizStart = (props) => {
  const quizObjects = quizStartObjects();

  const [quiz, setQuiz] = useState(quizObjects[0]);
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
      .then((response) => setQuiz(response))
      .catch(() => props.history.push("/"));
  }, []);

  useEffect(() => {
    const quizTimer = setInterval(() => {
      if (quiz["time"] > 0) {
        setQuiz(prevState => (
          prevState["time"] > 0 ?
            { ...prevState, time: prevState["time"] - 1 }
          : prevState
        ));
      } else {
        clearInterval(quizTimer);
      }
    }, 1000);

    return () => clearInterval(quizTimer);
  }, [quiz]);

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

  let timeLeft = secondsToTime(quiz["time"]);
  let hours = timeLeft.hours <= 9 ? `0${timeLeft.hours}` : timeLeft.hours;
  let minutes = timeLeft.minutes <= 9 ? `0${timeLeft.minutes}` : timeLeft.minutes;
  let seconds = timeLeft.seconds <= 9 ? `0${timeLeft.seconds}` : timeLeft.seconds;
  let question = quiz["questions"][page - 1];
  
  return (
    <div>
      <h1>Unauthorized Quiz start</h1>
      <p>Time left: {`${hours}:${minutes}:${seconds}`}</p>
      <p>Question {`${page}/${quiz.questions.length}`}</p>

      <div>
        <h3>Question #{page}</h3>
        <p>Question: {question["question"]}</p>

        <UaOptions
          question={question}
          questionResults={questionResults}
          submitQuestion={submitQuestion} 
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
  );
};

export default UnAuthQuizStart;